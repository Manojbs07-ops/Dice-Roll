import { WelcomeScreen } from './screens/WelcomeScreen';
import { GameScreen } from './screens/GameScreen';
import { ResultScreen } from './screens/ResultScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { LevelSelectionScreen } from './screens/LevelSelectionScreen';
import { useGame } from './context/GameContext';
import { useState } from 'react';

function AppContent() {
  // Use the global status from GameContext to decide which screen to show
  const { status } = useGame();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  if (showLeaderboard) {
    return <LeaderboardScreen onBack={() => setShowLeaderboard(false)} />;
  }

  // State Machine for Screen Navigation
  switch (status) {
    case 'idle':
      return <WelcomeScreen onShowLeaderboard={() => setShowLeaderboard(true)} />;
    case 'level_selection':
      return <LevelSelectionScreen />;
    case 'playing':
      return <GameScreen />;
    case 'won':
    case 'lost':
      // Result screen handles its own "Play Again" logic
      return <ResultScreen onShowLeaderboard={() => setShowLeaderboard(true)} />;
    default:
      return <WelcomeScreen onShowLeaderboard={() => setShowLeaderboard(true)} />;
  }
}

export default AppContent;
