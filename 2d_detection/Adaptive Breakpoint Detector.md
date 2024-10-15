È l'algoritmo di segmentazione che viene utilizzato sia da eth che nel progetto datmo. Sembra quello più promettente.
## Principio di Funzionamento
- L'algoritmo si basa sul calcolo della distanza eucldea tra punti consecutivi nella nuvola di punti
- Due punti consecutivi vengono raggruppati nello stesso cluster se la loro distanza euclidea è inferiore ad una certa soglia predefinita Dmax.
	- |pn - pn-1| > Dmax
- Se la distanza euclidea tra i punti è maggiore di Dmax, allora viene avviato un nuovo cluster con il punto pn come primo elemento
### Adattamento della soglia di distanza
- Per tenere conto della minore densità dei punti LIDAR all'aumentare della distanza dal sensore, la soglia di distanza Dmax viene adattata in base alla distanza dal sensore del punto in esame.
- Per ogni punto pn-1, viene calcolata la distanza massima rhn, che rappresenta il caso peggiore per l'angolo di incidenza di un oggetto rilevabile dal sensore.
	- Questa distanza viene calcolata considerando una linea che passa per il punto pn-1 e forma un angolo λ rispetto all'angolo di scansione φn-1.
- La formula per il calcolo di rhn è:
	- rn−1 · sin(λ) = rhn · sin(λ−∆φ)
- La distanza di soglia Dmax viene quindi calcolata come la somma della distanza tra pn-1 e rhn e della varianza dell'errore del sensore σr:
	- Dmax = ∥∥phn − pn−1∥∥+ σr.