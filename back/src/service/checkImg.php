<?php

$tmp_array = [];
$count = $_REQUEST['file-count'];
$response = '';
$uploadOk = 1;

// Push l'image dans l'array $tmp_array, repète l'opération pour le nombre $count d'image
for ( $i = 0; $i < $count; $i++ ) {

  $target_dir = UPLOAD_PATH;
  $target_file = $target_dir . basename($_FILES["file-".$i]["name"]);
  $uploadOk = 1;
  $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

  // Check if image file is a actual image or fake image
  if(isset($_POST["submit"])) {

    $check = getimagesize($_FILES["file-".$i]["tmp_name"]);

    if($check !== false) {

      $response = "File is an image - " . $check["mime"] . ".";
      echo $response;
      $uploadOk = 1;

    } else {

      $response = "File is not an image.";
      echo $response;
      $uploadOk = 0;

    }
  }

  // Check if file already exists
  if (file_exists($target_file)) {
    $response = "Sorry, file already exists.";
    echo $response;
    $uploadOk = 0;
  }

  // Check file size
  if ($_FILES["file-".$i]["size"] > 1000000) {
    $response = "Sorry, your file is too large.";
    echo $response;
    $uploadOk = 0;
  }

  // Allow certain file formats
  if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
  && $imageFileType != "gif" ) {
    $response = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    echo $response;
    $uploadOk = 0;
  }
}

  // Check if $uploadOk is set to 0 by an error
  if ( $uploadOk != 0 && $count == 1 ) {
    $response = "Votre fichier est prêt.";
  } else if ( $uploadOk != 0 && $count > 1 ) {
    $response = "Vos fichiers sont prêts.";
  }

  echo $response;

?>