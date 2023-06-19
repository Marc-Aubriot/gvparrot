<?php

include_once ROOT.'/src/models/Service.php';

$ID = $_REQUEST['ID'];
$service = Service::getServiceById($ID);
$service->delete();

echo 'Service supprimé !';
?>