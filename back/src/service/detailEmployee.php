<?php

include_once ROOT.'/src/models/Utilisateur.php';

$id = $_REQUEST['id'];
$user = Utilisateur::getUserByID($id);


echo 
    $user->getId().','.
    $user->getNom().','.
    $user->getPrenom().','.
    $user->getEmail().','.
    $user->getMotDePasse();
?>