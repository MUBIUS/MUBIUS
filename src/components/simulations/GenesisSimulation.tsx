import React, { useState } from 'react';
import { Play, SkipForward, RotateCcw, CheckCircle2, ShieldCheck, ArrowRight, Database, Key } from 'lucide-react';

interface ScriptStep {
  opcode: string;
  description: string;
  stackAfter: string[];
  explanation: string;
}

export const GenesisSimulation: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'pipeline' | 'vm'>('vm');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scriptSteps: ScriptStep[] = [
    {
      opcode: 'INITIAL STACK (ScriptSig)',
      description: 'Pushed signature and public key from sender',
      stackAfter: ['<sig_MUBIUS_3045022...>', '<pubKey_0479BE667...>'],
      explanation: 'Sender unlocks UTXO by providing cryptographic signature and secp256k1 public key.',
    },
    {
      opcode: 'OP_DUP',
      description: 'Duplicates the top element on the evaluation stack',
      stackAfter: [
        '<sig_MUBIUS_3045022...>',
        '<pubKey_0479BE667...>',
        '<pubKey_0479BE667...>',
      ],
      explanation: 'OP_DUP clones the top public key so one copy can be hashed while the other is saved for OP_CHECKSIG.',
    },
    {
      opcode: 'OP_HASH160',
      description: 'Computes RIPEMD160(SHA256(top_element))',
      stackAfter: [
        '<sig_MUBIUS_3045022...>',
        '<pubKey_0479BE667...>',
        'hash160(0xab748e02d...)',
      ],
      explanation: 'Custom hashing pipeline executes SHA-256 followed by RIPEMD-160 to derive the public key hash.',
    },
    {
      opcode: 'PUSH <pubKeyHash>',
      description: 'Pushes the recipient address hash from ScriptPubKey',
      stackAfter: [
        '<sig_MUBIUS_3045022...>',
        '<pubKey_0479BE667...>',
        'hash160(0xab748e02d...)',
        'expected_hash(0xab748e02d...)',
      ],
      explanation: 'The locking script supplies the intended recipient’s public key hash from the original UTXO.',
    },
    {
      opcode: 'OP_EQUALVERIFY',
      description: 'Verifies top two hashes match, then pops them',
      stackAfter: ['<sig_MUBIUS_3045022...>', '<pubKey_0479BE667...>'],
      explanation: 'OP_EQUALVERIFY asserts that the provided key hashes to the address specified in the UTXO locking script.',
    },
    {
      opcode: 'OP_CHECKSIG',
      description: 'Validates ECDSA signature against public key and tx digest',
      stackAfter: ['0x01 (TRUE — VALIDATED)'],
      explanation: 'Custom ECC library executes ECDSA verification. Stack leaves 0x01, confirming transaction validity.',
    },
  ];

  const handleNextStep = () => {
    if (currentStepIndex < scriptSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  const handleRunAll = () => {
    setCurrentStepIndex(scriptSteps.length - 1);
    setIsCompleted(true);
  };

  const currentStep = scriptSteps[currentStepIndex];

  return (
    <div className="bg-[#0B0F17] rounded-xl border border-white/[0.08] overflow-hidden p-4 md:p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-mono text-xs uppercase tracking-wider text-slate-300 truncate">
            Genesis Bitcoin Script & Cryptographic Pipeline
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveStage('vm')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeStage === 'vm'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Script Stack VM
          </button>
          <button
            type="button"
            onClick={() => setActiveStage('pipeline')}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activeStage === 'pipeline'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            UTXO Architecture
          </button>
        </div>
      </div>

      {activeStage === 'vm' ? (
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Script Opcodes flow */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                P2PKH Script Execution Stream
              </div>

              <div className="space-y-1.5">
                {scriptSteps.map((step, idx) => {
                  const isCurrent = idx === currentStepIndex;
                  const isPast = idx < currentStepIndex;

                  return (
                    <div
                      key={step.opcode}
                      className={`p-2 rounded-lg border text-xs transition-all ${
                        isCurrent
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                          : isPast
                          ? 'bg-white/[0.02] border-white/[0.04] text-slate-400'
                          : 'bg-transparent border-transparent text-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono">
                        <span className="font-semibold">{step.opcode}</span>
                        <span className="text-[10px] text-slate-500">Step {idx + 1} of 6</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stepper buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={handleNextStep}
                disabled={currentStepIndex >= scriptSteps.length - 1}
                className="flex-1 sm:flex-initial justify-center px-3 py-1.5 text-xs font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
              >
                <SkipForward className="w-3.5 h-3.5" /> Step Opcode
              </button>
              <button
                type="button"
                onClick={handleRunAll}
                className="flex-1 sm:flex-initial justify-center px-3 py-1.5 text-xs font-mono rounded bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" /> Run Script
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Reset Stack"
                aria-label="Reset stack"
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Virtual Machine Stack State */}
          <div className="lg:col-span-6 bg-black/40 rounded-xl p-4 border border-white/[0.06] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Interpreter Stack (LIFO)
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  secp256k1 Curve Math
                </span>
              </div>

              {/* Stack visual box */}
              <div className="border border-dashed border-white/[0.12] rounded-lg p-3 min-h-[160px] flex flex-col-reverse gap-2 bg-[#06080D]">
                {currentStep.stackAfter.map((item, i) => (
                  <div
                    key={i}
                    className={`py-1.5 px-3 rounded font-mono text-xs border ${
                      item.includes('TRUE')
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                        : i === currentStep.stackAfter.length - 1
                        ? 'bg-white/[0.08] border-white/[0.15] text-white shadow-sm'
                        : 'bg-white/[0.03] border-white/[0.06] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{item}</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        [{currentStep.stackAfter.length - 1 - i}]
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Opcode explanation */}
              <div className="mt-3 p-2.5 rounded bg-white/[0.02] border border-white/[0.04]">
                <div className="text-[10px] font-mono text-slate-500 uppercase">Stack Evaluation Note</div>
                <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentStep.explanation}
                </div>
              </div>
            </div>

            {/* Validation Badge */}
            {currentStepIndex === scriptSteps.length - 1 && (
              <div className="mt-3 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2 text-xs font-mono text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Script verified. Transaction valid for block propagation.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* UTXO Architecture View */
        <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/[0.06]">
          <div className="text-xs font-mono uppercase text-slate-400 mb-4">
            UTXO Transaction Flow Architecture
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Input 1 */}
            <div className="p-3 rounded-lg border border-white/[0.06] bg-[#070A0F]">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mb-2">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                <span>UTXO Input [0]</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <div>PrevTx: <span className="text-slate-300">7f9c...10ea</span></div>
                <div>Index: <span className="text-slate-300">0</span></div>
                <div>Amount: <span className="text-emerald-400">1.25000000 BTC</span></div>
                <div>ScriptSig: <span className="text-slate-300">&lt;sig&gt; &lt;pubKey&gt;</span></div>
              </div>
            </div>

            {/* Verification Engine */}
            <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 mb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Consensus Engine</span>
              </div>
              <div className="text-[11px] text-slate-300 space-y-1">
                <div>• Custom ECC Point Math</div>
                <div>• Deterministic Nonce (RFC 6979)</div>
                <div>• Dual-Stack Forth VM</div>
                <div>• Zero External Crypto Libraries</div>
              </div>
            </div>

            {/* Output */}
            <div className="p-3 rounded-lg border border-white/[0.06] bg-[#070A0F]">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mb-2">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <span>UTXO Outputs [2]</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 space-y-1">
                <div>Out[0]: <span className="text-emerald-400">1.10000000 BTC</span> (Recipient)</div>
                <div>Out[1]: <span className="text-slate-300">0.14950000 BTC</span> (Change)</div>
                <div>Miner Fee: <span className="text-amber-400">0.00050000 BTC</span></div>
                <div>Base58Check Addr: <span className="text-slate-300">1Mubius...</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
