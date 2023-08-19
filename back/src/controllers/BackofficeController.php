<?php

class BackofficeController extends Controller {

    public function index() {
        include_once ROOT.'/src/models/Utilisateur.php';

        $id = $_REQUEST['id'];
        $user = Utilisateur::getUserByID($id);
        $statut = 'user inconnu';

        if ($user->getIsAdmin() === 1) {
            $statut = 'Administrateur';
            echo $statut;
            return;
        } else {
            $statut = 'Employé';
            echo $statut;
            return;
        }
    }

    // MODULE : AddCar.jsx
    public function getCarListAndEquipements() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/Equipement.php';

        $equipements = Equipement::getAllEquipements();

        $carlist = Voiture::getCarList();

        $response = '';

        foreach($carlist as $voiture) {
            
            $response = $response.
            $voiture['id'].','.
            $voiture['images'].','.
            $voiture['titre'].','.
            $voiture['descript'].','.
            $voiture['boite'].','.
            $voiture['carburant'].','.
            $voiture['kilometrage'].','.
            $voiture['annee'].','.
            $voiture['prix'].','.
            $voiture['lesplus'].','.
            $voiture['equipements'].','.
            $voiture['details'].','.
            $voiture['ref'].'&';
        };

        $response = $response.'#';

        foreach($equipements as $item) {

            $response = $response.$item['id'].'+'.$item['nom'].'&';
        };

        echo $response;
    }

    public function addCar() {
        include_once ROOT.'/src/models/Voiture.php';

        $tmp_array = [];
        $count = $_REQUEST['file-count'];
        $response = '';

        // Push l'image dans l'array $tmp_array, repète l'opération pour le nombre $count d'image
        for ( $i = 0; $i < $count; $i++ ) {

        $target_dir = UPLOAD_PATH;
        $target_file = $target_dir . basename($_FILES["file-".$i]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        move_uploaded_file($_FILES["file-".$i]["tmp_name"], $target_file);

        $image = HTTP_SERVER.$_FILES["file-".$i]["name"];
        array_push($tmp_array, $image);
        }

        // Récupère toutes les infos envoyées par le front
        $images = implode("+", $tmp_array); // transforme l'array en string pour stockage BDD
        $titre = $_REQUEST['titre'];
        $descript = $_REQUEST['descript'];
        $boite = $_REQUEST['boite'];
        $carburant = $_REQUEST['carburant'];
        $kilometrage = $_REQUEST['kilometrage'];
        $annee = $_REQUEST['annee'];
        $prix = $_REQUEST['prix'];
        $lesplus = $_REQUEST['lesplus']; 
        //$lesplus = ''; 
        $equipements = $_REQUEST['equipements'];
        $details = $_REQUEST['details'];
        $ref = Controller::guidv4(); // génère une référence aléatoire

        // créé un nouvel objet via son Model et envoit l'objet en BDD
        $voiture = Voiture::addCar($images, $titre, $descript,  $boite, $carburant, $kilometrage, $annee, $prix, $lesplus, $equipements, $details, $ref);


        // envoit une réponse au front
        $response = 'voiture ajoutée sous la référence '.$ref;
        echo $response;
    }

    public function checkImg() {
        $tmp_array = [];
        $count = $_REQUEST['file-count'];
        $response = '';
        $uploadOk = 1;

        // Push l'image dans l'array $tmp_array, repète l'opération pour le nombre $count d'image
        for ( $i = 0; $i < $count; $i++ ) {

        $target_dir = UPLOAD_PATH;
        $target_file = $target_dir . basename($_FILES["file-".$i]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {

            $check = getimagesize($_FILES["file-".$i]["tmp_name"]);

            if($check !== false) {

            $response = "File is an image - " . $check["mime"] . ".";
            echo $response;
            $uploadOk = 1;

            } else {

            $response = "File is not an image.";
            echo $response;
            $uploadOk = 0;

            }
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            $response = "Sorry, file already exists.";
            echo $response;
            $uploadOk = 0;
        }

        // Check file size
        if ($_FILES["file-".$i]["size"] > 1000000) {
            $response = "Sorry, your file is too large.";
            echo $response;
            $uploadOk = 0;
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
            $response = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            echo $response;
            $uploadOk = 0;
        }
        }

        // Check if $uploadOk is set to 0 by an error
        if ( $uploadOk != 0 && $count == 1 ) {
            $response = "Votre fichier est prêt.";
        } else if ( $uploadOk != 0 && $count > 1 ) {
            $response = "Vos fichiers sont prêts.";
        }

        echo $response;
    }

    // MODULE : AddEmployee.jsx
    public function addEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';

        $id = Controller::guidv4();
        $nom = $_REQUEST['nom'];
        $prenom = $_REQUEST['prenom'];
        $email = $_REQUEST['email'];
        $mdp1 = $_REQUEST['mdp1'];
        $mdp2 = $_REQUEST['mdp2'];

        if ($mdp1 === $mdp2) {

            $hashpass = password_hash($mdp1, PASSWORD_DEFAULT);

            $employee = Utilisateur::addUser($id, $nom, $prenom, $email, $hashpass);

            echo "Employé ajouté à la base de données.";

            return;

        } else {

            echo "Les mots de passe doivent être identique.";

            return;
        }
    }

    // MODULE : ModifyHoraires.jsx
    public function modifyHoraires() {
        include_once ROOT.'/src/models/Horaire.php';

        $horaires = Horaire::getHoraire(1);

        $lundi_0 = $_REQUEST['lundi-0'];
        $lundi_1 = $_REQUEST['lundi-1'];
        $lundi_2 = $_REQUEST['lundi-2'];
        $lundi_3 = $_REQUEST['lundi-3'];
        $lundi = $lundi_0.','.$lundi_1.','.$lundi_2.','.$lundi_3;

        $mardi_0 = $_REQUEST['mardi-0'];
        $mardi_1 = $_REQUEST['mardi-1'];
        $mardi_2 = $_REQUEST['mardi-2'];
        $mardi_3 = $_REQUEST['mardi-3'];
        $mardi = $mardi_0.','.$mardi_1.','.$mardi_2.','.$mardi_3;

        $mercredi_0 = $_REQUEST['mercredi-0'];
        $mercredi_1 = $_REQUEST['mercredi-1'];
        $mercredi_2 = $_REQUEST['mercredi-2'];
        $mercredi_3 = $_REQUEST['mercredi-3'];
        $mercredi = $mercredi_0.','.$mercredi_1.','.$mercredi_2.','.$mercredi_3;

        $jeudi_0 = $_REQUEST['jeudi-0'];
        $jeudi_1 = $_REQUEST['jeudi-1'];
        $jeudi_2 = $_REQUEST['jeudi-2'];
        $jeudi_3 = $_REQUEST['jeudi-3'];
        $jeudi = $jeudi_0.','.$jeudi_1.','.$jeudi_2.','.$jeudi_3;

        $vendredi_0 = $_REQUEST['vendredi-0'];
        $vendredi_1 = $_REQUEST['vendredi-1'];
        $vendredi_2 = $_REQUEST['vendredi-2'];
        $vendredi_3 = $_REQUEST['vendredi-3'];
        $vendredi = $vendredi_0.','.$vendredi_1.','.$vendredi_2.','.$vendredi_3;

        $samedi_0 = $_REQUEST['samedi-0'];
        $samedi_1 = $_REQUEST['samedi-1'];
        $samedi_2 = $_REQUEST['samedi-2'];
        $samedi_3 = $_REQUEST['samedi-3'];
        $samedi = $samedi_0.','.$samedi_1.','.$samedi_2.','.$samedi_3;

        $dimanche_0 = $_REQUEST['dimanche-0'];
        $dimanche_1 = $_REQUEST['dimanche-1'];
        $dimanche_2 = $_REQUEST['dimanche-2'];
        $dimanche_3 = $_REQUEST['dimanche-3'];
        $dimanche = $dimanche_0.','.$dimanche_1.','.$dimanche_2.','.$dimanche_3;

        $horaires->modify('lundi', $lundi);
        $horaires->modify('mardi', $mardi);
        $horaires->modify('mercredi', $mercredi);
        $horaires->modify('jeudi', $jeudi);
        $horaires->modify('vendredi', $vendredi);
        $horaires->modify('samedi', $samedi);
        $horaires->modify('dimanche', $dimanche);

        echo 'Modifications enregistrées !';
    }

    // MODULE : getEquipementList.jsx
    public function getEquipementList() {
        include_once ROOT.'/src/models/Equipement.php';

        $equipements = Equipement::getAllEquipements();

        foreach($equipements as $item) {
            echo $item['id'].'+'.$item['nom'].'&';
        };
    }

    public function addEquipement() {
        include_once ROOT.'/src/models/Equipement.php';

        $nom = $_REQUEST['nom'];

        $equipement = Equipement::addEquipement($nom);

        echo 'Equipement ajouté';
    }

    public function deleteEquipement() {
        include_once ROOT.'/src/models/Equipement.php';

        $id = $_REQUEST['id'];

        $equipement = Equipement::getEquipementById($id);

        $equipement->delete();

        echo 'Equipement supprimé';
    }

    // MODULE : SeeCarList.jsx
    public function deleteCar() {
        include_once ROOT.'/src/models/Voiture.php';

        $id = $_REQUEST["id"];

        $voiture = Voiture::getCarById($id);

        $voiture->delete();

        echo 'Voiture supprimée';
    }

    // MODULE : SeeCarList.jsx > ModifyCar.jsx
    public function getCarByRefAndEquipements() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/Equipement.php';

        $equipements = Equipement::getAllEquipements();

        $ref = $_REQUEST["ref"];
        $voiture = Voiture::getCarByRef($ref);

        $response =  
            $voiture->getId().','.
            $voiture->getImages().','.
            $voiture->getTitre().','.
            $voiture->getDescript().','.
            $voiture->getBoite().','.
            $voiture->getCarburant().','.
            $voiture->getKilometrage().','.
            $voiture->getAnnee().','.
            $voiture->getPrix().','.
            $voiture->getLesplus().','.
            $voiture->getEquipements().','.
            $voiture->getDetails().','.
            $voiture->getReference()
        ;

        $response = $response.'#';

        foreach($equipements as $item) {

            $response = $response.$item['id'].'+'.$item['nom'].'&';
        };

        echo $response;
    }

    public function modifyCar() {
        include_once ROOT.'/src/models/Voiture.php';
        //include_once ROOT.'/src/service/uuidv4Generator.php';

        $tmp_array = [];
        $count = $_REQUEST['file-count'];
        $response = '';

        // Push l'image dans l'array $tmp_array, repète l'opération pour le nombre $count d'image
        for ( $i = 0; $i < $count; $i++ ) {

        $target_dir = UPLOAD_PATH;
        $target_file = $target_dir . basename($_FILES["file-".$i]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        move_uploaded_file($_FILES["file-".$i]["tmp_name"], $target_file);

        $image = HTTP_SERVER.$_FILES["file-".$i]["name"];
        array_push($tmp_array, $image);
        }

        // Récupère toutes les infos envoyées par le front
        $images = implode("+", $tmp_array); // transforme l'array en string pour stockage BDD
        $path = $_REQUEST['imgPath'];

        if ($_REQUEST['imgPathTrue'] === 'true' && $count > 1 ) {
            $images = $images.'+'.$path;
            $count--;
        } else if ( $_REQUEST['imgPathTrue'] === 'true' && $count <= 0 ) {
            $images = $path;
        }

        $ref = $_REQUEST['ref'];
        $titre = $_REQUEST['titre'];
        $descript = $_REQUEST['descript'];
        $boite = $_REQUEST['boite'];
        $carburant = $_REQUEST['carburant'];
        $kilometrage = $_REQUEST['kilometrage'];
        $annee = $_REQUEST['annee'];
        $prix = $_REQUEST['prix'];
        $lesplus = $_REQUEST['lesplus'];
        $equipements = $_REQUEST['equipements'];
        $details = $_REQUEST['details'];

        // récupère la voiture via son id et update les datas dans la BDD avec les datas recues
        $voiture = Voiture::getCarByRef($ref);
        $voiture->updateChamp('images',$images);
        $voiture->updateChamp('titre',$titre);
        $voiture->updateChamp('descript',$descript);
        $voiture->updateChamp('boite',$boite);
        $voiture->updateChamp('carburant',$carburant);
        $voiture->updateChamp('kilometrage',$kilometrage);
        $voiture->updateChamp('annee',$annee);
        $voiture->updateChamp('prix',$prix);
        $voiture->updateChamp('lesplus',$lesplus);
        $voiture->updateChamp('equipements',$equipements);
        $voiture->updateChamp('details',$details);

        // envoit une réponse au front
        $response = 'voiture '.$ref.': informations modifiées';
        echo $response;
    }

    // MODULE : VerifyComments.jsx
    public function deleteComment() {
        include_once ROOT.'/src/models/Comment.php';

        $id = $_REQUEST['ID'];

        $comment = Comment::getCommentById($id);

        $comment->delete();

        echo 'Commentaire supprimé';
    }

    public function verifyComment() {
        include_once ROOT.'/src/models/Comment.php';

        $id = $_REQUEST['ID'];
        $q = $_REQUEST['q'];
        $comment = Comment::getCommentById($id);


        if ($q === '0') {

            $comment->pin();
            echo "Commentaire ajouté à l'Accueil";

        } else if ($q === '1') {

            $comment->unPin();
            echo "Commentaire enlevé de l'Accueil";

        } else {

            echo 'Une erreur est survenue, la prise en compte des modifications peut prendre du temps. Veuillez réessayer dans quelques secondes.';

        };
    }

    // MODULE : ModifyServices.jsx
    public function deleteService() {
        include_once ROOT.'/src/models/Service.php';

        $ID = $_REQUEST['ID'];
        $service = Service::getServiceById($ID);
        $service->delete();

        echo 'Service supprimé !';
    }

    public function modifyServices() {
        include_once ROOT.'/src/models/Service.php';

        $ID = $_REQUEST['ID'];
        $categorie = $_REQUEST['categorie'];
        $subcategorie = $_REQUEST['subcategorie'];
        $title = $_REQUEST['title'];
        $descript = $_REQUEST['descript'];

        $service = Service::getServiceById($ID);
        $service->modify('categorie', $categorie);
        $service->modify('subcategorie', $subcategorie);
        $service->modify('titre', $title);
        $service->modify('descript', $descript);

        echo 'Service modifié !';
    }

    public function addService() {
        include_once ROOT.'/src/models/Service.php';

        $categorie = $_REQUEST['categorie'];
        $subcategorie = $_REQUEST['subcategorie'];
        $title = $_REQUEST['title'];
        $descript = $_REQUEST['descript'];

        $service = Service::addService($categorie, $subcategorie, $title, $descript);

        echo 'Service ajouté !';
    }

    // MODULE : ListEmployee.jsx
    public function listEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';

        $user_list = Utilisateur::getUserList();

        foreach($user_list as $user) {
            echo 
            $user['id'].','.
            $user['nom'].','.
            $user['prenom'].','.
            $user['email'].'&';
        };
    }

    // MODULE : ListEmployee.jsx > DetailEmployee.jsx
    public function detailEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';

        $id = $_REQUEST['id'];
        $user = Utilisateur::getUserByID($id);


        echo 
            $user->getId().','.
            $user->getNom().','.
            $user->getPrenom().','.
            $user->getEmail().','.
            $user->getMotDePasse();
    }

    public function modifyEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';
        //include_once ROOT.'/src/service/uuidv4Generator.php';

        $id = $_REQUEST['id'];
        $nom = $_REQUEST['nom'];
        $prenom = $_REQUEST['prenom'];
        $email = $_REQUEST['email'];
        $mdp1 = $_REQUEST['mdp1'];
        $mdp2 = $_REQUEST['mdp2'];

        if ($mdp1 === $mdp2) {

            $employee = Utilisateur::getUserByID($id);
            $user_password = $employee->getMotDePasse();

            $employee->setNom($nom);
            $employee->setPrenom($prenom);
            $employee->setEmail($email);

            if ( password_verify( $mdp1 ,$user_password) ) { 

                $employee->modify();
                echo "Informations modifiées";
                return;
                
            } else {
                $hashpass = password_hash($mdp1, PASSWORD_DEFAULT);
                $employee->setMotDePasse($hashpass);
                $employee->modify();
                echo "Informations et mot de passe modifiés";
                return;
            }


        } else {

            echo "Les mots de passe doivent être identique.";
            return;
        }
    }

    public function deleteEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';

        $id = $_REQUEST['id'];
        $user = Utilisateur::getUserByID($id);
        $user->delete();

        echo 'Employé supprimé de la base de données';
    }

    // MODULE : Logout.jsx
    public function deleteUserSession() {
        include_once ROOT.'/src/models/Session.php';

        $response = "";
        $user_id = $_REQUEST['id'];

        $session_to_logout = Session::getSessionByUser($user_id);

        if ($session_to_logout) { 
            $session_to_logout->delete(); 
        };

        if (isset($_COOKIE['PHP_User_Token'])) {
            unset($_COOKIE['PHP_User_Token']);
            setcookie('PHP_User_Token', null, ['secure'=>'true', 'httponly'=>'true', 'path'=>'/','samesite'=>'None', 'expires'=>'1']); 
            $response = "Déconnexion OK";
        } else {
            $response = "Pas de connexion active";
        }

        echo $response;
    }
}

?>