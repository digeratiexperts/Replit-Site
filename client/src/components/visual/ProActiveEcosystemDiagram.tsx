import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EvidenceFrame } from "../evidence/EvidenceFrame";

export const ProActiveEcosystemDiagram: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      id: "assess",
      num: "01",
      title: "Assessment & Discovery",
      detail:
        "Review the environment and business requirements across the areas that are in scope, including identity, endpoints, email, network, recovery, and compliance needs where relevant.",
      output: "Risk and environment findings",
    },
    {
      id: "model",
      num: "02",
      title: "Fit-Based Operating Model",
      detail:
        "Map the findings to IT, Office, Business, or Enterprise based on users, devices, locations, infrastructure, risk, and the level of management the organization actually needs.",
      output: "Documented operating-model scope",
    },
    {
      id: "implement",
      num: "03",
      title: "Implementation & Documentation",
      detail:
        "Prioritize and implement the controls, standards, tooling, and documentation approved for the selected scope rather than assuming every client receives the same stack.",
      output: "Implementation plan and runbook",
    },
    {
      id: "operate",
      num: "04",
      title: "Continuous Operations",
      detail:
        "Run support, monitoring, security operations, recovery practices, and business/security reviews at the depth and cadence defined by the selected operating model.",
      output: "Operational cadence and reporting",
    },
  ];

  const active = stages[activeStage];

  return (
    <EvidenceFrame
      classification="ILLUSTRATIVE"
      title="The ProActive Ecosystem operating architecture"
      subtitle="A simplified view of how assessment, fit, implementation, and ongoing operations connect."
      status="informational"
      statusLabel="MODEL VIEW"
      sourceNote="Illustrative summary of the documented ProActive operating model. Exact scope, controls, tooling, and cadence vary by tier and client environment."
      variant="dark"
      className="w-full"
    >
      <div className="my-4 grid grid-cols-1 gap-3 md:grid-cols-4">
        {stages.map((stage, idx) => {
          const isSelected = activeStage === idx;
          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`min-h-11 rounded-xl border p-4 text-left transition-[border-color,background-color] ${
                isSelected
                  ? "border-[#D3126A]/65 bg-de-bg"
                  : "border-de-hairline bg-de-raised hover:border-white/20"
              }`}
              data-testid={`ecosystem-stage-${stage.id}`}
              aria-pressed={isSelected}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#F04C97]">{stage.num}</span>
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#D3126A]" aria-hidden="true" />}
              </div>
              <p className="mb-1 font-heading text-sm font-bold text-white">{stage.title}</p>
              <p className="font-mono text-[10px] leading-relaxed text-white/50">{stage.output}</p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-de-hairline bg-de-bg p-5"
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-de-hairline pb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F04C97]">
              STAGE {active.num} / {active.title}
            </span>
            <span className="rounded border border-de-hairline bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/50">
              Illustrative sequence
            </span>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-white/80">{active.detail}</p>
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-de-hairline bg-de-raised px-3.5 py-2 font-mono text-xs text-white/90">
            <span className="text-white/45">Representative output:</span>
            <strong className="text-white">{active.output}</strong>
          </div>
        </motion.div>
      </AnimatePresence>
    </EvidenceFrame>
  );
};
