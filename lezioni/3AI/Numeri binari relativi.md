Per rappresentare i numeri negativi è necessario aggiungere alla codifica un segno che, mentre può essere sottinteso per i numeri positivi, deve essere in “qualche modo” aggiunto per i numeri negativi. Per rappresentare gli interi relativi introduciamo quindi un bit che codifica il segno e, di fatto, dimezza l’intervallo dei valori assoluti a parità di cifre binarie utilizzate per la codifica.

- 4 tipologie di codifiche
	- Modulo e segno
	- Complemento
		- A1
		- A2
	- Eccesso $2^{n-1}$
## Modulo e segno
- Utilizzo il bit più significativo per la codifica del segno
	- 1 per i numeri negativi
	- 0 per i numeri positivi
- Significa che utilizzo un bit in meno per la rappresentazione del modulo
	- Utilizzare 1 bit in meno significa dimezzare il range di valori rappresentabile
- **Range rappresentabile**: $[-2^{n-1}+1,+2^{n-1}-1]$
	- Se ho 5 bit a disposizione il range di rappresentabilità è pari a $$[-2^{5-1}+1,+2^{5-1}-1] = [-16+1, +16-1] = [-15, + 15]$$
- **Vantaggi**
	- Semplicità di rappresentazione
- **Svantaggi**
	- Lo zero viene rappresentato 2 volte (+0,-0)
	- Le somme e sottrazioni richiedono operazioni preparatorie, non sono immediate
		- Per questo motivo non viene scelta questa rappresentazione per i calcoli
### Esempio
- In questo caso ho a disposizione 8 bit (1 è sempre per il segno, quindi ho 7 bit per il modulo)
- Una prima cosa da fare è calcolare il range di valori rappresentabili con i bit a disposizione
$$[-2^{n-1}+1,+2^{n-1}-1] = [-2^{8-1}+1,+2^{8-1}-1] = [-127,+127]$$
$$\{-127,-126,...,-0,+0,...,126,127\}$$

| Segno | Modulo  | Valore Decimale | Commento                                                             |
| ----- | ------- | --------------- | -------------------------------------------------------------------- |
| 0     | 0010010 | +18             |                                                                      |
| 1     | 0010010 | -18             | Il modulo è identico a +18 l'unica cosa che cambia è il bit di segno |
| 0     | 0000001 | +1              |                                                                      |
| 1     | 0000001 | -1              |                                                                      |
| 0     | 0000000 | +0              |                                                                      |
| 1     | 0000000 | -0              | come si può notare ho due rappresentazioni dello 0                   |
### Decodifica
- La decodifica è banale, il bit più significativo rappresenta il segno mentre con i restanti bit eseguo la classica conversione binario -> decimale (moltiplico le potenze di due con il valore del bit)
### Aritmetica
#### Somma
- La somma viene eseguita nel modo "classico" facendo attenzione ai casi di overflow

> **Overflow**: il risultato dell’ultima operazione è maggiore del massimo valore che il registro di destinazione può contenere

- La regola generale è
	- Se i due operandi hanno lo stesso segno allora **posso** avere overflow
		- Ovreflow è quando ho un riporto nel bit di segno (sto cercando di rappresentare un numero più grande di quello rappresentabile)
		- L'operazione viene eseguita così com'è senza operazioni preparatorie
	- Se i due operandi hanno segno differente **non posso** avere overflow ma devo eseguire delle operazioni preparatorie
		- Dati i due operandi in Modulo e segno prendo quello di **modulo** minore (quindi il numero più piccolo senza considerare il segno) e gli cambio il segno (inverto il bit più significativo)
		- **A questo punto eseguo l'operazione come una sottrazione**
#### Esempio 
> **Negli esempi lavoriamo in 8 bit**

- (+10) + (-4)
- In questo caso sto sommando due valori con segno differente 
	- Sicuramente non avrò overflow
	- Ho bisogno di operazioni preparatorie per eseguire il calcolo, di seguito ne vediamo il motivo
	
$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
  & 7 & 6 & 5 & 4 & 3 & 2 & 1 & 0 &  \text{bit}\\
      & 0 & 0 & 0 & 0 & 0 & 0 & 0 &  &  \text{riporti}\\
  & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 & \text{(+10)} \\
+ & 1 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & \text{(-4)} \\
\hline
  & 1 & 0 & 0 & 0 & 1 & 1 & 1 & 0 & \text{(??)} \\
\end{array}$$


- Il calcolo effettuato così com'è non torna, quello che dobbiamo fare è confrontare i due moduli (NON CONSIDERO IL SEGNO) e cambiare di segno a quello più piccolo
	- 10 > 4, quindi devo trasformare il mio -4 in +4 ed eseguire la sottrazione
- L'operazione diventa così (+10) - (+4)

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
  & 7 & 6 & 5 & 4 & 3 & 2 & 1 & 0 &  \text{bit }\\
  & 0 & 0 & 0 & 0 & 1 & 0 & 0 &  & \text{prestiti}\\
  & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0  & \text{(+10)} \\
- & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 & \text{(+4)} \\
\hline
 & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 0 & \text{(+6)} \\
\end{array}$$

- Nel secondo caso vediamo una somma tra numeri con segno concorde
	- (+35) +(+41) = +76
	- 76 rientra nei valori rappresentabili nella codifica modulo e segno quindi sicuramente non avremo overflow

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
  & 7 & 6 & 5 & 4 & 3 & 2 & 1 & 0 &  \text{bit }\\
  & 0 & 1 & 0 & 0 & 0 & 1 & 1 &   &  \text{riporti}\\
  & 0 & 0 & 1 & 0 & 0 & 0 & 1 & 1 & \text{(+35)} \\
+ & 0 & 0 & 1 & 0 & 1 & 0 & 0 & 1 & \text{(+41)} \\
\hline
 & 0 & 1 & 0 & 0 & 1 & 1 & 0 & 0 & \text{(+76)} \\
\end{array}$$
- Esempio overflow
	- Somma tra +120 e +35 (sempre su 8 bit)
	- +120 +35 = 155 --> già da qui possiamo vedere che il valore non è rappresentabile (fare riferimento al range di rappresentazione di modulo e segno)
	- **Dettaglio operandi**
		- +120
			- segno: 0 (positivo)
			- modulo binario: 1111000
		- +35
			- segno: 0 (positivo)
			- modulo binario: 0100011

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
  & 7 & 6 & 5 & 4 & 3 & 2 & 1 & 0 &  \text{bit }\\
0 & 1 & 1 & 0 & 0 & 0 & 0 & 0 &   &  \text{riporti}\\
  & 0 & 1 & 1 & 1 & 1 & 0 & 0 & 0 & \text{(+120)} \\
+ & 0 & 0 & 1 & 0 & 0 & 0 & 1 & 1 & \text{(+35)} \\
\hline
0 & 1 & 0 & 0 & 1 & 1 & 0 & 1 & 1 & \text{(-27????)} \\
\end{array}$$

- Il risultato interpretato in 8 bit non ha senso, abbiamo perso delle informazioni !!!
	- Rifare l'operazione in 9 bit e verificare la correttezza del risultato
## Complemento alla base
### Complemento A1
- La codifica in complemento A1 è così fatta 
	- **Numero positivo**: rimane invariato
	- **Numero negativo**: inverto tutti i suoi bit
- L'effetto, anche in questo caso, è che il bit più significativo viene definito **bit di segno**
	- Mi basta osservare l'ultimo bit per determinare il segno del numero
- **range rappresentazione**: $$[-2^{n-1}+1, +2^{n-1}-1]$$
	- Rappresento lo zero 2 volte (perdita di spazio)
- Anch'essa è una notazione posizionale
	- Il bit più significativo ha il peso pari a $-2^{n-1}+1$
	- Gli altri bit hanno il peso pari a $2^{n-1}$ (classico)
### Esempi:

#### **Esempio 1: +5 e -5**

- +5+:
    - Numero binario su 8 bit: 00000101.
    - Non cambia perché è positivo.
- −5:
    - Complemento a1 di +5: inverti tutti i bit di: 00000101
	- **Risultato**: 11111010

| Numero decimale | Modulo binaria | CA1      |
| --------------- | -------------- | -------- |
| +5              | 00000101       | 00000101 |
| -5              | 00000101       | 11111010 |
- +12 e -12

| Numero decimale | Modulo binaria | CA1      |
| --------------- | -------------- | -------- |
| +12             | 0001100        | 00001100 |
| -12             | 0001100        | 11110011 |
#### Decodifica
- Come già ribadito CA1 è un sistema di numerazione **posizionale** dove i pesi delle posizioni sono le seguenti
	- **bit più significativo**(bit di segno): $$-2^{n-1}+1$$
	- **per tutti gli altri bit:** vale il solito $$2^{n-1}$$
##### Esempio decodifica
> **Lavoriamo con 8 bit**
- Decodifichiamo questo valore binario da CA1 in decimale
- 10011011: $$(-2^{8-1}+1)*1 + 2^{7-1} *0  + 2^{6-1}*0 + 2^{5-1}*1 + 2^{4-1}*1+2^{3-1}*0 + 2^{2-1}*1+2^{1-1}*1$$
$$ = -127 + 16 + 8 + 2 + 1 = -127 + 27 = -100$$
#### Aritmetica in complemento A1
- Non è nel programma quindi la saltiamo :)))!!!!!
### Complemento A2
- La codifica in complemento A2 viene eseguita nel seguente modo
	- **numeri positivi**: rimane invariato
	- **numeri negativi**: CA1(numero da codificare) + 1
- Anche qui vale la proprietà che
	- Se il bit significativo è pari a 0 --> numero positivo
	- Se il bit significativo è pari a 1 --> numero negativo
- In questo caso il range di rappresentazione cambia ed è $$[-2^{n-1}, +2^{n-1}-1]$$
	- Lo zero viene rappresentato **una singola volta**
	- con 4 bit abbiamo che $$-2^{4-1}, +2^{4-1}-1$$
	$$[-8, +7]$$
	$$\{-8,-7,...,+0,...,+6,+7\}$$
##### Esempi di codifica
> Stiamo lavorando in 8 bit

$$[-2^{8-1}, +2^{8-1}-1] = [-128, +127]$$
- Per ogni valore negativo prima passo da binario puro a CA1 (invertendo tutti i bit) e poi a CA2 sommando 1 al valore ottenuto da CA1

| Numero decimale | Modulo   | CA1      | CA2      | Commento                                                       |
| --------------- | -------- | -------- | -------- | -------------------------------------------------------------- |
| +5              | 00000101 | 00000101 | 00000101 | Il numero è positivo quindi la sua rappresentazione non cambia |
| -5              | 00000101 | 11111010 | 11111011 |                                                                |
| +12             | 00001100 | 00001100 | 00001100 | Il numero è positivo quindi la sua rappresentazione non cambia |
| -12             | 00001100 | 11110011 | 11110100 |                                                                |

#### Decodifica
- Così come per la codifica CA1 anche in questo caso la decodifica segue quella classica "binario -> decimale" con la sola differenza che il bit più significativo (quello più a sinistra) vale $-2^{n-1}$
> ATTENZIONE!!! **non vale più** $-2^{n-1}+1$
##### Esempi di decodifica

|                 |                   |     | bit di segno |     |     |     |     |     |     |     |
| --------------- | ----------------- | --- | ------------ | --- | --- | --- | --- | --- | --- | --- |
| Numero decimale | Modulo in binario | CA2 | 7            | 6   | 5   | 4   | 3   | 2   | 1   | 0   |
| -5              | 00000101          | --> | 1            | 1   | 1   | 1   | 0   | 1   | 1   | 1   |
| -12             | 00001100          | --> | 1            | 1   | 1   | 1   | 0   | 1   | 0   | 0   |
- -5: $$-2^{8-1}*1+2^{7-1}*1+2^{6-1}*1+2^{5-1}*1+2^{4-1}*1+2^{3-1}*0+2^{2-1}*1+2^{1-1}*1$$
$$ = -128+64+32+16+8+2+1 = -128 + 123 = -5$$
- -12: 
$$-2^{8-1}*1+2^{7-1}*1+2^{6-1}*1+2^{5-1}*1+2^{4-1}*0+2^{3-1}*1+2^{2-1}*0+2^{1-1}*0$$
$$= -128 + 64+32+16+4 = -128 + 116 = -12$$
### Aritmetica in complemento A2
- Il **Complemento a 2 (CA2)** è particolarmente utile per eseguire operazioni aritmetiche binarie, poiché consente di trattare **somma** e **sottrazione** con un unico meccanismo. La **sottrazione** viene ridotta a una **somma**, sfruttando la rappresentazione negativa del CA2
#### Somma
- La somma viene eseguita nel modo "classico"
	- Il problema a cui porre attenzione è la possibilità di ottenere overflow

- Semplici regole per l'identificazione dell'overflow

| Tipo di operazione |                |                          |
| ------------------ | -------------- | ------------------------ |
| (+A) + (+B)        | Segni concordi | **può esserci overflow** |
| (-A) + (-B)        | Segni concordi | **può esserci overflow** |
| (+A) + (-B)        | Segni discordi | **NO OVERFLOW**          |
| (-A) + (+B)        | Segni discordi | **NO OVERFLOW**          |

- Nel caso di addendi con segni concordi

| Tipo di riporti                                |                 |                                                                               |
| ---------------------------------------------- | --------------- | ----------------------------------------------------------------------------- |
| Riporti **concordi** nelle colonne **n e n+1** | **NO OVERFLOW** | il segno del risultato è uguale al segno degli operandi di partenza           |
| Riporti **discordi** nelle colonne n e n+1     | **OVERFLOW**    | il segno del risultato è diverso rispetto al segno degli operandi di partenza |
- Nel caso di riporti concordi nelle colonne n e n+1

| Tipo di risultato  |                                  |
| ------------------ | -------------------------------- |
| Risultato positivo | **trascuro** il riporto ottenuto |
| risultato negativo | **trascuro** il riporto ottenuto |

##### Esempio somma
- Lavoriamo con 4 bit
	- $[-2^{4-1}, +2^{4-1}-1]$ --> $[-8, +7]$
- Eseguiamo la somma 7+1
	- La codifica in CA2 non ha effetto dato che i valori sono entrambi positivi

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
  & 4 & 3 & 2 & 1 & 0 &  \text{bit }\\
  & 0 & 1 & 1 & 1 &   &  \text{riporti}\\
  &   & 0 & 1 & 1 & 1 & \text{(+7)} \\
+ &   & 0 & 0 & 0 & 1 & \text{(+1)} \\
\hline
  &  & 1 & 0 & 0 & 0 & \text{(-8 ??)} \\
\end{array}$$
- **Abbiamo overflow** e lo possiamo notare dai riporti delle colonne 4 e 5 che sono differenti

- Eseguiamo la somma (+4)+(+2) (sempre in 4 bit)

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
  & 4 & 3 & 2 & 1 & 0 &  \text{bit }\\
  & 0 & 0 & 0 & 0 &   &  \text{riporti}\\
  &   & 0 & 1 & 0 & 0 & \text{(+4)} \\
+ &   & 0 & 0 & 1 & 0 & \text{(+2)} \\
\hline
  &  & 0 & 1 & 1 & 0 & \text{(+6)} \\
\end{array}$$


- **Non abbiamo overflow** e lo possiamo notare dai riporti delle colonne 4 e 5 che sono uguali

- Eseguiamo la somma di (-4) + (-2) (4 bit)
	- In questo caso dobbiamo convertire -4 e -2 in ca2
	- (-4) = $(0100)_2$ --> $(1011)_{CA1}$ --> $(1100)_{CA2}$ 
	- (-2) = $(0010)_2$ --> $(1101)_{CA1}$ --> $(1110)_{CA2}$

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
  & 4 & 3 & 2 & 1 & 0 &  \text{bit }\\
  & 1 & 1 & 0 & 0 &   &  \text{riporti}\\
  &   & 1 & 1 & 0 & 0 & \text{(-4)} \\
+ &   & 1 & 1 & 1 & 0 & \text{(-2)} \\
\hline
  & 1 & 1 & 0 & 1 & 0 & \text{(-6)} \\
\end{array}$$
- Perchè il risultato è -6??  dato che i riporti nelle colonne 4 e 3 sono concordi allora il riporto si trascura e il risultato è **1010** che decodificato è

$$
(1010)_{CA2} = -2^{3}*1 + 2^{2}*0 + 2^{1}*1+2^{0}*0 = -8 + 2 = -6
$$
#### Sottrazione
- La sottrazione viene eseguita come una somma invertendo il segno del sottraendo (faccio la CA2 del valore binario) --> possiamo eseguire la sottrazione come una somma (comodo)

#### Esempio sottrazione
- Eseguiamo la sottrazione tra (+5) - (+3) --> $(000101)_2$ - $(000011)_2$
- La prima cosa da fare è invertire il segno del sottraendo, quindi da +3 deve passare a -3
	- Per invertire di segno come abbiamo capito ci basta codificare in CA2(significa prima codificare in CA1 e poi sommare 1)
- CA2(000011) = (111100) + 00001  = **111101**
- A questo punto abbiamo sia (+5) che (-3) in binario e possiamo sommare i due valori come sappiamo

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
   6 & 5 & 4 & 3 & 2 & 1 & 0 & \text{bit}\\
   1 & 1 & 1 & 1 & 0 & 1 &  & \text{riporti}\\
    & 0 & 0 & 0 & 1 & 0 & 1 & \text{(+5)}\\
+   & 1 & 1 & 1 & 1 & 0 & 1 & \text{(-3)}\\
\hline
   1 & 0 & 0 & 0 & 0 & 1 & 0 & \text{(+2)}\\
\end{array}
$$
 
>  Perchè il risultato è +2 ??? che fine ha fatto il bit più significativo a sinistra??
 
- Prima di tutto controlliamo i riporti nelle colonne 6 e 5
	- Quello che notiamo è che sono uguali --> **no overflow**
- Ricordiamoci le regole segnate sopra:
	- Dato che non ho overflow (guardare i riporti sulle colonne 5 e 6) allora **trascuro il riporto**
---
- Proviamo con un secondo esempio:  (+13) - (+26) --> (001101) - (011010)
- Prima cosa da fare è cambiare di segno al sottraendo (+26 diventa -26) e l'operazione si trasforma in una somma
- CA2(011010) = $(100101)_{CA1}$ + 00001 = $(100110)_{CA2}$

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
   6 & 5 & 4 & 3 & 2 & 1 & 0 & \text{bit }\\
   0 & 0 & 1 & 1 & 0 & 0 &  & \text{riporti}\\
     & 0 & 0 & 1 & 1 & 0 & 1 & \text{(+13)} \\
+    & 1 & 0 & 0 & 1 & 1 & 0 & \text{(-26)} \\
\hline
    & 1 & 1 & 0 & 0 & 1 & 1 & \text{(-13)} \\
\end{array}$$
---
- Esempio overflow(lavoriamo su 6 bit): (-25) - (+13) 
- Codifichiamo in binario gli operandi
	- Per ottenere -25 dobbiamo fare il complemento a2 di 25 --> $(100111)_{CA2}$
	- +13 è uguale a --> $(001101)_{2}$
- A questo punto dobbiamo trasformare la sottrazione in una somma
	- Per farlo cambio di segno al sottraendo (+13 trasformandolo in -13)
- -13 --> $(110011)_{CA2}$

$$
\begin{array}{r@{}r@{}r@{}r@{}r@{}r@{}r@{}r@{}r}
   6 & 5 & 4 & 3 & 2 & 1 & 0 & \text{bit }\\
   1 & 0 & 0 & 1 & 1 & 1 &  & \text{riporti}\\
     & 1 & 0 & 0 & 1 & 1 & 1 & \text{(-25)} \\
+    & 1 & 1 & 0 & 0 & 1 & 1 & \text{(-13)} \\
\hline
   1 & 0 & 1 & 1 & 0 & 1 & 0 & \text{(??)} \\
\end{array}$$
- I riporti nelle colonne 6 e 5 sono diversi, siamo in presenza di **overflow**
	- Controllare sempre il range codificabile
	
## Eccesso 2^{n-1}
- n indica (come al solito) il numero di bit da utilizzare per la codifica
	- cambiando il numero di bit cambia anche anche la rappresentazione di uno stesso valore
- **intervallo di rappresentazione**:$$[-2^{n-1}, +2^{n-1}-1]$$
- esistono 2 regole per la codifica
#### Regola 1
>Dato un valore in CA2 ne inverto il bit più significativo

- Nel caso in cui volessimo effettuare il complemento in eccesso 8 abbiamo bisogno di n=4 dato che $2^{4-1} = 8$

(-3) --> $(0101)_2$  --> $(1101)_{CA2}$  --> $(0101)_{EC8}$ 
(+4) --> $(0100)_2$ --> $(0100)_{CA2}$ --> $(1100)_{EC8}$

#### Regola 2
> Dato un valore x in decimale gli sommo il valore decimale di $2^{n-1}$ e converto il risultato in binario

- Mettendo caso di lavorare in 5 bit, quindi in eccesso 16 ($2^{5-1} = 16$) il valore da aggiungere ad ogni numero è 16.

| Decimale | Decimale + $2^{n-1}$ | Eccesso          |
| -------- | -------------------- | ---------------- |
| -3       | -3 + 16 = 13         | $(01101)_{EC16}$ |
| 0        | 0+16 = 16            | $(10000)_{EC16}$ |
| 4        | 4+16 = 20            | $(10100)_{EC16}$ |
| 15       | 15+16 = 31           | $(11111)_{EC16}$ |

### Decodifica
- dato il valore binario codificato in ECn ed il numero di bit utilizzati per codificarlo quello che devo fare è
	- calcolare $2^{n-1}$
	- converto il valore binario in decimale che chiamerò x
	- x - $2^{n-1}$ = valore decodificato

| Binario        | Decimale | Decodifica |                                                                                          |
| -------------- | -------- | ---------- | ---------------------------------------------------------------------------------------- |
| $(111)_{EC3}$  | 7        | 7-4 =**3** | Qui stiamo lavorando con n=3 qundi --> $2^{3-1} = 4$                                     |
| $(0111)_{EC4}$ | 7        | 7-8 = -1   | Attenzione, il valore binario è lo stesso ma qui la codifica è con n=4 --> $2^{4-1} = 8$ |

# Riferimenti
- Libro di testo:  Lezione 2 (pag. 219)
- playlist codice binario: https://www.youtube.com/playlist?list=PLVtGJfbzVd1HmPwRHWEghC_a_chvkoTup 


+37  -100
 