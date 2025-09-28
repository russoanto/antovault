## Tirare su l'infra
- Come prima cosa fare riferimento al repo git https://github.com/HackingMoRe/ADTools?tab=readme-ov-file
	- sudo ./hosts.sh vulnbox-ip [nop-ip] non funziona, ma basta aggiungere l'ip della vulnbox nel file /etc/hosts
	- Solitamente bisogna connettersi ad una vpn tramite wireguard, per farlo prima mi scarico il file di configurazione e successivamente lancio il seguente comando
```bash
sudo wg-quick up file_config
```
- Dopo questo passaggio posso provare a connettermi in ssh alla vulnbox per verificare che tutto funzioni correttamente
- Successivamente devo generare il file d'ambiente contenente tutte le password modificate (sia per l vulnbox sia per i servizi che sobbiamo hostare)
```bash
./gen_env.py
```
- A questo punto per fare il deploy di tutti i tool sulla vulnbox lanciare il comando
```bash
ansible-playbook vulnbox_deploy.yml -i "vulnbox," -u root --extra-vars "ansible_user=root ansible_password=<vulnbox password>" --extra-vars "@.env.json"
```
- Inserire come password della vulnbox quella che viene fornita nello zip (quella semplice per intenderci)
- TODO: cambiare script ansible
	- fare in modo che dopo che la password di root sia stata cambiata lo script utilizzi la nuova password  per le varie operazioni di root
- Dopo ore di attesa i servizi dovrebbero essere up e accessibili
	- S4D-Farm running on port 42069
	- packmate 65000
## Exploit Example
- Per la scrittura degli exploit seguire il seguente template
```python
#!/bin/usr/python3

import sys
import requests
import json
from bs4 import BeautifulSoup
import os

  

ip = sys.argv[1]
port =  #PORT


print(ret.text, flush=True) # Ricordarsi la stampa con flash=True

```
- Per l'esecuzione di un exploit su tutte le macchine quello che dobbiamo fare è lanciare il seguente comando
```bash
./run_exploit.sh nome_exploit.py
```
> IMPORTANTE rendere l'exploit eseguibile altrimenti può dare dei problemi e dare ai diversi exploit dei nomi identificativi visto che il suo nome verrà utilizzato da S4D farm per il filtraggio (avere gli stessi nomi crea confusione)

```bash
ssh -L 65007:127.0.0.1:65007 root@vulnbox
```

## Packmate
- username: unimore
