<?php

class Lesplus {
    private $id;
    private $equipement_id;
    private $nom;

    public function __construct( $id, $equipement_id, $nom) 
    {
        $this->id = $id;
        $this->equipement_id = $equipement_id;
        $this->nom = $nom;
    }

    public function getId() { return $this->id; }
    public function getEquipementId() { return $this->equipement_id; }
    public function getNom() { return $this->nom; }

    public function setId($new_value) { $this->id = $new_value; }
    public function setEquipementId($new_value) { $this->equipement_id = $new_value; }
    public function setNom($new_value) { $this->nom = $new_value; }

}
?>