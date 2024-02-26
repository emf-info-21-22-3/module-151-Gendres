<?php

class MessageManager
{
    function __construct()
    {
    }
    function get($room_id)
    {
        require_once("./obj/Message.php");
        require_once("./wrk/WrkDb.php");


        $connection = WrkDb::getInstance();
        ;
        $query = $connection->executeQuery("SELECT * FROM t_message WHERE fk_room = ?", array($room_id));
        $data = $query->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $retour = array();
            foreach ($data as $row) {
                //enleve les Fk et les remplace par la bonne valeur
                $username = $connection->executeQuery("SELECT * FROM t_user WHERE pk_user = ?", array($row["fk_user"]))->fetch(PDO::FETCH_ASSOC)["username"];

                //$message_id, $texte, $date_sent, $room_id, $user_id
                $msg = new Message($row["pk_message"], $row["texte"], $row["dateEnvoi"], $row["fk_room"], $username);
                $retour[] = $msg;
            }
            return $retour;
        } else {
            return null; // Return null if user not found
        }
    }
    function send($room_id, $message)
    {
        
        require_once("./wrk/SessionManager.php");
        $sesion = SessionManager::getSessionInfo();

        //check session
        if ($sesion["isLogged"] == true) {
            // user dans la session
            $user = $sesion["username"];
            return $this->writeMessage($room_id, $user, $message);
        } else {
            //throw 403
            http_response_code(403);
            return "NOK";
        }
    }
    private function writeMessage($room_id, $user, $message)
    {


        // return $room_id . $user . $message;

        require_once("./wrk/WrkDb.php");
        $connection = WrkDb::getInstance();


        //définit les champs manquant
        $fk_user = $connection->executeQuery("SELECT * FROM t_user WHERE username = ?", array($user))->fetch(PDO::FETCH_ASSOC)["pk_user"];
        $dateEnvoi = date('Y-m-d H:i:s'); // Format: YYYY-MM-DD HH:MM:SS

        // Preparation du SQL
        $sql = "INSERT INTO t_message (texte, dateEnvoi, fk_user, fk_room) VALUES (:texte, :dateEnvoi, :fk_user, :fk_room)";
        $params = array(':texte' => $message, ':dateEnvoi' => $dateEnvoi, ':fk_user' => $fk_user, ':fk_room' => $room_id);

        $query = $connection->executeQuery($sql, $params);

        return $query->rowCount();



    }
}

