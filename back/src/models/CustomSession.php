<?php

Class CustomSession {
    private $id;
    private $utilisateur_id;
    private $token;
    private $connexion;
    private $logged;

    public function __construct($id, $utilisateur_id, $token, $connexion, $logged) {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->token = $token;
        $this->connexion = $connexion;
        $this->logged = $logged;
    }

    // retourne une entité vide : utilisé dans AccueilController
    public static function createEntity($id = null, $champ = null) {
        if ($id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            if ($champ) {
                $stmt = $conn->prepare('SELECT * FROM custom_sessions WHERE '.$champ.' = :id');
            } else {
                $stmt = $conn->prepare('SELECT * FROM custom_sessions WHERE utilisateur_id = :id');
            }  

            $stmt->bindValue(':id', $id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new CustomSession(
                    $result['id'], 
                    $result['utilisateur_id'],
                    $result['token'], 
                    $result['connexion'], 
                    $result['logged'], 
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new CustomSession(null,null,null,null,null);
        }
    }

    public function push() {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO custom_sessions (utilisateur_id, token) 
        VALUES (:val1, :val2)');

        $stmt->execute(
            array(
                ':val1' => $this->utilisateur_id,
                ':val2' => $this->token, 
            )
        );
       
        $con = null;
    }

    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM custom_sessions WHERE id = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

    // Méthodes pour recevoir les paramètres d'une voiture
    public function getId() { return $this->id; }
    public function getUtilisateur() { return $this->utilisateur_id; }
    public function getToken() { return $this->token; }
    public function getDate() { return $this->connexion; }
    public function getLogged() { return $this->logged; }

    // Méthodes pour modifier les paramètres d'une voiture
    public function setId($new_value) { $this->id = $new_value; }
    public function setUtilisateur($new_value) { $this->utilisateur_id = $new_value; }
    public function setToken($new_value) { $this->token = $new_value; }
    public function setDate($new_value) { $this->connexion = $new_value; }
    public function setLogged($new_value) { $this->logged = $new_value; }




        
    public function getSessionByToken($user_token) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM custom_sessions WHERE token = :token');

        $stmt->bindValue(':token', $user_token);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new CustomSession(
                $result['id'], 
                $result['utilisateur_id'], 
                $result['token'], 
                $result['connexion'], 
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




}
    
?>