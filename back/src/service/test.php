<?php

include_once ROOT.'/src/models/Voiture.php';
include_once ROOT.'/src/service/uuidv4Generator.php';

$images = $_REQUEST['images'];
$titre = $_REQUEST['titre'];
$descript = $_REQUEST['descript'];
//$boite = $_REQUEST['boite'];
//$carburant = $_REQUEST['carburant'];
//$kilometrage = $_REQUEST['kilometrage'];
//$annee = $_REQUEST['annee'];
//$prix = $_REQUEST['prix'];
//$lesplus = $_REQUEST['lesplus'];
//$equipements = $_REQUEST['equipements'];
//$details = $_REQUEST['details'];
//$ref = $_REQUEST['ref'];

//$voiture = new Voiture($images, $titre, $descript,  $boite, $carburant, $kilometrage, $annee, $prix, $lesplus, $equipements, $details, $ref);

//$voiture->addCar();

echo 'OK'.$titre.','.$descript.','.$images;

?>