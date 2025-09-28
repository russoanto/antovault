- Il compilatore traduce il codice in un Abxtract Syntax Tree
	- In realtà il compilatore rende il codice non ridondante (ottimizzazioni)
- Linking: fase in cui la funzione di libreria viene riferita tramite un indirizzo utilizzabile per il suo richiamo
-  Sui sistemi gnu/linux è presente gcc (1989)
	- I più recenti si basano su LLVM CLang
```c
#include <stdio.h>
#include <stdlib.h>
#define MESSAGE "Hello world!\n"

int main(int argc, char *argv[], char *envp[]){
	printf(MESSAGE);
	exit(EXIT_SUCCESS);
}
```
- Con l'opzione -E grande mi permette di fermarmi dopo la fase di pre-processing
- Con gcc -s andiamo a compilare in linguaggio assembly
	- $RIP --> position Indipendent Executable (PIE)
	- posso eliminare la randomizzazione con gcc -fno-pie 
	- 