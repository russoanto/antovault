da recuperare le prime 2 ore.
La notazione di costi ci permette di esprimere le funzioni di costi per la descrizione degli algoritmi per definire qual'è quello migliore per le nostre esigenze.
## Classificazione dei problemi
La difficoltà di un problema ha a che fare con quello che è il tempo necessario per risolvere i problmei. Quinidi i problemi **trattabili** sono quelli che hanno un costo polinomiale per la dimensione dell'input. I problemi **intrattabili** che non hanno costo polinomiale, ma perchè esiste una dimostrazione che ci dice che è impossibile avere una soluzione polinomiale. I problemi **inrisorvibili** sono quelli che non hanno una soluzione, il problema non sono i costi. Quegli algoritmi per cui non esiste un algoritmo polinomiale ma non esiste una dimostrazione di non esistenza allora finiscono nella categoria **problemi presumibilmente intrattabili**.

## Teoria della Complessità

Noi ci concentriamo sui problemi, quindi analizzeremo l'efficienza delle soluzione dei rispettivi problemi. Inizialmente vedremo i problemi decisionali perchè semplificano le cose. Quindi vado ad approcciare dei problemi di ottimizzazione riconvertendoli nel corrispettivo decisionale. 
**Classi di problemi p**: sono un insieme di problemi decisionali che possono essere risolti in un tempo polinomiale. In alcuni algoritmi posso fare quello che si chiama **verificare una soluzione** data una soluzione allora posso verificare la validità della soluzione in un tempo polinomiale. Questo è il caso dei cicli hamiltoniani. Un **certificato** per un istanza positiva è un insieme di caratteri che mi dimostra l'appartenenza del mio insieme di istanze positive.L'algoritmo **verificatore** è quello che prende il certificato e un istanza e mi permette di dire se la mia istanza è un istanza positiva. Interessante sono gli algoritmi verificatori che eseguono in tempo polinomiale. A questo punto posso definire gli **classi di problemi NP (non deterministic polynomial time)** che sono quei porblemi che non hanno una soluzione polinomiale ma che dato un certificato e un istanza ha un algoritmo verificatore che esegue in tempo polinomiale.
Nota bene: se sappiamo risolvere un problema allora sappiamo anche verificarlo. Il viceversa invece non si sa, è una questione aperta. 

### Riduzione di karp

Come faccio a decidere quali sono più difficile che stanno dentro NP ma fuori da P? **Riduzione**: cerco di ricondurre la soluzione di un problema che ho già per la soluzione del problema he decisionale che non ho. Le condizioni che devo avere è avere un istanza di un problema A riducibile in tempo **polinomiale** in un istanza di B, successivamente uso l'algoritmo decisionale B. Questo significa che A <= B che significa che :
- il problema B non è più facile del problema di A
- il problema A non è più difficile di B
Considerazioni se A <= B:
- B in P --> A in P
- A not in P --> B not in P
	- perchè se B in P allora anche A in P
- Se A in P allora non si può dire nulla su B
- se B not in P allora non si può dire nulla sul problema A
- B <= A --> A = B: i problemi sono equivalentemente difficili
La riduzione polinomiale è **transitiva**:
- A <= B ^ B <= C --> A <= C
istanza di A --> Trasformazione polinomiale --> Istanza di B -->  Trasformazione polinomiale --> Istanza di C --> Algoritmo per C
I problemi **NP-completi** sono quelli più difficili tra gli NP, cioè posso verificarli in tempo polinomiali ma non risolverli in tempo polinomiale:
- A in NP
- per ogni B in NP : B <= A
Per la dimostrazione del secondo punto quello che posso fare è scegliere un problema NP-completo e dimostro che B <= A. Questo funziona perchè per transitività, sel l'altro problema è NP-completo allora per C in NP, C <= B e per transitività possimo dire che C <= A. Quindi ci basta verificare la difficoltà solo con un altro solo problema NP-completo. Il problema è come abbiamo l'appartenenza del primo problema all'insieme NP-completo? 2 tizi sono riusciti a dimostrare che il problema SAT fosse un problema NP-completo senza l'utilizzo della proprietà transitiva. Da quello allora ci ha permesso la dimostrazione di tutti gli altri. È fondamentale che l'insieme NP-completi aumenti dato che la dimostrazione che solo uno di quei problemi sia risolvibile in tempo polinomiale, allora risolverebbe tutti gli altri problemi e Np-completi collasserebbe con l'insieme P.

Ci sono dei problemi che non sono decisionali, ad esempio quelli di ottimizzazione, in cui non è facile neanche verificare. Un esempio è il problema del commesso viaggiatore. Abbiamo una classificazione per loro che ci dice che questi problemi sono difficili almeno come i problemi NP, quindi gli **NP-hard** li definiamo così: per ogni B in NP: B <= A