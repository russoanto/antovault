- request di base non genera eccezioni nel caso di risposta 500 o 400 de server
## Command Inj
- Code/command execution is a common flaw that arises when unsafe input is interpreted/executed by an application
> Guardare OWSAP top 10 vulnerabilità e cheatsheet
- Anche per la comman inj è utile per capire se il comando è stato inj correttamente
- DNS pinback
	- può tornare molto utile fare request dns così il server può risolverlo
	- È più raro che un firewall blocchi le richieste dns
## Macchine da fare
- Quando torna online WS_03 - CyberFunctions
## Sql inj
- Stiamo partendo dalle tautologie di base
	- Far scattare errori etc
- Può tornare utile db fiddle
- Devo fare attenzione ai LIMIT, cioè capire se lato MySql mi ha limitato i risultati, questo problema l'ho risolto cambiando l'urlo in questo modo
	- http://yetanotherblog.challs.cyberchallenge.it/post.php?id=%27%20OR%201=1%20%23%20
- 

## Vulnerabilità logiche
- Leggere il codice e capire se ci sono degli errori logici
- **Insecure Direct Object Reference**
	- È il caso in cui abbiamo accesso a dati di utenti senza forzare l'autenticazione
	- Esempio vimeo
- Guardare come funziona parseInt di javascript p