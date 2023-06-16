<?php

include_once ROOT.'/src/models/Utilisateur.php';
include_once ROOT.'/src/service/uuidv4Generator.php';

$id = $_REQUEST['id'];
$nom = $_REQUEST['nom'];
$prenom = $_REQUEST['prenom'];
$email = $_REQUEST['email'];
$mdp1 = $_REQUEST['mdp1'];
$mdp2 = $_REQUEST['mdp2'];

if ($mdp1 === $mdp2) {

    $employee = Utilisateur::getUserByID($id);
    $user_password = $employee->getMotDePasse();

    $employee->setNom($nom);
    $employee->setPrenom($prenom);
    $employee->setEmail($email);

    if ( password_verify( $mdp1 ,$user_password) ) { 

        $employee->modify();
        echo "Informations modifiées";
        return;
        
    } else {
        $hashpass = password_hash($mdp1, PASSWORD_DEFAULT);
        $employee->setMotDePasse($hashpass);
        $employee->modify();
        echo "Informations et mot de passe modifiés";
        return;
    }


} else {

    echo "Les mots de passe doivent être identique.";
    return;
}

?>