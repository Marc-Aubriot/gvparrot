<?php

include_once ROOT.'/src/models/Comment.php';

class AccueilController extends Controller {

    // envoie les commentaires depuis la BDD vers le front
    public function index() {
        $comments = Comment::createEntity();
        $comments = $comments->getAll(true);

        // envoie les datas vers le front
        foreach($comments as $item) {
            echo $item['id'].'+'.$item['nom'].'+'.$item['contenu'].'+'.$item['note'].'+'.$item['valider'].'&';
        };
    }

    // envoie le commentaire reçu du front vers la BDD
    public function sendComment() {
        include_once ROOT.'/src/models/Comment.php';

        // envoie les datas vers la BDD
        $comment = Comment::createEntity();
        $comment->setNom($_REQUEST["nom"]);
        $comment->setNote($_REQUEST["note"]);
        $comment->setContenu($_REQUEST["message"]);
        $comment->push();
        echo 'Votre commentaire à été correctement envoyé ! Il sera prit en charge par nos équipes dès que possible.';
    }
}

?>