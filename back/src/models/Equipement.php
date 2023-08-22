<?php

Class Equipement {
    private $id;
    private $nom;

    public function __construct($id, $nom)
    {
        $this->id = $id;
        $this->nom = $nom;
    }

    public static function createEntity($id = null, $champ = null) {
        if ($id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            if ($champ) {
                $stmt = $conn->prepare('SELECT * FROM equipements WHERE '.$champ.' = :id');
            } else {
                $stmt = $conn->prepare('SELECT * FROM equipements WHERE id = :id');
            }
           
            
            $stmt->bindValue(':id', $id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new Equipement(
                    $result['id'], 
                    $result['nom'],
                );
            } else {
                $conn = null;
                return "erreur dans la création d'entité.";
            }
        } else {
            return new Equipement(null,null);
        }
    }

    public function push() {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO equipements (nom) 
        VALUES (:val2)');

        $stmt->execute(
            array(
                ':val2' => $this->nom, 
            )
        );
        
        $con = null;
    }

    public function getAll($plus = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        if ($plus) {
            $stmt = $conn->prepare('SELECT * FROM equipements WHERE plus = 1');
        } else {
            $stmt = $conn->prepare('SELECT * FROM equipements');
        }

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