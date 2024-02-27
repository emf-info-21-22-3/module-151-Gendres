<?php
require_once("./obj/Room.php");
require_once("./wrk/WrkDb.php");
class RoomManager
{
    function __construct()
    {
    }
    function getAll()
    {



        $connection = WrkDb::getInstance();
        // Using a prepared statement to prevent SQL injection
        $query = $connection->executeQuery("SELECT * FROM t_room");

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
            return null; // Return null if user not found
        }
    }
    function create($roomId)
    {

    }
}
