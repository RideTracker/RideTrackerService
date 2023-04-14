DROP TABLE IF EXISTS "activities";
CREATE TABLE IF NOT EXISTS "activities" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"bike"	varchar(255) DEFAULT NULL,
	"timestamp"	double NOT NULL
);
DROP TABLE IF EXISTS "activity_comments";
CREATE TABLE IF NOT EXISTS "activity_comments" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"parent"	varchar(255) DEFAULT NULL,
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
DROP TABLE IF EXISTS "activity_summary";
CREATE TABLE IF NOT EXISTS "activity_summary" (
	"id"	varchar(255) NOT NULL,
	"area"	varchar(255) NOT NULL,
	"distance"	double NOT NULL,
	"average_speed"	double NOT NULL,
	"elevation"	double NOT NULL,
	"max_speed"	double NOT NULL,
	"comments"	int NOT NULL,
	"timestamp"	bigint NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "bikes";
CREATE TABLE IF NOT EXISTS "bikes" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
	"name"	varchar(255) NOT NULL,
	"model"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
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
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "user_keys";
CREATE TABLE IF NOT EXISTS "user_keys" (
	"id"	varchar(255) NOT NULL,
	"user"	varchar(255) NOT NULL,
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

INSERT INTO "activities" VALUES ('7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675','95c00e4b-607e-43d3-b871-4661ebc2cedd','844d20e9-a253-415e-9f5d-ae86a4c21947',1678300150558.0);
INSERT INTO "activities" VALUES ('6ecd9429-739d-45fa-bc09-489bd20a10fd','95c00e4b-607e-43d3-b871-4661ebc2cedd',NULL,1678303566794.0);
INSERT INTO "activity_comments" VALUES ('d4b22d54-8871-442e-87d3-abc2831b0822','7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675','95c00e4b-607e-43d3-b871-4661ebc2cedd',NULL,'Nice one!',1679214607615);
INSERT INTO "activity_summary" VALUES ('7ecb7ee3-802a-407e-bf1f-d6cb0fcf6675','Vänersborg',7.3,23.7,33.0,36.5,0,1678553188986);
INSERT INTO "bikes" VALUES ('844d20e9-a253-415e-9f5d-ae86a4c21947','95c00e4b-607e-43d3-b871-4661ebc2cedd','Vittoria','Battaglin C11','https://i.imgur.com/Lol0MH3.jpg',1678313271079.0);
INSERT INTO "bike_summary" VALUES ('844d20e9-a253-415e-9f5d-ae86a4c21947',1,7.3,33.0,1678553980492);

INSERT INTO "users" VALUES ('256264be-d8ac-4e41-9099-f6d96c50ba3c','norasoderlund@icloud.com2','ues1NuDbbXuwZP0AqN9dkz3NurYY1eIo0IlUsOgkcHg=.Av8nleF1FsnhdWSUgrf6OQ==','Nora','Summerswille','https://i.imgur.com/dIV7nwq.png',1678613688440.0);
INSERT INTO "users" VALUES ('59174df4-1b1b-4d5f-9d6a-79f23a6b9e69','norasoderlund2@icloud.com','ues1NuDbbXuwZP0AqN9dkz3NurYY1eIo0IlUsOgkcHg=.Av8nleF1FsnhdWSUgrf6OQ==','Nora','Söderlund',NULL,1678485977894.0);
INSERT INTO "users" VALUES ('95c00e4b-607e-43d3-b871-4661ebc2cedd','norasoderlund@icloud.com','ues1NuDbbXuwZP0AqN9dkz3NurYY1eIo0IlUsOgkcHg=.Av8nleF1FsnhdWSUgrf6OQ==','Nora','Söderlund','https://avatars.githubusercontent.com/u/78360666?v=4',1678300150558.0);
