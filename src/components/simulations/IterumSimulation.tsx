import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Crosshair, Zap, Shield, Swords } from 'lucide-react';

interface Agent {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  state: string;
  action: 'Rush' | 'Flank' | 'Evade' | 'Circle';
  lastReward: number;
}

export const IterumSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerStance, setPlayerStance] = useState<'Aggressive' | 'Defensive' | 'Evasive'>('Aggressive');
  const [epochs, setEpochs] = useState(148);
  const [lastRewardLog, setLastRewardLog] = useState('+8.4 (Flanking reward)');
  
  // Q-table representation: States (Close, Mid, Far) vs Actions (Rush, Flank, Evade, Circle)
  const [qTable, setQTable] = useState<Record<string, Record<string, number>>>({
    Close: { Rush: -1.2, Flank: 4.8, Evade: 6.2, Circle: 1.5 },
    Mid: { Rush: 3.4, Flank: 7.9, Evade: -0.8, Circle: 4.1 },
    Far: { Rush: 8.5, Flank: 2.1, Evade: -3.4, Circle: 0.8 },
  });

  const [activeState, setActiveState] = useState<'Close' | 'Mid' | 'Far'>('Mid');
  const [isSimulating, setIsSimulating] = useState(true);

  // Simulation entities
  const simState = useRef<{
    player: { x: number; y: number; radius: number; targetX: number; targetY: number };
    agents: Agent[];
  }>({
    player: { x: 180, y: 140, radius: 12, targetX: 180, targetY: 140 },
    agents: [
      { id: 1, x: 70, y: 60, vx: 0, vy: 0, state: 'Mid', action: 'Flank', lastReward: 4.8 },
      { id: 2, x: 290, y: 80, vx: 0, vy: 0, state: 'Far', action: 'Rush', lastReward: 8.5 },
      { id: 3, x: 200, y: 230, vx: 0, vy: 0, state: 'Mid', action: 'Circle', lastReward: 4.1 },
    ],
  });

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(20, Math.min(canvas.width - 20, (e.clientX - rect.left) * (canvas.width / rect.width)));
    const y = Math.max(20, Math.min(canvas.height - 20, (e.clientY - rect.top) * (canvas.height / rect.height)));
    
    simState.current.player.x = x;
    simState.current.player.y = y;
  };

  const handleTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || e.touches.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(20, Math.min(canvas.width - 20, (touch.clientX - rect.left) * (canvas.width / rect.width)));
    const y = Math.max(20, Math.min(canvas.height - 20, (touch.clientY - rect.top) * (canvas.height / rect.height)));
    
    simState.current.player.x = x;
    simState.current.player.y = y;
  };

  const triggerCombatPulse = () => {
    setEpochs((prev) => prev + 1);
    
    // Update Q-Table based on player stance
    setQTable((prev) => {
      const next = { ...prev };
      if (playerStance === 'Aggressive') {
        next.Close.Evade = Number((next.Close.Evade + 0.6).toFixed(1));
        next.Close.Rush = Number((next.Close.Rush - 0.8).toFixed(1));
        next.Mid.Flank = Number((next.Mid.Flank + 0.5).toFixed(1));
        setLastRewardLog('+7.6 (Reward for evasion against aggressive strike)');
      } else if (playerStance === 'Defensive') {
        next.Far.Rush = Number((next.Far.Rush + 0.7).toFixed(1));
        next.Mid.Rush = Number((next.Mid.Rush + 0.4).toFixed(1));
        setLastRewardLog('+9.1 (Reward for closing distance against turtle stance)');
      } else {
        next.Mid.Circle = Number((next.Mid.Circle + 0.6).toFixed(1));
        next.Close.Flank = Number((next.Close.Flank + 0.5).toFixed(1));
        setLastRewardLog('+6.4 (Reward for perimeter control)');
      }
      return next;
    });
  };

  const resetQTable = () => {
    setQTable({
      Close: { Rush: -1.2, Flank: 4.8, Evade: 6.2, Circle: 1.5 },
      Mid: { Rush: 3.4, Flank: 7.9, Evade: -0.8, Circle: 4.1 },
      Far: { Rush: 8.5, Flank: 2.1, Evade: -3.4, Circle: 0.8 },
    });
    setEpochs(100);
    setLastRewardLog('Q-matrix normalized to baseline policy');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const loop = () => {
      if (!isSimulating) {
        animId = requestAnimationFrame(loop);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Arena background
      ctx.fillStyle = '#0B0F17';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 25;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const { player, agents } = simState.current;

      // Draw Player combat radius
      ctx.beginPath();
      ctx.arc(player.x, player.y, 60, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Player Drone
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0284C7';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#38BDF8';
      ctx.stroke();

      // Player facing ring
      ctx.beginPath();
      ctx.arc(player.x, player.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // Label player
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('PLAYER', player.x - 18, player.y - 18);

      // Calculate primary state based on closest agent
      let minDistance = 9999;
      agents.forEach((agent) => {
        const dx = player.x - agent.x;
        const dy = player.y - agent.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDistance) minDistance = dist;

        // Discretize distance to state
        let distState: 'Close' | 'Mid' | 'Far' = 'Far';
        if (dist < 70) distState = 'Close';
        else if (dist < 150) distState = 'Mid';

        agent.state = distState;

        // Simple steering based on best action in Q-table
        const stateActions = qTable[distState] || { Rush: 0, Flank: 0, Evade: 0, Circle: 0 };
        const bestAction = (Object.keys(stateActions) as ('Rush' | 'Flank' | 'Evade' | 'Circle')[]).reduce((a, b) =>
          stateActions[a] > stateActions[b] ? a : b
        );
        agent.action = bestAction;

        const angle = Math.atan2(player.y - agent.y, player.x - agent.x);
        let speed = 1.1;

        if (bestAction === 'Rush') {
          agent.vx = Math.cos(angle) * speed;
          agent.vy = Math.sin(angle) * speed;
        } else if (bestAction === 'Evade') {
          agent.vx = -Math.cos(angle) * speed * 1.2;
          agent.vy = -Math.sin(angle) * speed * 1.2;
        } else if (bestAction === 'Flank') {
          const flankAngle = angle + Math.PI / 2.5;
          agent.vx = Math.cos(flankAngle) * speed;
          agent.vy = Math.sin(flankAngle) * speed;
        } else {
          // Circle
          const circleAngle = angle + Math.PI / 2;
          agent.vx = Math.cos(circleAngle) * speed * 0.9;
          agent.vy = Math.sin(circleAngle) * speed * 0.9;
        }

        // Apply slight boundary constraints
        agent.x += agent.vx;
        agent.y += agent.vy;
        agent.x = Math.max(15, Math.min(canvas.width - 15, agent.x));
        agent.y = Math.max(15, Math.min(canvas.height - 15, agent.y));

        // Draw connection beam to player
        ctx.beginPath();
        ctx.moveTo(agent.x, agent.y);
        ctx.lineTo(player.x, player.y);
        ctx.strokeStyle = dist < 70 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Agent
        ctx.beginPath();
        ctx.arc(agent.x, agent.y, 9, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.fill();
        ctx.strokeStyle = '#FCA5A5';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Agent Action tag
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#F87171';
        ctx.fillText(bestAction, agent.x - 14, agent.y + 18);
      });

      if (minDistance < 70) setActiveState('Close');
      else if (minDistance < 150) setActiveState('Mid');
      else setActiveState('Far');

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [qTable, isSimulating, playerStance]);

  return (
    <div className="bg-[#0B0F17] rounded-xl border border-white/[0.08] overflow-hidden p-4 md:p-5">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 truncate">
            Iterum Real-Time Q-Learning Arena
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-slate-400 flex-wrap">
          <span>Epochs: <strong className="text-emerald-400 tabular-nums">{epochs}</strong></span>
          <span aria-hidden="true">·</span>
          <span>State: <strong className="text-white">{activeState}</strong></span>
        </div>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Arena Canvas */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative rounded-lg overflow-hidden border border-white/[0.06] bg-[#07090E]">
            <canvas
              ref={canvasRef}
              width={380}
              height={260}
              onClick={handleCanvasClick}
              onTouchStart={handleTouch}
              onTouchMove={handleTouch}
              className="w-full h-[220px] sm:h-[260px] cursor-crosshair block touch-none"
            />
            <div className="absolute bottom-2 left-2 pointer-events-none px-2 py-1 bg-black/75 rounded text-[10px] font-mono text-slate-400">
              Click or tap canvas to reposition player drone
            </div>
          </div>

          {/* Interactive controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] sm:text-xs text-slate-400 mr-0.5">Stance:</span>
              <button
                type="button"
                onClick={() => setPlayerStance('Aggressive')}
                className={`px-2 py-1 text-[11px] sm:text-xs font-medium rounded transition-colors ${
                  playerStance === 'Aggressive'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Swords className="w-3 h-3" /> Aggressive
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPlayerStance('Defensive')}
                className={`px-2 py-1 text-[11px] sm:text-xs font-medium rounded transition-colors ${
                  playerStance === 'Defensive'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Defensive
                </span>
              </button>
              <button
                type="button"
                onClick={() => setPlayerStance('Evasive')}
                className={`px-2 py-1 text-[11px] sm:text-xs font-medium rounded transition-colors ${
                  playerStance === 'Evasive'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Evasive
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={triggerCombatPulse}
                className="px-3 py-1 text-[11px] sm:text-xs font-medium rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors flex items-center gap-1.5"
              >
                <Crosshair className="w-3 h-3" /> Trigger Strike
              </button>
              <button
                type="button"
                onClick={resetQTable}
                title="Reset Q-values"
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-label="Reset Q-matrix"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Q-Table Inspector */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-black/30 rounded-lg p-3 border border-white/[0.06]">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>Live Q-Matrix Policy</span>
              <span className="text-[10px] text-emerald-400">Bellman: η=0.1, γ=0.9</span>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto max-w-full">
              <table className="w-full min-w-[260px] text-[11px] sm:text-xs font-mono text-left">
                <thead>
                  <tr className="border-b border-white/[0.08] text-slate-500">
                    <th className="py-1 px-1.5 font-normal">State</th>
                    <th className="py-1 px-1.5 font-normal">Rush</th>
                    <th className="py-1 px-1.5 font-normal">Flank</th>
                    <th className="py-1 px-1.5 font-normal">Evade</th>
                    <th className="py-1 px-1.5 font-normal">Circle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {(['Close', 'Mid', 'Far'] as const).map((st) => {
                    const isActive = activeState === st;
                    return (
                      <tr
                        key={st}
                        className={`transition-colors ${
                          isActive ? 'bg-emerald-500/10 text-emerald-300 font-semibold' : 'text-slate-300'
                        }`}
                      >
                        <td className="py-1.5 px-1.5">
                          <span className="flex items-center gap-1">
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />}
                            {st}
                          </span>
                        </td>
                        <td className="py-1.5 px-1.5 tabular-nums">{qTable[st]?.Rush}</td>
                        <td className="py-1.5 px-1.5 tabular-nums">{qTable[st]?.Flank}</td>
                        <td className="py-1.5 px-1.5 tabular-nums">{qTable[st]?.Evade}</td>
                        <td className="py-1.5 px-1.5 tabular-nums">{qTable[st]?.Circle}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Reward Signal Log */}
            <div className="mt-3 p-2 rounded bg-black/40 border border-white/[0.04]">
              <div className="text-[10px] font-mono uppercase text-slate-500 mb-0.5">Telemetry Signal Stream</div>
              <div className="text-xs font-mono text-emerald-400 truncate">{lastRewardLog}</div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-white/[0.06] leading-relaxed">
            Live enemy controllers discretize player position and learn counter-measures without hardcoded behavior trees.
          </div>
        </div>
      </div>
    </div>
  );
};
