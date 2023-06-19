<?php

include_once ROOT.'/src/models/Horaire.php';

$horaires = Horaire::getHoraire(1);

$lundi_0 = $_REQUEST['lundi-0'];
$lundi_1 = $_REQUEST['lundi-1'];
$lundi_2 = $_REQUEST['lundi-2'];
$lundi_3 = $_REQUEST['lundi-3'];
$lundi = $lundi_0.','.$lundi_1.','.$lundi_2.','.$lundi_3;

$mardi_0 = $_REQUEST['mardi-0'];
$mardi_1 = $_REQUEST['mardi-1'];
$mardi_2 = $_REQUEST['mardi-2'];
$mardi_3 = $_REQUEST['mardi-3'];
$mardi = $mardi_0.','.$mardi_1.','.$mardi_2.','.$mardi_3;

$mercredi_0 = $_REQUEST['mercredi-0'];
$mercredi_1 = $_REQUEST['mercredi-1'];
$mercredi_2 = $_REQUEST['mercredi-2'];
$mercredi_3 = $_REQUEST['mercredi-3'];
$mercredi = $mercredi_0.','.$mercredi_1.','.$mercredi_2.','.$mercredi_3;

$jeudi_0 = $_REQUEST['jeudi-0'];
$jeudi_1 = $_REQUEST['jeudi-1'];
$jeudi_2 = $_REQUEST['jeudi-2'];
$jeudi_3 = $_REQUEST['jeudi-3'];
$jeudi = $jeudi_0.','.$jeudi_1.','.$jeudi_2.','.$jeudi_3;

$vendredi_0 = $_REQUEST['vendredi-0'];
$vendredi_1 = $_REQUEST['vendredi-1'];
$vendredi_2 = $_REQUEST['vendredi-2'];
$vendredi_3 = $_REQUEST['vendredi-3'];
$vendredi = $vendredi_0.','.$vendredi_1.','.$vendredi_2.','.$vendredi_3;

$samedi_0 = $_REQUEST['samedi-0'];
$samedi_1 = $_REQUEST['samedi-1'];
$samedi_2 = $_REQUEST['samedi-2'];
$samedi_3 = $_REQUEST['samedi-3'];
$samedi = $samedi_0.','.$samedi_1.','.$samedi_2.','.$samedi_3;

$dimanche_0 = $_REQUEST['dimanche-0'];
$dimanche_1 = $_REQUEST['dimanche-1'];
$dimanche_2 = $_REQUEST['dimanche-2'];
$dimanche_3 = $_REQUEST['dimanche-3'];
$dimanche = $dimanche_0.','.$dimanche_1.','.$dimanche_2.','.$dimanche_3;

$horaires->modify('lundi', $lundi);
$horaires->modify('mardi', $mardi);
$horaires->modify('mercredi', $mercredi);
$horaires->modify('jeudi', $jeudi);
$horaires->modify('vendredi', $vendredi);
$horaires->modify('samedi', $samedi);
$horaires->modify('dimanche', $dimanche);

echo 'Modifications enregistrées !'
?>