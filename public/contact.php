<?php
print_r($_POST)
if($_POST["submit"]) {
    $recipient="traceydolsen@gmail.com";
    $sender=$_POST["name"];
    $senderEmail=$_POST["email"];
    $message=$_POST["message"];

    $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

    mail($recipient, $mailBody, "From: $sender <$senderEmail>");

    $thankYou="<p>Thanks for reaching out! Your message has been sent.</p>";
}

?>
