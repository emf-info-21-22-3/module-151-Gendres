<?php
if (isset($_SERVER['REQUEST_METHOD'])) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':

            // Requete GET détectée.<br>";
            if (isset($_GET['pwd'])) {
                $pwd = $_GET['pwd'];
                echo password_hash($pwd, CRYPT_SHA256);
            }
            break;
    }

}