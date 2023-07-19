DROP TABLE IF EXISTS "activity_comments";
CREATE TABLE IF NOT EXISTS "activity_comments" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"parent"	varchar(255) DEFAULT NULL,
	"user"	varchar(255) NOT NULL,
	"message"	varchar(255) NOT NULL,
	"timestamp"	bigint NOT NULL
);
DROP TABLE IF EXISTS "activity_likes";
CREATE TABLE IF NOT EXISTS "activity_likes" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "bikes";
CREATE TABLE IF NOT EXISTS "bikes" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"model"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "bike_summary";
CREATE TABLE IF NOT EXISTS "bike_summary" (
	"id"	varchar(255) NOT NULL,
	"rides"	int NOT NULL,
	"distance"	double NOT NULL,
	"elevation"	double NOT NULL,
	"timestamp"	bigint NOT NULL DEFAULT '0',
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "bike_images";
CREATE TABLE IF NOT EXISTS "bike_images" (
	"id"	varchar(255) NOT NULL,
	"bike"	varchar(255) NOT NULL,
    "image" varchar(255) NOT NULL,
	"index"	bigint NOT NULL,
	"timestamp"	bigint NOT NULL DEFAULT '0',
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "users";
CREATE TABLE IF NOT EXISTS "users" (
	"id"	varchar(255) NOT NULL,
	"email"	varchar(255) NOT NULL,
	"password"	varchar(255) NOT NULL,
	"firstname"	varchar(255) NOT NULL,
	"lastname"	varchar(255) NOT NULL,
	"avatar"	varchar(255) DEFAULT NULL,
	"status"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "user_avatars";
CREATE TABLE IF NOT EXISTS "user_avatars" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "user_follows";
CREATE TABLE IF NOT EXISTS "user_follows" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"follow"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "user_subscriptions";
CREATE TABLE IF NOT EXISTS "user_subscriptions" (
    "id"    varchar(255) NOT NULL,
    "user" varchar(255) NOT NULL,
    "token" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "expires" double NOT NULL,
    "timestamp" double NOT NULL,
    PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "store_coupons";
CREATE TABLE IF NOT EXISTS "store_coupons" (
    "id" varchar(255) NOT NULL,
    "token" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "duration" double NOT NULL,
    "expires" double NOT NULL,
    "timestamp" double NOT NULL,
    PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "polls";
CREATE TABLE IF NOT EXISTS "polls" (
    "id" varchar(255) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT DEFAULT NULL,
    "timestamp" double NOT NULL,
    PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "poll_inputs";
CREATE TABLE IF NOT EXISTS "poll_inputs" (
    "id" varchar(255) NOT NULL,
    "poll" varchar(255) NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT DEFAULT NULL,
    "choices" TEXT DEFAULT NULL,
    "index" double NOT NULL,
    PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "poll_answers";
CREATE TABLE IF NOT EXISTS "poll_answers" (
    "id" varchar(255) NOT NULL,
    "poll" varchar(255) NOT NULL,
    "input" varchar(255) NOT NULL,
    "user" varchar(255) NOT NULL,
    "answer" TEXT NOT NULL,
    "timestamp" double NOT NULL,
    PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "tokens";
CREATE TABLE IF NOT EXISTS "tokens" (
	"id"	varchar(255) NOT NULL,
	"key"	varchar(255) NOT NULL,
	"user"	varchar(255) DEFAULT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "user_verifications";
CREATE TABLE IF NOT EXISTS "user_verifications" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"code"	varchar(6) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "activity_summary";
CREATE TABLE IF NOT EXISTS "activity_summary" (
	"id"	varchar(255) NOT NULL,
	"key"	varchar(255) NOT NULL,
	"value"	double NOT NULL,
	"personal_best"	boolean NOT NULL,
	"timestamp"	bigint NOT NULL
);
DROP TABLE IF EXISTS "activities";
CREATE TABLE IF NOT EXISTS "activities" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"visibility"	TEXT NOT NULL,
	"title"	varchar(255) DEFAULT NULL,
	"description"	varchar(255) DEFAULT NULL,
	"bike"	varchar(255) DEFAULT NULL,
	"polylines"	TEXT DEFAULT NULL,
	"start_area"	TEXT DEFAULT NULL,
	"finish_area"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"local_id"	varchar(255) DEFAULT NULL,
	"timestamp"	double NOT NULL
);
DROP TABLE IF EXISTS "messages";
CREATE TABLE IF NOT EXISTS "messages" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"message"	TEXT DEFAULT NULL,
	"timestamp"	double NOT NULL
);
DROP TABLE IF EXISTS "routes";
CREATE TABLE IF NOT EXISTS "routes" (
	"id" VARCHAR(255) NOT NULL,
	"user" VARCHAR(255) NOT NULL,
	"center_latitude" DOUBLE NOT NULL,
	"center_longitude" DOUBLE NOT NULL,
	"polyline" TEXT NOT NULL,
	"timestamp" DOUBLE NOT NULL,
	"distance" DOUBLE NOT NULL,
	"duration" VARCHAR(255) NOT NULL,
	"color" VARCHAR(255) NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "route_waypoints";
CREATE TABLE IF NOT EXISTS "route_waypoints" (
	"id" VARCHAR(255) NOT NULL,
	"route" VARCHAR(255) NOT NULL,
	"name" VARCHAR(255) NOT NULL,
	"type" VARCHAR(255) NOT NULL,
	"place_id" VARCHAR(255) DEFAULT NULL,
	"latitude" DOUBLE DEFAULT NULL,
	"longitude" DOUBLE DEFAULT NULL,
	"coordinates" TEXT DEFAULT NULL,
	"polyline" TEXT DEFAULT NULL,
	"distance" DOUBLE DEFAULT NULL,
	"duration" VARCHAR(255) DEFAULT NULL,
	"index" INTEGER NOT NULL,
	"timestamp" DOUBLE NOT NULL,
	PRIMARY KEY("id")
);
