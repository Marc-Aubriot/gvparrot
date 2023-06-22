<?php

include_once ROOT.'/src/models/Equipement.php';

$id = $_REQUEST['id'];

$equipement = Equipement::getEquipementById($id);

$equipement->delete();

echo 'Equipement supprimé';

?>