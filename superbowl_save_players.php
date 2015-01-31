<?php
/**
 * Created by PhpStorm.
 * User: mak
 *
 * Saves a JSON file to a local file without mods
 *
 */


    $pickfile = "data/players.json";

    //probably don't need this decode/encode, but it works
    $inbound = json_decode(file_get_contents('php://input'), true);

    $ph = fopen($pickfile, 'w+') or die("impossible to open file");
    fwrite($ph, json_encode($inbound));
    fclose($ph);

    header('Content-Type: application/json');
    echo json_encode($inbound);

?>