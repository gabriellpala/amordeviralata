<?php
session_start();
if(isset($_POST['submit'])){
    // Verificação de login aqui
    if(/* Condição de login bem-sucedido */){
        $_SESSION['admin'] = true;
        header('Location: dashboard.php');
        exit;
    } else {
        $error = "Login inválido!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>
    <form action="" method="post">
        <input type="text" name="username" placeholder="Usuário" required><br><br>
        <input type="password" name="password" placeholder="Senha" required><br><br>
        <input type="submit" name="submit" value="Login">
    </form>
</body>
</html>