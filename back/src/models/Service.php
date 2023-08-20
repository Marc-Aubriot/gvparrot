<?php

Class Service {
    
    private $id;
    private $utilisateur_id;
    private $categorie;
    private $subcategorie;
    private $titre;
    private $descript;

    public function __construct($id, $utilisateur_id, $categorie, $subcategorie,  $titre, $descript)
    {
        $this->id = $id;
        $this->utilisateur_id = $utilisateur_id;
        $this->categorie = $categorie;
        $this->subcategorie = $subcategorie;
        $this->titre = $titre;
        $this->descript = $descript;
    }

    // retourne une entité vide : utilisé dans Controller
    public static function createEntity($id = null) {
        if ($id) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            $stmt = $conn->prepare('SELECT * FROM services WHERE id = :id');

            $stmt->bindValue(':id', $id);

            $stmt->execute();

            // Récupération du résultat sous forme d'objet
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                $conn = null;
                return new Service(
                    $result['id'], 
                    $result['utilisateur_id'],
                    $result['categorie'], 
                    $result['subcategorie'],
                    $result['titre'], 
                    $result['descript']
                );
            } else {
                $conn = null;
                return null;
            }
        } else {
            return new Service(null,null,null,null,null,null);
        }
    }

    // Méthodes pour recevoir les paramètres
    public function getId() { return $this->id; }
    public function getUtilisateurId() { return $this->utilisateur_id; }
    public function getCategorie() { return $this->categorie; }
    public function getSubCategorie() { return $this->subcategorie; }
    public function getTitle() { return $this->titre; }
    public function getDescript() { return $this->descript; }

    // Méthodes pour modifier les paramètres
    public function setId($new_value) { $this->id = $new_value; }
    public function setUtilisateur($new_value) { $this->utilisateur_id = $new_value; }
    public function setCategorie($new_value) { $this->categorie = $new_value; }
    public function setSubCategorie($new_value) { $this->subcategorie = $new_value; }
    public function setTitle($new_value) { $this->titre = $new_value; }
    public function setDescript($new_value) { $this->descript = $new_value; }

    // Fonction pour récupérer tous les services
    public function getAll($categorie = null) {
        $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $stmt = '';

        if ($categorie) {
            $stmt = $conn->prepare('SELECT * FROM services WHERE categorie = :categorie');
            $stmt->bindValue(':categorie', $categorie);
        } else {
            $stmt = $conn->prepare('SELECT * FROM services');
        }

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            $conn = null;           
            return $result;
        } else {
            $conn = null;
            return null;
        }
        
    }

    /* FONCTIONS OBSOLETES ? */
    // fonction pour ajouter un nouveau service en DB
    public function addService($utilisateur_id, $categorie, $subcategorie, $titre, $descript) {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO services (utilisateur_id, categorie, subcategorie, titre, descript) 
        VALUES (:val0, :val1, :val2, :val3, :val4)');

        $stmt->execute(
            array(
            ':val0' => $utilisateur_id,
            ':val1' => $categorie,
            ':val2' => $subcategorie, 
            ':val3' => $titre, 
            ':val4' => $descript,
        ));

        $con = null;
    }

    // Fonction pour mettre à jour un champ 
    public function modify($champ, $nouvelleValeur) {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $query = "UPDATE services SET " . $champ . "=:nouvelleValeur WHERE id=:id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':nouvelleValeur', $nouvelleValeur);
        $stmt->bindParam(':id', $this->id);
        $stmt->execute();

        $db = null;
    }

    // Fonction pour delete
    public function delete() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);
        $sql = "DELETE FROM services WHERE ID = :id";
        $stmt = $db->prepare($sql);
        $stmt->bindParam(':id', $this->id, PDO::PARAM_STR);
        $stmt->execute();

        $db = null;
    }

}

?>