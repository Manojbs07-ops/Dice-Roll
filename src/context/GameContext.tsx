import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_STATE, type GameState, type PlayerRecord, LEVELS } from '../lib/types';

interface GameContextType extends GameState {
    startGame: (name: string, regNo: string) => void;
    selectLevel: (levelId: number) => void;
    changeLevel: () => void;
    rollDice: () => void;
    resetGame: () => void; // Full quit
    restartGame: () => void; // Replay same level
    setPlayerName: (name: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<GameState>(() => {
        // Load history from local storage
        const savedHistory = localStorage.getItem('diceRollHistory');
        return {
            ...INITIAL_STATE,
            history: savedHistory ? JSON.parse(savedHistory) : [],
        };
    });

    // Save history to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('diceRollHistory', JSON.stringify(state.history));
    }, [state.history]);

    // Step 1: Login (Name + Reg) -> Go to Level Select
    const startGame = (name: string, regNo: string) => {
        setState(prev => ({
            ...prev,
            playerName: name,
            regNo: regNo,
            status: 'level_selection', // New status for intermediate screen
        }));
    };

    // Step 2: Select Level -> Start Playing
    const selectLevel = (levelId: number) => {
        const levelConfig = LEVELS.find(l => l.id === levelId) || LEVELS[0];
        setState(prev => ({
            ...prev,
            level: levelId,
            targetScore: levelConfig.targetScore,
            maxRolls: levelConfig.maxRolls,
            score: 0,
            rollsUsed: 0,
            status: 'playing',
            currentRoll: 1,
        }));
    };

    // From Result Screen: Go back to Level Selection
    const changeLevel = () => {
        setState(prev => ({
            ...prev,
            status: 'level_selection',
            score: 0,
            rollsUsed: 0,
            currentRoll: 1,
        }));
    };

    // From Result Screen: Replay SAME level immediately
    const restartGame = () => {
        setState(prev => ({
            ...prev,
            score: 0,
            rollsUsed: 0,
            status: 'playing',
            currentRoll: 1,
        }));
    };

    const rollDice = () => {
        if (state.status !== 'playing') return;

        const roll = Math.floor(Math.random() * 6) + 1;

        setState(prev => {
            const newScore = prev.score + roll;
            const newRollsUsed = prev.rollsUsed + 1;
            let newStatus = prev.status;

            // Check win/loss conditions
            if (newScore >= prev.targetScore && newRollsUsed <= prev.maxRolls) {
                newStatus = 'won';
            } else if (newRollsUsed >= prev.maxRolls) {
                newStatus = 'lost';
            }

            // If game ended, add to history
            let newHistory = prev.history;
            if (newStatus !== 'playing') {
                const record: PlayerRecord = {
                    name: prev.playerName,
                    regNo: prev.regNo,
                    level: prev.level,
                    score: newScore,
                    rollsUsed: newRollsUsed,
                    result: newStatus as 'won' | 'lost',
                    date: new Date().toISOString(),
                };
                newHistory = [record, ...prev.history];

                // Fire and forget save to Supabase
                import('../lib/supabase').then(({ saveGameResult }) => {
                    saveGameResult(record);
                });
            }

            return {
                ...prev,
                score: newScore,
                rollsUsed: newRollsUsed,
                currentRoll: roll,
                status: newStatus,
                history: newHistory,
            };
        });
    };

    // Full Reset (Quit) -> Back to Login
    const resetGame = () => {
        setState(prev => ({
            ...INITIAL_STATE,
            history: prev.history,
        }));
    };

    const setPlayerName = (name: string) => {
        setState(prev => ({ ...prev, playerName: name }));
    };

    return (
        <GameContext.Provider
            value={{
                ...state,
                startGame,
                selectLevel,
                changeLevel,
                rollDice,
                resetGame,
                restartGame,
                setPlayerName
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
