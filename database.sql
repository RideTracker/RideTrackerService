DROP TABLE IF EXISTS "activities";
CREATE TABLE "activities" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"title"	varchar(255) DEFAULT NULL,
	"description"	varchar(255) DEFAULT NULL,
	"bike"	varchar(255) DEFAULT NULL,
	"polylines" TEXT DEFAULT NULL,
	"timestamp"	double NOT NULL
);

DROP TABLE IF EXISTS "activity_comments";
CREATE TABLE "activity_comments" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"parent"	varchar(255) DEFAULT NULL,
	"user"	varchar(255) NOT NULL,
	"message"	varchar(255) NOT NULL,
	"timestamp"	bigint NOT NULL
);

DROP TABLE IF EXISTS "activity_likes";
CREATE TABLE "activity_likes" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "activity_summary";
CREATE TABLE "activity_summary" (
	"id"	varchar(255) NOT NULL,
	"start_area"	varchar(255) DEFAULT NULL,
	"finish_area"	varchar(255) DEFAULT NULL,
	"distance"	double NOT NULL,
	"distance_personal_best" boolean DEFAULT NULL,
	"average_speed"	double NOT NULL,
	"average_speed_personal_best" boolean DEFAULT NULL,
	"elevation"	double NOT NULL,
	"elevation_personal_best" boolean DEFAULT NULL,
	"max_speed"	double NOT NULL,
	"max_speed_personal_best" boolean DEFAULT NULL,
	"timestamp"	bigint NOT NULL,
	PRIMARY KEY("id")
);


DROP TABLE IF EXISTS "bikes";
CREATE TABLE "bikes" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"model"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "bike_summary";
CREATE TABLE "bike_summary" (
	"id"	varchar(255) NOT NULL,
	"rides"	int NOT NULL,
	"distance"	double NOT NULL,
	"elevation"	double NOT NULL,
	"timestamp"	bigint NOT NULL DEFAULT '0',
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "bike_images";
CREATE TABLE "bike_images" (
	"id"	varchar(255) NOT NULL,
	"bike"	varchar(255) NOT NULL,
	"timestamp"	bigint NOT NULL DEFAULT '0',
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "users";
CREATE TABLE "users" (
	"id"	varchar(255) NOT NULL,
	"email"	varchar(255) NOT NULL,
	"password"	varchar(255) NOT NULL,
	"firstname"	varchar(255) NOT NULL,
	"lastname"	varchar(255) NOT NULL,
	"avatar"	varchar(255) DEFAULT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "user_avatars";
CREATE TABLE "user_avatars" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
	"combination"	varchar(1024) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "user_follows";
CREATE TABLE "user_follows" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"follow"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);

DROP TABLE IF EXISTS "tokens";
CREATE TABLE "tokens" (
	"id"	varchar(255) NOT NULL,
	"key"	varchar(255) NOT NULL,
	"user"	varchar(255) DEFAULT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);

INSERT INTO "tokens" VALUES ('devs', 'devs', NULL, 0);

DROP TABLE IF EXISTS "user_verifications";
CREATE TABLE "user_verifications" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"code"	varchar(6) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
