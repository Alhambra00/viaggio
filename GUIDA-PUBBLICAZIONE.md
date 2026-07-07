# Compagno di Viaggio — Guida alla pubblicazione (PWA)

Pubblicando questi file su GitHub Pages, l'app diventa una vera app installabile:
icona sulla schermata Home, funzionamento offline, e aggiornamenti automatici per
tutti (basta ricaricare i file su GitHub, senza più scambiarsi l'HTML).

## Contenuto della cartella

| File | A cosa serve |
|---|---|
| `index.html` | L'app completa |
| `manifest.webmanifest` | Nome, colori e icone dell'app installata |
| `sw.js` | Service worker: offline + aggiornamenti |
| `icons/` | Icone (Android, Apple, maskable) |

## Pubblicazione su GitHub Pages (10 minuti, gratis)

1. **Crea un account** su https://github.com (se non lo hai già).
2. In alto a destra: **+** → **New repository**.
   - Repository name: `viaggio` (o come preferisci)
   - Visibilità: **Public** (necessario per Pages gratuito)
   - → **Create repository**
3. Nella pagina del repository: **uploading an existing file** (link nel riquadro
   iniziale) oppure **Add file → Upload files**.
   - Trascina dentro **tutto il contenuto di questa cartella**: `index.html`,
     `manifest.webmanifest`, `sw.js` e la cartella `icons` (trascina i 5 PNG:
     GitHub ricrea la cartella se li trascini dentro `icons/` — in alternativa
     carica prima i file singoli e le icone in un secondo caricamento scrivendo
     `icons/` nel percorso).
   - In basso: **Commit changes**.
4. **Settings** (in alto) → **Pages** (menu a sinistra):
   - Source: **Deploy from a branch**
   - Branch: **main** — cartella **/ (root)** → **Save**
5. Aspetta 1–2 minuti. In cima alla pagina Pages comparirà l'indirizzo:
   `https://TUONOME.github.io/viaggio/`

## Installazione sui telefoni (tutti e tre)

1. Apri l'indirizzo con **Chrome** sul telefono.
2. Menu **⋮ → Aggiungi a schermata Home** (o "Installa app" se proposto).
3. L'app compare con la sua icona e si apre a schermo intero, anche offline.

## Dati: cosa sapere

- **I dati NON sono nel sito**: restano nella memoria del telefono di ognuno
  (e su Firebase per la parte sincronizzata). Il sito pubblicato contiene solo
  l'app "vuota": chiunque lo visiti parte da zero, non vede i vostri dati.
- Prima installazione: se avevi dati nella versione "file HTML", usa
  **Impostazioni → Backup completo** nel vecchio file per salvarli, poi
  **Ripristina** nella nuova app installata.

## Aggiornare l'app in futuro

1. Sostituisci `index.html` nel repository (Upload files → sovrascrivi).
2. Apri `sw.js` su GitHub (matita ✏ per modificare) e cambia `VERSION = 'v1'`
   in `v2` (poi `v3`, ecc.) → Commit.
3. Sui telefoni: basta chiudere e riaprire l'app (o ricaricarla) e la nuova
   versione arriva da sola.

## Problemi comuni

- **404 dopo la pubblicazione** → aspetta 2 minuti e ricarica; controlla che il
  file si chiami esattamente `index.html`.
- **L'icona non compare / niente "Installa"** → verifica che `manifest.webmanifest`
  e la cartella `icons/` siano stati caricati; ricarica la pagina una volta.
- **Le modifiche non arrivano** → hai cambiato `VERSION` in `sw.js`? È quello
  che dice ai telefoni di scaricare la versione nuova.
