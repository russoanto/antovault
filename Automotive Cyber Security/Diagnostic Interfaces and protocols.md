# Diagnostica
## OBD port
- parliamo dell'interfaccia di diagnosi OBD e dei vari protocolli.
- On Board Diagnostic
- Espone differenti protocolli oltre che al CAN
	- Differenti car makers hanno differenti pin layout e utilizzano protocolli proprietari
### OBD II
- I pin 6 e 14 dovrebbero essere uno **standard** per il CAN Bus per tutti i veicoli dal 2008
- Altri pin sono riservati ad altri protocolli come 
	- SAE J1850 --> più economico del CAN ma anche più lento
### OBD III
- consente al PCM (Powertrain control motor) di comunicare il suo stato renoto senza azioni del proprietario
	- Anche comunicazione di codici di errore tramite rete cellulare
		- **problemi di privacy**
## DTC (Diagnostic Trouble Code)
- Codici di errori, **standardizzati**, generati dalle ECU
- Possono essere
	- Soft
		- intermittenti e cancellabili automaticamente
	- Hard
		- permanenti
- Stringhe alfanumeriche di 5 caratteri
	- Prima lettera --> famiglia
	- Secondo carattere --> generic o custom
	- 3 hex digit --> problema nella categoria specificato sopra
- Utilizzo di 2 byte per la rappresentazione 
## UDS
- i DTC sono eliminabili dai protocolli UDS
- UDS è un protocollo diagnostico basato su CAN che permette di
	- leggere
	- scrivere
	- resettare
	- diagnosticare ECU
- **ISO-TP**: protocollo (on -top of the can) che ci permette di frammentare e ricomporre messaggi più lunghi di 8 bytes usando molteplici messaggi CAN, indispensabile per UDS
	- I messaggi UDS vengono inviati tramite CAN bus ma non direttamente
	- Con CAN Bus abbiamo la limitazione di 8 bytes  per frame
	- Per questo motivo UDS viene usato in combinazione con ISO-TP
## ISO-TP
- Definisce 4 differenti tipi di frame
	- Single frame
	- First frame
	- Consecutive frame
	- flow control frame
- Definisce 2 tipologie di indirizzamento
	- Basic addressing
	- Extended addressing
### Single Frame
- frame che viene utilizzato se il messaggio è molto corto
### First frame
- se corto non dovesse essere il nostro messaggio allora viene inviato un primo first frame (primo di una serie di frame)
- a seguito ci saranno dei **consecutive frames**
### Flow control frame
- L'ECU può controllare il ritmo e il numero di frame che possono essere trasmessi di seguito in base a 
	- buffer disponibile
	- receive buffer
	- tempo minimo di attesa
- Dopo aver ricevuto il comando completo l'ECU lo elabora e risponde, sempre tramite protocollo ISO-TP, con uno o più frame contenenti la risposta al comando UDS
## Simple UDS Comunication
- I comandi possono essere scritti direttamente in esadecimale, usando tool come **cansend** o **isotpsend**. 
```
richiesta --> cansend can0 7df#02010d // chiedo il valore del PID
risposta --> 7e8 03 41 0d 00
- 7e8 --> è l'indirizzo della ECU motore
- 03 è la lunghezza
- 41 è il codice di risposta
- 0d è il PID richiesto
- 00 è la risposta --> 0 km/h
```
- Questi strumenti nascondono la complessità della frammentazione di ISO-TP, concentrandosi sull'invio del comando UDS


