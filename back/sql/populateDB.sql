/* trigger: chaque fois qu'on insert des datas dans la table voiture_equipements, le titre et le nom vont s'auto-fill */
DELIMITER $$
CREATE TRIGGER fill_table_voiture_equipements
    before INSERT
    ON voiture_equipements FOR EACH ROW
	begin
	set new.titre = (select titre from voitures where id = new.voiture_id);
	set new.nom = (select nom from equipements where id = new.equipement_id);
    end$$
DELIMITER ;

/* trigger : chaque qu'on insert une data equipement_id dans la table lesplus le champs nom auto fill */
DELIMITER $$
CREATE TRIGGER fill_table_lesplus
    before INSERT
    ON lesplus FOR EACH ROW
	begin
	set new.nom = (select nom from equipements where id = new.equipement_id);
    end$$
DELIMITER ;

/* trigger: chaque fois qu'on insert des datas dans la table voiture_lesplus, le titre et le nom vont s'auto-fill */
DELIMITER $$
CREATE TRIGGER fill_table_voiture_lesplus
    before INSERT
    ON voiture_lesplus FOR EACH ROW
	begin
	set new.titre = (select titre from voitures where id = new.voiture_id);
	set new.nom = (select nom from lesplus where id = new.lesplus_id);
    end$$
DELIMITER ;

/* procedure */
DELIMITER $$
CREATE PROCEDURE `get_prev_and_next_ref` (IN car_id TEXT)
BEGIN
	SELECT prev_id, id, next_id
	FROM (
		SELECT  
			   LAG(id) OVER (ORDER BY id) AS prev_id,
			   id,
			   LEAD(id) OVER (ORDER BY id) AS next_id
		FROM voitures
	) AS t
	WHERE id = car_id;
END$$
DELIMITER ;

/* UTILISATEURS : EMPLOYES */
INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, is_admin)
VALUES ('32afaf97-0535-4f90-875d-bdecad36648a', "aubriot", "marc", "marc.aubriot@outlook.fr", "$2y$10$IKnk.34eszvM4lq.JKwWJOMQ0br0ltJDnPNCEubprCems6DmC1.9.", false);

/* HORAIRES*/
INSERT INTO horaires (utilisateur_id, lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche) VALUES ( "977c0ead-139f-40b6-a7b6-da194d0bcbea", "09h00,12h00,13h00,17h00", "10h00,12h00,13h30,20h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "fermé,,,");

/* LISTE DES EQUIPEMENTS*/
INSERT INTO equipements (nom) VALUES ("Régulateur"), ("Limiteur de vitesse"), ("Radar de recul"), ("Sellerie en cuir"), ("Régulateur adaptatif"), ("Radar avant"), ("Avertisseurs d'angle mort"), ("Siège chauffant"), ("Affichage tête haute"), ("Attelage"), ("Connexion bluetooth"), ("Climatisation"), ("Régulateur de vitesse"), ("Bluetooth"), ("Ordinateur de bord"), ("Volant multifonction"), ("Rétroviseurs électriques"), ("Détecteur de fatigue");

/* VOITURE : RENAULT */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648c', '32afaf97-0535-4f90-875d-bdecad36648a', 'Renault Clio IV', 'Blue dci 100cv business', 'Manuelle', 'Diesel', '45000', '2018', '14500');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648c', 'http://localhost:3000/gvparrot/back/public_html/uploads/renault.jpg'),('32afaf97-0535-4f90-875d-bdecad36648c', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg'),('32afaf97-0535-4f90-875d-bdecad36648c', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648c', 'Rouge', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('1', '32afaf97-0535-4f90-875d-bdecad36648c'),('2', '32afaf97-0535-4f90-875d-bdecad36648c'),('3', '32afaf97-0535-4f90-875d-bdecad36648c'),('4', '32afaf97-0535-4f90-875d-bdecad36648c'),('5', '32afaf97-0535-4f90-875d-bdecad36648c'),('7', '32afaf97-0535-4f90-875d-bdecad36648c'),('8', '32afaf97-0535-4f90-875d-bdecad36648c'),('9', '32afaf97-0535-4f90-875d-bdecad36648c');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648c'),('2','32afaf97-0535-4f90-875d-bdecad36648c'),('3','32afaf97-0535-4f90-875d-bdecad36648c'),('4','32afaf97-0535-4f90-875d-bdecad36648c');

/* VOITURE : FORD */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648d', '32afaf97-0535-4f90-875d-bdecad36648a', 'Ford Focus', 'EcoBoost 1.0L Titanium', 'Manuelle', 'Essence', '35000', '2019', '13500');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648d', 'http://localhost:3000/gvparrot/back/public_html/uploads/ford.jpg'),('32afaf97-0535-4f90-875d-bdecad36648d', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg'),('32afaf97-0535-4f90-875d-bdecad36648d', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648d', 'Gris', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648d'),('8', '32afaf97-0535-4f90-875d-bdecad36648d'),('4', '32afaf97-0535-4f90-875d-bdecad36648d'),('2', '32afaf97-0535-4f90-875d-bdecad36648d'),('5', '32afaf97-0535-4f90-875d-bdecad36648d'),('3', '32afaf97-0535-4f90-875d-bdecad36648d'),('15', '32afaf97-0535-4f90-875d-bdecad36648d'),('10', '32afaf97-0535-4f90-875d-bdecad36648d'),('9', '32afaf97-0535-4f90-875d-bdecad36648d');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648d'),('2','32afaf97-0535-4f90-875d-bdecad36648d'),('3','32afaf97-0535-4f90-875d-bdecad36648d'),('4','32afaf97-0535-4f90-875d-bdecad36648d');

/* VOITURE : VOLKSWAGEN */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648e', '32afaf97-0535-4f90-875d-bdecad36648a', 'Volkswagen Golf', '1.6 TDI Comfortline', 'Manuelle', 'Diesel', '50000', '2017', '15500');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648e', 'http://localhost:3000/gvparrot/back/public_html/uploads/volkswagen.jpg'),('32afaf97-0535-4f90-875d-bdecad36648e', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg'),('32afaf97-0535-4f90-875d-bdecad36648e', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648e', 'Noire', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648e'),('8', '32afaf97-0535-4f90-875d-bdecad36648e'),('4', '32afaf97-0535-4f90-875d-bdecad36648e'),('2', '32afaf97-0535-4f90-875d-bdecad36648e'),('5', '32afaf97-0535-4f90-875d-bdecad36648e'),('3', '32afaf97-0535-4f90-875d-bdecad36648e'),('15', '32afaf97-0535-4f90-875d-bdecad36648e'),('10', '32afaf97-0535-4f90-875d-bdecad36648e'),('9', '32afaf97-0535-4f90-875d-bdecad36648e');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648e'),('2','32afaf97-0535-4f90-875d-bdecad36648e'),('3','32afaf97-0535-4f90-875d-bdecad36648e'),('4','32afaf97-0535-4f90-875d-bdecad36648e');

/* VOITURE : TOYOTA */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648f', '32afaf97-0535-4f90-875d-bdecad36648a', 'Toyotata', 'Tokyo Drift', 'Automatique', 'Electrique', '27800', '2022', '23000');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648f', 'http://localhost:3000/gvparrot/back/public_html/uploads/toyota.jpg'),('32afaf97-0535-4f90-875d-bdecad36648f', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg'),('32afaf97-0535-4f90-875d-bdecad36648f', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648f', 'Verte', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648f'),('8', '32afaf97-0535-4f90-875d-bdecad36648f'),('4', '32afaf97-0535-4f90-875d-bdecad36648f'),('9', '32afaf97-0535-4f90-875d-bdecad36648f');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648f'),('2','32afaf97-0535-4f90-875d-bdecad36648f'),('3','32afaf97-0535-4f90-875d-bdecad36648f'),('4','32afaf97-0535-4f90-875d-bdecad36648f');

/* VOITURE : PLACEHOLDER */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648g', '32afaf97-0535-4f90-875d-bdecad36648a', 'FAKE CAR', 'placeholder', 'Automatique', 'Electrique', '27800', '2022', '23000');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648g', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648g', 'Rouge', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648g'),('8', '32afaf97-0535-4f90-875d-bdecad36648g'),('4', '32afaf97-0535-4f90-875d-bdecad36648g'),('9', '32afaf97-0535-4f90-875d-bdecad36648g');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648g'),('2','32afaf97-0535-4f90-875d-bdecad36648g'),('3','32afaf97-0535-4f90-875d-bdecad36648g'),('4','32afaf97-0535-4f90-875d-bdecad36648g');

/* VOITURE : PLACEHOLDER */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648i', '32afaf97-0535-4f90-875d-bdecad36648a', 'FAKE CAR', 'placeholder', 'Automatique', 'Electrique', '27800', '2010', '1500');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648i', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648i', 'Rouge', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648i'),('8', '32afaf97-0535-4f90-875d-bdecad36648i'),('4', '32afaf97-0535-4f90-875d-bdecad36648i'),('9', '32afaf97-0535-4f90-875d-bdecad36648i');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648i'),('2','32afaf97-0535-4f90-875d-bdecad36648i'),('3','32afaf97-0535-4f90-875d-bdecad36648i'),('4','32afaf97-0535-4f90-875d-bdecad36648i');

/* VOITURE : PLACEHOLDER */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648j', '32afaf97-0535-4f90-875d-bdecad36648a', 'FAKE CAR', 'placeholder', 'Automatique', 'Electrique', '56000', '2001', '10000');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648j', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648j', 'Rouge', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648j'),('8', '32afaf97-0535-4f90-875d-bdecad36648j'),('4', '32afaf97-0535-4f90-875d-bdecad36648j'),('9', '32afaf97-0535-4f90-875d-bdecad36648j');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648j'),('2','32afaf97-0535-4f90-875d-bdecad36648j'),('3','32afaf97-0535-4f90-875d-bdecad36648j'),('4','32afaf97-0535-4f90-875d-bdecad36648j');

/* VOITURE : PLACEHOLDER */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648k', '32afaf97-0535-4f90-875d-bdecad36648a', 'FAKE CAR', 'placeholder', 'Automatique', 'Electrique', '80000', '1996', '30000');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648k', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648k', 'Rouge', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648k'),('8', '32afaf97-0535-4f90-875d-bdecad36648k'),('4', '32afaf97-0535-4f90-875d-bdecad36648k'),('9', '32afaf97-0535-4f90-875d-bdecad36648k');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648k'),('2','32afaf97-0535-4f90-875d-bdecad36648k'),('3','32afaf97-0535-4f90-875d-bdecad36648k'),('4','32afaf97-0535-4f90-875d-bdecad36648k');

/* VOITURE : PLACEHOLDER */
INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
VALUES ( '32afaf97-0535-4f90-875d-bdecad36648m', '32afaf97-0535-4f90-875d-bdecad36648a', 'FAKE CAR', 'placeholder', 'Automatique', 'Electrique', '1200', '2022', '25500');
INSERT INTO images (voiture_id, chemin) VALUES ('32afaf97-0535-4f90-875d-bdecad36648m', 'http://localhost:3000/gvparrot/back/public_html/uploads/placeholder.jpg');
INSERT INTO lesplus (equipement_id) VALUES ('1'),('2'),('3'),('4');
INSERT INTO details (voiture_id, couleur, puissance, rapports, places, portes, garantie, critair) VALUES ('32afaf97-0535-4f90-875d-bdecad36648m', 'Rouge', '6', '6', '4', '4', '12', 'B');
INSERT INTO voiture_equipements (equipement_id, voiture_id) VALUES ('6', '32afaf97-0535-4f90-875d-bdecad36648m'),('8', '32afaf97-0535-4f90-875d-bdecad36648m'),('4', '32afaf97-0535-4f90-875d-bdecad36648m'),('9', '32afaf97-0535-4f90-875d-bdecad36648m');
INSERT INTO voiture_lesplus (lesplus_id, voiture_id) VALUES ('1','32afaf97-0535-4f90-875d-bdecad36648m'),('2','32afaf97-0535-4f90-875d-bdecad36648m'),('3','32afaf97-0535-4f90-875d-bdecad36648m'),('4','32afaf97-0535-4f90-875d-bdecad36648m');

/* MESSAGES */
INSERT INTO messages (utilisateur_id, voiture_id, nom, prenom, telephone, email, sujet, content) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", '32afaf97-0535-4f90-875d-bdecad36648c',"Marc", "Aubriot", "0650550480", "marc.aubriot@outlook.fr", "test sujet", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." );

/* COMMENTAIRES */
INSERT INTO commentaires (nom, contenu, note) VALUES ('marc', "super garage, j'adore, j'adhère", "4.5");
INSERT INTO commentaires (nom, contenu, note) VALUES ('diane', "garage nul je déteste", "1.5");
INSERT INTO commentaires (nom, contenu, note) VALUES ('cram', "garage moyen osef", "2.5");
INSERT INTO commentaires (nom, contenu, note) VALUES ('rio', "nul nul nul", "0.5");
INSERT INTO commentaires (nom, contenu, note) VALUES ('albert', "Super super", "4.5");
INSERT INTO commentaires (nom, contenu, note) VALUES ('Mario', "j'y suis j'y reste", "3.5");

/* SERVICES : CARROSSERIE */
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Carrosserie", "Réparation", "Réparation des éraflures de carrosserie", "La réparation des éraflures de carrosserie est une opération qui vise à restaurer l'apparence esthétique de la carrosserie d'un véhicule en éliminant les éraflures et les rayures superficielles. Cette procédure peut impliquer le ponçage, l'application de mastic de remplissage, l'apprêtage et la mise en peinture pour obtenir un fini lisse et uniforme.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Carrosserie", "Redressement", "Redressement des éléments de carrosserie", "Le redressement des éléments de carrosserie consiste à réparer les déformations ou les bosses sur la carrosserie d'un véhicule. Cette opération peut impliquer l'utilisation d'outils spéciaux pour redresser les panneaux endommagés, en veillant à ce qu'ils retrouvent leur forme d'origine et qu'ils s'alignent correctement avec les autres éléments de la carrosserie.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Carrosserie", "Personnalisation", "Pose de film de protection carrosserie", "La pose de film de protection carrosserie est une méthode utilisée pour protéger la peinture et la carrosserie d'un véhicule contre les éraflures, les impacts de gravillons et autres dommages extérieurs. Ce film transparent est appliqué sur les zones exposées de la carrosserie, offrant une protection supplémentaire tout en préservant l'apparence esthétique du véhicule.");

/* SERVICES : MECANIQUE : FREINAGE */
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Mecanique", "Freinage", "Plaquettes de frein"," Le remplacement des plaquettes de frein est une opération essentielle de l'entretien des freins d'un véhicule. Les plaquettes de frein sont des composants clés qui créent la friction nécessaire pour ralentir et arrêter le véhicule lorsque vous appuyez sur la pédale de frein.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Mecanique", "Freinage", "Disques de frein", "Le remplacement des disques de frein est une opération essentielle pour maintenir un système de freinage sûr et efficace. Les disques de frein, également appelés rotors, sont les composants sur lesquels les plaquettes de frein appuient pour ralentir et arrêter le véhicule.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Mecanique", "Freinage", "Étriers de frein", "Les étriers de frein sont des composants essentiels du système de freinage. Ils abritent les plaquettes de frein et sont responsables de l'application de la pression sur les disques de frein pour ralentir ou arrêter le véhicule.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Mecanique", "Freinage", "Flexibles de frein", "Les flexibles de frein sont des tuyaux en caoutchouc renforcés qui relient les étriers aux conduites de frein. Ils permettent le transfert du liquide de frein sous pression depuis le système de freinage vers les étriers, permettant ainsi le mouvement des plaquettes de frein pour freiner les roues.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Mecanique", "Freinage", "Purge du liquide de frein", "La purge du liquide de frein est une opération qui consiste à éliminer l'air emprisonné dans le système de freinage et à remplacer le liquide de frein usagé par du liquide neuf. Cela garantit le bon fonctionnement et la performance du système de freinage.");

/* SERVICES : ENTRETIEN : ENTRETIEN MOTEUR */
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Entretien", "Entretien moteur", "Vidange d'huile",  "La vidange d'huile est une opération essentielle de l'entretien régulier du moteur d'un véhicule. Elle consiste à retirer l'ancienne huile moteur usagée et à la remplacer par de l'huile moteur fraîche et de qualité, afin de maintenir le bon fonctionnement et la durabilité du moteur.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Entretien", "Entretien moteur", "Remplacement du filtre à huile", "Le filtre à huile joue un rôle crucial dans le système de lubrification du moteur. Il retient les impuretés et les particules indésirables présentes dans l'huile moteur, empêchant ainsi leur circulation et leur accumulation dans le moteur. Le remplacement régulier du filtre à huile est essentiel pour maintenir la propreté de l'huile et la performance du moteur.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Entretien", "Entretien moteur", "Changement du filtre à air", "Le filtre à air assure la filtration de l'air qui entre dans le moteur, en retenant les particules de poussière, de saleté et d'autres impuretés. Un filtre à air encrassé peut réduire l'efficacité du moteur et entraîner une diminution des performances. Le changement régulier du filtre à air est recommandé pour maintenir un bon débit d'air et une combustion optimale.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Entretien", "Entretien moteur", "Remplacement des bougies d'allumage", "Les bougies d'allumage sont responsables de l'allumage du mélange air-carburant dans les cylindres du moteur. Des bougies d'allumage usées ou défectueuses peuvent entraîner des problèmes de démarrage, des ratés d'allumage et une baisse des performances du moteur. Le remplacement périodique des bougies d'allumage est recommandé pour assurer un bon fonctionnement du moteur.");
INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) VALUES ("977c0ead-139f-40b6-a7b6-da194d0bcbea", "Entretien", "Entretien moteur", "Nettoyage du système d'admission d'air", "Le système d'admission d'air du moteur peut accumuler des dépôts de carbone et d'autres résidus au fil du temps, ce qui peut réduire le flux d'air et affecter les performances du moteur. Le nettoyage du système d'admission d'air, y compris le papillon des gaz, les conduits et les vannes, peut contribuer à maintenir une bonne combustion et une efficacité maximale du moteur.");


/* jointure pour check */
SELECT
	voitures.id,
	voitures.titre,
	voitures.descript,
	equipements.nom,
	equipements.id
FROM voitures
JOIN voiture_equipements
  ON voitures.id = voiture_equipements.voiture_id
JOIN equipements
  ON equipements.id = voiture_equipements.equipement_id;