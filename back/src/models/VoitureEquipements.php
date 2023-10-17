<?php

class VoitureEquipements {
    
    private $equipement_id;
    private $voiture_id;
    private $titre;
    private $nom;
    private $plus;

    private function __construct($equipement_id, $voiture_id, $titre, $nom, $plus) 
    {
        $this->equipement_id = $equipement_id;
        $this->voiture_id = $voiture_id;
        $this->titre = $titre;
        $this->nom = $nom;
        $this->plus = $plus;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($equipement_id = null, $voiture_id = null) {
        if ($equipement_id && $voiture_id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM voiture_equipements WHERE equipement_id = :equipement_id AND voiture_id = :voiture_id');

            $stmt->bindValue(':equipement_id', $equipement_id);
            $stmt->bindValue(':voiture_id', $voiture_id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new VoitureEquipements(
                    $result['equipement_id'], 
                    $result['voiture_id'],
                    $result['titre'],
                    $result['nom'],
                    $result['plus'],
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new VoitureEquipements(null,null,null,null,null);
        }
    }

    public function getEquipementId() { return $this->equipement_id; }
    public function setEquipementId($new_value) { $this->equipement_id = $new_value; }

    public function getVoitureId() { return $this->voiture_id; }
    public function setVoitureId($new_value) { $this->voiture_id = $new_value; }

    public function getTitre() { return $this->titre; }
    public function setTitre($new_value) { $this->titre = $new_value; }

    public function getNom() { return $this->nom; }
    public function setNom($new_value) { $this->nom = $new_value; }
        
    public function getPlus() { return $this->plus; }
    public function setPlus($new_value) { $this->plus = $new_value; }

    public function getAll($voiture_id = null, $plus = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $stmt = '';

        if ($voiture_id && $plus) {
            $stmt = $conn->prepare('SELECT * FROM voiture_equipements WHERE voiture_id = :voiture_id AND plus = :plus;');
            $stmt->bindValue(':voiture_id', $voiture_id);
            $stmt->bindValue(':plus', $plus);

        } else if ($voiture_id) {
            $stmt = $conn->prepare('SELECT * FROM voiture_equipements WHERE voiture_id = :voiture_id;');
            $stmt->bindValue(':voiture_id', $voiture_id);

        } else {
            $stmt = $conn->prepare('SELECT * FROM voiture_equipements');
        }

        $stmt->execute();

        // Récupération du résultat sous d'un array contenant les voitures
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            $conn = null;         
            return $result;

        } else {
            $conn = null;
            return [['nom' => '']];
        }
    }

    public function push() {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO voiture_equipements (equipement_id, voiture_id, plus) 
        VALUES (:val1, :val2, :val3)');

        $stmt->execute(
            array(
                ':val1' => $this->equipement_id, 
                ':val2' => $this->voiture_id, 
                ':val3' => $this->plus, 
            )
        );
        
        $con = null;
    }

    public function delete($all_voiture_equipement = null) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        if ($all_voiture_equipement) {
            $sql = "DELETE FROM voiture_equipements WHERE voiture_id = :voiture_id" ;
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':voiture_id', $this->voiture_id, PDO::PARAM_STR);
            $stmt->execute();
        } else {
            $sql = "DELETE FROM voiture_equipements WHERE equipement_id = :equipement_id AND voiture_id = :voiture_id" ;
            $stmt = $db->prepare($sql);
            $stmt->bindParam(':equipement_id', $this->equipement_id, PDO::PARAM_STR);
            $stmt->bindParam(':voiture_id', $this->voiture_id, PDO::PARAM_STR);
            $stmt->execute();
        }

        $db = null;
    }
}
?>