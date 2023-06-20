<?php

include_once ROOT.'/src/models/Service.php';

$categorie = $_REQUEST['categorie'];
$subcategorie = $_REQUEST['subcategorie'];
$title = $_REQUEST['title'];
$descript = $_REQUEST['descript'];

$service = Service::addService($categorie, $subcategorie, $title, $descript);

echo 'Service ajouté !';
?>