<?php

include_once ROOT.'/src/models/Message.php';

$id = $_REQUEST['id'];
$view = $_REQUEST['q'];

$message = Message::getMessageById($id);

if ( $view === 'y' ) {
    $message->checkAsViewed('1');

    echo 'Message marqué comme lu';

    return;

} else if ( $view === 'n' ) {
    $message->checkAsViewed('0');

    echo 'Message marqué comme non lu';

    return;
}


?>