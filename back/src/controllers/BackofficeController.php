<?php

class BackofficeController extends Controller {

    public function index() {
        include_once ROOT.'/src/models/Utilisateur.php';

        $user = Utilisateur::createEntity($_REQUEST['id'], 'id');
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
        include_once ROOT.'/src/models/Image.php';
        include_once ROOT.'/src/models/VoitureEquipements.php';
        include_once ROOT.'/src/models/Detail.php';

        $response = '';

        // Renvoie un string contenant la liste des voitures : string = 'voiture&voiture&voiture#'
        $carlist = Voiture::createEntity();
        $carlist = $carlist->getAll();
        
        foreach($carlist as $voiture) {

            // récupère l'array contenant les images et le transforme en string "img+img+img"
            $images = Image::createEntity($voiture['id']);
            $images = $images->getAll(true);
            $stringImages = Controller::getIndexToStringInNestedArray($images,'chemin');

            // récupère l'array contenant les plus et le transforme en string "plus+plus+plus"
            $lesplus = VoitureEquipements::createEntity();
            $lesplus = $lesplus->getAll($voiture['id'], 1);
            $stringPlus = Controller::getIndexToStringInNestedArray($lesplus,'nom');

            // récupère l'array contenant les équipements et le transforme en string "equip+equip+equip"
            $equipements = VoitureEquipements::createEntity();
            $equipements = $equipements->getAll($voiture['id']);
            $stringEquipements = Controller::getIndexToStringInNestedArray($equipements,'nom');

            // récupèré l'objet contenant les détails et le transforme en string "détail+détail+détail"
            $details = Detail::createEntity($voiture['id']);

            $stringDetails = $details->getCouleur().'+'.$details->getPuissance().'+'.$details->getRapports().'+'.$details->getPlaces().'+'.$details->getPortes().'+'.$details->getGarantie().'+'.$details->getCritair();

            $response = $response. 
            $voiture['id'].','.
            $stringImages.','.
            $voiture['titre'].','.
            $voiture['descript'].','.
            $voiture['boite'].','.
            $voiture['carburant'].','.
            $voiture['kilometrage'].','.
            $voiture['annee'].','.
            $voiture['prix'].','.
            $stringPlus.','.
            $stringEquipements.','.
            $stringDetails.'&';
        };

        $response = $response.'#';

        // Renvoie un string contenant la liste des voitures et des équipements : string = "voiture&voiture&voiture#equip&equip&equip&"
        $equipementList = Equipement::createEntity();
        $equipementList = $equipementList->getAll();

        foreach($equipementList as $item) {
            $response = $response.$item['id'].'+'.$item['nom'].'&';
        };

        $response = $response.'#';

        // Renvoie un string contenant la liste des voitures et des équipements et des plus : string = "voiture&voiture#equip&equip#plus&plus&"
        $plusList = Equipement::createEntity();
        $plusList = $plusList->getAll(1);

        foreach($plusList as $item) {
            $response = $response.$item['id'].'+'.$item['nom'].'&';
        };

        echo $response;
    }

    public function addCar() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/VoitureEquipements.php';
        include_once ROOT.'/src/models/Equipement.php';
        include_once ROOT.'/src/models/Image.php';
        include_once ROOT.'/src/models/Detail.php';


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

        // créé un nouvel objet via son Model et envoit l'objet en BDD
        $car_id = Controller::guidv4();

        $voiture = Voiture::createEntity();
        $voiture->setId($car_id);
        $voiture->setUserId($_REQUEST['id']);
        $voiture->setTitre($_REQUEST['titre']);
        $voiture->setDescript($_REQUEST['descript']);
        $voiture->setBoite($_REQUEST['boite']);
        $voiture->setCarburant($_REQUEST['carburant']);
        $voiture->setKilometrage($_REQUEST['kilometrage']);
        $voiture->setAnnee($_REQUEST['annee']);
        $voiture->setPrix($_REQUEST['prix']);
        $voiture->push();

        // récupère chaque équipement et push en BDD avec l'id de la voiture, et si la voiture est un "plus" le notifie
        if ($_REQUEST['equipements']) {
            
            $equipementsList = explode('+', $_REQUEST['equipements']);

            foreach($equipementsList as $equipement) { //pour chaque nom d'équipement
                $equipement = Equipement::createEntity($equipement, 'nom'); // récupère l'id de l'équipement      

                $voiture_equipement = VoitureEquipements::createEntity(); 
                $voiture_equipement->setEquipementId($equipement->getId());
                $voiture_equipement->setVoitureId($car_id);
                if (str_contains($_REQUEST['lesplus'], $equipement->getNom())) { // si le nom de l'équipement est contenu dans le string des plus retourne true
                    $voiture_equipement->setPlus(1);
                } else {
                    $voiture_equipement->setPlus(0);
                }
                $voiture_equipement->push();
            }
        }

        // on récupère les détails et on envoie en BDD
        $detailsList = explode('+', $_REQUEST['details']);

        $details = Detail::createEntity();
        $details->setVoitureId($car_id);
        $details->setCouleur($detailsList[0]);
        $details->setPuissance($detailsList[1]);
        $details->setRapports($detailsList[2]);
        $details->setPlaces($detailsList[3]);
        $details->setPortes($detailsList[4]);
        $details->setGarantie($detailsList[5]);
        $details->setCritair($detailsList[6]);
        $details->push();

        // on récupère les images et on envoie le string en BDD
        $images = Image::createEntity();
        $images->setVoitureId($car_id);
        $images->setChemin(implode("+", $tmp_array));// transforme l'array en string pour stockage BDD
        $images->push(); 

        // envoit une réponse au front
        $response = 'voiture ajoutée sous la référence '.$car_id;
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

                $response = "Le fichier est une image - " . $check["mime"] . ".";
                echo $response;
                $uploadOk = 1;

                } else {

                $response = "Le fichier n'est pas une image";
                echo $response;
                $uploadOk = 0;

                }
            }

            // Check if file already exists
            if (file_exists($target_file)) {
                $response = "Ce fichier existe déjà.";
                echo $response;
                $uploadOk = 0;
            }

            // Check file size
            if ($_FILES["file-".$i]["size"] > 1000000) {
                $response = "Le fichier est trop volumineux.";
                echo $response;
                $uploadOk = 0;
            }

            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                $response = "Seuls les fichiers au format JPG, JPEG, PNG et GIF sont autorisés.";
                echo $response;
                $uploadOk = 0;
            }
        }

        // Check if $uploadOk is set to 0 by an error
        if ( $uploadOk != 0 && $count == 1 ) {

            $target_file = $target_dir . basename($_FILES["file-0"]["name"]);
            $target_file = explode("/", $target_file);
            $target_file = end($target_file);
            $response = "Votre fichier ". $target_file ." est prêt.";

        } else if ( $uploadOk != 0 && $count > 1 && $count < 6) {

            $response = "Vos fichiers sont prêts.";

        } else if ( $uploadOk != 0 && $count > 5 ) {
            $response = "Attention, 5 photos maximum.";
            $uploadOk = 0;
        } else {
            $response = " Une erreur est survenue; veuillez recharger la page.";
            $uploadOk = 0;
        }

        echo $response;
    }

    // MODULE : AddEmployee.jsx
    public function addEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';

        if ($_REQUEST['mdp1'] === $_REQUEST['mdp2']) {

            $employee = new Utilisateur(
                Controller::guidv4(),
                $_REQUEST['nom'],
                $_REQUEST['prenom'],
                $_REQUEST['email'],
                password_hash($_REQUEST['mdp1'], PASSWORD_DEFAULT),
                false
            );
            $employee->push();

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

        $horaires = Horaire::createEntity();
        $horaires->getAll();

        $lundi = $_REQUEST['lundi-0'].','.$_REQUEST['lundi-1'].','.$_REQUEST['lundi-2'].','.$_REQUEST['lundi-3'];
        $mardi = $_REQUEST['mardi-0'].','.$_REQUEST['mardi-1'].','.$_REQUEST['mardi-2'].','.$_REQUEST['mardi-3'];
        $mercredi = $_REQUEST['mercredi-0'].','.$_REQUEST['mercredi-1'].','.$_REQUEST['mercredi-2'].','.$_REQUEST['mercredi-3'];
        $jeudi = $_REQUEST['jeudi-0'].','.$_REQUEST['jeudi-1'].','.$_REQUEST['jeudi-2'].','.$_REQUEST['jeudi-3'];
        $vendredi= $_REQUEST['vendredi-0'].','.$_REQUEST['vendredi-1'].','.$_REQUEST['vendredi-2'].','.$_REQUEST['vendredi-3'];
        $samedi = $_REQUEST['samedi-0'].','.$_REQUEST['samedi-1'].','.$_REQUEST['samedi-2'].','.$_REQUEST['samedi-3'];
        $dimanche = $_REQUEST['dimanche-0'].','.$_REQUEST['dimanche-1'].','.$_REQUEST['dimanche-2'].','.$_REQUEST['dimanche-3'];

        $horaires->setId('1');
        $horaires->setUtilisateurId($_REQUEST['id']);
        $horaires->setLundi($lundi);
        $horaires->setMardi($mardi);
        $horaires->setMercredi($mercredi);
        $horaires->setJeudi($jeudi);
        $horaires->setVendredi($vendredi);
        $horaires->setSamedi($samedi);
        $horaires->setDimanche($dimanche);
        $horaires->modify();

        echo 'Modifications enregistrées !';
    }

    // MODULE : getEquipementList.jsx
    public function getEquipementList() {
        include_once ROOT.'/src/models/Equipement.php';

        $equipements = Equipement::createEntity();
        $equipements = $equipements->getAll();

        foreach($equipements as $item) {
            echo $item['id'].'+'.$item['nom'].'&';
        };
    }

    public function addEquipement() {
        include_once ROOT.'/src/models/Equipement.php';

        $equipement = Equipement::createEntity();
        $equipement->setNom($_REQUEST['nom']);
        $equipement->push();

        echo 'Equipement ajouté';
    }

    public function deleteEquipement() {
        include_once ROOT.'/src/models/Equipement.php';

        $equipement = Equipement::createEntity($_REQUEST['id']);
        $equipement->delete();

        echo 'Equipement supprimé';
    }

    // MODULE : SeeCarList.jsx
    public function deleteCar() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/Image.php';
        include_once ROOT.'/src/models/Detail.php';
        include_once ROOT.'/src/models/VoitureEquipements.php';
        include_once ROOT.'/src/models/Message.php';

        // delete les détails (1 ligne en bdd)
        //$details = Detail::createEntity($_REQUEST['id']);
        //$details->delete();

        // delete les photos (0,n lignes en bdd)
        //$images = Image::createEntity($_REQUEST['id']);
        //$images = $images->getAll(true);

        /*foreach($images as $img) { // peut être simplifié avec du sql "delete from images where voiture_id = :voiture_id' > supprime toutes les rows contenant l'id
            $img = Image::createEntity($img['voiture_id']);
            $img->delete();
        }*/

        // delete les équipements (0,n lignes en bdd)
        //$voiture_equipement = VoitureEquipements::createEntity();
        //$voiture_equipement = $voiture_equipement->getAll($_REQUEST['id']);

        /*foreach($voiture_equipement as $equipement) { // peut être simplifié avec du sql "delete from images where voiture_id = :voiture_id' > supprime toutes les rows contenant l'id
            $equipement = VoitureEquipements::createEntity($equipement['equipement_id'], $equipement['voiture_id']);
            $equipement->delete();
        }*/

        // delete les messages associés
        //$message = Message::createEntity($_REQUEST['id'], 'voiture_id');
        //$message->delete(true);

        // delete la voiture
        $voiture = Voiture::createEntity($_REQUEST["id"]);
        $voiture->delete();

        echo 'Voiture supprimée';
    }

    // MODULE : SeeCarList.jsx > ModifyCar.jsx
    public function getCarByRefAndEquipements() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/Equipement.php';
        include_once ROOT.'/src/models/Image.php';
        include_once ROOT.'/src/models/VoitureEquipements.php';
        include_once ROOT.'/src/models/Detail.php';

        // récupère l'array contenant les images et le transforme en string "img+img+img"
        $images = Image::createEntity($_REQUEST["ref"]);
        $images = $images->getAll(true);
        $stringImages = Controller::getIndexToStringInNestedArray($images,'chemin');

        // récupère l'array contenant les plus et le transforme en string "plus+plus+plus"
        $lesplus = VoitureEquipements::createEntity();
        $lesplus = $lesplus->getAll($_REQUEST["ref"], 1);
        $stringPlus = Controller::getIndexToStringInNestedArray($lesplus,'nom');

        // récupère l'array contenant les équipements et le transforme en string "equip+equip+equip"
        $equipements = VoitureEquipements::createEntity();
        $equipements = $equipements->getAll($_REQUEST["ref"]);
        $stringEquipements = Controller::getIndexToStringInNestedArray($equipements,'nom');

        // récupèré l'objet contenant les détails et le transforme en string "détail+détail+détail"
        $details = Detail::createEntity($_REQUEST["ref"]);

        $stringDetails = $details->getCouleur().'+'.$details->getPuissance().'+'.$details->getRapports().'+'.$details->getPlaces().'+'.$details->getPortes().'+'.$details->getGarantie().'+'.$details->getCritair();


        $voiture = Voiture::createEntity($_REQUEST["ref"]);

        $response =  
            $voiture->getId().','.
            $stringImages.','.
            $voiture->getTitre().','.
            $voiture->getDescript().','.
            $voiture->getBoite().','.
            $voiture->getCarburant().','.
            $voiture->getKilometrage().','.
            $voiture->getAnnee().','.
            $voiture->getPrix().','.
            $stringPlus.','.
            $stringEquipements.','.
            $stringDetails
        ;

        $response = $response.'#';

        $equipementList = Equipement::createEntity();
        $equipementList = $equipementList->getAll();

        foreach($equipementList as $item) {

            $response = $response.$item['id'].'+'.$item['nom'].'&';
        };

        $response = $response.'#';

        $plusList = Equipement::createEntity();
        $plusList = $plusList->getAll(true);

        foreach($plusList as $plus) {
            $response = $response.$plus['id'].'+'.$plus['nom'].'&';
        }

        echo $response;
    }

    public function deletePhoto() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/Image.php';

        // récupère le nouveau path des immages en requête, la référence et le nom de l'image
        $images = str_replace(',', '+', $_REQUEST['path']);
        $images = explode('+', $images);

        $deleteImg = Image::createEntity();
        $deleteImg->setVoitureId($_REQUEST['ref']);
        $deleteImg->delete(true);

         
        // créé un nouvel enregistrement avec les nouveaux path pour cette id de voiture
        foreach($images as $img) {
            $newImg = Image::createEntity();
            $newImg->setChemin($img);
            $newImg->setVoitureId($_REQUEST['ref']);
            $newImg->push();
        }

        // envoit une réponse au front
        //$response = 'Photos modifiées.';
        //echo $response;

        // efface l'image du répertoire d'upload
        $imgName = $_REQUEST['imgName'];
        $file_pointer = UPLOAD_PATH.$imgName;
        $file_name = explode("/", $file_pointer);
        $file_name = end($file_name);

        if (!unlink($file_pointer)) { 
            echo ("$file_name ne peut pas être supprimée à cause d'une erreur."); 
        } 
        else { 
            echo ("$file_name est supprimée."); 
        } 


    }

    public function modifyCar() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/VoitureEquipements.php';
        include_once ROOT.'/src/models/Equipement.php';
        include_once ROOT.'/src/models/Image.php';
        include_once ROOT.'/src/models/Detail.php';

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
        if (isset($_REQUEST['imgPath'])) {
            $path = $_REQUEST['imgPath'];
        }
        
        if ($_REQUEST['imgPathTrue'] === 'true' && $count > 1 ) {
            $images = $images.'+'.$path;
            $count--;
        } else if ( $_REQUEST['imgPathTrue'] === 'true' && $count <= 0 ) {
            $images = $path;
        }


        // récupère la voiture via son id et update les datas dans la BDD avec les datas recues
        $voiture = Voiture::createEntity($_REQUEST['ref']);
        $voiture->setUserId($_REQUEST['id']);
        $voiture->setTitre($_REQUEST['titre']);
        $voiture->setDescript($_REQUEST['descript']);
        $voiture->setBoite($_REQUEST['boite']);
        $voiture->setCarburant($_REQUEST['carburant']);
        $voiture->setKilometrage($_REQUEST['kilometrage']);
        $voiture->setAnnee($_REQUEST['annee']);
        $voiture->setPrix($_REQUEST['prix']);
        $voiture->modify();


        // on récupère les détails et on envoie en BDD
        $detailsList = explode('+', $_REQUEST['details']);

        $details = Detail::createEntity();
        $details->setVoitureId($_REQUEST['ref']);
        $details->setCouleur($detailsList[0]);
        $details->setPuissance($detailsList[1]);
        $details->setRapports($detailsList[2]);
        $details->setPlaces($detailsList[3]);
        $details->setPortes($detailsList[4]);
        $details->setGarantie($detailsList[5]);
        $details->setCritair($detailsList[6]);
        $details->modify();

        // on récupère les images et on envoie le string en BDD mais d'abord on supprime les images existantes
        $oldImages = Image::createEntity();
        $oldImages->setVoitureId($_REQUEST['ref']);
        $oldImages->delete(true);

        $images = explode("+", $images); // transforme le string en array puis pousse chaque image

        foreach($images as $img) {
            $imgObjet = Image::createEntity();
            $imgObjet->setVoitureId($_REQUEST['ref']);
            $imgObjet->setChemin($img);
            $imgObjet->push();
        }


        // récupèré chaque  équipement pour le pousser en BDD avec l'id de la voiture, on supprime d'abord les anciens equipements
        if ($_REQUEST['equipements']) {
            
            $equipementsList = explode('+', $_REQUEST['equipements']);

            $oldVoitureEquipements = VoitureEquipements::createEntity();
            $oldVoitureEquipements->setVoitureId($_REQUEST['ref']);
            $oldVoitureEquipements->delete(true);

            foreach($equipementsList as $equipement) {
                $equipID = Equipement::createEntity($equipement, 'nom');
                $equipID = $equipID->getId();

                $equip = VoitureEquipements::createEntity();
                $equip->setEquipementId($equipID);
                $equip->setVoitureId($_REQUEST['ref']);

                if (str_contains($_REQUEST['lesplus'], $equipement)) {
                    $equip->setPlus(1);
                } else {
                    $equip->setPlus(0);
                }

                $equip->push();
            }
        }

        // envoit une réponse au front
        $response = 'voiture '.$_REQUEST['ref'].': informations modifiées';
        echo $response;
    }

    // MODULE : VerifyComments.jsx
    public function getAllComments() {
        include_once ROOT.'/src/models/Comment.php';

        $comments = Comment::createEntity();
        $comments = $comments->getAll();

        foreach($comments as $item) {
            echo $item['id'].'+'.$item['nom'].'+'.$item['contenu'].'+'.$item['note'].'+'.$item['valider'].'&';
        };
    }

    public function deleteComment() {
        include_once ROOT.'/src/models/Comment.php';

        $comment = Comment::createEntity($_REQUEST['ID']);
        $comment->delete();

        echo 'Commentaire supprimé';
    }

    public function verifyComment() {
        include_once ROOT.'/src/models/Comment.php';

        $q = $_REQUEST['q'];
        $comment = Comment::createEntity($_REQUEST['ID']);

        if ($q === '0') {
            //$comment->pin();
            $comment->setUtilisateurId($_REQUEST['user']);
            $comment->setValider(1);
            $comment->modify();
            echo "Commentaire ajouté à l'Accueil";

        } else if ($q === '1') {
            //$comment->unPin();
            $comment->setUtilisateurId($_REQUEST['user']);
            $comment->setValider(0);
            $comment->modify();
            echo "Commentaire enlevé de l'Accueil";

        } else {

            echo 'Une erreur est survenue, la prise en compte des modifications peut prendre du temps. Veuillez réessayer dans quelques secondes.';

        };
    }

    // MODULE : ModifyServices.jsx
    public function deleteService() {
        include_once ROOT.'/src/models/Service.php';

        $service = Service::createEntity($_REQUEST['ID']);
        $service->delete();

        echo 'Service supprimé !';
    }

    public function modifyServices() {
        include_once ROOT.'/src/models/Service.php';

        $service = Service::createEntity($_REQUEST['ID']);
        $service->setUtilisateur($_REQUEST['user']);
        $service->setCategorie($_REQUEST['categorie']);
        $service->setSubCategorie($_REQUEST['subcategorie']);
        $service->setTitle($_REQUEST['title']);
        $service->setDescript($_REQUEST['descript']);
        $service->modify();

        echo 'Service modifié !';
    }

    public function addService() {
        include_once ROOT.'/src/models/Service.php';

        $service = Service::createEntity();
        $service->setUtilisateur($_REQUEST['user']);
        $service->setCategorie($_REQUEST['categorie']);
        $service->setSubCategorie($_REQUEST['subcategorie']);
        $service->setTitle($_REQUEST['title']);
        $service->setDescript($_REQUEST['descript']);
        $service->push();

        echo 'Service ajouté !';
    }

    // MODULE : ListEmployee.jsx
    public function listEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';

        $user_list = Utilisateur::createEntity();
        $user_list = $user_list->getAll();

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

        $user = Utilisateur::createEntity($_REQUEST['id'], 'id');

        echo 
            $user->getId().','.
            $user->getNom().','.
            $user->getPrenom().','.
            $user->getEmail().','.
            $user->getMotDePasse();
    }

    public function modifyEmployee() {
        include_once ROOT.'/src/models/Utilisateur.php';

        if ($_REQUEST['mdp1'] === $_REQUEST['mdp2']) {

            $employee = Utilisateur::createEntity($_REQUEST['id'] ,'id');
            $employee->setNom($_REQUEST['nom']);
            $employee->setPrenom($_REQUEST['prenom']);
            $employee->setEmail($_REQUEST['email']);

            if ( password_verify( $_REQUEST['mdp1'] ,$employee->getMotDePasse()) ) { 

                $employee->modify();
                echo "Informations modifiées";
                return;
                
            } else {

                $employee->setMotDePasse(password_hash($_REQUEST['mdp1'], PASSWORD_DEFAULT));
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
        include_once ROOT.'/src/models/Comment.php';
        include_once ROOT.'/src/models/Service.php';
        include_once ROOT.'/src/models/CustomSession.php';
        include_once ROOT.'/src/models/Message.php';
        include_once ROOT.'/src/models/Horaire.php';
        include_once ROOT.'/src/models/Voiture.php';

        // utilisateur
        $user = Utilisateur::createEntity($_REQUEST['id'], 'id');
        $user->delete();

        echo 'Employé supprimé de la base de données';
    }

    // MODULE : Mailbox.jsx
    public function getMessages() {
        include_once ROOT.'/src/models/Message.php';

        if ( $_REQUEST['q'] === 'viewedtrue' ) {
            $messages = Message::createEntity();
            $messages = $messages->getAll(1);
        } else if ( $_REQUEST['q'] === 'viewedfalse' ) {
            $messages = Message::createEntity();
            $messages = $messages->getAll(0);
        } else if ( $_REQUEST['q'] === 'all' ) {
            $messages = Message::createEntity();
            $messages = $messages->getAll();
        } else {
            $response = "Aucune action demandée au service, ou l'action est inconnue";
            return $response;
        }

        foreach($messages as $item) {
            echo $item['id'].'+'.$item['nom'].'+'.$item['prenom'].'+'.$item['telephone'].'+'.$item['email'].'+'.$item['sujet'].'+'.$item['content'].'+'.$item['lecture'].'&';
        };
    }

    public function verifyMessage() {
        include_once ROOT.'/src/models/Message.php';

        $message = Message::createEntity($_REQUEST['id']);

        if ($_REQUEST['q'] === 'y' ) {
            $message->checkAsViewed('1');
            echo 'Message marqué comme lu';
            return;

        } else if ( $_REQUEST['q'] === 'n' ) {
            $message->checkAsViewed('0');
            echo 'Message marqué comme non lu';
            return;
        }
    }

    public function deleteMessage() {
        include_once ROOT.'/src/models/Message.php';

        $message = Message::createEntity($_REQUEST['id']);
        $message->delete();
        echo 'Message supprimé';
    }

    // MODULE : Logout.jsx
    public function deleteUserSession() {
        include_once ROOT.'/src/models/CustomSession.php';

        $response = "";

        $session_to_logout = CustomSession::createEntity($_REQUEST['id']);

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