<?php

include_once ROOT.'/src/models/Session.php';

$user_id = $_REQUEST['id'];
$user_token = $_REQUEST['token'];

$active_session = Session::getSessionByUser($user_id);

$response = 'session introuvable';

if (!$active_session) {
    echo $response;
    return;
}

if ( $active_session->getToken() === $user_token ) {
    $response = 'Token OK';
} else {
    $response = 'Token de session incorrect';
}

echo $response;

?>