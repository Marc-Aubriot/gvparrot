<?php

include_once ROOT.'/src/models/Utilisateur.php';

$user_list = Utilisateur::getUserList();

foreach($user_list as $user) {
    echo 
    $user['id'].','.
    $user['nom'].','.
    $user['prenom'].','.
    $user['email'].'&';
};


?>