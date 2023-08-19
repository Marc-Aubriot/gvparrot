/* create db */
CREATE DATABASE ecfgvparrot;
# SHOW DATABASES;
USE ecfgvparrot;

/* create tabkles */
CREATE TABLE utilisateurs (
	id CHAR(36) PRIMARY KEY,
	nom VARCHAR(50),
	prenom VARCHAR(50),
	email VARCHAR(100),
	mot_de_passe VARCHAR(255),
	is_admin BOOL DEFAULT FALSE
);

CREATE TABLE commentaires (
	id INT PRIMARY KEY AUTO_INCREMENT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
	nom VARCHAR(50),
	contenu TEXT,
	note FLOAT,
	valider BOOL DEFAULT FALSE
);

CREATE TABLE messages (
	id INT PRIMARY KEY AUTO_INCREMENT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
    nom VARCHAR(50),
    prenom VARCHAR(50),
    telephone VARCHAR(15),
    email VARCHAR(100),
    sujet VARCHAR(255),
    content TEXT,
    lecture BOOL DEFAULT FALSE
);

CREATE TABLE services (
	id INT PRIMARY KEY AUTO_INCREMENT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
    categorie VARCHAR(20),
    subcategorie VARCHAR(20),
	titre VARCHAR(100),
	descript TEXT
);

CREATE TABLE horaires (
	id INT PRIMARY KEY AUTO_INCREMENT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
	lundi VARCHAR(50),
	mardi VARCHAR(50),
	mercredi VARCHAR(50),
	jeudi VARCHAR(50),
	vendredi VARCHAR(50),
	samedi VARCHAR(50),
	dimanche VARCHAR(50)
);

CREATE TABLE equipements (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nom VARCHAR(50)
);

CREATE TABLE voitures (
	id INT PRIMARY KEY AUTO_INCREMENT,
    utilisateur_id VARCHAR(36) NOT NULL,
    images VARCHAR(500),
    titre VARCHAR(100),
    descript VARCHAR(100),
    boite VARCHAR(11),
    carburant VARCHAR(10),
    kilometrage INT,
    annee VARCHAR(4),
    prix INT,
    lesplus VARCHAR(200),
    equipements VARCHAR(1000),
    details VARCHAR(500),
    ref VARCHAR(100),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

CREATE TABLE posseder (
	equipement_id INT,
    voiture_id INT,
    titre VARCHAR(100),
    nom VARCHAR(50),
    PRIMARY KEY(equipement_id, voiture_id),
    FOREIGN KEY(equipement_id) REFERENCES equipements(id),
    FOREIGN KEY(voiture_id) REFERENCES voitures(id)
);

CREATE TABLE custom_sessions (
	id INT PRIMARY KEY AUTO_INCREMENT,
    FOREIGN KEY (utilisateur) REFERENCES utilisateurs(id),
	utilisateur VARCHAR(255),
	token VARCHAR(255),
	date_connection DATETIME DEFAULT CURRENT_TIMESTAMP,
	logged BOOLEAN DEFAULT TRUE
);