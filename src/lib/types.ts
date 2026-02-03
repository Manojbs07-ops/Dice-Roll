export type GameStatus = 'idle' | 'level_selection' | 'playing' | 'won' | 'lost';

export interface LevelConfig {
    id: number;
    name: string;
    description: string;
    targetScore: number;
    maxRolls: number;
    color: string; // Tailwind color class prefix (e.g., 'green', 'blue')
}

export const LEVELS: LevelConfig[] = [
    { id: 1, name: 'Beginner', description: 'The journey starts.', targetScore: 25, maxRolls: 5, color: 'blue' },
    { id: 2, name: 'Amateur', description: 'Getting warmer.', targetScore: 50, maxRolls: 10, color: 'cyan' },
    { id: 3, name: 'Pro', description: 'Serious business.', targetScore: 75, maxRolls: 15, color: 'purple' },
    { id: 4, name: 'Master', description: 'True skill required.', targetScore: 100, maxRolls: 20, color: 'pink' },
    { id: 5, name: 'Legend', description: 'Only the best survive.', targetScore: 150, maxRolls: 25, color: 'red' },
];

export interface PlayerRecord {
    name: string;
    regNo: string;
    level: number;
    score: number;
    rollsUsed: number;
    result: 'won' | 'lost';
    date: string;
}

export interface GameState {
    playerName: string;
    regNo: string;
    level: number;
    score: number;
    rollsUsed: number;
    maxRolls: number;
    targetScore: number;
    status: GameStatus;
    currentRoll: number; // Value of the last roll (1-6)
    history: PlayerRecord[];
}

export const INITIAL_STATE: GameState = {
    playerName: '',
    regNo: '',
    level: 1, // Default to level 1
    score: 0,
    rollsUsed: 0,
    maxRolls: 5, // Default for level 1
    targetScore: 25, // Default for level 1
    status: 'idle',
    currentRoll: 1,
    history: [],
};
