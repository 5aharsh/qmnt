<?php
    header("Content-Type: text/html; charset=utf-8");
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
    $qmid = clean($_GET["qmntid"]);
    // GET the comment.json file and decode it to json format
    $jsonString = file_get_contents('comment.json');
    $jsonEmail = file_get_contents('secret/email.json');
    $file = json_decode($jsonString, true);
    $secret = json_decode($jsonEmail, true);
    // set value of $data json to push in comment.json

    $isEmail = explode(" ", $qmnt)[0];
    if(preg_match("/#[0-9]+ /", $isEmail." ")){
        $recipient = substr($isEmail,1, strlen($isEmail)-1);
        if(!isset($secret[$file[$page][$recipient]["id"]])){
            $remail = $secret[$file[$page][$recipient]["id"].$file[$page][$recipient]["username"]];
            echo "mailed";
            $site = $_SERVER['HTTP_HOST'];
            $msg = "You have got a reply on your comment! Checkout at - http://".$site.$page.".";
            mail($remail, "You got a reply from ".$name, $msg, "From: <noreply@".$site.">");
        }
    }

    $data["username"] = $name;
    $data["website"] = $site;
    $data["date"] = $date;
    $data["content"] = $qmnt;
    $data["id"] = $fpri;
    if($fpri!="" && $mail!="" && empty($secret[$fpri.$name])){
        $secret[$fpri.$name] = $mail;
        echo "mail added";
    }
    if(empty($file[$page])){
        $file[$page]=json_decode("{}", true);
        echo "page added";
    }
    if(empty($file[$page][$qmid])){
        $file[$page][$qmid] = $data;
        echo "comment added";
    }
    $writable = json_encode($file, JSON_PRETTY_PRINT);
    file_put_contents('comment.json', $writable);
    $writable = json_encode($secret, JSON_PRETTY_PRINT);
    file_put_contents('secret/email.json', $writable);
?>
