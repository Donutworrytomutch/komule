<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $to = 'donutworrytoomuch@gmail.com';
  $subject = 'Contact Form Submission';
  $message = "First Name: {$_POST['first']}\n";
  $message .= "Last Name: {$_POST['last']}\n";
  $message .= "Email: {$_POST['email']}\n";
  $message .= "Phone: {$_POST['phone']}\n";
  $message .= "Message: {$_POST['message']}\n";
  $headers = "From: webmaster@example.com\r\n" .
    "Reply-To: webmaster@example.com\r\n" .
    "X-Mailer: PHP/" . phpversion();

  if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully.';
  } else {
    echo 'Failed to send email.';
  }
}
?>
