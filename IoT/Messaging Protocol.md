Architettura delle comunicazioni:
- mesh
- albero gerarchico
- stella
Adesso ci troviamo al livello di messagistica dello stack in cui possiamo trovare diversi protocolli come HTTP, MQTT, CoAP etc.. In generale abbiamo 2 tipologie di paradigmi che sono:
- publisher-subscriber (MQTT)
- request-response (HTTP)
## CoAP
protocollo molto piccolo e con un piccolo header, non ha agigunto molto altro. 

### Perchè non HTTP?
Molto potente ma quello che comunichiamo per la maggior parte è header con un piccolo payload, il che non è l'ideale in un contesto IoT.

### Scambio di messaggi
![[coap_mssg.png]]
Il NON è una sorta di ack, se questo non viene ricevuto io reinvio il messaggio. Nel caso in cui la ric
hesta richeda molto tempo allora quello che può fare è inviare un ack provvisiorio al client e inviargli una risposta successivamente. Per la comunicazione tra HTTP client e CoAP server abbiamo bisogno di un **CoAP proxy** nel mezzo che esegue le coversioni tra header http in CoAP in maniera efficente. 
#### Observation
![[obs.png]]
CoAP permette le osservazioni che dopo una prima fase di richesta da parte del client al server riesco ad ottenere gli aggiornamenti dal server ogni volta che il valore osservato cambia.

#### DIscoverability
Il client deve conoscere l'url del server , ma nel caso in cui non lo si conosce si può inviare una query a tutti i CoAP nodes che risponderanno alla query.

## MQTT
Non abbiamo client e server ma abbiamo publisher e subscriber. I dispositivi si sottoscrivono per ricevere i dati e quando questi dati vengono pubblicati allora i dispositivi sottoscritti al topic riceveranno una notifica. Tra le parti troviamo **MQTT Broker** che riceve tutte le richieste di sottoscrizione e gestisce le pubblicazioni. I client non si connettono mai tra di loro ma si passa sempre attraverso il broker.

### Overview
![[mqtt.png]]
I vantaggi di questo sistema è che i vari dispositivi non devono conoscersi tra di loro. In questo modo andiamo ad evitare il polling di messaggi. 

### MQTT msg connection
![[mqtt_msg.png]]
I lastWill (testamento) stanno ad indicare tutto ciò che deve essere comunicato dopo la disconnessione.

### Publish
![[mqtt_publish.png]]

### MQTT Topic
I topic vengono definiti in modo gerarchico, i livelli dei topic sono definiti dagli /.
Nei topic si possono utilizare le wildcard:
- +: indica un singolo livello di wildcard
- "#": indica wildcard su più livelli
Esempi:
- home/garden/temperature
- home/# 
	- se pubblico qualcosa in home allora lo ricevo
- home/livingroom/+
	- se pubblico qualcosa in home/livingroom allora non ricevo nulla, mentre se pubblico su home/livingroom/{qualcosa} allora lo riceverò
Abbiamo anche i **system topic**, rigardano i broker mqtt, questi topi riguardano i dati riguardanti l'mqtt broker.

### QoS
Abbiamo 3 livelli di quality of service:
- 0: è una spedizione best effort, se il messaggio non viene ricevuto me ne frego
- 1: **at least once**, il broker deve inviare un ack di ricezione del messaggio, fino ad allora il client prova ad inviare il messaggio
- 2: **exactly once**: qui quando la comunicazione è andata a buon fine c'è un messaggio di fine connessione come nel TCP 3 way.
![[qos.png]]
### Persistent Sessions
In caso di sessione persistente se un device si disconnette, allora quando si riconnette allora viene nuovamente sottoscritto ai vecchi topic cosa che non accade nelle sessioni non persistenti.


## AMQP
Advance messaging queing protocol è in grado di connettere ambienti eterogenei. Sfrutta connessioni asincrone e peremtte la comunicaione di messaggio complessi tramite l'utilizzo di code.
![[ampq.png]]
Lato applicazione devo specificare il routing da utilizzare, per questo è definito un protocollo programmabile.