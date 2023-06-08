<?php

include_once ROOT.'/src/models/Voiture.php';

$q = $_REQUEST["q"];
$voiture = Voiture::getCarById($q);

//echo $voiture->getTitle();
//echo json_encode($voiture);
//echo $voiture;
echo $voiture->getId().','.
    $voiture->getUserId().','.
    $voiture->getTitle().','.
    $voiture->getImages().','.
    $voiture->getPrice().','.
    $voiture->getKm().','.
    $voiture->getYear().','.
    $voiture->getCarac().','.
    $voiture->getEquip().','.
    $voiture->getOptions();
?>