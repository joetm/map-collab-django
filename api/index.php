<?php

//var_dump($_POST) won't work
//get the request payload from the backbone call
$input = json_decode(file_get_contents('php://input'), true);
//var_dump($input);

require_once('./db.php');






if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {





}
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {

	$s = $db->query('SELECT _leaflet_id, type, encoded, options from geometry');
 
	# setting the fetch mode
	$s->setFetchMode(PDO::FETCH_ASSOC);

	$gs = [];
	while($row = $s->fetch()) {
		$gs[] = $row;
	}
	
	echo json_encode($gs);
	exit;


}
elseif (in_array($_SERVER['REQUEST_METHOD'], array('PUT','POST'))) {

	if (empty($input['encoded'])) exit;

	if (!empty($input['options'])) {
		$input['options'] = json_encode($input['options']);
	} else {
		$input['options'] = "{}";
	}

	// upsert or save the feature
	$s = $db->prepare("INSERT INTO geometry (
		id, type, encoded, _leaflet_id, username, options, creation
	) values (
		NULL, :type, :encoded, :_leaflet_id, :username, :options, :creation
	)");
	$input['username'] = 'Hans';
	$input['creation'] = time();

	//var_dump($input);

	//$s->bindparam('username', $name);
	//$s->bindparam('creation', $creation);
	//$s->bindparam('encoded', $input['encoded']);
	//$s->bindparam('_leaflet_id', $input['_leaflet_id']);
	//$s->bindparam('options', $input['options']);
	$s->execute($input);
}


# close the connection
$db = null;
