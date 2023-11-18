<?php
// URL du site
define('URLDUSITE', 'http://localhost:3000/');

// URL du front
define('URL_FRONT', 'http://192.168.1.10:3000');

// définie une constante qui contient le path à la racine de l'application
define('ROOT', __DIR__);

// définie une constante qui contient le path pour les uploads
define('UPLOAD_PATH', __DIR__.'/public_html/uploads/');

// définie une constante qui contient le path pour les uploads
define('SECRET_API_KEY', "292e566e-56c2-4fec-8cb7-3207e778b743");

// définie une constante qui contient le path pour les images misent en BDD qui seront renvoyé au client
define('HTTP_SERVER', 'http://localhost:3000/gvparrot/back/public_html/uploads/');

// constantes d'accèss à la bdd
define('DB_HOST', 'localhost');
define('DB_USERNAME', 'marcobrio');
define('DB_PASSWORD', '123456');
define('DB_NAME', 'ecfgvparrot');
?>