- Per questa challeng ci è stato dato un aiuto non da poco, cioè quello su funzionamento dei layer di docker
- La prima cosa che possiamo notare è il Dockerfile
```Docker
FROM ubuntu:20.04

RUN apt update
RUN apt upgrade -y
RUN apt autoremove

COPY flag_instructions.txt .

RUN head -n -1 flag_instructions.txt > temp
RUN mv temp flag_instructions.txt

RUN ls -al
RUN echo "The flag is stored in a secret place"

CMD sleep 1000
	
```
- Quello che notiamo è che nell'immagine viene prima copiato il file flag_instructions.txt nella home dell'immagine
- Successivamente viene copiato il contenuto ad eccezzione della prima riga su un file temp
- Temp viene rinominato flag_instructions andando a sovrascrivere il file originale
- Quello che sappiamo è che per ogni istruzione viene creato un "docker layer" che non è altro che un diff dall'istruzione precedente di cui viene eseguito un hash per l'identificazione
- Quello che dobbiamo fare quindi è trovare l'hash corrispondente al layer 
	- COPY flag_instructions.txt .
- Per farlo ho trovato un tool niente male che si chiama dive https://github.com/wagoodman/dive
	- basta inserire dive nome immagine e il gioco è fatto
## Spulciare le immagini presenti nel repo
- Per capire quale immagine scaricare e quali sono presenti nel repo il comando da fornire è il seguente
	- Prima cosa che dovrebbe essere scontata ma che per me non lo era è il login al repo
		- docker login imagescanner.challs.cyberchallenge.it -u cyberchallenge -p saf3pass
		- Le credenziali le ha fornite la challeng
	- Lista delle immagini disponibili
		- curl -u cyberchallenge:saf3pass https://imagescanner.challs.cyberchallenge.it/v2/_catalog
		- Qui bisogna sperare che i nomi delle immagini siano auto esplicativi
	- docker pull imagescanner.challs.cyberchallenge.it/cc-imagescanner
## Comandi docker utili
- Oltre a dive ho trovato altri comandi utili per spulciare i vari hash
	- docker history imagescanner.challs.cyberchallenge.it/cc-imagescanner
	- docker inspect --format='{{json .RootFS.Layers}}' 
		- con questo abbiamo tutti gli hash belli formattati ma non abbiamo riferimenti sul comando da eseguire
## Proseguo Challeng
- Una volta individuato il valore hash quello che dobbiamo fare è scaricare l'immagine come archivio
	- Sperando che non pesi molto con il seguente comendo
		- docker save -o image.tar  imagescanner.challs.cyberchallenge.it/cc-imagescanner:latest
- Spulciando l'archivio quello che possiamo notare è una cartella blobs che a sua volta contiene una cartella sha256 in cui sono contenuti tutti i diff nominati con l'hash corrispondente
- Il gioco è fatto basta fare un cat del file nominato con l'hash individuato e troviamo 
```
flag_instructions.txt0000644000000000000000000000013114757626574013564 0ustar0000000000000000a
a
a
a
a
a
connect to imagescanner.challs.cyberchallenge.it:37009 and send "umpalumpa39"
```
