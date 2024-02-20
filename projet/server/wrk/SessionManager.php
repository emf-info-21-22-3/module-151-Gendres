<?php
class SessionManager
{
    function __construct()
    {

    }
    function checkLogin($user, $pass)
    {
        session_start();
        $userInfo = $this->readUser($user);

        if ($userInfo && password_verify($pass, $userInfo['hash'])) {
            //si le mot de passe est bon, on ouvre la session.
            $_SESSION['isLogged'] = true;

            if ($userInfo['admin'] = 1) {
                $_SESSION['isAdmin'] = true;
            } else {
                $_SESSION['isAdmin'] = false;
            }
            $retour = "
            <login>
            <status>true</status>
            <isAdmin>$_SESSION[isAdmin]</isAdmin>
            </login>";

        } else {
            $retour = "
            <login>
            <status>false</status>
            </login>";
        }
        return $retour;

    }

    public function readUser($user)
    {
        require_once("WrkDb.php");

        $connection = new WrkDb();
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

?>