<?php

include_once ROOT.'/src/models/Voiture.php';
include_once ROOT.'/src/service/uuidv4Generator.php';

$tmp_array = [];
$count = $_REQUEST['file-count'];

for ( $i = 0; $i < $count; $i++ ) {

  $target_dir = UPLOAD_PATH;
  $target_file = $target_dir . basename($_FILES["file-".$i]["name"]);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image
  if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["file-".$i]["tmp_name"]);
    if($check !== false) {
      echo "File is an image - " . $check["mime"] . ".";
      $uploadOk = 1;
    } else {
      echo "File is not an image.";
      $uploadOk = 0;
    }
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
  }

  // Check file size
  if ($_FILES["file-".$i]["size"] > 1000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
  }

  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
  }

  // Check if $uploadOk is set to 0 by an error
  if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
  // if everything is ok, try to upload file
  } else {
    if (move_uploaded_file($_FILES["file-".$i]["tmp_name"], $target_file)) {
      echo "The file ". htmlspecialchars( basename( $_FILES["file-".$i]["name"])). " has been uploaded.";
    } else {
      echo "Sorry, there was an error uploading your file.";
    }
  }

  $image = HTTP_SERVER.$_FILES["file-".$i]["name"];
  array_push($tmp_array, $image);
}

$images = implode("+", $tmp_array);
$titre = $_REQUEST['titre'];
$descript = $_REQUEST['descript'];
$boite = $_REQUEST['boite'];
$carburant = $_REQUEST['carburant'];
$kilometrage = $_REQUEST['kilometrage'];
$annee = $_REQUEST['annee'];
$prix = $_REQUEST['prix'];
$lesplus = $_REQUEST['lesplus'];
$equipements = $_REQUEST['equipements'];
$details = $_REQUEST['details'];
$ref = guidv4();

$voiture = new Voiture($images, $titre, $descript,  $boite, $carburant, $kilometrage, $annee, $prix, $lesplus, $equipements, $details, $ref);

$voiture->addCar();

echo 'voiture ajoutée';
?>