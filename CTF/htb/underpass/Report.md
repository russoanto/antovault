- ip: 10.129.234.45
## nmap scan
- niente di interessante c'è un web server apache2
## ffuf
```
ffuf -u "http://<TARGET_URL>/FUZZ" -w <WORDLIST> -e <EXTENSIONS>
```

```
snmpbulkwalk -c public -v2c underpass.htb
```
## Dalorarius
- È un interfaccia web per la gestione dei server radius
- non trovo la login page maledetta
	- https://kb.ct-group.com/radius-holding-post-watch-this-space/
- Le credenziali sono quelle di default
	- username: administrator
	- password: radius
- Cercando un attimino ho trovato l'MD5 di un utente
	- 412DD4759978ACFCC81DEAB01B382403: underwaterfriends
