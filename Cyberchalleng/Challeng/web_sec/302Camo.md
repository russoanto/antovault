- Come prima cosa analizziamo il nome
	- 302 --> The HTTP 302 Found redirection response status code indicates that the requested resource has been temporarily moved to the URL in the Location header.
		- Interessante devo capire come utilizzarlo
- Seconda cosa e' che possiamo creare dei post caricando delle immagini
	- Potrebbe darsi che bisogna sfruttare il caricamento di immagini per poter caricare un qualche script per effettuare una sorta di code inj
- Come terza cosa vediamo che i post sono salvati in un db sqllite
	- Ho provato sql inj per il parametro id ma nulla, non sembra la strada giusta
- Inserisco come tag img il link di un mio server che fa ridirezione su localhost/get_flag.php e imposta come header il tipo di immagine
- Dopo si prosegue scaricando la risorsa
- Era facile dovevo solo fare curl del contenuto
	- CCIT{PHP_s0met1ms_1ts_funn1}
- 