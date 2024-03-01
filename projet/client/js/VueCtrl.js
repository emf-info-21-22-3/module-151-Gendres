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
                $("#login-form").submit(function(event) {
                    event.preventDefault();
                    var username = $("#username").val();
                    var password = $("#password").val();
                    ctrl.checkLogin(username, password);
                });
                $("#skip-btn").click((event) => {
                    this.loadHTML("guest_chat");
                });
                $("#create-btn").click((event) => {
                    $("#login-form #create-btn").remove();
                    $("#login-form #skip-btn").remove();
                    $("#login-form #login-btn").remove();
                    $("#forgot-btn").remove();
                    //ajoute les nouveaux boutons
                    $("#login-form").append(
                        '<input type="password" placeholder="Confirmer mot de passe" class="input-field" id="password-conf"><button type="button" class="login-btn" id="create-btn">Créer un compte</button><button type="button" class="login-btn" id="back-btn">Retour</button>'
                    );


                    $("#back-btn").click((event) => {
                        this.loadHTML("login");
                    });
                    $("#create-btn").click((event) => {
                        var username = $("#username").val();
                        var password = $("#password").val();
                        var passwordConf = $("#password-conf").val();

                        if (!(!username || !username.trim()) &&
                            !(!password || !password.trim())
                        ) {

                            if (password == passwordConf) {
                                ctrl.createAccount(username, password);

                            } else {
                                $("#status").find("p").remove();
                                $("#status").append(
                                    "<p style='color:red;'>Les mots de passe ne correspondent pas...</p>"
                                );
                                setTimeout(() => {
                                    $("#status p").remove();
                                }, 5000);
                            }

                        }
                    });
                });
                //petite blagounette
                $("#forgot-btn").click((event) => {
                    //affiche une image et la retire par après car l'option mot de passe oublié n'est pas implémenté et ne le sera pas de si tôt.
                    $("#sidebarright").append("<img src='./img/forgot.jpg'>");
                    $("#sidebarright img").css({
                        "max-width": "100%",
                        "object-fit": "contain",
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
                //charge les messages
                ctrl.loadRoom(0);

                /*=========CHAT=========*/
            } else if (view === "chat") {
                this.loadSideBar("userInfo", "right");
                //this.loadSideBar("rooms", "left");

                $("#send-btn").click((event) => {
                    var texte = $("#message-input").val();
                    $("#message-input").val("");
                    ctrl.sendMessage(texte, 0);
                });
                //charge les messages
                ctrl.loadRoom(0);
            }
        });
    }

    loadSideBar(view, side) {
        // charger la vue demandee
        $("#sidebar" + side).load("views/" + view + ".html", () => {
            if (view == "userInfo") {
                $("#logout-btn").click((event) => {
                    ctrl.http.userOut();
                    this.loadHTML("login");
                });
            }
        });
    }
    //TODO copy code et use methodes
    loadLogin(){}
    loadChat(){}
    loadGuest(){}
}