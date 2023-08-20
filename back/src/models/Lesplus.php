<?php

class Lesplus {
    private $id;
    private $equipement_id;
    private $nom;

    public function __construct( $id, $equipement_id, $nom) 
    {
        $this->id = $id;
        $this->equipement_id = $equipement_id;
        $this->nom = $nom;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($id = null) {
        if ($id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM images WHERE id = :id');

            $stmt->bindValue(':id', $id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new Image(
                    $result['id'], 
                    $result['voiture_id'],
                    $result['chemin']
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new Lesplus(null,null,null);
        }
    }

    public function getId() { return $this->id; }
    public function getEquipementId() { return $this->equipement_id; }
    public function getNom() { return $this->nom; }

    public function setId($new_value) { $this->id = $new_value; }
    public function setEquipementId($new_value) { $this->equipement_id = $new_value; }
    public function setNom($new_value) { $this->nom = $new_value; }

    public function getAll($voiture_id = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $stmt = '';

        if ($voiture_id) {
            $stmt = $conn->prepare('SELECT * FROM lesplus WHERE voiture_id = :voiture_id;');
            $stmt->bindValue(':voiture_id', $voiture_id);

        } else {
            $stmt = $conn->prepare('SELECT * FROM lesplus');
        }

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
}
?>