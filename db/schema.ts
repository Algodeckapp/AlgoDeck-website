import {
  mysqlTable,
  mysqlEnum,
  bigint,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  date,
} from "drizzle-orm/mysql-core";

// ─── Users (managed by auth system) ───
export const users = mysqlTable("users", {
  id: serial("id"),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Newsletter Subscribers ───
export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
  id: serial("id"),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  source: varchar("source", { length: 50 }).default("website"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Subscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertSubscriber = typeof newsletterSubscribers.$inferInsert;

// ─── Contact Submissions ───
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: serial("id"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  subject: varchar("subject", { length: 100 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "in_progress", "resolved"]).default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

// ─── Demo Requests ───
export const demoRequests = mysqlTable("demo_requests", {
  id: serial("id"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  traderType: varchar("trader_type", { length: 50 }),
  preferredDate: date("preferred_date"),
  message: text("message"),
  status: mysqlEnum("status", ["pending", "scheduled", "completed", "cancelled"]).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type DemoRequest = typeof demoRequests.$inferSelect;
export type InsertDemoRequest = typeof demoRequests.$inferInsert;
