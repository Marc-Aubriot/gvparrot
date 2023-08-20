<?php

class ServiceController extends Controller {

    // envoie les services depuis la BDD vers le front
    public function index() {
        include_once ROOT.'/src/models/Service.php';
        $categorie = $_REQUEST['categorie'];
        $serviceList = Service::createEntity();

        if ($categorie !== 'all') {
            $serviceList = $serviceList->getAll($categorie);

            // envoie les datas vers le front
            foreach($serviceList as $item) {
                echo $item['id'].'+'.$item['categorie'].'+'.$item['subcategorie'].'+'.$item['titre'].'+'.$item['descript'].'&';
            };

        } else if ($categorie === 'all') {
            $serviceList = $serviceList->getAll();

            // envoie les datas vers le front
            foreach($serviceList as $item) {
                echo $item['id'].'+'.$item['categorie'].'+'.$item['subcategorie'].'+'.$item['titre'].'+'.$item['descript'].'&';
            };
        }
    }
}
?>