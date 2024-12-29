## Extended Kalman Filter State
- Il filtro va a strimare il vettore di stato X che contiene le informazioni su posizione e velocità dell'avversario
	- **Stato X**: [s,v_s,d,v_d]
		- s: è la posizione longitudinale lungo il percorso (coordinata frenet)
		- v_s: è la velocità longitudinale
		- d: è la deviazione laterale rispetto alla traiettoria centrale
		- v_d: è la velocità laterale
## Matrici
- **matrice di transizione F:** assumiamo un modello a velocità costante dove
	- $$\begin{bmatrix} 1&dt&0&0\\0&1&0&0\\0&0&1&dt\\0&0&0&1 \end{bmatrix}$$
	- dt: è l'intervallo di tempo tra le misurazioni, che determina come si evlove lo stato
- **Matrice di covarianza del rumere Q:** Questo rumore è introdotto per tenere conto delle variazioni non misurabili o non previste nel modello dinamico. In questo caso Q viene creata utilizzando una funzione Q_discrete_white_noise che genera il rumore bianco discreto (white noise) per il sistema a tempo discreto. Poiché la dinamica è in coordinate Frenet, dove la posizione e la velocità sono separate in due dimensioni (longitudinale s e laterale d), Q viene costruita in modo da tenere conto di entrambe le dimensioni.
	- Nel codice Q viene costruita come:
```python 
q1 = Q_discrete_white_noise(dim=2, dt=1./Opponent_state.rate, var=Opponent_state.process_var_vs)
q2 = Q_discrete_white_noise(dim=2, dt=1./Opponent_state.rate, var=Opponent_state.process_var_vd)
self.dynamic_kf.Q = block_diag(q1, q2)
```

 - **Matrice di osservazione H:** È definita come una matrice Identità indicando che i valori misurati sono direttamente confrontabili con lo stato stimato
 - **Matrice di covarianza delle misure R:** la matrice R rappresenta l'incertezza associata alle misure, specifica la variazione delle misurazioni di s,v_s,d e v_d.
 - **Matrice di covarianza dello stato P:** Definisce l'incertezza iniziale dello stato, con valori in diagonale che rappresentano la fiducia nei vari parametri di posizione e velocità. All'inizio, questa matrice riflette l'incertezza della posizione longitudinale, della deviazione laterale e delle rispettive velocità
## Inizializzazione e Predizione
- L'inizializzazione del filtro avviene nel costruttore, con la creazione di una lista per memorizzare le velocità longitudinali (vs_listvs\_listvs_list) e mediarle successivamente
- **Predict**: funzione che aggiorna lo stato del filtro kalman usando il modello dinamico
	- Se `useTargetVel` è attivato, la velocità longitudinale è regolata per raggiungere un valore di riferimento (target_velocitytarget\_velocitytarget_velocity) lungo il percorso.
	- Se `useTargetVel` è disattivato, il filtro di Kalman procede a stimare senza includere velocità target, ma applica un ritorno verso la traiettoria centrale (forzando d e v_d a zero tramite guadagni P_d​ e P_vd​)