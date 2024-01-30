<?php
class Joueur
{

    private $pk;
    private $nom;
    private $points;
    private $fk_equipe;

    public function __construct($pk, $nom, $points, $fk_equipe)
    {
        $this->pk = $pk;
        $this->nom = $nom;
        $this->points = $points;
        $this->fk_equipe = $fk_equipe;
    }

    public function getPk()
    {
        return $this->pk;
    }
    public function getNom()
    {
        return $this->nom;
    }
    public function getPoints()
    {
        return $this->points;
    }
    public function getFkEquipe()
    {
        return $this->fk_equipe;
    }

    

}