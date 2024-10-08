Problema di tipo NP Hard, che prende in input un grafo G generico non diretto e non pesato. In output vogliamo un **vertex cover** di costo minimo. Un vertex cover è un insieme di nodi che copre tutti gli archi del grafo.
- Il **costo** è il numero di vertici che sta nel mio insieme V'.
Il problema diventa difficile quando devo individuare quello di costo minimo, se non ci fosse questo vincolo mi basterebbe selezionare tutti i nodi. Quello che faremo è di andere ad utilizzare un algoritmo greedy, cioè la soluzione la costruisco selezionando sempre la soluzione migliore ad ogni step senza mai tornare indietro e modificare una soluzione. 
## Algoritmo greedy

Un metodo greedy può essere quello di selezionare dei nodi casualmente fino a quando non ho selezionato tutti i nodi, l'inefficienza del metodo la si può notare con l'esempio del grafo a stella. 
___
Invece di scegliere un nodo ad ogni iterazione vado a cegliere un arco e nella mia soluzione inseriso i due nodi che sono collegati all'arco scelto.

```c
c = [];
while E != {} do
	pick any(u,v) in E;
	C = C + {u,v};
	delete from E all edges incident in u e V
return C;
```
Quello che devo verificare non è se la soluzione ottima ma se la soluzione che ho trovato è una soluzine ammissibile. Verificare come sia molto più efficente per il caso di grafo a stella nonostante non si riesca a trovare l'ottimale. Nello specifico questa approssimazione trova il doppio dell'ottimale.
___
In E' inserisco gli archi selezionati durante l'esecuione dell'algoritmo. Quello che possiamo dire sulla cardinalità è che 2|E'| = |C|.
- Gli archi selezionati hanno la proprietà di essere disgiunti
	- dopo la selezione elimino quelli incidenti
- Nel cover ottimo devo coprire tutti gli archi, il che significa che per ogni arco ho almento un nodo per ogni arco
	- |OPT| >= |E'| dove la cardinalità di opt è il numero di nodi che quindi è sicuramente almento uguale al numero di archi presenti in E' dato che gli archi sono disgiunti |C|/|OPT| <= 2

Abbimo visto un esempio in cui nel caso di un grafo bipartito completo in cui il nostro algoritmo ha un costo dell'ottimo pari a 2, questo significa che non possiamo dimostrare in nessun modo che il nostro algoritmo per una qualsiasi istanza può ottenere un costo inferiore a 2. A questo punto proviamo a cambiare algoritmo.

Quello che faremo è vedere il nostro porblema come uno di programmazione lineare intera. Il porblema lo definiamo come:

```c
per ogni v in V
	Xv = {0 se v not in V.C, 1 altrimenti}
```
___
La nostra funzine obiettivo è:
- min la sommatoria (v in V) Xv
___
Come vincoli abbiamo :
- Xv in {0,1} per ogni v in V
- $$X_{v} + X_{u} >= 1 $$
- $$X_{v} \in \{0,1\} $$
Quando aggiungo un vincolo di inferenza il mio problema diventa NP.hard se non ci fosse stato avrei potuto risolverlo in poco tempo
___
A questo punto cosa me ne faccio di questo problema dato che ho il vincolo di inferenza? Riscrivo il problema in modo che sia risolvibile in tempi accettabili in questo modo:

 - $$X_{v} + X_{u} >= 1 $$
- $$X_{v} \in [0,1] \space \forall v \in V$$
In questo modo posso risolverlo in tempi ragionevoli ma comunque non ho il vincolo di interezza. Quello che ottengo è: $$OPT \rightarrow X_{v}^*$$ che non è intero, io ho bisogno di un valore che sia o 0 o 1, quindi devo fare un binding e successivamente devo controllare che il mio vincolo di copertura di tutti gli archi sia rispettato. Quesllo che posso dire è che dato che per il mio problema di programmazione lineare uno dei due valori che trovo è almeno un mezzo questo significa che nel binding che vado a fare quando trovo un valore che è maggiore o **uguale** ad 1/2 allora lo devo considerare.

$$\forall v \in V$$
X_v = 0 se X_v^* < 1/2, 1 se X_v* >= 1/2

Le mie soluzione per la programmazione lineare intera sono anche soluzioni per il mio problema di programmazione lineare, si trovano nello stesso insieme. Questo sottoinsieme è un sottoinsieme proprio rispetto all'insieme delle soluzioni del mio problema di programmazione lineare. Ovivamente l'ottimo del problema di progemmaizon lineare non è detto che sia una soluzione per il problema di programmazione lineare intera, invece vale il contrario. Quando le due soluzioni coincidono? Quando l'ottimo per il problema lineare è intero allora quello è anche l'ottimo per il mio problemalineare intero. $$OPT_{LP} \le OPT_{ILP}$$
Il costo della soluzione approssimata è data:
- $$Approx = \sum_{v \in V}\limits{X_{v}}\le 2*\sqrt{\sum_{v \in V}\limits{X_{v^{*}}} =} \space2OPT_{LP}\le 2*OPT_{ILP} $$
Nessuno ha mai trovato un approssimazione migliore del 2.

### Domanda esame
Ci chiede uno degli algoritmi studiati, input, output, e analisi dei costi etc..