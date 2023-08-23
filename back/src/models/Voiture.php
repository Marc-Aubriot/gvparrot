<?php

class Voiture {

    private $id;
    private $utilisateur_id;
    private $titre;
    private $descript;
    private $boite;
    private $carburant;
    private $kilometrage;
    private $annee;
    private $prix;

    public function __construct($id, $utilisateur_id, $titre, $descript, $boite, $carburant, $kilometrage, $annee, $prix, )
    {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->titre = $titre;
        $this->descript = $descript;
        $this->boite = $boite;
        $this->carburant = $carburant;
        $this->kilometrage = $kilometrage;
        $this->annee = $annee;
        $this->prix = $prix;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($id = null) {
        if ($id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM voitures WHERE id = :id');

            $stmt->bindValue(':id', $id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new Voiture(
                    $result['id'], 
                    $result['utilisateur_id'],
                    $result['titre'], 
                    $result['descript'], 
                    $result['boite'], 
                    $result['carburant'],
                    $result['kilometrage'],
                    $result['annee'],
                    $result['prix']
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new Voiture(null,null,null,null,null,null,null,null,null);
        }
    }

    // Méthodes pour recevoir les paramètres d'une voiture
    public function getId() { return $this->id; }
    public function getUserId() { return $this->utilisateur_id; }
    public function getTitre() { return $this->titre; }
    public function getDescript() { return $this->descript; }
    public function getBoite() { return $this->boite; }
    public function getCarburant() { return $this->carburant; }
    public function getKilometrage() { return $this->kilometrage; }
    public function getAnnee() { return $this->annee; }
    public function getPrix() { return $this->prix; }

    // Méthodes pour modifier les paramètres d'une voiture
    public function setId($new_value) { $this->id = $new_value; }
    public function setUserId($new_value) { $this->utilisateur_id = $new_value; }
    public function setTitre($new_value) { $this->titre = $new_value; }
    public function setDescript($new_value) { $this->descript = $new_value; }
    public function setBoite($new_value) { $this->boite = $new_value; }
    public function setCarburant($new_value) { $this->carburant = $new_value; }
    public function setKilometrage($new_value) { $this->kilometrage = $new_value; }
    public function setAnnee($new_value) { $this->annee = $new_value; }
    public function setPrix($new_value) { $this->prix = $new_value; }

    public function getAll($km_Min = null, $km_Max = null, $annee_Min = null, $annee_Max = null, $prix_Min = null, $prix_Max = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $stmt = '';

        if ($km_Min || $km_Max || $annee_Min || $annee_Max || $prix_Min || $prix_Max) {
            $stmt = $conn->prepare('SELECT * FROM voitures WHERE kilometrage >= :kmMin AND kilometrage <= :kmMax AND annee >= :anneeMin AND annee <= :anneeMax AND prix >= :prixMin AND prix <= :prixMax;');
            $stmt->bindValue(':kmMin', $km_Min);
            $stmt->bindValue(':kmMax', $km_Max);
            $stmt->bindValue(':anneeMin', $annee_Min);
            $stmt->bindValue(':anneeMax', $annee_Max);
            $stmt->bindValue(':prixMin', $prix_Min);
            $stmt->bindValue(':prixMax', $prix_Max);

        } else {
            $stmt = $conn->prepare('SELECT * FROM voitures');
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

    public function push() {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $conn->prepare('INSERT INTO voitures ( id, utilisateur_id, titre, descript, boite, carburant, kilometrage, annee, prix)
        VALUES ( :val0, :val1, :val2, :val3, :val4, :val5, :val6, :val7, :val8)');

        $stmt->execute(
            array(
                ':val0' => $this->id, 
                ':val1' => $this->utilisateur_id, 
                ':val2' => $this->titre, 
                ':val3' => $this->descript, 
                ':val4' => $this->boite,
                ':val5' => $this->carburant,
                ':val6' => $this->kilometrage,
                ':val7' => $this->annee,
                ':val8' => $this->prix,
            )
        );

        $conn = null;
    }

    public function getPrevAndNextRef($ref) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $sql = 'CALL get_prev_and_next_ref(:ref)';

        $refs = [];

        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':ref', $ref, PDO::PARAM_STR);
        
        $stmt->execute();

        $refs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $conn = null;

        return $refs;
    }

    public function modify() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        // user id
        $query = "UPDATE voitures SET utilisateur_id = :utilisateur_id WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':utilisateur_id', $this->utilisateur_id);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // titre 
        $query = "UPDATE voitures SET titre = :titre WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':titre', $this->titre);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // descript 
        $query = "UPDATE voitures SET descript = :descript WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':descript', $this->descript);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // boite 
        $query = "UPDATE voitures SET boite = :boite WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':boite', $this->boite);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // carburant 
        $query = "UPDATE voitures SET carburant = :carburant WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':carburant', $this->carburant);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // kilometrage 
        $query = "UPDATE voitures SET kilometrage = :kilometrage WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':kilometrage', $this->kilometrage);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // annee 
        $query = "UPDATE voitures SET annee = :annee WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':annee', $this->annee);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        //prix
        $query = "UPDATE voitures SET prix = :prix WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':prix', $this->prix);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM voitures WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

}
?>