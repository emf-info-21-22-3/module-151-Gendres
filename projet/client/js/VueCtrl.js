class VueCtrl {
    constructor() {

        //chargement de la page principale
        this.loadHTML("login");
    }

    loadHTML(view) {
        // charger la vue demandee
        $("#view").load("views/" + view + ".html", () => {
            //vide les sidebars
            $("#sidebarright").empty();
            $("#sidebarleft").empty();

            // fait des actions en fonction de la vue chargée.

            /*=========LOGIN=========*/
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

                //petite blagounette 
                $("#forgot-btn").click((event) => {
                    //affiche une image et la retire par après car l'option mot de passe oublié n'est pas implémenté et ne le sera pas de si tôt.
                    $("#sidebarright").append("<img src='./img/forgot.jpg'>");
                    $("#sidebarright img").css({
                        'max-width': '100%',
                        'object-fit': 'contain'
                    });
                    setTimeout(() => {
                        $("#sidebarright img").remove();
                    }, 1000);
                });

                /*=========GUEST=========*/
            } else if (view === "guest_chat") {
                $("#load-login").click((event) => {
                    this.loadHTML("login");
                });

                /*=========CHAT=========*/
            } else if (view === "chat") {
                this.loadSideBar("userInfo", "right");
                this.loadSideBar("rooms", "left");
            }
        });
    }

    loadSideBar(view, side) {
        // charger la vue demandee
        $("#sidebar" + side).load("views/" + view + ".html", () => {

        });
    }


}