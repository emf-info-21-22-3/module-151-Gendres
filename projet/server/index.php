<?php
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Credentials: true");

if (isset($_SERVER['REQUEST_METHOD'])) {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':

            // Requete GET détectée.<br>";
            if (isset($_GET['rooms'])) {
                $room = $_GET['rooms'];

                // Forward vers RoomManager.php
                require_once("./wrk/RoomManager.php");
                require_once("./obj/Room.php");
                //"Retourner la liste des room.<br>";
                $roomManager = new RoomManager();
                foreach ($roomManager->getAll() as $room) {
                    echo $room->__toString();
                }

            } else if (isset($_GET['messages'])) {
                $room = $_GET['messages'];

                // Forward vers MessageManager.php
                require_once("./wrk/MessageManager.php");
                require_once("./obj/Message.php");
                // "Retourner la liste des messages de la room $room.<br>";
                $messageManager = new MessageManager();
                foreach ($messageManager->get($room) as $message) {
                    echo $message->__toString();
                }
                // "Retourner la liste des messages de la room $room.<br>";

            } else {
                echo 'Paramètre room manquant<br>';
            }
            break;


        case 'POST':
            // Action parameter to identify the action
            if (isset($_POST['action'])) {
                $action = $_POST['action'];

                switch ($action) {
                    case 'check-user':
                        if (isset($_POST['user']) && isset($_POST['pass'])) {
                            $user = $_POST['user'];
                            $pass = $_POST['pass'];

                            //Vérifier si le login est ok 
                            //Forward vers SessionManager.php             

                            require_once("./wrk/SessionManager.php");

                            $sessionManager = new SessionManager();
                            echo $sessionManager->checkLogin($user, $pass);

                        } else {
                            echo 'Paramètre user ou pass manquant<br>';
                        }
                        break;
                    case 'create-user':
                        parse_str(file_get_contents("php://input"), $vars);
                        if (isset($vars['user']) && isset($vars['pass'])) {
                            $user = $vars['user'];
                            $pass = $vars['pass'];
                            // Créer un nouvel utilisateur
                            // Forward vers SessionManager.php

                            require_once("./wrk/SessionManager.php");
                            echo "création de  user ($user) avec pass ($pass).<br>";
                        } else {
                            echo 'Paramètre user ou pass manquant pour créer un nouvel utilisateur<br>';
                        }
                        break;
                    case 'disconnect-user':
                        // déconnecte l'utilisateur
                        // Forward vers SessionManager.php
                        require_once("./wrk/SessionManager.php");
                        $sessionManager = new SessionManager();
                        $sessionManager->disconnectUser();

                        break;
                    case 'message':
                        parse_str(file_get_contents("php://input"), $vars);
                        if (isset($vars['texte']) && isset($vars['room_id'])) {
                            $texte = $vars['texte'];
                            $room_id = $vars['room_id'];
                            // Envoyer un message
                            // Forward vers MessageManager.php

                            require_once("./wrk/MessageManager.php");
                            //echo "enregistrer un message avec : texte ($texte), user ($user) et room_id ($room_id) .<br>";
                            $messageManager = new MessageManager();
                            echo $messageManager->send($room_id, $texte);
                            
                        } else {
                            echo 'Paramètre texte, user ou room_id manquant pour un nouveau message<br>';
                        }
                        break;



                    default:
                        echo 'Action non reconnue<br>';
                }
            } else {
                echo 'Paramètre action manquant<br>';
                
            }
            break;



        case 'DELETE':
            // Requete DELETE détectée.<br>";
            parse_str(file_get_contents("php://input"), $vars);
            if (isset($vars['message_id'])) {
                $message_id = $vars['message_id'];
                // Supprimer un message
                // Forward vers MessageManager.php
                echo "supprimer message_id ($message_id).<br>";
                require_once("./wrk/MessageManager.php");
            } else {
                echo 'Paramètre message_id manquant<br>';
            }
            break;
        default:
            echo "Méthode de requête non reconnue<br>";
            http_response_code(404);
            break;
    }
}
