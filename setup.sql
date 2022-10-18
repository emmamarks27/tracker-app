DROP TABLE IF EXISTS assassin CASCADE;
DROP TABLE IF EXISTS incident CASCADE;
DROP TABLE IF EXISTS place CASCADE;


CREATE TABLE assassin (
    assassin_id INT GENERATED ALWAYS AS IDENTITY,
    assassin_name VARCHAR (50) NOT NULL,
    PRIMARY KEY (assassin_id)
);

INSERT INTO assassin (assassin_name)
VALUES ('Ezio'), ('Samuele'), ('Altair'), ('Ercole');

CREATE TABLE place (
    place_id INT GENERATED ALWAYS AS IDENTITY,
    place_name VARCHAR (50) NOT NULL,
    PRIMARY KEY (place_id)
);

INSERT INTO place (place_name)
VALUES ('Rome'), ('Florence'), ('Turin'), ('Venice');



-- CREATE TABLE place (
--     place_id INT GENERATED ALWAYS AS IDENTITY, 
--     place_name VARCHAR(50) NOT NULL, 
--     PRIMARY KEY (place_id)
-- );

-- INSERT INTO place (place_name)
-- VALUES ('Rome'), ('Florence'), ('Venice'), ('Turin')


CREATE TABLE incident (
    incident_id INT GENERATED ALWAYS AS IDENTITY,
    assassin_id INT NOT NULL,
    place_id INT NOT NULL,
    description VARCHAR(200),
    assassinated BOOLEAN DEFAULT FALSE,
    witnessess INT DEFAULT 0,
    revenged BOOLEAN DEFAULT FALSE,
    severity_level INT NOT NULL DEFAULT 5,
    time_of_incident INT NOT NULL DEFAULT 1800,
    PRIMARY KEY (incident_id),
    FOREIGN KEY (assassin_id) REFERENCES assassin(assassin_id),
    FOREIGN KEY (place_id) REFERENCES place(place_id)
);

INSERT INTO incident
    (assassin_id, place_id, assassinated, description, witnessess)
VALUES
    (1, 3, TRUE, 'Assassinated the prime minister.', 5);
