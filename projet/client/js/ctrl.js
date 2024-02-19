class Ctrl {
    constructor() {
        // Initialize a flag to track whether the code has been executed
        this.codeExecuted = false;
    }

    start() {
        // Check if the code has already been executed
        if (!this.codeExecuted) {
            // This code will execute only once when the document is ready
            // Here you can perform actions such as initializing components, starting functions, etc.
            this.vue = new VueCtrl();

            // Set the flag to true to indicate that the code has been executed
            this.codeExecuted = true;
        }
    }
    checkLogin(username, hashedPassword) {
        console.log(username + ";" + hashedPassword);
        this.vue.loadHTML("chat");
    }

}

// Instantiate the Ctrl class
const ctrl = new Ctrl();

// Attend la fin du chargement de la page
$(document).ready(() => {
    ctrl.start();
});
