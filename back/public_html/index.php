<?php 
header("Access-Control-Allow-Origin: http://192.168.1.10:3000");
header("Access-Control-Allow-Headers: content-type");
header('Access-Control-Allow-Credentials: true');

// load les fichiers importants
require __DIR__ . '/../config.php';

$API_KEY = $_REQUEST['apikey'];

if (!$API_KEY) {
    echo 'no api key';
    return;
} else if ($API_KEY !== SECRET_API_KEY ) {
    echo 'api key not valid';
    return;
}

if ($_REQUEST) { 
    $action = $_REQUEST["action"]; 
    include_once(ROOT.'/src/service/'.$action.'.php');
};


?>