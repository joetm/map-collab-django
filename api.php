<?php

//var_dump($_POST) won't work
//get the request payload from the backbone call
$input = json_decode(file_get_contents('php://input'), true);

//var_dump($input);

// save the feature to the DB...

require_once('db.php');


$s = $db->prepare("INSERT INTO geometry ( id, type, geometry, username, creation ) values ( NULL, :type, :geometry, :username, :creation)");
//$s->bindParam(':geometry', $input['geometry']);
//$s->bindParam(':type', $input['type']);
//$s->bindParam(':username', 'Hans');
//$s->bindParam(':creation', time());
$input['username'] = 'Hans';
$input['creation'] = time();
$s->execute($input);

# close the connection
$DBH = null;
