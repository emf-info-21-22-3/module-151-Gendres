<?php
class Room
{
    private $room_id;
    private $room_name;

    public function __construct(int $room_id, string $room_name)
    {
        $this->room_id = $room_id;
        $this->room_name = $room_name;
    }
    public function getRoomId(): int
    {
        return $this->room_id;
    }
    public function getRoomName(): string
    {
        return $this->room_name;
    }
    public function __toString(): string
    {
        return $this->getRoomId() . "," . $this->getRoomName() . ";";
    }
}
