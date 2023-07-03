<?php

include_once ROOT.'/src/models/Utilisateur.php';
include_once ROOT.'/src/models/Session.php';
include_once ROOT.'/src/service/uuidv4Generator.php';

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
        $user_id = $user->getId();
        $token = guidv4();
        $new_session = Session::addSessions($user_id, $token);

        $response = 'ok mail et pass+'.$user->getId().'+'.$token; //réponse, id, token
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