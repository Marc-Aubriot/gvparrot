<?php

include_once ROOT.'/src/models/Comment.php';

//$q = $_REQUEST["q"];
$comments = Comment::getValidatedCommentList();

foreach($comments as $item) {
    echo $item['id'].'+'.$item['nom'].'+'.$item['contenu'].'+'.$item['note'].'&';
};
?>