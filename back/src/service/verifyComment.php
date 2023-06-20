<?php

include_once ROOT.'/src/models/Comment.php';

$id = $_REQUEST['ID'];
$q = $_REQUEST['q'];
$comment = Comment::getCommentById($id);


if ($q === '0') {

    $comment->pin();
    echo "Commentaire ajouté à l'Accueil";

} else if ($q === '1') {

    $comment->unPin();
    echo "Commentaire enlevé de l'Accueil";

} else {

    echo 'Une erreur est survenue, la prise en compte des modifications peut prendre du temps. Veuillez réessayer dans quelques secondes.';

};

?>