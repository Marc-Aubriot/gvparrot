<?php

include_once ROOT.'/src/models/Service.php';

$id = $_REQUEST['id'];

$service = Service::getServiceById($id);

echo $service->getCategorie()."+".$service->getTitle()."+".$service->getDescript();
?>