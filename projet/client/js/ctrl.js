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
        $(data)
            .find("login")
            .each(function() {
                if ($(this).find("status").text() == "true") {
                    ctrl.vue.loadHTML("chat");

                } else {
                    $("#status").find("p").remove();
                    $("#status").append("<p style='color:red;'>Login erroné</p>");
                }
            });

        //met à jour les infos dans la sidebar
        var username = $(data).find("username").text();
        var avatar = username.substr(0, 1);
        $(".user-info .avatar").text(avatar.toUpperCase());
        $(".user-info .username").text(username);



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
        this.http.loadRoom(roomId, ctrl.loadRoomSuccess, ctrl.loadRoomError);
    }
    loadRoomSuccess(data, text, jqXHR) {

        //TODO c'est tjr admin
        var currentUser = $(".user-info .username").text();
        console.log(currentUser);
        $(".chat-messages").empty();

        $(".chat-messages").append(data);
        $(".chat-messages .message").each((index, element) => {
            if ($(element).find(".nom").text() === currentUser) {
                $(element).toggleClass("sender");
            }
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




}

// Instantiate the Ctrl class
const ctrl = new Ctrl();

// Attend la fin du chargement de la page
$(document).ready(() => {
    ctrl.start();
});