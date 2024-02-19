<?php
if (isset($_SERVER['REQUEST_METHOD'])) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            echo "Requête GET détectée.<br>";
            if (isset($_GET['room'])) {
                $room = $_GET['room'];
                if ($room == -1) {
                    echo "Retourner toutes les rooms.<br>";
                    // Forward vers RoomManager.php
                    require_once("./wrk/RoomManager.php");
                } else {
                    echo "Retourner la liste des messages de la room $room.<br>";
                    // Forward vers MessageManager.php
                    require_once("./wrk/MessageManager.php");
                }
            } else {
                echo 'Paramètre room manquant<br>';
            }
            break;

            
        case 'POST':
            echo "Requête POST détectée.<br>";
            if (isset($_POST['user']) and isset($_POST['pass_hash'])) {
                $user = $_POST['user'];
                $pass_hash = $_POST['pass_hash'];

                //Vérifier si le login est ok 
                //Forward vers SessionManager.php             

                echo "Paramètres user ($user) et pass_hash présents.<br>";
                require_once("./wrk/SessionManager.php");
            } else {
                echo 'Paramètre user ou pass_hash manquant<br>';
            }
            break;


        case 'PUT':
            echo "Requête PUT détectée.<br>";
            parse_str(file_get_contents("php://input"), $vars);
            if (isset($vars['texte']) and isset($vars['user']) and isset($vars['room_id'])) {
                $texte = $vars['texte'];
                $user = $vars['user'];
                $room_id = $vars['room_id'];
                // Envoyer un message
                // Forward vers MessageManager.php
                echo "Paramètres texte ($texte), user ($user) et room_id ($room_id) présents.<br>";
                require_once("./wrk/MessageManager.php");
            } elseif (isset($vars['user']) and isset($vars['pass_hash'])) {
                $user = $vars['user'];
                $pass_hash = $vars['pass_hash'];
                // Créer un nouvel utilisateur
                // Forward vers SessionManager.php
                echo "Paramètres user ($user) et pass_hash ($pass_hash) présents.<br>";
                require_once("./wrk/SessionManager.php");
            } else {
                echo 'Paramètre texte, user ou room_id OU user, pass_hash manquant<br>';
            }
            break;


        case 'DELETE':
            echo "Requête DELETE détectée.<br>";
            parse_str(file_get_contents("php://input"), $vars);
            if (isset($vars['message_id'])) {
                $message_id = $vars['message_id'];
                // Supprimer un message
                // Forward vers MessageManager.php
                echo "Paramètre message_id ($message_id) présent.<br>";
                require_once("./wrk/MessageManager.php");
            } else {
                echo 'Paramètre message_id manquant<br>';
            }
            break;
        default:
            echo "Méthode de requête non reconnue<br>";
            break;
    }
}
