<?php
require_once("./obj/Message.php");
require_once("./wrk/WrkDb.php");
require_once("./wrk/SessionManager.php");
class MessageManager
{
    /**
     * retourne les message d'une salle
     */
    function get($room_id)
    {
        $connection = WrkDb::getInstance();
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
            http_response_code(200);
            return $retour;
        } else {
            return null;
        }
    }
    /**
     * envoie un message si l'utilisateur en a les droits
     */
    function send($room_id, $message)
    {
        $session = SessionManager::getSessionInfo();
        //check session
        if ($session["isLogged"] == true) {
            // user dans la session
            $user = $session["username"];
            http_response_code(200);
            return $this->writeMessage($room_id, $user, $message);
        } else {
            //pas logué
            http_response_code(403);
        }
    }
    /**
     * supprime un message si l'utilisateur en a les droits (admin only)
     */
    function delete($message_id)
    {
        $session = SessionManager::getSessionInfo();
        //supprime le message uniquement si l'utilisateur est admin
        if ($session["isLogged"] == true && $session["admin"] == true) {
            $connection = WrkDb::getInstance();
            // Preparation du SQL
            $sql = "DELETE FROM t_message WHERE pk_message = :PK";
            $params = array(':PK' => $message_id);
            
            $query = $connection->executeQuery($sql, $params);
            return $query->rowCount();            
        } else {
            http_response_code(403);
            return "Unauthorized";
        }
    }
    /**
     * écrit un message dans la DB
     */
    private function writeMessage($room_id, $user, $message)
    {
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

