# Why rust
- Undefined Behavior: sono quei comportamenti in cui il compilatore se si trova in determinate situazioni non sa come comportarsi e quindi può succedere di tutto
	- Esiste perchè il compilatore deve effettuare determinate ottimizzazioni e quindi da per scontato che determinate operazioni non avvengano, come overflow
- In rust non ci sono **UB**, difatto in rust elimina le memory corruption e le data race.
- Vantaggi
	- no UB
	- Memory safety
	- Bella concorrenza
	- Zero cost abstractions
- **Borrow Checker**: è una parte del compilatore che prende parte del codice e lo "boccia" (controlla la correttezza del programma)
	- Il compilatore segnala gli errori nel miglior modo possibile

## Sintassi
- in rust un char è di 4 byte, perchè è Unicode.