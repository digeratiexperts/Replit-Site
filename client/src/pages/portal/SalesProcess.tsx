import { useState, useMemo } from 'react';
import { Search, ChevronDown, X, Zap, Target, Users, Shield, CheckCircle, Clock, FileText, Video, Building2, Calendar } from 'lucide-react';

interface CardData {
  id: string;
  title: string;
  badge: string;
  phase: string;
  scope: 'lead' | 'track';
  keywords: string;
  items: string[];
  meta: { label: string; value: string }[];
  details: { title?: string; content: string[] };
  meetingType?: string;
}

const leadGenCards: CardData[] = [
  {
    id: 'lead-1',
    title: 'Hot Inbound Leads',
    badge: 'Source 1',
    phase: 'Lead Gen',
    scope: 'lead',
    keywords: 'lead gen hot inbound referrals marketing no meeting',
    items: [
      'Generated from marketing + referrals',
      'High intent (problem-aware / ready)',
      'Routes to Qualification → FTA'
    ],
    meta: [
      { label: 'Meetings', value: '0–1' },
      { label: 'Paperwork', value: 'None' },
      { label: 'Meeting Type', value: 'None' }
    ],
    details: {
      title: 'Examples',
      content: [
        'Web form, chat, ads, referrals, partner handoffs.',
        'Goal: book the FTA. Don\'t do deep discovery here.',
        'Gate: urgency + decision path + next meeting scheduled.'
      ]
    }
  },
  {
    id: 'lead-2',
    title: 'SDR / Sales Assisted Inbound',
    badge: 'Source 2',
    phase: 'Lead Gen',
    scope: 'lead',
    keywords: 'lead gen sdr assisted inbound follow up no meeting',
    items: [
      'Rep-assisted inbound follow-up',
      'Qualification + scheduling support',
      'Turns warm into committed'
    ],
    meta: [
      { label: 'Meetings', value: '0–1' },
      { label: 'Paperwork', value: 'None' },
      { label: 'Meeting Type', value: 'None' }
    ],
    details: {
      content: [
        'Output: booked FTA + intake request sent.',
        'Gate: decision-maker + timeline clarified.'
      ]
    }
  },
  {
    id: 'lead-3',
    title: 'SDR / Sales Cold Outreach',
    badge: 'Source 3',
    phase: 'Lead Gen',
    scope: 'lead',
    keywords: 'lead gen sdr cold outreach outbound prospecting no meeting',
    items: [
      'Generated leads from cold outbound',
      'Often starts with coffee/quick qual',
      'Routes to Qualification → FTA'
    ],
    meta: [
      { label: 'Meetings', value: '0–1' },
      { label: 'Paperwork', value: 'None' },
      { label: 'Meeting Type', value: 'None' }
    ],
    details: {
      content: [
        'Gate: interest + next meeting scheduled.',
        'Offer: risk snapshot / FTA — not a full audit.'
      ]
    }
  }
];

const ecosystemCards: CardData[] = [
  {
    id: 'eco-0',
    title: 'Entry Point',
    badge: 'Stage 0',
    phase: '1. Qualification',
    scope: 'track',
    keywords: 'entry point qualification coffee meeting virtual in-office onsite',
    items: [
      'Any lead source routes here',
      'Quick qual OR coffee meeting',
      'Objective: book the FTA'
    ],
    meta: [
      { label: 'Meetings', value: '0–1' },
      { label: 'Paperwork', value: 'None' },
      { label: 'Meeting Type', value: 'Either (Virtual or In-office)' }
    ],
    details: {
      content: [
        'Do: confirm "why now", size, urgency, decision-maker.',
        'Don\'t: free consulting. Next step is always the FTA.'
      ]
    }
  },
  {
    id: 'eco-1',
    title: 'FTA (First Time Appointment)',
    badge: 'Stage 1',
    phase: '2. Discovery',
    scope: 'track',
    keywords: 'fta first time appointment discovery nda virtual in-office zoom teams',
    items: [
      'Confirm decision path + timeline',
      'Define "success" + outcomes',
      'Agree on Assessment scope'
    ],
    meta: [
      { label: 'Meetings', value: '1' },
      { label: 'Paperwork', value: 'NDA (optional)' },
      { label: 'Meeting Type', value: 'Virtual (default) or In-office (optional)' }
    ],
    details: {
      content: [
        'NDA: only when required before sharing sensitive details.'
      ]
    }
  },
  {
    id: 'eco-2',
    title: 'Prep + Intake',
    badge: 'Stage 2',
    phase: '2. Discovery',
    scope: 'track',
    keywords: 'prep intake questionnaire data request virtual',
    items: [
      'Questionnaire + data request',
      'Access planning + stakeholders',
      'Scope confirmation'
    ],
    meta: [
      { label: 'Meetings', value: '0–1' },
      { label: 'Paperwork', value: 'Assessment SOW (if required)' },
      { label: 'Meeting Type', value: 'Virtual' }
    ],
    details: {
      content: [
        'Assessment SOW: used when the assessment is billed as a formal project.'
      ]
    }
  },
  {
    id: 'eco-3',
    title: 'Managed Assessment',
    badge: 'Stage 3',
    phase: '3. Technical Assessment',
    scope: 'track',
    keywords: 'managed assessment evidence scoring analysis no meeting async',
    items: [
      'Evidence collection + scoring',
      'Third-party style analysis',
      'Roadmap mapped to outcomes'
    ],
    meta: [
      { label: 'Meetings', value: '0' },
      { label: 'Paperwork', value: 'None' },
      { label: 'Meeting Type', value: 'None (Asynchronous work)' }
    ],
    details: {
      content: [
        'Deliverable: exec summary + prioritized roadmap + proof pack.'
      ]
    }
  },
  {
    id: 'eco-4',
    title: 'Readout (Decision Meeting)',
    badge: 'Stage 4',
    phase: '4. Prescribe / Close',
    scope: 'track',
    keywords: 'readout decision meeting findings virtual in-office',
    items: [
      'Share findings + business impact',
      'Prioritize remediation roadmap',
      'Select ProActive Ecosystem package'
    ],
    meta: [
      { label: 'Meetings', value: '1' },
      { label: 'Paperwork', value: 'None (unless closing same meeting)' },
      { label: 'Meeting Type', value: 'Virtual (default) or In-office (optional)' }
    ],
    details: {
      content: [
        'Decision: close now, or schedule the close meeting.'
      ]
    }
  },
  {
    id: 'eco-5',
    title: 'Close + Onboarding',
    badge: 'Stage 5',
    phase: '4. Prescribe / Close',
    scope: 'track',
    keywords: 'close onboarding msa order form sow kickoff virtual in-office',
    items: [
      'Paperwork + kickoff',
      'Access + baselines + onboarding',
      'Acceptance + governance cadence'
    ],
    meta: [
      { label: 'Meetings', value: '1–2' },
      { label: 'Paperwork', value: 'MSA + Order Form + SOW(s) + Acceptance' },
      { label: 'Meeting Type', value: 'Virtual (default) + In-office kickoff (optional)' }
    ],
    details: {
      content: [
        'Order Form = pricing authority',
        'MSA = legal authority',
        'SOW(s) = scope authority'
      ]
    }
  },
  {
    id: 'eco-6',
    title: 'Governance + Follow-Up',
    badge: 'Stage 6',
    phase: '5. Follow-Up',
    scope: 'track',
    keywords: 'governance follow-up reporting quarterly tbr virtual',
    items: [
      'Monthly reporting + quarterly TBR',
      'Roadmap progress + budgeting',
      'Add modules via new SOWs'
    ],
    meta: [
      { label: 'Meetings', value: 'Monthly / Quarterly' },
      { label: 'Paperwork', value: 'Add-on SOW (if needed)' },
      { label: 'Meeting Type', value: 'Virtual (default)' }
    ],
    details: {
      content: [
        'Goal: keep the plan alive and expand responsibly.'
      ]
    }
  }
];

const cyberCards: CardData[] = [
  {
    id: 'cyber-0',
    title: 'Entry Point',
    badge: 'Stage 0',
    phase: '1. Qualification',
    scope: 'track',
    keywords: 'entry cyber qualification coffee virtual in-office',
    items: [
      'Same lead sources',
      'Quick qual OR coffee meeting',
      'Objective: book the Security FTA'
    ],
    meta: [
      { label: 'Meetings', value: '0–1' },
      { label: 'Paperwork', value: 'None' },
      { label: 'Meeting Type', value: 'Either (Virtual or In-office)' }
    ],
    details: {
      content: [
        'Decision: cyber-only engagement OR roll into full Ecosystem.'
      ]
    }
  },
  {
    id: 'cyber-1',
    title: 'FTA (Security Focus)',
    badge: 'Stage 1',
    phase: '2. Discovery',
    scope: 'track',
    keywords: 'fta security discovery nda virtual in-office',
    items: [
      'Confirm decision path + timeline',
      'Define security outcomes',
      'Agree on Assessment scope'
    ],
    meta: [
      { label: 'Meetings', value: '1' },
      { label: 'Paperwork', value: 'NDA (optional)' },
      { label: 'Meeting Type', value: 'Virtual (default) or In-office (optional)' }
    ],
    details: {
      content: [
        'Focus on security pain points and compliance requirements.'
      ]
    }
  },
  {
    id: 'cyber-2',
    title: 'Prep + Intake',
    badge: 'Stage 2',
    phase: '2. Discovery',
    scope: 'track',
    keywords: 'prep intake security questionnaire virtual',
    items: [
      'Security questionnaire + data request',
      'Access approvals + stakeholders',
      'Scope confirmation'
    ],
    meta: [
      { label: 'Meetings', value: '0–1' },
      { label: 'Paperwork', value: 'Assessment SOW (if required)' },
      { label: 'Meeting Type', value: 'Virtual' }
    ],
    details: {
      content: [
        'Same intake mechanics; different evidence + reporting outputs.'
      ]
    }
  },
  {
    id: 'cyber-3',
    title: 'Security Assessment',
    badge: 'Stage 3',
    phase: '3. Technical Assessment',
    scope: 'track',
    keywords: 'security assessment exposure risk no meeting async',
    items: [
      'Exposure + control gap analysis',
      'Evidence + risk scoring',
      'Roadmap mapped to outcomes'
    ],
    meta: [
      { label: 'Meetings', value: '0' },
      { label: 'Paperwork', value: 'None' },
      { label: 'Meeting Type', value: 'None (Asynchronous work)' }
    ],
    details: {
      content: [
        'Deliverables: executive summary + proof + prioritized plan.'
      ]
    }
  },
  {
    id: 'cyber-4',
    title: 'Readout',
    badge: 'Stage 4',
    phase: '4. Prescribe / Close',
    scope: 'track',
    keywords: 'readout cyber watch findings virtual in-office',
    items: [
      'Share findings + business impact',
      'Recommend Cyber Watch (ongoing)',
      'Option: roll into Ecosystem package'
    ],
    meta: [
      { label: 'Meetings', value: '1' },
      { label: 'Paperwork', value: 'None (unless closing same meeting)' },
      { label: 'Meeting Type', value: 'Virtual (default) or In-office (optional)' }
    ],
    details: {
      content: [
        'Close path: cyber-only co-managed OR full ProActive Ecosystem.'
      ]
    }
  },
  {
    id: 'cyber-5',
    title: 'Close + Security Onboarding',
    badge: 'Stage 5',
    phase: '4. Prescribe / Close',
    scope: 'track',
    keywords: 'close security onboarding controls virtual in-office',
    items: [
      'Kickoff + access + baseline',
      'Deploy/enable controls',
      'Runbook + escalation path'
    ],
    meta: [
      { label: 'Meetings', value: '1–2' },
      { label: 'Paperwork', value: 'MSA + Order Form + Cyber SOW' },
      { label: 'Meeting Type', value: 'Virtual (default) + In-office kickoff (optional)' }
    ],
    details: {
      content: [
        'Cyber-only: Cyber SOW defines co-managed responsibilities.',
        'Ecosystem: add managed services SOW(s) as needed.'
      ]
    }
  },
  {
    id: 'cyber-6',
    title: 'Follow-Up + Cyber Liability',
    badge: 'Stage 6',
    phase: '5. Follow-Up',
    scope: 'track',
    keywords: 'follow-up cyber liability monitoring virtual',
    items: [
      'Ongoing monitoring + response workflow',
      'Insurance minimum standards verification',
      'Evidence + reporting cadence'
    ],
    meta: [
      { label: 'Meetings', value: 'Monthly / Quarterly' },
      { label: 'Paperwork', value: 'Add-on SOW (if needed)' },
      { label: 'Meeting Type', value: 'Virtual (default)' }
    ],
    details: {
      content: [
        'Typical follow-up: liability essentials check ~2–3 weeks after initial deployment.'
      ]
    }
  }
];

export default function SalesProcess() {
  const [activeTab, setActiveTab] = useState<'ecosystem' | 'cyber'>('ecosystem');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLeadGen, setShowLeadGen] = useState(true);
  const [showTrack, setShowTrack] = useState(true);
  const [activeLeadCard, setActiveLeadCard] = useState<string>(leadGenCards[0].id);
  const [activeTrackCard, setActiveTrackCard] = useState<string>(ecosystemCards[0].id);
  const [drawerCard, setDrawerCard] = useState<CardData | null>(null);

  const trackCards = activeTab === 'ecosystem' ? ecosystemCards : cyberCards;

  const filteredLeadCards = useMemo(() => {
    if (!searchQuery) return leadGenCards;
    const q = searchQuery.toLowerCase();
    return leadGenCards.filter(card =>
      card.title.toLowerCase().includes(q) ||
      card.keywords.toLowerCase().includes(q) ||
      card.items.some(item => item.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredTrackCards = useMemo(() => {
    if (!searchQuery) return trackCards;
    const q = searchQuery.toLowerCase();
    return trackCards.filter(card =>
      card.title.toLowerCase().includes(q) ||
      card.keywords.toLowerCase().includes(q) ||
      card.items.some(item => item.toLowerCase().includes(q))
    );
  }, [searchQuery, trackCards]);

  const leadProgress = useMemo(() => {
    const idx = leadGenCards.findIndex(c => c.id === activeLeadCard);
    return ((idx + 1) / leadGenCards.length) * 100;
  }, [activeLeadCard]);

  const trackProgress = useMemo(() => {
    const idx = trackCards.findIndex(c => c.id === activeTrackCard);
    return ((idx + 1) / trackCards.length) * 100;
  }, [activeTrackCard, trackCards]);

  const handleTabChange = (tab: 'ecosystem' | 'cyber') => {
    setActiveTab(tab);
    setActiveTrackCard(tab === 'ecosystem' ? ecosystemCards[0].id : cyberCards[0].id);
    setDrawerCard(null);
  };

  const openDrawer = (card: CardData) => {
    if (card.scope === 'lead') {
      setActiveLeadCard(card.id);
    } else {
      setActiveTrackCard(card.id);
    }
    setDrawerCard(card);
  };

  const getMeetingIcon = (meetingType: string) => {
    if (meetingType.includes('Virtual')) return <Video className="w-4 h-4" />;
    if (meetingType.includes('In-office')) return <Building2 className="w-4 h-4" />;
    if (meetingType.includes('Either')) return <Users className="w-4 h-4" />;
    return <Clock className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-[#151515] text-white" data-testid="sales-process-page">
      <div className="max-w-[1320px] mx-auto p-4 md:p-6">
        <div className="rounded-[26px] border border-white/10 overflow-hidden"
          style={{
            background: `
              radial-gradient(1200px 600px at 10% 0%, rgba(255,184,0,.10), transparent 55%),
              radial-gradient(1000px 520px at 90% 20%, rgba(90,167,255,.08), transparent 55%),
              linear-gradient(180deg, #1b1b1b, #151515)
            `,
            boxShadow: '0 30px 90px rgba(0,0,0,.55)'
          }}>
          
          {/* Header */}
          <header className="px-5 py-7 border-b border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-amber-500/35 bg-amber-500/10 text-amber-400 text-xs font-black tracking-[0.18em] uppercase mb-4">
              <Zap className="w-4 h-4" />
              DE SALES SYSTEM
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2" 
                style={{ letterSpacing: '-0.03em' }}>
              Decision-Ready Process
            </h1>
            
            <p className="text-white/80 text-base max-w-[900px] font-medium leading-relaxed">
              Two tracks. Clear stages. Meetings, paperwork, and meeting type on every step.
            </p>

            {/* Stats */}
            <div className="flex gap-3.5 flex-wrap mt-5">
              {[
                { value: '7', label: 'Sales Stages' },
                { value: '3', label: 'Lead Sources' },
                { value: '2', label: 'Tracks' }
              ].map((stat, i) => (
                <div key={i} className="flex gap-3 items-baseline px-3.5 py-3 rounded-2xl border border-white/10 bg-black/25 backdrop-blur-sm">
                  <span className="text-2xl font-black text-amber-400">{stat.value}</span>
                  <span className="text-xs text-white/60 uppercase tracking-widest font-extrabold">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Search + Controls */}
            <div className="mt-4 flex flex-wrap gap-3 items-center">
              <div className="relative flex-1 min-w-[280px] max-w-[560px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/45" />
                <input
                  type="text"
                  placeholder="Search stages, meetings, paperwork..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-full border border-white/10 bg-black/35 text-white placeholder:text-white/45 outline-none transition-all focus:border-amber-500/55 focus:ring-2 focus:ring-amber-500/20"
                  data-testid="input-search"
                />
              </div>

              {/* View Toggles */}
              <div className="flex gap-2.5 flex-wrap">
                <button
                  onClick={() => setShowLeadGen(!showLeadGen)}
                  className={`inline-flex items-center gap-2.5 px-3.5 py-3 rounded-full border font-black text-sm transition-all ${
                    showLeadGen 
                      ? 'border-amber-500/70 bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-white shadow-lg shadow-amber-500/15' 
                      : 'border-white/10 bg-black/30 text-white/80 hover:border-amber-500/35'
                  }`}
                  data-testid="toggle-lead-gen"
                >
                  <span className={`w-2.5 h-2.5 rounded-full border ${showLeadGen ? 'bg-amber-400 border-amber-500/75 shadow-amber-500/40 shadow-sm' : 'bg-white/25 border-white/20'}`} />
                  Lead Gen
                </button>
                <button
                  onClick={() => setShowTrack(!showTrack)}
                  className={`inline-flex items-center gap-2.5 px-3.5 py-3 rounded-full border font-black text-sm transition-all ${
                    showTrack 
                      ? 'border-amber-500/70 bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-white shadow-lg shadow-amber-500/15' 
                      : 'border-white/10 bg-black/30 text-white/80 hover:border-amber-500/35'
                  }`}
                  data-testid="toggle-track"
                >
                  <span className={`w-2.5 h-2.5 rounded-full border ${showTrack ? 'bg-amber-400 border-amber-500/75 shadow-amber-500/40 shadow-sm' : 'bg-white/25 border-white/20'}`} />
                  Track
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 flex-wrap mt-4">
              {[
                { key: 'ecosystem' as const, label: 'ProActive Ecosystem' },
                { key: 'cyber' as const, label: 'Cybersecurity Track' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`px-5 py-3.5 rounded-full border font-black text-sm transition-all ${
                    activeTab === tab.key
                      ? 'border-amber-500/70 bg-gradient-to-br from-amber-500/20 to-amber-500/5 text-white shadow-lg shadow-amber-500/15'
                      : 'border-white/10 bg-black/30 text-white/80 hover:border-amber-500/35 hover:-translate-y-0.5'
                  }`}
                  data-testid={`tab-${tab.key}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </header>

          {/* Lead Generation Section */}
          {showLeadGen && (
            <section className="px-5 py-5 border-b border-white/10 bg-black/5" data-testid="section-lead-gen">
              <div className="flex items-center justify-between gap-4 mb-4 cursor-pointer" onClick={() => setShowLeadGen(!showLeadGen)}>
                <div>
                  <div className="text-xs text-amber-400 uppercase tracking-[0.16em] font-black mb-1">Lead Generation</div>
                  <div className="text-lg font-black text-white">3 Sources of Leads</div>
                </div>
                <button className="w-10 h-10 rounded-xl border border-white/15 bg-black/30 text-white grid place-items-center transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Lead Gen Progress */}
              <div className="p-4 rounded-2xl border border-white/10 bg-black/25 mb-4">
                <div className="flex justify-between items-baseline gap-4 mb-2.5">
                  <div className="text-xs text-white/60 font-extrabold uppercase tracking-widest">Lead Gen Progress</div>
                  <div className="text-xs text-white/60 font-extrabold">
                    Step {leadGenCards.findIndex(c => c.id === activeLeadCard) + 1} / {leadGenCards.length}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${leadProgress}%`,
                      background: 'linear-gradient(90deg, #ffb800, #5aa7ff)'
                    }}
                  />
                </div>
              </div>

              {/* Lead Gen Timeline */}
              <div className="relative flex gap-5 overflow-x-auto pb-5 pt-5 px-1 scroll-smooth" style={{ scrollSnapType: 'x mandatory' }}>
                <div className="absolute left-2.5 right-2.5 top-2.5 h-[3px] rounded-full bg-gradient-to-r from-amber-500/65 via-blue-400/55 to-emerald-400/55 opacity-25 pointer-events-none" />
                
                {filteredLeadCards.map(card => (
                  <article
                    key={card.id}
                    onClick={() => openDrawer(card)}
                    className={`flex-shrink-0 w-[340px] max-w-[380px] rounded-[22px] border p-5 cursor-pointer transition-all duration-300 ${
                      activeLeadCard === card.id
                        ? 'border-amber-500/75 bg-gradient-to-br from-amber-500/15 to-amber-500/5 shadow-2xl shadow-amber-500/15 -translate-y-0.5'
                        : 'border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.02] hover:border-amber-500/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50'
                    }`}
                    style={{ scrollSnapAlign: 'start', boxShadow: '0 18px 55px rgba(0,0,0,.45)' }}
                    data-testid={`card-${card.id}`}
                  >
                    <div className="flex justify-between items-start gap-3 mb-3">
                      <h3 className="font-black text-base text-white leading-tight">{card.title}</h3>
                      <span className="flex-shrink-0 px-3 py-2 rounded-full border border-amber-500/45 bg-amber-500/10 text-amber-400 font-black text-xs tracking-wide">
                        {card.badge}
                      </span>
                    </div>
                    
                    <ul className="list-disc pl-5 text-white/80 text-sm font-semibold leading-relaxed mb-3">
                      {card.items.map((item, i) => (
                        <li key={i} className="mb-2 marker:text-amber-400">{item}</li>
                      ))}
                    </ul>

                    <div className="grid gap-2.5 mt-3">
                      {card.meta.map((m, i) => (
                        <div key={i} className="flex justify-between items-center gap-3 px-3.5 py-3 rounded-xl border border-white/12 bg-black/30 text-sm font-bold text-white/80">
                          <span className="text-amber-400 font-black">{m.label}</span>
                          <span className="flex items-center gap-2">
                            {m.label === 'Meeting Type' && getMeetingIcon(m.value)}
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="mt-4 w-full py-3.5 rounded-xl border border-white/15 bg-black/35 text-white font-black transition-all hover:-translate-y-0.5 hover:border-amber-500/55 hover:bg-amber-500/10"
                      data-testid={`button-details-${card.id}`}
                    >
                      View Details
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Sales Track Section */}
          {showTrack && (
            <section className="px-5 py-5" data-testid="section-track">
              <div className="flex items-center justify-between gap-4 mb-4 cursor-pointer" onClick={() => setShowTrack(!showTrack)}>
                <div>
                  <div className="text-xs text-amber-400 uppercase tracking-[0.16em] font-black mb-1">Sales Process Track</div>
                  <div className="text-lg font-black text-white">
                    {activeTab === 'ecosystem' ? 'ProActive Ecosystem' : 'Cybersecurity Track'}
                  </div>
                </div>
                <button className="w-10 h-10 rounded-xl border border-white/15 bg-black/30 text-white grid place-items-center transition-transform">
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Track Progress */}
              <div className="p-4 rounded-2xl border border-white/10 bg-black/25 mb-4">
                <div className="flex justify-between items-baseline gap-4 mb-2.5">
                  <div className="text-xs text-white/60 font-extrabold uppercase tracking-widest">Track Progress</div>
                  <div className="text-xs text-white/60 font-extrabold">
                    Step {trackCards.findIndex(c => c.id === activeTrackCard) + 1} / {trackCards.length}
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${trackProgress}%`,
                      background: 'linear-gradient(90deg, #ffb800, #5aa7ff)'
                    }}
                  />
                </div>
              </div>

              {/* Row Header */}
              <div className="mb-4 px-1.5">
                <div className="text-xs text-amber-400 uppercase tracking-[0.15em] font-extrabold mb-2">
                  {activeTab === 'ecosystem' ? 'Sales Process' : 'Cybersecurity Track'}
                </div>
                <div className="text-xl font-extrabold text-white leading-snug">
                  {activeTab === 'ecosystem' 
                    ? 'Qualification → Discovery → Technical Assessment → Prescribe/Close → Follow-Up'
                    : 'Co-Managed Cyber (cyber-only OR roll into ProActive Ecosystem)'
                  }
                </div>
              </div>

              {/* Track Timeline */}
              <div className="relative flex gap-5 overflow-x-auto pb-5 pt-8 px-1 scroll-smooth" style={{ scrollSnapType: 'x mandatory' }}>
                <div className="absolute left-4 right-4 top-5 h-[3px] rounded-full bg-gradient-to-r from-amber-500/65 via-blue-400/55 to-emerald-400/55 opacity-22 pointer-events-none" />
                
                {filteredTrackCards.map(card => (
                  <article
                    key={card.id}
                    onClick={() => openDrawer(card)}
                    className={`flex-shrink-0 w-[360px] max-w-[390px] rounded-[20px] border p-5 cursor-pointer transition-all duration-300 backdrop-blur-[18px] overflow-hidden ${
                      activeTrackCard === card.id
                        ? 'border-amber-500 bg-gradient-to-br from-amber-500/15 to-amber-500/5 shadow-2xl shadow-amber-500/25 -translate-y-1 scale-[1.01]'
                        : 'border-white/15 bg-gradient-to-br from-white/[0.12] to-white/[0.04] hover:border-amber-500/45 hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-2xl hover:shadow-amber-500/20'
                    }`}
                    style={{ scrollSnapAlign: 'start', boxShadow: '0 20px 60px rgba(0,0,0,.40)' }}
                    data-testid={`card-${card.id}`}
                  >
                    <div className="flex justify-between items-start gap-3 mb-3.5">
                      <h3 className="font-black text-base text-white leading-tight">{card.title}</h3>
                      <span className="flex-shrink-0 px-3.5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-black text-xs tracking-wide">
                        {card.badge}
                      </span>
                    </div>
                    
                    <ul className="list-disc pl-5 text-white/80 text-sm font-medium leading-relaxed mb-3.5">
                      {card.items.map((item, i) => (
                        <li key={i} className="mb-2 marker:text-amber-400">{item}</li>
                      ))}
                    </ul>

                    <div className="grid gap-3 mt-3.5">
                      {card.meta.map((m, i) => (
                        <div key={i} className="flex justify-between items-center gap-3 px-3.5 py-3 rounded-xl border border-white/15 bg-black/25 text-sm font-semibold text-white/80">
                          <span className="text-amber-400 font-extrabold">{m.label}</span>
                          <span className="flex items-center gap-2 text-right">
                            {m.label === 'Meeting Type' && getMeetingIcon(m.value)}
                            <span className="max-w-[160px] truncate">{m.value}</span>
                          </span>
                        </div>
                      ))}
                    </div>

                    <button 
                      className="mt-4 w-full py-3.5 rounded-xl border border-white/15 bg-black/30 text-white font-extrabold transition-all hover:-translate-y-0.5 hover:border-amber-500 hover:bg-amber-500/10"
                      data-testid={`button-details-${card.id}`}
                    >
                      View Details
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Detail Drawer */}
          {drawerCard && (
            <div className="mx-5 mb-6 rounded-[20px] border border-amber-500/45 p-5 backdrop-blur-[18px]"
                 style={{ 
                   background: 'linear-gradient(180deg, rgba(255,184,0,.14), rgba(0,0,0,.22))',
                   boxShadow: '0 26px 90px rgba(0,0,0,.65)'
                 }}
                 data-testid="drawer-detail"
            >
              <div className="flex justify-between items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-amber-500/55 bg-amber-500/15 text-white font-black text-xs uppercase tracking-wider">
                  {drawerCard.phase}
                </span>
                <button 
                  onClick={() => setDrawerCard(null)}
                  className="w-10 h-10 rounded-xl border border-white/20 bg-black/30 text-white text-xl font-black grid place-items-center hover:border-white/40"
                  data-testid="button-close-drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-3">{drawerCard.title}</h3>
              
              <div className="text-white/80 font-semibold leading-relaxed text-[15px]">
                {drawerCard.meta.find(m => m.label === 'Meeting Type') && (
                  <p className="mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <b className="text-amber-400">Meeting Type:</b> {drawerCard.meta.find(m => m.label === 'Meeting Type')?.value}
                  </p>
                )}
                
                {drawerCard.details.title && (
                  <p className="mb-2"><b className="text-amber-400">{drawerCard.details.title}:</b></p>
                )}
                
                <ul className="list-disc pl-6 space-y-2">
                  {drawerCard.details.content.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
