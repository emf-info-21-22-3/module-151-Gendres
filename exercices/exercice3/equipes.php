<!doctype html>
<html>
<header>
  <link rel="stylesheet" type="text/css" href="stylesheets/main.css" />
</header>

<body>
  <div id="conteneur">
    <h1>Les équipes de National League</h1>
    <table border="1">
      <tr>
        <td>ID</td>
        <td>Club</td>
      </tr>
      <?php
      function ajouteCelluleHTML($id, $equipe)
      {
        //là, c'est du HTML 
        return "
                <tr>
                  <td>" . $id . "</td>
                  <td>" . $equipe . "</td>
                </tr>"
        ;
      }
      //on récup les équipes depuis le controleur
      require('ctrl.php');
      $equipes = getEquipes();
      //c'est avec count() qu'on a la taille d'un Array (that's what she said)
      for ($i = 0; $i < count($equipes); $i++) {

        echo ajouteCelluleHTML($i, $equipes[$i]);

      }
      ?>
    </table>
  </div>
</body>

</html>