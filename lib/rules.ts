export const BATTLE_RULES = `
# Regole della Battaglia Pokémon

## Statistiche Base
- HP (Health Points): Punti vita del Pokémon
- Attack: Potenza degli attacchi fisici
- Defense: Resistenza agli attacchi fisici
- Special Attack: Potenza degli attacchi speciali
- Special Defense: Resistenza agli attacchi speciali
- Speed: Velocità, determina chi attacca per primo
- Energy: Energia per usare le mosse (100 punti iniziali, si rigenera di 20 per turno)

## Tipi di Mosse
1. **Attacchi Fisici**: Usano Attack vs Defense
2. **Attacchi Speciali**: Usano Special Attack vs Special Defense
3. **Mosse di Stato**: Modificano statistiche o infliggono condizioni

## Calcolo del Danno
Base Damage = (Attack/Defense ratio) × Power × Type Effectiveness × Random(0.85-1.0)
- Critical Hit (5% chance): Danno × 1.5
- Type Advantage: ×2.0 (es. Fuoco vs Erba)
- Type Disadvantage: ×0.5
- Neutral: ×1.0

## Costi Energia
- Mossa base (es. Tackle): 10 energia
- Mossa media (es. Thunderbolt): 25 energia
- Mossa forte (es. Thunder): 40 energia
- Mossa potente (es. Hyper Beam): 60 energia

## Condizioni di Vittoria
- Un Pokémon arriva a 0 HP
- Un Pokémon non può più combattere

## Turni
1. Il giocatore sceglie un'azione
2. L'IA valuta la mossa e calcola i risultati
3. Il Pokémon più veloce attacca per primo
4. Aggiornamento dello stato di battaglia
5. Rigenera energia (+20)
`;
