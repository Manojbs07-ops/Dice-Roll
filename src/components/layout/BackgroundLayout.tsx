import type { ReactNode } from 'react';

export function BackgroundLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground selection:bg-primary/30">
            {/* Animated Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-900/40 rounded-full mix-blend-screen filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 font-sans">
                {children}
            </div>
        </div>
    );
}
