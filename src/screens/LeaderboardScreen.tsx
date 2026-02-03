import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ArrowLeft, Trophy } from 'lucide-react';
import { fetchLeaderboard } from '../lib/supabase';
import { LEVELS, type PlayerRecord } from '../lib/types';

interface LeaderboardScreenProps {
    onBack: () => void;
}

export function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
    const { history } = useGame();
    const [leaderboard, setLeaderboard] = useState<PlayerRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState(1);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const data = await fetchLeaderboard();

            if (data && data.length > 0) {
                const mappedData: PlayerRecord[] = data.map((item: any) => ({
                    name: item.player_name,
                    regNo: item.reg_no,
                    level: item.level || 1,
                    score: item.score,
                    rollsUsed: item.rolls_used,
                    result: item.result,
                    date: item.created_at
                }));
                setLeaderboard(mappedData);
            } else {
                setLeaderboard(history);
            }
            setLoading(false);
        }

        loadData();
    }, [history]);

    const filteredLeaderboard = leaderboard.filter(game => (game.level || 1) === selectedLevel);

    const sortedLeaderboard = [...filteredLeaderboard].sort((a, b) => {
        if (a.score !== b.score) return b.score - a.score;
        return a.rollsUsed - b.rollsUsed;
    });

    return (
        <div className="min-h-screen p-4 max-w-md mx-auto flex flex-col">
            <header className="w-full flex items-center py-4 mb-2">
                <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-white/10 text-white rounded-full">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="ml-4">
                    <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase neon-text">Leaderboard</h2>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Hall of Fame</p>
                </div>
            </header>

            {/* Level Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-2">
                {LEVELS.map((level) => {
                    // Static mapping to ensure Tailwind generates these classes
                    const activeColors: Record<string, string> = {
                        blue: 'bg-blue-500 border-blue-500',
                        cyan: 'bg-cyan-500 border-cyan-500',
                        purple: 'bg-purple-500 border-purple-500',
                        pink: 'bg-pink-500 border-pink-500',
                        red: 'bg-red-500 border-red-500',
                    };

                    const isActive = selectedLevel === level.id;
                    const activeClass = activeColors[level.color] || 'bg-primary border-primary';

                    return (
                        <button
                            key={level.id}
                            onClick={() => setSelectedLevel(level.id)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${isActive
                                ? `${activeClass} text-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105`
                                : `bg-transparent text-muted-foreground border-white/10 hover:border-white/30 hover:text-white`
                                }`}
                        >
                            Level {level.id}
                        </button>
                    );
                })}
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pb-8 scrollbar-hide">
                {loading ? (
                    <div className="text-center py-10 text-white animate-pulse">Loading Global Scores...</div>
                ) : sortedLeaderboard.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <div className="bg-white/5 p-6 rounded-full w-fit mx-auto mb-6 border border-white/5">
                            <Trophy className="h-10 w-10 opacity-30" />
                        </div>
                        <p className="text-lg font-bold text-white/50">No scores yet for Level {selectedLevel}</p>
                        <p className="text-xs opacity-30 mt-2 uppercase tracking-widest">Be the first legend</p>
                    </div>
                ) : (
                    sortedLeaderboard.map((game, index) => {
                        return (
                            <Card key={index} className="overflow-hidden border-0 bg-transparent shadow-none group">
                                <div className="relative bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:bg-black/60 group-hover:transform group-hover:scale-[1.01]">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${game.result === 'won' ? 'bg-gradient-to-b from-green-400 to-green-600' : 'bg-gradient-to-b from-red-400 to-red-600'}`} />

                                    <CardContent className="p-3 pl-5 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${index < 3 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-lg shadow-yellow-500/20' : 'bg-white/10 text-white/50'}`}>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-base leading-none mb-1">{game.name}</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">
                                                        {game.regNo}
                                                    </span>
                                                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${game.result === 'won' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                        {game.result.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-black text-xl text-white neon-text">{game.score}</p>
                                            <p className="text-[8px] text-muted-foreground uppercase tracking-wider font-bold">Points</p>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    );
}
