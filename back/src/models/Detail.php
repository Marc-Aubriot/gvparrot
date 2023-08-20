<?php

class Detail {
    
    private $id;
    private $voiture_id;
    private $couleur;
    private $puissance;
    private $rapports;
    private $places;
    private $portes;
    private $garantie;
    private $critair;

    public function __construct( $id, $voiture_id, $couleur, $puissance, $rapports, $places, $portes, $garantie, $critair)
    {
        $this->id = $id;
        $this->voiture_id = $voiture_id;
        $this->couleur = $couleur;
        $this->puissance = $puissance;
        $this->rapports = $rapports;
        $this->places = $places;
        $this->portes = $portes;
        $this->garantie = $garantie;
        $this->critair = $critair;
    }

    public function getId() { return $this->id; }
    public function getVoitureId() { return $this->voiture_id; }
    public function getCouleur() { return $this->couleur; }
    public function getPuissance() { return $this->puissance; }
    public function getRapports() { return $this->rapports; }
    public function getPlaces() { return $this->places; }
    public function getPortes() { return $this->portes; }
    public function getGarantie() { return $this->garantie; }
    public function getCritair() { return $this->critair; }

    public function setId($new_value) { $this->id = $new_value; }
    public function setVoitureId($new_value) { $this->voiture_id = $new_value; }
    public function setCouleur($new_value) { $this->couleur = $new_value; }
    public function setPuissance($new_value) { $this->puissance = $new_value; }
    public function setRapports($new_value) { $this->rapports = $new_value;; }
    public function setPlaces($new_value) { $this->places = $new_value; }
    public function setPortes($new_value) { $this->portes = $new_value; }
    public function setGarantie($new_value) { $this->garantie = $new_value; }
    public function setCritair($new_value) { $this->critair = $new_value; }
} 