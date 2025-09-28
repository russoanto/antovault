- Stiamo parlando di un problema di ricerca, ad oggi nessun tipo di crittografia è applicata ai messaggi CAN
- Non esiste nessuna soluzione condivisa tra OEM  e tantomeno esiste un protocollo aperto e riconosciuto
	- security through obscurity
- Sicurezza delle comunicazioni mediante crittografia applicata
	- 2 approcci
		- **Secure circuit**
			- creare un canale virtuale sicuro su una rete insicura (quello che avviene con HTTPS, VPN etc.) 
		- **Secure envelop**
			- cifrare il messaggio e inviarlo crittografato
	- In entrambi i casi possiamo usare crittografia simmetrica
	- Nei veicoli il primo approccio non è realistico
		- Le reti CAN non supportano sessione tra nodi
		- ne supportano endpoint identificabili e persistenti
	- L'approccio più applicabile è quello del secure envelop
		- ogni messaggio si deve portare dietro il meccanismo di autenticazione
			- importante
		- (opzionale) anche la confidenzialità
			- non realmente importante
		- integrità
			- rilevante
		- non ripudio
	- Su CAN l'obbiettivo principale non è proteggere i contenuti ma autenticare le informazioni
## Secure envelope - versione 1
- proposta di protocollo
- tutte le ECU sono connesse allo stesso segmento CAN e conoscono la stessa PSK
- Gli obbiettivi sono quelli elencati precedentemente
	- L'integrità e l'autenticazione della sorgente avviene con MAC
	- non siamo capaci di soddisfare il non ripudio
- Ogni messaggio è firmato con MAC, quindi ogni ECU verificano che il tag ricevuto sia corretto
- Il gateway fa da intermediario quando ci sono più segmenti di rete condivisi
	- è lui che mantiene le PSK dei vari segmenti
- Problemi
	- un limite è la dimensione dell'HMAC
		- dipende dalla funzione hash utilizzata 
		- sappiamo che il payload del CAN è massiomo 8 bytes
		- si usano HMAC troncati (riduzione di sicurezza)
	- Vulnerabile a replay attack
		- mi basta registrare un messaggio valido e reinviarlo
		- per evitarlo ho bisogno di contatori
			-  significa altro spazio occupato
			- posso mettere il contatore in frame separato ma genererei il doppio del traffico, aumento la possibilità di errori
		- Dove memorizzo le PSK?
			- in memoria flash è facilmente leggibile
			- TPM o HSM
				- soluzione ottimale ma costosa
			- quando si rompe una ECU il produttore deve inizializzare HSM o TPM con la chiave corretta
				- troppo overhead
## Secure envelop - versione 2
- approccio con crittografia asimmetrica
- ogni ECU ha una propria coppia di chiave pubblica e privata
- tutte si fidano della CA delle OEM
- Tutti i messaggi (o almeno quelli più importanti) vengono firmati dal mittente e verificati dal destinatario
	- Risolvo il problema del non ripudio
- Problemi
	- anche l'algoritmo di firma occupa spazio
		- algoritmo di padding
		- curve ellittiche hanno firme più piccole
		- posso troncare
	- Se rubo una coppia di chiavi posso comunicare con tutte le ECU che si fidano della stessa CA
		- Abbiamo bisogno di una storage sicuro --> costa soldi
		- Nel caso in cui una chiave privata venga rubata abbiamo bisogno di revocare il certificato
			- devono essere performati dei check periodici sui certificati validi
## Proposte inapplicabili
- protocolli accademici proposti negli anni valutandoli su 5 criteri
	- economico
	- compatibilità
	- supporto a riparazioni
	- dettaglio implementazione
	- overhead 
### CANAuth
- richiede un estensione teorica chiamata CAN+, con banda 16x rispetto al CAN attuale
- ogni messaggio ha il suo MAC e contatore
- buone proprietà teoriche ma inapplicabile dal punto di vista HW
### SchweppeAuth
- introduce HSM obbligatori per ogni ECU
- un key master per la gestione delle chiavi
- e autenticazione basato su HMAC troncati e timestamp
- È costoso, ben descritto ma non scalabile su CAN attuale
### LibraCAN
- utilizza una tecnica di splitting e mixing dei MAC su più frame, aumentando complessità e carico di rete
- Economicamente sostenibile ma richiede troppa banda per funzionare bene su CAN standard
### LinAuth
- uso di chiavi pairwise con contatori troncati per evitare replay
- manca di dettagli implementativi
- senza una specifica per la trasmissione dei MAC non è replicabile
### MaCAN
- è uno dei pochi progetti con buon compromesso
- Usa CMAC da 32 bit
- un KeyServer e un TimeServer
- Propone l'uso di chiavi condivise tra ECU fidate
- È compatibile ed economicamente valido ma l'overhead esplode con l'aumentare dei gruppi
### CaCAN
- introduce un nodo di monitoraggio centrale per il controllo dei MAC e può emettere error frame in caso di autenticazione fallita
- Utilizzo di MAC e counter troncato
- Economico ma ha un single point of failure, cade il nodo centrale e cade la sicurezza
### VeCure
- suddivide le ECU in gruppi di fiducia (low, medium e high) e introduce un meccanismo a doppio messaggio per l'autenticazione
	- Il gruppo high condivide 2 chiavi
		- una con il proprio gruppo
		- una con il gruppo a fiducia media
	- il gruppo medio condivide una sola chiave, con se stesso
- L'autenticazione è a 2 parti
	- ligth-weigth --> calcolo online
	- pesante --> calcolo offline
- I contatori sono legati alle sessioni e aumentano ad ogni avvio
- Ha un buon grado di compatibilità ma diventa pesante per reti molto grandi
### WooAuth
- i CAN message devono essere cifrati con AES-128 e autenticati con HMACs
- Mantengo un contatore per ogni mittente non registrato che mi invia un messaggio
- All'avvio ogni ECU contatta il proprio gateway per avviare lo scambio di chiavi autenticato (Protocollo 2)
- Il protocollo adatta i campi ID e CRC del CAN extended per il trasporto del codice di autenticazione
- Non costoso, non retrocompatibile, ben descritta
### VatiCAN
- autentica ogni messaggio con HMAC SHA-3 in un frame separato, utilizza contatori sincronizzati da un generatore di nonce globale.
- Robusto e retrocompatibile ma aggiunge grande overhead
### WeisglassAuth
- "crittografia leggera" 
- E2E
	- CRC + contatore di sequenza
- Se il messaggio deve essere inviato da una ECU che non supportano la crittografia inviano 2 volte il messaggio, in chiaro e cifrato
