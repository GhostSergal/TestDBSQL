DROP TABLE IF EXISTS autor;
DROP TABLE IF EXISTS obra;

CREATE TABLE IF NOT EXISTS autor(id INTEGER PRIMARY KEY AUTOINCREMENT,nombre TEXT,genero TEXT,img TEXT);
INSERT or IGNORE INTO autor VALUES (1,'Isabela Allende','novela','https://pbs.twimg.com/profile_images/463808864517750787/pGM4PbbM_normal.jpeg');
INSERT or IGNORE INTO autor VALUES (2,'Isabela Allende','novela','https://pbs.twimg.com/profile_images/463808864517750787/pGM4PbbM_normal.jpeg');
INSERT or IGNORE INTO autor VALUES (3,'Isabela Allende','novela','https://pbs.twimg.com/profile_images/463808864517750787/pGM4PbbM_normal.jpeg');

CREATE TABLE IF NOT EXISTS obra(id INTEGER PRIMARY KEY AUTOINCREMENT,titulo TEXT, autorId INTEGER);
INSERT or IGNORE INTO obra(id, titulo,autorId) VALUES (1,'La casa de los espiritus',1);