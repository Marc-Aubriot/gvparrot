<?php

include_once ROOT.'/src/models/Comment.php';

$comments = Comment::getValidatedCommentList();

foreach($comments as $item) {
    echo $item['id'].'+'.$item['nom'].'+'.$item['contenu'].'+'.$item['note'].'&';
};
?>