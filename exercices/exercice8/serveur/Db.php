<?php
class Db
{

    private $serveur = "host.docker.internal";
    private $dbName = "hockey_stats";
    private $dbUsername = "root";
    private $dbPassword = "emf123";

    public function lireEquipe()
    {
        $bdd = new PDO("mysql:host=$this->serveur;port=3306;dbname=$this->dbName;charset=utf8", $this->dbUsername, $this->dbPassword);

        $sqlQuery = 'SELECT * FROM t_equipe';

        $statement = $bdd->prepare($sqlQuery);
        $statement->execute();

        $retour = array();
        while ($equipe = $statement->fetch()) {
            include_once('Equipe.php');
            $retour[count($retour)-1] = new Equipe($equipe["PK_equipe"], $equipe["Nom"]);
        }
        return $retour;
    }


    public function lireJoueurs($equipeID){
        $bdd = new PDO("mysql:host=$this->serveur;port=3306;dbname=$this->dbName;charset=utf8", $this->dbUsername, $this->dbPassword);

        $sqlQuery = 'SELECT * FROM t_joueur WHERE FK_equipe = '. $equipeID;

        $statement = $bdd->prepare($sqlQuery);
        $statement->execute();

        $retour = array();
        while ($joueur = $statement->fetch()) {
            include_once('Joueur.php');
            $retour[count($retour)-1] = new Joueur($joueur["PK_joueur"], $joueur["Nom"], $joueur["Points"], $joueur["FK_equipe"]);
        }
        return $retour;
    }
}