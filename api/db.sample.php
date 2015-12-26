<?php

// ** MySQL settings ** //
$dbhost = 'localhost';
$dbuser = 'myuser';
$dbpass = 'mypass';
$dbname = 'mapcollab';

try { 
  # MySQL with PDO_MYSQL
  $db = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
  
  # SQLite Database
  # $db = new PDO("sqlite:my/database/path/database.db");
}
catch(PDOException $e) {
    die($e->getMessage());
}