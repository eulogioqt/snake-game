import appleCrunchSrc from '/src/assets/audio/appleCrunch.mp3';
import snakeHitSrc from '/src/assets/audio/snakeHit.mp3';
import snakeMoveSrc from '/src/assets/audio/snakeMove.mp3';

const playAudio = (audioSrc) => {
    const audio = new Audio(audioSrc);
    audio.play();
}

export const useAudio = () => {
    const playAppleCrunch = () => playAudio(appleCrunchSrc);
    const playSnakeHit = () => playAudio(snakeHitSrc);
    const playSnakeMove = () => playAudio(snakeMoveSrc);

    return {
        playAppleCrunch,
        playSnakeHit,
        playSnakeMove
    }
}