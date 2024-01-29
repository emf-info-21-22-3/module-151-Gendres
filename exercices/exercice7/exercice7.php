<?php
$bdd = new PDO('mysql:host=localhost;dbname=jeux_video', 'root', 'pwd');


$sqlQuery = 'SELECT * FROM jeux_video';

$statement = $mysqlClient->prepare($sqlQuery);
$statement->execute();

$jeux = $statement->fetchAll();

foreach ($jeux as $jeu) {
	echo $jeu['titre'];
}

?>