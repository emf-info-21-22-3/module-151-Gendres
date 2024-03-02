<?php
class Message
{
    private $message_id;
    private $texte;
    private $date_sent;
    private $room_id;
    private $user_id;

    public function __construct($message_id, $texte, $date_sent, $room_id, $user_id)
    {
        $this->message_id = $message_id;
        $this->texte = $texte;
        $this->date_sent = $date_sent;
        $this->room_id = $room_id;
        $this->user_id = $user_id;
    }
    public function getMessageId()
    {
        return $this->message_id;
    }
    public function getMessage()
    {
        return $this->texte;
    }
    public function getDate()
    {
        return $this->date_sent;
    }
    public function getRoomId()
    {
        return $this->room_id;
    }
    public function getUserId()
    {
        return $this->user_id;
    }

    public function __toString(): string
    {
        $userFirstLetter = strtoupper(substr($this->user_id, 0, 1));
        $dateNotUTC = DateTime::createFromFormat('Y-m-d H:i:s', $this->date_sent);
        $dateNotUTC->setTimezone(new DateTimeZone('Europe/Zurich'));
        $date = $dateNotUTC->format('d-m-y H:i');
        return "
        <message>
            <info>
                <id>$this->message_id</id>
                <user>
                    <username>$this->user_id</username>
                    <avatar>$userFirstLetter</avatar>
                </user>
                <date>$date</date>
            </info>
            <texte>$this->texte</texte>
        </message>
        ";
    }
}
