<?php
/*
 * Ce fichier ne sert uniquement à obtenir un hash à copier-coller dans la DB manuellement. 
 *   @author : Simon Gendre
 *   @version : 0.5
 */
if (isset($_SERVER['REQUEST_METHOD'])) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            if (isset($_GET['pwd'])) {
                $pwd = $_GET['pwd'];
                echo password_hash($pwd, CRYPT_SHA256);
            } else {
                echo "<a href='hashpwd.php?pwd=somePassword'>url example</a>";
            }
            break;
    }

}