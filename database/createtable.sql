DROP TABLE IF EXISTS entry;

SET client_encoding='UTF8';

CREATE TABLE entry (
	entry_id bigserial,
	name varchar(50) NOT NULL,
	message text NOT NULL,
	created timestamp NOT NULL DEFAULT NOW(),
	ip inet,
	CONSTRAINT entry_id_key PRIMARY KEY (entry_id)
);
