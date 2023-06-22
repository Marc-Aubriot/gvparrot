<?php

include_once ROOT.'/src/models/Message.php';

$q = $_REQUEST['q'];

if ( $q === 'viewedtrue' ) {

    $messages = Message::getMessageListByViewStatut('1');

} else if ( $q === 'viewedfalse' ) {

    $messages = Message::getMessageListByViewStatut('0');

} else if ( $q === 'all' ) {

    $messages = Message::getMessageList();

} else {

    $response = "Aucune action demandée au service, ou l'action est inconnue";
    return $response;

}


foreach($messages as $item) {
    echo $item['id'].'+'.$item['nom'].'+'.$item['prenom'].'+'.$item['telephone'].'+'.$item['email'].'+'.$item['sujet'].'+'.$item['content'].'+'.$item['lecture'].'&';
};
?>