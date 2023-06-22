<?php

include_once ROOT.'/src/models/Equipement.php';

$equipements = Equipement::getAllEquipements();

foreach($equipements as $item) {
    echo $item['id'].'+'.$item['nom'].'&';
};
?>