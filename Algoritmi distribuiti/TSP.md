Nel problema del TSP un grafo non orientato pesato G = (V,E) con costi non negativi associati ad ogni arco. L'obiettivo del problema è quello di individuare un ciclo hamiltoniano di costo minimo.
___
# Disuguaglianza triangolare
Se aggiungendo una tappa intermedia il costo non aumenta, formalizziamo la funzione di cost dicendo che soddisfa la disuguaglianza triangolare se per tutti i vertici u,v,w in V  vale che c(u,w) <= c(u,v) + c(v,w).

## TSP - Approx
- Come prima cosa bisogna costruire un minimum spanning tree 
	- albero che contiene un sottoinsieme di nodi che connettono tutti i nodi, senza cicli con il minor costo possibile
- A questo punto dobbiamo costruire un tour il cui costo non sia maggiore di 2 volte del costo del minimum spanning tree
____
# Christofides
Algoritmo con un approssimazione di 3/2. Utilizza il concetto di **matching** è un sottoinsieme degli archi disgiunti tra di loro. 
___
**Disgiunti**: Due archi sono disgiunti che non condividono gli estremi.
___
Si parla di **perfect matching** nel momento in cui abbiamo un sottoinsieme di archi disgiunti che coprono tutti i nodi. Un matching esiste sempre ma un perfect matching non è detto che esista (una condizione di esistenza è che il numero di nodi deve essere pari).

## Algoritmo
1) Minimum spanning tree --> T^*
2) Nello spanning tree che ho costruito prendo i nodi di grado dispari. Sia G' il sottografo che contiene tutti i nodi di grado dispari e relativi archi. Dato che il grafo originale era completo anche questo sottografo è completo. Qui giunge a conclusione che il numero di nodi sono pari(non ho capito perchè).
3) Sia M il minimo costo per il **perfect matching** che ho solo nel caso in cui nel mio grafo completo il numero di nodi sono pari. Se ne ho almeno uno, allora significa che ne ho altri.
4) Questi archi ottenuti con il perfect matching li aggiungo al mio traspofrmando i nodi di grado dispari in nodi di grado pari.
5) Calcolo il ciclo Euleriano
6) Calcolo il ciclo hamiltoniano --> H
7) return H
### Perchè funziona sempre?
La cardinalità del mio grafo la posso scrivere come:
- Somma dei gradi = 2|E| (è una quantità pari) 
Questa quantità posso riscriverla come:
- Somma dei gradi dei nodi pari + somma dei gradi dei nodi dispari (visto che la somma deve dare un numero pari allora il numero di nodi dispari è pari,la sommatoria viene fatto su un numero pari di nodi per la prima condizione)


### Ora devo verificare la bontà della mia soluzione
Voglio calcolare il costo del mio ciclo hamiltoniano e il costo del mio ciclo euleriano. cost(H) <= cost(E) 
Il ciclo euleriano passa una sola volta per gli archi che gli vengono dati in input(quindi quelli del perfect matching agigunti quelli del perfect matching) quindi:
- cost(E) = cost(T*) + cost(E*)
Se considero il ciclo hemiltoniano ottimo quello che posso ricavare se levo un solo arco è che ottengo uno spanning tree e quindi posso fare la seguente relazione:
- cost(H*) >= cost(T) >= cost(T*)
Se considero il mio ciclo euleriano quello che posso dedurre è che i nodi selezionati sono sicuramente attraversati dal ciclo hemiltoniano. Con questi nodi vado a creare un nuovo ciclo gamma che passa per i nodi selezionati nel secondo passo dell'algoritmo. Gli archi per formare il ciclo li prendo dal mio grafo completa che sicuramente li ha. Dato che il mio numero di nodi selezionati è pari allora dato un grafo con N nodi ho anche n archi, quindi per ottenere un perfect matching posso prendere un arco si e uno no. In questo modo posso coprire tutti i nodi del mio ciclo. Gli altri archi che non ho selezionato formano un altro perfect matchig.
___
Il costo è la somma degli archi che sto considerando
___
- cost(gamma) = costo(M1) + costo(M2)
	- M1 ed M2 sono i due perfect matching di cui ho discusso sopra
- Per la disuguaglianza triangolare posso dire che sicuramente il costo di gamma non è sicuramente più grande del costo di H*
- cost(H*) >= cost(gamma)
- M1 ed M2 sono stati costruiti sullo stesso insieme di nodi su cui ho costruito E* quindi M1 ed M2 singolarmente hanno un costo che al massimo è pari al costo di E* ciò significa che:
	- 2costo(E*) <= cost(gamma)
- cost(H*) >= 2cost(E*)
- cost(H) <= cost(H*) + cost(H*)/2 = 3cost(H*)/2