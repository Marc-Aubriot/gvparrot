<?php

include_once ROOT.'/src/models/Utilisateur.php';

$id = $_REQUEST['id'];
$user = Utilisateur::getUserByID($id);
$statut = 'user inconnu';

if ($user->getIsAdmin() === 1) {
    $statut = 'Administrateur';
    echo $statut;
    return;
} else {
    $statut = 'Employé';
    echo $statut;
    return;
}

?>