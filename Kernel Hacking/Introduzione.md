Abbiamo 2 tipologie di kernel:
- monolitico
- microkernel
Un kernel è un programma che gestisce tanti servizi, e che concettualmente è composto da pezzi distinti, però quando imlementi questo programma ci si trova di fronte ad un bivio. Le varie funzioni che possono comporre il mio programma condividono la stessa porzione di memoria. Questa visione è detta **monolitica** perchè lavora come un singolo blocco. Linx è un kernel monolitico, questo significa che un singolo bug può corrompere la memoria di tutti gli altri programmi. A questa visione si contrappone la visione microkernel che non condivide la stessa memoria per i vari servizi e la comunicazione avviene mediante scambio di messaggi, ogni servizio ha il proprio spazio di indirizzamento. Alla fine ha vinto la struttura monolitica soprattutto per la praticità.

[Guardarsi lo scheduling CPU]

## Moduli
Come fa il kernel a funzionare su tutti gli hardware esistenti?? Utilizza i moduli, che nell'ambito dqi sistemi operativi indica una porzione di codice che può essere linkato in maniera dinamica durante l'esecuzione del mio kernel. Il linking dinamico consiste no nell'andare a sostituire fisicamente roba ma dire "esegui una funzione che si trova nel file x". Alcune cose devono essere compilate con il kernel, ad esempio i driver del filesystem deve esserlo dato che altrimenti non sarei in grado di leggere il filesystem e quindi non sarei in grado di leggere gl altri moduli.

