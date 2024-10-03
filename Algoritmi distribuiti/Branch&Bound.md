Voglio migliorare la soluzione a forza bruta. Considero S l'insieme delle soluzioni ammissibili, branch & bound quello che va a fare è divdere in sottoinsiemi con un criterio. Dopo prendo separatamente questi sottoinsiemi e per ognuno vado a decidere se li dentro può esserci la soluzione ottima oppure no. Per farlo seleziono la soluzione corrente migliore(inizialmente può essere una a caso). Per ogni sottoinsieme vado a calcolare un lowerbound rispetto al costo di tutte le soluzioni presenti nel sottoinsieme. Ovviamente utilizzo il mio valore di lowebound come metro di paragone per, eventualemente, scartare tutto il gruppo di soluzioni in una sola volta. Idealmente diviso il mio spazio delle soluzioni ricorsivamente per capire se posso buttare via tutto il mio spazio oppure se devo continuare a dividere per torvare una soluzione migliore. Questo sistema mi permette di individuare l'ottimo ma non è polinomiale. Se prendo un best count che non è al di sotto della mia lower bound e che quindi non è una soluzione ottima allora sto sbagliando di al massimo dell'intervallo best count - lower bound.
## Applicazione al problema TSP
Dobbiamo specificare come facciamo a fare branch e come facciamo a fare bound. Per prima cosa, per rappresentiamo le nostre istanze come un grafo.
![[b&b_tsp.png]]
I sottogruppi vengono realizzati anch'essi come dei grafi, di nodi pari al grafo G, ma con archi in meno. Per trovare un lowerbound devo partire da un grafo corrente che però abbia il ciclo hemiltoniano di costo minimo.
![[es_b&b.png]]
A) Inizialmente scelgo un nodo dal mio grafo e sui restanti nodi calcolo il minimum spanning tree .
B) Quello tratteggiato rappresenta il mio MST che chiamo T
C) Se il nodo che ho scleto ha grado o 0 o 1 allora posso anche buttarlo visto che significa che non ci sono cicli hamiltoniani, mentre se se è almeno di grado 2 allora prendo i 2 archi di peso minimo che lo collegano al mio T. La struttura creata si chiama 1-Tree. Il costo del mio MST + il costo dei 2 archi scelti formano il mio **lower bound**. La costruzione avviene in tempo polinomiale. Qualunque ciclo hemiltoniano che trovo dal mio grafo di partenza ha un costo che sicuramente è maggiore del **lower bound** trovato.
![[cost_1_tree.png]]

Se vado a prendere il ciclo hemiltoniano ottimo quello che posso dire è che il cammino formato dei nodi dei H* escluso v sarà sicuramente del costo di T* dato che T* è il mio minimum spanning tree. Quello che rimane sono i due archi che collegano v al cammino P che so sicuramente che sono inferiori o uguali rispetto a quelli scelti precedentemente (dato che avevo scelto quelli di costo minore). Detto ciò vale la disiquazione sopra.

### Branching
Ovviamente anche i sottoinsiemi di soluzioni saranno rappresentati tramite grafi.
![[branching_pt_1.png]]
Se il mio 1-Tree non è un cliclo allora ho un nodo che ha grado 3, quindi qello che faccio è selezionare uno dei 3 archi e lo elimini, questo lo faccio per tutti e 3 gli archi ottenendo 3 grafi differenti,facendo in questo modo non vado a perdere i cicli che avevamo.