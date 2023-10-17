<?php

class Image {
    private $id;
    private $voiture_id;
    private $chemin;

    public function __construct( $id, $voiture_id, $chemin)
    {
        $this->id = $id;
        $this->voiture_id = $voiture_id;
        $this->chemin = $chemin;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($voiture_id = null) {
        if ($voiture_id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM images WHERE voiture_id = :voiture_id');

            $stmt->bindValue(':voiture_id', $voiture_id);

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
            return new Image(null,null,null);
        }
    }

    public function getId() { return $this->id; }
    public function getVoitureId() { return $this->voiture_id; }
    public function getChemin() { return $this->chemin; }

    public function setId($new_value) { $this->id = $new_value; }
    public function setVoitureId($new_value) { $this->voiture_id = $new_value; }
    public function setChemin($new_value) { $this->chemin = $new_value; }

    public function getAll($voiture = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $stmt = '';

        if ($voiture) {
            $stmt = $conn->prepare('SELECT * FROM images WHERE voiture_id = :voiture_id;');
            $stmt->bindValue(':voiture_id', $this->voiture_id);

        } else {
            $stmt = $conn->prepare('SELECT * FROM images');
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

    public function push() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO images (voiture_id, chemin)
        VALUES ( :val0, :val2)');

        $stmt->execute(
            array(
            ':val0' => $this->voiture_id, 
            ':val2' => $this->chemin, 
        ));

        $conn = null;
    }

    public function delete($voiture = null) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        if ($voiture) {
            $sql = "DELETE FROM images WHERE voiture_id = :voiture_id";
            $stmt = $db->prepare($sql);
            $stmt->bindValue(':voiture_id', $this->voiture_id);
            $stmt->execute();
        } else {
            $sql = "DELETE FROM images WHERE ID = :id";
            $stmt = $db->prepare($sql);
            $stmt->bindValue(':id', $this->id);
            $stmt->execute();
        }

        $db = null;
    }
}

?>