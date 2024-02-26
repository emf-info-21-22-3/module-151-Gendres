/*
 * Couche de services HTTP (worker).
 *
 * @author Simon Gendre
 * @version 1.0 / 19.02.2024
 */
class Http {
  BASE_URL = "http://localhost:8080/projet/server/index.php";

  /*
function chargerPays(successCallback, errorCallback) {
  $.ajax({
    type: "GET",
    dataType: "xml",
    url: BASE_URL + "paysManager.php",
    success: successCallback,
    error: errorCallback
  });
}
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
      success: successCallback,
      error: errorCallback,
    });
  }
  userNew(user, pass) {}
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
        room_id : roomId
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
