<?php
/* ===== 1. DB credentials ===== */
$host     = 'localhost';
$user     = 'romito_dbuser';
$password = '}1gw-tWAq13aR0xM';
$dbname   = 'romito_FinalProject';      // שם בסיס‑הנתונים
$table    = 'my_reservations';          // שם הטבלה

/* ===== 2. connect ===== */
$mysqli = new mysqli($host, $user, $password, $dbname);
if ($mysqli->connect_error) die("Connection failed: " . $mysqli->connect_error);

/* ===== 3. get POST ===== */
$restaurant = trim($_POST['restName']   ?? '');
$resDate    = trim($_POST['resDate']    ?? '');
$resTime    = trim($_POST['resTime']    ?? '');
$guests     = intval($_POST['partySize']?? 0);
$seating    = trim($_POST['seating']    ?? '');
$fullName   = trim($_POST['fullName']   ?? '');
$email      = trim($_POST['email']      ?? '');
$phone      = trim($_POST['phone']      ?? '');
$notes      = trim($_POST['notes']      ?? '');

/* ===== 4. prepared statement ===== */
$sql = "INSERT INTO $table
        (restaurant_name, res_date, res_time, guests, seating,
         full_name, email, phone, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $mysqli->prepare($sql) or die("Prepare failed: " . $mysqli->error);
$stmt->bind_param("sssisssss",
                  $restaurant, $resDate, $resTime,
                  $guests, $seating, $fullName, $email, $phone, $notes);

/* ===== 5. execute & feedback ===== */
if ($stmt->execute()) {
  echo "<h2 style='color:green;text-align:center;margin-top:2rem'>
          Reservation saved successfully.<br>See you soon!
        </h2>";
} else {
  echo "<h2 style='color:red;text-align:center;margin-top:2rem'>
          Error: " . $stmt->error . "
        </h2>";
}
$stmt->close();
$mysqli->close();
?>
