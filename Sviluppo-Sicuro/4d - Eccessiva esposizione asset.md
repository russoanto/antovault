## Scenario
- Nei SO moderni le informazioni vengono memorizzate e recuperate in un ambiente simile ad una scrivania
- **File**: contenitore di byte arbitrari, a cui viene attribuito un significato tramite le applicazioni
- **Directory**: raccoglitore di file e directory
- **File system**: è una gerarchia di directory e file, ospitata su un dispositivo di memorizzazione.
	- Rappresentazione: **albero** o **grafo orientato**
- File e directory nel file system sono protetti da un meccanismo di accesso basato su **permessi**.
## Eccessiva Esposizione
- L'errore fondamentale sta nel non gestire e restringere gli accessi a singoli file e directory che sono di fatto degli **asset**
### Sfruttamento della debolezza
- L'attaccante controlla l'accesso di ogni asset interessato
- Se si individua un asset accessibile, lo si analizza alla ricerca di informazioni sensibili
- Se l'asset è anche scrivibile allora è possibile che vengano inserite/modificate informazioni sensibili
### Conseguenze dell'attacco
- L'attaccante può ottenere informazioni sensibili che gli permettono di 
	- Perfezionare l'attacco
	- Proseguire l'attacco su nuove vie
- Informazioni sensibili:
	- credenziali
	- percorsi file
	- configurazioni di sistemi lasciate a caso
	- documenti aziendali
### Esempi
#### Nebula - Level03
- Ci si rechi nella cartella /home/flag03
	- Quello che si nota è che abbiamo una cartella `writable.d` in cui abbiamo tutti i permessi
	- Si analizzi il codice sorgente dello script seguente `/home/flag03/writable.sh`
```bash
	#!/bin/sh
	
	for i in /home/flag03/writable.d/* ; do
	        (ulimit -t 5; bash -x "$i")
	        rm -f "$i"
	done

```
- Abbiamo un ciclo for che si ripete per tutti i file nella cartella writable.d
- Il file viene eseguito per 5 secondi tramite il comando bash
- Il file viene cancellato al termine dell'esecuzione
- Testo della sfida:
	- There is a crontab that is called every couple of minutes.
	- Si può intuire come ci possa essere l'esecuzione periodica dello script writable.sh con privilegi flag03
	- Per verificare questa congettura si può provare
	- su - nebula
	- sudo -i
	- su - flag03
	- crontab -l
##### Debolezze individuate
- permessi di accesso debolissimi per writable.d
- esecuzione periodica degli script in writable.d con privilegi di flag03
##### Exploit
- Creo uno script bash tale che
```bash
#! /bin/bash
cp /bin/bash /home/flag03/bash
chmod u+s /home/flag03/bash
```
- Questo script crea una BASH SETUID **flag03** nel file /home/flag03/bash
- Piccola chicca per attendere e vedere il momento esatto della creazione della bash
	- watch -n 1 ls -l /home/flag03 (aggiorno ls ogni secondo)
- L'esecuzione della bash deve avvenire con **-p**
	- Bash di default abbassa i privilegi effettivi per motivi di sicurezza. L'opzione -p consente di mantenerli
#### Nebula - Level05
- Si esamini la cartella **/home/flag05**
- Una prima cosa che salta all'occhio è che la cartella .backup è accessibile a tutti
	- L'archivio che è presente all'interno è accessibile a tutti in lettura
- Si copi in locale e lo si estragga
	- Il contenuto è nella cartella .ssh
- Presumibilmente sono le credenziali ssh (chiavi pubbliche e private rsa) dell'utente flag05
	- SI provi l'accesso
	- ssh -o -o PubkeyAcceptedKeyTypes=+ssh-rsa -i .ssh/id_rsa flag05@ip
#### Nebula - Level06
- Andando ad analizzare il file /etc/passwd quello che si nota è che per l'utente flag06 abbiamo l'hash e non una x
- Nello specifico è in un formato **legacy** cioè si trova in etc/passwd e non in /etc/shadow
- Per identificare il tipo di hash si utilizza il comando **hashid**
- L'output che otteniamo da hashid è il seguente
```
--File 'flag06_hash.hash'--
Analyzing 'ueqwOCnSGdsuM'
[+] DES(Unix) [Hashcat Mode: 1500]
[+] Traditional DES [Hashcat Mode: 1500]
[+] DEScrypt [Hashcat Mode: 1500]
--End of file 'flag06_hash.hash'--
```
- DES è un cifrario molto vulnerabile, proviamo con un attacco a dizionario tramite hashcat.
- Usando la lista rockyou riesco a romperlo
#### Nebula - Level 08
- Analizzando la cartella quello che noto è che ho un file capture.cap che è accessibile a tutti gli utenti in lettura
- È una traccia di traffico che può suggerirci delle informazioni tra l'interazione tra due o più asset
- Analizzo il traffico tramite wireshark
	- Ordino i pacchetti tramite una gerarchi di protocolli
	- Quello che scopro è che oltre la metà dei frame ethernet è associati ad un protocollo sconosciuto
	- A questo punto posso andare a filtrare i pacchetti andando a selezionare solo quelli interessati
	- Una volta filtrati, clicco sul promo e seguo il flusso TCP in modo tale da ricostruire il messaggio
	- SBAMM -- password in chiaro
		- backdoor...00Rm8.ate
	- mmm strana, indaghiamo di più
		- Andando a fono scopriamo che i punti corrispondono al carattere 7f che è il DEL
		- Questo significa che la password di flag08 è backd00Rmate
#### WFP - FIle Include 1
- Si esamini la dir /home/user, quello che notiamo è che è accessibile a tutti
	- Quali file sono leggibili? Un pò 
	- Ricordiamoci che abbiamo una pagine che soffre di local file inclusion
	- Quello che possiamo fare è dare in pasto alla nostra pagina vulnerabile, invece che una pagina php legit il .bashrc dell'utente che erroneamente è leggibile da tutti
	- Il risultato è che in output abbiamo il bashrc dello user