<?php

include_once ROOT.'/src/models/Session.php';

$response = "";
$user_id = $_REQUEST['id'];

$session_to_logout = Session::getSessionByUser($user_id);

if ($session_to_logout) { 
    $session_to_logout->delete(); 
};

if (isset($_COOKIE['PHP_User_Token'])) {
    unset($_COOKIE['PHP_User_Token']);
    setcookie('PHP_User_Token', null, ['secure'=>'true', 'httponly'=>'true', 'path'=>'/','samesite'=>'None', 'expires'=>'1']); 
    $response = "Déconnexion OK";
} else {
    $response = "Pas de connexion active";
}

echo $response;

?>