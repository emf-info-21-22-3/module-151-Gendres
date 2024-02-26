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

        /*
        <div class="message">
            <div class="info">
                <div class="user">
                    <div class="avatar">A</div>
                    <div class="nom">admin</div>
                </div>
                <div class="date">10/03/23</div>
            </div>
            <div class="text">Hey! ça joue ?</div>
        </div>
        */
        $userFirstLetter = strtoupper(substr($this->user_id, 0, 1));
        return "
        <div class='message'>
        <div class='info'>
            <div class='user'>
                <div class='avatar'>$userFirstLetter</div>
                <div class='nom'>$this->user_id</div>
            </div>
            <div class='date'>$this->date_sent</div>
        </div>
        <div class='text'>$this->texte</div>
    </div>
        ";

    }
}

?>