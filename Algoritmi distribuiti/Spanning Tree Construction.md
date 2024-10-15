# Spanning Tree construction
Questa parte può essere trovata sul libro che ci ha consigliato.
## Spanning Tree
- Uno spanning Tree T di un  grafo G = (V,E) è un sottografo aciclico di G tale che T = (V, E') e E' è contenuto in E. 
### Restrizioni 
- Singolo inizializzatore
- LInk bidirezionali
- Total reliability
- G connesso
## Protocol SHOUT
- Inizialmente abbiamo che:
$$\forall x, tree-neighbots(x) = \{\}$$
- e alla fine abbiamo la conoscenza su quali dei sui vicini fanno parte dell spanning tree:
$$\forall x, tree-neighbors(x) = \{neighbors-in-spanning-tree\}$$
1) Inizializzatore: manda le richieste ai suoi vicini (Vuoi diventare un mio vicino nello spanning tree?)
2) Le altre entità aspettano fino a quando non ricevono la richiesta Q. 
	1) Se è la prima volta che riceve la prima domanda allora rispondo **si**
	2) Se ho già risposto alla domanda allora risondo di **no**
	3) Ovviamente se ricevo risposta positiva allora devo prenderne nota
- Pseudocodice:
	State S = {Init, Idle, Active, Done};
	Sinit = {init, idle}; // possibili stati iniziali
	sterm = {done}; // stato terminatore
	// Protocollo per l'agente x
	- **Inizializzatore**
		Spontaneo
			root = true;
			tree-neigh(x) = {};
			send Q to N(x);
			counter = 0;
			become(Active)
	
	- **IDLE**
		ricevo(Q)
			root = false;
			parent = sender;
			tree-neigh (x) = {sender};
			send **YES** to parent
			counter = 1;
			if counter == |N(x)|
				then
					become(DONE)
				else
					send Q to N(x)-{sender}
					become(ACTIVE)
	- **ACTIVE**
		ricevo(Q)
			send NO to sender
		ricevo(YES)
			tree-neigh(x) = tree-neigh(x) u {sender (chi mi ha risposto)};
			counter = counter + 1;
			if(counter == |N(x)|)
				become(DONE);
		ricevo(NO)
			counter = counter + 1;
			if(counter == |N(x)|)
				become(DONE);
- Se x è nel MST di y:
	- allora y è nel MST di x
- Se x manda YES ad y:
	- e y è nel MST di x ed è connesso all'inizializzatore da una catena di YES
- Ogni x, ad eccezzione dell'inizializzatore manda esattamente un YES
	- È fondamentale mandare esattamente un solo YES altrimenti rischio di creare dei cicli e quinid non ha più un albero
- Abbiamo una terminazione locale, c'è qualcuno che sa se il protocollo è terminato? No.
### Costi
- Quello che mi posso aspettare nel numero di messaggi è quello che avevo per flooding + le risposte quindi ho:
	- Message(SHOUT) = 2Message(FLOODING)
#### Message Complexity
- Abbiamo 3 tipi di messaggi che possono girare sullo stesso link:
	- Q e yes
	- Q e Q
	- no e no
- Quello che non può accadere:
	- Yes e Yes: perchè se accetto significa che è il primo messaggio che ricevo una domanda quindi non posso ricevere una risposta percè fino a quel momento stavo dormendo
	- no e yes: stesso motivo di quello precedente, se mando dei si allora significa che ho ricevuto per la prima volta una domanda allora non ne avrò inviata una.
- Devo contare quante volte possono succedere i messaggi sullo stesso link:
	- **Numero di Q:** 
		- Il caso di Q e Yes accadranno su tutti gli archi che diventeranno dello spanning tree questo significa che saranno "n-1"
		- Il caso di Q e Q invece accadranno su tutti gli archi che non faranno parte dello spanning tree (quindi capiteranno sui cicli), e li possiamo contare per differenza "2{m - (n-1)}"
		- **Totale:** = (n-1) + 2{m - (n-1)} = 2m - n+1
	- **Numero di No:** è lo stesso numero di Q e Q dato che accadono in risposta agli Q e Q quindi "2 {m - (n-1)}"
	- **Numero di Si:** Stesso numero degli archi che faranno parte dello spanning tree quindi avremo "n-1" si
- $$Message(SHOUT) = 2m - n+1+2[m-(n-1)] + (n-1)$$
-  $$ = 2(2m-n+1) = 2Message(FLOODING)$$
- Ci sono dei messaggi superficiali? Si, i messaggi di tipo No
	- **SHOUT+: complexity**: andiamo a contare i messaggi che passano per ogni link con questa nuova modifica
		- 2m (fare i conti è facile)

## Costruzione By Traversal
- Si può andare a costruire lo SPT tramite BFS, ma il problema è che nel sistema distribuito non abbiamo sequenzialità, questa la possiamo ottenere facendo girare un **token**.
	- È un messaggio speciale, e solo chi ha questo messaggio può eseguire determinate operazioni ottenendo sequenzialità

### Passaggi
- Quando un nodo riceve il **forward-token** per la prima volta (significa che devo iniziare la visita in profondità dal mio nodo)
	- Devo ricordarmi chi mi ha inviato il token
	- Invio il forward token ad un nodo figlio non visitato
	- Quando mi ritorna il forward token allora lo mando ad altri figli non ancora visitati
	- Se non ho figli da visitare allora mando un **Return Token** a chi mi aveva inviato il forward-token(è  il corrispondente della chiusura di una chiamata ricorsiva)
- Può succedere di attendere un return-token e ricevere un forward-token, il che significa che ho individuato un ciclo, sono arrivato con la visita ad un nodo ancora non esplorato che ha me come vicino e gli comunico con un **back-edge Token** che quel link non può far parte dello spanning tree.
- Può anche accadere la situazione inversa, cioè vado ad esplorare un nodo che è già entrato nello spanning tree, quindi invece di ricevere un return-token riceverò un **back-edge token**.
- Rimuovendo i back-edges otteniamo lo spanning tree
- La root è l'inizializzatore
- sono parent quei nodi da cui hanno ricevuto prima i forward token
- sono i figli quei nodi da cui hanno ricevuto i return
#### Quanti messaggi?
- Dati un link i possibili messaggi possibili sono:
	- Forward seguito da un return
	- Forward seguito da un back-edge
- Il numero di messaggi sono 2 per link, quindi 2m
- Si può fare meglio di qualcosa che sia dipendente dal numero di archi? Ovviamente no, se io escludo un arco potrei escludere una parte del grafo. Il nostro lower bound è $$\omega(m)$$
#### Qunato tempo ci metto?
- Qual'è la catena più lunga di messaggi che mando? In questo caso è un algoritmo che esegue sequenzialmente l'invio di 2m messaggi.
- Cos'è che posso parallelizzare? La scoperta dei back-edge non devono essere scoperti uno alla volta. Ma come faccio?
	- Quando un nodo inzia una visita allora avviso tutti i figli parallelamente che io sono già stato visitato. Ovviamente aumentano il numero di messaggi, dobbiamo vedere quanto tempo andiamo a guadagnare com questo sistema
##### Improving time complex
- Quando ricevo un forward per la prima volta quello che faccio è
		- Avvisare tutti quelli che non hanno iniziato la loro visita e gli dico che sto iniziando la visita (questo è un errore, la visita va inviata a tutti altrimenti ci possono essere dei problemi come quello del rombo)
	- Aspetto di ricevere un messaggio di ack
		- Devo aspettare di ricevere gli ack per evitare di ricevere un messaggio di forward token prima del messaggio visited rischiando di avere ugualmente un backedge token.
	- Quando un nodo riceve un messaggio di **visited** allora mando un **ack** al sender e lo elimina dalla lista dei nodi non visitati  e dopo continua la procedura normalmente.
	- Quindi la catena è:
		- Mando un visited e attendo l'ack (catena lunga 2)
		- Mando il forward token
- Il tempo impiegato è pari a:
	- forward + return (nodi che fanno parte dello spanning tree)
		- 2(n-1)
	- visited + ack(ogni volta che raggiungo un nuovo nodo devo aggiungere 2 messaggi, l'unico che esente da questo passaggio è l'ultimo nod), quindi sono 2 per ogni (n-1). Questo è un errore per quello scritto sopra, in relatà tutti i nodi mandano il messaggio di visited a tutti quindi il numero di messaggi è pari a 2n
	- La catena più lunga è $$2(n-1) + 2n = 4n-2 $$
##### Numero di messaggi
- Adesso non devo vedere l'ordine dei messaggi ma quanti ne vengono mandati in totale.
	- Per i messaggi forward e return ne ho pari ai link appartenenti allo spanning tree 2(n-1)
	- Per quello che riguarda i messaggi visited e ack dato che li mando a tutti ho 2 pessaggi per il grado di ogni nodo meno 1, cioè il sender che mi ha scoperto. 
		- Si traduce in 2 messaggi per tutti i link dello spanning tree
		- 4 messaggi per tutti gli altri link
	- Numero di messaggi: $$2(n-1) + 2(n-1) + 4(m(n-1)) = 4m$$
	
#### Multiple Iteration
- Il problema è che i vari inizializzatori va a creare alberi differenti uno per iniializzatori e non c'è nessun meccanismo che ci permette di fonderlo se consideriamo l'algorimtom così com'è. 
	- Utilizzo di un protocollo differente
	- Utilizzo unalgoritmo già studiato in cui do in pasto un solo inizializzatore
- Entrambe le soluzioni mostrate è dimostrato che non posso essere ottenute in maniera deterministica a patto che i vari inizializzatori non abbiano identificator univoci.
##### Multiple Spanning Tree
- Ogni iteratore costruisce il proprio spanning tree con il single-iterator protocol facendo utilizzo degli id degli inizializzatori per distinguere tra le differenti cosstruzioni
- Faccio in modo che solo l'albero di un inizializzatore venga costruito (solo quello dell'inizializzatore più basso). Nello specifico tutti costruiscono il proprio albero, ma quando ad un nodo mi viene chiesto di far parte di un albero con identificativo più basso allora scarto tutto quello che ho fatto fino ad adesso.
	- In questo caso io non so quando ho finito, nel senso che posso sapere se ho finito per un albero, ma se mi arriv una notifica per un albero con id minore allora non ho finito. Ho bisogno di un sistema di notifica
- Solitmente non si fanno alberi multipli ma si utilizza un sistema di elezione di un leader degli inizializzatori per poter costruire un singolo albero.
### Computazione in un albero
- Gli alberi possono essere di due tipologie:
	- Rooted
		- In questo caso abbiamo un inizializzatore naturale per qualunque attività della rete(la root sa di essere diverso)
		- IN generale o l'albero è rooted o altrimenti per identificare una root nell'albero dobbiamo fornire degli identificativi unici ai nodi(ricordiamo che siamo in un contesto distribuito qundi non è sempre facile coordinare i nodi)
	- Unrooted
		- Ogniuno sa di essere in un albero e ogni nodo sa se è un nodo interno oppure una foglia
		- Esempio: minimum finding
			- Le foglie spediscono il loro valore verso l'unico vicino che hanno.
			- Il vicino è un nodo interno, quindi aspetta di ricevere tutti i valori dei sui vicini tranne uno. Quindi calcola il valore minimo del suo sottoalbero e lo manda sopra e così via.
			- Questo va avanti fin quando due nodi non ricevono il minimo di tutti gli altri nodi del sottoalbero mancante.
			- A questo punto entrambi gli ultimi due nodi hanno il minimo del proprio sottoalbere e quello del vicini in questo modo possono sapere qual'è il minimo di tutto l'albero
			- Questa tecnica si chiama saturazione, io propago dalle foglie fino ai singoli nodi, cioè fino a quando non "satuto"
		- In generale possiamo separare la computazione in 3 fasi:
			- **Attivazioni**: gli inizializzatori inviano un wake-up per attivare le entità
				- Nel caso peggiore io ho tutti inizializzatori ed ognuno manda un messaggio di wake up
			- **Saturazione**: le foglie mandano un messaggio di saturazioni al proprio vicino
				- Ho un messaggio per ogni arco tranne per l'arco saturato in cui ne passano 2 quindi ho:
					- (n-1) +1 = n 
			- **Resolution:** i nodi interni che sono svegli, quando riceve tutti i messaggi di saturazione tranne uno, allora produce il suo messaggio di saturazione e lo manda ai suoi vicini.
				- n-2
			- Solo due nodi saturano e sono quelli che ottengono le informazioni di tutti quanti gli altri.
			- Totale messaggi: 4n-4



	