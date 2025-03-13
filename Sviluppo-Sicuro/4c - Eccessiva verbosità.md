## Scenario
- L'output è tutto ciò che un asset emette in uscita tramite
	- dispositivo output
	- file
	- stream
	- memoria centrale
- La motivazione per cui si produce un output è 
	- stampa risultati di una computazione
	- stampa di errori 
	- debug di una computazione
- L'output è prodotto tramite
	- stampa a mano (printf e simili)
	- librerie di logging
	- tramite messaggi dell'ambiente operativo
- Questi strumenti possono essere utilizzati da 
	- programmatore
	- linguaggio di programmazione a tempo di esecuzione
- Se una eccezione non viene opportunamente gestita esplicitamente è l'ambiente operativo ad occuparsene tramite una gestione di default che stampa la stack trace dell'esecuzione
## Configurazione livello errori
- Prendiamo in considerazione il linguaggio php che ha un meccanismo interno per la suddivisione degli errori di diversi livelli
	- E_ERROR
	- E_WARNING
	- E_PARSE
	- E_NOTICE
	- E_ALL
- A ciascun livello è associato uno specifico bit, per abilitarli bisogna lavorare con la direttiva **error_reporting** nel file php.ini
- Per abilitare la stampa degli errori si lavora con la direttiva **display_errors** del file di configurazione php.ini in cui specificare su quale canale stampare gli errori abilitati in error_reporting
	- On --> STDOUT
	- off --> gli errori non sono stampati
	- stderr --> gli errori sono stampati su STDERR
- La direttiva **error_log** consente di specificare il dispositivo per il logging
	- FILE --> si usa file FILE
	- syslog --> si usa il servizio di logging syslog
	- stderr --> si usa lo stream STDERR
	- nulla --> si usa lo stream STDERR
- Con **log_errors** del file di configurazione si decide se loggare o no gli errori
### Personalizzazione gestione degli errori
- È possibile personalizzare la gestione degli errori anche a livello di codice aggirando la configurazione globale
	- **error_reporting()**: consente di definire gli errori generabili di PHP per uno specifico script
		- error_reporting(E_ALL)
	- **ini_set()**: consente di ridefinire una specifica configurazione di php
		- ini_set("display_errors", 1)
## Eccessiva Verbosità
- Il programmatore inserisce una serie di messaggi manuali di debugging contenenti informazioni succose.
	- percorsi di file, username, informazioni sul sistema etc...
- Quello che può capitare è che il programmatore prenda un input non controllato e lo stampi in output
	- **riflessione dell'input (input reflaction)**
- L'output può rivelare in maniera subdola proprietà su sistema, l'attaccante può guadagnare ulteriori conoscenze sul sistema
### Sfruttamento della debolezza
- L'attaccante setaccia l'applicazione alla ricerca di tutti i possibili canali di output
- La manipolazione dell'input comporta la modifica anche radicale dell'output visto dalla vittima
### Conseguenze dell'attacco
- L'attaccante può ottenere informazioni sensibili che consentono di 
	- perfezionare l'attacco
	- proseguire l'attacco su nuove vie
- Esempio informazioni sensibili
	- credenziali
	- percorsi
	- configurazioni di sistema
	- documenti aziendali
#### Esecuzione lato client
- In ambito WEB è possibile inoculare codice javascript arbitrario e malizioso che può mettere in serio imbarazzo la vittima
	- Defacement sito web
	- form credibili
	- Furto di cookie con conseguente impersonificazione
	- etc..
### Esempi concreti
#### Nebula level02
```c
	#include <stdlib.h>
	#include <unistd.h>
	#include <string.h>
	#include <sys/types.h>
	#include <stdio.h>
	
	int main(int argc, char **argv, char **envp)
	{
	  char *buffer;
	
	  gid_t gid;
	  uid_t uid;
	
	  gid = getegid();
	  uid = geteuid();
	
	  setresgid(gid, gid, gid);
	  setresuid(uid, uid, uid);
	
	  buffer = NULL;
	// Ci si concentri su queste righe
	  asprintf(&buffer, "/bin/echo %s is cool", getenv("USER"));
	  printf("about to call system(\"%s\")\n", buffer);
	  
	  system(buffer);
	}
```
- **asprintf**: costruisco una stringa contenente un comando UNIX
- **printf**: stampo il comando che andrò ad eseguire
- **system**: eseguo il comando che ho costruito
- Qui il problema è che l'attaccante è in grado di vedere in anteprima qual'è il comando che verrà eseguito
#### Protostar stack01
```C
	#include <stdlib.h>
	#include <unistd.h>
	#include <stdio.h>
	#include <string.h>
	
	int main(int argc, char **argv)
	{
	  volatile int modified;
	  char buffer[64];
	
	  if(argc == 1) {
	      errx(1, "please specify an argument\n");
	  }
	
	  modified = 0;
	  strcpy(buffer, argv[1]);
	// ci si concentri su queste righe
	  if(modified == 0x61626364) {
	      printf("you have correctly got the variable to the right value\n");
	  } else {
	      printf("Try again, you got 0x%08x\n", modified);
	  }
	}

```
- a seconda del valore nella variabile modified viene stampato o meno un messaggio
- L'output verboso fa si che sia un oracolo vero e proprio, se non riusciamo a modificare correttamente la variabile allora sappiamo cosa stampa
- Possiamo abusare dell'oracolo per capire se abbiamo modificato correttamente la variabile
#### Protostar stack03
```C
	#include <stdlib.h>
	#include <unistd.h>
	#include <stdio.h>
	#include <string.h>
	
	void win()
	{
	  printf("code flow successfully changed\n");
	}
	
	int main(int argc, char **argv)
	{
	  volatile int (*fp)();
	  char buffer[64];
	
	  fp = 0;
	
	  gets(buffer);
	
	  if(fp) {
	      printf("calling function pointer, jumping to 0x%08x\n", fp);
	      fp();
	  }
	}
```
- Anche in questo viene stampato artificialmente il contenuto del puntatore a funzione
- Valgono le stesse considerazioni fatte per l'esempio precedente
- In questo caso si parla di **trafugamento dell'indirizzo** (address leak)
#### Web for pentester XSS 1
- Si visualizzi il codice sorgente, il punto è come si fa? Usando lo spirito hacker vedendo questo url 'http://192.168.122.99/xss/example1.php?name=hacker' ho ben pensato di togliere il parametro name e quello che ho ottenuto è un errore troppo verboso che mi indicava che la pagina php si trovava nella cartella /var/www/xss
- Quello che viene fatto nello script è di andare a stampare il parametro name che viene passato come GET.
- **riflessione dell'input**
#### WFP - File include 1
- SI consulti il codice sorgente 
```php
	<?php
		if ($_GET[“page”]) {
			include($_GET[“page”]);
		}
	?>
```
- Se il parametro "page" è definito allora viene incluso lo script puntato da page
- Quello che scopriamo andando nella configurazione globale /etc/php5/apache2/php.ini è che
	- error_reporting = E_ALL & ~E_DEPRECATED
	- display_errors = on
- Sono abilitati tutti gli errori tranne quelli deprecati e sono stampati su STDOUT (insieme al codice HTML
#### WFP - SQL 1
- Si consulti il codice sorgente
```php
<?php 
	$sql = "SELECT * FROM users where name='";
	$sql .= $_GET["name"]."'";
	$result = mysql_query($sql);
	if ($result) {
?>
<table class='table table-striped'>
	<tr><th>id</th><th>name</th><th>age</th></tr>
	<?php
		while ($row = mysql_fetch_assoc($result)) {
			echo "<tr>";
			echo "<td>".$row['id']."</td>";
			echo "<td>".$row['name']."</td>";
			echo "<td>".$row['age']."</td>";
			echo "</tr>";
		}
		echo "</table>";
	} 
	?
```
- Viene costruita una stringa che rappresenta uno statement sql
- Lo statement viene inviato ad un DBMS MySql per l'esecuizione
- Se c'è un risultato allora si produce una tabella HTML altrimenti no
- Se proviamo ad inserire un input malizioso come root' (il singolo apice mi permette di chiudere la query prima) allora quello che otteniamo è che non viene stampata alcuna tabella, questo da un grossissimo vantaggio al nostro avversario.
- Inoltre il codice dovrebbe stampare una sola riga della tabella e non tutti i risultati (la query non malevola è fatta per ottenere una singola entry).
	- Aggiungiamo ' OR 1=1 %23 (condizione sempre vera indipendentemente da quello che c'è a destra)
	- Abbiamo recuperato tutte le righe della tabella
