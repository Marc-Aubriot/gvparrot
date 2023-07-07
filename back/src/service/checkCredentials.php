<?php

include_once ROOT.'/src/models/Utilisateur.php';
include_once ROOT.'/src/models/Session.php';
include_once ROOT.'/src/service/uuidv4Generator.php';


$q = $_REQUEST['q'];

if ( $q == 'checkLogin' ) {
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

            $get_old_session = Session::getSessionByUser($user_id);

            if ( $get_old_session && isset($_COOKIE["PHP_User_Token"]) === $get_old_session ) {
                //$get_old_session->delete();
            }
            
            if ( !$get_old_session ) { $new_session = Session::addSessions($user_id, $token); };

            if (!isset($_COOKIE["PHP_User_Token"])) { setcookie( "PHP_User_Token", $token, ['secure'=>'true', 'httponly'=>'true', 'path'=>'/','samesite'=>'None']); }

            $response = 'ok mail et pass+'.$user->getId();//'+'.$token; //réponse, id, token
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

} else if ( $q == 'checkToken' ) {

    $user_id = $_REQUEST['id'];
    $user_token = $_COOKIE['PHP_User_Token'];
    $active_session = Session::getSessionByUser($user_id);

    $response = 'session introuvable';

    if (!$active_session) {
        echo $response;
        return;
    }

    if ( $user_token == $active_session->getToken() ) {
        $response = 'Token OK';
    } else {
        $response = 'Token de session incorrect';
    }

    echo $response;
}

?>