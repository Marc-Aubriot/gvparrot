/* create db */
DROP DATABASE ecfgvparrot;
CREATE DATABASE ecfgvparrot;
# SHOW DATABASES;
USE ecfgvparrot;

/* create tables */
CREATE TABLE utilisateurs (
	id CHAR(36) PRIMARY KEY,
	nom VARCHAR(50) NOT NULL,
	prenom VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	mot_de_passe VARCHAR(255) NOT NULL,
	is_admin BOOL DEFAULT FALSE
);

CREATE TABLE commentaires (
	id INT(11) PRIMARY KEY AUTO_INCREMENT NOT NULL,
    utilisateur_id CHAR(36),
	nom VARCHAR(50) NOT NULL,
	contenu TEXT NOT NULL,
	note FLOAT NOT NULL,
	valider BOOL DEFAULT FALSE
);

CREATE TABLE services (
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id CHAR(36) NOT NULL,
    categorie VARCHAR(20) NOT NULL,
    subcategorie VARCHAR(20) NOT NULL,
	titre VARCHAR(100) NOT NULL,
	descript TEXT NOT NULL
);

CREATE TABLE horaires (
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id CHAR(36) NOT NULL,
	lundi VARCHAR(50) NOT NULL,
	mardi VARCHAR(50) NOT NULL,
	mercredi VARCHAR(50) NOT NULL,
	jeudi VARCHAR(50) NOT NULL,
	vendredi VARCHAR(50) NOT NULL,
	samedi VARCHAR(50) NOT NULL,
	dimanche VARCHAR(50) NOT NULL
);

CREATE TABLE equipements (
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
	nom VARCHAR(50) NOT NULL,
    plus BOOL DEFAULT FALSE
);

CREATE TABLE voitures (
	id CHAR(36) PRIMARY KEY,
    utilisateur_id VARCHAR(36) NOT NULL,
    titre VARCHAR(100) NOT NULL,
    descript VARCHAR(100) NOT NULL,
    boite VARCHAR(11) NOT NULL,
    carburant VARCHAR(10) NOT NULL,
    kilometrage INT NOT NULL,
    annee VARCHAR(4) NOT NULL,
    prix INT NOT NULL
);

CREATE TABLE messages (
	id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id CHAR(36),
    voiture_id CHAR(36),
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    telephone VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL,
    sujet VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    lecture BOOL DEFAULT FALSE,
    reçu DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE voiture_equipements (
	equipement_id INT(11),
    voiture_id CHAR(36),
    titre VARCHAR(100),
    nom VARCHAR(50),
    plus BOOL DEFAULT FALSE,
    PRIMARY KEY(equipement_id, voiture_id)
);

CREATE TABLE custom_sessions (
	id INT(11) PRIMARY KEY AUTO_INCREMENT,
	utilisateur_id VARCHAR(255) NOT NULL,
	token VARCHAR(255) NOT NULL,
	connexion DATETIME DEFAULT CURRENT_TIMESTAMP,
	logged BOOLEAN DEFAULT TRUE
);

CREATE TABLE images (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
    voiture_id CHAR(36) NOT NULL,
    chemin VARCHAR(500) NOT NULL
);

CREATE TABLE details (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
    voiture_id CHAR(36) NOT NULL,
    couleur VARCHAR(30) NOT NULL,
    puissance INT(11) NOT NULL,
    rapports INT(11) NOT NULL,
    places INT(11) NOT NULL,
    portes INT(11) NOT NULL,
    garantie INT(11) NOT NULL,
    critair CHAR(1) NOT NULL
);

/* create admin */
INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, is_admin)
VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "adminfamily", "adminname", "superadmin@outlook.fr", "$2y$10$IKnk.34eszvM4lq.JKwWJOMQ0br0ltJDnPNCEubprCems6DmC1.9.", true);

/* add foreign key */
ALTER TABLE commentaires ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE services ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE custom_sessions ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE voiture_equipements ADD FOREIGN KEY (equipement_id) REFERENCES equipements(id);
ALTER TABLE voiture_equipements ADD FOREIGN KEY (voiture_id) REFERENCES voitures(id);
ALTER TABLE voitures ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE horaires ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE images ADD FOREIGN KEY (voiture_id) REFERENCES voitures(id);
ALTER TABLE messages ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);
ALTER TABLE messages ADD FOREIGN KEY (voiture_id) REFERENCES voitures(id);
ALTER TABLE details ADD FOREIGN KEY (voiture_id) REFERENCES voitures(id);
