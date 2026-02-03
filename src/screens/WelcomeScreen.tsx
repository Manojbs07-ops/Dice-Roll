import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Dices } from 'lucide-react';

interface WelcomeScreenProps {
    onShowLeaderboard: () => void;
}

export function WelcomeScreen({ onShowLeaderboard }: WelcomeScreenProps) {
    const { startGame } = useGame();
    const [name, setName] = useState('');
    const [regNo, setRegNo] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && regNo.trim()) {
            startGame(name, regNo);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 py-12 animate-in fade-in duration-700 overflow-y-auto">
            <Card className="w-full max-w-md border-primary/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] bg-black/40 backdrop-blur-2xl relative z-10 shrink-0 my-auto">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-24 h-24 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-primary/30 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <Dices className="w-12 h-12 text-primary relative z-10" />
                    </div>
                    <CardTitle className="text-5xl font-black bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent neon-text tracking-tighter">
                        DICE ROLL
                    </CardTitle>
                    <CardDescription className="text-primary font-bold tracking-[0.2em] uppercase text-xs mt-2 opacity-80">
                        Challenge Edition
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">


                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2 relative group">
                            <label htmlFor="regNo" className="text-[10px] uppercase font-bold text-primary tracking-widest ml-1">
                                Registration Number
                            </label>
                            <Input
                                id="regNo"
                                placeholder="ENTER REG. NO."
                                value={regNo}
                                onChange={(p) => setRegNo(p.target.value)}
                                className="text-lg py-7 bg-black/50 border-white/10 focus:border-primary/50 focus:ring-primary/50 text-center tracking-wider font-bold placeholder:text-muted-foreground/30 rounded-xl transition-all duration-300 group-hover:border-primary/30 text-white"
                                autoFocus
                                autoComplete="off"
                            />
                        </div>

                        <div className="space-y-2 relative group">
                            <label htmlFor="name" className="text-[10px] uppercase font-bold text-primary tracking-widest ml-1">
                                Player Name
                            </label>
                            <Input
                                id="name"
                                placeholder="ENTER YOUR NAME"
                                value={name}
                                onChange={(p) => setName(p.target.value)}
                                className="text-lg py-7 bg-black/50 border-white/10 focus:border-primary/50 focus:ring-primary/50 text-center tracking-wider font-bold placeholder:text-muted-foreground/30 rounded-xl transition-all duration-300 group-hover:border-primary/30 text-white"
                                autoComplete="off"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full text-lg py-7 font-black tracking-widest shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-purple-700 border-none"
                            disabled={!name.trim() || !regNo.trim()}
                            size="lg"
                        >
                            START GAME
                        </Button>
                    </form>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onShowLeaderboard}
                        className="w-full py-6 uppercase tracking-widest text-xs font-bold border-white/10 hover:bg-white/5 hover:text-white text-muted-foreground/70 transition-all rounded-xl mt-2"
                    >
                        View Leaderboard
                    </Button>
                </CardContent>
                <CardFooter className="flex-col gap-6 pb-8 pt-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
                        Are you feeling lucky?
                    </p>

                    {/* About Us Inside Card */}
                    <div className="w-full pt-6 border-t border-white/10 text-center">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/40 mb-3">Made By</p>
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-white/60 tracking-wider">
                                Manoj BS <span className="text-primary/40 ml-1 font-mono text-[8px]">(RA2411003010382)</span>
                            </p>
                            <p className="text-[10px] font-bold text-white/60 tracking-wider">
                                Konatham Lakshmi Ananya <span className="text-primary/40 ml-1 font-mono text-[8px]">(RA2411003010327)</span>
                            </p>
                            <p className="text-[10px] font-bold text-white/60 tracking-wider">
                                Vikhyat Jain <span className="text-primary/40 ml-1 font-mono text-[8px]">(RA2411003010357)</span>
                            </p>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
