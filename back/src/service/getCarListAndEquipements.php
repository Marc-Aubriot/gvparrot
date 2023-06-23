<?php

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
?>
