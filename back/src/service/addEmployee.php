<?php

include_once ROOT.'/src/models/Utilisateur.php';
include_once ROOT.'/src/service/uuidv4Generator.php';


$id = guidv4();
$nom = $_REQUEST['nom'];
$prenom = $_REQUEST['prenom'];
$email = $_REQUEST['email'];
$mdp1 = $_REQUEST['mdp1'];
$mdp2 = $_REQUEST['mdp2'];

if ($mdp1 === $mdp2) {

    $hashpass = password_hash($mdp1, PASSWORD_DEFAULT);

    $employee = Utilisateur::addUser($id, $nom, $prenom, $email, $hashpass);

    echo "Employé ajouté à la base de données.";

    return;

} else {

    echo "Les mots de passe doivent être identique.";

    return;
}

?>