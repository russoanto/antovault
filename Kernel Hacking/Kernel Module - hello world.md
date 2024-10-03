Esistono dei file di configurazione preconfigurati, questo li chiamiamo defoncifg, cioè un file di configurazione con tutti i valori di default. Ce ne sono vari e si dovrebbero poter elencare con il comando make help.

___
**printk**: è la print del kernel, è una scrittura di una linea che finiscono in dmsgs e l'utente li può leggere tramite il comando dmsgs(o come si scrive).
___
Oggi impariamo a scrivere, compilare e installare un moduo. Successivamente voglio estendere il modulo per poter comunicare con il kernel. I moduli del kernel possono stare in 2 posti distinti:
- un modulo posso anche scrivere e compilare fuori dal kernel
- dentro l'albero del kernel
Noi useremo la prima opzioni. Noi possiamo sviluppare codice fuori dal kernel. Ovviamente il mio modulo verrà caricato nel kernel proprio tramite le operazioni di caricamento e scaricamento del kernel (una specie di linking dinamico). Il mio modulo dovrà però considerare un legame con il kernel, questo avverrà con gli header file.

## Sysfs
È un file system utilizzato per i file (finti) utilizzati per la comunicazione. In realtà non sono file, quando provo a leggere uno di questi file genera un hook che scatena l'invocazione di una funzione che nel kernel è registrata come la funzione da eseguire.

Le stampe del kernel hanno diversi livell di priorità, esistono delle macro per specificare il tipo di messaggio.
- pr_info("") è una di queste con un livello basso di priorità
Agigungere un file di interfaccia sysfs da aggiungere al nostro modulo che ogni volta che viene letto aumenti un contatore e con la store resetti il contatore.

