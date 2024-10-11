Sta per web of thing, è una piattaforma di piattaforme che permette l'interoperabilità nell'IOT. Nel WoT deve esserci un web server con cui possiamo comunicare con i Things usando HTTPS. Quindi con le classiche richieste HTTPS (GET,POST,PUT ....) possiamo interagire con il WoT. C'è la necessità di interpretare i file JSON con cui vengono descritti i things. 

ABbiamo una struttura basata su più layer:
- layer 1: Accesso, basato su REST, ramite la struttura gerarchica possaimo inviare una query a qualsiasi livello.
- layer 2: La struttura gerarchica permette di individuare i vari things e le proprie capabilities
- layer 3: si tratta della condivisione si risorse anche che deve essere poter fatto tramite richieste url, quindi non bisogna utilizzare tanti protocoll differenti per le varie risorse ma il tutto si limita ad una query.
- Layer 4: SI parla di composizione, cioè sulla base di valori ottenuti da sensori specifici si possono triggerare altre azioni e questo lo si può fare anche con "linguaggi visuali"

### Issue Discover
per individuare i vari "things" esistono vari protocolli ma di base quello che si può fare è:
- inviare un messaggio sulla rete
- WoT thing risponde
- DNS viene aggiornato e da quel momento può essere individuato
### Modelli per WoT

- connessione diretta
- connessione gateway based
- cloud based
IN generale non mi interessa se i singoli thing comnuicano tramite bluethoot, coap o cos'altro. Io comnuicherò con il mio router seguendo le API del WoT.

### Issue: Semantic
Il problema principale data una descrizione di un thing (file json)è capire il significato delle proprietà, che sono scritte in linguaggio umano, quindi lato computer è capire cosa indicano. C'è un modello per i valori in modo da dargli un significato comune 

