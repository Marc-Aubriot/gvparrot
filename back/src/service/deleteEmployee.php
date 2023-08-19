<?php

include_once ROOT.'/src/models/Utilisateur.php';

$id = $_REQUEST['id'];
$user = Utilisateur::getUserByID($id);
$user->delete();

echo 'Employé supprimé de la base de données';
?>