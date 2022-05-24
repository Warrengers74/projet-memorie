<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=7, initial-scale=1.0" />
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="style_responsive.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
  </head>
  <body>
    <header>
      <h1>MEMORIA</h1>
    </header>

    <main>
      <span id="responsive">Passez en mode paysage pour une meilleure expérience.</span>
      <section id="first_screen">
        <div class="btn btn_jouer"><a href="#">JOUER</a></div>
        <h2>TOP 5 :</h2>
        <div id="podium">
          <?php
          require_once 'connect.php';

          $req = $db->query("SELECT `timer` FROM `score` ORDER BY `timer` ASC LIMIT 5");

          foreach ($req as $value) {
            $minutes = (int)(intval($value["timer"]) / 60);
            $secondes = (int)(intval($value["timer"] % 60));
            $minutes = $minutes < 10 ? "0" . $minutes : $minutes;
            $secondes = $secondes < 10 ? "0" . $secondes : $secondes;
            ?>
            <div class="number">
              <div><?= $minutes ?>m<?= $secondes ?>s</div>
            </div>
          <?php
          }
          ?>
         
      </section>
      <section id="game" class= "hidden_screen">
        <div id="timer_mobile">
          <div id="timer">&nbsp</div>
          <div class="btn btn_score btn_score_mobile"><a href="#">SCORE</a></div>
        </div>
        <div id="container"></div>
        <div class="btn btn_score btn_score_desktop"><a href="#">SCORE</a></div>
      </section>
      <section id="win_screen" class= "hidden_screen">
        <h2>Félicitation</h2>
        <p>Tu as gagné en <span id="result"></span></p>
        <div class="btn btn_score"><a href="#">SCORE</a></div>
      </section>
      <section id="lose_screen" class= "hidden_screen">
        <h2>Trop tard</h2>
        <p>Le temps imparti est écoulé</p>
        <div class="btn btn_score"><a href="#">SCORE</a></div>
      </section>
    </main>
    <script src="script.js"></script>
  </body>
</html>