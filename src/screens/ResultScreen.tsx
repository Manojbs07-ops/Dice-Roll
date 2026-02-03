import { useGame } from '../context/GameContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Trophy, RefreshCw, List, Frown, Layers, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultScreenProps {
    onShowLeaderboard: () => void;
}

export function ResultScreen({ onShowLeaderboard }: ResultScreenProps) {
    const { status, score, rollsUsed, resetGame, restartGame, changeLevel, playerName, level } = useGame();

    const isWin = status === 'won';

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className={`w-full max-w-md border shadow-2xl backdrop-blur-2xl bg-black/40 ${isWin ? 'border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.2)]' : 'border-red-500/30 shadow-[0_0_50px_rgba(239,68,68,0.2)]'}`}>
                <CardHeader className="text-center pt-8">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className={`mx-auto rounded-full p-6 mb-4 relative ${isWin ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-500'}`}
                    >
                        {/* Glow effect */}
                        <div className={`absolute inset-0 blur-xl opacity-50 ${isWin ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div className="relative z-10">
                            {isWin ? <Trophy size={48} strokeWidth={1.5} /> : <Frown size={48} strokeWidth={1.5} />}
                        </div>
                    </motion.div>
                    <CardTitle className={`text-3xl font-black uppercase tracking-tighter ${isWin ? 'text-green-500 neon-text' : 'text-red-500 neon-text'}`}>
                        {isWin ? "Victory!" : "Defeat"}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-white/50 mt-1 uppercase tracking-widest">
                        Level {level} • {isWin ? "Completed" : "Failed"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest mb-1">Final Score</p>
                            <p className="text-2xl font-black text-white">{score}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <p className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest mb-1">Rolls Used</p>
                            <p className="text-2xl font-black text-white">{rollsUsed}</p>
                        </div>
                    </div>
                    <div className="text-center text-xs text-muted-foreground">
                        <span className="opacity-50">Player: </span><span className="font-bold text-white/80">{playerName}</span>
                    </div>
                </CardContent>

                <CardFooter className="flex-col gap-3 pb-8">
                    {/* Primary Action */}
                    <Button
                        onClick={restartGame}
                        className={`w-full text-lg py-6 font-bold tracking-widest uppercase rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] ${isWin ? "bg-green-600 hover:bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"}`}
                    >
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Try Again
                    </Button>

                    {/* Change Level */}
                    <Button
                        onClick={changeLevel}
                        className="w-full py-5 font-bold tracking-widest uppercase rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.01]"
                    >
                        <Layers className="mr-2 h-4 w-4" />
                        Change Level
                    </Button>

                    {/* Secondary Actions */}
                    <div className="grid grid-cols-2 gap-3 w-full mt-2">
                        <Button onClick={onShowLeaderboard} variant="outline" className="w-full border-white/10 bg-transparent hover:bg-white/5 text-white/70 hover:text-white uppercase tracking-widest text-[10px] font-bold h-10">
                            <List className="mr-2 h-3 w-3" />
                            Leaderboard
                        </Button>
                        <Button onClick={resetGame} variant="outline" className="w-full border-white/10 bg-transparent hover:bg-red-900/20 text-red-400/70 hover:text-red-400 uppercase tracking-widest text-[10px] font-bold hover:border-red-500/30 h-10">
                            <LogOut className="mr-2 h-3 w-3" />
                            Quit
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
