/**
 * la classe Vue
 * s'occupe de tout ce qui est IHM c'est à dire :
 *  - onclic
 *  - charger les bouts des la single page app
 *  
 * @version : disons plus que "beta"
 * @author le seul, l'unique, Simon Gendre
 */
class VueCtrl {
    constructor() {
        //chargement de la page principale
        this.loadHTML("login");
    }

    /**
     * 
     * @param {string} view le nom de l'html (sans extension) à chargé dans le div avec l'id "view"
     */
    loadHTML(view) {
            // charger la vue demandee
            $("#view").load("views/" + view + ".html", () => {
                //vide les sidebars
                $("#sidebarright").empty();
                $("#sidebarleft").empty();

                // fait des actions en fonction de la vue chargée.

                /*=========LOGIN=========*/
                if (view === "login") {
                    this.loadLogin();
                    /*=========GUEST=========*/
                } else if (view === "guest_chat") {
                    this.loadGuest();

                    /*=========CHAT=========*/
                } else if (view === "chat") {
                    this.loadChat();
                }
            });
        }
        /**
         * 
         * @param {string} view le nom de l'html (sans extension) à chargé dans le div avec l'id "sidebar[side]"
         * @param {string} side left ou right en fonction du coté où l'HTML est chargé
         */
    loadSideBar(view, side) {
            // charger la vue demandee
            $("#sidebar" + side).load("views/" + view + ".html", () => {
                if (view == "userInfo") {
                    $("#logout-btn").click((event) => {
                        ctrl.disconnect();
                        this.loadHTML("login");
                    });
                } else if (view = "rooms") {
                    //met un lisnener pour creer des rooms
                    $("#newRoomBtn").click(function(event) {
                        var room_name = $("#room-name").val();
                        $("#room-name").val("");
                        ctrl.createRoom(room_name);
                    });
                    $("#room-name").keypress(function(event) {
                        // le code 13 correspond à la touche entrée
                        if (event.which === 13) {
                            var room_name = $("#room-name").val();
                            $("#room-name").val("");
                            ctrl.createRoom(room_name);


                        }
                    });
                }
            });
        }
        /**
         * méthode appelé pour définir les listener et autres actions sur la page de login
         */
    loadLogin() {
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
            /*petite blagounette 
            (j'avais déjà dit à l'analyse que je ferais pas l'option "mot de passe oublié")*/
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

        }
        /**
         * méthode appelé pour définir les listener et autres actions sur la page de chat
         */
    loadChat() {
            this.loadSideBar("userInfo", "right");
            //TODO les rooms sont pas encore implémentées
            this.loadSideBar("rooms", "left");

            $("#send-btn").click((event) => {
                var texte = $("#message-input").val();
                $("#message-input").val("");
                ctrl.sendMessage(texte, localStorage.getItem("currentRoom"));
            });
            $("#message-input").keypress(function(event) {
                // le code 13 correspond à la touche entrée
                if (event.which === 13) {
                    var texte = $("#message-input").val();
                    $("#message-input").val("");
                    ctrl.sendMessage(texte, localStorage.getItem("currentRoom"));
                }
            });
            ctrl.loadRoom(localStorage.getItem("currentRoom"));
            ctrl.autoReloadMessage();
        }
        /**
         * méthode appelé pour définir les listener et autres actions sur la page guest
         */
    loadGuest() {
            $("#load-login").click((event) => {
                this.loadHTML("login");
            });
            //charge les messages
            ctrl.loadRoom(0);
            ctrl.autoReloadMessage();
        }
        /**
         * affiche un message pendant 5 secondes dans l'élément avec l'id "status"
         * @param {string} message le message à affiché
         * @param {couleur css} couleur la couleur du texte à afficher
         */
    afficheStatut(message, couleur) {
        $("#status").find("p").remove();
        $("#status").append(
            "<p style='color:" + couleur + ";'>" + message + "</p>"
        );
        setTimeout(() => {
            $("#status p").remove();
        }, 5000);
    }


}