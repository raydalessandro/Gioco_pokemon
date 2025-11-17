export enum PokemonType {
  NORMAL = "normal",
  FIRE = "fire",
  WATER = "water",
  ELECTRIC = "electric",
  GRASS = "grass",
  ICE = "ice",
  FIGHTING = "fighting",
  POISON = "poison",
  GROUND = "ground",
  FLYING = "flying",
  PSYCHIC = "psychic",
  BUG = "bug",
  ROCK = "rock",
  GHOST = "ghost",
  DRAGON = "dragon",
  DARK = "dark",
  STEEL = "steel",
  FAIRY = "fairy"
}

export type PokemonTypeString = 
  | "normal" | "fire" | "water" | "electric" | "grass" | "ice" 
  | "fighting" | "poison" | "ground" | "flying" | "psychic" 
  | "bug" | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";

export interface PokemonStats {
  name: string;
  type: PokemonType;
  max_hp: number;
  max_energy: number;
  icon: string;
  description: string;
  moves: string[];
  current_hp: number;
  current_energy: number;
  status: string;
  momentum: number;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonTypeString[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  moves: Move[];
  sprite: string;
}

export interface Move {
  name: string;
  type: PokemonTypeString;
  category: "physical" | "special" | "status";
  power: number;
  accuracy: number;
  energyCost: number;
  description: string;
}

export interface BattleState {
  playerPokemon: BattlePokemon;
  opponentPokemon: BattlePokemon;
  turn: number;
  playerTurn: boolean;
  battleLog: string[];
  status: "active" | "player-won" | "opponent-won";
}

export interface BattlePokemon extends Pokemon {
  currentHp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  statusCondition?: "burn" | "freeze" | "paralysis" | "poison" | "sleep" | null;
}

export interface BattleCommand {
  action: "attack" | "defend" | "item" | "switch";
  target: "opponent" | "self";
  move?: string;
  reasoning?: string;
}

export interface BattleResult {
  damage: number;
  effectiveness: 0.5 | 1.0 | 2.0;
  critical: boolean;
  message: string;
  newState: BattleState;
}
