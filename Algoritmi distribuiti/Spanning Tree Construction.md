# Spanning Tree construction
Questa parte può essere trovata sul libro che ci ha consigliato.
## Spanning Tree
- Uno spanning Tree T di un  grafo G = (V,E) è un sottografo aciclico di G tale che T = (V, E') e E' è contenuto in E. 
### Restrizioni 
- Singolo inizializzatore
- LInk bidirezionali
- Total reliability
- G connesso
## Protocol SHOUT
- Inizialmente abbiamo che:
$$\forall x, tree-neighbots(x) = \{\}$$
- e alla fine abbiamo la conoscenza su quali dei sui vicini fanno parte dell spanning tree:
$$\forall x, tree-neighbors(x) = \{neighbors-in-spanning-tree\}$$
1) Inizializzatore: manda le richieste ai suoi vicini (Vuoi diventare un mio vicino nello spanning tree?)
2) Le altre entità aspettano fino a quando non ricevono la richiesta Q. 
	1) Se è la prima volta che riceve la prima domanda allora rispondo **si**
	2) Se ho già risposto alla domanda allora risondo di **no**
	3) Ovviamente se ricevo risposta positiva allora devo prenderne nota
- Pseudocodice:
	State S = {Init, Idle, Active, Done};
	Sinit = {init, idle}; // possibili stati iniziali
	sterm = {done}; // stato terminatore
	// Protocollo per l'agente x
	- **Inizializzatore**
		Spontaneo
			root = true;
			tree-neigh(x) = {};
			send Q to N(x);
			counter = 0;
			become(Active)
	
	- **IDLE**
		ricevo(Q)
			root = false;
			parent = sender;
			tree-neigh (x) = {sender};
			send **YES** to parent
			counter = 1;
			if counter == |N(x)|
				then
					become(DONE)
				else
					send Q to N(x)-{sender}
					become(ACTIVE)
	- **ACTIVE**
		ricevo(Q)
			send NO to sender
		ricevo(YES)
			tree-neigh(x) = tree-neigh(x) u {sender (chi mi ha risposto)};
			counter = counter + 1;
			if(counter == |N(x)|)
				become(DONE);
		ricevo(NO)
			counter = counter + 1;
			if(counter == |N(x)|)
				become(DONE);
- Se x è nel MST di y:
	- allora y è nel MST di x
- Se x manda YES ad y:
	- e y è nel MST di x ed è connesso all'inizializzatore da una catena di YES
- Ogni x, ad eccezzione dell'inizializzatore manda esattamente un YES
	- È fondamentale mandare esattamente un solo YES altrimenti rischio di creare dei cicli e quinid non ha più un albero
- Abbiamo una terminazione locale, c'è qualcuno che sa se il protocollo è terminato? No.

	
	
