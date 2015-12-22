<?php

//var_dump($_POST) won't work
//get the request payload from the backbone call
$input = json_decode(file_get_contents('php://input'), true);

var_dump($input);

?>