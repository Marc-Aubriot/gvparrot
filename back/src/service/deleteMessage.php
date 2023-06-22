<?php

include_once ROOT.'/src/models/Message.php';

$id = $_REQUEST['id'];

$message = Message::getMessageById($id);

$message->delete();

echo 'Message supprimé';

?>