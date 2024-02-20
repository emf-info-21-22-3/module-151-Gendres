<?php
/*
include_once('configDb.php');
class WrkDb {
	private $pdo;
	

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
*/

include_once('configDb.php');

class WrkDb {
    private $pdo;
    
    /**
     * Fonction d'ouvrir une connexion à la base de données.
     */
    public function __construct() {
        try {
            $this->pdo = new PDO(DB_TYPE.':host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            // Set PDO to throw exceptions on error
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            // Log the error and terminate gracefully
            error_log("Erreur de connexion à la base de données: " . $e->getMessage());
            die("Erreur de connexion à la base de données. Veuillez contacter l'administrateur.");
        }
    }

	public function executeQuery($query, $params = array()) {
		try {
			$stmt = $this->pdo->prepare($query);
			$stmt->execute($params);
			return $stmt; // Return the PDO statement object
		} catch (PDOException $e) {
			// Log the error and terminate gracefully
			error_log("Erreur lors de l'exécution de la requête: " . $e->getMessage());
			die("Erreur lors de l'exécution de la requête. Veuillez contacter l'administrateur.");
		}
	}
	
}
?>