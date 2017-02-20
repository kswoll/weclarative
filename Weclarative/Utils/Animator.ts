namespace Utils {
    export type FrameHandler = (progress: number) => void;

    export class Animator {
        static animate(frame: FrameHandler, duration: number, onDone?: () => void) {
            let start: number | null = null;
            const step = (timestamp: number) => {
                start = start || timestamp;
                const progress = (timestamp - start) / duration;
                frame(progress);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else if (onDone) {
                    onDone();
                }
            };
            window.requestAnimationFrame(step);
        }
    }
}