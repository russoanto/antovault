- Quello che vediamo è che ci viene fornita la flag cifrata con AES-CBC
	- La cosa interessante è che ci viene fornita la funzione per decifrare del testo in esadecimale
		- ovviamente non ci stampa la flag 
		- Quello che ci fornisce è che se inseriamo una stringa esadecimale che ha un padding errato ci viene fornito un errore **OTTIMO**
- Fase 1
	- Calcolare la lunghezza della flag, come fare???
		- Prima cosa so che il token che mi viene fornito è così costituito
			- iv(16) + len del cipher text
```python
def get_len_flag(cipher):
	global LEN_FLAG
	LEN_FLAG = len(cipher[16:])//2
```
-  Fase 2
	- Una volta che abbiamo la lunghezza potenziale della flag dobbiamo trovare il numero di blocchi che compone la flag
	- (LEN_FLAG+BLOCK_SIZE-1)//BLOCK_SIZE
		- Non vado a fare semplicemente LEN_FLAG//BLOCK_SIZE perchè quello che potrebbe accadere è che dimentico un blocco di riempimento dovuto al padding. Per ovviare a questo problema vado ad aggiungere (BLOCK_SIZE-1) e divido per difetto
- Fase 3
	- Ora che posso lavorare con i singoli blocchi per ogni blocco quello che devo fare è
		- 