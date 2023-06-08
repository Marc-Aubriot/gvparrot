<?php

class Voiture {

    private $id;
    private $utilisateur_id;
    private $titre;
    private $images;
    private $prix;
    private $kilometrage;
    private $annee;
    private $caracteristiques;
    private $equipements;
    private $options;

    public function __construct($id, $utilisateur_id, $titre, $images, $prix, $kilometrage, $annee, $caracteristiques, $equipements, $options)
    {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->titre = $titre;
        $this->images = $images;
        $this->prix = $prix;
        $this->kilometrage = $kilometrage;
        $this->annee = $annee;
        $this->caracteristiques = $caracteristiques;
        $this->equipements = $equipements;
        $this->options = $options;
    }

    // Fonction pour ajouter une nouvelle Voiture en base de données
    public function addCar() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO voitures (id, utilisateur_id, titre, images, prix, kilometrage, annee, caracteristiques, equipements, options)
        VALUES (:id, :val1, :val2, :val3, :val4, :val5, :val6, :val7, :val8, :val9)');

        $stmt->execute(
            array(':id' => $this->id, 
            ':val1' => $this->utilisateur_id, 
            ':val2' => $this->titre, 
            ':val3' => $this->images, 
            ':val4' => $this->prix,
            ':val5' => $this->kilometrage,
            ':val6' => $this->annee,
            ':val7' => $this->caracteristiques,
            ':val8' => $this->equipements,
            ':val9' => $this->options
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
                $result['utilisateur_id'], 
                $result['titre'], 
                $result['images'], 
                $result['prix'], 
                $result['kilometrage'],
                $result['annee'],
                $result['caracteristiques'],
                $result['equipements'],
                $result['options']);
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
    public function getUserId() { return $this->utilisateur_id; }
    public function getTitle() { return $this->titre; }
    public function getImages() { return $this->images; }
    public function getPrice() { return $this->prix; }
    public function getKm() { return $this->kilometrage; }
    public function getYear() { return $this->annee; }
    public function getCarac() { return $this->caracteristiques; }
    public function getEquip() { return $this->equipements; }
    public function getOptions() { return $this->options; }

    // Méthodes pour modifier les paramètres d'une voiture
    public function setId($new_value) { $this->id = $new_value; }
    public function setUserId($new_value) { $this->utilisateur_id = $new_value; }
    public function setTitle($new_value) { $this->titre = $new_value; }
    public function setImages($new_value) { $this->images = $new_value; }
    public function setPrice($new_value) { $this->prix = $new_value; }
    public function setKm($new_value) { $this->kilometrage = $new_value; }
    public function setYear($new_value) { $this->annee = $new_value; }
    public function setCarac($new_value) { $this->caracteristiques = $new_value; }
    public function setEquip($new_value) { $this->equipements = $new_value; }
    public function setOptions($new_value) { $this->options = $new_value; }
}
?>