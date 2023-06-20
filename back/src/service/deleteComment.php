<?php

include_once ROOT.'/src/models/Comment.php';

$id = $_REQUEST['ID'];

$comment = Comment::getCommentById($id);

$comment->delete();

echo 'Commentaire supprimé'
?>