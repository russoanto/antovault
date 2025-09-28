- Anche le ECU devono essere sicure, non solo le reti di comunicazioni
- **Hardening**
	- processo di rendere il sistema meno vulnerabile ad attacchi
	- Ci sono 2 step principali
		- Minimizzare la superficie d'attacco
			- chiudendo i servizi non necessari
			- proteggere le varie interfacce con autenticazione
		- principio del minimo privilegio
	- Questo in ICT viene svolto con delle checklist
	- Gli stessi principi usati nell'ICT possono essere riproposti anche nel mondo automotive, senza alcuni standard ma con delle buone best practies
		- disabilito la debug programming nell'ultimo stage di produzione
- **Isolation**
	- mitigare l'attacco di una specifica applicazione software/componente
	- questo può essere raggiunto tramite sia HW che SW
		- ARM TrustZone
		- virtualizzazione
			- consolido più funzioni su un unica ECU fisica garantendo la separazione logica
			- Questa architettura di consolidamento, dove si passa da molte ECU dedicate (una a singola funzione) a poche ECU potenti che ne ospitano molte virtualizzate è una tendenza crescente
				- ragioni economiche
			- Questa scelta amplifica le implicazioni di sicurezza
				- un errore di isolamento può far si che un attacco ad un componente non critico comprometta funzioni vitali
				- **freedom from interference**
			- Questo concetto di sicurezza è richiesto dagli standard funzionali come **ISO 26262**
				- condizione fondamentale per ottenere la certificazione di sicurezza nei veicoli a guida assistita o autonoma
			- Per garantire questa separazione si utilizzano framework avanzati per la gestione multicore --> posso allocare staticamente CPU, RAM periferiche e bus a ciascun dominio
- **Aggiornamento Software**
	- necessità costante che è anche un potenziale vettore d'attacco
	- in ambiente ICT l'aggiornamento sicuro è uno standard consolidato mentre non lo è nel mondo automotive
	- Le ECU hanno risorse limitate
		- non è banale implementare un autenticazione e controllo integrità sigli aggiornamenti
		- non hanno continuo accesso alla rete
		- memoria limitata
	- Nel mondo embedded ci sono 5 problemi
		- **resilienza ai guasti** è limitata, l'errore in questa fase può portare a dispositivi briccati
		- **gestione delle autorizzazioni**: chi ha davvero il diritto di scrivere o installare un firmware? officina? fornitore ? L'OEM?
		- **privacy dell'aggiornamento** firmware contenente un IP sensibile non dovrebbe essere visibile a entità non autorizzate
		- **monitoraggio dello stato**: l'OEM spesso non ha visibilità su quale versione del firmware è attiva su quale dispositivo
		- **selezione dei dispositivi da aggiornare**, richiede targeting preciso per evitare errori e rollout mal gestiti
	- **Flusso ideale**
		- un dispositivo riceve un immagine firmware firmata da una fonte fidata, ls installa, effettua il boot con essa e il sistema funziona correttamente.
	- **Nella pratica**
		- perdo la connessione
		- corrente salta
		- il firmware ricevuto può essere corrotto, sbagliato o provenire da fonti malevole
		- errori di scrittura su memoria flash
	- Bisogna introdurre il concetto a **resilienza degli aggiornamenti**
	- **Resilienza agli aggiornamenti**
		- si costruisce con due elementi chiave 
			- **bootloader**
				- frammento di codice fidato che non deve mai essere aggiornabile il cui compito è
					- verificare la validità dell'immagine firmware prima dell'esecuzione
					- permette il boot da un immagine di riserva
					- evita lo stato di brick
				- idealmente un dispositivo dovrebbe mantenere due immagini bootabili una attiva e una di backup
				- il bootloader funge da **root of trust**
					- la fase di verifica di integrità e autenticità è nel bootloader
				- I bootloader possono essere
					- statici
						- semplici, stabili ma meno affidabili
						- non possono essere aggiornati
						- le applicazione contiene il client di update
							- scarica la nuova immagine
							- la valida 
							- riavvia
							- il bootloader sceglie quale immagine avviare
				
					- connessi in rete
						- più complessi ma anche più vulnerabili
						- possiede dei driver di rete
						- Il bootloader di connette ad un update server, scarica l'aggiornamento, autentica l'update, lo installa e consegna la nuova immagine
						- diventa costoso certificare un bootloader connesso molto complesso
					- Dove viene immagazzinato il software aggiornato?
						- on chip --> sulla memoria principale della flsh memory
						- off chip --> memoria esterna, più economica, posso immagazzinare più immagini
					- In molti progetti si cerca di unire i due
						- two stage bootload
							- il primo stadio è statico , minimale con un solo compito validare l'immagine
							- il secondo stadio, avviato solo se necessario, è ricco di funzionalità (connessione, crittografia, fallback) e può essere aggiornato
						- tipica struttura di chi supporta aggiornamenti OTA
			- **Firmware update - Authority**
				- se ho un server fidato, posso accedervi tramite TLS, in questo modo sto autenticando la sorgente e non il software
					- mi fido del server, ha una PKI di cui mi fido
					- posso avere del software malevolo all'interno di una sorgente fidata
					- un server centralizzato crea un centralized point of failure
				- tramite firma
					- il dispositivo si fida dell'autore direttamente
					- per ogni aggiornamento devo performare operazioni con chiave pubblica
			- **Firmware update - Privacy**
				- per non esporre informazioni sensibili i firmware devono essere cifrati
				- **Transport security**
					- il firmware può essere inviato tramite TLS
						- l'autore upload del firmware su un server
						- il server negozia una chiave di sessione per ogni dispositivo
						- il server invia il payload su un canale unico cifrato ad ogni dispositivo
					- Il server di update deve essere gestito da una parte fidato
						- Il dispositivo si deve fidare delle credenziali del server di aggiornamento
				- **pre device encryption**
					- l'autore cifra il firmware per ogni dispositivo
						- questo viene caricato su un server di distribuzione
						- ogni dispositivo scarica il proprio firmware e lo decifra
					- l'autore conosce la chiave di cifratura dei dispositivi
					- non c'è nessun servizio di terze parti che interferisce
					- non c'è una fase di negoziazione delle chiavi
					- problemi
						- gestione complessa
						- non scala
				- **single image encryption**
					- un singolo file cifrato viene distribuito
					- L'immagine ha bisogno di essere immagazzinata e distribuita solo una volta
						- non c'è esposizione a terze parti
						- un solo salvataggio
			- **Firmware Update - monitoring**
				- i dispositivi devono reportare 
					- la loro versione del firmware
					- ultimo update
					- progresso del download corrente
					- tipo di payload accettati
					- la versione dei metadati accettati
				- Gli errori che non possono essere risolti localmente devono essere comunicati ad un operatore
				- Le decisioni sono fatte in base ai report monitoring
			- **Firmware Update - targeting**
				- solo i dispositivi corretti devono ricevere il firmware update
				- Gli operatori possono selezionare un gruppo di dispositivi sulla base di vari parametri
					- VIN --> identificativo del veicolo
				- Locazione geografica, current firmware version 
				- Non possono essere selezionati target offline
## Uptane
### **Minacce agli aggiornamenti ECU**

Vengono descritti diversi tipi di attacchi che possono compromettere l'integrità degli aggiornamenti software:

- **Attacco arbitrario al software**: installazione di software malevolo.
    
- **Freeze attack**: l'ECU non riceve aggiornamenti e rimane bloccata su una versione obsoleta.
    
- **Rollback attack**: viene installata una versione vecchia e vulnerabile.
    
- **Slow retrieval attack**: aggiornamenti ritardati volontariamente.
    
- **Mix and Match / Partial Bundle / Partial Freeze**: inconsistenza tra aggiornamenti su diverse ECU.
    

---

###  **Problemi delle soluzioni tradizionali**

Le tecniche convenzionali presentano diverse vulnerabilità:

1. **TLS/SSL**: proteggono la comunicazione ma sono soggetti a compromissioni se una sola CA (Certificate Authority) è violata.
    
2. **Firma singola del pacchetto**: se la chiave privata è compromessa, si può diffondere codice malevolo a tutti i dispositivi.
    

---

###  **Requisiti per aggiornamenti sicuri**

Un sistema sicuro deve:

- Sopravvivere alla compromissione dei server o delle chiavi.
    
- Supportare la revoca delle chiavi compromesse.
    
- Garantire la freschezza degli aggiornamenti.
    
- Prevenire attacchi di rollback, mix and match, e freeze.
    
- Evitare punti di fallimento singoli.
    

---

### **The Update Framework (TUF)**

È un framework di sicurezza per gli aggiornamenti software, progettato per essere resistente a compromissioni:

- **Responsabilità distribuite**: separazione tra i ruoli (root, timestamp, snapshot, targets).
    
- **Controlli di consistenza e autenticità** su ogni parte del sistema.
    
- Presume che compromissioni accadranno e minimizza i danni.
    

---

###  **Uptane: Estensione per veicoli**

Uptane è una versione adattata di TUF per l'ambiente automobilistico, con:

- **Clienti primari e secondari**: il primario gestisce la comunicazione con l'esterno, i secondari controllano le singole ECU.
    
- **Time server**: previene attacchi di freeze e rollback con firme temporali.
    
- **Due repository**:
    
    - **Image repository**: contiene immagini firmate del firmware.
        
    - **Director repository**: assegna le immagini alle ECU specifiche, può crittografare i file.
        
- **Verifica completa e parziale**: a seconda delle risorse e delle capacità delle ECU.
    

---

### **Flusso dell’aggiornamento Uptane**

1. Il **Primario** raccoglie le versioni dalle ECU secondarie.
    
2. Invia le informazioni al **Director**, che risponde con i metadati aggiornati.
    
3. Contatta il **Time Server** per ottenere un tempo firmato.
    
4. Scarica gli aggiornamenti dai repository.
    
5. Distribuisce tempo, metadati e immagini ai secondari.
    
6. Ogni secondario verifica il tempo, i metadati e la validità delle immagini prima di aggiornare.
    

---

###  **Verifiche**

- **Verifica completa**: controlla tutto il metadato da entrambi i repository.
    
- **Verifica parziale**: controlli basilari, ma con meno garanzie, utile per ECU con risorse limitate.
    

---

###  **Stato e diffusione di Uptane**

- Uptane è **open-source**, standardizzato da IEEE/ISTO.
    
- È adottato da numerosi **OEM e fornitori** automobilistici (es. Automotive Grade Linux).
    
- Supportato da **audit di sicurezza indipendenti** (Cure53, NCC Group).
    
- Circa il **12-35% dei veicoli negli USA** lo implementano.
    

---

###  **Conclusione**

Uptane offre una soluzione moderna, modulare e sicura per gli aggiornamenti over-the-air (SOTA) nelle auto, affrontando le minacce sofisticate, incluso il rischio di attacchi da parte di attori statali.