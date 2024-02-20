/*
 * Couche de services HTTP (worker).
 *
 * @author Simon Gendre
 * @version 1.0 / 19.02.2024
 */
class Http {
   BASE_URL = "http://127.0.0.1:8080/projet/server/index.php";

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
      url:
        this.BASE_URL,
        data: {
          user: user,
          pass: pass,
          action: "check-user"
        },
      success: successCallback,
      error: errorCallback,
    });
  }
  userNew(user, pass) {}
  userOut(user) {}
  sendMessage(texte, roomId) {}
  deleteMessage(messageId) {}
  loadAllRooms() {}
  loadRoom(roomId) {}
}
