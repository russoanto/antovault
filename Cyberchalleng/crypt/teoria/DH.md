## Polig - Helman
- su sage è possibile andare ad applicare il logaritmo discreto con l'algoritmo polig-helman

## Attacchi su RSA
- La forza di rsa sta nella robustezza del modulo n, non devo essere in grado di ottenere i fattori q e p di n
### Casi in cui posso fattorizzare
-  Se ho N1, N2, N3
	- N1 = p*q
	- N2 = r*p
	- GCD(N1,N2) = p
	- Avendo p ho rotto rsa
#### N con fattori molto piccoli
- ci sono algoritmi come il general field selve implementati in sage che ci permettono di calcolare i fattori in relativamente poco tempo
	- la funzione in sage è **factor**
	- utile il sito factordb
### Common Moduls Attack
- m1 (ei, N)
- m2 (e2,N)
- GCD(e1, e2) = 1 (sono coprimi tra di loro)
- da riguardare da soli
### Oracoli
- **Encrypt**
	- Possiamo cifrare un messaggio m e otteniamo un messaggio C
		- Per ricostruire n possiamo andare a cifrare -1 e il risultato va aggiunto 1 e otteniamo n
		- Se non posso usare il trucco del -1 ma ho e quello che posso fare è 
			- Cifro 2 messaggi m1 e m2 ottenendo C1 e C2
			-  $$C1  =q_{1}*n+r$$
			- $$C2 = q_2*n+r$$
			- $$m_{1^{e}} - C1 = m_{1}^{e} = m_{1}^{e} - m_{1}^{e} \mod{n} = $$
	- Ultimo caso
		- in questo 
- **Decrypt**
	- Abbiamo un oracolo s, gli diamo c e ci tira fuori un messaggio m
		- io posso chiedergli di decifrarmi -1 e per lo stesso concetto di prima posso ottenere n-1
	- **Proprietà homomorfica**: capacità che le mutazioni applicate al ciphertext vengano mantenute al plaintext
		- Se noi fossimo capaci di moltiplicare un valore alla flag cifrata 
	- tool: gmpy2.iroot

