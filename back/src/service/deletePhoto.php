<?php

include_once ROOT.'/src/models/Voiture.php';

// récupère le nouveau path des immages en requête et la référence
$rawimages = $_REQUEST['path'];
$images = str_replace(',', '+', $rawimages);
$ref = $_REQUEST['ref'];

// récupèré la voiture via la référence et update le champs "images"
$voiture = Voiture::getCarByRef($ref);
$voiture->updateChamp('images', $images);

// envoit une réponse au front
$response = 'Photos modifiées pour la référence '.$ref;
echo $response;
?>