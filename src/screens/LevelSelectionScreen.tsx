import { useGame } from '../context/GameContext';
import { Card, CardContent } from '../components/ui/Card';

import { LEVELS } from '../lib/types';
import { motion } from 'framer-motion';
import { Crown, Star, Target, Zap, Shield } from 'lucide-react';

export function LevelSelectionScreen() {
    const { selectLevel, playerName } = useGame();

    const getLevelIcon = (id: number) => {
        switch (id) {
            case 1: return <Star className="w-6 h-6 text-blue-400" />;
            case 2: return <Zap className="w-6 h-6 text-cyan-400" />;
            case 3: return <Target className="w-6 h-6 text-purple-400" />;
            case 4: return <Shield className="w-6 h-6 text-pink-400" />;
            case 5: return <Crown className="w-6 h-6 text-red-500" />;
            default: return <Star />;
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase neon-text mb-2">
                    Select Your Path
                </h1>
                <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">
                    Welcome, <span className="text-primary">{playerName}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {LEVELS.map((level) => (
                    <motion.div
                        key={level.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Card
                            className={`border-0 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 group overflow-hidden relative`}
                            onClick={() => selectLevel(level.id)}
                        >
                            {/* Level Border Glow */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-${level.color}-500/50 rounded-xl`} />

                            <CardContent className="p-6 flex items-center gap-5 relative z-10">
                                <div className={`p-4 rounded-xl bg-${level.color}-500/10 border border-${level.color}-500/20 group-hover:border-${level.color}-500/50 transition-colors`}>
                                    {getLevelIcon(level.id)}
                                </div>
                                <div className="flex-1 text-left">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold text-white text-lg tracking-wide uppercase">{level.name}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded bg-${level.color}-500/20 text-${level.color}-300 font-bold uppercase`}>
                                            Lvl {level.id}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3 font-medium">{level.description}</p>
                                    <div className="flex gap-4 text-xs font-bold opacity-80">
                                        <span className="text-white">Target: {level.targetScore}</span>
                                        <span className="text-white/50">•</span>
                                        <span className="text-white">Rolls: {level.maxRolls}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <p className="mt-10 text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
                Choose wisely. History is watching.
            </p>
        </div>
    );
}
