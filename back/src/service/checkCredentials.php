<?php

include_once ROOT.'/src/models/Utilisateur.php';

$email = $_REQUEST['email'];
$form_mot_de_passe = $_REQUEST['mot_de_passe'];

$user = Utilisateur::getUserByEmail($email);

if ( $user === null) {
    $response = 'utilisateur inconnu+error';
    echo $response;
    return;
};

if ( $user->getEmail() === $email ) {

    $user_password = $user->getMotDePasse();

    if ( password_verify( $form_mot_de_passe ,$user_password) ) {

        $response = 'ok mail et pass+'.$user->getId();
        echo $response;
        return;

    } else {
        
        $response = 'mot de passe invalide+error';
        echo $response;
        return;
    };
    
} else {
    $response = "email invalide+error";
    echo $response;
    return;
};

?>