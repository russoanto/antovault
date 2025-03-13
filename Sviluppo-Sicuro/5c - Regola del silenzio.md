- Un programma che parla troppo è più difficilmente integrabile con altri programmi in pipe
- Lo spazio sullo schermo è prezioso
- Troppo output non necessario confonde l’essere umano, incapace di elaborarlo simultaneamente.
- L’output eccessivamente verboso consente all’attaccante di ottenere ulteriori informazioni su un asset.
## Implementazione
- Va ridotta al minimo l'informazione extra fornita nei messaggi di debug di una applicazione
- Evitare
	- percorsi UNIX
	- nomi utente
	- file di configurazione
	- script
	- documenti aziendali
- Dividere l'applicazione in modalità
	- debug: molto verbosa 
	- produzione
		- messaggi diagnostici disabilitati
		- con i binari senza simboli di debug
## Limitare la riflessione dell'input
- La riflessione è all'origine di diversi attacchi informatici (iniezioni)
- Se proprio bisogna utilizzare l'input allora va sanitizzato preventivamente
## Rimuovere gli output rivelatori
- Ogni output rivelatore può rivelare informazioni sull'asset
	- Username valido o invalido
	- Password errata
	- Crash dell'applicazione
## Esempi concreti
### Nebula - Level02
- Il binario /home/flag02/flag02 stampa un messaggio di debug prolisso che consente all'attaccante di visualizzare il comando risultante dopo una iniezione
- Mitigazione 1:
	- Eliminare integralmente il messaggio
		- Questa modifica rimuove la stampa del messaggio di debug e impedisce all'attaccante di capire il risultato dell'iniezione
### WFP - File include 1
- Il web server Apache2 espone un ambiente PHP nella modalità "debug"
- L'output HTML è mischiato all'output diagnostico esponendo
	- Percorsi UNIX
	- Username
	- Nomi di script
- Mitigazione 1:
	- cambio configurazione
### WFP - SQL injections
- L'applicazione esibisce un output rivelatore che consente di riconoscere gli stati seguenti
	- Crash -> assenza della tabella HTML
	- output -> presenza della sola intestazione della tabella nullo
	- Output -> presenza di intestazione e corpo della tabella non nullo
- L’applicazione stampa tutte le righe del set dei risultati, indipendentemente dal fatto che, in questo caso, abbia senso ritornarne solo uno (quello corretto).
	- L’iniezione di una tautologia stampa l’intero set dei risultati, consentendo ad un attaccante di enumerare l’intera tabella
- MItigazione 1
	- Indipendentemente se ho un crash o una query nulla io stampo lo stesso output
```html
<table class='table table-striped'>
<tr><th>id</th><th>name</th><th>age</th></tr>
```
- Aggiungo l'intestazione della tabella a prescindere
- Successivamente prima di iterare tra i risultati vedo se ce ne sono aggiungendo un if
```php
if ($result) {
	while ($row = mysql_fetch_assoc($result)) {
		echo "<tr>";
		echo "<td>".$row['id']."</td>";
		echo "<td>".$row['name']."</td>";
		echo "<td>".$row['age']."</td>";
		echo "</tr>";
	}
}
```
- Per perfezionare ciò elimino anche il while
- non ha senso iterare per tutti i risultati, l'applicazione deve stampare solo un utente
```php
if ($result) {
	$row = mysql_fetch_assoc($result)
	echo "<tr>";
	echo "<td>".$row['id']."</td>";
	echo "<td>".$row['name']."</td>";
	echo "<td>".$row['age']."</td>";
	echo "</tr>";
}
```
