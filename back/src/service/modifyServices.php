<?php

include_once ROOT.'/src/models/Service.php';

$ID = $_REQUEST['ID'];
$categorie = $_REQUEST['categorie'];
$subcategorie = $_REQUEST['subcategorie'];
$title = $_REQUEST['title'];
$descript = $_REQUEST['descript'];

$service = Service::getServiceById($ID);
$service->modify('categorie', $categorie);
$service->modify('subcategorie', $subcategorie);
$service->modify('titre', $title);
$service->modify('descript', $descript);

echo 'Service modifié !';
?>