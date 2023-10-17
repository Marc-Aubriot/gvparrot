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

    // retourne une entité vide : utilisé dans AccueilController
    public static function createEntity($mail = null, $champ = null) {
        if ($mail) {
            $conn = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

            if ($champ) {
                $stmt = $conn->prepare('SELECT * FROM utilisateurs WHERE '.$champ.' = :mail');
            } else {
                $stmt = $conn->prepare('SELECT * FROM utilisateurs WHERE email = :mail');
            }
            
            $stmt->bindValue(':mail', $mail);

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
                    $result['is_admin'], 
                );
            } else {
                $conn = null;
                return "erreur dans la création d'entité.";
            }
        } else {
            return new Utilisateur(null,null,null,null,null,null);
        }
    }

    public function push() {
        $con = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        $stmt = $con->prepare('INSERT INTO utilisateurs (id, nom, prenom, email, mot_de_passe) 
        VALUES (:val1, :val2, :val3, :val4, :val5)');

        $stmt->execute(
            array(
                ':val1' => $this->id,
                ':val2' => $this->nom, 
                ':val3' => $this->prenom, 
                ':val4' => $this->email, 
                ':val5' => $this->mot_de_passe, 
            )
        );
        
        $con = null;
    }

    public function getAll() {
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


    
    public function modify() {
        $db = new PDO("mysql:host=". DB_HOST .";dbname=". DB_NAME, DB_USERNAME, DB_PASSWORD);

        // nom
        $stmt2 = $db->prepare("UPDATE utilisateurs SET nom =:nom WHERE id=:id");
        $stmt2->bindParam(':nom', $this->nom);
        $stmt2->bindParam(':id', $this->id);
        $stmt2->execute();

        // prenom
        $stmt3 = $db->prepare("UPDATE utilisateurs SET prenom =:prenom WHERE id=:id");
        $stmt3->bindParam(':prenom', $this->prenom);
        $stmt3->bindParam(':id', $this->id);
        $stmt3->execute();

        //  email
        $stmt4 = $db->prepare("UPDATE utilisateurs SET email =:email WHERE id=:id");
        $stmt4->bindParam(':email', $this->email);
        $stmt4->bindParam(':id', $this->id);
        $stmt4->execute();

        //  mot_de_passe
        $stmt4 = $db->prepare("UPDATE utilisateurs SET mot_de_passe =:mot_de_passe WHERE id=:id");
        $stmt4->bindParam(':mot_de_passe', $this->mot_de_passe);
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

}
?>
