/* create db */
CREATE DATABASE ecfgvparrot;
# SHOW DATABASES;
USE ecfgvparrot;

/* create tabkles */
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

CREATE TABLE commentaires (
	id VARCHAR(255) PRIMARY KEY,
    utilisateur_id VARCHAR(255),
	nom VARCHAR(50),
	contenu TEXT,
	note FLOAT,
	valider BOOL
);

CREATE TABLE utilisateurs (
	id VARCHAR(255) PRIMARY KEY,
	nom VARCHAR(50),
	prenom VARCHAR(50),
	email VARCHAR(100),
	mot_de_passe VARCHAR(255),
	telephone VARCHAR(10),
	message VARCHAR(255),
	is_admin BOOL
);

CREATE TABLE services (
	id INT PRIMARY KEY AUTO_INCREMENT,
	titre VARCHAR(100),
	descript TEXT
);

CREATE TABLE horaires (
	lundi VARCHAR(50),
	mardi VARCHAR(50),
	mercredi VARCHAR(50),
	jeudi VARCHAR(50),
	vendredi VARCHAR(50),
	samedi VARCHAR(50),
	dimanche VARCHAR(50)
);

/* add foreign key */
ALTER TABLE commentaires
ADD FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id);

/* populate db : test data + dummy data */
INSERT INTO voitures (id, images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details)
VALUES ('1', '../ressources/images/gallerie/renault.jpg+../ressources/images/gallerie/coxx.jpg', 'Renault Clio IV', 'Blue dci 100cv business', 'Manuelle', 'Diesel', '45000', '2018', '14500', 'Cuir+Sièges chauffants+Toit ouvrant+GPS', 'Régulateur+Limiteur de vitesse+Radar de recul+Sellerie en cuir+Régulateur adaptatif+Radar avant+Avertisseur d angle mort+Siège chauffant+Affichage tête haute+Attelage+Connexion bluetooth+etc', 'Bleu+6 cv+5 portes+5 places+12 mois+B');

INSERT INTO voitures (id, images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details)
VALUES ('2', '../ressources/images/gallerie/ford.jpg+../ressources/images/gallerie/coxx.jpg', 'Ford Focus', 'EcoBoost 1.0L Titanium', 'Manuelle', 'Essence', '35000', '2019', '13500', 'Climatisation automatique+Caméra de recul+Jantes en alliage+Start-Stop', 'Régulateur+Limiteur de vitesse+Bluetooth+Feux de jour LED+Détecteur de pluie+Radar avant et arrière+Volant en cuir+Écran tactile 8" SYNC', 'Gris+5 cv+5 portes+5 places+24 mois+D');

INSERT INTO voitures (id, images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details)
VALUES ('3', '../ressources/images/gallerie/volkswagen.jpg+../ressources/images/gallerie/coxx.jpg', 'Volkswagen Golf', '1.6 TDI Comfortline', 'Manuelle', 'Diesel', '50000', '2017', '15500', 'Climatisation+Régulateur de vitesse+Radar de recul', 'Bluetooth+Ordinateur de bord+Volant multifonction+Rétroviseurs électriques+Détecteur de fatigue', 'Noir+6 cv+5 portes+5 places+12 mois+C');

INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("1", "aubriot", "marc", "marc.aubriot@outlook.fr", "testmotdepasse", "0650550480", "no message dispo", true);

INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("2", "pihet", "diane", "pihet@outlook.fr", "testmotdepasse2", "0650550480", "no message dispo", false);

INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("3", "brio", "cram", "brio@outlook.fr", "testmotdepasse3", "0650550480", "no message dispo", false);

INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("4", "aub", "rio", "aubrio@outlook.fr", "testmotdepasse4", "0650550480", "no message dispo", false);

INSERT INTO commentaires (id, utilisateur_id, nom, contenu, note, valider)
VALUES ('1', '1', 'marc', "super garage, j'adore, j'adhère", "4.5", true);

INSERT INTO commentaires (id, utilisateur_id, nom, contenu, note, valider)
VALUES ('2', '2', 'diane', "garage nul je déteste", "1.5", true);

INSERT INTO commentaires (id, utilisateur_id, nom, contenu, note, valider)
VALUES ('3', '3', 'cram', "garage moyen osef", "2.5", true);

INSERT INTO commentaires (id, utilisateur_id, nom, contenu, note, valider)
VALUES ('4', '4', 'rio', "nul nul nul", "0.5", false);

INSERT INTO services (titre, descript)
VALUES ("freinage", "Plaquettes de frein
Le remplacement des plaquettes de frein est une opération essentielle de l'entretien des freins d'un véhicule. Les plaquettes de frein sont des composants clés qui créent la friction nécessaire pour ralentir et arrêter le véhicule lorsque vous appuyez sur la pédale de frein.

Disques de frein
Le remplacement des disques de frein est une opération essentielle pour maintenir un système de freinage sûr et efficace. Les disques de frein, également appelés rotors, sont les composants sur lesquels les plaquettes de frein appuient pour ralentir et arrêter le véhicule.

Étriers de frein
Les étriers de frein sont des composants essentiels du système de freinage. Ils abritent les plaquettes de frein et sont responsables de l'application de la pression sur les disques de frein pour ralentir ou arrêter le véhicule.

Flexibles de frein
Les flexibles de frein sont des tuyaux en caoutchouc renforcés qui relient les étriers aux conduites de frein. Ils permettent le transfert du liquide de frein sous pression depuis le système de freinage vers les étriers, permettant ainsi le mouvement des plaquettes de frein pour freiner les roues.

Purge du liquide de frein
La purge du liquide de frein est une opération qui consiste à éliminer l'air emprisonné dans le système de freinage et à remplacer le liquide de frein usagé par du liquide neuf. Cela garantit le bon fonctionnement et la performance du système de freinage.");

INSERT INTO services (titre, descript)
VALUES ("entretien_moteur", "Vidange d'huile
La vidange d'huile est une opération essentielle de l'entretien régulier du moteur d'un véhicule. Elle consiste à retirer l'ancienne huile moteur usagée et à la remplacer par de l'huile moteur fraîche et de qualité, afin de maintenir le bon fonctionnement et la durabilité du moteur.

Remplacement du filtre à huile
Le filtre à huile joue un rôle crucial dans le système de lubrification du moteur. Il retient les impuretés et les particules indésirables présentes dans l'huile moteur, empêchant ainsi leur circulation et leur accumulation dans le moteur. Le remplacement régulier du filtre à huile est essentiel pour maintenir la propreté de l'huile et la performance du moteur.

Changement du filtre à air
Le filtre à air assure la filtration de l'air qui entre dans le moteur, en retenant les particules de poussière, de saleté et d'autres impuretés. Un filtre à air encrassé peut réduire l'efficacité du moteur et entraîner une diminution des performances. Le changement régulier du filtre à air est recommandé pour maintenir un bon débit d'air et une combustion optimale.

Remplacement des bougies d'allumage
Les bougies d'allumage sont responsables de l'allumage du mélange air-carburant dans les cylindres du moteur. Des bougies d'allumage usées ou défectueuses peuvent entraîner des problèmes de démarrage, des ratés d'allumage et une baisse des performances du moteur. Le remplacement périodique des bougies d'allumage est recommandé pour assurer un bon fonctionnement du moteur.

Nettoyage du système d'admission d'air
Le système d'admission d'air du moteur peut accumuler des dépôts de carbone et d'autres résidus au fil du temps, ce qui peut réduire le flux d'air et affecter les performances du moteur. Le nettoyage du système d'admission d'air, y compris le papillon des gaz, les conduits et les vannes, peut contribuer à maintenir une bonne combustion et une efficacité maximale du moteur.");

INSERT INTO horaires (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche)
VALUES ( "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "fermé");