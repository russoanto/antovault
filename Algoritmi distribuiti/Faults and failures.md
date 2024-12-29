- cos'è che può andare male? Classifichiamo i tipi di fallimento
	- **causa**: 
		- execution fault: quello che fa è sbagliato
		- trasmissione: malfunzionamento della trasmissione
		- component failure: entità o link non funzionante o spento
	- **durata**
		- temporanei: la causa svanirà
		- permanenti
	- **estensione**
		- localizzato: solo una piccola parte di componenti coinvolti
		- sparso: tutti i componenti possono essere coinvolti
- nessun protocollo può essere un protocollo che possa essere resiliente ad un numero arbitrario di fallimenti. Lo scopo dello studio dei fallimenti si propone di
	- date le proprietà del sistema e il tipo di fallimenti che assumiamo possano accadere
	- progetta un protocollo che sia in grado di funzionare nonostante sia sottoposto ad un certo numero di fallimenti di un dato tipo
## Modellazione dei fallimenti
- fallimenti delle entità
	- crash: l'entità smette di funzionare
	- sand/recive omission: non dipendenti dai link ma dell'entità che perde dei pacchetti
	- bizantini: l'entità non rispetta il protocollo e può performare qualsiasi operazione (comportamento malevolo)
- fallimenti dei link
	- Omission: msg inviato ad un entità non viene mai inviato
	- addition: msg inviato ad un entità anche se nessuno l'ha inviato
	- corruption: i messaggi inviati sono differenti da quello inviato
- fallimenti ibridi
- Noi assumeremo che i fallimenti siano permanenti
### Topologica factors
- Il fallimento di un protocollo tollerante può anche dipendere dalla topologia della comunicazione
	- edge connectivity: numero minimo di archi che devono essere rimossi per disconnettere il grafo
	- node connectivity: minimo numero di nodi che devono essere rimossi per la disconnessione del grafo
## Agreement and Consensus
- intpu
	- ogni entità x ha in input un valore v(x) da un insieme di valori noti
- output
	- almeno p entità devono decidere tra lo stesso valore d(x) dal set in un tempo finito
- **Problema del consenso**
	- Distributed database
		- essere d'accordo o meno con un determinato commit di una transazione
	- Diagnostic
		- mettersi d'accordo se classificare un componente del sistema è danneggiato o meno
	- Voting
		- mettersi d'accordo una misurazione ottenuta da sensori multipli 
### Link Fault
#### omissioni
- input: ogni entità x ha in input il valore v(x)
- output: ogni entità x deve decidere tra i valori di v(x)
- **Problema del generale**
	- il problema dei due generali non ha soluzione anche se il sistema è completamente sincrono
	- **lemma**
		- in qualsiasi esecuzione della soluzione di un qualsiasi protocollo in cui i due generali devono attaccare **almeno un messaggio deve essere mandato**
		- Altrimenti è impossibile per il generale B distinguere tra 2 scenari:
			- Generale A decide di non attaccare
			- Generale A decide di attaccare ma nessun messaggio arriva al generale B visto che il messaggero viene intercettato
		- Se i due generali decidono di attaccare con k-1 messaggi allora
			- if k-1 >0
				- contraddizione: 
			- if k-1 = 0
				- da riguardare
	- Il problema qui è che il link **potrebbe fallire** allora il protocollo è inutilizzabile.
	- Quindi cosa facciamo?? Possiamo provare ad utilizzare protocolli randomizzati
	- Se assumiamo che il numero di failures non più grandi della edge connectivity allora **broadcast è possibile**
		- msg complexity <= 2m
		- time complexity <= diametro del grafo senza i faulty links
		- Ogni entità broadcast il proprio valore
		- ogni entità calcola la propria semplice funzione sui valori ricevuti
		- Tutte le entità si mettono d'accordo sul risultato della funzione
		- **Consenso è possibile**
#### Broadcast in un grafo completo
- cosa succede se ci sono dei fallimenti dei link? Non può funzionare
- Dobbiamo aggiungere qualche ipotesi
	- Assumiamo che ci sono al massimo F < n-1 faulty links
	- F è conosciuto da x che vuole fare broadcast
- In questo contesto lavoriamo in 2 steps
	- x manda solo ai F+1 vicini (visto che ci sono massimo F fault allora almeno uno riceve il broadcast)
	- L'entità che riceve il messaggio da x la manda a tutti i suoi vicini (eccetto quello originale)
	- Il numero totale di tutti i fallimenti possibili nel protocollo è max F, quindi 
		- f1(x) <= F; f2(x) <= F - f1(x)....
- **costo**
	- Il caso peggiore è quando non fallisce nessuno
		- (F+1) + (F+1) (n-2) = O(Fn)
		- (F+1) per il primo step
		- (F+1)(n-2) per il secondo step
	- Tempo
		- abbiamo una catena di massimo 2 (abbiamo tanti messaggi in parallelo)
#### Leader election in un grafo completo
- Se posso utilizzare broadcast allora posso fare leader election
- Messaggi: n(F+1)(n-1) = O(Fn^2

### Entity faults
- **Problema del consenso**
	- La decisione è soggetta ai seguenti vincoli
		- agreement: tutte le entità funzionanti decidono lo stesso valore
		- non triviality: se tutti i valori di un entità sono uguali, allora tutte le entità funzionanti devono decidere quel valore
		- termination: tutte le entità funzionanti eventualmente decidono
	- **Teorema**:
		- è impossibile risolvere il problema del consenso anche se è al massimo 1 l'entità che possa fallire
		- il fallimento è un qualsiasi tipo di crash
		- È impossibile progettare un fault-tollerant comunication software
	- Quindi cosa facciamo?
		- Inserisco dei delay finiti entro il quale ci si aspetta una risposta
#### Sistema syncrono
- Restrizioni
	- grafo completo
	- connettività forte
	- syncrono
	- failure type: crash
	- inizio simultaneo
	- conoscenza di f
- È possibile progettare un protocollo che sia in grado di tollerare fino a f < n crash
- assumiamo che v(x) in {0,1} per ogni entità c
- Steps:
	- Ad ogni time step t = 0,..,f per ogni entità funzionante x:
		- invia un report ad ogni y in N(x) con "evrything it knows" e aspetto per il report dai vicini
		- Se x non riceve un messaggio da y in N(x) per il tempo t+1 allora sa che y è crashato
		- se x riceve un messaggio da y allora ottene il report contenente tutto ciò che y sa. 
		- Il report lo costruisco facendo and tra quello che conosco e quello che ricevo
- Costo:
	- msg
		- (n-1) msg * n nodi * (f+1) step
			- O(n^2f)
	- Time
		- (f+1) --> O(f)
##### Consenso nei sistemi sincroni
- Uno dei casi peggiori che può capitare è che il nodo crashi nel momento in cui sta inviando il proprio report
	- Può essere che mandi uno zero ad un nodo e gli altri invece lo considerano come un 1
	- Il problema è se accade nell'istante f, l'ultimo, perchè questo causa un non agreement
		- Fortunatamente questo non può accadere per costruzione
	- Se nell'ultimo istante abbiamo che alcune entità hanno ricevuto un o zero mentre altre no significa solo una cosa
		- Nell'istante prima dell'ultimo una entità che ora ha crashato nc ha inviato lo zero
		- Ma significa che questa entità nc ha ricevuto lo zero per la prima volta nell'istante f-1, altrimenti anche gli altri nodi avrebbero ricevuto lo zero
			- Ma questo zero è per forza arrivata da un altra entità che è crashata
			- È una questione iterativa, e se vado fino in fondo l'unico modo possibile che alcuni abbiano visto lo zero e altri no significa che ci sono **f faulty entity** ma è una contraddizione
			- In questo ragionamento nell'istante zero abbiamo un entità che ha inviato uno zero, che non può essere crashato per l'assunzione iniziale. Questo significa che anche i nodi non faulty hanno visto lo zero, che va ad annullare l'assunzione di partenza (per assurdo)
- Se almeno un non faulty inizia con 0 allora tutte le non faulty decideranno per 0
- Se tutte le entità iniziano con 1, tutte le non faulty decideranno per 1
- Se tutte le non faulty iniziano con 1 ed almeno un entità faulty con 0, tutte le non faulty entità decideranno per 0, a meno che le faulty entity crashano prima di inviare anche solo un messaggio 
- È possibile ridurre il numero di messaggi ?
	- In questo protocollo tutto ciò che conta è lo zero
		- Si fa un and tra zeri e 1, se invio anche solo uno zero allora ci sarà agreement su zero
	- Idea
		- Non mando gli 1
		- Mando solo gli 0
		- Ovviamente ho sempre bisogno degli f+1 round per il caso descritto prima
	- Complessità
		- Msg
			- Il caso peggiore è quando tutti sono zero
			- n(n-1) --> O(n^2)
				- n è il numero di nodi
				- n-1 il numero di messaggi che invia un singolo nodo
		- Time complex
			- O(f)

#### Sistema asincrono - Random
- Abbiamo visto come in un sistema asincrono è impossibile utilizzare un protocollo asincrono quindi ci spostiamo in un protocollo randomizzato
- Restrizioni
	- Connettività forte
	- Grafo completo
	- Failure type: crash
	- Conoscenza di n e f
- È possibile definire un protocollo randomizzato che raggiunga consenso tollerante fino a 
	- $$ f < \frac{n}{2}$$
##### Ben-or's protocol
- I messaggi viaggiano con il numero del round in cui sono stati generati
- Se si riceve un messaggio di un round precedente lo si scarta
- Se si riceve un messaggio di un round successivo lo si conserva
- Idea:
	- Ad ogni round ci siano 2 passi
		- **Propose**: ogni entità cerca di proporre il proprio valore
		- **Adapt** ogni entità si adatta al valore proposto dagli altri
```c
r = 1; //numero round
while(true){
	//Propose phase
	Broadcast MyValue(r,x_i); // tutti i nodi fanno la proposta del proprio valore per il round r
	wait for n-f MyValue // Aspetto n-f messaggi MyValue, nel momento in cui ne ha n-f va avanti
	if(n_msg >= n/2 + 1 == x){ // se tra questi almeno n/2 + 1 contengono x
		Broadcast Propose(r,x);
	}else{
		Broadcast Propose(r,?);
	}
	// Adapt phase
	wait for n-f Propose 
	if( n_propose(r,y) >= 1){
		x_i = y;
		if(n_propose() >= f+1 == y){ // se ho ricevuto almeno f+1 Propose con lo stesso valore di y allora prendo la decisione sull'agreement
			decision = x_i; 
		}
	}else{
		x_i = random(0,1); // probabilità equamente distribuita
	}
	r = r+1
}
```
- La maggioranza di voti è data dal numero di nodi non faulty (n)/2 + 1 nonostante i non faulty siano n-f
###### Non triviality
- Tutti quanti iniziano con lo stesso valore iniziale
- Gireranno sempre e solo messaggi con il valore v e saranno sempre a sufficienza per superare gli stadi
	- n-f > n/2 (per le restrizioni iniziali)
- Osservazione
	- MyValue può contenere o 0 o 1
	- Posso ricevere al massimo n MyValue differenti
	- La maggioranza è uguale per tutte le entità (**a patto di non crash**)
		- non ci può essere una maggioranza di 1 per n_i e una maggiornaza 0 per n_y
	- Se un entità trova una maggioranza assoluta allora se girerà solamente messaggi di Proposta con quel valore di maggioranza, non può esserci un altra entità che manda avanti una Proposta con un altro valore di maggioranza(n/2 + 1) perchè significherebbe che il numero di nodi sarebbero + di n. 
###### Agreement
- Se un non faulty decide per v allora tutte le altre non faulty decideranno per v
-  guardarci meglio
###### Terminazione
- Non è detto che il protocollo termini, in generale ci aspettiamo che termini in un numero di round pari a O(n^2)
- r
	- Se x vede > n/2 MyValue(r,v)
		- x manda la Proposta(r,v) a tutti
	- Tutte le > n/2 entità  cambia il proprio valore a v
- r+1
	- ci sono > n/2 MyValue(r+1,v)
	- ci sono n/2 > f Proposte(r+1,v) messaggi
	- tutti decidono per v
- Se entità non vedono una maggioranza nella fase di Proposta, il protocollo non necessariamente termina nel round successivo
	- La probabilità che al passo successivo si veda una maggioranza >= probabilità che tutte le entità scelgano randomicamente lo stesso valore >= $$\frac{1}{2}^n$$
	- probabilità di successo in un round
		- $$p \ge \frac{1}{2}^n$$
		- probabilità di successo al round r
			- $$r = p*(1-p)^{r-1}$$
		- Numero di round attesi per il successo
			- $$\frac{1}{p} \le 2^n$$
#### Consenso Randomizzato - fault bizantini
- Restrizioni
	- grafo completo
	- connettività forte
	- tipo fallimento: bizantino
	- Id univoci
- faulty max  < n/9
- Idea
	- Ogni entità prova ad imporre il proprio valore
		- Se un entità non segue la proposta allora l'entità selezionerà un valore random tra i valori proposti dalle altre entità
- Protocollo
	- r = 1
	- decided = false
	- Broadcast propose(x_i, r)
	- ripeti
		- aspetta finchè n-f **propose** msgs del round r sono arrivati
		- if almeno n-2f msgs contengono lo stesso valore c
			- x_i = x
			- decided = true
		- else
			- if n-4f msgs contengono lo stesso valore x
				- x_i = x
			- else
				- random x_i con Pr[x_i = 0] = Pr[x_i = 1] = 1/2
		- r = r+1
		- Broadcast propose (x_i, r)
	- finchè decided
- **non-triviality**
	- Cosa vuol dire se tutti partono con lo stesso valore
		- Round 1
			- tutte le entità non faulty propongono il valore v
			- tette le entità non faulty ricevono almeno n-f >= n-2f proposte di v
			- Tutte le entity non faulty decidono per v
- **agreement**
	- Tutti i non faulty devono decidere sullo stesso valore (anche se non partono con lo stesso valore)
	-  X (entità non faulty) parte con un certo valore v in {0,1}
	- X ha ricevuto n-f messaggi con almeno n-2f proposte di v
	- x propone v
	- Per qualsiasi altro non faulty y != x
		- y aspetta per n-f messaggi
		- Ovviamente ci possono essere dei messaggi in comune con x
			- Il numero di mittenti differenti tra le due entità sono al massimo la quantità di faulty (f)
			- Ovviamente provenendo da mittenti diversi allora possono avere valori differenti rispetto a quello che ha visto x
		- Tra quelli che hanno in comune comunque y potrebbe vedere un valore differente dato che può essere un entità bizantina che ha inviato due valori differenti
		- (n-2f) - 2f = n-4f
			- se al mio numero di messaggi tolgo f mittenti che non sono in comune ed f mittenti che possono essere in comune che però potrebbero aver inviato valori differenti
			- Quindi bastano n-4f proposte con un valore v
	- Nel round r+1
		- tutte le entità riceveranno almeno n-f >= n-2f proposte per v e decideranno per v
- **Terminazione**
	- Facciamo vedere che in un round le proposte che girano da i non faulty quelle che non sono state scelte a caso sono tutti quanti concordi
	- Un entità non faulty x sceglie un valore v non a cso
		- Significa che ha ricevuto almeno n-4f mesaggi di proposta v
		- Almento (n-4f)-f = n-5f che arrivano da non faulty
	- Assumiamo che
		- una entità non faulty y != x
			- sceglie v' non a caso tale che v' != v
		- Significa che ha ricevuto almeno n-4f mesaggi di proposta v
		- Almento (n-4f)-f = n-5f che arrivano da non faulty
		- Y ha ricevuto almento n-5f messaggi con proposta v' da altre entità non faulty dall'entità x (ovviamente questo non può accadere per quello che segue)
		- Questa però è una contraddizione
			- n >= 2(n-5f) + f = 2n-9f = n + (n-9f) > n 
		- Questo significa che termino in un round in cui tutti quello che hanno scelto non a caso hanno scelto lo stesso valore (avviene sempre per quello detto sopra) e quelli che scelgono a caso scelgono un valore uguale a quello che non hanno scelto a caso
	- **Probabilità**
		- Da riguardare per bene