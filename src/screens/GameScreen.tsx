import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Dice } from '../components/game/Dice';
import { Button } from '../components/ui/Button';

import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

export function GameScreen() {
    const {
        playerName,
        score,
        rollsUsed,
        maxRolls,
        targetScore,
        currentRoll,
        rollDice,
        status
    } = useGame();

    const [isRolling, setIsRolling] = useState(false);

    const handleRoll = () => {
        if (isRolling || status !== 'playing') return;

        setIsRolling(true);
        // Animation duration
        setTimeout(() => {
            rollDice();
            setIsRolling(false);
        }, 800);
    };

    const rollsLeft = maxRolls - rollsUsed;
    const progress = (score / targetScore) * 100;

    return (
        <div className="min-h-screen flex flex-col items-center justify-between p-6 max-w-md mx-auto relative">
            {/* Header Stats */}
            <header className="w-full flex justify-between items-center py-4 bg-black/20 backdrop-blur-md rounded-2xl px-6 border border-white/5 shadow-lg">
                <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Player</p>
                    <h2 className="text-xl font-black text-white">{playerName}</h2>
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-primary font-bold">
                        <Target size={16} />
                        <span className="text-xl">{targetScore}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Goal</p>
                </div>
            </header>

            {/* Main Game Area */}
            <main className="w-full flex-1 flex flex-col justify-center gap-8 py-8">

                {/* Score Display */}
                <div className="text-center relative">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary/80 font-bold mb-2">Current Score</p>
                    <motion.div
                        key={score}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-8xl font-black text-white neon-text leading-none"
                    >
                        {score}
                    </motion.div>
                </div>

                {/* Dice */}
                <div className="flex-1 flex items-center justify-center">
                    <Dice value={currentRoll} isRolling={isRolling} />
                </div>

            </main>

            {/* Footer Controls */}
            <div className="w-full space-y-6 pb-6">

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Rolls Used</p>
                        <p className="text-2xl font-bold text-white">{rollsUsed}<span className="text-muted-foreground text-sm">/{maxRolls}</span></p>
                    </div>
                    <div className={`p-3 rounded-xl border border-white/5 flex flex-col items-center justify-center backdrop-blur-sm ${rollsLeft <= 3 ? 'bg-red-900/20 border-red-500/30' : 'bg-black/30'}`}>
                        <p className={`text-[10px] uppercase tracking-widest font-bold ${rollsLeft <= 3 ? 'text-red-400' : 'text-muted-foreground'}`}>Rolls Left</p>
                        <p className={`text-2xl font-bold ${rollsLeft <= 3 ? 'text-red-500 neon-text' : 'text-white'}`}>{rollsLeft}</p>
                    </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-primary to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                        />
                    </div>
                </div>

                {/* CTA */}
                <Button
                    onClick={handleRoll}
                    disabled={isRolling || status !== 'playing'}
                    className="w-full text-xl py-8 font-black tracking-widest uppercase rounded-2xl shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all bg-gradient-to-r from-primary to-purple-600 border-none disabled:opacity-50 disabled:shadow-none"
                    size="lg"
                >
                    {isRolling ? "Rolling..." : "ROLL DICE"}
                </Button>
            </div>
        </div>
    );
}
