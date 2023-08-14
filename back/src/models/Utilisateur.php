<?php

Class Utilisateur {

    private $id;
    private $nom;
    private $prenom;
    private $email;
    private $mot_de_passe;
    private $is_admin;

    public function __construct( $id, $nom, $prenom, $email, $mot_de_passe, $is_admin)
    {
        $this->id = $id;
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->email = $email;
        $this->mot_de_passe = $mot_de_passe;
        $this->is_admin = $is_admin;
    }

    // CREATE
    public static function addUser($id, $nom, $prenom, $email, $mot_de_passe) {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe, is_admin) 
        VALUES (:val1, :val2, :val3, :val4, :val5, :val6)');

        $stmt->execute(
            array(
                ':val1' => $id, 
                ':val2' => $nom, 
                ':val3' => $prenom,
                ':val4' => $email, 
                ':val5' => $mot_de_passe, 
                ':val6' => 0
        ));

        $con = null;
    }

    // READ
    public static function getUserByID($user_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM utilisateurs WHERE id = :id');

        $stmt->bindValue(':id', $user_id);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Utilisateur(
                $result['id'], 
                $result['nom'], 
                $result['prenom'], 
                $result['email'],
                $result['mot_de_passe'], 
                $result['is_admin']
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // READ
    public static function getUserByEmail($user_mail) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM utilisateurs WHERE email = :user_mail');

        $stmt->bindValue(':user_mail', $user_mail);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Utilisateur(
                $result['id'], 
                $result['nom'], 
                $result['prenom'], 
                $result['email'],
                $result['mot_de_passe'], 
                $result['is_admin']
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer tous les messages
    public static function getUserList() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM utilisateurs WHERE is_admin = 0');

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
        $query = "UPDATE utilisateurs SET " . $champ . "=:nouvelleValeur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nouvelleValeur', $nouvelleValeur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }
    public function modify() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt1 = $db->prepare("UPDATE utilisateurs SET nom =:nouvelleValeur WHERE id=:id");
        $stmt1->bindParam(':nouvelleValeur', $this->nom);
        $stmt1->bindParam(':id', $this->id);
        $stmt1->execute();

        $stmt2 = $db->prepare("UPDATE utilisateurs SET prenom =:nouvelleValeur WHERE id=:id");
        $stmt2->bindParam(':nouvelleValeur', $this->prenom);
        $stmt2->bindParam(':id', $this->id);
        $stmt2->execute();

        $stmt3 = $db->prepare("UPDATE utilisateurs SET email =:nouvelleValeur WHERE id=:id");
        $stmt3->bindParam(':nouvelleValeur', $this->email);
        $stmt3->bindParam(':id', $this->id);
        $stmt3->execute();

        $stmt4 = $db->prepare("UPDATE utilisateurs SET mot_de_passe =:nouvelleValeur WHERE id=:id");
        $stmt4->bindParam(':nouvelleValeur', $this->mot_de_passe);
        $stmt4->bindParam(':id', $this->id);
        $stmt4->execute();

        $db = null;
    }

    // DELETE
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM utilisateurs WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

    // Méthodes pour recevoir les paramètres
    public function getId() { return $this->id; }
    public function getNom() { return $this->nom; }
    public function getPrenom() { return $this->prenom; }
    public function getEmail() { return $this->email; }
    public function getMotDePasse() { return $this->mot_de_passe; }
    public function getIsAdmin() { return $this->is_admin; }

    // Méthodes pour modifier les paramètres
    public function setId($new_value) { $this->id = $new_value; }
    public function setNom($new_value) { $this->nom = $new_value; }
    public function setPrenom($new_value) { $this->prenom = $new_value; }
    public function setEmail($new_value) { $this->email = $new_value; }
    public function setMotDePasse($new_value) { $this->mot_de_passe = $new_value; }
    public function setIsAdmin($new_value) { $this->is_admin = $new_value; }
}
?>
