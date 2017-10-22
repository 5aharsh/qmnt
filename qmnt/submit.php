<?php
    function clean($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }
    $name = clean($_GET["username"]);
    $mail = clean($_GET["email"]);
    $site = clean($_GET["website"]);
    $qmnt = clean($_GET["message"]);
    $page = clean($_GET["address"]);
    $date = clean($_GET["date"]);
    $jsonString = file_get_contents('comment.json');
    $file = json_decode($jsonString, true);
    $data["username"] = $name;
    $data["email"] = $mail;
    $data["website"] = $site;
    $data["date"] = $date;
    $data["content"] = $qmnt;
    array_push($file[$page], $data );
    $writable = json_encode($file, JSON_PRETTY_PRINT);
    file_put_contents('comment.json', $writable);
?>
