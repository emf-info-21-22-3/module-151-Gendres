<?php
class Wrk {

    public function getEquipes()
    {
        include_once("Db.php");
        $db = new Db();
        return $db->lireEquipe();
    }

    public function getJoueurs($equipeID)
    {
        include_once("Db.php");
        $db = new Db();
        return $db->lireJoueurs($equipeID);
    }
}