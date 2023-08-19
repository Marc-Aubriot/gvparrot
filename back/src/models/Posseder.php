<?php

class Posseder {
    
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

    public static function add($equipement_id, $voiture_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO posseder ( equipement_id, voiture_id )
        VALUES ( :val1, :val2 ) ');

        $stmt->execute(
            array(
            ':val1' => $equipement_id, 
            ':val2' => $voiture_id
        ));

        $conn = null;
    }

    // Fonction pour delete la voiture dans la base de données
    public static function delete($voiture_id) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM posseder WHERE voiture_id = :voiture_id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':voiture_id', $voiture_id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }
}
?>