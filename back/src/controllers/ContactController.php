<?php

class ContactController extends Controller {

    public function index() {
        include_once ROOT.'/src/models/Message.php';

        $message = Message::createEntity();
        if (isset($_REQUEST['voitureRef'])) {
            $message->setVoitureId($_REQUEST['voitureRef']);
        }
        $message->setNom($_REQUEST['nom']);
        $message->setPrenom($_REQUEST['prenom']);
        $message->setTelephone($_REQUEST['telephone']);
        $message->setEmail($_REQUEST['email']);
        $message->setSujet($_REQUEST['sujet']);
        $message->setContent($_REQUEST['content']);
        $message->push(true);

        echo 'Votre demande de contact à étée correctement envoyée ! Elle sera prise en charge par nos équipes dès que possible.';
    }
}