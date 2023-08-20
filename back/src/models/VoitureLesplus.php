<?php

class Posseder {
    
    private $lesplus_id;
    private $voiture_id;
    private $titre;
    private $nom;

    private function __construct($lesplus_id, $voiture_id, $titre, $nom) 
    {
        $this->lesplus_id = $lesplus_id;
        $this->voiture_id = $voiture_id;
        $this->titre = $titre;
        $this->nom = $nom;
    }

    public function add($lesplus_id, $voiture_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO posseder ( lesplus_id, voiture_id )
        VALUES ( :val1, :val2 ) ');

        $stmt->execute(
            array(
            ':val1' => $lesplus_id, 
            ':val2' => $voiture_id
        ));

        $conn = null;
    }

    // Fonction pour delete la voiture dans la base de données
    public function delete($voiture_id) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM posseder WHERE voiture_id = :voiture_id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':voiture_id', $voiture_id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

    public function getEquipementId() { return $this->lesplus_id; }
    public function setEquipementId($new_value) { $this->lesplus_id = $new_value; }

    public function getVoitureId() { return $this->voiture_id; }
    public function setVoitureId($new_value) { $this->voiture_id = $new_value; }

    public function getTitre() { return $this->titre; }
    public function setTitre($new_value) { $this->titre = $new_value; }

    public function getNom() { return $this->nom; }
    public function setNom($new_value) { $this->nom = $new_value; }
        
    
}
?>