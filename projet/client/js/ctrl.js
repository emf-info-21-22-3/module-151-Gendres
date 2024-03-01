class Ctrl {
    constructor() {
        this.codeExecuted = false;
        this.vue;
        this.http;
    }

    start() {
        if (!this.codeExecuted) {
            this.vue = new VueCtrl();
            this.http = new Http();
            this.codeExecuted = true;
        }
    }

    checkLogin(username, pass) {
        console.log(username + ";" + pass);

        this.http.userAuth(
            this.checkLoginSuccess,
            this.checkLoginError,
            username,
            pass
        );
    }

    checkLoginSuccess(data, text, jqXHR) {
        
        $(data).find("login").each(function () {
            if ($(this).find("status").text() == "true") {
                // Store user information in localStorage
                var username = $(this).find("username").text();
                var avatar = username.substr(0, 1);
                var isAdmin = $(this).find("isAdmin").text();

                // Store user information in localStorage
                localStorage.setItem("username", username);
                localStorage.setItem("avatar", avatar.toUpperCase());
                localStorage.setItem("isAdmin", isAdmin);

                ctrl.vue.loadHTML("chat");
            } else {
                $("#status").find("p").remove();
                $("#status").append("<p style='color:red;'>Login erroné</p>");
            }
        });

        // Met à jour les infos dans la sidebar
        var storedUsername = localStorage.getItem("username");
        var storedAvatar = localStorage.getItem("avatar");
        setTimeout(() => {
            $(".user-info .avatar").text(storedAvatar);
            $(".user-info .username").text(storedUsername);
        }, 50);


    }
    checkLoginError(data, text, jqXHR) {


        if (data.status == 403) {
            //le compte existe déjà
            $("#status").find("p").remove();
            $("#status").append("<p style='color:red;'>Login erroné</p>");
            setTimeout(() => {
                $("#status p").remove();
            }, 5000);
        } else {
            $("#status").find("p").remove();
            $("#status").append(
                "<p style='color:red;'>Le serveur ne répond pas...</p>"
            );
            setTimeout(() => {
                $("#status p").remove();
            }, 5000);
        }
    }

    createAccount(username, pass) {
        ctrl.http.userNew(username, pass, ctrl.createAccountSuccess, ctrl.createAccountError);
    }
    createAccountSuccess(data, text, jqXHR) {

        ctrl.vue.loadHTML("login")
        setTimeout(() => {
            $("#status").find("p").remove();
            $("#status").append(
                "<p style='color:green;'>Le compte a bien été créé.</p>"
            );
        }, 1000);

        setTimeout(() => {
            $("#status p").remove();
        }, 5000);

    }
    createAccountError(data, text, jqXHR) {
        if (data.status == 409) {
            //le compte existe déjà
            $("#status").find("p").remove();
            $("#status").append(
                "<p style='color:red;'>Le nom d'utilisateur est déjà pris...</p>"
            );
            setTimeout(() => {
                $("#status p").remove();
            }, 5000);
        } else if (data.status == 500) {
            //une erreur c'est produite
            $("#status").find("p").remove();
            $("#status").append(
                "<p style='color:red;'>Petit problème sur le serveur...</p>"
            );
            setTimeout(() => {
                $("#status p").remove();
            }, 5000);
        } else {
            $("#status").find("p").remove();
            $("#status").append(
                "<p style='color:red;'>Le serveur ne répond pas...</p>"
            );
            setTimeout(() => {
                $("#status p").remove();
            }, 5000);
        }
    }
    loadRoom(roomId) {
        localStorage.setItem("currentRoom", roomId);
        this.http.loadRoom(roomId, ctrl.loadRoomSuccess, ctrl.loadRoomError);
    }
    loadRoomSuccess(data, text, jqXHR) {
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
        //display messages
        var currentUser = localStorage.getItem("username");
        $(".chat-messages").empty();

        //process XML
        $(data).find("message").each(function (index, element) {

            // extrait les elements du XML pour les mettre dans le message
            var id = $(element).find("id").text();
            var username = $(element).find("username").text();
            var avatar = $(element).find("avatar").text();
            var date = $(element).find("date").text();
            var text = $(element).find("texte").text();
            //compose le message
            var htmlMessage = '<div class="message">';
            htmlMessage += '<div class="info">';
            htmlMessage += '<div class="user">';
            htmlMessage += '<div class="avatar">' + avatar + '</div>';
            htmlMessage += '<div class="nom">' + username + '</div>';
            htmlMessage += '</div>';
            htmlMessage += '<div class="date">' + date + '</div>';
            htmlMessage += '</div>';
            htmlMessage += '<div class="text">' + text + '</div>';
            htmlMessage += '</div>';
            console.log(htmlMessage);
            //si le message est envoyé par l'utilisateur, il est afiché autrement.
            if (username === currentUser) {
                htmlMessage = $(htmlMessage).toggleClass("sender").prop("outerHTML");
            }
            //ajoute le message
            $(".chat-messages").append(htmlMessage);
        });



    }
    loadRoomError(data, text, jqXHR) {
        console.log(data);
        alert("Les Messages n'ont pas pu être chargés.");
    }

    sendMessage(texte, room_id) {
        if (!texte || !texte.trim()) {
            console.error("Text is null, empty, or contains only spaces.");
            return;
        }
        if (room_id === null) {
            console.error("Room ID is null");
            return;
        }
        // empeche les injection HTML (merci chatGPT)
        texte = $("<div>").text(texte).html();
        // Proceed with sending the message
        console.log("Sending message:", texte, "to room:", room_id);

        this.http.sendMessage(
            texte,
            room_id,
            ctrl.sendMessageSuccess,
            ctrl.sendMessageError
        );
    }
    sendMessageSuccess(data, text, jqXHR) {
        console.log("message envoyé !");
        ctrl.loadRoom(0);
    }
    sendMessageError(data, text, jqXHR) {
        console.log(text);
        alert("Le message n'a pas pu être envoyé");
    }

    disconnect() {
        this.http.userOut();
        // Efface les information de session du cache.
        localStorage.removeItem("username");
        localStorage.removeItem("avatar");
        localStorage.removeItem("isAdmin");

    }

    autoReloadMessage() {
        //définit une intervale qui recharge les messages toutes les 5 seconces SI la page de tchat est affichée.
        setInterval(function () {
            // Check if the element with class "chat-messages" exists
            var chatMessages = $(".chat-messages");
            if (chatMessages.length > 0) {
                ctrl.loadRoom(localStorage.getItem("currentRoom"));
            }
        }, 5000);
    }

}

// Instantiate the Ctrl class
const ctrl = new Ctrl();

// Attend la fin du chargement de la page
$(document).ready(() => {
    ctrl.start();
});