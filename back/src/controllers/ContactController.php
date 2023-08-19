<?php

class ContactController extends Controller {

    public function index() {
        include_once ROOT.'/src/models/Message.php';

        $nom = $_REQUEST["nom"];
        $prenom = $_REQUEST["prenom"];
        $telephone = $_REQUEST["telephone"];
        $email = $_REQUEST["email"];
        $sujet = $_REQUEST["sujet"];
        $content = $_REQUEST["content"];
        $voiture_ref = '';

        if (isset($_REQUEST['voitureRef'])) {
            $voiture_ref = $_REQUEST['voitureRef'];
        }

        $message = Message::addMessage($nom, $prenom, $telephone, $email, $sujet, $content, $voiture_ref);
        echo 'Votre demande de contact à étée correctement envoyée ! Elle sera prise en charge par nos équipes dès que possible.';
    }
}