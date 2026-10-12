// Skema Drizzle (Postgres/Neon). Satu-satunya sumber kebenaran bentuk data:
// store dashboard (lib/dashboard) dirancang 1:1 dengan tabel di bawah,
// sehingga migrasi ke API + DB nanti tidak mengubah halaman.
// ponytail: belum ada drizzle.config.ts + migrasi SQL; tambah saat DATABASE_URL sudah diisi.

import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  initials: varchar("initials", { length: 8 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  locationLink: text("location_link").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  summary: text("summary").notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  tel: varchar("tel", { length: 40 }).notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 160 }).notNull(),
  href: varchar("href", { length: 255 }).notNull(),
  location: varchar("location", { length: 80 }).notNull(),
  title: varchar("title", { length: 160 }).notNull(),
  logoUrl: varchar("logo_url", { length: 255 }).notNull(),
  start: varchar("start", { length: 40 }).notNull(),
  end: varchar("end", { length: 40 }).notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const educations = pgTable("educations", {
  id: serial("id").primaryKey(),
  school: varchar("school", { length: 160 }).notNull(),
  href: varchar("href", { length: 255 }).notNull(),
  degree: varchar("degree", { length: 160 }).notNull(),
  logoUrl: varchar("logo_url", { length: 255 }).notNull(),
  start: varchar("start", { length: 40 }).notNull(),
  end: varchar("end", { length: 40 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 160 }).notNull(),
  description: text("description").notNull(),
  imageUrl: varchar("image_url", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  github: varchar("github", { length: 255 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectTags = pgTable("project_tags", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  tag: varchar("tag", { length: 80 }).notNull(),
  icon: varchar("icon", { length: 255 }).notNull().default(""),
});

export const siteVisits = pgTable("site_visits", {
  id: serial("id").primaryKey(),
  path: varchar("path", { length: 255 }).notNull().default("/"),
  projectId: integer("project_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projectViews = pgTable("project_views", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull(),
  views: integer("views").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  message: text("message").notNull(),
  projectId: integer("project_id"),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 160 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Profile = typeof profile.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Education = typeof educations.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type ProjectTag = typeof projectTags.$inferSelect;
export type SiteVisit = typeof siteVisits.$inferSelect;
export type ProjectView = typeof projectViews.$inferSelect;
export type SiteComment = typeof comments.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
