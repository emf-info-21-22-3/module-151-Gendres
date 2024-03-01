<?php
require_once("./wrk/WrkDb.php");
class SessionManager
{
    function __construct()
    {

    }
    static function getSessionInfo()
    {
        if (isset($_SESSION["isLogged"])) {
            return array(
                'username' => $_SESSION['username'],
                'isLogged' => $_SESSION['isLogged'],
                'admin' => $_SESSION['isAdmin']
            );
        } else {
            return array('username' => "", 'isLogged' => "", 'admin' => "");
        }
    }
    function checkLogin($user, $pass)
    {

        $userInfo = $this->readUser($user);

        if ($userInfo && password_verify($pass, (string) $userInfo['hash'])) {
            //si le mot de passe est bon, on ouvre la session.
            $_SESSION['isLogged'] = true;
            $_SESSION['username'] = $userInfo['username'];
            if ($userInfo['admin'] = 1) {
                $_SESSION['isAdmin'] = true;
            } else {
                $_SESSION['isAdmin'] = false;
            }

            $retour = "
            <login>
            <status>true</status>
            <isAdmin>$_SESSION[isAdmin]</isAdmin>
            <username>$_SESSION[username]</username>
            </login>";

        } else {
            http_response_code(403);
            $retour = "
            <login>
            <status>false</status>
            </login>";
        }
        return $retour;

    }
    function createUser($user, $pass)
    {

        $connection = WrkDb::getInstance();

        $hash = password_hash($pass, CRYPT_SHA256);
        //boolean; true si le username est déja dans la DB
        $userExist = count($connection->executeQuery("SELECT * FROM t_user WHERE username = ?", array($user))->fetchAll(PDO::FETCH_ASSOC)) != 0;


        if (!$userExist) {

            $sql = "INSERT INTO t_user (username, password_hash, isAdmin) VALUES (:username, :hash, 0)";
            $params = array(':username' => $user, ':hash' => $hash);
            $query = $connection->executeQuery($sql, $params);
            http_response_code(200);
            return $query->rowCount();
        } else {
            http_response_code(409);
            return 0;
        }

    }

    function disconnectUser()
    {
        
        session_destroy();
    }
    public function readUser($user)
    {


        $connection = WrkDb::getInstance();
        // Using a prepared statement to prevent SQL injection
        $query = $connection->executeQuery("SELECT * FROM t_user WHERE username = ? LIMIT 1", array($user));

        // Fetching the first row from the result set
        $data = $query->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            // Constructing an array with user information
            $userInfo = array(
                'username' => $data['username'],
                'hash' => $data['password_hash'],
                'admin' => $data['isAdmin']
            );
            return $userInfo;
        } else {
            return null; // Return null if user not found
        }
    }
}

