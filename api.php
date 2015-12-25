<?php

//var_dump($_POST) won't work
//get the request payload from the backbone call
$input = json_decode(file_get_contents('php://input'), true);
//var_dump($input);

require_once('db.php');


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {





}
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

	$s = $db->query('SELECT id, type, geometry, username, creation, modified from geometry');
 
	# setting the fetch mode
	$s->setFetchMode(PDO::FETCH_ASSOC);

	$gs = [];
	while($row = $s->fetch()) {
		$gs[] = $row;
	}
	
	echo json_encode($gs);


}
elseif (in_array($_SERVER['REQUEST_METHOD'], array('PUT','POST'))) {

	// upsert or save the feature

	$s = $db->prepare("INSERT INTO geometry ( id, type, geometry, username, creation ) values ( NULL, :type, :geometry, :username, :creation)");
	//$s->bindParam(':geometry', $input['geometry']);
	//$s->bindParam(':type', $input['type']);
	//$s->bindParam(':username', 'Hans');
	//$s->bindParam(':creation', time());
	$input['username'] = 'Hans';
	$input['creation'] = time();
	$s->execute($input);

}


# close the connection
$db = null;
