export interface Pokemon {
  id: number;
  name: string;
  types: string[];
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
  type: string;
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
