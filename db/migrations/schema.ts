import { mysqlTable, mysqlSchema, AnyMySqlColumn, bigint, varchar, text, mysqlEnum, timestamp, date, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const contactSubmissions = mysqlTable("contact_submissions", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	company: varchar({ length: 255 }),
	subject: varchar({ length: 100 }).notNull(),
	message: text().notNull(),
	status: mysqlEnum(['new','in_progress','resolved']).default('new').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
});

export const demoRequests = mysqlTable("demo_requests", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	company: varchar({ length: 255 }),
	phone: varchar({ length: 50 }),
	traderType: varchar("trader_type", { length: 50 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	preferredDate: date("preferred_date", { mode: 'string' }),
	message: text(),
	status: mysqlEnum(['pending','scheduled','completed','cancelled']).default('pending').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
});

export const newsletterSubscribers = mysqlTable("newsletter_subscribers", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	email: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }),
	source: varchar({ length: 50 }).default('website'),
	isActive: tinyint("is_active").default(1),
	createdAt: timestamp("created_at", { mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
});

export const users = mysqlTable("users", {
	id: bigint({ mode: "number", unsigned: true }).autoincrement().notNull(),
	unionId: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }),
	email: varchar({ length: 320 }),
	avatar: text(),
	role: mysqlEnum(['user','admin']).default('user').notNull(),
	createdAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	updatedAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
	lastSignInAt: timestamp({ mode: 'string' }).default('CURRENT_TIMESTAMP').notNull(),
});
