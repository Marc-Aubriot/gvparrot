<?php

class Voiture {

    private $id;
    private $utilisateur_id;
    private $titre;
    private $descript;
    private $boite;
    private $carburant;
    private $kilometrage;
    private $annee;
    private $prix;

    public function __construct($id, $utilisateur_id, $titre, $descript, $boite, $carburant, $kilometrage, $annee, $prix, )
    {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->titre = $titre;
        $this->descript = $descript;
        $this->boite = $boite;
        $this->carburant = $carburant;
        $this->kilometrage = $kilometrage;
        $this->annee = $annee;
        $this->prix = $prix;
    }

    // Fonction pour ajouter une nouvelle Voiture en base de données
    public function addCar($utilisateur_id, $titre, $descript, $boite, $carburant, $kilometrage, $annee, $prix) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO voitures ( utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
        VALUES ( :val0, :val2, :val3, :val4, :val5, :val6, :val7, :val8)');

        $stmt->execute(
            array(
            ':val0' => $utilisateur_id, 
            ':val2' => $titre, 
            ':val3' => $descript, 
            ':val4' => $boite,
            ':val5' => $carburant,
            ':val6' => $kilometrage,
            ':val7' => $annee,
            ':val8' => $prix,
        ));

        $conn = null;
    }

    // Fonction pour récupérer les informations d'une voiture dans la base de données en utilisant son id
    public function getCarById($car_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM voitures WHERE id = :id');

        $stmt->bindValue(':id', $car_id);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Voiture(
                $result['id'], 
                $result['utilisateur_id'],
                $result['titre'], 
                $result['descript'], 
                $result['boite'], 
                $result['carburant'],
                $result['kilometrage'],
                $result['annee'],
                $result['prix']
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer les informations d'une voiture dans la base de données en utilisant son id
    public function getCarByRef($car_ref) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM voitures WHERE ref = :ref');

        $stmt->bindValue(':ref', $car_ref);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Voiture(
                $result['id'],
                $result['utilisateur_id'],  
                $result['titre'], 
                $result['descript'], 
                $result['boite'], 
                $result['carburant'],
                $result['kilometrage'],
                $result['annee'],
                $result['prix'],
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer une liste des voitures
    public function getCarList() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM voitures');

        $stmt->execute();

        // Récupération du résultat sous d'un array contenant les voitures
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;           
            return $result;

        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer la liste des voitures avec filtres km, prix et année
    public function getCarListWithBasicFilter($km_Min, $km_Max, $annee_Min, $annee_Max, $prix_Min, $prix_Max) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        
        $stmt = $conn->prepare('SELECT * FROM voitures WHERE kilometrage >= :kmMin AND kilometrage <= :kmMax AND annee >= :anneeMin AND annee <= :anneeMax AND prix >= :prixMin AND prix <= :prixMax;');

        $stmt->bindValue(':kmMin', $km_Min);
        $stmt->bindValue(':kmMax', $km_Max);
        $stmt->bindValue(':anneeMin', $annee_Min);
        $stmt->bindValue(':anneeMax', $annee_Max);
        $stmt->bindValue(':prixMin', $prix_Min);
        $stmt->bindValue(':prixMax', $prix_Max);

        $stmt->execute();

        // Récupération du résultat sous d'un array contenant les voitures
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;         
            return $result;

        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer la ref précédente et la ref suivante en fonction de la ref actuelle, trié par id
    public function getPrevAndNextRef($ref) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $sql = 'CALL get_prev_and_next_ref(:ref)';

        $refs = [];

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':ref', $ref, PDO::PARAM_STR);
        
        $stmt->execute();

        $refs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $conn = null;

        return $refs;
    }

    // Fonction pour mettre à jour un champ d'une voiture dans la base de données
    public function updateChamp($champ, $nouvelleValeur) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE voitures SET " . $champ . "=:nouvelleValeur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nouvelleValeur', $nouvelleValeur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // Fonction pour delete la voiture dans la base de données
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM voitures WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

    // Méthodes pour recevoir les paramètres d'une voiture
    public function getId() { return $this->id; }
    public function getUserId() { return $this->utilisateur_id; }
    public function getTitre() { return $this->titre; }
    public function getDescript() { return $this->descript; }
    public function getBoite() { return $this->boite; }
    public function getCarburant() { return $this->carburant; }
    public function getKilometrage() { return $this->kilometrage; }
    public function getAnnee() { return $this->annee; }
    public function getPrix() { return $this->prix; }

    // Méthodes pour modifier les paramètres d'une voiture
    public function setTitre($new_value) { $this->titre = $new_value; }
    public function setDescript($new_value) { $this->descript = $new_value; }
    public function setBoite($new_value) { $this->boite = $new_value; }
    public function setCarburant($new_value) { $this->carburant = $new_value; }
    public function setKilometrage($new_value) { $this->kilometrage = $new_value; }
    public function setAnnee($new_value) { $this->annee = $new_value; }
    public function setPrix($new_value) { $this->prix = $new_value; }
}
?>