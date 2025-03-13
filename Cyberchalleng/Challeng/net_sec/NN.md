## NN_00
- Se il setup non dovesse funzionare il procedimento di avvio è il seguente
```bash
docker compose down
sudo ./net.sh del
sudo make up
```
- Facendio ciò tutto dovrebbe avviarsi correttamente
## NN_02
- Il livello 2 consiste semplicemente nell'usare ip a per identificare l'indirizzo ip e poi collegarsi da un altro terminale in ssh
## NN_03
- Qui andando ad analizzare i vari servizi aperti con il comando ss -puttane notiamo 2 servizi aggiuntivi, come ci suggerisce la challeng
	- tcp          LISTEN         0              128                              0.0.0.0:80                            0.0.0.0:*              users:(("level3_1",pid=66,fd=3)) ino:46563 sk:4 <->                                                                                    
	- tcp          LISTEN         0              128                              0.0.0.0:8000                          0.0.0.0:*              users:(("level3_2",pid=69,fd=3)) ino:47296 sk:2 <->     

## NS_06
- su node 1 
	- iptables -t nat -A POSTROUTING -o eth0 --source 10.0.0.2 -j MASQUERADE
