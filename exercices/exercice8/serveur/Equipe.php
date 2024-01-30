<?php
class Equipe
{
    private $pk;
    private $nom;

    public function __construct($pk, $nom)
    {
        $this->pk = $pk;
        $this->nom = $nom;
    }
    public function getPk()
    {
        return $this->pk;
    }
    public function getNom()
    {
        return $this->nom;
    }
    public function __toString()
    {
        return $this->getNom();
    }
    
}