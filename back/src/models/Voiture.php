<?php

class Voiture {

    private $id;
    private $images;
    private $titre;
    private $descript;
    private $boite;
    private $carburant;
    private $kilometrage;
    private $annee;
    private $prix;
    private $lesplus;
    private $equipements;
    private $details;
    private $ref;

    public function __construct($id, $images, $titre, $descript, $boite, $carburant, $kilometrage, $annee, $prix, $lesplus, $equipements, $details, $ref)
    {
        $this->id = $id;
        $this->images = $images;
        $this->titre = $titre;
        $this->descript = $descript;
        $this->boite = $boite;
        $this->carburant = $carburant;
        $this->kilometrage = $kilometrage;
        $this->annee = $annee;
        $this->prix = $prix;
        $this->lesplus = $lesplus;
        $this->equipements = $equipements;
        $this->details = $details;
        $this->ref = $ref;
    }

    // Fonction pour ajouter une nouvelle Voiture en base de données
    public static function addCar($images, $titre, $descript, $boite, $carburant, $kilometrage, $annee, $prix, $lesplus, $equipements, $details, $ref) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO voitures ( images, titre, descript, boite, carburant, kilometrage, annee, prix, lesplus, equipements, details, ref)
        VALUES ( :val1, :val2, :val3, :val4, :val5, :val6, :val7, :val8, :val9, :val10, :val11, :val12)');

        $stmt->execute(
            array(
            ':val1' => $images, 
            ':val2' => $titre, 
            ':val3' => $descript, 
            ':val4' => $boite,
            ':val5' => $carburant,
            ':val6' => $kilometrage,
            ':val7' => $annee,
            ':val8' => $prix,
            ':val9' => $lesplus,
            ':val10' => $equipements,
            ':val11' => $details,
            ':val12' => $ref
        ));

        $conn = null;
    }

    // Fonction pour récupérer les informations d'une voiture dans la base de données en utilisant son id
    public static function getCarById($car_id) {
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
                $result['images'], 
                $result['titre'], 
                $result['descript'], 
                $result['boite'], 
                $result['carburant'],
                $result['kilometrage'],
                $result['annee'],
                $result['prix'],
                $result['lesplus'],
                $result['equipements'],
                $result['details'],
                $result['ref']);
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer les informations d'une voiture dans la base de données en utilisant son id
    public static function getCarByRef($car_ref) {
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
                $result['images'], 
                $result['titre'], 
                $result['descript'], 
                $result['boite'], 
                $result['carburant'],
                $result['kilometrage'],
                $result['annee'],
                $result['prix'],
                $result['lesplus'],
                $result['equipements'],
                $result['details'],
                $result['ref']);
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer tous les comments validés
    public static function getCarList() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM voitures');

        $stmt->execute();

        // Récupération du résultat sous d'un array contenant les commentaires
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;           
            return $result;

        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer le nombre de car présent dans la DB
    public static function getMaxCar() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT COUNT(id) FROM voitures;');

        $stmt->execute();

        // Récupération du résultat sous d'un array contenant les commentaires
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;         
            return $result;

        } else {
            $conn = null;
            return null;
        }
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
    public function getImages() { return $this->images; }
    public function getTitre() { return $this->titre; }
    public function getDescript() { return $this->descript; }
    public function getBoite() { return $this->boite; }
    public function getCarburant() { return $this->carburant; }
    public function getKilometrage() { return $this->kilometrage; }
    public function getAnnee() { return $this->annee; }
    public function getPrix() { return $this->prix; }
    public function getLesplus() { return $this->lesplus; }
    public function getEquipements() { return $this->equipements; }
    public function getDetails() { return $this->details; }
    public function getReference() { return $this->ref; }

    // Méthodes pour modifier les paramètres d'une voiture
    public function setImages($new_value) { $this->images = $new_value; }
    public function setTitre($new_value) { $this->titre = $new_value; }
    public function setDescript($new_value) { $this->descript = $new_value; }
    public function setBoite($new_value) { $this->boite = $new_value; }
    public function setCarburant($new_value) { $this->carburant = $new_value; }
    public function setKilometrage($new_value) { $this->kilometrage = $new_value; }
    public function setAnnee($new_value) { $this->annee = $new_value; }
    public function setPrix($new_value) { $this->prix = $new_value; }
    public function setLesplus($new_value) { $this->lesplus = $new_value; }
    public function setEquipements($new_value) { $this->equipements = $new_value; }
    public function setDetails($new_value) { $this->details = $new_value; }
    public function setReference($new_value) { $this->ref = $new_value; }
}
?>