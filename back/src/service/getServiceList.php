<?php

include_once ROOT.'/src/models/Service.php';
$categorie = $_REQUEST['categorie'];
$serviceList = Service::getServiceListByCategorie($categorie);

foreach($serviceList as $item) {
    echo $item['id'].'+'.$item['categorie'].'+'.$item['subcategorie'].'+'.$item['titre'].'+'.$item['descript'].'&';
};
?>