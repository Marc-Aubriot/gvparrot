<?php

include_once ROOT.'/src/models/Voiture.php';
include_once ROOT.'/src/models/Equipement.php';

$equipements = Equipement::getAllEquipements();

$carlist = Voiture::getCarList();

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

foreach($equipements as $item) {
    echo $item['id'].'+'.$item['nom'].'&';
};
?>
