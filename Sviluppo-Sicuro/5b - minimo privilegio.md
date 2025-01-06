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
-  