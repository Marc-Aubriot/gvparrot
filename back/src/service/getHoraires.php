<?php

include_once ROOT.'/src/models/Horaire.php';

$horaires = Horaire::getHorairesListByID(1);

foreach($horaires as $item) {
    echo $item['lundi'].'+'.$item['mardi'].'+'.$item['mercredi'].'+'.$item['jeudi'].'+'.$item['vendredi'].'+'.$item['samedi'].'+'.$item['dimanche'];
};
?>