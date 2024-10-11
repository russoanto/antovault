Un ambiente distribuito è un insieme di agenti che hanno una loro capacità computazionale che insieme lavorano per risolvere un compito coordinandosi scambiandosi dei messaggi (non hanno memoria condivisa). Sono utili per la condivisione di risorse, tolleranza ai guasti e per questione di scalabilità. In un sistema distribuito abbiamo:
- Tanti processori
- molte memorie
- operazioni in parallelo
- ampia distanza tra i dispositivi
- scambio di messaggi
Possiamo rappresenare il nostro sistema come un grafo in cui gli archi rappresentano i canali di comunicazione e i nodi le varie entità computazionali. Ogni entità ha:
- **input:** può essere vuoto o parte del problema
- **stesso output:** devono produrre lo stesso output del problema
- **stesso codice:** usano lo stesso algoritmo per la risoluzione del problema
Inoltre assumiamo anche che ogni entità abbia uno stato in ogni momento. L'agente è reattivo sulla base degli eventi:
- clock tick
- ricezione di un messaggio
- inpulso esterno 
Se non succede nulla allora rimane nel suo stato. L'azione è una sequenza di attività tra quelle previste, queste ultime sono **atomiche**, non possono essere interrotte e devono finire in un tempo finito. Le azioni di un entità dipendono dagli eventi e dal proprio stato:
- Stato X Evento --> Azione

### Assiomi
- Tempo di strasmissione finita: se invio il messaggio allora prima o poi quello arriva
- Local orientation: ogni entità distingue tra i suoi vicini
## Restrizioni del modello 
Limitazioni nell'applicazione del protocollo.
- Restrizioni di comunicazioni
- reliability: ci sono dei meccanismi per la detection di guasti o malfunzionamenti
	- Edge failure detection
	- Entity failure detection
- Restrizioni sui tipi di errore:
	- Garanzie di spedizioni
	- Reliability parziali: non ci saranno fallimenti
	- Reliability Totale: non ci sono stati fallimenti e non ce ne saranno
- Restrizioni di Topologia
	- numero di nodi
	- numero di archi
	- dimensione del diametro del grafo
- Restrizioni Temporali
	- Bounded comunication: in assenza di fallimenti abbiamo un upper bound per la consegna dei messaggi
	- Unitary comunication: In assenza di fallimento il delay della comunicazione per qualsiasi link ha un tempo unitario
	- Sync clocks: tutti i clock locali vengono aumentati di un unità simultaneamente ad intervalli costanti
## Complexity per algoritmi distribuiti
IL tempo rimane un parametro di interesse per questa categoria di algorimti, cosa che non lo è più lo spazio. Si aggiunge anche il parametro della quantità della comunicazione. Spesso questi sistemi sono lontani quindi il tempo della comunicazione è spesso maggiore rispetto alla computazione locale del singolo agente. I mesaggi in parallelo contano come il messaggio più lungo, mentre se ho dipendenta tra messaggi si sommano come n messaggi consecutivi.

**Spazio**: c'è qualcosa di cui tenere conto, ma dal punto di vista del numero di messaggi inviati da tutti gli agenti. Se ho messaggi molto lunghi allora devo spezzettarli e inviarli come tanti piccoli pacchetti. 

**time**. il tempo viene considerato da quando la prima entità inizia a lavorare e termina quando l'ultimo agente termina il lavoro.
- total synch: gli agenti lavorano in maniera sincronizzata (tempo computazionale ideale)
- asynch (casual time complex)
## Example - Broadcast
Una entità ha un informazione che vuole inviare a tutti quanti gli altri agenti della rete. Mettiamo alcune restrizioni in modo che possiamo lavorare in modo più semplice.
- Unico inizializzatore, per definizione del problema
- Total reliability
- connessioni bidirezionali
- G è un grafo connesso (altrimenti il problema sarebbe irrisolvibile)
Come viene realizzato?? Se un entità sa qualcosa allora la manda ai suoi vicini. Qual'è il problema con questo problema?
$$Stati: S=\{Inizializatore, sleeping\}$$
$$Informazione: I$$
$$Insieme \space di \space azioni \space di \space B(E):$$
```c
Inizializzatore
spontaneamente
	send(I) to N(x)
ricezione(I)
	NULL
```
```c
Sleeping
ricezione(I)
	send(I) to N(x)
```
Devo fare in modo che nel momento in cui un nodo ha già mandato l'informazione ai sui vinicni non lo faccia un'altra volta:

$$Stati: S=\{Inizializatore, sleeping, DONE\}$$

```c
Inizializzatore
spontaneamente
	send(I) to N(x)
	become(DONE)
ricezione(I)
	NULL
```
```c
Sleeping
ricezione(I)
	send(I) to N(x)
	become(DONE)
```
Se sono nello stato "DONE" allora non faccio più niente. Una modifica per ridurre il numero di messaggi che devo mandare quello che faccio è evitare che il messaggio venga reiniato a chi ha mandato il messaggio.

```c
Sleeping
ricezione(I)
	send(I) to N(x) - {sender}
	become(DONE)
```
![[broad_algo.png]]

Se il sistema è asincrono può succedere anche che un percorso di 2 archi sia più veloci di un singolo arco, in questo caso non so esattamente quale sia il flusso di inizializzazione del mio grafo. Questa tipologia di protocollo si chiama **flooding**.

### Osservazioni
Abbiamo visto un protocollo in cui c'è una terminazione **locale**, cioè ogni agente sa quando terminare ma non c'è un momento in cui vi è una terminazione **globale**, ongi agente non ha nessuna consapevolezza globale. Inoltre nessuna entità sa se l'intero processo ha terminato.

### Correttezza del protocollo
 Bisongna provare che l'algorimto risolva il problema venga risolto correttamente e che l'algoritmo termini. Il problema viene risolto correttamente quando tutti i nodi hanno ricevuto l'informazione, questo perchè se solo 1 nodo non ha ricevuto l'informazione allora significa che neanche i suoi vicini l'hanno ricevuta e posso fare questo discorso ricorsivamente fino all'inizializzatore. Quando un entità riceve il messaggio allora entra nello stato di DONE e termina.
### Costo di inondazione - message complex
n è il numero di nodi ed m il numero di archi. Quanti sono il numero di messagi che passano per ogni arco nel caso peggiore? Ovviamente massimo 2. Il numero totale di messaggi allora non può che essere <= 2m. Più precisamente possiamo dire che:
$$|N(s)| + \sum_{x\ne S}\limits{(|N(x)|-1)} = \sum_{x}\limits{|N(x)|} - \sum_{x\ne S}\limits{1} = 2m - (n-1) $$
In questo caso stiamo assumendo che con un unico messaggio io riesca ad inviare la mia informazione e risulta un pò meno di 2m.

### Costo di inondazione - tempo ideale

Il tempo ideale dipende dal tempo speso per andare dall'iniializzatore a tutti gli altri nodi quindi il tempo è dato dal tempo massimo che intercorre tra il mio iniializzatore e tutti gli altri nodi.

$$r(init) = Max_y\{d(init,y)\}, \forall \space entity$$
Ogni nodo ovviamente può essere l'inizializzatore quindi:
$$Max_{x,y}\{d(x,y)\} = Max\{r(x)\} = D(G), \forall \space (x,y)$$
Quindi nel caso peggiore devo andare a misurare la coppia di nodi più distanti nel grafo. Questo significa che:

$$TimeUnits \le D(G) \le (n-1) \in O(n)$$
n-1 indica il numero di archi nel caso in cui il mio grafo sia una catena, quindi il caso peggiore che mi possa capitare.

### Costo di inondazione - message/time complex
Possiamo diminuire il numro di messaggi o del tempo ideale? SI se riusciamo ad ottenere un **lower bound**.

#### Costo di inondazione - time complex

$$Time(Broadcast(G)) \ge Max_{(x,y)}\{d(x,y)\} = D(G)$$
Il tempo che serve è il diametro del gafo, dato che noi consideriamo che l'inizializzatore può essere un nodo qualsiasi, quindi con questa assunzione sappiamo che nel peggiore dei casi il tempo massimo è pari alla distanza tra i nodi più lontani del grafo e quindi il diametro del grafo. In questo caso abbiamo individuato l'**optimal time complexity** dato che meglio di così non possiamo fare.


#### Costo di inondazione - lower bound numero messaggi
 Tutte le entità devono conoscere I e ci sono n-1 entità (escludo l'inizilizzatore s) che devono ricevere il messaggio contenente l'informazione I
 $$Message(Broadcast(G)) \ge n-1$$
 Se io ho un arco che fa da ponte con un entità, se per qualche motivo il messaggio non passa di la allora quel nodo li non riceverà mai il messaggio. Queso ci fa capire come sia inevitabile inviare almeno un messaggio per ogni arco
 $$Message(Broadcast(G)) \ge m$$
### Flooding: Tree
Ogni nodo tranne la radice hanno almeno un arco entrante quindi per n nodi abbiamo n-1 archi. Assumendo che G sia un albero T:
$$m = n-1$$
$$Message(Flooding(T)) = 2m - n+1$$
$$ = 2(n-1) - n+1$$
$$ = n-1$$
$$= m$$
L'algoritmo di flooding su un albero ha una complessità **ottima**

### Flooding: grafo completo
Assumendo che G sia un grafo completo
$$m = n(n-1)/2$$
$$Message(Foolding(G)) \in \theta(n^2)$$
Ma abbiamo davvero bisogno di fare flooding su un grafo completo? No ci basta inviare le informazione ai propri vicini. In questo caso però bisogna sapere di essere in un caso con grafo completo.
$$Message(SimpleBroadcast(G)) = n-1$$
$$Time(SimpleBroadcast(G)) = D(G) = 1$$Se so che il broadcast sugli alberi costa poco allora posto costruire in una prima fase lo spanning tree per poi riusarlo ogni volta per fare broadcast.

```C
st = build_spanning_tree(G);
flooding(T);
```
Come lo costruisco lo spanning tree?

## Wake-Up Problem
Il sistema deve performare dei task in cui le entità devono essere coinvolte. Le entità già attive hanno il compito di svegliare tutte le entità in idle. Il **broadcast** può essere visto come un wake-up con un solo inizializzatore.

```c
state s = {asleep, awake};
sinit = {asleep};
sterm = {awake};

ASLEEP
spontaneo
	send(W) to N(x);
	become(AWAKE);
ricevendo(W)
	send(W) to N(x) - {sender};
	become(AWAKE);
```

Quanti messaggi abbiamo?
- 1 inizializzatore = Flood:
	- 2m - n+1
- tutti n inizializzatore:
	- 2m (in questo caso nessuno sveglia nessuno e quindi per ogni arco viaggiano due messaggi di sveglia che in realtà non servono a nessuno)
- k inizializzatori ? 
	- 2m - (n-k)
	- riguardarsi i calcoli che si è fatto per il broadcast e generalizzarlo per k inizializzatori
Qunto tempo ci metto? 
- se io ho un solo inizializzatore (caso peggiore) allora il tempo coincide con il tempo necessario per il Flooding O(D)