<?php
require_once 'Telegram.php';

$telegram = new Telegram;

if(isset($_POST) && $_POST['agree']) {
    $message = "<strong>Имя</strong>: {$_POST['name']}\n";
    $message .= "<strong>Номер</strong>: {$_POST['phone']}\n";
    if(!empty($_POST['utm_source']))
        $message .= "<strong>Utm source</strong>: {$_POST['utm_source']}\n";
    if(!empty($_POST['utm_campaign']))
        $message .= "<strong>Utm campaign</strong>: {$_POST['utm_campaign']}\n";
    if(!empty($_POST['utm_term']))
        $message .= "<strong>Utm term</strong>: {$_POST['utm_term']}\n";
    if(!empty($_POST['ip']))
        $message .= "<strong>IP</strong>: {$_POST['ip']}\n";

    $telegram->sendMessage($message);

    return header("Location: ".$_SERVER['HTTP_REFERER']);
}