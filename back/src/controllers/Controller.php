<?php

class Controller {

    public function checkToken(string $token)
    {
        // récupère le token et renvoit true si le token correspond
        if ($_SESSION["user_token"] === $token ) {
            return true;
        } else {
            return false;
        }
    }

    public function checkUserAdmin()
    {
        // si l'user est flag comme un admin, retourne true
        if ($_SESSION["user_admin"]) {
            return true;
        } else {
            return false;
        }
    }

    public function guidv4($data = null) {
        // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
        $data = $data ?? random_bytes(16);
        assert(strlen($data) == 16);
    
        // Set version to 0100
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        // Set bits 6-7 to 10
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    
        // Output the 36 character UUID.
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }

    public function getHoraires() {
        include_once ROOT.'/src/models/Horaire.php';

        $horaires = Horaire::createEntity(1);

        foreach($horaires as $item) {
            echo $item['lundi'].'+'.$item['mardi'].'+'.$item['mercredi'].'+'.$item['jeudi'].'+'.$item['vendredi'].'+'.$item['samedi'].'+'.$item['dimanche'];
        };
    }

    public function requireController($controller) {
        include_once ROOT . '/src/controllers/'.$controller.'.php';
    }

    public function checkApiKey($API_KEY) {
        
        $reponse = "api_key_valid";

        if (!$API_KEY) {
            $reponse = 'no_api_key';
        } else if ($API_KEY !== SECRET_API_KEY ) {
            $reponse = 'api_key_not_valid';
        }

        return $reponse;
    }

    public static function getIndexToStringInNestedArray($array, $indexname) {
        $string = '';
        foreach($array as $item) {
            $string = $string.'+'.$item[$indexname];
        }
        $string = substr($string, 1);

        return $string;
    }
}