<?php

Class Equipement {
    private $id;
    private $nom;

    public function __construct($id, $nom)
    {
        $this->id = $id;
        $this->nom = $nom;
    }

    // ADD
    public function addEquipement($nom) {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO equipements (nom) VALUES (:val1)');

        $stmt->execute(
            array( ':val1' => $nom ));

        $con = null;
    }

    // get par id
    public function getEquipementById($equipement_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM equipements WHERE id = :id');

        $stmt->bindValue(':id', $equipement_id);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Equipement(
                $result['id'], 
                $result['nom']
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // get par id
    public function getEquipementByNom($equipement_nom) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM equipements WHERE nom = :nom');

        $stmt->bindValue(':nom', $equipement_nom);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Equipement(
                $result['id'], 
                $result['nom']
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // get une liste des équipements
    public function getAllEquipements() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM equipements');
        $stmt->execute();

        // Récupération du résultat sous d'un array contenant les services
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;           
            return $result;

        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour delete
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM equipements WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

    // Méthodes pour recevoir les paramètres
    public function getId() { return $this->id; }
    public function getNom() { return $this->nom; }
 
    // Méthodes pour modifier les paramètres
    public function setId($new_value) { $this->id = $new_value; }
    public function setNom($new_value) { $this->nom = $new_value; }
}

?>