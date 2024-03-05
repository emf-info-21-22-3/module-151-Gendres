/*
 * Couche de services HTTP (worker).
 *
 *@author : Simon Gendre
 *@version : 1.5 / 27.02.2024
 */
class Http {
    BASE_URL = "http://127.0.0.1:8080/projet/server/index.php";
    /**
     * authentifie un utilisateur depuis le serveur.
     * @param {function} successCallback 
     * @param {function} errorCallback 
     * @param {string} user 
     * @param {string} pass 
     */
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
                xhrFields: {
                    withCredentials: true
                },
                success: successCallback,
                error: errorCallback,
            });
        }
        /**
         * créé un utilisateur depuis le serveur.
         * @param {function} successCallback 
         * @param {function} errorCallback 
         * @param {string} user 
         * @param {string} pass 
         */
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
                xhrFields: {
                    withCredentials: true
                },
                success: function(response) {
                    // Parse response as plain text
                    successCallback(response);
                },
                error: errorCallback,
            });
        }
        /**
         * déconnecte proprement l'utilisateur actuel 
         * @param {*} successCallback 
         * @param {*} errorCallback 
         */
    userOut(successCallback, errorCallback) {
            $.ajax({
                type: "POST",
                dataType: "xml",
                url: this.BASE_URL,
                data: {
                    action: "disconnect-user",
                },
                xhrFields: {
                    withCredentials: true
                },
                success: successCallback,
                error: errorCallback,
            });
        }
        /**
         * envoie un message dans une salle
         * @param {*} texte 
         * @param {*} roomId 
         * @param {*} successCallback 
         * @param {*} errorCallback 
         */
    sendMessage(texte, roomId, successCallback, errorCallback) {
            $.ajax({
                type: "POST",
                url: this.BASE_URL,
                data: {
                    action: "message",
                    texte: texte,
                    room_id: roomId
                },
                xhrFields: {
                    withCredentials: true
                },
                success: successCallback,
                error: errorCallback,
            });
        }
        /**
         * supprime un message
         * @param {*} messageId 
         * @param {*} successCallback 
         * @param {*} errorCallback 
         */
    deleteMessage(messageId, successCallback, errorCallback) {
            $.ajax({
                type: "DELETE",
                url: this.BASE_URL,
                data: {
                    message_id: messageId
                },
                xhrFields: {
                    withCredentials: true
                },
                success: successCallback,
                error: errorCallback,
            });
        }
        /**
         * retourne la liste de toutes les salle de chat
         * @param {*} successCallback 
         * @param {*} errorCallback 
         */
    loadAllRooms(successCallback, errorCallback) {
            $.ajax({
                type: "GET",
                dataType: "html",
                url: this.BASE_URL + "/?rooms",
                xhrFields: {
                    withCredentials: true
                },
                success: successCallback,
                error: errorCallback,
            });
        }
        /**
         * charge les messages d'une salle.
         * @param {*} roomId 
         * @param {*} successCallback 
         * @param {*} errorCallback 
         */
    loadRoom(roomId, successCallback, errorCallback) {
        $.ajax({
            type: "GET",
            dataType: "xml",
            url: this.BASE_URL + "/?messages=" + roomId,
            xhrFields: {
                withCredentials: true
            },
            success: successCallback,
            error: errorCallback,
        });
    }
    roomNew(room_name, successCallback, errorCallback) {
            $.ajax({
                type: "POST",
                dataType: "xml",
                url: this.BASE_URL,
                data: {
                    action: "create-room",
                    room_name: room_name
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function(response) {
                    // Parse response as plain text
                    successCallback(response);
                },
                error: errorCallback,
            });
        }
        /**
         * supprime un message
         * @param {*} messageId 
         * @param {*} successCallback 
         * @param {*} errorCallback 
         */
    deleteRoom(roomId, successCallback, errorCallback) {
        $.ajax({
            type: "DELETE",
            url: this.BASE_URL,
            data: {
                room_id: roomId
            },
            xhrFields: {
                withCredentials: true
            },
            success: successCallback,
            error: errorCallback,
        });
    }
}