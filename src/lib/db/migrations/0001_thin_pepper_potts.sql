CREATE TABLE "lt_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_number" integer NOT NULL,
	"date" text NOT NULL,
	"title" text,
	"venue" text NOT NULL,
	"start_time" text DEFAULT '16:30' NOT NULL,
	"end_time" text DEFAULT '18:00' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "lt_sessions_session_number_unique" UNIQUE("session_number")
);
--> statement-breakpoint
ALTER TABLE "talks" ADD COLUMN "session_id" integer;--> statement-breakpoint
CREATE INDEX "lt_sessions_date_idx" ON "lt_sessions" USING btree ("date");--> statement-breakpoint
ALTER TABLE "talks" ADD CONSTRAINT "talks_session_id_lt_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."lt_sessions"("id") ON DELETE set null ON UPDATE no action;