<?php

class OccasionsController extends Controller {

    // récupère la liste des véhicules depuis la BDD et l'envoie au front
    public function index() {

        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/Image.php';
        include_once ROOT.'/src/models/VoitureLesplus.php';
        include_once ROOT.'/src/models/VoitureEquipements.php';
        include_once ROOT.'/src/models/Detail.php';

        $q = explode( ",", $_REQUEST['q']);

        $km_min = $q[0];
        $km_max = $q[1];

        $annee_min = $q[2];
        $annee_max = $q[3];

        $prix_min = $q[4];
        $prix_max = $q[5];

        $carlist = Voiture::createEntity();
        $carlist = $carlist->getAll($km_min, $km_max, $annee_min, $annee_max, $prix_min, $prix_max);

        foreach($carlist as $voiture) {

            // récupère l'array contenant les images et le transforme en string "img+img+img"
            $images = Image::createEntity();
            $images = $images->getAll($voiture['id']);
            $stringImages = Controller::getIndexToStringInNestedArray($images,'chemin');

            // récupère l'array contenant les plus et le transforme en string "plus+plus+plus"
            $lesplus = VoitureLesplus::createEntity();
            $lesplus = $lesplus->getAll($voiture['id']);
            $stringPlus = Controller::getIndexToStringInNestedArray($lesplus,'nom');

            // récupère l'array contenant les équipements et le transforme en string "equip+equip+equip"
            $equipements = VoitureLesplus::createEntity();
            $equipements = $equipements->getAll($voiture['id']);
            $stringEquipements = Controller::getIndexToStringInNestedArray($equipements,'nom');

            // récupèré l'objet contenant les détails et le transforme en string "détail+détail+détail"
            $details = Detail::createEntity($voiture['id']);

            $stringDetails = $details->getCouleur().'+'.$details->getPuissance().'+'.$details->getRapports().'+'.$details->getPlaces().'+'.$details->getPortes().'+'.$details->getGarantie().'+'.$details->getCritair();

            echo 
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

    }

    // récupère les infos d'un véhicule depuis la BDD et l'envoie au front
    public function getCarDetail() {
        include_once ROOT.'/src/models/Voiture.php';
        include_once ROOT.'/src/models/Image.php';
        include_once ROOT.'/src/models/VoitureLesplus.php';
        include_once ROOT.'/src/models/VoitureEquipements.php';
        include_once ROOT.'/src/models/Detail.php';

        $q = $_REQUEST["q"];
        $voiture = Voiture::createEntity($q);

        $images = Image::createEntity();
        $images = $images->getAll($voiture->getId());
        $stringImages = Controller::getIndexToStringInNestedArray($images, 'chemin');

        $lesplus = VoitureLesplus::createEntity();
        $lesplus = $lesplus->getAll($voiture->getId());
        $stringLesplus = Controller::getIndexToStringInNestedArray($lesplus, 'nom');

        $equipements = VoitureEquipements::createEntity();
        $equipements = $equipements->getAll($voiture->getId());
        $stringEquipements = Controller::getIndexToStringInNestedArray($equipements, 'nom');

        $details = Detail::createEntity($voiture->getId());
        $stringDetails = $details->getCouleur().'+'.$details->getPuissance().'+'.$details->getRapports().'+'.$details->getPlaces().'+'.$details->getPortes().'+'.$details->getGarantie().'+'.$details->getCritair();

        echo 
            $voiture->getId().','.
            $stringImages.','.
            $voiture->getTitre().','.
            $voiture->getDescript().','.
            $voiture->getBoite().','.
            $voiture->getCarburant().','.
            $voiture->getKilometrage().','.
            $voiture->getAnnee().','.
            $voiture->getPrix().','.
            $stringLesplus.','.
            $stringEquipements.','.
            $stringDetails;
    }

    // récupère l'id du véhicule selectionné ainsi que le suivant et précèdant depuis la BDD et l'envoie au front
    public function getPrevAndNextCar() {
        include_once ROOT.'/src/models/Voiture.php';

        $ref = $_REQUEST['ref'];

        $prev_and_next_refs = Voiture::createEntity();
        $prev_and_next_refs = $prev_and_next_refs->getPrevAndNextRef($ref);

        if ($prev_and_next_refs[0]['prev_id']) {
            echo $prev_and_next_refs[0]['prev_id'].'+';
        } else {
            echo 'null+';
        }

        if ($prev_and_next_refs[0]['id']) {
            echo $prev_and_next_refs[0]['id'].'+';
        } else {
            echo 'null+';
        }

        if ($prev_and_next_refs[0]['next_id']) {
            echo $prev_and_next_refs[0]['next_id'].'+';
        } else {
            echo 'null';
        }
    }

}
?>