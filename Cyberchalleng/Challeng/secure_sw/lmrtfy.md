- Sembra proprio si necessiti di una ROP chain
- Quello che fa il codice è eseguire il codice che inseriamo all'interno di eax ad eccezzione di alcune istruzioni chiave come int 80 (per la chiamata di syscall)
- Usando il comando ROPGadget quello che trovo è che 
```
0x08049444 : int 0x80
```
- Ho un gadget all'interno del mio programma che posso riutilizzare baypassando i controlli che vengono fatti
- 