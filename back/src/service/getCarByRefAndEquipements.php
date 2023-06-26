<?php

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
?>