CREATE DATABASE ecfgvparrot;
USE ecfgvparrot;

CREATE TABLE voitures (
	id VARCHAR(255) PRIMARY KEY,
    images VARCHAR(500),
    titre VARCHAR(100),
    descript VARCHAR(100),
    boite VARCHAR(10),
    
    carburant VARCHAR(10),
    kilometrage INT,
    annee VARCHAR(4),
    prix INT,
    lesplus VARCHAR(200),
    equipements VARCHAR(1000),
    details VARCHAR(500)
);

INSERT INTO voitures (id, images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details)
VALUES ('1', '../ressources/images/gallerie/renault.jpg+../ressources/images/gallerie/coxx.jpg', 'Renault Clio IV', 'Blue dci 100cv business', 'Manuelle', 'Diesel', '45000', '2018', '14500', 'Cuir+Sièges chauffants+Toit ouvrant+GPS', 'Régulateur+Limiteur de vitesse+Radar de recul+Sellerie en cuir+Régulateur adaptatif+Radar avant+Avertisseur d angle mort+Siège chauffant+Affichage tête haute+Attelage+Connexion bluetooth+etc', 'Bleu+6 cv+5 portes+5 places+12 mois+B');

