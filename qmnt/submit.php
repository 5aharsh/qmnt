<?php
    function clean($data) {
        $data = trim($data);
        //$data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    $name = clean($_GET["username"]);
    $mail = clean($_GET["email"]);
    $site = clean($_GET["website"]);
    $qmnt = clean($_GET["message"]);
    $page = clean($_GET["address"]);
    $date = clean($_GET["date"]);
    $fpri = clean($_GET["fingerprint"]);
    // GET the comment.json file and decode it to json format
    $jsonString = file_get_contents('comment.json');
    $jsonEmail = file_get_contents('secret/email.json');
    $file = json_decode($jsonString, true);
    $secret = json_decode($jsonEmail, true);
    // set value of $data json to push in comment.json
    $data["username"] = $name;
    $data["website"] = $site;
    $data["date"] = $date;
    $data["content"] = $qmnt;
    $data["id"] = $fpri;

    $secret[$fpri] = $mail;

    // ADD: if $file[$page] doesn't exist, then initialize an empty array
    if(!isset($file[$page])){
        $file[$page]=[];
    }
    array_push($file[$page], $data);
    $writable = json_encode($file, JSON_PRETTY_PRINT);
    file_put_contents('comment.json', $writable);
    $writable = json_encode($secret, JSON_PRETTY_PRINT);
    file_put_contents('secret/email.json', $writable);
?>
