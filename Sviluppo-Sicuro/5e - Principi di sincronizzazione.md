> Tutto ciò che è condiviso va acceduto in mutua esclusione
- Controllo e accesso vanno gestiti **atomicamente**
## Implementazione
- Gli asset condivisi vanno protette con un accesso in mutua esclusione 
	- Mutex (passivi per attese lunghe)
	- Spinlock (attivi, adatti per attesi brevi)
- Asset cooperanti vanno sincronizzati ad eventi
	- Coppie di semafori
	- Variabili condizione
- Mai mischiare funzioni come 
	- access
	- open
- usano privilegi differenti, specialmente in un contesto con binari **SETUID**
- Mai allontanare i frammenti di codice che controllano e accedono ad un asset
- Mai rendere una soluzione dipendente dal tempo
## Esempi concreti
### Nebula - Level10
- Il binario in questione controlla e accede al file con funzioni che usano privilegi differenti
	- Controllo -> privilegi reali con **access**
	- accesso -> privilegi effettivi **open**
- Questo consente all'attaccante di ipotizzare un  attacco di tipo "scambio di link simbolico" che prima o poi evade i controlli access open.
- Questa debolezza non basta per rendere il binario vulnerabile
	- Il binario è **SETUID**
- Infine i frammenti di codice che controllano e accedono al file sono distanti temporalmente 
	- Ciò consente all'attaccante di avere una finestra temporale ampia in cui agire
#### Strategie di mitigazione
-  Bisogna invalidare le debolezze sopra viste
	- Evitare esecuzione privilegiata
	- evitare l'uso di link simbolici
	- avvicinare quanto possibile controllo e apertura del file
- Mitigazione 1
	- La prima mitigazione consiste nell'andare ad abbassare i privilegi a quelli dell'utente reale che esegue il binario
		- L'uso combinato di access e open è reso inoffensivo in questo modo
- Mitigazione 2
	- Una seconda mitigazione consiste nel vietare l'uso dei link simbolici
	- Per farlo si utilizza la chiamata di sistema **lstat**
		- Legge i metadati di un file in una struttura di tipo "struct stat"
		- **ATTENZIONE**: stat() legge i metadati del file puntato dal link mentre lstat legge i metadati del link simbolico (per questo utilizziamo lstat)
```c
if (S_ISLNK(s.st_mode)) {
	printf("No symbolic links allowed.");
	exit(EXIT_FAILURE);
}
```
- Con questo controllo verifico se il file è un link simbolico
- Mitigazione 3
	- La terza mitigazione consiste nel ridurre la distanza tra i due frammenti di codice che controllano e accedono all'asset
	- Questa modifica fa eseguire controllo, apertura e lettura del file sequenzialmente
	- Questa mitigazione di per se non risolve il problema e ma rende più raro l'evento scatenante