import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dices, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { cn } from "../../lib/utils";

interface DiceProps {
    value: number;
    isRolling: boolean;
    className?: string;
}

const diceIcons = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6,
};

export function Dice({ value, isRolling, className }: DiceProps) {
    const [displayValue, setDisplayValue] = useState(value);

    useEffect(() => {
        if (!isRolling) {
            setDisplayValue(value);
        }
    }, [value, isRolling]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (isRolling) {
            interval = setInterval(() => {
                setDisplayValue(Math.floor(Math.random() * 6) + 1);
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isRolling]);

    const Icon = diceIcons[displayValue as keyof typeof diceIcons] || Dices;

    return (
        <div className={cn("flex items-center justify-center p-8", className)}>
            <div className="relative group">
                {/* Glow behind dice */}
                <div className="absolute inset-0 bg-primary/30 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>

                <motion.div
                    animate={isRolling ? {
                        rotate: [0, -15, 15, -360, 360, 0],
                        scale: [1, 0.9, 1, 1.1, 0.9, 1],
                        x: [0, -5, 5, -10, 10, 0],
                        y: [0, -5, 5, -10, 10, 0],
                    } : {
                        rotate: 0,
                        scale: 1,
                        x: 0,
                        y: 0
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                    className="relative z-10"
                >
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-[0_0_30px_rgba(139,92,246,0.2)] p-6 border border-white/10 backdrop-blur-md">
                        <Icon
                            size={120}
                            className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                            strokeWidth={1.5}
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
