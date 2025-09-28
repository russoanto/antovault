- **Bit di parità**: bit che mi permette di di capire se il mio messaggio ha subito una qualche tipo di modifica dovute ad errori di trasmissione (interferenze)
- attori che utilizzeremo
	- alice e bob: buoni che vogliono comunicare
	- eve: cattivo che vuole leggere/modificare la comunicazione dei buoni (crittoanalista)
- Figo l'aneddoto su come si estrapolano i firmware da dispositivi embedded fingendosi i server che pubblicano aggiornamenti del software
- Termini utilizzati:
	- **encryption algo**: algoritmo che è in grado di di trasformare un plain text in una serie casuale di bit (una casualità vera, quindi bit con entropia)
## Aritmetica Modulare
- il nostro modulo ci permette di tagliare,  non so quanto sia corretta questa definizione ma chiarisce il concetto
	- Utilizzata anche nel cifrario di cesare che veniva rappresentata tramite
	$$c = m+k\mod{N}$$
	- dove c è il carattere cifrato, m è il carattere in chiaro, k è la chiave che è rappresentata da il numero di posizioni di cui devo spostare la mia chiave il tutto modulo N(numero di elementi dell'alfabeto)
	- questo tipo di cifrari si chiamano shift ciphe
	-  **Cifrario polialfabetico:** a differenza del cifrario di cesare utilizzo più alfabeti di sostituzione
		- Vigenere: per ogni lettera cambia la chiave o meglio, la chiave è devinita da una serie di caratteri, ogni carattere consiste nello shift del carattere corrispondente nel plaintext (l'alfabeto è shiftato diversamente)
			- La vulnerabilità è che la mia chiave, essendo in molti casi più piccola, è ripetuta ogni n, dove n è la lunghezza della chiave
### XOR
- **safe encryption**:
	- la crittografia sicura è data dai principi di kerckhoffs
		- lo schema di cifratura non è segreto
			- l'unico segreto deve essere la chiave
- **Applicazioni della crittoalisi**
	- ciphertext only: ho una collezione di ciphertexts, quindi posso solo ascoltare e non modificare nulla
	- **known plaintext**: ho delle coppie di ciphertext e plaintext ma anche qui non posso modificare nulla
	- **chosen plaintext**: ho una collezione di <plaintext,ciphertext> di cui posso scegliere i testi in chiaro
	- Chosen text: Two collections of pairs, <plaintext, ciphertext> one with chosen text and the other with chosen ciphertext
- Proprietà interessante dello XOR
	- è invertibile ed è il motivo per cui è utilizzato in crittografia
- Da ora in poi ragioneremo in termini di bit, così che possiamo applicare lo xor
## Block Cipher
- Al posto di prendere un singolo byte vado a lavorare con blocchi di byte
- L'idea base è
	- prendere un messaggio a n bit (abbastanza grande)
	- prendiamo una chiave segreta
		- la lunghezza della chiave non dipende dalla block size
	- e li diamo in pasto ad una funzione
- In generale è un operazione di key permutation
	- Se utilizzo la stessa chiave per più blocchi differenti significa che utilizzano la stessa permutazione
	- Quello che si fa in generale è il key scheduling
		- Data una chiave di cifratura k la diamo in pasto ad un algoritmo di key scheduling che mi fornisce in output delle chiavi chiamate "round key" (più piccole dell'originale e utilizzabili una singola volta)
### Des
- primo cifrario a blocchi divenuto standard
	- La chiave è di 64 bit --> quindi 2^64 chiavi possibili
	- Effettivamente però veniva utilizzata una chiave di 56bit perchè alcuni bit sono serviti come bit di parità
- È importante perchè è il cifrario più crittoanalizzato della storia, la maggior parte della conoscenza su attacchi a crittografia simmetrica le si sanno grazie a DES
- Come funziona?
	- Ci è stato spiegato abbastanza male ma l'idea è che possiamo immaginarle come delle blackbox
	- Inizialmente le sbox erano chiuse e non aperte
#### Debolezze
- La lunghezza della chiave, spazio delle chiavi troppo piccolo
- Nello specifico ci sono delle chiavi particolari, **weak keys**, che non cifrano nulla, o meglio, sono delle chiavi che date in pasto al key schedule mi genera delle round key  uguali tra di loro. (applicare due volte la cifratura significa decifrare)
### AES
- È il rimpiazzo di DES
- È anche noto come "riandel" cercare meglio
- La block size è di 128 bit
- 