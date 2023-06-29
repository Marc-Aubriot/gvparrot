<?php

include_once ROOT.'/src/models/Voiture.php';

$ref = $_REQUEST['ref'];

$prev_and_next_refs = Voiture::getPrevAndNextRef($ref);

if ($prev_and_next_refs[0]['prev_ref']) {
    echo $prev_and_next_refs[0]['prev_ref'].'+';
} else {
    echo 'null+';
}

if ($prev_and_next_refs[0]['ref']) {
    echo $prev_and_next_refs[0]['ref'].'+';
} else {
    echo 'null+';
}

if ($prev_and_next_refs[0]['next_ref']) {
    echo $prev_and_next_refs[0]['next_ref'].'+';
} else {
    echo 'null+';
}

//echo $prev_and_next_refs[0]['prev_ref'].'+'.$prev_and_next_refs[0]['ref'].'+'.$prev_and_next_refs[0]['next_ref'];

?>