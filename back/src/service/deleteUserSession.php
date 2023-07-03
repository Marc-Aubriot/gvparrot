<?php

include_once ROOT.'/src/models/Session.php';

$user_id = $_REQUEST['id'];
$user_token = $_REQUEST['token'];

$session_to_logout = Session::getSessionByToken($user_token);

$session_to_logout->delete();

echo 'Déconnexion de la session';

?>