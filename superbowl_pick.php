<?php
/**
 * Created by PhpStorm.
 * User: treb
 * Date: 1/11/15
 * Time: 8:58 AM
 */


    $pickfile = "data/picks.json";
    //Checks to see if the file exists and if it has something in it.  If not it creates with an empty array.
    if (filesize($pickfile) < 2) {
        $ph = fopen($pickfile, 'w+');
        fwrite($ph,"[]");
        fclose($ph);
    };

    $ph = fopen($pickfile, 'r') or die("impossible to open file");
    $pickData = fread($ph,filesize($pickfile));
    fclose($ph);


    $pickData = json_decode($pickData , true);

    //Converts the json encoding from angular to url-unencoded for PHP
        $_POST = json_decode(file_get_contents('php://input'), true);

    array_push($pickData,["CellID" => $_POST['CellID'], "initials" => $_POST['initials']]);
    $pickData =json_encode($pickData, JSON_PRETTY_PRINT);


    $ph = fopen($pickfile, 'w+') or die("impossible to open file");
    fwrite($ph, $pickData);
    fclose($ph);

?>