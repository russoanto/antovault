# HTTP
- È human readable
- Stateless
- Lo scopo è l'accesso a delle risorse
- con # indichiamo i fragment (non vengono inviati al server) questo è il motivo del URL encoding nel caso di commenti sql inj
	- Per fare url encoding posso usare la console del browser dando il secondo comando: encodeURIComponent("test il")
- **Query**: sono opzionali e sono indicati nel seguente modo
	- varname1=value1&varname2=value2
	- Attenzione perchè in base al backand posso avere comportamenti differenti nel caso in cui voglia fare 
		- varname1=value1&varname1=value2
	- non è detto che prenda il valore 2
## HTTP Request
![[header.png]]
- Il server è costretto a rispondermi con la major version ma la minor può cambiare
- Le request GET non dovrebbe avere un **body**
- La codifica può essere di diversi tipi ma generalmente è: 
	- application/x-www-form-urlencoded
## Response
![[response.png]]
- Status line:
	- 1**: Informational Response
	- 2**: successo
	- 3**: Location change
	- 4**: Client error
	- 5**: Server error
## Biscotti
- Introdotti per aggiungere uno stato alla mia connessione http
- In generale sono utilizzati per
	- Gestione sessioni
	- Tracking
	- etc..
- Sono coppie chiavi valore
- Tra le varie meta informazioni sono
	- origin: il server che ha inviato il cookie
		- If a cookie named "foo" is set by "www.google.com", it cannot be sent to "www.microsoft.com", but only to "www.google.com"
	- expire date
	- Sec policy
# File Disclosure and Server-Side Request Forgery
- Accesso non autorizzato a file presenti nel server e creazione di richieste da parte del server
##  File Disclosure
- Individuare file contenente informazioni sensibili
- Come individuare questa debolezza?
	- Bisogna andare a controllare tutte le funzioni che si occupano di accedere a file
		- open/fopen (c,php)
## Server-Side Request Forgery
- In questo caso bisogna andare a controllare tutte le funzioni che interagiscono con gli url come curl e cercare di capire se l'input non viene sanitizzato correttamente
- come per il caso delle sqlinj possiamo avere delle blind SSRF

## ZipZip
- Non c'è nessun controllo sul tipo di file che posso caricare, questo significa che posso andare a caricare uno zip contenente un link simbolico alla mia risorsa
- CCIT{z1p-T0tally_is_4n_hyper_l1nk_fl4g_proce770r}
## SSRF basic
- php fa il leack della sua versione negli header