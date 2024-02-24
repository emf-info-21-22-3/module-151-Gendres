class Ctrl {
  constructor() {
    // Initialize a flag to track whether the code has been executed
    this.codeExecuted = false;
    this.vue;
    this.http;
  }

  start() {
    // Check if the code has already been executed
    if (!this.codeExecuted) {
      // This code will execute only once when the document is ready
      // Here you can perform actions such as initializing components, starting functions, etc.
      this.vue = new VueCtrl();
      this.http = new Http();

      // Set the flag to true to indicate that the code has been executed
      this.codeExecuted = true;
    }
  }

  checkLogin(username, pass) {
    //console.log(username + ";" + pass);

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
    console.log(data);
    
    $(data).find("login").each(function() {
       
        if ($(this).find("status").text() == "true"){
            ctrl.vue.loadHTML("chat");
        }   else {
            $("#status").find("p").remove();
            $("#status").append("<p style='color:red;'>Login erroné</p>");
        }
    });  

    
  }
  
  checkLoginError(data, text, jqXHR) {
    $("#status").find("p").remove();
    $("#status").append("<p style='color:red;'>Problème avec la requete sur le serveur</p>");
  }
}

// Instantiate the Ctrl class
const ctrl = new Ctrl();

// Attend la fin du chargement de la page
$(document).ready(() => {
  ctrl.start();
});
