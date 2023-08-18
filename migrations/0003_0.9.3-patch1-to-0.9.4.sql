-- Migration number: 0003 	 2023-08-17T21:57:00.100Z
CREATE TABLE "activity_images" (
	"id"	varchar(255) NOT NULL,
	"activity"	varchar(255) NOT NULL,
	"image"	varchar(255) NOT NULL,
	"timestamp"	double NOT NULL,
	PRIMARY KEY("id")
);
