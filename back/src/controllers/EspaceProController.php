<?php

class EspaceProController extends Controller {

    public function index() {

        include_once ROOT.'/src/models/Utilisateur.php';
        include_once ROOT.'/src/models/CustomSession.php';

        $q = $_REQUEST['q'];

        if ( $q == 'checkLogin' ) {

            $user = Utilisateur::createEntity($_REQUEST['email']);

            if (!$user) {
                echo 'utilisateur inconnu.';
                return;
            };

            if ( $user->getEmail() === $_REQUEST['email'] ) {

                if ( password_verify( $_REQUEST['mot_de_passe'] ,$user->getMotDePasse()) ) {

                    $token = Controller::guidv4();
                    $get_old_session = CustomSession::createEntity($user->getId());
                    
                    if ($get_old_session) { // efface ancienne session si elle existe
                        $get_old_session->delete(); 
                    }

                    if (!isset($_COOKIE["PHP_User_Token"])) { // si pas de cookie, créé un cookie et nouvelle session
 
                        setcookie( "PHP_User_Token", $token, ['secure'=>'true', 'httponly'=>'true', 'path'=>'/','samesite'=>'None']); 
                        $new_session = CustomSession::createEntity();
                        $new_session->setUtilisateur($user->getId());
                        $new_session->setToken($token);
                        $new_session->push();

                        echo "ok mail et pass+".$user->getId().'+'.$token;
                        return;

                    } else { // sinon créée nouvelle avec le cookie actif

                        $new_session = CustomSession::createEntity();
                        $new_session->setUtilisateur($user->getId());
                        $new_session->setToken($_COOKIE["PHP_User_Token"]);
                        $new_session->push();

                        echo "ok mail et pass+".$user->getId().'+'.$_COOKIE["PHP_User_Token"];
                        return;
                    }

                } else {
                    echo 'mot de passe invalide';
                    return;
                };
                
                echo "aucun mot de passe";
                return;

            } else {
                echo "email invalide.";
                return;
            };

        } else if ( $q == 'checkToken' ) {

            $user_token = '';

            if( isset($_COOKIE['PHP_User_Token']) ) {
                $user_token = $_COOKIE['PHP_User_Token'];
            }

            $active_session = CustomSession::createEntity($_REQUEST['id']);

            if (!$active_session) {
                echo 'session introuvable';
                return;
            }

            if ( $user_token == $active_session->getToken() ) {
                echo 'Token OK';
                return;
            } else {
                echo 'Token de session invalide';
                return;
            }


            echo "pas de token";
            return;
        } else {

            echo 'aucune action demandée.';
            return;
        }
    }
                
}
?>