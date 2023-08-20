<?php

Class Comment {

    private $id;
    private $utilisateur_id;
    private $nom;
    private $contenu;
    private $note;
    private $valider;

    public function __construct($id, $utilisateur_id, $nom, $contenu, $note, $valider) {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->nom = $nom;
        $this->contenu = $contenu;
        $this->note = $note;
        $this->valider = $valider;
    }

    // retourne une entité vide : utilisé dans AccueilController
    public static function createEntity($id = null) {
        if ($id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM commentaires WHERE id = :id');

            $stmt->bindValue(':id', $id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new Comment(
                    $result['id'], 
                    $result['utilisateur_id'],
                    $result['nom'], 
                    $result['contenu'], 
                    $result['note'], 
                    $result['valider']
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new Comment(null,null,null,null,null,null);
        }
    }

    // Méthodes pour recevoir les paramètres
    public function getId() { return $this->id; }
    public function getUtilisateurId() { return $this->utilisateur_id; }
    public function getNom() { return $this->nom; }
    public function getContenu() { return $this->contenu; }
    public function getNote() { return $this->note; }
    public function getValider() { return $this->valider; }

    // Méthodes pour modifier les paramètres
    public function setId($new_value) { $this->id = $new_value; }
    public function setUtilisateurId($new_value) { $this->utilisateur_id = $new_value; }
    public function setNom($new_value) { $this->nom = $new_value; }
    public function setContenu($new_value) { $this->contenu = $new_value; }
    public function setNote($new_value) { $this->note = $new_value; }
    public function setValider($new_value) { $this->valider = $new_value; }

    // envoie les données nom, contenu, et note en BDD : utilisé dans AccueilController
    public function push() {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO commentaires (nom, contenu, note) 
        VALUES (:val2, :val3, :val4)');

        $stmt->execute(
            array(
                ':val2' => $this->nom, 
                ':val3' => $this->contenu, 
                ':val4' => $this->note,
        
            )
        );

        $con = null;
    }

    // récupère les données id, utilisateur_id, nom, contenu, note et valider depuis la BDD : utilisé dans AccueilController
    public function getAllValidated() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM commentaires WHERE valider = true');

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
    

    /* FONCTIONS OBSOLETES ?*/
    // fonction pour ajouter un nouveau commentaire en DB
    public function addComment($nom, $contenu, $note) {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO commentaires (nom, contenu, note) 
        VALUES (:val2, :val3, :val4)');

        $stmt->execute(
            array(':val2' => $nom, 
            ':val3' => $contenu, 
            ':val4' => $note,
        ));

        $con = null;
    }

    // fonction pour ajouter un nouveau commentaire en DB
    public function addCommentByEmployee() {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO commentaires (nom, contenu, note, valider) 
        VALUES (:val2, :val3, :val4, :val5)');

        $stmt->execute(
            array(':val2' => $this->nom, 
            ':val3' => $this->contenu, 
            ':val4' => $this->note,
            ':val5' => $this->valider
        ));

        $con = null;
    }

    // Fonction pour récupérer tous les comments non validés
    public function getCommentList() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM commentaires');

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

    // Fonction pour récupérer tous les comments validés
    public function getValidatedCommentList() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM commentaires WHERE valider = true');

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

    // Fonction pour mettre à jour un champ 
    public function updateChamp($champ, $nouvelleValeur) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE commentaires SET " . $champ . "=:nouvelleValeur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nouvelleValeur', $nouvelleValeur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // Fonction pour mettre à jour un champ 
    public function pin() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE commentaires SET valider = 1 WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // Fonction pour mettre à jour un champ 
    public function unPin() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE commentaires SET valider = 0 WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // Fonction pour delete
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM commentaires WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

}
?>