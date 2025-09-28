### 🔐 **Cos’è il Secure Boot?**

Il **Secure Boot** è un meccanismo che assicura che **solo codice di sistema autorizzato** venga eseguito su un dispositivo al momento dell'avvio. Serve per proteggere contro malware e manipolazioni che possono compromettere il sistema fin dalle prime fasi di inizializzazione.

- Controlla solo il **codice di sistema** (firmware, bootloader, kernel), **non il codice applicativo**.
    
- Se un'immagine è corrotta o non autorizzata, l'avvio viene bloccato.
    

---

### ⚙️ **Funzionamento generale**

1. All’accensione, il processore esegue codice da ROM (immutabile).
    
2. La ROM verifica la firma del **bootloader**.
    
3. Il bootloader carica e verifica il **kernel** e i **file system**.
    
4. Se ogni componente è valido, l’esecuzione continua.
    
5. Si stabilisce un **ambiente sicuro** in uno stato conosciuto e fidato.
    

---

### 📈 **Vantaggi**

- Impedisce che malware si insinui nelle prime fasi del boot.
    
- Aumenta la robustezza complessiva del sistema.
    
- In caso di attacco, è spesso possibile **ripristinare** il sistema con un riavvio.
    

---

### 🔐 **Case Study: ARM e Secure Boot**

#### ARM TBSA (Trusted Base System Architecture)

Implementa principi di sicurezza hardware come:

- **Root of Trust**
    
- **Keystore protetti (CryptoCell)**
    
- **TrustZone** (isolamento tra software Trusted e Non-Trusted)
    
- **Secure Boot** (TBB – Trusted Board Boot)
    
- **Aggiornamenti sicuri**
    
- **Gestione del ciclo di vita e dei segreti**
    

#### ARM Trusted Boot Flow

Costruisce una **catena di fiducia** (Chain of Trust) a partire da:

- **BL1 (ROM)**: verifica la firma di BL2.
    
- **BL2**: verifica i bootloader successivi (BL31, BL32, BL33) usando certificati X.509 auto-firmati.
    
- Ogni fase è verificata crittograficamente tramite **hash SHA-256** e **chiavi pubbliche**.
    

---

### 💻 **UEFI Secure Boot**

Sistema usato soprattutto in PC/Server, distinto dal TBB ma con lo stesso obiettivo.

- Usa chiavi asimmetriche: **Platform Key (PK)** e **Key Exchange Key (KEK)**.
    
- Le immagini UEFI sono firmate e verificate secondo le regole di Microsoft Authenticode.
    
- Include **white/black list** aggiornabili tramite variabili firmware protette.
    
- Consente aggiornamenti sicuri dei certificati e blocca esecuzioni non autorizzate.
    

---

### 🧱 **Catena Completa di Fiducia**

Combina **Trusted Boot Board (TBB)** e **UEFI Secure Boot**:

- Diverse chiavi e certificati ma obiettivo comune.
    
- Permette un controllo dalla ROM fino al sistema operativo.
    

---

### ⚠️ **Vulnerabilità comuni**

1. **Fault injection (glitching)**: errori intenzionali per saltare le verifiche delle firme.
    
2. **Chiavi simmetriche mal usate**: se memorizzate sul dispositivo, permettono di creare firmware validi ma malevoli.
    
3. **Secure Boot disattivabile**: alcuni dispositivi permettono di disabilitarlo via software.
    
4. **Root of Trust debole**: se il primo codice eseguibile è modificabile (es. EFI flash), la catena è compromessa.
    
5. **RSA senza padding**: semplificazioni pericolose per la sicurezza crittografica.
    
6. **Crittografia “creativa”**: implementazioni custom o ottimizzate che rompono la sicurezza.
    

---

### ✅ **Best Practices**

- Implementare root of trust su **ROM o memorie protette**.
    
- Usare **PKI robusta** e certificati firmati.
    
- Disabilitare definitivamente modalità insicure (via e-fuse/OTP).
    
- Validare l’intera catena di esecuzione.
    
- Evitare modifiche al protocollo crittografico standard.
    

---

Se vuoi posso aiutarti anche con uno schema grafico del flusso di autenticazione o una checklist di implementazione sicura. Vuoi procedere?