/**
 * la classe Ctrl
 * s'occupe de tout c'est à dire :
 *  - chef d'orchestre
 *  - traitement des données reçues
 *
 * @version : 1.6 (???)
 * @author le seul, l'unique, Simon Gendre
 */
class Ctrl {
  constructor() {
    this.codeExecuted = false;
    this.vue;
    this.http;
  }
  /**
   * executer au chargement
   */
  start() {
    if (!this.codeExecuted) {
      this.vue = new VueCtrl();
      this.http = new Http();
      this.codeExecuted = true;
      this.reloadTimer;
      this.http.getSessionInfo(ctrl.checkLoginSuccess, null);
    }
  }
  /**
   *
   * @param {*} username
   * @param {*} pass
   */
  checkLogin(username, pass) {
    this.http.userAuth(
      this.checkLoginSuccess,
      this.checkLoginError,
      username,
      pass
    );
  }
  /**
   * success callback de checklogin
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  checkLoginSuccess(data, text, jqXHR) {
    $(data)
      .find("login")
      .each(function () {
        if ($(this).find("status").text() == "true") {
          var username = $(this).find("username").text();
          var avatar = username.substr(0, 1);
          //définit si l'utilisateur est admin.
          var isAdmin = false;

          if ($(this).find("isAdmin").text() == 1) {
            isAdmin = true;
          }

          // stock les infos utilisateur
          localStorage.setItem("username", username);
          localStorage.setItem("avatar", avatar.toUpperCase());
          localStorage.setItem("isAdmin", isAdmin);
          localStorage.setItem("adminMode", false);
          localStorage.setItem("currentRoom", 0);

          ctrl.vue.loadHTML("chat");
        } else {
          ctrl.http.disconnect();
        }
      });

    // Met à jour les infos dans la sidebar
    var storedUsername = localStorage.getItem("username");
    var storedAvatar = localStorage.getItem("avatar");
    setTimeout(() => {
      $(".user-info .avatar").text(storedAvatar);
      $(".user-info .username").text(storedUsername);
      if (localStorage.getItem("isAdmin") === "true") {
        ctrl.loadAdminPage();
      }
    }, 50); //laisse le temps à l'hmtl de se charger
  }
  /**
   * errorcallback de checklogin
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  checkLoginError(data, text, jqXHR) {
    if (data.status == 403) {
      ctrl.vue.afficheStatut("Login erroné", "red");
    } else {
      ctrl.vue.afficheStatut("Le serveur ne répond pas...", "red");
    }
  }
  /**
   * créé un nouveau compte
   * @param {*} username
   * @param {*} pass
   */
  createAccount(username, pass) {
    ctrl.http.userNew(
      username,
      pass,
      ctrl.createAccountSuccess,
      ctrl.createAccountError
    );
  }
  /**
   * successcallback de createaccount
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  createAccountSuccess(data, text, jqXHR) {
    ctrl.vue.loadHTML("login");
    ctrl.vue.afficheStatut("Le compte a bien été créé.", "green");
  }
  /**
   * errorcallback de createaccount
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  createAccountError(data, text, jqXHR) {
    if (data.status == 409) {
      //le compte existe déjà
      ctrl.vue.afficheStatut("Le nom d'utilisateur est déjà pris..", "red");
    } else if (data.status == 500) {
      //une erreur c'est produite
      ctrl.vue.afficheStatut("Petit problème sur le serveur...", "red");
    } else {
      ctrl.vue.afficheStatut("Le serveur ne répond pas...", "red");
    }
  }
  /**
   * charge les messages d'une salle
   * @param {int} roomId
   */
  loadRoom(roomId) {
    localStorage.setItem("currentRoom", roomId);
    this.http.loadRoom(roomId, ctrl.loadRoomSuccess, ctrl.loadRoomError);
  }
  /**
   * successcallback de loadroom
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  loadRoomSuccess(data, text, jqXHR) {
    var messageCount = $(data).find("message").length;

    if (messageCount != localStorage.getItem("messageCount")) {
      localStorage.setItem("messageCount", messageCount);
      //met à jour les messages seulement s'il y en a des nouveaux.
      var currentUser = localStorage.getItem("username");
      $(".chat-messages").empty();

      //traite XML
      $(data)
        .find("message")
        .each(function (index, element) {
          // extrait les elements du XML pour les mettre dans le message
          var id = $(element).find("id").text();
          var username = $(element).find("username").text();
          var avatar = $(element).find("avatar").text();
          var date = $(element).find("date").text();
          var text = $(element).find("texte").text();
          //compose le message
          var htmlMessage = '<div class="message">';
          htmlMessage += '<div class="info">';
          htmlMessage += '<div class="id">' + id + "</div>";
          htmlMessage += '<div class="user">';
          htmlMessage += '<div class="avatar">' + avatar + "</div>";
          htmlMessage += '<div class="nom">' + username + "</div>";
          htmlMessage += "</div>";
          htmlMessage += '<div class="date">' + date + "</div>";
          htmlMessage += "</div>";
          htmlMessage += '<div class="text">' + text + "</div>";
          htmlMessage += "</div>";

          //si le message est envoyé par l'utilisateur actuel, il est afiché autrement.
          if (username === currentUser) {
            htmlMessage = $(htmlMessage)
              .toggleClass("sender")
              .prop("outerHTML");
          }

          // Ajoute un gestionnaire de clic
          //TODO clic seulement sur le div text et pas le message entier qui est moitié invisible.
          htmlMessage = $(htmlMessage).click(function () {
            ctrl.deleteMessage(this);
          });

          //ajoute le message

          $(".chat-messages").append(htmlMessage).animate(
            {
              display: "initial",
            },
            1000
          );
        });

      //scroll à la fin des messages.
      var chatMessages = $(".chat-messages");
      chatMessages.scrollTop(chatMessages.prop("scrollHeight"));
      //actualise les salles de chat
      ctrl.getRoomList();
    }
  }
  /**
   * errorcallback de loadroom
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  loadRoomError(data, text, jqXHR) {
    console.log(data);
    ctrl.vue.afficheStatut("Les messages n'ont pas pu être chargés.", "red");
  }
  /**
   * envoie un message
   * @param {string} texte
   * @param {int} room_id
   * @returns
   */
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
    console.log("Sending message:", texte, "to room:", room_id);

    this.http.sendMessage(
      texte,
      room_id,
      ctrl.sendMessageSuccess,
      ctrl.sendMessageError
    );
  }
  /**
   * successcallback de sendmessage
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  sendMessageSuccess(data, text, jqXHR) {
    console.log("message envoyé !");
    ctrl.loadRoom(localStorage.getItem("currentRoom"));
  }
  /**
   * errorcallback de sendmessage
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  sendMessageError(data, text, jqXHR) {
    if (data.status == 413) {
      // Le message est trop long
      ctrl.vue.afficheStatut(
        "Le message est trop long. La longueur maximale est de 160 caractères.",
        "red"
      );
    } else if (data.status == 500) {
      // Une erreur s'est produite
      ctrl.vue.afficheStatut("Petit problème sur le serveur...", "red");
    } else if (data.status == 403) {
      // Pas logué
      ctrl.vue.afficheStatut(
        "Pas autorisé ! Va te loguer petit chenapan.",
        "red"
      );
    } else {
      ctrl.vue.afficheStatut("Le serveur ne répond pas...", "red");
    }
  }
  /**
   * supprime un message (admin only)
   * @param {div} message
   */
  deleteMessage(message) {
    if (localStorage.getItem("adminMode") == "true") {
      var messageId = $(message).find(".id").text();

      var confirmation = confirm(
        "Voulez-vous vraiment supprimer le message de " +
          $(message).find(".nom").text() +
          "?"
      );
      if (confirmation) {
        ctrl.http.deleteMessage(
          messageId,
          ctrl.deleteMessageSuccess,
          ctrl.deleteMessageError
        );
      }
    }
  }
  /**
   * successcallback de deletemessage
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  deleteMessageSuccess(data, text, jqXHR) {
    ctrl.loadRoom(localStorage.getItem("currentRoom"));
    ctrl.vue.afficheStatut("Le message a bien été supprimé.", "green");
  }
  /**
   * errorcallback de deletemessage
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  deleteMessageError(data, text, jqXHR) {
    ctrl.vue.afficheStatut("Le message n'a pas pu être supprimé...", "red");
  }

  getRoomList() {
    ctrl.http.loadAllRooms(ctrl.getRoomListSuccess, ctrl.getRoomListError);
  }
  getRoomListSuccess(data, text, jqXHR) {
    $(".room-list").empty();

    //traite XML
    $(data)
      .find("room")
      .each(function (index, element) {
        // extrait les elements du XML pour les mettre dans le message
        var id = $(element).find("id").text();
        var room_name = $(element).find("name").text();
        //compose le message
        var htmlRoom =
          '<div class="room">' +
          room_name +
          '<div class="id">' +
          id +
          "</div></div>";

        htmlRoom = $(htmlRoom).click(function () {
          ctrl.deleteRoom(this);
        });

        if (id == localStorage.getItem("currentRoom")) {
          htmlRoom = $(htmlRoom).css({
            "background-color": "#c6f8e1",
            "background-size": "200% 100%",
          });
        }
        // Ajoute un gestionnaire de clic
        htmlRoom = $(htmlRoom).click(function () {
          localStorage.removeItem("messageCount");
          ctrl.vue.afficheStatut(
            "Vous avez rejoint la salle " + room_name,
            "green"
          );
          ctrl.loadRoom(id);
        });
        //ajoute le message
        $(".room-list").append(htmlRoom);
      });
  }
  getRoomListError(data, text, jqXHR) {
    ctrl.vue.afficheStatut(
      "impossible de récuperer la liste des salles...",
      "red"
    );
  }

  createRoom(room_name) {
    ctrl.http.roomNew(room_name, ctrl.createRoomSuccess, ctrl.createRoomError);
  }
  createRoomSuccess(data, text, jqXHR) {
    ctrl.getRoomList();
    ctrl.vue.afficheStatut("la salle à bien été créée", "green");
  }
  createRoomError(data, text, jqXHR) {
    if (data.status == 409) {
      // Le nom est déjà pris
      ctrl.vue.afficheStatut("Le nom de la salle est déjà pris...", "red");
    } else if (data.status == 500) {
      // Une erreur s'est produite
      ctrl.vue.afficheStatut("Petit problème sur le serveur...", "red");
    } else if (data.status == 403) {
      // Pas logué
      ctrl.vue.afficheStatut(
        "Pas autorisé ! Va te loguer petit chenapan.",
        "red"
      );
    } else {
      ctrl.vue.afficheStatut("Le serveur ne répond pas...", "red");
    }
  }

  /**
   * supprime une room (admin only)
   * @param {div} message
   */
  deleteRoom(room) {
    if (localStorage.getItem("adminMode") == "true") {
      var roomId = $(room).find(".id").text();
      var confirmation = confirm(
        "Voulez-vous vraiment supprimer la room " + $(room).text() + "?"
      );
      if (confirmation) {
        ctrl.http.deleteRoom(
          roomId,
          ctrl.deleteRoomSuccess,
          ctrl.deleteRoomError
        );
      }
    }
  }
  /**
   * successcallback de deleteroom
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  deleteRoomSuccess(data, text, jqXHR) {
    ctrl.loadRoom(0);
    ctrl.vue.afficheStatut("La room a bien été supprimé.", "green");
  }
  /**
   * errorcallback de deleteroom
   * @param {*} data
   * @param {*} text
   * @param {*} jqXHR
   */
  deleteRoomError(data, text, jqXHR) {
    ctrl.vue.afficheStatut(
      "La room n'a pas pu être supprimée. Assurez-vous qu'elle ne contient aucun message et réessayez.",
      "red"
    );
  }

  /**
   * déconnecte proprement l''utilisateur actuel
   */
  disconnect() {
    this.http.userOut();
    // Efface les information de session du cache.
    localStorage.clear();
  }

  /**
   * définit un timer pour rafraichir les messages.
   */
  autoReloadMessage() {
    localStorage.setItem("messageCount", 0);
    // Check if the timer is already set
    if (!ctrl.reloadTimer) {
      // Set the interval only if the timer is not already running
      ctrl.reloadTimer = setInterval(function () {
        // Check if the element with class "chat-messages" exists
        var chatMessages = $(".chat-messages");
        if (chatMessages.length > 0) {
          ctrl.loadRoom(localStorage.getItem("currentRoom"));
          //ctrl.getRoomList();
        }
      }, 5000); //actualise toutes les 5 secondes
    }
  }
  /**
   * ajoute des boutons pour les admins
   */
  loadAdminPage() {
    $(".user-info .controls").append(
      '<button class="sidebutton" id="admin-btn">Activer le mode Admin</button>'
    );

    $(".user-info .controls #admin-btn").click(() => {
      ctrl.toggleAdminMode();
    });
  }
  /**
   * active/désactive le onclick pour supprimer des messages
   */
  toggleAdminMode() {
    if (localStorage.getItem("adminMode") == "true") {
      $("button").animate(
        {
          "background-color": "#4c8baf",
          "background-size": "200% 100%",
        },
        1000
      );
      localStorage.setItem("adminMode", false);
      $("#admin-btn").text("Activer le mode Admin");
    } else {
      var confirmation = confirm(
        "Le mode admin permet de supprimer les messages et les rooms inappropriés en cliquant dessus. Êtes-vous sûr de vouloir continuer ?"
      );
      if (confirmation) {
        // User clicked "OK"
        $("button").animate(
          {
            "background-color": "#f86c4d",
            "background-size": "200% 100%",
          },
          1000
        );
        localStorage.setItem("adminMode", true);
        $("#admin-btn").text("Désactiver le mode Admin");
      } else {
        // User clicked "Cancel" or closed the dialog
        ctrl.vue.afficheStatut("Mode admin non activé", "red");
      }
    }
    ctrl.loadRoom(localStorage.getItem("currentRoom"));
  }
}

const ctrl = new Ctrl();
// Attend la fin du chargement de la page
$(document).ready(() => {
  ctrl.start();
});
