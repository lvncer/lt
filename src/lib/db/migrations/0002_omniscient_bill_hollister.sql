ALTER TABLE "lt_sessions" ADD COLUMN "archive_url" text;--> statement-breakpoint
ALTER TABLE "talks" DROP COLUMN "presentation_date";--> statement-breakpoint
ALTER TABLE "talks" DROP COLUMN "venue";--> statement-breakpoint
ALTER TABLE "talks" DROP COLUMN "allow_archive";--> statement-breakpoint
ALTER TABLE "talks" DROP COLUMN "archive_url";