# Projet

Repository du projet personnel du module 151

## Semaphor

### Description du projet

Durant ce module 151, nous allons créer une application web client-serveur en PHP et JavaScript. Mon projet s’intitule Semaphor et consiste en une application de messagerie en direct. Les utilisateurs peuvent lire les anciens messages et doivent se loguer pour en envoyer.
Il y aura une chatroom principale et éventuellement d’autres chatrooms
Plus d'information dans le [RP](/documentation/151_RP_GENDRE.pdf).

# Accès
Le site est hébergé sur [le domaine de l'école](https://151.gendres.emf-informatique.ch/). Voici quelques logins que vous pouvez essayer pour profiter de toutes les fonctionnalités (n'hésitez à créer votre compte !)

| Login   | Mot de passe |
| ------- | ------------ |
| admin   | admin        |
| gendres | Pa$$w0rd     |
| qwe     | qwe          |

---

# Arborescence

- Les exercices sont effectués dans [exercices](/exercices/)
- La documentation et les fichiers de configuration se trouvent dans [documentation](/documentation/).
- La partie cliente qui regroupe tous les fichiers nécessaires au fonctionnement du client développé en HTML/CSS/JS se trouve dans [client](/projet/client/) </br>
- La partie serveur qui regroupe tous les fichiers nécessaires au fonctionnement du serveur développé en PHP se trouve dans [serveur](/projet/server/)

```
.
├───client
│   │   index.html
│   │
│   ├───css
│   │       *.css
│   │
│   ├───img
│   │       *.jpg
│   │
│   ├───js
│   │       ctrl.js
│   │       http.js
│   │       VueCtrl.js
│   │
│   └───views
│           chat.html
│           guest_chat.html
│           login.html
│           rooms.html
│           userInfo.html
│
└───server
    │   hashpwd.php
    │   index.php
    │
    ├───obj
    │       Message.php
    │       Room.php
    │
    └───wrk
            configDb.php
            MessageManager.php
            RoomManager.php
            SessionManager.php
            WrkDb.php
```

---
# Screenshots du site web

## Ecran de Login

![écran de login](/documentation/img/login-page.png)

## Mode Invité

![Mode Invité](/documentation/img/guest-page.png)

## Mode Logué

![Mode Logué](/documentation/img/chat-page.png)

---

# Use cases

Voici les Use Cases de l’application. Il y aura trois acteurs différents : les visiteurs, les utilisateurs et les administrateurs. Voici ce qu’ils peuvent faire :

| Acteurs        | Actions                                                                       |
| -------------- | ----------------------------------------------------------------------------- |
| Visiteur       | Se connecter / créer un compte / voir les anciens messages de la room principale |
| Utilisateur    | Se déconnecter / envoyer des messages / rejoindre et créer des room           |
| Administrateur | Même chose que les utilisateurs / supprimer des messages                      |

![Use Case](/documentation/img/151%20-%20Use%20Cases.jpg)

---
# TODO
voir le fichier [TODO](/documentation/TODO.txt).

--- 
# Idées de Projet [DEPRECATED]

## Inventaire de services réseau

~~cette app permettrait de gérer qu'est-ce qui est déployé où et depuis quand dans un réseau.~~
~~Par exemple~~

```
pi-hole et homeassistant sur raspi01
unifi controller sur raspi02
omv sur srv-hp
```

## Appli de chat en direct

~~cette app permettrait de voir des anciens messages envoyés dans une chatroom(s). en gros, faire un groupe Whatsapp en php.~~

## Inventaire de collection de vinyles

~~cette app permettrait au users de creer un compte afin de gérer leur collection.~~
