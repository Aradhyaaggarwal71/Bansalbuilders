<?php
    $firstName = $_POST['name'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Database connection
    $conn = new mysqli('localhost', 'root', '', 'bansalbuilders');
    if ($conn->connect_error) {
        echo "$conn->connect_error";
        die("Connection Failed: " . $conn->connect_error);
    } else {
        // Prepare an insert statement
        $stmt = $conn->prepare("INSERT INTO enquiry (name, phone, email, message) VALUES (?, ?, ?, ?)");
        if ($stmt === false) {
            die("Prepare failed: " . $conn->error);
        }

        // Bind the variables to the prepared statement as parameters
        $stmt->bind_param("ssss", $firstName, $phone, $email, $message);

        // Attempt to execute the prepared statement
        if ($stmt->execute()) {
            echo "Registration successfully...";
        } else {
            echo "ERROR: Could not execute query: $stmt. " . $conn->error;
        }

        // Close statement
        $stmt->close();

        // Close connection
        $conn->close();
    }
?>
