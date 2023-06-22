<?php

include_once ROOT.'/src/models/Equipement.php';

$nom = $_REQUEST['nom'];

$equipement = Equipement::addEquipement($nom);

echo 'Equipement ajouté';

?>