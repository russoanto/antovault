### Riepilogo Domande Esame - Automotive Cybersecurity

#### 1. Secure Gateway

Il Secure Gateway è un componente che filtra e controlla le comunicazioni tra le interfacce esterne (es. OBD, telematica, infotainment) e la rete interna del veicolo. Implementare un Secure Gateway riduce il rischio che un attaccante remoto o locale possa accedere direttamente al CAN bus o ai servizi diagnostici. Può autenticare strumenti diagnostici, isolare segmenti di rete, e limitare comandi UDS non autorizzati.

#### 2. Impatto di un Secure Gateway sugli attacchi

Con un Secure Gateway, molti attacchi noti (es. UDS non autenticati, replay di comandi via infotainment, pivot via telematica) diventano più difficili o impossibili. Il Gateway può bloccare frame CAN anomali, impedire cambi di sessione diagnostica, o richiedere autenticazione prima di accettare comandi critici.

#### 3. Segmentazione della rete

In fase di design, si segmenta la rete in base alla criticità delle ECU:

* CAN-C: ECU critiche (ABS, motore, sterzo)
* CAN-B: comfort (luci, clima)
* Rete infotainment separata (es. MOST o Ethernet)
  Si utilizzano gateway per comunicare tra segmenti, minimizzando il rischio di attacchi da ECU non affidabili a ECU critiche.

#### 4. Bitwise Arbitration e sfruttamento

La bitwise arbitration del CAN (ID più basso vince) può essere sfruttata per DoS: un attaccante invia frame con ID a priorità altissima (es. 0x000) a ciclo continuo, impedendo ad altri nodi di trasmettere.

#### 5. Accesso al CAN: cosa può fare un attaccante

Un attaccante con accesso al CAN può:

* Sniffare messaggi
* Fare replay
* Iniettare comandi falsi
* Usare UDS per leggere/scrivere memoria, resettare ECU
* Eseguire attacchi DoS

#### 6. HSM - Hardware Security Module

Modulo hardware sicuro che protegge operazioni crittografiche: generazione chiavi, firma, verifica, contatori, archiviazione sicura.

#### 7. Full vs Lite HSM

Un Full HSM supporta più algoritmi, memorizzazione sicura, esecuzione isolata, contatori. Un Lite HSM ha funzionalità ridotte, utile per operazioni base ma meno robusto.

#### 8. Secure Boot

Verifica crittografica dell'integrità e dell'autenticità del firmware all'avvio. Impedisce l'esecuzione di codice non firmato o alterato.

#### 9. Protezione contro boot di firmware non verificati

Richiedere firme digitali, usare chiavi pubbliche bruciate in ROM, controllare hash e contatori monotòni.

#### 10. Uso della chiave pubblica nel Secure Boot

La chiave pubblica verifica la firma del firmware (hash + firma con chiave privata OEM). Se la firma non corrisponde, il boot viene bloccato.

#### 11. Perché si usano checksum e contatori nei messaggi CAN

Per rilevare messaggi ripetuti (replay) o modificati. Sono efficaci se ben implementati, ma da soli non garantiscono autenticazione.

#### 12. Autenticazione sul CAN

Non è nativa. Anche con key management, il problema principale è la banda limitata e la mancanza di indirizzamento. Servono protocolli come CANAuth o CANCrypt, e contatori sincronizzati.

#### 13. Perché è stato scelto il Jeep Cherokee

È stato scelto perché l'infotainment (Uconnect) era connesso direttamente al CAN-C e accessibile via rete cellulare. Le altre auto avevano segmentazione più efficace o meno vettori wireless.

#### 14. Rilevare spoofing con IDS

IDS basati su timing, entropia, o fingerprint elettrico possono rilevare ID falsificati. Ad esempio, variazioni nei tempi di trasmissione o entropia anomala nel campo ID.

#### 15. Attacco OnStar

Compromissione via D-Bus. Il sistema accettava comandi da processi interni non autenticati. L'attaccante ha eseguito comandi remoti accedendo alla rete interna del veicolo.

#### 16. Nuova vulnerabilità dopo la vendita (OTA)

Utilizzare aggiornamenti OTA sicuri (Uptane), con verifica della firma, rollback, e gestione chiavi. Isolare i moduli aggiornabili e loggare le modifiche.

#### 17. Jeep e password Wi-Fi

All'avvio il sistema generava la password Wi-Fi usando un timestamp prevedibile (1 gennaio 2013). Un attaccante poteva fare brute-force nel range ristretto.

#### 18. Principali vettori di attacco moderni

Bluetooth, telematica (LTE/5G), Wi-Fi, USB, lettore CD/DVD, porta OBD-II, backend cloud, infotainment vulnerabile, accesso fisico (relay attack).

#### 19. Jeep Cherokee - Dettagli attacco

Dopo l'accesso via cellulare, l'attaccante ha sfruttato Uconnect (servizio D-Bus) per accedere alla shell, da lì ha iniettato comandi CAN su CAN-C (freni, sterzo, ecc.).

#### 20. ISO-TP

Protocollo per segmentare messaggi UDS più lunghi di 8 byte su CAN. È uno strato sopra CAN che permette comunicazione diagnostica complessa (es. lettura VIN, scrittura firmware).

#### 21. IDS di rete (NIDS) in ambito automotive

Monitorano il traffico CAN alla ricerca di anomalie. Possono basarsi su timing, entropia, firme, machine learning. Devono essere leggeri e real-time.

#### 22. Faults sul CAN (Bus Off)

Una ECU che invia troppi errori entra in modalità Bus Off: si disconnette dal bus. Questo può essere causato da attacchi DoS o malfunzionamenti.

#### 23. Comunicazione V2V

Scambio di messaggi tra veicoli (es. posizione, frenata). Richiede basso ritardo e sicurezza. Basata su DSRC o C-V2X.

#### 24. PKI nel V2V

Permette autenticazione dei messaggi. Non ancora standardizzato universalmente. Richiede gestione certificati e revoca. Uptane e SCMS sono proposte attive.

#### 25. Attacco Rolljam

Dispositivo che blocca il segnale di sblocco chiave (rolling code), lo registra, e lo riusa quando l'utente è lontano. Funziona se l'auto accetta codici "validi ma vecchi".