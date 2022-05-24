<?php 
// connection à la base de donnée que l'on insère dans la variable $db
try {
    $db = new PDO('mysql:host=localhost;dbname=projet-memorie;charset=utf8', 'root');
} catch(Exception $e){
    echo 'Erreur : '. $e->getMessage();
}