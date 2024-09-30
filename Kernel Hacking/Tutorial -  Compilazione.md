
## Clone kernel
Da dentro la macchina virtuale, clona il repository mainline. Molto sinteticamente:
	git clone https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
All'interno della cartella eseguire:
	./scripts/kconfig/streamline_config.pl > minimal_config
Questo ti crea un config minimale, con selezionati solo i moduli che il tuo sistema (nella macchina virtuale se siete in una macchina virtuale) sta usando nel momento in cui invochi lo script. Stai quindi attento che tutti i moduli che vuoi avere poi disponibili nel tuo nuovo kernel, siano già in uso nel sistema quando invochi questo script. Se non sai bene come procedere, invoca tranquillamente questo script ora; poi, se mancheranno dei pezzi nel kernel, ripeterai questa operazione e la compilazione successiva, per ottenere un kernel in cui c'è tutto quello che vuoi. Lo script potrebbe segnalare vari errori, e ciononostante produrre lo stesso il file di config. Fondamentalmente, per ogni opzione che non riesce a configurare, segnala quello che non è andato come sperava.


## Setup shared folder
### Server - host
Sulla macchina host (arch) ho installato il pacchetto:
- nfs-server
Successivamente ho avviato il servizio con il comando:
```bash
sudo systemctl enable nfs-server
```
Dopodichè bisogna creare una root-nfs folder (corrispnde alla cartella che vogliamo condividere). Per specificare gli accessi alla cartella bisogna inserir una regola nel file /etc/exports:
```bash
path_root_dir  ip_guest(o subnet) (permessi [rw])
```
A questo punto rendo la cartella disponibile usando il comando exportfs:
```bash
sudo exportfs -a #making the file share available
sudo systemctl restart nfs-kernel-server #restarting the NFS kernel
```
### Client - Guest
Anche sulla machcina guest (ubuntu 22.04) devo installare nfs:
```bash
sudo apt install nfs-common
```
Creo una cartella che sarà il mio mount point:
```bash
sudo mkdir /var/linux-dev
```
Montare la cartella condivisa con il seguente comando:
```bash
sudo mount -t nfs {IP of NFS server}:{folder path on server} /var/linux-dev
```
Se ci sono errori verificare che la cartella si visibile dal guest con il seguente comando:
```bash
showmount -e ip_server
```