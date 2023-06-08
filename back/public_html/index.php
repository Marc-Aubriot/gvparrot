<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: *");

// load les fichiers importants
require __DIR__ . '/../config.php';

if ($_REQUEST) { 
    $action = $_REQUEST["action"]; 
    include_once(ROOT.'/src/service/'.$action.'.php');
};
?>

