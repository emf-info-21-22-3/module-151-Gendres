<?php
require_once("./obj/Room.php");
require_once("./wrk/WrkDb.php");
class RoomManager
{
    /**
     * retourne la liste de toute les salles de chat.
     */
    function getAll()
    {
        $connection = WrkDb::getInstance();
        // Using a prepared statement to prevent SQL injection
        $query = $connection->executeQuery("SELECT * FROM t_room ");

        // Fetching the first row from the result set
        $data = $query->fetchAll(PDO::FETCH_ASSOC);

        if ($data) {
            $retour = array();
            foreach ($data as $row) {
                $room = new Room($row['pk_room'], $row['room_id']);
                $retour[] = $room;
            }
            return $retour;
        } else {
            return null; // Return null if nothing found
        }
    }
    /**
     * permet de créer une nouvelle salle
     */
    function create($room_name)
    {
        $session = SessionManager::getSessionInfo();
        //check session
        if ($session["isLogged"] == true) {
            $connection = WrkDb::getInstance();
            //boolean; true si la room est déja dans la DB
            $roomExist = count($connection->executeQuery("SELECT * FROM t_room WHERE room_id = ?", array($room_name))->fetchAll(PDO::FETCH_ASSOC)) != 0;
            if (!$roomExist) {
                $sql = "INSERT INTO t_room (room_id) VALUES (:roomId)";
                $params = array(':roomId' => $room_name);
                $query = $connection->executeQuery($sql, $params);
                http_response_code(200);
                return $query->rowCount();
            } else {
                http_response_code(409);
                return 0;
            }
        } else {
            //pas logué
            http_response_code(403);
        }
    }

    /**
     * supprime une room si l'utilisateur en a les droits (admin only)
     * crée une erreur si la salle n'est pas vide.
     */
    function delete($room_id)
    {
        $session = SessionManager::getSessionInfo();
        //supprime la room uniquement si l'utilisateur est admin
        if ($session["isLogged"] == true && $session["admin"] == true) {
            $connection = WrkDb::getInstance();
            // Preparation du SQL
            $sql = "DELETE FROM t_room WHERE pk_room = :PK";
            $params = array(':PK' => $room_id);

            $query = $connection->executeQuery($sql, $params);
            if ($query != null) {
                return $query->rowCount();
            } else {
                return 0;
            }
        } else {
            http_response_code(403);
            return "Unauthorized";
        }
    }
}
