class VueCtrl {
    constructor() {

        //chargement de la page principale
        this.loadHTML("login");
    }

    loadHTML(view) {
        // charger la vue demandee
        $("#view").load("views/" + view + ".html", () => {
            if (view === "login") {
/*                $(".login-btn").click(() => {
                    
                });
                
  */              $('#login-form').submit(function (event) {
                // Prevent the default form submission behavior
                event.preventDefault();

                // Get the username and password from the form
                var username = $('#username').val();
                var password = $('#password').val();

                // Hash the password using SHA-256
                var hashedPassword = sha256(password);

                // Call the checkLogin method with the username and hashed password
                ctrl.checkLogin(username, hashedPassword);
            });
            }
        });
    }


}