 - Analizziamo alcuni attacchi su CAN che  non richiedono informazioni sul target
	 - Buss off, già discusso in una precedente sezione
	 - DoS
	 - Fuzzing
	 - Replay/spoofing
	 - injection di frame malformati
- Eccone di seguito alcuni che necessitano di informazioni aggiuntive sul target
	- Attacco ai sottosistemi si sicurezza facendo injection di specifici CAN frames
		- park assist
		- adaptive cruise control
	- Attacco alle ECUs abusando dei sistemi di diagnostica
## DoS
- Attacco che mantiene il CAN bus occupato semplicemente con l'inoltro di tutti i bit dominanti
- Come conseguenza ho che non riesco ad accendere le luci e a far partire il motore
- La macchina attaccata è inusabile
## Fuzzing
- Injection di tanti frames con ID e dati random sul CAN bus
- Tecnica nata per individuare bug e collaudare i software ma può essere usato da un attaccante per trovare features non documentate e sfruttarle
	- Le meno documentate sono le meno protette
## ECU spoofing and replay
- L'attacco consiste nel fingersi una determinata ECU (ECM - Engine control module) e richiedere richiedendo 500rpm 
## Advanced attacks: blocco di messaggi legittimi
- Il blocco di messaggi legittimi è fondamentale per la costruzione di un attacco completo  dato che i vari frame malevoli  iniettati sono intervallati da messaggi legittimi, il che potrebbe rendere inefficace l'attacco
- Quello che si vorrebbe fare è disabilitare le ECU che vogliamo impersonificare durante l'attacco
- Come può una ECU essere disabilitata?
	- Bus off
	- Usando il sistema di diagnostica per effettuare un firmware upgrade inviando solo metà dell'immagine per poi stoppare l'aggiornamento
		- Molte ECU non hanno una partizione di fallback quindi non riescono a fare il boot --> non si avviano e non generano traffico
## Attack to the Adaptive Cruise Control (ACC)
- **Safety relevant attack**: Inject dello stesso messaggio che viene solitamente usato per l'aumento della velocità mentre l'ACC è attivo
- Conseguenza: aumento della velocità del veicolo
## ECU Target
- Differenti sono le ECU appetibili dagli attaccanti, tra le più importanti abbiamo
	- ECM: controls the engine
	- BCM: Controlla tantissime features, la maggior parte senza un diretto impatto sulla sicurezza
	- EBCM: controlla i freni
	- TCU: Controlla le comunicazioni esterne connesse al CAN bus
- Per ogni ECUs è possibile fare delle analisi
	- analizzando i messaggi che vengono prodotti 
	-  vedendo come reagisce una ECU accettando messaggi provenienti da altre ECU
	- usando il fuzzing
	- cercando di stabilire una sessione diagnostica leggendo e scrivendo la memoria di una ECU
### Sniffing e probing
- osservando il traffico possiamo determinare come le ECU comunicano tra di loro, vedere quali pacchetti sono inviati ai diversi componenti
- Facendo combinazione di reply e probing è possibile capire come controllare
	- Radio
	- dashboard BCM ect
- Questo approccio funziona bene per i pacchetti che vengono scambiati durante le operazioni "normali", è meno utile per mappare le interfacce dei componenti safety critical
### Fuzzing
- Un altro attacco che non necessita di capacità di Reverse enginieering dei singoli componenti
- Il range di pacchetti CAN validi sono molto piccoli
- Con il fuzzing è possibile anche sfruttare il protocollo diagnostico UDS per inviare dati parzialmente o completamente casuali con l'obiettivo di scoprire comportamenti imprevisti o vulnerabilità all'interno delle ECU
- Il fuzzing può essere applicato al servizio di **DeviceControl** che consente di testare o manipolare le componenti/funzionalità di una ECU
	- DeviceControl riceve in input
		- identificatore **CPID**: specifica il gruppo di controllo da forzare
		- 5 bytes che specificano quali controlli devono essere sovrascritti e come
	- L'attacco on questo caso consiste nell'enumerare tutti i CPID supportati da una ECU e successivamente mandare dati casuali/semi casuali  come argomento di questi comandi
		- L'attaccante osserva la risposta per determinare quali combinazioni provocano un effetto osservabile
- Il fuzzing è un ottima tecnica perchè non richiede di una conoscenza specifica ma consiste nell'enumerare messaggi diagnostici
### Reverse enginieering
- Tecnica più avanzata , richiede competenze a basso livello. 
- Usando UDS è possibile scaricare il contenuto della memoria di una ECU, aprirlo e analizzarne il codice macchina
- Questa tipologia di analisi consente non sono di comprendere come viene gestita una certa funzionalità ma anche di modificarle inserendo del codice arbitrario
	- backdoor
	- etc
- In poche parole possiamo prendere il controlla della ECU anche per usarla successivamente come vettore di attacco verso altre parti del veicolo
- Questa descrizione è quella che più si avvicina ad un **attacco persistente su CAN bus**
### Strategie di attacco 
- Injection di  normali pacchetti CAN
	- L'utilizzo di pacchetti normali permettono di modificare la lettura del tachimetro, non è banale sfruttarli per mandare a segno l'attacco
- abuso della sessione di diagnostica
- modifiche al firmware attraverso CAN bus
### Counters e checksums
- Counters servono a prevenire i semplici replay attack
	- Se provo a rispondere con un vecchio messaggio questo semplicemente viene ignorato perchè contiene un counter vecchio
	- Una limitazione è che un contatore molto piccolo può essere bruteforceato comportando il rifiuto del messaggio originale dato che conterrà un counter uguale a quello del replay attack
- Checksums serve a rilevare errori di trasmissione random
	- non c'è crittografia e non è pensato per rilevare attacchi intenzionali
	- conoscendo l'algoritmo per il calcolo del checksum un attaccante potrebbe semplicemente ricalcolarlo per il suo messaggio modificato eludendo il controllo
### Abuso della sessione di diagnostica
- Quello che possiamo fare abusando di questa modalità è
	- spegnere il motore
	- frenare
	- disabilitare i freni
	- controllare le luci etc..
- Sono tutte operazioni che sono legittime se fatte in officina o nei collaudi, ma possono essere usate come armi se non protette da autenticazione robusta
	- Nella pratica queste sessioni sono protette in maniera superficiale 
- Come baypassare un autenticazione anche ben fatta? Comprare il software proprietario per la diagnosi della vettura e fare reverse eng. per capire come avviene l'autenticazione
- In sessione diagnostica si può anche autorizzare le modifica al firmware perchè permette di scrivere nella memoria della centralina.
	- Strategia d'attacco
		- Leggere l'intera memoria per avere l'immagine del firmware
		- debbuggarlo e decompilarlo
		- reverse the firmware
		- modifica il firmware in base alle esigenze
		- scrivi le modifiche in memoria