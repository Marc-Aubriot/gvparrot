<?php

include_once ROOT.'/src/models/Voiture.php';
include_once ROOT.'/src/service/uuidv4Generator.php';

$tmp_array = [];
$count = $_REQUEST['file-count'];
$response = '';

// Push l'image dans l'array $tmp_array, repète l'opération pour le nombre $count d'image
for ( $i = 0; $i < $count; $i++ ) {

  $target_dir = UPLOAD_PATH;
  $target_file = $target_dir . basename($_FILES["file-".$i]["name"]);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  move_uploaded_file($_FILES["file-".$i]["tmp_name"], $target_file);

  $image = HTTP_SERVER.$_FILES["file-".$i]["name"];
  array_push($tmp_array, $image);
}

// Récupère toutes les infos envoyées par le front
$images = implode("+", $tmp_array); // transforme l'array en string pour stockage BDD
$titre = $_REQUEST['titre'];
$descript = $_REQUEST['descript'];
$boite = $_REQUEST['boite'];
$carburant = $_REQUEST['carburant'];
$kilometrage = $_REQUEST['kilometrage'];
$annee = $_REQUEST['annee'];
$prix = $_REQUEST['prix'];
//$lesplus = $_REQUEST['lesplus']; // réalisé ailleurs
$lesplus = ''; 
$equipements = $_REQUEST['equipements'];
$details = $_REQUEST['details'];
$ref = guidv4(); // génère une référence aléatoire

// créé un nouvel objet via son Model et envoit l'objet en BDD
$voiture = new Voiture($images, $titre, $descript,  $boite, $carburant, $kilometrage, $annee, $prix, $lesplus, $equipements, $details, $ref);
$voiture->addCar();

// envoit une réponse au front
$response = 'voiture ajoutée sous la référence '.$ref;
echo $response;
?>