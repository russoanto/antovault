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