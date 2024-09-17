Le percentuali che mostra sono cazzate. Il corso parlerà di protocolli e comunicazioni per specifiche applicazioni ma dobbiamo sempre considerare il goal finale, l'autonumus driving. La complessità di connessioni sono definite da una funzione quadratica, all'aggiunta del nodo n+1 devo aggiungere x*(x-1)/2 connessioni. Ad oggi abbiamo in media 80/100 ECU, in cui 1 ECU = 1 task. Nuove metodologie sono:
- distribuzioni di funzioni su diverse ECU (1 funzione distribuita per distribuzione del carico computazionale)
- integrazioni di più funzionalità su un unica ECU
L'idea è che un applicazione specifica richieda una funzionalità specifica questo porta ad avere una **domain based architecture**. Qui la complessità sta nella differenza tra le diverse reti presenti in un singolo veicolo. Un altro posibile organizzazione può essere la **zona based architecture**, ogni signola zona del veicolo è composta da specifiche ECU per un dominio. 

## Eletronics needs comunicazions
Abbiamo diversi protocolli per la comunicazione:
- Radio: solo input
- WIFI
- LTE: no garanzie
- GPS: solo input
- **V2X**
## Applicazioni Possibili
### Lane Assistent
Può essere attivo o passivo, uno fa solo un bip quando vado furi la corsia l'altro ha un controllo attivo sullo sterzo.
### Cooperative driving
utilizzato principalmente per risparmio carburante in un contesto industriale.

## Challenges
### Basic
- Throughtput delle comunicazioni
### Nel veicoloi
- Robustezza e costo delle comunicazioni
### Tra veicoli
- interoperabilità: non possiamo usare i cavi :)
- Raggiungibilità:
- Security: vogliamo essere sicuri su quali dati vanno fuori dal veicolo
- Pivacy
