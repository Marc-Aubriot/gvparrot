<?php

Class Message {

    private $id;
    private $utilisateur_id;
    private $voiture_id;
    private $nom;
    private $prenom;
    private $telephone;
    private $email;
    private $sujet;
    private $content;
    private $lecture;

    public function __construct( $id, $utilisateur_id, $voiture_id, $nom, $prenom, $telephone, $email, $sujet, $content, $lecture)
    {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->voiture_id = $voiture_id;
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->telephone = $telephone;
        $this->email = $email;
        $this->sujet = $sujet;
        $this->content = $content;
        $this->lecture = $lecture;
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
                    $result['voiture_id'], 
                    $result['nom'], 
                    $result['prenom'], 
                    $result['telephone'],
                    $result['email'],
                    $result['sujet'],
                    $result['content'],
                    $result['lecture'],
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new Message(null,null,null,null,null,null,null,null,null,null);
        }
    }

    // Méthodes pour recevoir les paramètres
    public function getId() { return $this->id; }
    public function getUtilisateurId() { return $this->utilisateur_id; }
    public function getVoitureId() { return $this->voiture_id; }
    public function getNom() { return $this->nom; }
    public function getPrenom() { return $this->prenom; }
    public function getTelephone() { return $this->telephone; }
    public function getEmail() { return $this->email; }
    public function getSujet() { return $this->sujet; }
    public function getContent() { return $this->content; }
    public function getLecture() { return $this->lecture; }

    // Méthodes pour modifier les paramètres
    public function setId($new_value) { $this->id = $new_value; }
    public function setUtilisateurId($new_value) { $this->utilisateur_id = $new_value;}
    public function setVoitureId($new_value) { $this->voiture_id = $new_value; }
    public function setNom($new_value) { $this->nom = $new_value; }
    public function setPrenom($new_value) { $this->prenom = $new_value; }
    public function setTelephone($new_value) { $this->telephone = $new_value; }
    public function setEmail($new_value) { $this->email = $new_value; }
    public function setSujet($new_value) { $this->sujet = $new_value; }
    public function setContent($new_value) { $this->content = $new_value; }
    public function setLecture($new_value) { $this->content = $new_value; }

    // CREATE
    public function addMessage($nom, $prenom, $telephone, $email, $sujet, $content, $voiture_ref) {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO messages (nom, prenom, telephone, email, sujet, content, voiture_ref) 
        VALUES (:val1, :val2, :val3, :val4, :val5, :val6, :val7)');

        $stmt->execute(
            array(
                ':val1' => $nom, 
                ':val2' => $prenom, 
                ':val3' => $telephone,
                ':val4' => $email, 
                ':val5' => $sujet, 
                ':val6' => $content,
                ':val7' => $voiture_ref,
        ));

        $con = null;
    }

    // READ
    public function getMessageById($message_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM messages WHERE id = :id');

        $stmt->bindValue(':id', $message_id);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Message(
                $result['id'], 
                $result['utilisateur_id'], 
                $result['voiture_id'], 
                $result['nom'], 
                $result['prenom'], 
                $result['telephone'], 
                $result['email'],
                $result['sujet'], 
                $result['content'],
                $result['lecture'],
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer tous les messages lu / non lu
    public function getMessageListByViewStatut($view_statut) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM messages WHERE lecture = :lecture ORDER BY id DESC');

        $stmt->bindValue(':lecture', $view_statut);
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

    // Fonction pour récupérer tous les messages
    public function getMessageList() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM messages ORDER BY id DESC');

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

    // UPDATE
    public function updateChamp($champ, $nouvelleValeur) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE messages SET " . $champ . "=:nouvelleValeur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nouvelleValeur', $nouvelleValeur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    public function checkAsViewed($view) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE messages SET lecture=:view WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':view', $view);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // DELETE
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM messages WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

}
?>
