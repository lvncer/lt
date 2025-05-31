CREATE TABLE "talks" (
	"id" serial PRIMARY KEY NOT NULL,
	"presenter" text NOT NULL,
	"email" text,
	"title" text NOT NULL,
	"duration" integer NOT NULL,
	"topic" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'pending',
	"date_submitted" timestamp DEFAULT now(),
	"image_url" text,
	"presentation_date" text,
	"venue" text,
	"user_id" integer,
	"fullname" text,
	"has_presentation" boolean DEFAULT false,
	"presentation_url" text,
	"allow_archive" boolean DEFAULT false,
	"archive_url" text,
	"presentation_start_time" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" text NOT NULL,
	"username" text,
	"email" text,
	"fullname" text,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id")
);
--> statement-breakpoint
ALTER TABLE "talks" ADD CONSTRAINT "talks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;