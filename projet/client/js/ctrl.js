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
  /**
   * affiche les chat si le login est bon
   * affiche une erreur autrement
   */
  checkLoginSuccess(data, text, jqXHR) {
    $(data)
      .find("login")
      .each(function () {
        if ($(this).find("status").text() == "true") {
          ctrl.vue.loadHTML("chat");
          ctrl.loadRoom(0);
        } else {
          $("#status").find("p").remove();
          $("#status").append("<p style='color:red;'>Login erroné</p>");
        }
      });
  }
  checkLoginError(data, text, jqXHR) {
    $("#status").find("p").remove();
    $("#status").append(
      "<p style='color:red;'>Problème avec la requete sur le serveur</p>"
    );
  }

  loadRoom(roomId) {
    this.http.loadRoom(roomId, ctrl.loadRoomSuccess, ctrl.loadRoomError);
  }
  loadRoomSuccess(data, text, jqXHR) {
    $(".chat-messages").empty();
    $(".chat-messages").append(data);
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
