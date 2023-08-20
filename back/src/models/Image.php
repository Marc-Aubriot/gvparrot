<?php

class Images {
    private $id;
    private $voiture_id;
    private $chemin;

    public function __construct( $id, $voiture_id, $chemin)
    {
        $this->id = $id;
        $this->voiture_id = $voiture_id;
        $this->chemin = $chemin;
    }

    public function getId() { return $this->id; }
    public function getVoitureId() { return $this->voiture_id; }
    public function getChemin() { return $this->chemin; }

    public function setId($new_value) { $this->id = $new_value; }
    public function setVoitureId($new_value) { $this->voiture_id = $new_value; }
    public function setChemin($new_value) { $this->chemin = $new_value; }
}

?>