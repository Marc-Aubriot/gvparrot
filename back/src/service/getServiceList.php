<?php

include_once ROOT.'/src/models/Service.php';

$serviceList = Service::getServiceList();

foreach($serviceList as $item) {
    echo $item['id'].'+'.$item['categorie'].'+'.$item['titre'].'+'.$item['descript'].'&';
};
?>