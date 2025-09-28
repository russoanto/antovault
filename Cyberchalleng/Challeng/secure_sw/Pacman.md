- La prima cosa che noto è che il binario è strippato (non ho simboli quindi da gdb è dura)
	- La cosa da fare per ricostruire il codice è trovare libc_start_main e vedere quale funzione invoca
		- Quella sarà il nostro main
- La prima cosa che noto da ida è la seguente
```c
  if ( argc != 2 || ptrace(PTRACE_TRACEME, 0LL, 1LL, 0LL) == -1 )
    return -1;
```
- Questo significa che se non gli passo un argomento oppure se il programma viene debbuggato allora esco subto
	- Per verificare che il processo è eseguito da un debugger utilizzo ptrace
	- (anto del futuro): visto che sto impazzendo e non riesco ad analizzare il codice staticamente ho cambiato questa condizione in modo tale che il codice esegua solo se viene debbuggato
- secondo punto nel main è 
```c
clock_gettime(0, &tp);
```
- Faccio partire un timer, ci servirà dopo
- infine chiamo la funzione start_game passandogli come parametro il primo parametro del main
	- la funzione non si chiama realmente start_game, è per questioni mnemoniche
```c
start_game((char *)argv[1]);
```
- La funzione start_game ha come cuore un **ciclo infinito** che esegue i seguenti passaggi
```c
clock_gettime(0, &tp); // nuovo timer
char v1 = game_zone[x][y]; // estraggo un carattere dalla mia game_zone
```
- Che cos'è questa game zone? È un array di puntatori a stringhe così composto
```
pacmanpacman
cho4$aaagioc
caaarmmmmmmc
cz1pia66600c
cx4p2c00666c
cg8a2pacmanc
ci_cz737373c
co1pacpaconc
c4____pac0ac
czxgioN1234c
c0ZXGIOacpac
pacmanpacman
```
- Il carattere selezionato viene modificato con la seguente aggiunta
```c
char_mangiato = v1 + sub_AE8(::tp.tv_sec, ::tp.tv_nsec, tp.tv_sec, tp.tv_nsec);
```
- Dove **sub_AE8** è la funzione che restituisce un intero corrispondente al tempo impiegato tra i due timer avviati --> non ne sono certo al 100%
- Ultimo blocco fondamentale
```c
    switch ( char_mangiato )
    {
      case 'a':
      case 'c':
      case 'm':
      case 'n':
      case 'p':
        goto LABEL_3;
      default:
        // controllo che il carattere sia alfa numerico
        if ( ((*__ctype_b_loc())[char_mangiato] & 0x400) == 0
          || (v2 = v8,
              ++v8,
              s[v2] = char_mangiato,
              game_zone[x][y] = 97,
              ((*__ctype_b_loc())[char_mangiato] & 0x100) == 0) )
        {
          if ( !*a1 )
          {
LABEL_3:
            puts("Game over.");
            exit(-1);
          }
          v4 = a1++;
          v5 = *v4;
          if ( v5 == 'j' )
          {
            ++x;
          }
          else if ( v5 > 'j' )
          {
            if ( v5 == 'k' )
            {
              --x;
            }
            else if ( v5 == 'l' )
            {
              ++y;
            }
          }
          else if ( v5 == 'h' )
          {
            --y;
          }
          continue;
        }
        get_flag(
          (unsigned __int8)s[0],
          (unsigned __int8)s[2],
          (unsigned __int8)s[4],
          (unsigned __int8)s[5],
          (unsigned __int8)s[6]);
        return __readfsqword(0x28u) ^ v13;
    }
```

- Quando la condizione nell'if è falsa allora eseguo la funzione get_flag
	- Se il carattere NON è alfanumerico, entra nell'`if`
	- Se il carattere è alfanumerico:
	    - Lo salva nell'array `s`
	    - Incrementa il contatore `v8`
	    - Sostituisce il carattere nella mappa con 'a'
	    - Verifica se il carattere NON è una cifra decimale
	    - Se non è una cifra, entra nell'`if`
	    - Se è una cifra, NON entra nell'`if` e procede a chiamare `get_flag()`
	
	- Quindi, la chiamata a `get_flag()` avviene quando il carattere raccolto è una cifra decimale (0-9). L'`if` controlla i casi in cui NON dobbiamo chiamare `get_flag()`, e quando la condizione risulta falsa, il programma esce dall'`if` e chiama `get_flag()`.
> info utile: "6B20657479622D323320646E61707865h" che convertita in bytes (little endian) è "`expand 32-byte k`"

- In clonclusione quello che ho fatto è stato andare a seguire tutto il percorso legittimi partendo dalla posizione 1,1 (lettera h) facendolo si ottiene la flag
	