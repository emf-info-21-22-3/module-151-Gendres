# Exercice 4 - Lecture d’un flux XML depuis un fichier PHP 

## Objectif
Lecture depuis un client JavaScript d'un flux XML fournit par un serveur écrit en PHP
Les apprentis replacent les différents éléments dans les parties client et serveur.


## Travail à réaliser

• La partie cliente vous est donnée (voir le chapitre "Ressources"). Vous devez uniquement l’analyser et adapter l’URL de lien vers le serveur.
	
• Créez un fichier PHP (serveur.php) qui contient le code suivant :
	
  ```php
<?php
			echo '<equipes>';
			echo '<equipe><id>3</id><nom>SC Bern</nom></equipe>';
			echo '<equipe><id>4</id><nom>Fribourg-Gottéron</nom></equipe>';
			echo '<equipe><id>7</id><nom>HC Davos</nom></equipe>';
			echo '<equipe><id>8</id><nom>Genève-Servette</nom></equipe>';
			echo '</equipes>';
		?>
 ```
• Faites les adaptations nécessaires pour que lorsque le bouton « Affiche » est pressé, le client demande les données au serveur (fichier php) et l’affiche dans le tableau

 • Remplissez le diagramme sur OneNote
 
 ## Documentation
### Client
Sur le client, on utilise JQuery pour aller chercher les informations sur le serveur (GET). Le XML retourné est alors traité de la même manière que pour l'exercice 3 afin d'être affiché dans un tableau.
### Serveur
Il n'y a pas grand chose sur le serveur. Un simple fichier XML est retourné.

