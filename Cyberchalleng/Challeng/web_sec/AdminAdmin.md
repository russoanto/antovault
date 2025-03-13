- L'unica cosa presente nella sfida è un form di login, il cui username sappiamo essere admin e la password è ignota.
- Il codice sorgente del sito è il seguente
```php
<?php
require_once('functions.php');

if(isset($_POST['username']) && isset($_POST['password'])){

	list($username, $password) = [$_POST['username'], $_POST['password']];
  
	if(login($username, $password)){

		$_SESSION['username'] = $username;

		header('Location: admin.php');

	}else{

		flash('Wrong username or password');

	}

}

?>
```
- Il controllo del login dipende dalla funzione login definita nel file functions
 ```php
 <?php

// Start the session

session_start();

// set some constants

define('FLAG', getenv('FLAG'));

define('ADMIN_PWD_HASH', getenv('ADMIN_PWD_HASH'));

  

function check_auth($for_user){

	return isset($_SESSION['username']) ? $_SESSION['username'] == $for_user: FALSE;

}

function login($username, $password){

	if($username == 'admin'){
	
		return password_verify($password, ADMIN_PWD_HASH);
	
	}
	
	return FALSE;
}

  

function flash($message){

	$_SESSION['flash'] = $message;

}

  
function get_flash_msg(){

	$msg = isset($_SESSION['flash'])? $_SESSION['flash']: '';
	
	$_SESSION['flash'] = '';
	
	return $msg;
}
```
- Oltre a controllare se il nome utente è "admin" verifica che l'hash della password inserita sia uguale a quella contenuta nella variabile d'ambiente **ADMIN_PWD_HASH**
	- La verifica sfrutta una funzione php verify_password
		- password_verify — Verifies that a password matches a hash
		- Non sembrano esserci controindicazioni di utilizzo
- 