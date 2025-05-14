# Checklist App

Un'applicazione minimalista per gestire checklist con tema scuro ed esportazione in formato JSON.

## Caratteristiche

- Tema scuro con palette di colori personalizzata
- Creazione di checklist con titoli personalizzati
- Aggiunta, modifica e rimozione di elementi dalle checklist
- Salvataggio di più checklist
- Esportazione e importazione di checklist in formato JSON
- Timestamp in formato ISO standard

## Esecuzione dell'applicazione

## Installazione dell'applicazione

```bash
npm install
```

### Sviluppo locale

```bash
npm run dev
```

L'applicazione sarà disponibile all'indirizzo: http://localhost:5000

### Utilizzo con Docker

Il progetto include tutti i file necessari per eseguire l'applicazione in un container Docker.

#### Opzione 1: Docker

```bash
# Costruire l'immagine Docker
./build-docker.sh

# Eseguire il container
./run-docker.sh
```

#### Opzione 2: Docker Compose

```bash
# Eseguire l'applicazione con Docker Compose
./run-docker-compose.sh
```

L'applicazione sarà disponibile all'indirizzo: http://localhost:3005

Per arrestare il container Docker Compose:
```bash
docker-compose down
```

## Struttura del progetto

- `client/`: Codice frontend React
- `server/`: API backend Express
- `shared/`: Tipi e schemi condivisi
- `Dockerfile`: Configurazione per la costruzione dell'immagine Docker
- `docker-compose.yml`: Configurazione per Docker Compose