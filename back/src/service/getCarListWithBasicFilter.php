<?php

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
?>