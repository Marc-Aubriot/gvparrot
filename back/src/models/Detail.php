<?php

class Detail {
    
    private $id;
    private $voiture_id;
    private $couleur;
    private $puissance;
    private $rapports;
    private $places;
    private $portes;
    private $garantie;
    private $critair;

    public function __construct( $id, $voiture_id, $couleur, $puissance, $rapports, $places, $portes, $garantie, $critair)
    {
        $this->id = $id;
        $this->voiture_id = $voiture_id;
        $this->couleur = $couleur;
        $this->puissance = $puissance;
        $this->rapports = $rapports;
        $this->places = $places;
        $this->portes = $portes;
        $this->garantie = $garantie;
        $this->critair = $critair;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($voiture_id = null) {
        if ($voiture_id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM details WHERE voiture_id = :id');

            $stmt->bindValue(':id', $voiture_id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new Detail(
                    $result['id'], 
                    $result['voiture_id'],
                    $result['couleur'],
                    $result['puissance'],
                    $result['rapports'],
                    $result['places'],
                    $result['portes'],
                    $result['garantie'],
                    $result['critair'],
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new Detail(null,null,null,null,null,null,null,null,null);
        }
    }

    public function getId() { return $this->id; }
    public function getVoitureId() { return $this->voiture_id; }
    public function getCouleur() { return $this->couleur; }
    public function getPuissance() { return $this->puissance; }
    public function getRapports() { return $this->rapports; }
    public function getPlaces() { return $this->places; }
    public function getPortes() { return $this->portes; }
    public function getGarantie() { return $this->garantie; }
    public function getCritair() { return $this->critair; }

    public function setId($new_value) { $this->id = $new_value; }
    public function setVoitureId($new_value) { $this->voiture_id = $new_value; }
    public function setCouleur($new_value) { $this->couleur = $new_value; }
    public function setPuissance($new_value) { $this->puissance = $new_value; }
    public function setRapports($new_value) { $this->rapports = $new_value;; }
    public function setPlaces($new_value) { $this->places = $new_value; }
    public function setPortes($new_value) { $this->portes = $new_value; }
    public function setGarantie($new_value) { $this->garantie = $new_value; }
    public function setCritair($new_value) { $this->critair = $new_value; }

    public function getAll($voiture_id = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $stmt = '';

        if ($voiture_id) {
            $stmt = $conn->prepare('SELECT * FROM details WHERE voiture_id = :voiture_id;');
            $stmt->bindValue(':voiture_id', $voiture_id);

        } else {
            $stmt = $conn->prepare('SELECT * FROM details');
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

        $stmt = $conn->prepare('INSERT INTO details ( voiture_id, couleur, puissance, rapports, places, portes, garantie, critair)
        VALUES ( :val0, :val2, :val3, :val4, :val5, :val6, :val7, :val8)');

        $stmt->execute(
            array(
            ':val0' => $this->voiture_id, 
            ':val2' => $this->couleur, 
            ':val3' => $this->puissance, 
            ':val4' => $this->rapports,
            ':val5' => $this->places,
            ':val6' => $this->portes,
            ':val7' => $this->garantie,
            ':val8' => $this->critair,
        ));

        $conn = null;
    }

    public function modify() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        // voiture_id
        $query = "UPDATE details SET voiture_id = :voiture_id WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':voiture_id', $this->voiture_id);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // couleur 
        $query = "UPDATE details SET couleur = :couleur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':couleur', $this->couleur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        // puissance 
        $query = "UPDATE details SET puissance = :puissance WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':puissance', $this->puissance);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // rapports 
        $query = "UPDATE details SET rapports = :rapports WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':rapports', $this->rapports);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // places 
        $query = "UPDATE details SET places = :places WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':places', $this->places);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // portes 
        $query = "UPDATE details SET portes = :portes WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':portes', $this->portes);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // garantie 
        $query = "UPDATE details SET garantie = :garantie WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':garantie', $this->garantie);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();
        
        // critair
        $query = "UPDATE details SET critair = :critair WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':critair', $this->critair);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM details WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }
} 
?>