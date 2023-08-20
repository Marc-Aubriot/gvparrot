<?php

class VoitureEquipements {
    
    private $equipement_id;
    private $voiture_id;
    private $titre;
    private $nom;

    private function __construct($equipement_id, $voiture_id, $titre, $nom) 
    {
        $this->equipement_id = $equipement_id;
        $this->voiture_id = $voiture_id;
        $this->titre = $titre;
        $this->nom = $nom;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($id = null) {
        if ($id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM voiture_equipements WHERE id = :id');

            $stmt->bindValue(':id', $id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new Image(
                    $result['lesplus_id'], 
                    $result['voiture_id'],
                    $result['titre'],
                    $result['nom'],
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new VoitureEquipements(null,null,null,null);
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
        
    public function getAll($voiture_id = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $stmt = '';

        if ($voiture_id) {
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
            return null;
        }
    }
}
?>