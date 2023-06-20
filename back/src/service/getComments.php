<?php

include_once ROOT.'/src/models/Comment.php';

$q = $_REQUEST['q'];

if ( $q === 'validated') {

    $comments = Comment::getValidatedCommentList();

} else if ( $q === 'all') {

    $comments = Comment::getCommentList();

};


foreach($comments as $item) {
    echo $item['id'].'+'.$item['nom'].'+'.$item['contenu'].'+'.$item['note'].'+'.$item['valider'].'&';
};
?>