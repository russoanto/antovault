## Cose che gli ECU devono conoscere
- Lista di ID rilevanti
	- Che id devo inviare?
	- Che id devo ricevere?
- Per ogni ID
	- Quanti segnali ci sono?
	- Dove ogni segnale inizia e finisce?
- Per ogni segnale
	- Come dovrei interpretarlo?
	- Encoding? Unità di misura?
	- Cycle time?
	- Event based?
### Databse for CAN (DBC)
- Tutte queste informazioni sono scritte nel DBC file. Tipicamente distribuito con la ECU oppure con il veicolo/sottositema
- DBC sono dati proprietari, difficili da trovare ufficialmente nel pubblico dominio
- Facile trovare DBC non ufficiali generati dagli utenti attraverso reverse engeneering
- Anche il formato DBC è proprietario
- **Elementi di un file DBC**
	- Vector candb++
		- software proprietario, standard de-facto nel mondo automotive industriale
	- Comma.ai cabana
		- open project, reverse eng
	- SockerCAN
		- progetto open source
		- implementazione dei driver CAN come dispositivo di rete incluso nella maggior parte delle distribuzioni linux
### CAN software tradizionale
- Applicazione che interagisce con un device( come la porta seriale)
- Il suddetto device interagisce con i driver hw
	- è permesso ad un solo processo di accedere al device ad un dato tempo
- Tutto è custom.
- Socker CAN può interagire con i driver di rete già esistenti
	- Le applicazioni possono interagire con le interfacce del CAN bus come interagiscono con delle classiche interfacce di rete
## UDS
- Standard protocol per diagnosi
```
7df#02010d
```
- Per utilizzarlo basta mandare un frame con id **7df**
	- Questi frame vengono ignorati dai ECU
- 02 indica la dimensione del codice di diagnosi
- 01 -> è il primo byte che indica il servizio
- 0d -> il secondo byte indica il parameter ID