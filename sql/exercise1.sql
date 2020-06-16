DROP TABLE IF EXISTS actors;

CREATE TABLE actors (
    name VARCHAR(255) NOT NULL PRIMARY KEY,
    oscars INTEGER NOT NULL,
    age INTEGER NOT NULL
);

INSERT INTO actors (name, age, oscars) VALUES ('Leonardo DiCaprio', 41, 1);
INSERT INTO actors (name, age, oscars) VALUES ('Jennifer Lawrence', 25, 1);
INSERT INTO actors (name, age, oscars) VALUES ('Samuel L. Jackson', 67, 0);
INSERT INTO actors (name, age, oscars) VALUES ('Meryl Streep', 66, 3);
INSERT INTO actors (name, age, oscars) VALUES ('John Cho', 43, 0);

SELECT *
FROM actors
WHERE oscars > 1;

SELECT *
FROM actors
WHERE age > 30;