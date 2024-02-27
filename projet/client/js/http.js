/*
 * Couche de services HTTP (worker).
 *
 * @author Simon Gendre
 * @version 1.5 / 27.02.2024
 */
class Http {
    BASE_URL = "http://localhost:8080/projet/server/index.php";

    userAuth(successCallback, errorCallback, user, pass) {
        $.ajax({
            type: "POST",
            dataType: "xml",
            url: this.BASE_URL,
            data: {
                user: user,
                pass: pass,
                action: "check-user",
            },
            success: successCallback,
            error: errorCallback,
        });
    }
    userNew(user, pass, successCallback, errorCallback) {
        $.ajax({
            type: "POST",
            dataType: "xml",
            url: this.BASE_URL,
            data: {
                action: "create-user",
                user: user,
                pass: pass
            },
            success: function(response) {
                // Parse response as plain text
                successCallback(response);
            },
            error: errorCallback,
        });
    }

    userOut(successCallback, errorCallback) {
        $.ajax({
            type: "POST",
            dataType: "xml",
            url: this.BASE_URL,
            data: {
                action: "disconnect-user",
            },
            success: successCallback,
            error: errorCallback,
        });
    }
    sendMessage(texte, roomId, successCallback, errorCallback) {
        $.ajax({
            type: "POST",
            url: this.BASE_URL,
            data: {
                action: "message",
                texte: texte,
                room_id: roomId
            },
            success: successCallback,
            error: errorCallback,
        });
    }
    deleteMessage(messageId) {}

    loadAllRooms(successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: this.BASE_URL + "/?rooms",
            success: successCallback,
            error: errorCallback,
        });
    }

    loadRoom(roomId, successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            dataType: "html",
            url: this.BASE_URL + "/?messages=" + roomId,
            success: successCallback,
            error: errorCallback,
        });
    }
}