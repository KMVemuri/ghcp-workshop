
import Image from "next/image";
import { useEffect, useState } from "react";

interface BallState {
  id: string;
  top: number; // percent (0-100)
  left: number; // percent (0-100)
  size: number;
  rotation: number;
  isKicking: boolean;
  kickTransform: string;
}

function getRandomPosition(size: number) {
  // Keep balls within 5% to 85% of the container (avoid edges)
  const top = Math.random() * 80 + 5;
  const left = Math.random() * 80 + 5;
  return { top, left };
}

function getRandomKick() {
  // Random angle (0-360), random force (80-180px)
  const angle = Math.random() * 2 * Math.PI;
  const force = 80 + Math.random() * 100;
  const dx = Math.cos(angle) * force;
  const dy = Math.sin(angle) * force * -1; // negative for upward
  const rot = (Math.random() - 0.5) * 60; // -30 to +30 deg
  return {
    transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(1.15)`
  };
}

// Use deterministic initial positions for SSR hydration
const initialBallConfigs = [
  { id: "ball-1", top: 10, left: 10, size: 140, rotation: -8 },
  { id: "ball-2", top: 20, left: 20, size: 160, rotation: 6 },
  { id: "ball-3", top: 30, left: 30, size: 120, rotation: 12 },
  { id: "ball-4", top: 40, left: 15, size: 110, rotation: -12 },
  { id: "ball-5", top: 55, left: 35, size: 130, rotation: 9 },
  { id: "ball-6", top: 65, left: 60, size: 150, rotation: -4 },
  { id: "ball-7", top: 75, left: 45, size: 100, rotation: 14 },
  { id: "ball-8", top: 25, left: 70, size: 120, rotation: -6 },
  { id: "ball-9", top: 15, left: 55, size: 135, rotation: 5 },
  { id: "ball-10", top: 35, left: 80, size: 115, rotation: -10 },
  { id: "ball-11", top: 12, left: 30, size: 145, rotation: 7 },
  { id: "ball-12", top: 22, left: 85, size: 105, rotation: -14 },
  { id: "ball-13", top: 32, left: 50, size: 125, rotation: 11 },
  { id: "ball-14", top: 42, left: 5, size: 155, rotation: -5 },
  { id: "ball-15", top: 52, left: 75, size: 110, rotation: 13 },
  { id: "ball-16", top: 62, left: 25, size: 135, rotation: -9 },
  { id: "ball-17", top: 72, left: 90, size: 120, rotation: 4 },
  { id: "ball-18", top: 82, left: 40, size: 100, rotation: -7 },
  { id: "ball-19", top: 28, left: 60, size: 150, rotation: 2 },
  { id: "ball-20", top: 48, left: 65, size: 130, rotation: -11 },
];

const initialBalls: BallState[] = initialBallConfigs.map((ball) => ({
  ...ball,
  isKicking: false,
  kickTransform: "",
}));
const BasketballBackground = () => {
  const [balls, setBalls] = useState<BallState[]>(initialBalls);

  // On mount, randomize ball positions (client only)
  useEffect(() => {
    setBalls((prev) =>
      prev.map((ball) => {
        const { top, left } = getRandomPosition(ball.size);
        return { ...ball, top, left };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKick = (id: string) => {
    setBalls((prev) =>
      prev.map((ball) =>
        ball.id === id
          ? {
              ...ball,
              isKicking: true,
              kickTransform: getRandomKick().transform,
            }
          : ball
      )
    );
    setTimeout(() => {
      setBalls((prev) =>
        prev.map((ball) => {
          if (ball.id !== id) return ball;
          const { top, left } = getRandomPosition(ball.size);
          return {
            ...ball,
            top,
            left,
            isKicking: false,
            kickTransform: "",
            rotation: (Math.random() - 0.5) * 40, // -20 to +20 deg
          };
        })
      );
    }, 700);
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {balls.map((ball) => (
        <div
          key={ball.id}
          className="pointer-events-auto absolute"
          style={{
            top: `${ball.top}%`,
            left: `${ball.left}%`,
            transition: ball.isKicking ? "none" : "top 0.7s, left 0.7s",
            zIndex: 1,
          }}
        >
          <div
            className="basketball-kick"
            style={{
              transform: ball.isKicking
                ? ball.kickTransform
                : `rotate(${ball.rotation}deg)`,
              transition: ball.isKicking
                ? "transform 0.7s cubic-bezier(.25,.46,.45,.94)"
                : "transform 0.2s",
              cursor: "pointer",
            }}
            aria-hidden
            onMouseEnter={() => handleKick(ball.id)}
          >
            <Image
              src="/basketball.png"
              alt=""
              width={ball.size}
              height={ball.size}
              className="select-none drop-shadow-md"
              priority={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BasketballBackground;
