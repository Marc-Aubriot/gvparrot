<?php

class OccasionsController extends Controller {

    public function index() {

        include_once ROOT.'/src/models/Voiture.php';

        $q = explode( ",", $_REQUEST['q']);

        $km_min = $q[0];
        $km_max = $q[1];

        $annee_min = $q[2];
        $annee_max = $q[3];

        $prix_min = $q[4];
        $prix_max = $q[5];

        $carlist = Voiture::getCarListWithBasicFilter($km_min, $km_max, $annee_min, $annee_max, $prix_min, $prix_max);

        foreach($carlist as $voiture) {
            echo 
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
            $voiture['details'].',',
            $voiture['ref'].'&';
        };

    }

    public function getCarDetail() {
        include_once ROOT.'/src/models/Voiture.php';

        $q = $_REQUEST["q"];
        $voiture = Voiture::getCarByRef($q);

        echo 
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
            $voiture->getReference();
    }

    public function getPrevAndNextCar() {
        include_once ROOT.'/src/models/Voiture.php';

        $ref = $_REQUEST['ref'];

        $prev_and_next_refs = Voiture::getPrevAndNextRef($ref);

        if ($prev_and_next_refs[0]['prev_ref']) {
            echo $prev_and_next_refs[0]['prev_ref'].'+';
        } else {
            echo 'null+';
        }

        if ($prev_and_next_refs[0]['ref']) {
            echo $prev_and_next_refs[0]['ref'].'+';
        } else {
            echo 'null+';
        }

        if ($prev_and_next_refs[0]['next_ref']) {
            echo $prev_and_next_refs[0]['next_ref'].'+';
        } else {
            echo 'null';
        }
    }
}
?>