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

if ($_REQUEST['imgPathTrue'] === 'true' && $count > 0 ) {
    $path = $_REQUEST['imgPath'];
    $images = $images.'+'.$path;
} else if ( $_REQUEST['imgPathTrue'] === 'true' && $count <= 0 ) {
    $images = $path;
}

$ref = $_REQUEST['ref'];
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

// récupère la voiture via son id et update les datas dans la BDD avec les datas recues
$voiture = Voiture::getCarByRef($ref);
$voiture->updateChamp('images',$images);
$voiture->updateChamp('titre',$titre);
$voiture->updateChamp('descript',$descript);
$voiture->updateChamp('boite',$boite);
$voiture->updateChamp('carburant',$carburant);
$voiture->updateChamp('kilometrage',$kilometrage);
$voiture->updateChamp('annee',$annee);
$voiture->updateChamp('prix',$prix);
$voiture->updateChamp('lesplus',$lesplus);
$voiture->updateChamp('equipements',$equipements);
$voiture->updateChamp('details',$details);

// envoit une réponse au front
$response = 'voiture '.$ref.': informations modifiées'.$voiture->getTitre();
echo $response;
?>