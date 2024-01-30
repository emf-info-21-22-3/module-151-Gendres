<?php
class Ctrl
{

    private $wrk;
    public function __construct()
    {
        include("Wrk.php");
        $this->wrk = new Wrk();
    }
    public function getEquipes()
    {
        include_once("Wrk.php");
        return $this->wrk->getEquipes();
    }

    public function getJoueurs($equipeID)
    {
        include_once("Wrk.php");
        return $this->wrk->getJoueurs($equipeID);
    }
}