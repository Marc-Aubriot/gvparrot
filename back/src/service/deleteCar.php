<?php

include_once ROOT.'/src/models/Voiture.php';

$id = $_REQUEST["id"];

$voiture = Voiture::getCarById($id);

$voiture->delete();

echo 'Voiture supprimée'

?>