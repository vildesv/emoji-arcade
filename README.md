# Emoji Arcade 🎮

**Emoji Arcade** er et retro-inspirert memory-spill på nett. Spilleren matcher emoji-par i et rutenett med tre vanskelighetsgrader, teller trekk og par, og får feedback når alle par er funnet.  

---

## 🎯 Funksjoner / Features

- **Tre vanskelighetsgrader / Three difficulty levels**:  
  - Lett (6 par / 6 pairs)  
  - Middels (8 par / 8 pairs)  
  - Vanskelig (10 par / 10 pairs)  
- **Ny runde / New Game**: Start på nytt med samme vanskelighetsgrad  
- **Status / Status**: Viser antall trekk og antall par funnet / Shows moves and matched pairs  
- **Seiersfeedback / Win feedback**: Animasjon når alle par er matchet / Animation when all pairs are found  

---

## 🛠️ Teknologi / Tech

- **HTML5**: Semantisk struktur / Semantic structure (`header`, `main`, `section`, `button`, `footer`)  
- **CSS3**:  
  - Grid-basert spillebrett / Grid-based game board  
  - Flip-effekt med `transform` og `transition` / Flip effect with `transform` and `transition`  
  - Match- og seiers-effekter / Match & win effects with `::after` and keyframes  
  - Responsivt design og fokusstiler / Responsive design and focus styles  
- **Vanilla JavaScript**:  
  - Duplisering og stokking av emoji-lister / Duplicate and shuffle emoji lists  
  - Spilllogikk: vend → sjekk match → behold/flip tilbake / Game logic: flip → check match → keep/flip back  
  - Låsing av input under evaluering / Lock input while evaluating two cards  
  - Ny runde / New game resets state and shuffles cards  
  - DOM-manipulasjon med `createElement`, `appendChild`, `textContent`, `classList`  

---

## 📁 Filstruktur / File structure
/emoji-arcade
│
├─ index.html ← Hovedfil / Main HTML
├─ style.css ← All styling / All styling (grid, cards, buttons, animations)
├─ app.js ← Spill-logikk / Game logic
└─ README.md

---

## 🕹️ Hvordan spille / How to play

1. Velg vanskelighetsgrad fra dropdown / Select difficulty from dropdown.  
2. Klikk på to kort for å se om de matcher / Click two cards to see if they match.  
3. Matcher kortene? De blir stående åpne / Cards match? They stay open.  
4. Matcher ikke? Kortene snur seg tilbake / Cards don't match? They flip back.  
5. Fortsett til alle par er funnet / Keep going until all pairs are found.  
6. Trykk “Ny runde” / Press "New Game" for å starte på nytt / to restart.