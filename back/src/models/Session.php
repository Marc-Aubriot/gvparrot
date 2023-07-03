<?php

Class Session {
    private $id;
    private $utilisateur;
    private $token;
    private $date_connection;
    private $logged;

    public function __construct($id, $utilisateur, $token, $date_connection, $logged) {
        $this->id = $id;
        $this->utilisateur = $utilisateur;
        $this->token = $token;
        $this->date_connection = $date_connection;
        $this->logged = $logged;
    }

    // CREATE
    public static function addSessions($utilisateur, $token) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO custom_sessions ( utilisateur, token )
        VALUES ( :val1, :val2 )');

        $stmt->execute(
            array(
            ':val1' => $utilisateur, 
            ':val2' => $token 
        ));

        $conn = null;
    }

    //READ
    public static function getSessionByUser($user_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM custom_sessions WHERE id = :id');

        $stmt->bindValue(':id', $user_id);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Session(
                $result['id'], 
                $result['utilisateur'], 
                $result['token'], 
                $result['date_connection'], 
                $result['logged']);
        } else {
            $conn = null;
            return null;
        }
    }
        
    public static function getSessionByToken($user_token) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM custom_sessions WHERE token = :token');

        $stmt->bindValue(':token', $user_token);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Session(
                $result['id'], 
                $result['utilisateur'], 
                $result['token'], 
                $result['date_connection'], 
                $result['logged']);
        } else {
            $conn = null;
            return null;
        }
    }

    
    // UPDATE
    public function updateChamp($champ, $nouvelleValeur) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE custom_sessions SET " . $champ . "=:nouvelleValeur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nouvelleValeur', $nouvelleValeur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // DELETE
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM custom_sessions WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

    // Méthodes pour recevoir les paramètres d'une voiture
    public function getId() { return $this->id; }
    public function getUtilisateur() { return $this->utilisateur; }
    public function getToken() { return $this->token; }
    public function getDate() { return $this->date_connection; }
    public function getLogged() { return $this->logged; }

    // Méthodes pour modifier les paramètres d'une voiture
    public function setId($new_value) { $this->id = $new_value; }
    public function setUtilisateur($new_value) { $this->utilisateur = $new_value; }
    public function setToken($new_value) { $this->token = $new_value; }
    public function setDate($new_value) { $this->date_connection = $new_value; }
    public function setLogged($new_value) { $this->logged = $new_value; }
}
    
?>