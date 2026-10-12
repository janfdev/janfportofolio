// Store dashboard: React context + useReducer + localStorage.
// Key janfporto-dashboard-v1, cek version saat load. Satu-satunya seam ke DB:
// nanti ganti init/persist dengan fetch API tanpa mengubah halaman.

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { buildSeed } from "./seed";
import type {
  ArrayTableKey,
  CommentStatus,
  DashboardState,
  Project,
  ProjectTag,
} from "./types";

const KEY = "janfporto-dashboard-v1";

type Row = { id: number; [k: string]: unknown };

export type Action =
  | { type: "update-profile"; patch: Partial<DashboardState["profile"]> }
  | { type: "insert"; table: ArrayTableKey; row: Record<string, unknown> }
  | { type: "update"; table: ArrayTableKey; id: number; patch: Record<string, unknown> }
  | { type: "remove"; table: ArrayTableKey; id: number }
  | { type: "save-project"; project: Partial<Project> & { id?: number }; tags: { tag: string; icon: string }[] }
  | { type: "set-comment-status"; id: number; status: CommentStatus }
  | { type: "set-message-read"; id: number; read: boolean }
  | { type: "record-visit"; path: string; projectId?: number }
  | { type: "reset-visits" };

function arrOf(state: DashboardState, table: ArrayTableKey): Row[] {
  return state[table] as unknown as Row[];
}

function reducer(state: DashboardState, action: Action): DashboardState {
  switch (action.type) {
    case "update-profile":
      return {
        ...state,
        profile: { ...state.profile, ...action.patch, updatedAt: new Date() },
      };
    case "insert": {
      const row = { ...action.row, id: state.seq } as Row;
      return {
        ...state,
        seq: state.seq + 1,
        [action.table]: [...arrOf(state, action.table), row],
      };
    }
    case "update":
      return {
        ...state,
        [action.table]: arrOf(state, action.table).map((r) =>
          r.id === action.id ? { ...r, ...action.patch } : r
        ),
      };
    case "remove": {
      const next: DashboardState = {
        ...state,
        [action.table]: arrOf(state, action.table).filter(
          (r) => r.id !== action.id
        ),
      };
      if (action.table === "projects") {
        next.projectTags = next.projectTags.filter(
          (t) => t.projectId !== action.id
        );
        next.projectViews = next.projectViews.filter(
          (v) => v.projectId !== action.id
        );
      }
      return next;
    }
    case "save-project": {
      const pid = action.project.id ?? state.seq;
      const project = {
        ...action.project,
        id: pid,
        sortOrder: action.project.sortOrder ?? state.projects.length,
        updatedAt: new Date(),
      } as Project;
      const projects = action.project.id
        ? state.projects.map((p) => (p.id === pid ? { ...p, ...project } : p))
        : [...state.projects, project];
      const rest = state.projectTags.filter((t) => t.projectId !== pid);
      let seq = action.project.id ? state.seq : state.seq + 1;
      const tags: ProjectTag[] = action.tags.map((t) => ({ ...t, id: seq++, projectId: pid }));
      return { ...state, seq, projects, projectTags: [...rest, ...tags] };
    }
    case "set-comment-status":
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id === action.id ? { ...c, status: action.status } : c
        ),
      };
    case "set-message-read":
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.id ? { ...m, read: action.read } : m
        ),
      };
    case "record-visit": {
      const visit = {
        id: state.seq,
        path: action.path,
        projectId: action.projectId ?? null,
        createdAt: new Date(),
      };
      const projectViews = action.projectId
        ? state.projectViews.some((v) => v.projectId === action.projectId)
          ? state.projectViews.map((v) =>
              v.projectId === action.projectId
                ? { ...v, views: (v.views ?? 0) + 1, updatedAt: new Date() }
                : v
            )
          : [
              ...state.projectViews,
              { id: state.seq + 1, projectId: action.projectId, views: 1, updatedAt: new Date() },
            ]
        : state.projectViews;
      return {
        ...state,
        seq: state.seq + (action.projectId && !state.projectViews.some((v) => v.projectId === action.projectId) ? 2 : 1),
        visits: [visit, ...state.visits].slice(0, 2000) as DashboardState["visits"],
        projectViews,
      };
    }
    case "reset-visits": {
      const seed = buildSeed();
      return { ...state, visits: seed.visits, projectViews: seed.projectViews };
    }
    default:
      return state;
  }
}

// Date -> string saat stringify; reviver kembalikan jadi Date agar tipe
// $inferSelect (Date) tetap akurat setelah reload.
function init(): DashboardState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw, (k: string, v: unknown) =>
        k.endsWith("At") && typeof v === "string" ? new Date(v) : v
      ) as DashboardState;
      if (parsed?.version === 1 && parsed.profile) return parsed;
    }
  } catch {
    /* abaikan, pakai seed */
  }
  return buildSeed();
}

const Ctx = createContext<{
  state: DashboardState;
  dispatch: Dispatch<Action>;
} | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined as unknown as DashboardState, init);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage penuh/nonaktif: tetap jalan in-memory */
    }
  }, [state]);
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>;
}

export function useDashboard() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDashboard harus di dalam DashboardProvider");
  return ctx;
}

export function tagsOf(state: DashboardState, projectId: number): ProjectTag[] {
  return state.projectTags.filter((t) => t.projectId === projectId);
}
