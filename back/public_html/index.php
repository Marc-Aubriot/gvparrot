<?php 
header("Access-Control-Allow-Origin: http://192.168.1.10:3000");
header("Access-Control-Allow-Headers: content-type");
header('Access-Control-Allow-Credentials: true');

require __DIR__ . '/../config.php';
require __DIR__ . '/../src/controllers/Controller.php';

if ($_REQUEST) {

    $controller = new Controller();

    if (isset($_REQUEST['apikey'])) {

        if ( $controller->checkApiKey($_REQUEST['apikey']) === "api_key_valid" ) {

            switch ($_REQUEST['action']) {

                case 'getComments' :
                    $controller->requireController('AccueilController');
                    $pageController = new AccueilController();
                    $pageController->index();
                break;

                case 'sendComment' :
                    $controller->requireController('AccueilController');
                    $pageController = new AccueilController();
                    $pageController->sendComment();
                break;

                case 'getHoraires' :
                    $controller->getHoraires();
                break;
                
                case 'getServiceList' :
                    $controller->requireController('ServiceController');
                    $pageController = new ServiceController();
                    $pageController->index();
                break;

                case 'getCarListWithBasicFilter' :
                    $controller->requireController('OccasionsController');
                    $pageController = new OccasionsController();
                    $pageController->index();    
                break;

                case 'getCarDetail' :
                    $controller->requireController('OccasionsController');
                    $pageController = new OccasionsController();
                    $pageController->getCarDetail();    
                break;

                case 'getPrevAndNextCar' :
                    $controller->requireController('OccasionsController');
                    $pageController = new OccasionsController();
                    $pageController->getPrevAndNextCar();    
                break;

                case 'sendMessage' :
                    $controller->requireController('ContactController');
                    $pageController = new ContactController();
                    $pageController->index();
                break;

                case 'checkCredentials' :
                    $controller->requireController('EspaceProController');
                    $pageController = new EspaceProController();
                    $pageController->index();
                break;

                case 'getUserStatut' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->index();
                break;

                case 'getCarListAndEquipements' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->getCarListAndEquipements();
                break;

                case 'addCar' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->addCar();
                break;

                case 'checkImg' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->checkImg();
                break;

                case 'addEmployee' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->addEmployee();
                break;

                case 'modifyHoraires' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->modifyHoraires();
                break;

                case 'getEquipementList' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->getEquipementList();
                break;

                case 'addEquipement' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->addEquipement();
                break;

                case 'deleteEquipement' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->deleteEquipement();
                break;

                case 'deleteCar' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->deleteCar();
                break;

                case 'getCarByRefAndEquipements' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->getCarByRefAndEquipements();
                break;

                case 'modifyCar' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->modifyCar();
                break;

                case 'getAllComments' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->getAllComments();
                break;

                case 'deleteComment' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->deleteComment();
                break;

                case 'verifyComment' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->verifyComment();
                break;

                case 'deleteService' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->deleteService();
                break;

                case 'modifyServices' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->modifyServices();
                break;

                case 'addService' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->addService();
                break;

                case 'listEmployee' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->listEmployee();
                break;

                case 'detailEmployee' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->detailEmployee();
                break;

                case 'modifyEmployee' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->modifyEmployee();
                break;

                case 'deleteEmployee' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->deleteEmployee();
                break;

                case 'deleteUserSession' :
                    $controller->requireController('BackofficeController');
                    $pageController = new BackofficeController();
                    $pageController->deleteUserSession();
                break;

                default:
                    echo "request action error: ".$_REQUEST['action'];
                break;
            }

        } else {
            echo "erreur ".$controller->checkApiKey($_REQUEST['apikey']);
            return;
        };

    } else { 
        echo 'no api key';
    };

} else {
    echo 'aucune requête';
};

?>