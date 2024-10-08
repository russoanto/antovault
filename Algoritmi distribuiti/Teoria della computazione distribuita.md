Un ambiente distribuito è un insieme di agenti che hanno una loro capacità computazionale che insieme lavorano per risolvere un compito coordinandosi scambiandosi dei messaggi (non hanno memoria condivisa). Sono utili per la condivisione di risorse, tolleranza ai guasti e per questione di scalabilità. In un sistema distribuito abbiamo:
- Tanti processori
- molte memorie
- operazioni in parallelo
- ampia distanza tra i dispositivi
- scambio di messaggi
Possiamo rappresenare il nostro sistema come un grafo in cui gli archi rappresentano i canali di comunicazione e i nodi le varie entità computazionali. Ogni entità ha:
- **input:** può essere vuoto o parte del problema
- **stesso output:** devono produrre lo stesso output del problema
- **stesso codice:** usano lo stesso algoritmo per la risoluzione del problema
Inoltre assumiamo anche che ogni entità abbia uno stato in ogni momento. L'agente è reattivo sulla base degli eventi:
- clock tick
- ricezione di un messaggio
- inpulso esterno 
Se non succede nulla allora rimane nel suo stato. L'azione è una sequenza di attività tra quelle previste, queste ultime sono **atomiche**, non possono essere interrotte e devono finire in un tempo finito. Le azioni di un entità dipendono dagli eventi e dal proprio stato:
- Stato X Evento --> Azione