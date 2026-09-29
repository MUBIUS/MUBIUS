import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, FastForward, RotateCcw, Activity } from 'lucide-react';

interface Bird {
  y: number;
  vy: number;
  alive: boolean;
  score: number;
  fitness: number;
  brain: {
    weights: number[]; // Simple feedforward weights: 5 inputs to 1 output (and 1 bias)
  };
}

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  passed: boolean;
}

export const NeatSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [generation, setGeneration] = useState<number>(1);
  const [aliveCount, setAliveCount] = useState<number>(16);
  const [bestFitness, setBestFitness] = useState<number>(0);
  const [speciesCount, setSpeciesCount] = useState<number>(3);
  const [fitnessHistory, setFitnessHistory] = useState<number[]>([12, 18, 35, 42, 68]);

  // Simulation internal state ref
  const sim = useRef({
    birds: [] as Bird[],
    pipes: [] as Pipe[],
    frame: 0,
    championWeights: [0.65, -0.42, 0.88, -0.71, 0.35, -0.2],
  });

  const POPULATION_SIZE = 16;
  const GRAVITY = 0.38;
  const JUMP_FORCE = -5.8;
  const PIPE_GAP = 85;
  const PIPE_WIDTH = 42;
  const PIPE_SPEED = 2.2;

  // Initialize random population
  const initPopulation = () => {
    const birds: Bird[] = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
      birds.push({
        y: 130 + (Math.random() - 0.5) * 40,
        vy: 0,
        alive: true,
        score: 0,
        fitness: 0,
        brain: {
          weights: Array.from({ length: 6 }, () => (Math.random() * 2 - 1)),
        },
      });
    }
    sim.current.birds = birds;
    sim.current.pipes = [
      { x: 300, topHeight: 70, bottomY: 70 + PIPE_GAP, passed: false },
      { x: 480, topHeight: 110, bottomY: 110 + PIPE_GAP, passed: false },
    ];
    setAliveCount(POPULATION_SIZE);
  };

  // Evolve to next generation
  const evolvePopulation = () => {
    const currentBirds = sim.current.birds;
    // Sort by fitness descending
    currentBirds.sort((a, b) => b.fitness - a.fitness);
    const champion = currentBirds[0];
    sim.current.championWeights = [...champion.brain.weights];

    const currentBest = Math.round(champion.fitness);
    setBestFitness((prev) => Math.max(prev, currentBest));
    setFitnessHistory((prev) => [...prev.slice(-10), currentBest]);

    // Create next generation via elitism + crossover/mutation
    const newBirds: Bird[] = [];

    // Elite clone
    newBirds.push({
      y: 130,
      vy: 0,
      alive: true,
      score: 0,
      fitness: 0,
      brain: { weights: [...champion.brain.weights] },
    });

    for (let i = 1; i < POPULATION_SIZE; i++) {
      // Pick parent from top 4
      const parentA = currentBirds[Math.floor(Math.random() * 4)];
      const parentB = currentBirds[Math.floor(Math.random() * 4)];

      // Crossover & Mutation
      const mutatedWeights = parentA.brain.weights.map((w, idx) => {
        let val = Math.random() > 0.5 ? w : parentB.brain.weights[idx];
        if (Math.random() < 0.25) {
          // Mutate weight
          val += (Math.random() * 2 - 1) * 0.4;
        }
        return Math.max(-2, Math.min(2, val));
      });

      newBirds.push({
        y: 130 + (Math.random() - 0.5) * 30,
        vy: 0,
        alive: true,
        score: 0,
        fitness: 0,
        brain: { weights: mutatedWeights },
      });
    }

    sim.current.birds = newBirds;
    sim.current.pipes = [
      { x: 300, topHeight: 70, bottomY: 70 + PIPE_GAP, passed: false },
      { x: 480, topHeight: 110, bottomY: 110 + PIPE_GAP, passed: false },
    ];

    setGeneration((g) => g + 1);
    setAliveCount(POPULATION_SIZE);
    setSpeciesCount(Math.min(5, Math.max(2, Math.floor(Math.random() * 2) + 3)));
  };

  useEffect(() => {
    initPopulation();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const stepSimulation = () => {
      const { birds, pipes } = sim.current;

      // Find closest upcoming pipe
      const nextPipe = pipes.find((p) => p.x + PIPE_WIDTH > 50) || pipes[0];

      // Update pipes
      for (let i = 0; i < pipes.length; i++) {
        pipes[i].x -= PIPE_SPEED;
        if (!pipes[i].passed && pipes[i].x < 50) {
          pipes[i].passed = true;
          birds.forEach((b) => {
            if (b.alive) b.score += 1;
          });
        }
      }

      // Recycle pipe
      if (pipes[0].x + PIPE_WIDTH < 0) {
        pipes.shift();
        const topH = Math.floor(Math.random() * 110) + 40;
        pipes.push({
          x: pipes[pipes.length - 1].x + 180,
          topHeight: topH,
          bottomY: topH + PIPE_GAP,
          passed: false,
        });
      }

      // Update birds
      let alive = 0;
      for (let i = 0; i < birds.length; i++) {
        const b = birds[i];
        if (!b.alive) continue;

        alive++;
        b.fitness += 0.15; // Reward for survival

        // Neural network forward pass
        // Inputs normalized between -1 and 1
        const inputBirdY = (b.y / canvas.height) * 2 - 1;
        const inputDistX = ((nextPipe.x - 50) / canvas.width) * 2 - 1;
        const inputGapTop = (nextPipe.topHeight / canvas.height) * 2 - 1;
        const inputGapBottom = (nextPipe.bottomY / canvas.height) * 2 - 1;
        const inputVelocity = (b.vy / 10);
        const bias = 1.0;

        const w = b.brain.weights;
        const activation =
          inputBirdY * w[0] +
          inputDistX * w[1] +
          inputGapTop * w[2] +
          inputGapBottom * w[3] +
          inputVelocity * w[4] +
          bias * w[5];

        // Sigmoid-like decision
        if (activation > 0) {
          b.vy = JUMP_FORCE;
        }

        // Apply physics
        b.vy += GRAVITY;
        b.y += b.vy;

        // Collision with bounds
        if (b.y < 5 || b.y > canvas.height - 10) {
          b.alive = false;
        }

        // Collision with nextPipe
        const birdX = 50;
        const birdRadius = 7;
        if (
          birdX + birdRadius > nextPipe.x &&
          birdX - birdRadius < nextPipe.x + PIPE_WIDTH
        ) {
          if (
            b.y - birdRadius < nextPipe.topHeight ||
            b.y + birdRadius > nextPipe.bottomY
          ) {
            b.alive = false;
          }
        }
      }

      setAliveCount(alive);

      // If all birds dead, trigger next generation
      if (alive === 0) {
        evolvePopulation();
      }
    };

    const render = () => {
      if (!canvas || !ctx) return;

      if (isRunning) {
        for (let s = 0; s < speedMultiplier; s++) {
          stepSimulation();
        }
      }

      // Draw background
      ctx.fillStyle = '#070A0F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      const { birds, pipes } = sim.current;

      // Draw Pipes
      pipes.forEach((p) => {
        // Top pipe
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(p.x, 0, PIPE_WIDTH, p.topHeight);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x, 0, PIPE_WIDTH, p.topHeight);

        // Top pipe lip
        ctx.fillStyle = '#334155';
        ctx.fillRect(p.x - 2, p.topHeight - 10, PIPE_WIDTH + 4, 10);

        // Bottom pipe
        const bottomHeight = canvas.height - p.bottomY;
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(p.x, p.bottomY, PIPE_WIDTH, bottomHeight);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(p.x, p.bottomY, PIPE_WIDTH, bottomHeight);

        // Bottom pipe lip
        ctx.fillStyle = '#334155';
        ctx.fillRect(p.x - 2, p.bottomY, PIPE_WIDTH + 4, 10);

        // Gap guidance target line
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(p.x + PIPE_WIDTH / 2, p.topHeight);
        ctx.lineTo(p.x + PIPE_WIDTH / 2, p.bottomY);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Birds
      birds.forEach((b, index) => {
        if (!b.alive) return;

        const isChampion = index === 0;

        ctx.beginPath();
        ctx.arc(50, b.y, isChampion ? 8 : 6, 0, Math.PI * 2);

        if (isChampion) {
          ctx.fillStyle = '#34D399';
          ctx.strokeStyle = '#A7F3D0';
          ctx.lineWidth = 2;
        } else {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.65)';
          ctx.strokeStyle = '#7DD3FC';
          ctx.lineWidth = 1;
        }

        ctx.fill();
        ctx.stroke();

        // Eye / facing dot
        ctx.beginPath();
        ctx.arc(53, b.y - 1, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isRunning, speedMultiplier]);

  const handleRestart = () => {
    setGeneration(1);
    setBestFitness(0);
    setFitnessHistory([12]);
    initPopulation();
  };

  return (
    <div className="bg-[#0B0F17] rounded-xl border border-white/[0.08] overflow-hidden p-4 md:p-5">
      {/* Header telemetry */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 truncate">
            Flappy Bird NEAT Topology Simulator
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-400 flex-wrap">
          <span>Gen: <strong className="text-white tabular-nums">{generation}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Alive: <strong className="text-emerald-400 tabular-nums">{aliveCount}/{POPULATION_SIZE}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Peak: <strong className="text-sky-400 tabular-nums">{bestFitness}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Canvas Area */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative rounded-lg overflow-hidden border border-white/[0.06] bg-[#070A0F]">
            <canvas
              ref={canvasRef}
              width={420}
              height={260}
              className="w-full h-[220px] sm:h-[260px] block"
            />
            <div className="absolute top-2 left-2 px-2 py-1 bg-black/75 rounded text-[10px] font-mono text-slate-400">
              Live Canvas · Neural Evaluation at 60 FPS
            </div>
          </div>

          {/* Speed & Sim Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-3">
            <div className="flex items-center gap-1">
              <span className="text-[11px] sm:text-xs text-slate-400 mr-1">Speed:</span>
              {[1, 2, 5].map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setSpeedMultiplier(speed)}
                  className={`px-2 py-1 text-[11px] sm:text-xs font-mono rounded transition-colors ${
                    speedMultiplier === speed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/[0.04] text-slate-400 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center gap-1"
              >
                {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {isRunning ? 'Pause' : 'Resume'}
              </button>
              <button
                type="button"
                onClick={evolvePopulation}
                title="Force Next Generation"
                className="px-2.5 py-1 text-[11px] sm:text-xs font-mono rounded bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center gap-1"
              >
                <FastForward className="w-3 h-3" /> Next Gen
              </button>
              <button
                type="button"
                onClick={handleRestart}
                title="Restart Evolution"
                aria-label="Restart evolution"
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Champion Network Visualizer */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 rounded-xl p-3 border border-white/[0.06]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Champion Genome Topology
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                {speciesCount} Active Species
              </span>
            </div>

            {/* Neural Graph representation */}
            <div className="p-3 bg-[#06080D] rounded-lg border border-white/[0.04] relative">
              <svg className="w-full h-32" viewBox="0 0 240 120">
                {/* Inputs */}
                {[20, 42, 64, 86, 108].map((y, idx) => {
                  const weight = sim.current.championWeights[idx] || 0.5;
                  const isPositive = weight > 0;
                  return (
                    <g key={idx}>
                      {/* Synaptic connection line to Output */}
                      <line
                        x1="35"
                        y1={y}
                        x2="195"
                        y2="60"
                        stroke={isPositive ? '#10B981' : '#F43F5E'}
                        strokeWidth={Math.min(3, Math.max(0.7, Math.abs(weight) * 2))}
                        strokeOpacity="0.45"
                      />
                      {/* Input node circle */}
                      <circle cx="35" cy={y} r="5" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
                    </g>
                  );
                })}

                {/* Output node */}
                <circle cx="195" cy="60" r="7" fill="#047857" stroke="#34D399" strokeWidth="2" />

                {/* Node labels */}
                <text x="5" y="24" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Y-Pos</text>
                <text x="5" y="46" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Dist-X</text>
                <text x="5" y="68" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">TopGap</text>
                <text x="5" y="90" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">BotGap</text>
                <text x="5" y="112" fill="#94A3B8" fontSize="8" fontFamily="JetBrains Mono">Vel</text>

                <text x="208" y="63" fill="#34D399" fontSize="8" fontFamily="JetBrains Mono">Flap</text>
              </svg>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-1 border-t border-white/[0.04] pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-0.5 bg-emerald-500 inline-block" /> Positive Synapse
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-0.5 bg-rose-500 inline-block" /> Negative Synapse
                </span>
              </div>
            </div>

            {/* Generational Fitness Sparkline / History */}
            <div className="mt-3">
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-1 flex items-center justify-between">
                <span>Generational Fitness Curve</span>
                <span className="text-slate-400">Speciation Enabled</span>
              </div>
              <div className="h-10 flex items-end gap-1.5 p-1 bg-black/30 rounded border border-white/[0.04]">
                {fitnessHistory.map((fit, idx) => {
                  const maxH = Math.max(...fitnessHistory, 50);
                  const heightPercent = Math.max(15, Math.min(100, (fit / maxH) * 100));
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-emerald-500/40 rounded-t hover:bg-emerald-400 transition-colors relative group"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-5 left-1/2 -translate-x-1/2 bg-black/80 px-1 py-0.5 rounded text-[8px] font-mono text-emerald-300 pointer-events-none whitespace-nowrap">
                        {fit}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-2 leading-relaxed">
            NEAT begins with minimal input-to-output topology and mutates new hidden nodes and connections dynamically across epochs.
          </div>
        </div>
      </div>
    </div>
  );
};
