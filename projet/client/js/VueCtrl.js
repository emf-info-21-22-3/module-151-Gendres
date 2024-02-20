class VueCtrl {
    constructor() {

        //chargement de la page principale
        this.loadHTML("login");
    }

    loadHTML(view) {
        // charger la vue demandee
        $("#view").load("views/" + view + ".html", () => {
            if (view === "login") {
             $('#login-form').submit(function (event) {
                // Prevent the default form submission behavior
                event.preventDefault();
                // Get the username and password from the form
                var username = $('#username').val();
                var password = $('#password').val();
                // Call the checkLogin method with the username and hashed password
                ctrl.checkLogin(username, password);
            });
            }
        });
    }


}