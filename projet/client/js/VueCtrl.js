class VueCtrl {
    constructor() {

        //chargement de la page principale
        this.loadHTML("login");
    }

    loadHTML(view) {
        // charger la vue demandee
        $("#view").load("views/" + view + ".html", () => {
            // fait des actions en fonction de la vue chargée.
            if (view === "login") {

                $('#login-form').submit(function (event) {
                    event.preventDefault();
                    var username = $('#username').val();
                    var password = $('#password').val();
                    ctrl.checkLogin(username, password);
                });
                $("#skip-btn").click((event) => {
                    this.loadHTML("guest_chat");
                });
            } else if (view === "guest_chat") {
                $("#load-login").click((event) => {
                    this.loadHTML("login");
                });
            }

        });
    }


}