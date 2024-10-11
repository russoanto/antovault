# IoT Stack
![[iot_tack.png]]
È molto simile allo stack TCP/IP ma l'ultimo livello non appbbiamo quello applicativo ma quello di messaggistica. In questo contesto le caratteristiche che ho sono:
- comunicazioni a long range
- efficiena energetica
- basso througputh (voglio inviare pochi dati ma molto lontano)
- Comunicazione sporadica
## Metodi di comunicazione
BLE, NFC, LTE etc.... LPWAN lavorano nelle ISM bands (Industrial, Science and Medicine):
- 2.4GHz and 5.8 GHz (WiFi)
- 868 MHz (Europa) ...

### LoRa
Long Range:
- basso costo
- general purpose per le reti IoT, puoi trasmettere quello che vuoi come vuoi
Ha 14 configurazioni differenti su come il datarate deve essere. Lora può raggiungere tali distanze di comunicazioni grazie ai lower bands, maggiori sono le onde e meglio superano gli ostacoli, ed è proprio il caso delle lower bands. Viene utilizzato un forte Modulation coding scheme che è il modo con cui convertiamo l'onda in bit, significa che i mie bit è più improbabile che vengano persi. In LoRa abbiamo un alto tempo di trasmissione. È cruciale decidere il numero di messaggi da inviare, LoRa non ha routing, la comunicazione è diretta con il LoRa router. LoRa definisce la parte fisica della comunicazione ed è proprietario, al di sopra di lora abbiamo LoRaWAN ed è aperta. Noi siamo interessati alle classi di dispositivi che possiamo utlizzare. Abbiamo 4 componenti principali:
- **end device**: sono gli IoT sensors
- **Gateways**: ricevono i dati dagli end device e li mandano alle reti

LoraWAN definisce 3 classi di dispositivi:
- Classe C: non ci sono batterie, può ascoltare continuamente
- Classe B: non sonon sempre accesi, ma lavorano in slot specifici e sono energy efficient
- Classe A: tutti i restanti
![[security.png]]
q