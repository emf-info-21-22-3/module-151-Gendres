<?php
include_once('configConnexion.php');
class Connection {
	private $pdo;
	
	/**
     * Fonction d'ouvrir une connexion à la base de données.
     */
    public function __construct() {
    	try {
			$this->pdo = new PDO(DB_TYPE.':host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
		}catch (PDOException $e) {
    		print "Erreur !: " . $e->getMessage() . "<br/>";
    		die();
		}
	}

    public function executeQuery($query) {
    	try {
	        $queryRes =  $this->pdo->query($query);		
	        return  $queryRes->fetchAll();
      }catch (PDOException $e) {
          print "Erreur !: " . $e->getMessage() . "<br/>";
          die();
      }
    }

}

?>
