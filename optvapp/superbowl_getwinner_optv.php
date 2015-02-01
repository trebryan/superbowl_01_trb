<?php
/**
 * Created by PhpStorm.
 * User: mak
 *
 * Saves a JSON file to a local file without mods
 *
 */

    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    require 'vendor/autoload.php';

    $manualMode = true;

    $rval = array("leader"=>"---");

    if ($manualMode){

      $client = new GuzzleHttp\Client();
      $res = $client->get('http://localhost/shcms2/rest/node/584.json');

      $score = json_decode($res->getBody());

      $seaScore = $score->field_sea->und[0]->value;
      $neScore = $score->field_ne->und[0]->value;

      $fieldRes = $client->get('http://localhost/overplay/superbowl_01_trb/data/picksfield.json');
      $field = json_decode($fieldRes->getBody());

      //var_dump($field);

      $winner = "---";
      $winnerNE = -1;
      $winnerSEA = -1;
      //echo $neScore;
      //echo $seaScore;


      foreach ($field as $line){
        foreach ($line as $cell){
          $playerNE = $cell->scoreRow;
          $playerSEA = $cell->scoreColumn;
          //echo $playerNE;
          //echo $playerSEA;
          if ($playerSEA==$seaScore && $playerNE==$neScore){
            $winner = $cell->initials;
            $winnerSEA = $playerSEA;
            $winnerNE = $playerNE;
            if ($winner==''){
              $winner='***';
            }

            //echo 'WINNER '.$winner;
          }
        }


      }
    } else {



    }


    header('Content-Type: application/json');
    echo json_encode(array('winner'=>$winner, 'ne'=>$winnerNE, 'sea'=>$winnerSEA));

?>