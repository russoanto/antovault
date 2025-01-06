## Basic UNIX security review
### Utenti e gruppi
- Un SO UNIX è organizzato per utenti e gruppi 
- **uente**: astrazione di un utente umano 
	- ha uno **username** ed un **user ID**
- **gruppo:** astrazione di un insieme di utenti
	- ha un **groupname** e un **groupID**
### Permessi di un file
- In UNIX tutto è un file, file "regolari", file "speciali" di dispositivo, socket etc..
- I permessi di accesso sono **tre** terne di azioni per altrettanti gruppi di utenti
	- **gruppi**:
		- creatore
		- gruppo di lavoro
		- resto del mondo
	- **Azioni**:
		- Read
		- Write
		- eXecute
			- su un file significa che si può eseguire
			- su una cartella significa che ci si può entrare
### Rapresentazione dei permessi
- **Ottale**
	- read -> 4
	- write-> 2
	- execute-> 1
	- Esempio:
		- rwxrwxr-x -> 4+2+1 4+2+1 4+1 -> 775 -> 0775
- **Simbolica**
	- Azioni
		- Read -> r
		- Write -> w
		- eXecute -> x
	- gruppi
		- Creatore -> u
		- Gruppo -> g
		- Altri -> o
	- Esempio:
		- rwxrwxr-x -> ug + rwx, o + rx
### I bit di permessi SETUID/SETGID
- In realtà esiste un altro permesso rappresentato dal bit **SETUID**
	- **ottale:** 4(primo digit)
	- **simbolica**: s
- Analogamente esiste il bit **SETGID**
	- 2 (primo digit)
	- s
### Privilegi di un processo in esecuzione
- Un processo in esecuzione assume le credenziali (userID, groupID) si un utente
- In condizioni **normali**(SETUID e SETGID disattivati) 
	- UserID -> di chi ha lanciato il comando
	- GroupID -> groupID primario di chi ha lanciato il comando
#### Con SETUID attivo
- Se il bit SETUID è attivo
	- UserID -> userID del creatore del file
- Se il bit SETGID è attivo
	- GroupID -> groupID primario del file
- È possibile cambiare la persona "effettiva" che esegue il file!
### Individuazione Sistematica
- Per individuare sistematicamente tutti i file SETUID e SETGID è possibile usare il comando **find** con l'opzione -perm
	- find / -perm -6000
		- Il - davanti a 6000 significa che devono essere presenti dei permessi che partono ALMENO da 6000
		- 6000 indica che group id è 2 e setuid è 4 (4+2 = 6)
		- quindi con solo 4000 cerchiamo tutti i file con setuid attivo
### Utente e gruppo reale
- Nei SO UNIX il descrittore di un processo memorizza una prima coppia di credenziali: **user ID reale** e **group ID reale**
	- User ID reale -> user ID di chi ha lanciato il comando
	- Group ID reale -> group ID primario di chi ha lanciato il comando
- La seconda coppia memorizzata è: **user ID effettivo** e **group ID effettivo**
	- Se SETUID e SETGID sono disattivati:
		- User ID effettivo -> user ID di chi ha lanciato il comando
		- Group ID effettivo -> group ID primario di chi ha lanciato il comando
	- Se SETUID è attivo
		- User ID effettivo -> user ID del creatore del file
	- Se SETGID è attivo
		- Group ID effettivo -> group ID del gruppo del file
### Algoritmo di controllo dei permessi
- Le credenziali **effettive** del processo sono messe a confronto con i permessi di ogni elemento del percorso di un file
- Se le credenziali sono sufficienti per ogni elemento del percorso allora
	- Permesso accordato
- Altrimenti
	- Permesso negato
- Il comando **namei** consente di visualizzare l'algoritmo di controllo dei permessi su un file arbitrario
### Abbassamento e ripristino dei privilegi
- Se l'applicazione non svolge operazioni critiche può decidere di abbassare i propri privilegi a quelli dell'utente che ha eseguito il comando(**privilege drop**)
- Quando l'applicazione svolge operazioni critiche, ripristina nuovamente i privilegi ottenuti tramite l'elevazione automatica(**privilege restore**)
### Utente e gruppo salvato
- Nei SO UNIX moderni si usa una terza coppia di credenziali: **user ID salvato** e **group ID salvato**
- Quando parte un processo, le credenziali "salvate" contengono una copia delle credenziali "effettive"
	- user ID effettivo -> user ID salvato
	- group ID effettivo -> group ID salvato
- È possibile ripristinare i privilegi a quelli effettivi andando a "pescare" il valore dell'ID salvato
### Privilegio elevato ed appropriato
- Lo standard POSIX distingue i due concetti di:
	- privilegio elevato -> pieni poteri di **root**
	- privilegio appropriato -> un privilegio sufficiente a svolgere una operazione specifica
- Nei moderni SO GNU/LInux è possibile acquisire il privilegio appropriato in modi diversi
	- Diventare root reale
	- Diventare root effettivo
	- Acquisire la capability CAP_SETUID
### Recupero user ID reale ed effettivo
- la chiamata **getuid()** ritorna l'ID reale del processo invocante
- la chiamata **geteuid** ritorna l'id effettivo del processo invocante
### Impostazione user ID
- La chiamata di sistema **setuid(UID)** permette il cambio degli ID utente di un processo al valore uid
- Se il processo ha un privilegio appropriato
	- ID effettivo = Id reale = UID salvato = uid
- Se il processo non ha un privilegio appropriato
	- If uid = id reale or uid = ID salvato -> ID effettivo = uid
	- Negli altri casi ERRORE
- Oltre a **setuid** abbiamo anche **seteuid** che utilizza lo stesso algoritmo e va a modificare anch'essa lo user ID effettivo
	- PERCHE????
	- Perchè inizialmente setuid non permetteva il rilascio temporaneo cosa che fa seteuid
### Sistemi Operativi GNU/Linux
- I sistemi operativi GNU/Linux implementano la **Linux Standards Base LSB**
- LSB è un evoluzione della Single UNIX Specification, l'evoluzione attuale POSIX il più possibile.
	- Non è un implementazione 1:1
- Perchè?
	- **costo**
		- Certificarsi POSIX/SUS costa tempo e denaro
	- **Errori nello standard**
		- Lo standard POSIX/SUS presenta diversi difetti
		- Le funzionalità di POSIX/SUS che sono giudicate insicure, non performanti o sbagliate, GNU/Linux sopperisce con i propri meccanismi
		- Esempio
			- **setresuid** arricchisce e semplifica **setuid**
#### Recupero degli user ID
- È possibile recuperare tutti gli user ID del processo invocante tramite la chiamata di sistema **getresuid()**
	- Anche lo user ID salvato
- A differenza delle funzioni precedenti, si passano i puntatori degli userID (saranno popolati dal kernel)
- Esiste anche la controparte per impostare tutti gli ID tramite la chiamata di sistema **setresuid()**
	- Algoritmo di funzionamento
		- u/e/s = -1 -> UID/EUID/SUID non viene modificato
		- UID effettivo = 0 -> UID/EUID/SUID=u/e/s(qualunque)
		- UID effettivo != 0 AND (u = ID reale/effettivo/salvato)
			- ID reale = u
		- UID effettivo != 0 AND (e = ID reale/effettivo/salvato)
			- ID reale = e
		- UID effettivo != 0 AND (s = ID reale/effettivo/salvato)
			- ID reale = s
		- Negli altri casi errore
#### Abbassamento permanente privilegi
- L'abbassamento permanente dei privilegi si ottiene impostando tutti gli user ID ad un valore non privilegiato
	- **setresuid(uid, uid, uid)**
- In seguito, gli UID reale, effettivo e salvato non potranno che assumere il valore **uid**
- Il ripristino a **root**(ID 0) è impossibile
#### Abbassamento temporaneo privilegi
- L'abbassamento temporaneo dei privilegi si ottiene impostando lo user ID effettivo ad un valore non privilegiato
	- **setresuid(-1, getuid(), -1)**
- In questo modo si preserva lo user ID salvato e si può effettuare il ripristino in seguito (con -1 non modifico l'id)
- Il ripristino temporaneo dei privilegi si ottiene impostando lo user ID effettivo ad un valore privilegiato
	- **setresuid(-1, privileged_ID, -1)**
## Esecuzione con privilegi inutilmente elevati
### Problemi mancata gestione
- **Ottenimento di un privilegio enorme**
	- Se non sono presenti altre contromisure, un processo SETUID/SETGID ottiene i pieni poteri dell'utente privilegiato
		- Se l'utente privilegiato è **root**, il processo può fare tutto
- **Ottenimento per l'intera esecuzione**
	- Se non sono presenti altre contromisure, un processo SETUID/SETGID mantiene il privilegio elevato per l'intera esecuzione
		- Una qualunque debolezza nel programma può essere attaccata per ottenere il privilegio
## Sfruttamento della debolezza

### Strategia dell'attaccante
- L'atteggiamento di un attaccante nei confronti dei binari privilegiati è evidente
## Conseguenze dell'attacco
- Il conferimento dei pieni poteri di **root**(laddove non necessari) è una debolezza
- Non si può parlare di vulnerabilità
- Se un programma è scritto in maniera corretta la sola elevazione automatica dei privilegi non può dare alcun vantaggio ad un attaccante
## Esempi concreti
### Nebula - level00
- Si individui i file con SETUID che esegua con le credenziali di falg00(quello che ci serve per ottenere la flag)
	- Per farlo eseguo il comando
		- find -perm -4000 -user flag00
- Trovato il binario la challeng è presto fatta
### Nebula - level01
- con lo stesso comando vado a cercare un binario con SETUDI
	- Lo trono nella cartella /home/flag01
```c
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <stdio.h>

int main(int argc, char **argv, char **envp)
{
  gid_t gid;
  uid_t uid;
  gid = getegid(); 
  uid = geteuid(); //effective user id (flag01)

  setresgid(gid, gid, gid);
  setresuid(uid, uid, uid); // imposto i miei id (efettivo, reale e salvato) pari a quello effettivo (quindi di flag01)

/*
	In questo caso eseguo un comando di sistema, un echo, per una stampa. Il binario di echo non è quello interno al sistema ma utilizzo il binario presente nell'env
*/
  system("/usr/bin/env echo and now what?");
}
```

### Protostar - Stack05
- Anche in questo caso il binario ha il SETUID attivo e come creatore del file abbiamo l'utente privilegiato **root**
```c
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char **argv)
{
  char buffer[64];

  gets(buffer);
}
```
- Quando eseguo questo codice, il processo ottiene inizialmente i privilegi effettivi dell'utente root
- Non c'è nulla che faccia abbassare di privilegi nel codice