<?php
require_once 'connect.php';

// je fais une requete dans ma base de donnée
$req = $db->prepare("INSERT INTO `score` (`timer`) VALUES (:timer)");
$req->bindParam('timer', $_POST['score'], PDO::PARAM_INT);
$req->execute();

