- Come suggerimento ci e' stato dato di controllare come parse_url e curl_exec validano gli url
- Prima cosa che ho fatto e' di avviare un docker con la versione di php 7.1.4
	- Versione che gira sul server
- Analisi del codice php
```php
if(isset($_GET['url']) && !is_array($_GET['url'])){
	$url = $_GET['url'];       if (filter_var($url, FILTER_VALIDATE_URL) === FALSE) {           die('Not a valid URL');       }    $parsed = parse_url($url);    $host = $parsed['host'];       if (!in_array($parsed['scheme'], ['http','https'])){           die('Not a valid URL');       
	}    
	$true_ip = gethostbyname($host);       if(cidr_match($true_ip, '127.0.0.1/8') || cidr_match($true_ip, '0.0.0.0/32')     {            
		die('Not a valid URL');       
	}
	/* Orange it's my new obsession       Yeah, Orange it's not even a question(mark)       Orange on the host of your gopher, cause       Orange is the bug you discovah       
	Orange as the ping on your server       
	Orange cause you are so very       
	Orange it's the color of parsers       
	A-cause curl it just goes with the setopt       */    
	
	$ch = curl_init($url);    
	curl_setopt ($ch, CURLOPT_FOLLOWLOCATION, 0);    
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);       
	echo curl_exec($ch);    
	curl_close($ch);
```
- Quello che notiamo e' che abbiamo diversi livelli di controlli
	- filter_var con parametro FILTER_VALIDATE_URL
	- parse_url: sconpone l'url in un array in cui va ad individuare
		- schema
		- host
		- query
		- etcc
	- Controlla che l'host estratto, dopo una risoluzione DNS fatta con **gethostbyname** non rientri ne in 127.0.0.1 ne in 0.0.0.0
	- Solo dopo effettua curl
		- Curl non fa redirect, quindi non si puo' usare il trucchetto di ngrok
- Bisogna quindi far in modo di dare in pasto al server un url tale per cui
	- Sia valido per la funzione filter_var
	- Che come host estratto da parse_url abbia qualcosa diverso da localhost cosi' da superare i controlli di gethostbyname
	- Che pero' se dato in pasto a curl faccia una richiesta a localhost
- Tutto troppo complicato, ho provato la qualunque, anche i vari pattern presenti su ![[https://github.com/swisskyrepo/PayloadsAllTheThings]]
- Inizialmente pensavo che la chiave fossero i punti interrogativi dato che nella filastrocca recitava "Orange it's not even a question(mark)"
- Fino a quando dopo ore di interminabili ricerche mi sono imbattuto in un pdf sulle SSRF di un certo "Orange Tsai" ![[https://www.blackhat.com/docs/us-17/thursday/us-17-Tsai-A-New-Era-Of-SSRF-Exploiting-URL-Parser-In-Trending-Programming-Languages.pdf]]
	- ORANG TSAI --> nella poesia ci sono un bel po di riferimenti a questo orang
	- Leggiamoci 90 slide di pdf
	- C'e' una sezione che riguarda proprio la mia situazione
- L'url piu' interessante sembra essere questo 
	- http://127.0.0.1:11211#@google.com:80/
	- Che riadattato al mio caso continua a non funzionare
		- http://127.0.0.1:11211#@google.com:80/get_flag.php
	- Facendo un po di modifiche raggiungo questa soluzione
		- http://foo@127.0.0.1:80@google.com/get_flag.php
- SBAMMM --> nice, here is your flag CCIT{c62e11538a15b4ab1c5fbb4e5b8fbd94}
- 