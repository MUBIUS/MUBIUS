import React, { useState, useEffect } from 'react';
import { ChefHat, Flame, Coffee, UtensilsCrossed, Users, CheckCircle, Clock, Plus } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  icon: 'tandoor' | 'chai' | 'curry';
  dish: string;
  status: 'Idle' | 'Prepping' | 'Cooking' | 'Plated';
  progress: number;
}

interface CustomerOrder {
  id: number;
  item: string;
  station: string;
  patience: number; // 0 to 100
  status: 'Queued' | 'Cooking' | 'Served';
}

export const DhabaSimulation: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([
    { id: 'tandoor', name: 'Tandoor Oven', icon: 'tandoor', dish: 'Butter Naan / Roti', status: 'Cooking', progress: 65 },
    { id: 'chai', name: 'Chai Tapri', icon: 'chai', dish: 'Masala Cutting Chai', status: 'Prepping', progress: 30 },
    { id: 'curry', name: 'Handi Stove', icon: 'curry', dish: 'Dal Tadka & Paneer', status: 'Plated', progress: 100 },
  ]);

  const [orders, setOrders] = useState<CustomerOrder[]>([
    { id: 101, item: '2x Tandoori Roti', station: 'tandoor', patience: 78, status: 'Cooking' },
    { id: 102, item: 'Special Cutting Chai', station: 'chai', patience: 92, status: 'Cooking' },
    { id: 103, item: 'Dal Makhani Plate', station: 'curry', patience: 85, status: 'Served' },
  ]);

  const [eventLogs, setEventLogs] = useState<string[]>([
    'EVENT_BUS: [101] CustomerArrival (Table 4)',
    'EVENT_BUS: [101] OrderBroadcast -> KitchenCoordinator',
    'EVENT_BUS: [102] ChaiStation_StateChanged: Prepping -> Boiling',
  ]);

  const [servedCount, setServedCount] = useState(14);
  const [satisfactionScore, setSatisfactionScore] = useState(96);

  // Simulation tick
  useEffect(() => {
    const timer = setInterval(() => {
      setStations((prev) =>
        prev.map((station) => {
          if (station.status === 'Cooking') {
            const nextProgress = station.progress + 6;
            if (nextProgress >= 100) {
              return { ...station, status: 'Plated', progress: 100 };
            }
            return { ...station, progress: nextProgress };
          } else if (station.status === 'Prepping') {
            const nextProgress = station.progress + 10;
            if (nextProgress >= 60) {
              return { ...station, status: 'Cooking', progress: 60 };
            }
            return { ...station, progress: nextProgress };
          }
          return station;
        })
      );
    }, 800);

    return () => clearInterval(timer);
  }, []);

  const spawnCustomerOrder = () => {
    const items = [
      { item: 'Garlic Naan', station: 'tandoor' },
      { item: 'Cutting Chai', station: 'chai' },
      { item: 'Paneer Butter Masala', station: 'curry' },
    ];
    const picked = items[Math.floor(Math.random() * items.length)];
    const newId = Math.floor(Math.random() * 800) + 200;

    const newOrder: CustomerOrder = {
      id: newId,
      item: picked.item,
      station: picked.station,
      patience: 100,
      status: 'Cooking',
    };

    setOrders((prev) => [newOrder, ...prev.slice(0, 3)]);

    // Trigger station reset
    setStations((prev) =>
      prev.map((st) => (st.id === picked.station ? { ...st, status: 'Prepping', progress: 10 } : st))
    );

    setEventLogs((prev) => [
      `EVENT_BUS: [${newId}] CustomerArrival -> Ordered ${picked.item}`,
      `EVENT_BUS: [${newId}] DishDispatchedToStation: ${picked.station}`,
      ...prev.slice(0, 4),
    ]);
  };

  const handleServeOrder = (orderId: number, stationId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Served' } : o))
    );
    setStations((prev) =>
      prev.map((st) => (st.id === stationId ? { ...st, status: 'Idle', progress: 0 } : st))
    );
    setServedCount((prev) => prev + 1);
    setEventLogs((prev) => [
      `EVENT_BUS: [${orderId}] OrderCompleted -> CustomerServed (100% Satisfaction)`,
      ...prev.slice(0, 4),
    ]);
  };

  return (
    <div className="bg-[#0B0F17] rounded-xl border border-white/[0.08] overflow-hidden p-4 md:p-5">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 truncate">
            Dhaba Simulator — Event-Driven Kitchen Systems
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-mono text-slate-400 flex-wrap">
          <span>Orders Served: <strong className="text-emerald-400 tabular-nums">{servedCount}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Mood: <strong className="text-amber-300 tabular-nums">{satisfactionScore}%</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Cooking Stations */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] sm:text-xs font-mono text-slate-400">
            <span>Modular C# Cooking Station State Machines</span>
            <button
              type="button"
              onClick={spawnCustomerOrder}
              className="self-start sm:self-auto px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Spawn Customer
            </button>
          </div>

          <div className="space-y-2.5">
            {stations.map((st) => {
              const isCooking = st.status === 'Cooking';
              const isPlated = st.status === 'Plated';

              return (
                <div
                  key={st.id}
                  className="p-3 rounded-lg border border-white/[0.06] bg-[#070A0F] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-white/[0.04] text-amber-400">
                        {st.icon === 'tandoor' && <Flame className="w-4 h-4" />}
                        {st.icon === 'chai' && <Coffee className="w-4 h-4" />}
                        {st.icon === 'curry' && <ChefHat className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{st.name}</div>
                        <div className="text-[11px] text-slate-400">{st.dish}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                          isPlated
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : isCooking
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-white/[0.04] text-slate-400'
                        }`}
                      >
                        {st.status}
                      </span>
                      {isPlated && (
                        <button
                          type="button"
                          onClick={() => handleServeOrder(101, st.id)}
                          className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition-colors"
                        >
                          Serve
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/[0.04] h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isPlated ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${st.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* C# Game Event Bus Log */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-black/40 rounded-xl p-3 border border-white/[0.06]">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Unity C# Event Bus Stream
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Decoupled Observers</span>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] bg-[#06080D] p-2.5 rounded-lg border border-white/[0.04] min-h-[140px]">
              {eventLogs.map((log, idx) => (
                <div key={idx} className="text-slate-300 flex items-start gap-1.5 leading-tight">
                  <span className="text-amber-400 select-none">›</span>
                  <span className="truncate">{log}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 p-2 rounded bg-white/[0.02] border border-white/[0.04] text-[11px] text-slate-400">
              <strong className="text-white font-mono">Architecture:</strong> Customer AI instances communicate strictly via scriptable event channels. Cooking stations and inventory are decoupled for zero frame hitching.
            </div>
          </div>

          <div className="text-[11px] text-slate-500 mt-2">
            Recreating authentic roadside dining physics and multi-station prep mechanics.
          </div>
        </div>
      </div>
    </div>
  );
};
