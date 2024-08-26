## Cos'è TLS?
TLS sta per transport layer security, in precedenza conosciuto come SSL. È unlivello aggiuntivo nello stack TCP/IP e lavora tra il livello trasporto e il livello applicativo e come garanzie di sicurezza abbiamo: **Confidenzialità**, **Integrità** e **Autenticazione** delle comunicazioni.  Organizzazione a 2 livelli:
- **Handshake**: 
	- Autenticazione tra Client e Server
	- Utilizzo di cifratura asimetrica per autenticazione mediante certificati
	- Negoziazione di un algoritmo di cifratura simmetrico accettabile per entrambi
	- Negozizione delle chiavi
	- Scambio di chiave "Master"
	- Scelta di metodi di compressione
- **SSl Record**: Provvede a trasferire di dati cifrandoli tramite la chiave simmetrica scambiata in precedenza
Un browser che supporta  SSL/TLS allora sarà dotato di una serie di certificati di diverse **CA** fidate. Qunando un server deve autenticarsi ad un client gli invia il proprio certificato firmato da una CA e il client si adopera per risalire la catena di certificati al fine di trovare uno fidato di cui si conosce la chiave pubblica. Il processo avviene anche al contrario ma è raro che il server debba autenticare un client, questo avviene in applicazioni critiche come quelle bancarie. L'integrità delle informazioni la si ottiene sfruttando le funzioni MAC, il messaggio viene divio in blocchi, viene calcolato il tag dei blocchi che poi viene cifrato insieme al messaggio.

## Come viene utilizzato nell'https?
https utilizza il sistemo di chiavi pubbliche/private di TLS.
- La pubblica per trasmettere la chiave di sessione
- La privata perchè la chiave di sessone è quella chiave condivisa utilizzata per la cifratura dei dati lato client e server
## Cosa si intende quando si parla di classi di attacchi TOC/TOU o di corse critiche?
Con TOC/TOU si intende time of check to time of use  e sono una categoria di attacchi che sfruttano un tempo delta che trascorre da una fase di controllo dell'autorizzazioni di accesso ad un assett e il suo utilizzo vero e proprio. Quello che può accadere se questo delta è abbastanza ampio è che verifico se per un utente x ci sono i permesi per la risorsa y (facciamo finta ci siano), a quel punto faccio altre cose nel mentre (in questo tempo x perde i permessi), dopo utilizzo la risorsa y anche se non ha più i permessi perchè in precendenza ha superato i controlli.  Queste sono anche conosciute come corse critiche perchè in programmazione parallela quando di sono dei thread mal gestiti, quindi in cui i lock e unlock non sono ben usati può capitare che l'accesso ad una risorsa nono sia gestito e questo porta ad avere un programma non deterministico in cui ad ogni sua esecuzione cambia output a seconda di quale thread raggiunge prima la risorsa. Come contromisure a questo problema abbiamo:
- Utilizzo di transazioni atomiche 
- Ristrutturare la logica del programma per evitare corse critiche
- Utilizzo delle risorse subito dopo che ne ho verificato i permessi
## Cosa c'entra NAT con la sicurezza informatica?
Il NAT è il network address traslation e è una tecnica attraverso cui un dispositivo di rete è in grado di rimappare un indirizzo ip esterno verso uteriori indirizzi ip interni. Questa tecnica è utilizzata per rializzare quella che è chiamata segmentazione e segregazione delle reti, pratica fondamentale per la sicurezza informatica dato che permette di diminuire la superficie d'attacco e essere più granulari sui permessi di accesso.

Voto: 28

## Cos'è una funzione hash e che caratteristiche deve avere una funzione hash?
Una funzione hash è una funzione che prende in input valori da un dominio potenzialmente infinito e forniscie in output un "digest" di lunghezza fissa, quindi l'output fa oarte di un dominio finito. La caratteristica fondamentale di queste funzioni è che sono one-way, cioè dato il digest è impossibile risalire al valore che l'ha generato. Deve avere una complessità computazionale molto bassa per la generazione del diget. In generale esistono due tipologie di funzioni hash:
 - Crittografiche: hanno la caratteristica che sono monodirezionali, pre-image resistent cioè dato m deve essere impossibile trovare un valore diverso da m che abbia lo stesso digest.
 - Non crittografiche

 • A cosa serve aggiungere un salt?

## Se volessi autenticare un documento, come lo farei?
Un documento può essere autenticato con la firma digitale, la fimra digitale sfrutta la crittografia asimmetrica solamente che il ruolo delle chiavi privata e pubblica è invertito. Infatti per autenticare un documento posso firmarlo con la mia chiave privata e può essere "decifrato" da tutti con la mia chiave pbblica. Quindi non parliamo di un sistema che garantiscie confidenzialità ma solo autenticazione. Questo sistema garantiscie anche la caratteriscita di non ripudio, non posso negare di aver firmato io il messaggio dato che la chiave privata è solo in mio possesso utilissima per applicazioni legali. Per avere segretezza autenticità e integrità quello che posso fare è:
- Calcolare il digest di un documento
- utilizzo la mia chiave privata per firmare il diget
- cifro tutto con la chiave pubblica del destinatario 

## Attacchi Dos
Sta per attacchi denial of service cioè attacchi che puntano alla negazione di un servizio, quindi rendere un asset inaccessibile e lo si può fare in due macro modi:
- **Sfruttare un bug**: utilizzo una vulenrabilità che mi permetta di compromettere l'usabilità del sistema
- **Attacco volumetrico**: punto a terminare le risorse fisiche del sistema (CPU,RAM Memoria fisica)
L'attacco può essere diretto o indiretto. L'idea è quella di consumare la banda della vittima sfruttando anche tecniche di amplificazione del traffico, queste tipologie di attacco si chiamano flooding, inondiamo la vittima con pacchetti di un protocollo qule può essere ICP, TCP, UDP.

## Le botnet sono usate solo per attacchi DDoS?
No le botnet possono essere utilizzate oltre che per degli attacchi volumetrici anche pr spam e diffusione di malware. In generale una botnet sono una rete di computer "zombie" che possono essere controllati da un unico computer master. IL controllo di questi computer è avvenuto probabilmente sfruttanto una qualche vulnerabilità. Botnet as a service.

## Caratteristiche di sicurezza della posta elettronica 
Il portocollo SMTP è in chiaro e non richede autenticazione, il problema è che nteragendo direttamente con un server SMTP è possibile inviare messaggi di posta con mittenti falsi. I requisiti per la posta elettronica sono:
- Confienzialità
- Autenticazione
- Integrità
- Non ripudiabilità (opzionale)
- Garanzia di invio
- garanzia di ricezione
Due Soluzioni possibili:
- S/MIME
- PGP/GPG
La differenza principale tra i due protocolli sono che S/MIME basa l'autenticazione tramite PKI e quindi CA mentre PGP si basa sul concetto di web of trust. Uno dei maggiorni problemi della diffusione di S/MIME ma in generale protocolli sicuri è la diffusione della web mail e il fatto che la cifratura impedisce di analizzare la mail agli anti malware. Quello che fa PGP è :
- hash del messaggio
- firmo hash con la mia chiave privata (RSA)
- Genero na chiave di sessione (pseudo-random)
- cifro messaggio e certificato con la mia chiave di sessione
- cifro la chiave di sessione con la chiave pubblica del destinatario
PGP utilizza web of trust cioè sistema peer to peer che non necessita di un enete di terze parti per la garanzia sui certificati. Il proncipio di base è che se noi ci fidiamo di B e B sifida ci C allora noi ci fidiamo di C. Un certificato di identità può essere firmato da altri utenti che attestno la mia "identità". I certificati hanno una scadenza.

 • Ci sono differenze nelle garanzie di sicurezza tra PGP e S/MIME?
## Attacchi MITM
 Un attacco man in the middle è un attacco in cui la comunicazione è intercettatta da una terza parte che ha accesso alle informazioni scambiate da due interlocutori su quel canale di comunicazione. L'attaccante può essere passivo o attivo, quindi può semplicemente intercettare tutti i messaggi che vengono inviati  e in questo caso basta avere una comunicazione cifrata per mitigare un attacco di questo tipo. Oppure attivo, cioè l'attaccante può fingersi una delle due controparti e modificare i messaggi inviati, la mitigazione avviene introducendo lntegrità ed eventualmente autenticazione.
Voto: 28


## Cos'è un attacco 0-day? Come si ci può difendere?
Un attacco 0-day è un attacco che sfrutta una vulnerabilità software non ancora pubblica, quindi c'è il caso che il vendor non sappia neanche della sua esistenza o se la conoce non l'ha ancora diffusa al pubblico. La potenzialità di un attacco 0-day è che i vari antivirtus non ne conoscono la firma quindi funzionano e senza destare sospetto. 

## Cos'è un honeypot?
Un honeypot è un tipo intrusion detecton system (operational based) particolare di progettato appositamente per essere vulnerabile con l'unico scopo di attirare malintenzionati e studiarne il comportamento avendo attivi li adeguati sistemi di analisi, traciamento e logging. La pericolosità di questi strumenti è che se messi in produzione, anche se separati dalla rete principale, possono comunque risultare un punto d'accesso per un malintenzionato che proverà a mettere in atto un movimento laterale. 


## Un antivirus come ci potrebbe proteggere da uno 0-day? Antivirus di tipo signature vs anomaly detection
Gli antivirus sono di due tipologie o signature based o anomaly detection I signatur based si basano su  un database di firme dei vari tipologie di malware, cioè caratteristiche note di campioni di malware analizzati in passato, questo significa che malware che sfruttano caratteristiche/firme non presenti in queste basi di dati non possono essere rilevate. Gli antivirus anomaly detection sono antivirus che sfruttano delle euristiche per il riconoscimento di attività "sospette" indipendentemente se conosciute o meno. La prima ha il vantaggio che fornisce pochissimi falsi positivi, quindi precisione molto alta, ma non è in grado di difenderci da attacchi 0-day per definizione. La seconda versione invece è molto meno precisa, quindi molti più falsi positivi ma potrebbe anche proteggerci contro attacchi 0-day.

## Cos'è un ransomware? 
È una tipologia di malware utilizzata per eseguire ricatti, quello che fa è andare a cifrare/eliminare tutti i dati sul disco  e richiedere un compenso in denare per avere la chiave di decifrazione. Ovvimante di parla di criminali, quindi pagare il compenso, tramite crittovalute, non significa riavere i dati.

## In cosa si occupa il ruolo di brocker?
È un ruolo presente nelle criminalità organizzate informatiche, questi ultimi sono coloro che riescono ad ottenere accessi inlleciti ai sistemi delle vittime:
- phishing
- attacchi tagret
Vendono questi accessi ai vari affiliati.

## Che tipo di crittografia utilizza un ransomware? Come lo faresti?
SIcuramente un ramsonware deve sfruttare la crittografia simmetrica  che per sua natura è decisamente più performante per cifrare dati in poco tempo a differenza di cifrature asimmetriche. INoltre la scelta può ricadere sia su un cifrario di flusso che uno a blocchi in questo contesto utilizzerei un cifrario a blochi dato che un cifrario di flusso richiderebbe chiavi di grand dimensioni e richiderebbe sfruttare un ottimo generatore di numeri pseudo-casuali.  #TODO: DA RIGUARDARE.

## Cos'è otp? Come funziona? È più sicuro di AES?
One time pad è per definizione l'unicio strumento di cifratura incondizionatamente sicuro, questa sicurezza è data dal fatto che per ogni testo da cifrare utilizzo una chiave randomica della stessa dimensione del testo che posso utilizzare solo una volta. QUesta sicurezza teorica non può essere sfruttata in pratica dato che è inpossibile riuscire a generare ogni volta una chiave differente (della dimensione di un testo), non si ha abbastanza entropia per farlo. AES è lo standard attuale per quel che riguarda la cifratura a blocchi, la sicurezza se si basa unicamente su auella che è la confidenzialità delle informazioni allora possiamo dire di si  a patto che per ogni messaggio si riesca a generare una chiave random differente. Invece il one time pad ha problemi di malleabilità, cioè andare a modificare l'iesimo bit cifrato significa andare a modificare l'iesimo bit in chiaro il che è un problema in contesti in cui abbiamo attacchi non passivi. I cifrari a blocchi affrontano il problema della malleabilità con la diffusione  e confusione. DIffusione significa che la modifica di un singolo byte si ripercuite su tutti gli atri mentre con la confusione significa che andiamo a rompere tutti quegli schemi che rendono il cifrario invulnerabile ad attacchi statistici.
Voto: 30

## Ciclo di vita delle vulnerabilità
- Introduzione di una vulnerabilità
- Exploit per sfruttare questa vulnerabilità
- La vulnerabilità viene trovata dal vendor
- Pubblicazione della vulnerabilità
In questi passaggi ci troviamo in uno zero day attack.
- FIrma antivirus rilasciata
- Patch rilasciata
- Deplyment della patch completato


## Come mai non tutti installano le patch?
Ingenerale effettuare aggiornamenti significa introdurre bug e incompatibilità software dovute a nuove dipendene. Questo significa che a volte dobbiamo interrompere il servizio e non sempre è possibile in contesti industriali.

## Come faccio a sapere che ho una vulnerabilità in un software che ho installato?  
#todo: non so bene come rispondere Controllo sul catalogo delle CVE 

## Se qualcuno trova una vulnerabilità cosa dovrebbe fare?
Se uno trova una vulnerabilità quello che può fare è riferire la vulnerabilità al vendor per far si che si trovi un fix anche provvisorio per la vulnerabilità. Successivamente quello che viene fatto è pubblicare la vulnerabilità di cui viene rilasciata una firma per gli antivirus  e successivamente c'è il rilascio di patch. Successivamente quello che viene fatto è aggiongere la vulnerabilità al catalogo CVE (common vulnerabilities exposures) a cui viene assegnato un id. Oltre a ciò viene anche inserito nel catalogo CVSS che va a dare uno score che identifica la pericolosità della vulnerabilità sulla base di diversi fattori tra cui:
- Metriche base: riguardano l'ampiezza del vettore d'acceso, la facilità e l'impatto su integrità confidenzialità e disponibilità
- Temporali: se esiste un expolit e di che tipo, se esiste un fix e di che tipo e se la vulnerabilità è confermata o meno.
- ambientali: danni collaterali, quanto danneggia il target
C'è anche il caso che la vulnerabilità possa essere venduta a dei malintenzionati.
## Cosa accade se si ci connette ad Unimore mediante https?
Innanzitutto sappiamo che stiamo utilizzando SSL/TLS cioè livello aggiuntivo per la cifratura della comunicazione che si interpone tra il livello trasporto e quello applicazione.  Per la fase di TLS quello che viene fatto è dopo aver instaurato una connessione TCP avviene l'handshake TLS che è la fase in cui c'è lo scambio dei certificati (solitamente solo del sevrer) con autenticazione. Poi sfrutto la crittografia asimmetrica per lo scambio di chiavi di sessione sulla base dei protocolli condivisi in precedenza. Dopo abbiamo la fase di TLS Record in cui c'è lo scambio di dati vero e proprio cifrati. In questo caso HTTPS è stateful c'è il concetto di sessione e non viene emulato con i cookie.
## Come fa un browser a verificare il certificato che viene ricevuto dal server? 
Ogni browser ha installati di default una serie di chiavi pubbliche di CA "fidate" (root), sapendo ciò quello che fanno è ricevere il certificato di un server  si verifica che la firma corrisponda al certificato ricevuo, controllo che le informazioni del server corrispondono a quelle del certificato ed controllo la catena di firme del certificato finchè non arrivo ad una CA fidata di cui ho la chiave pubblica. Per questo è fondamentale non istallare i broswer da terze parti. 
## Oltre alle firme digitali nella certificate chain viene controllato qualcos'altro?
- Identità del server
- Data scadenza del certificato
- verifico se il certificato è stato revocato o meno
- verifico se il certificato è presente nella lista dei certificati rilasciati dalla CA che l'ha fiirmato.
## Certificate Revocation List nel caso in cui la chiave privata è stata rubata
La CA pubblica una lista di certificati revocati che i cliente dovrebbero controllare regolarmente. OCSP.
Voto: 30

## Come firmare digitalmente un documento?
 Tramite firma digitale 

 • com'è fatto un digest?
## una azienda con due sedi distanti come crea una comunicazione sicura?
Un modo per avere sicurezza a livello geografico è sfruttando le VPN(virtual private network), questa può essere di due tipi:
- **linea dedicata**
- **linea a commutazione di circuito**
Il vantaggio di utilizzare una VPN è la sicurezza intrinseca che deriva dalla separazione fisica del canale di comunicazione. Come svantaggio ha che è molto costosa e poco flessibile. Abbiamo anche le IP-VPN cioè abbiamo separazione a livello di rete, quello che fa è incapsulamento Questo ci permette anche di sfruttare le reti pubbliche per la comunicazione il che è molto più flessibile. In questo caso il canale di comunicazione rimane Internet e la connessione sicura è a livello software nello specifico:
- **incapsulamento**
- **cifratura**
Per la parte di cifratura delle comunicazioni posso utilizzare o IPSec, quindi protocollo sicuro a livello di rete oppure SSL/TLS. Entrambi sono validi però IPsec è considerato molto rigido, soprattutto se consideriamo che bisogna gestire un dipendente in viaggio che si deve collegare alla rete aziendale.  Quindi per semplicità di realizzazione si preferisce SSL/TLS anche perchè c'è indipendenza dal sistema operativo.
Ovviamente tutto ciò introduce overhead e in generale complessità di configurazione. Ricordarsi che non c'è protezione a livello di end-point.
\
## Supponi di essere un gestore di sito web, ad un certo punto ricevi un DDoS, come ti difendi?
Ci sono diversi modi per difendersi da un attacco DDos tra cui:
- aumentare le proprie risorse (più memoria, cpu etc..)
- Utilizzare strumenti and Dos a livello di ISP
- Utilizzo di CDN, content delivery network: permettono di riderezionare il traffico di rete/trasporto su dei loro server. Utilizzo di WAF per proteione contro attacchi a livello applicativo.
Non esiste una soluzione definitiva ma rendono più complicata la realizzazione di un attacco di questo tipo.

 • Cosa può fare un ISP? #todo
## MitM su reti geografiche? (per lode)


## Cosa si intende con Social Engineering 
Utilizzo di tecniche psicologiche per ingannare delle persono al fine di ottenere informazioni riservate o accessi. Per fare ciò di solito si ricorre ad impersonificazione di identità fidate ad esempio.


## Come funziona un attacco SQL Injection 
Un attacco SQL injection è un attacco frutto di una mancata validazione di un qualche input che viene utilizzato per l'elaporazione di una query verso un DBMS. È una delle principali vulnerabilità software e permette di ottenere credenziali/accessi. L'idea per verificare se un software è soggetto a sql injection è quello di scaturire un errore inserendo caratteri interpretati da SQL in modo tale da generare un errore e se siamo abbastanza fortunati da vederlo. Aggiungere tautologie, condizioni sempre vere in modo tale che tutte le righe della tabella soddisfano la query.

 • Dove sta il problema? Qual'è la Vulnerabilità? Mi sembra evidente il problema
## Perché prepared statement risolvono? Come fanno? 
I prepared statement mi permettono di elaborare la query prima dell'inserimento dell'input, salvare il risultato e solo dopo filtrare per l'input inserito. Quello che fanno è separare l'elaborazione della query dall'inserimento dell'input, il che significa che non possiamo più iniettare codice arbitrario nel nostro database.

 • Come scoprire che un applicativo è vulnerabile? Ho già risposto 
## Proxy firewall 
Dispositivo di rete che si interpone tra client e server ed esamina il contenuto dei pacchetti a livello applicazione (esistono proxy firewall specifici per determinati protocolli). Gli application gateway sono un insieme di proxy firewall ognuno che lavora con portocolli applicativi differenti. Quello che va a fare è creare due connessioni differenti, una client proxy e l'altra proxy server. Il vantaggio è che consente l'analisi completa del protocollo applicativo di riferimento. Ovviamente ogni client deve essere appositamente configurato per contattare il proxy firewall e non direttamente il server. Questa parte i complessità di configurazione e quindi di scalabilità è stata risolta con il **Trasparent proxy** in questa implementazione il proxy risulta "trasparente" ai client che non richiedono configurazioni particolari e questo viene fatto tramite regole di natting.


## Si può usare con siti HTTPS? 
Si, dato che il proxy firewall instaura due connessioni separate, una con il client e una con il server quello che fa è che quelle due connesioni sono SSL/TLS, per entrambi, quindi posso analizzare il traffico cifrato. Ovviamente vanno configurati i certificati in modo tale che le validazioni delle identità nella fase di hadshaking vada a buon fine.

## NIDS: Come funziona, cosa logga?
Network intrusion detection system è un sistema di **rilevazione**, mentre con i firewall e NAC siamo a livello di prevenzione. In generale un IDS ha una componente di:
- **Analisi**: traffico di rete a vari livelli dello stack, log sistema
- **rilevamento** di attività sospette o illegali
- **allerta**
- **logging**
Nello specifico un NIDS si concentra su quelle che sono le attività di rete, ci sono anche quelli che si occupano sulle attività a livello di host. Non c'è l'analisi di attività a livello di sistema operativo o applicazione ma solo sui pacchetti di rete. **Non può intercettare il traffico cifrato**. 

## Attacchi di tipo XSS 
Vulnerabilità che riguarda tecnologie web, sfrutta la mancata sanitizzazione di input per iniettare codice di scritpting a fini malevoli ovviamente. Le vittime principali di una XSS è il sito stesso e i client che accedono al sito. Esistono due tipologie di XSS:
- **reflected**: è un attacco non persistente e l'input malevolo dell'utente viene utilizzato dal server per generare una pagina dinamica che viene restituita al browser. Nessuna informazione viene memorizzata nel sito, quindi solo chi inietta quel codice malevolo è soggetto all'attacco. (per questo l'attacco solitamente funziona convincendo l'utente tramite tecniche di ingegneria sociale a utilizzare un url che contiene l'invio al server dello script malevolo)
- **Stored**: In questo caso lo script viene igniettato nel server, quindi chiunque visualizzerà quella pagina, quindi con url validi, sarà soggetto all'esecuzione dello script. (POTENTISSIMO)
- **DOM Based**: non è più utilizzabile

## A cosa servono le VLAN
Le Vlan permettono la creazione di LAN a livello logico, non fisico, che di fatto aiutano nella segregazione e segmentazione della rete. A livello organizzativo permettono e facilitano l'analisi del traffico di rete tramite firewall, proxy firewall, IDS etcc. 

## Buffer Overflow 
Il buffer overflow è un attacco che si basa sull'inserire un input malevolo che vada a sforare il buffer di destinazione in modo o da creare una seg fault, corrompiamo la memoria, oppure iniettare codice abitrario in memoria in modo da cambiare il flusso del programma.

## Cos'è un APT
Advance persistant threat sono un gruppo organizzato, solitamente impiegato in cyberwar, con competenze tecniche molto alte, ingaggiati da governi o grandi aziende per fare esfiltrazione di dati o danneggiamenti a sistemi critici "avversari".

 • Come ci si difende? Non ci si difende
# Sicurezza incondizionata/computazionale 
La sicurezza incondizionata è quella condizione per cui abbiamo la dimostrazione che una determinata miura preventiva o tecnica di sicurezza non possa essere violata in nessun modo. Questo è difficile ad avere ed applicare in un contesto reale, un esempio è quello dell'OTP one time pad un cifrario simmetrico sicuro incondizionatamente. Il problema è l'appicabilità di quel sistema dato che richiede un livello di entropia per generare chiavi random troppo elevato. Ciò che abbiamo bisogno in sicurezza informatica è la sicurezza computazionale, cioè sappiamo che il nostro sistema è praticamente sicuro anche se non teoricamente. In crittografia utilizziamo una serie di funzioni che sono definite one-way perchè eseguirle in un verso è computazionalmente semplice, eseguire l'inverso non lo è, il che porterebbe un attaccante ad utilizzare decine di anni per ottenere l'inverso di una funzione, il che non è accettabile. 

## DES/AES 
Si trattano di due cifrari a blocchi (e non schemi di cifratura), quindi si parla di crittografia simmetrica. Essere dei cifrari a blocchi significa che loro lavorano solo con blocchi di lunghezza fissa, ad esempio AES lavora con blocchi di 128 bit. DES è un cifrario costruito sulla base delle Fiestel Networks, cioè un sistema con cu possiamo costruire dei cifrari a blocchi seguendo delle best-practies come confusione e diffusione. Abbiamo diverse cicli, per ogni ciclo il blocco viene divisio in 2 metà, una viene xorata con la stream key(data una chiave viene derivata una stream key che è la chiave che viene utilizzata per i singoli cicli) e l'altra parte finisce cos'ì com'è nel ciclo successivo ma in posizione opposta. L'idea è quella di aggiungere confusione e diffusione, cioè alla modifica di un signolo bit significa modificarne n in chiaro e con la confusione voglio eliminare tutti i pattern per eliminare l'analisi statistica. Questo lo facico con la s-box e p-box. **DES** lavora con blocchi e chiavi a 64 bit, dimensioni che ad oggi fanno si che non possa essere più utilizzato come cifrario. **AES** è nato dalla sfida per trovare un nuovo standard, a differenza di DES non lavora separando i blocchi ma lavorando sul blocco per intero, nello specifico di 128 bit. La chiave può essere di 128, 192 o 256 bit.

## MAC
Le funzioni hash non utilizzano nessuna chiave, quindi non c'èsegreto e di conseguenza non abbiamo ne autenticazione. Le funzioni MAC operano sul messaggio con una chiave calcolando quello che viene chiamato TAG. Mittente e destinatario devono condividere la stessa chiave, a questo punto posso calcolare il tag e inviarlo al destinatario insieme al messaggio. Eseguento il processo opposto il destinatario è sicuro che il massaggio si autentico ed integro. Ricordiamo che essendo che fa uso di un segreto condiviso non può essere utilizzato come una firma digitale, qui non abbiamo il non ripudio. Esistono varie tipologie di funzioni MAC tra cui le HMAC. Queste ultime fanno uso di funzioni hash crittografiche. Quello che viene fatto è andare a calcolare l'hash della concatenazione del messaggio con la chiave e concatenarlo con la chiave per poi calcolarne l'hash. Quello che otteniamo è il TAG.

## Proprietà digest/hash 
pre image resistent??

 • NIDS: già fatto
 • Problema di Bayes
## Supponi di essere un attaccante, a bordo della rete c'è un NIDS, come lo evadiamo? 
Per evadere un NIDS posso porvare o tramite insertion attacks o evasion attacks. L'insertion attacks consiste nell'inviare dei pacchetti che 

Posso fare attacchi Dos all'NIDS cioè vado a saturare CPU, RAM etc.. in modo che questo non possa funzionare. Un altra tecnica consiste nell'introdurre appositamente falsi positivi e in generale fare attacchi di disturbo.

## Parla di Diffie Hellman 
È un protocollo per lo scambio sicuro di chiavi, o in generale per lo scambio sicuro di un segreto condiviso su un sistema di comunicazione insicuro. Questo sistema sfrutta le funzioni esponenziali e il fatto che l'inverso di tali funzioni, logaritmiche, siano computazionalmente complesse da calcolare. Quello che viene fatto è in primo luogo scegliere un numero primp P e un generatore per il campo Z_p.  Solitamente queste informazioni vengono scelte da una sola parte, il server. Successivamente sia client che server scelgono una quantità privata:
- Alice seglie un valore segreto a con cui calcola x = g^a modp
- Bob seglie un valore segrto b con cui calcola y = g^b modp
- si scambiano queste informazioni e entambi calcolano la quantità xy = y^a/x^b 
Entrambi gli interlocutori ottengono una stessa chiave simmetrica

 • Cos'è E'DA 
## Cos'è un sistema SIEM
Security information and event management sono sistemi scalabili in grado di destire grandi volumi di eventi al secondo. I vari eventi vengono indicizzati e immagazzinati in dei database non relazionali. Tutti questi eventi possono essere processati da algoritmi ed eventualmente interrogati da interfaccia utente. Questi sistemi sono in grando di correlare, filtrare e riconoscere anomalie anche individuando dei pattern.  Un siem è diviso in:
- NOC: parte che si occupa di monitorare l'infrastruttura di rete al fine di garantire la continutità del servizio.
- SOC: parte che si occupa di raccolta e analisi di eventi.
- CSIRT: (open cert) non fanno monitoragigo ma si occupano di risposta agli incidenti

## Difese dei moderni OS per proteggersi da buffer overflow
- canary
- Randomizzazione dello spazio degli indirizzi
- Data execution prevention
- shadow stack: mantenere in due stack differenti i dati dagliindirizzi di ritorno delle funzioni
 • Certificate pinning 

## Firewall

## Perché i filtri stateful sono necessari? 
Perchè gli attaccanti possono utilizzare tecniche di frammentazione di pachetto, quindi avere la coneione di stato e analizzare i dati nel loro insieme è fondamentale per l'identiicazione di alcuni attacchi.

 • Posso fare degli attacchi a firewall stateful che non posso fare a firewall statici? (dos?) 
 • Un azienda deve far connetterne persone da remoto, cosa si può usare? VPN
 • Se hai utenti che si collegano via VPN ma hai anche un sistema di NIDS, è un problema 
 • Certificate Transparency 
 • Come si fa la fase iniziale di un attacco informatico, la scansione della rete? 

 • Cosa si intende per vulnerabilità software?
 • Esempi di vulnerabilità, che tipologie ci sono?
 • Supponi di lavorare in una azienda che ha sedi differenti, come possiamo instaurare un collegamento sicuro fra le sedi?
 • IPSec
 • Tunnel mode e Transport mode
Voto: 26

 • Cosa si intende con firma digitale?
 • Garanzie di sicurezza? Cosa si ottiene in più rispetto ad un MAC?
 • Cos'è un attacco 0-day?
 • Come posso rilevare un attacco che sfrutta 0-day?
 • Pro e contro di un sistema di anomaly detection
 • Dal punto di vista di un operatore SoC, ricevere un allarme di tipo signature base o di tipo anomaly base che cosa cambia? C'è differenza?
 • Cos'è un honeypot?
Voto: 28

 • Algoritmi di crittografia simmetrica
 • Quanto sono sicuri?
 • La lunghezza della chiave quanto influisce sul livello di sicurezza? Cosa vuol dire un livello di sicurezza di 128 bit?
 • Sistemi di Network Intrusion Detection
 • Attacchi su Network Intrusion Detection system
## Proprietà Bayessiana, perché l'abbiamo introdotta? 
È una caratteristica che riguarda tutti i sistemi di classificazione, tra questi anche gli IDS. Un sistema di questo tipo solitamente si valuta considerando il numero di falsi positivi, negativi e in generale tramite la probabilità condizionata che ci permette di calcolare quel'è la probabilità di avere degli allarmi solo quando ci sono delle reali intrusioni. Il problema è che per il calcolo di quest'ultima abbiamo che nonostante il nostro IDS è capace di individuare tutte le intrusioni effettive abbiamo che la probabilità di falsi positivi è moltiplicata per la probabilità che non ci sia un intrusione. 

## Come si può ridurre questo problema? (il problema del tasso base)
Per risolvere questo problema devo andare a tunare bene il mio IDS in modo da ridurre al minimo i falsi positivi altrimenti il mio sistema diventa inutilizabile.
Voto: 27

 • Cos'è un attacco di tipo XSS?
 • Cosa deve fare un'applicazione per essere vulnerabile a XSS?
 • Cosa può ottenere un attaccante?
 • Supponi di avere un'applicazione che è vulnerabile a XSS ma che di cui non si ha accesso al codice sorgente, cosa possiamo fare per difenderci? Web application firewall
 • Cos'è un Key Distribution Center? #todo
 • Come si stabilisce una connessione con il KDC? #todo
Voto: 30

 • Attacchi di tipo DoS
 • Come faccio ad esaurire la banda? È un attacco allo scopo di esaurire una risorsa logica o fisica?
## Metodi di amplificazione più moderni? 
Ad oggi si utilizzano servizi che siano in grado di amplificare, quindi con una piccola richiesta noi abbiamo una grande risposta, come il dns. La seconda caratteristica è che deve utilizzare il protocollo UDP e non TCP, perchè tutte le caratteristiche di amplificazione devono far uso di spoofing ip.  Se usassi TCP allora nonn riuscirei a portare a termine l'attacco perchè la vittima riceverà un syn-ak di un syn che non ha mai ricevuto. UDP è senza connessione. DNS è un servizio che rispecchia questa caratteristica. Un altro è mamcached.

## Come mi difendo da un attacco di questo tipo? 
Quello che faccio è contattare l'ISP che inserirà dei filtri geografici. Oppure la soluzione seria è che non tengo i miei servizi solo nella mia azienda. Pago un CDN che è in gado di distribuire i miei servizi su centinaia di server sparsi per il mondo in questo modo i bo non convergono più in un unico punto. In questo modo avrò poco traffico gestibile per 100 server differenti.

 • Come faccio a riconoscere se l'IP è spoofed?
 • Se usassi tcp il dns potrebbe essere utilizzabile come metodo di amplificazione? No
 • Cos'è un certificato digitale?
 • Cosa c'è all'interno di un certificato?
 • Avendo un certificato digitale e ho il dubio che qualcuno ha rubato la chiave privata, cosa effettuo?
Voto: 27

 • Vulnerabilità SQL-injection
 • Com'è possibile sfruttare una sql-injection?
 • Cosa si intende per tautologia?
 • A cosa serve la VLAN in sicurezza?
 • Certificate Transparency, cosa si intende?
Voto: 30

 • Cosa si intende con One Time Pad?
 • C'è un algoritmo di crittografia che simula questa proprietà? flusso
 • Caratteristiche di una funzione Hash per essere considerata sicura
 • Cosa vuol dire invertibile
 • Ciclo di vita delle vulnerabilità
 • Cosa c'entra il NAT nella sicurezza informatica?
 • Architetture Zero Trust #todo
 • Si può applicare a tutti i protocolli? ci sono delle limitazioni?
Voto: 30

 • Attacchi Buffer Overflow
 • Solo la shell code è utile per i buffer overflow
 • È possibile fare buffer overlow in altri linguaggi?
 • Cos'è un Security Operation Center?
 • Eventi di rete e Network Detection System
Voto: 28

 • Cosa si intende con il termine malware
 • Come possono essere rilevati i virus polimorfici?
 • Caratteristiche di sicurezza della posta elettronica
 • Differenze in garanzia di sicurezza tra PGP e S/MIME
 • Perchè il browser si fida di un sito con certificato digitale?
Voto: 30

 • Cos'è un firewall? #todo
 • Differenza packet filtering statico e dinamico
 • Esempio un attacco che può essere rilevato da un packet filter statico e da uno dinamico
 • Cos'è un Indicator of compromise in ambito di sistemi di monitoraggio di sicurezza?
 • Cosa si intende per Threat Intelligence?
 • Se dovesse costruire una applicazione che gestisce utenti con delle password, cosa farebbe per renderlo sicuro?
Voto: 24

 • Attacco MITM
 • ARP Spoofing
 • Cos'è una DMZ
 • Evadere il sistema di IDS basato su signature
Voto: 24

 • Cosa si intende per processo di gestione del rischio?
 • A cosa serve l'inventario?
 • Il rischio com'è definito?
 • Come faccio a comparare i rischi tra di loro?
 • Cosa faccio con un rischio? Azioni che posso fare sui rischi?
 • Vedere il rischio, trasferire il rischio, cosa vogliono dire?
 • Cos'è una VPN? Quali sono le garanzie di sicurezza?
 • Come funziona IPSec?
 • Quale è meglio usare tra IPSec e SSL per la realizzazione di una VPN?
 • Cosa sono le attività di scansione e fingerprinting e a cosa servono?
Voto: 27

 • Ransomware
 • Che tipo di crittografia posso usare?
 • Cosa si intende per crittografia asimmetrica?
 • Ci sono dei casi d'uso in cui la crittografia asimmetrica è sfavorevole da usare?
 • È più sicura o meno sicura di una simmetrica? 
 • Nei sistemi moderni cosa si usa?
 • Nei sistemi di posta elettronica? Si usa asimmetrica o simmetrica o entrambe?
Voto: 28

 • Attacchi MITM
 • Ci sono difese specifiche?
 • MITM su rete geografica
 • Se qualcuno impersonifica il sito di unimore, l'attacco funzionerebbe sul tuo browser?
 • Quali sono i controlli di validità che un browser fa?
 • Per quale motivo dovrei revocare un certificato?
 • Chi è che fa la revoca?
 • AES
 • Modalità operativa di AES
Voto: 30L

 • Cos'è una botnet?
 • Come ci si difende da DDoS basato su saturazione della banda?
 • Come realozzeresti una botnet?
 • Com'è fatto un sistema di security monitoring?
Voto: 30

 • Vulnerabilità XSS
 • Come possiamo difenderci se non abbiamo accesso al codice?
 • L'utilizzo di https rende inefficente un web application firewall? 
 • Cosa vuol dire firmare digitalmente un documento?
 • Quali sono le garanzie di sicurezza?
 • Cos'è un digest?
Voto: 30

 • Cos'è un MAC e cosa garantisce?
 • Differenza HMAC e firma digitale?
 • Differenza tra un MAC e un digest?
 • Sistemi di Network Intruson Detection 
 • I sistemi di NID che analizzano il traffico in real time cosa utilizzano? 
 • Problema del tasso base
 • IDS e VPN, vanno d'accordo?
 • Quali tipi di tecnologie esistono per realizzare le VPN?
Voto: 28

 • Cosa c'entra il NAT nella sicurezza informatica?
 • Le VLAN invece?
 • Tipologie di attacchi che posso mitigare attraverso filtri di pacchetto?
 • Vulnerabilità a sql-injection
Voto: 30

 • Ciclo di vita di una vulnerabilità
 • Se ho un sistema che non è più aggiornato cosa posso fare? 
 • Cos'è un proxy firewall?
 • E se l'applicazione utilizza dei protocolli non standard?
 • Se l'applicativo è web e utilizza https?
 • In TLS come fanno i client a scambiarsi la chiave?
 • Diffie Hellman
Voto: 30L

 • Come funziona la crittografia asimmetrica?
 • Perchè si necessitava di inventare la crittografia asimmetrica?
 • Come garantisco l'integrità?
 • Certificato Digitale
 • È meglio verificare con l'api la validità del vertificato o richiedere al server il time stamp? in quali casi?
 • Attacchi di negazione di un servizio
 • Quali difese ci possono essere?
 • Perchè tcp non va bene per il dns?
 • Utilizzo delle cdn o bloccaggio a livello geografico gli attaccanti
 • Cloudflare cosa fa?
Voto: 26

 • Vulnerabilità buffer overflow
 • Posso usare buffer overflow anche senza shellcode?
 • Si possono trovare buffer overflow in altri linguaggi?
 • Come funzionano i cifrari a flusso?
 • Perchè non usare sempre OTP?
 • Quali sono le caratteristiche di una funzione hash per essere crittografica?
 • Sistemi Intrusion Detection, cosa vuol dire il problema del tasso base?
Voto: 26

 • Quali sono le moderne procedure del sistema operativo per evitare buffer overflow?
 • Cos'è per esempio ASLR? Per stack Canary invece?
 • Come posso fare buffer overflow anche con lo stack non eseguibile?
 • Cos'è una VPN? Nomina qualche scenario d'uso
 • Come la realizzeresti?
 • Quando il browser si collega ad un sito https, cosa succede?
 • Certificate Transparency
 • Cosa accade se mi rubano la chiave privata?
Voto: 23

 • VPN
 • Quando scegliere SSL e quando IPSec?
 • Supponiamo di avere due sedi aziendali distrubuite geograficamente ed io vorrei usare un sistema di intrusion detection, è un problema avere il tunnel cifrato?
 • Cos'è un Key Distribution Center?
 • È più o meno efficiente di una CA?
 • Quando due client hanno effettuato una connessione sicura, la certification authority deve essere sempre online? 
 • Mentre per quanto riguarda il Key Distribuition Center bisogna essere sempre online?
 • Parlami delle SQL-injection
Voto: 27

 • Vulnerabilità XSS di tipo stored
 • Quali sono le caratteristiche di un sito web vulnerabile? Esempi di siti
 • Sistemi di Network Intrusion Detection
 • Quali sono i pro e i contro sull'agire su una copia del traffico rispetto ad uno attivo
 • Cos'è un MAC?
 • Quali sono le differenze in termini di garanzie di sicurezza tra MAC e firma digitale?
Voto: 24

 • Vulnerabilità di tipo Buffer Overflow
 • Il sistema operativo applica delle mitigazioni?
 • Cosa si intende per randomizzazione degli indirizzi?
 • Uno shellcode con queli privilegi viene eseguito?
 • Vulnerabilità di tipo TOC TOU
 • Mitigazioni per TOC TOU, posso solo usare sezioni critiche o ridurre le operazioni tra time of check e time of use? 
 • AES
 • Come si misura la sicurezza di questo schema?
Voto: 27