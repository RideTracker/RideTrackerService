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
CREATE TABLE IF EXISTS "store_coupons" (
    "id" varchar(255) NOT NULL,
    "token" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "duration" double NOT NULL,
    "expires" double NOT NULL,
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
	"title"	varchar(255) DEFAULT NULL,
	"description"	varchar(255) DEFAULT NULL,
	"bike"	varchar(255) DEFAULT NULL,
	"polylines"	TEXT DEFAULT NULL,
	"start_area"	TEXT DEFAULT NULL,
	"finish_area"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"timestamp"	double NOT NULL
);
DROP TABLE IF EXISTS "messages";
CREATE TABLE IF NOT EXISTS "messages" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"message"	TEXT DEFAULT NULL,
	"timestamp"	double NOT NULL
);
