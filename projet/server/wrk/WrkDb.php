<?php
include_once('configDb.php');

class WrkDb
{
    private static $instance;
    private $pdo;

    /**
     * Private constructor to prevent creating instances directly.
     */
    private function __construct()
    {
        try {
            $this->pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            // Set PDO to throw exceptions on error
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            // Log the error and terminate gracefully
            //error_log("Erreur de connexion à la base de données: " . $e->getMessage());
            http_response_code(500);
            die("Erreur de connexion à la base de données. Veuillez contacter l'administrateur. " . $e->getMessage());
        }
    }

    /**
     * Method to get the single instance of the class.
     */
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * execute une requete après y avoir associé les paramètre (pour éviter les injections)
     */
    public function executeQuery($query, $params = array())
    {
        try {
            $stmt = $this->pdo->prepare($query);
            $stmt->execute($params);
            return $stmt;
        } catch (PDOException $e) {
            http_response_code(500);
            //error_log("Erreur lors de l'exécution de la requête: " . $e->getMessage());
            //ne tue pas complétement l'execution en cas de problèmes. 
            //die("Erreur lors de l'exécution de la requête: " . $e->getMessage());
            return null;
        }
    }
}