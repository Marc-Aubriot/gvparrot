<?php

include_once ROOT.'/src/models/Comment.php';

class AccueilController extends Controller {

    public function index() {

        $comments = Comment::getValidatedCommentList();

        foreach($comments as $item) {
            echo $item['id'].'+'.$item['nom'].'+'.$item['contenu'].'+'.$item['note'].'+'.$item['valider'].'&';
        };
    }

    public function sendComment() {
        include_once ROOT.'/src/models/Comment.php';

        $nom = $_REQUEST["nom"];
        $note = $_REQUEST["note"];
        $message = $_REQUEST["message"];

        $comment = Comment::addComment($nom, $message, $note);
        echo 'Votre commentaire à été correctement envoyé ! Il sera prit en charge par nos équipes dès que possible.';
    }
}

?>