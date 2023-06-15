/* populate db : test data + dummy data */
/* VOITURES */
INSERT INTO voitures ( images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details)
VALUES ( '../ressources/images/gallerie/renault.jpg+../ressources/images/gallerie/coxx.jpg', 'Renault Clio IV', 'Blue dci 100cv business', 'Manuelle', 'Diesel', '45000', '2018', '14500', 'Cuir+Sièges chauffants+Toit ouvrant+GPS', 'Régulateur+Limiteur de vitesse+Radar de recul+Sellerie en cuir+Régulateur adaptatif+Radar avant+Avertisseur d angle mort+Siège chauffant+Affichage tête haute+Attelage+Connexion bluetooth+etc', 'Bleu+6 cv+5 portes+5 places+12 mois+B');

INSERT INTO voitures (id, images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details)
VALUES ( '../ressources/images/gallerie/ford.jpg+../ressources/images/gallerie/coxx.jpg', 'Ford Focus', 'EcoBoost 1.0L Titanium', 'Manuelle', 'Essence', '35000', '2019', '13500', 'Climatisation automatique+Caméra de recul+Jantes en alliage+Start-Stop', 'Régulateur+Limiteur de vitesse+Bluetooth+Feux de jour LED+Détecteur de pluie+Radar avant et arrière+Volant en cuir+Écran tactile 8" SYNC', 'Gris+5 cv+5 portes+5 places+24 mois+D');

INSERT INTO voitures (id, images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details)
VALUES ( '../ressources/images/gallerie/volkswagen.jpg+../ressources/images/gallerie/coxx.jpg', 'Volkswagen Golf', '1.6 TDI Comfortline', 'Manuelle', 'Diesel', '50000', '2017', '15500', 'Climatisation+Régulateur de vitesse+Radar de recul', 'Bluetooth+Ordinateur de bord+Volant multifonction+Rétroviseurs électriques+Détecteur de fatigue', 'Noir+6 cv+5 portes+5 places+12 mois+C');

/* UTILISATEURS */
INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("1", "aubriot", "marc", "marc.aubriot@outlook.fr", "testmotdepasse", "0650550480", "no message dispo", true);

INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("2", "pihet", "diane", "pihet@outlook.fr", "testmotdepasse2", "0650550480", "no message dispo", false);

INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("3", "brio", "cram", "brio@outlook.fr", "testmotdepasse3", "0650550480", "no message dispo", false);

INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, telephone, message, is_admin)
VALUES ("4", "aub", "rio", "aubrio@outlook.fr", "testmotdepasse4", "0650550480", "no message dispo", false);

INSERT INTO commentaires (nom, contenu, note, valider)
VALUES ('marc', "super garage, j'adore, j'adhère", "4.5", true);

INSERT INTO commentaires (nom, contenu, note, valider)
VALUES ('diane', "garage nul je déteste", "1.5", true);

INSERT INTO commentaires (nom, contenu, note, valider)
VALUES ('cram', "garage moyen osef", "2.5", true);

INSERT INTO commentaires (nom, contenu, note)
VALUES ('rio', "nul nul nul", "0.5");

/* SERVICES : CARROSSERIE */
INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Carrosserie", "Réparation", "Réparation des éraflures de carrosserie", "La réparation des éraflures de carrosserie est une opération qui vise à restaurer l'apparence esthétique de la carrosserie d'un véhicule en éliminant les éraflures et les rayures superficielles. Cette procédure peut impliquer le ponçage, l'application de mastic de remplissage, l'apprêtage et la mise en peinture pour obtenir un fini lisse et uniforme.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Carrosserie", "Redressement", "Redressement des éléments de carrosserie", "Le redressement des éléments de carrosserie consiste à réparer les déformations ou les bosses sur la carrosserie d'un véhicule. Cette opération peut impliquer l'utilisation d'outils spéciaux pour redresser les panneaux endommagés, en veillant à ce qu'ils retrouvent leur forme d'origine et qu'ils s'alignent correctement avec les autres éléments de la carrosserie.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Carrosserie", "Personnalisation", "Pose de film de protection carrosserie", "La pose de film de protection carrosserie est une méthode utilisée pour protéger la peinture et la carrosserie d'un véhicule contre les éraflures, les impacts de gravillons et autres dommages extérieurs. Ce film transparent est appliqué sur les zones exposées de la carrosserie, offrant une protection supplémentaire tout en préservant l'apparence esthétique du véhicule.");

/* SERVICES : MECANIQUE : FREINAGE */
INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Mecanique", "Freinage", "Plaquettes de frein"," Le remplacement des plaquettes de frein est une opération essentielle de l'entretien des freins d'un véhicule. Les plaquettes de frein sont des composants clés qui créent la friction nécessaire pour ralentir et arrêter le véhicule lorsque vous appuyez sur la pédale de frein.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Mecanique", "Freinage", "Disques de frein", "Le remplacement des disques de frein est une opération essentielle pour maintenir un système de freinage sûr et efficace. Les disques de frein, également appelés rotors, sont les composants sur lesquels les plaquettes de frein appuient pour ralentir et arrêter le véhicule.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Mecanique", "Freinage", "Étriers de frein", "Les étriers de frein sont des composants essentiels du système de freinage. Ils abritent les plaquettes de frein et sont responsables de l'application de la pression sur les disques de frein pour ralentir ou arrêter le véhicule.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Mecanique", "Freinage", "Flexibles de frein", "Les flexibles de frein sont des tuyaux en caoutchouc renforcés qui relient les étriers aux conduites de frein. Ils permettent le transfert du liquide de frein sous pression depuis le système de freinage vers les étriers, permettant ainsi le mouvement des plaquettes de frein pour freiner les roues.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Mecanique", "Freinage", "Purge du liquide de frein", "La purge du liquide de frein est une opération qui consiste à éliminer l'air emprisonné dans le système de freinage et à remplacer le liquide de frein usagé par du liquide neuf. Cela garantit le bon fonctionnement et la performance du système de freinage.");

/* SERVICES : ENTRETIEN : ENTRETIEN MOTEUR */
INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Entretien", "Entretien moteur", "Vidange d'huile",  "La vidange d'huile est une opération essentielle de l'entretien régulier du moteur d'un véhicule. Elle consiste à retirer l'ancienne huile moteur usagée et à la remplacer par de l'huile moteur fraîche et de qualité, afin de maintenir le bon fonctionnement et la durabilité du moteur.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Entretien", "Entretien moteur", "Remplacement du filtre à huile", "Le filtre à huile joue un rôle crucial dans le système de lubrification du moteur. Il retient les impuretés et les particules indésirables présentes dans l'huile moteur, empêchant ainsi leur circulation et leur accumulation dans le moteur. Le remplacement régulier du filtre à huile est essentiel pour maintenir la propreté de l'huile et la performance du moteur.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Entretien", "Entretien moteur", "Changement du filtre à air", "Le filtre à air assure la filtration de l'air qui entre dans le moteur, en retenant les particules de poussière, de saleté et d'autres impuretés. Un filtre à air encrassé peut réduire l'efficacité du moteur et entraîner une diminution des performances. Le changement régulier du filtre à air est recommandé pour maintenir un bon débit d'air et une combustion optimale.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Entretien", "Entretien moteur", "Remplacement des bougies d'allumage", "Les bougies d'allumage sont responsables de l'allumage du mélange air-carburant dans les cylindres du moteur. Des bougies d'allumage usées ou défectueuses peuvent entraîner des problèmes de démarrage, des ratés d'allumage et une baisse des performances du moteur. Le remplacement périodique des bougies d'allumage est recommandé pour assurer un bon fonctionnement du moteur.");

INSERT INTO services (categorie, subcategorie, titre, descript)
VALUES ("Entretien", "Entretien moteur", "Nettoyage du système d'admission d'air", 
"Le système d'admission d'air du moteur peut accumuler des dépôts de carbone et d'autres résidus au fil du temps, ce qui peut réduire le flux d'air et affecter les performances du moteur. Le nettoyage du système d'admission d'air, y compris le papillon des gaz, les conduits et les vannes, peut contribuer à maintenir une bonne combustion et une efficacité maximale du moteur.");

/* HORAIRES*/
INSERT INTO horaires (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche)
VALUES ( "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "08h00,12h00,13h00,18h00", "fermé,,,");