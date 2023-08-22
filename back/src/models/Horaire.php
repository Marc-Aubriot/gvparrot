<?php

Class Horaire {
    
    private $id;
    private $utilisateur_id;
    private $lundi;
    private $mardi;
    private $mercredi;
    private $jeudi;
    private $vendredi;
    private $samedi;
    private $dimanche;

    public function __construct( $id, $utilisateur_id, $lundi, $mardi, $mercredi, $jeudi, $vendredi, $samedi, $dimanche)
    {
        $this->id = $id;
        $this->lundi = $lundi;
        $this->mardi = $mardi;
        $this->mercredi = $mercredi;
        $this->jeudi = $jeudi;
        $this->vendredi = $vendredi;
        $this->samedi = $samedi;
        $this->dimanche = $dimanche;
        $this->utilisateur_id = $utilisateur_id;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($id = null) {
        if ($id) {
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
        } else {
            return new Horaire(null,null,null,null,null,null,null,null,null);
        }
    }

    public function getAll() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('SELECT * FROM horaires WHERE id = :id');

        $stmt->bindValue(':id', $this->id);

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
                $result['dimanche'],
                $result['utilisateur_id']
            );
        } else {
            $conn = null;
            return null;
        }
    }

    // Fonction pour mettre à jour un champ 
    public function modify() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        // utilisateur_id
        $query = "UPDATE horaires SET utilisateur_id = :utilisateur_id WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':utilisateur_id', $this->utilisateur_id);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // lundi
        $query = "UPDATE horaires SET lundi = :lundi WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':lundi', $this->lundi);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // mardi
        $query = "UPDATE horaires SET mardi = :mardi WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':mardi', $this->mardi);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // mercredi
        $query = "UPDATE horaires SET mercredi = :mercredi WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':mercredi', $this->mercredi);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // jeudi
        $query = "UPDATE horaires SET jeudi = :jeudi WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':jeudi', $this->jeudi);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // vendredi
        $query = "UPDATE horaires SET vendredi = :vendredi WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':vendredi', $this->vendredi);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // samedi
        $query = "UPDATE horaires SET samedi = :samedi WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':samedi', $this->samedi);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // dimanche
        $query = "UPDATE horaires SET dimanche = :dimanche WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':dimanche', $this->dimanche);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // Méthodes pour recevoir les paramètres
    public function getId() { return $this->id; }
    public function getUtilisateurId() { return $this->utilisateur_id; }
    public function getLundi() { return $this->lundi; }
    public function getMardi() { return $this->mardi; }
    public function getMercredi() { return $this->mercredi; }
    public function getJeudi() { return $this->jeudi; }
    public function getVendredi() { return $this->vendredi; }
    public function getSamedi() { return $this->samedi; }
    public function getDimanche() { return $this->dimanche; }

    // Méthodes pour modifier les paramètres
    public function setId($new_value) { $this->id = $new_value; }
    public function setUtilisateurId($new_value) { $this->utilisateur_id = $new_value; }
    public function setLundi($new_value) { $this->lundi = $new_value; }
    public function setMardi($new_value) { $this->mardi = $new_value; }
    public function setMercredi($new_value) { $this->mercredi = $new_value; }
    public function setJeudi($new_value) { $this->jeudi = $new_value; }
    public function setVendredi($new_value) { $this->vendredi = $new_value; }
    public function setSamedi($new_value) { $this->samedi = $new_value; }
    public function setDimanche($new_value) { $this->dimanche = $new_value; }

    /* FONCTIONS OBSOLETES ? */
    // fonction pour ajouter 
    public function addHoraire($lundi, $mardi, $mercredi, $jeudi, $vendredi, $samedi, $dimanche, $utilisateur_id) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO horaires (lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche, utilisateur_id) 
        VALUES (:val1, :val2, :val3, :val4, :val5, :val6, :val7, :val8)');

        $stmt->execute(
            array(
                ':val1' => $lundi,
                ':val2' => $mardi, 
                ':val3' => $mercredi, 
                ':val4' => $jeudi,
                ':val5' => $vendredi,
                ':val6' => $samedi,
                ':val7' => $dimanche,
                ':val8' => $utilisateur_id
            )
        );

        $conn = null;
    }

    // Fonction pour récupérer les informations
    public function getHoraireByDay($jour) {
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

    // Fonction pour delete
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM horaires WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

}
?>
