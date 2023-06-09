<?php

include_once ROOT.'/src/models/Voiture.php';

$q = $_REQUEST["q"];
$voiture = Voiture::getCarById($q);

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
    $voiture->getDetails()
;
?>