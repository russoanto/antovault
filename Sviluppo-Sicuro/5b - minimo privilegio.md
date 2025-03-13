## Definizione
- È necessario fornire ad un asset il privilegio minimo necessario per espletare una funzione specifica.
## Implementazione
### Rimozione privilegi SETUID
- Se un processo non esegue operazioni critiche tali da giustificare l'imposizione dei bit SETUID/SETGID è buona norma rimuoverli
```bash
chmod ug-s /path/to/binary
```
### Uso di privilege restore e drop
- Se un processo esegue operazioni critiche è necessario operare come segue
	- impostare il proprietario del binario a **root**
	- Attivare il bit SETUID
```bash
chown root /path/to/binary
chmod u+s /path/to/binary
```
- Prima dell'operazione critica effettuare l'elevazione dei privilegi **temporanea**
```c
setresuid(-1,euid,-1);
```
- Rilasciare temporaneamente i privilegi al termine dell'operazione critica
```c
settresuid(-1,uid,-1);
```
## Abbassamento privilegio nei servizi
 - Per impedire l'esecuzione di un server con privilegi elevati si riveda la sua configurazione
 - Si imposti un utente di servizio **senza privilegi extra**
	 - Unix mette a disposizione un utente specifico per tale scopo
		 - **nobody**
		 - **www-data**
## Esempi concreti
### Nebula - Level01
- Il binario /home/flag01/flag01 ha privilegi ingiustificatamente elevati
	- In questo caso si considera flag01 come un utente privilegiato
- il binario /bin/sh non abbassa i propri privilegi di esecuzione
- La vulnerabilità è un AND logico di tre debolezze
	- per annullarla è sufficiente inibire una delle tre
-  Mitigazione 1a
	- Si spenga il bit SETUID sul file eseguibile
		- chmod u-s /home/flag01/flag01
- Mitigazione 1b
	- Non sempre si può spegnere il bit SETUID, l'applicazione potrebbe averne bisogno
	- In questi casi i privilegi vanno rilasciati il prima possibile, per riacquisirli solo quando strettamente necessario
```c
  setresgid(gid, gid, gid);
  setresuid(uid, uid, uid);
```
- A questo punto possiamo implementare il rilascio temporaneo andando prima a leggere gli ID effettivi e reali
```c
  1 include <stdlib.h>                                                                                      
  2 #include <unistd.h>
  3 #include <string.h>
  4 #include <sys/types.h>
  5 #include <stdio.h>
  6 
  7 int main(int argc, char **argv, char **envp)
  8 {
  9   uid_t uid;
 10   uid = getuid();
 11 
 12   setresuid(-1, uid, -1);
 13   system("/usr/bin/env echo and now what?");
 14 }

```
- 10: leggo l'id reale del processo (level01)
- 12: mantengo id reale e salvato invariati e cambio l'id effettivo (che con setuid è flag01) con quello reale (level01)
- Mitigazione 2
	- TODO: non mi è chiarissima
### Nebula - Level07
- il file /home/flag07/thttpd.conf rivela l'esecuzione di **thttpd** con diritti dell'utente flag07
	- Va cambiato il file in modo da dare privilegi inferiori
- Modifico i file in modo da utilizzare un altra porta e un altro utente (level07)
- Eseguo una nuova istanza del server con la nuova configurazione
```bash
thttpd -C /path/to/thttpd.conf
```
- Su un altro terminale concludo l'attacco
```bash
nc localhost 7008
GET /index.cgi?Host=8.8.8.8%3B%2Fbin%2Fgetflag
```
- In questo caso mi esegue il ping e successivamente mi da il seguente errore
	- getflag is executing on a non-flag account, this doesn't count
