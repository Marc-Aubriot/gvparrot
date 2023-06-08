CREATE DATABASE ecfgvparrot;
USE ecfgvparrot;

CREATE TABLE voitures (
	id VARCHAR(255) PRIMARY KEY,
    utilisateur_id VARCHAR(255),
    titre VARCHAR(100),
    images VARCHAR(500),
    prix INT,
    kilometrage INT,
    annee VARCHAR(4),
    caracteristiques VARCHAR(1000),
    equipements VARCHAR(1000),
    options VARCHAR(1000)
);

INSERT INTO voitures (id, titre, prix, kilometrage, annee)
VALUES ('1', 'Renault Clio IV', '14500', '45000', '2018');


select * from voitures;
drop table voitures;