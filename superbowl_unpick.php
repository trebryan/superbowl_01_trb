<?php
/**
 * User: treb
 * Date: 1/14/15
 * Time: 8:58 AM
 */


    $pickfile = "data/picks.json";

    $ph = fopen($pickfile, 'r') or die("impossible to open file");
    $pickData = fread($ph,filesize($pickfile));
    fclose($ph);


    $pickData = json_decode($pickData , true);

    //Converts the json encoding from angular to url-unencoded for PHP
        $_POST = json_decode(file_get_contents('php://input'), true);

    foreach ($pickData as $cellKey => $cellData){
        foreach($cellData as $key => $value){
            if ($value == $_POST['CellID']) {
                //array_push($pickData,["CellID" => $_POST['CellID'], "initials" => 'fuck']);
                unset($pickData[$cellKey]);
            }
        }
    }

    $pickData =json_encode($pickData, JSON_PRETTY_PRINT);

    $ph = fopen($pickfile, 'w+') or die("impossible to open file");
    fwrite($ph, $pickData);
    fclose($ph);

?>