// Tipe dashboard: re-export 1:1 dari skema Drizzle + bentuk state store.
// Ganti ke fetch API nanti tanpa mengubah halaman: cukup isi DashboardState dari server.

import type {
  ContactMessage,
  Education,
  Experience,
  Profile,
  Project,
  ProjectTag,
  ProjectView,
  SiteComment,
  SiteVisit,
  Skill,
} from "../db/schema";

export type {
  ContactMessage,
  Education,
  Experience,
  Profile,
  Project,
  ProjectTag,
  ProjectView,
  SiteComment,
  SiteVisit,
  Skill,
};

export interface DashboardState {
  version: 1;
  seq: number;
  profile: Profile;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  projects: Project[];
  projectTags: ProjectTag[];
  visits: SiteVisit[];
  projectViews: ProjectView[];
  comments: SiteComment[];
  messages: ContactMessage[];
}

export type ArrayTableKey = Exclude<
  keyof DashboardState,
  "version" | "seq" | "profile"
>;

export type CommentStatus = "pending" | "approved" | "rejected";
