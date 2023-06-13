<?php

include_once ROOT.'/src/models/Comment.php';

$nom = $_REQUEST["nom"];
$note = $_REQUEST["note"];
$message = $_REQUEST["message"];

$comment = Comment::addComment($nom, $message, $note);
echo 'Votre commentaire à été correctement envoyé ! Il sera prit en charge par nos équipes dès que possible.';
?>