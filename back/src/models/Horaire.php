<?php

Class Horaire {
    
    private $id;
    private $lundi;
    private $mardi;
    private $mercredi;
    private $jeudi;
    private $vendredi;
    private $samedi;
    private $dimanche;

    public function __construct( $id, $lundi, $mardi, $mercredi, $jeudi, $vendredi, $samedi, $dimanche)
    {
        $this->id = $id;
        $this->lundi = $lundi;
        $this->mardi = $mardi;
        $this->mercredi = $mercredi;
        $this->jeudi = $jeudi;
        $this->vendredi = $vendredi;
        $this->samedi = $samedi;
        $this->dimanche = $dimanche;
    }

    // fonction pour ajouter 
    public static function addHoraire($lundi, $mardi, $mercredi, $jeudi, $vendredi, $samedi, $dimanche) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO horaires (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche) 
        VALUES (:val1, :val2, :val3, :val4, :val5, :val6, :val7)');

        $stmt->execute(
            array(
                ':val1' => $lundi,
                ':val2' => $mardi, 
                ':val3' => $mercredi, 
                ':val4' => $jeudi,
                ':val5' => $vendredi,
                ':val6' => $samedi,
                ':val7' => $dimanche
            )
        );

        $conn = null;
    }

    public static function getHoraire($id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM horaires WHERE id = :id');

        $stmt->bindValue(':id', $id);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return new Horaire(
                $result['id'], 
                $result['lundi'], 
                $result['mardi'], 
                $result['mercredi'],
                $result['jeudi'], 
                $result['vendredi'],
                $result['samedi'],
                $result['dimanche']
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer les informations
    public static function getHoraireByDay($jour) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM horaires WHERE jour = :jour');

        $stmt->bindValue(':jour', $jour);

        $stmt->execute();

        // Récupération du résultat sous forme d'objet
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result) {
            $conn = null;
            return $result;
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour récupérer tous les horaires
    public static function getHorairesListByID($id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM horaires WHERE id = :id');
        $stmt->bindParam(':id', $id);

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
    public function modify($champ, $nouvelleValeur) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE horaires SET " . $champ . "=:nouvelleValeur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nouvelleValeur', $nouvelleValeur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // Fonction pour delete
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM horaires WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

    // Méthodes pour recevoir les paramètres
    public function getId() { return $this->id; }
    public function getLundi() { return $this->lundi; }
    public function getMardi() { return $this->mardi; }
    public function getMercredi() { return $this->mercredi; }
    public function getJeudi() { return $this->jeudi; }
    public function getVendredi() { return $this->vendredi; }
    public function getSamedi() { return $this->samedi; }
    public function getDimanche() { return $this->dimanche; }

    // Méthodes pour modifier les paramètres
    public function setId($new_value) { $this->id = $new_value; }
    public function setLundi($new_value) { $this->lundi = $new_value; }
    public function setMardi($new_value) { $this->mardi = $new_value; }
    public function setMercredi($new_value) { $this->mercredi = $new_value; }
    public function setJeudi($new_value) { $this->jeudi = $new_value; }
    public function setVendredi($new_value) { $this->vendredi = $new_value; }
    public function setSamedi($new_value) { $this->samedi = $new_value; }
    public function setDimanche($new_value) { $this->dimanche = $new_value; }
}
?>
