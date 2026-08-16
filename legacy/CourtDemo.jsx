import React, { useState } from "react";
import {
  QrCode,
  Play,
  ChevronLeft,
  Home,
  BarChart3,
  User,
  Clock,
  Flame,
  Target,
  Check,
} from "lucide-react";

// ---- Design tokens ----
const c = {
  bg: "#0A1022",
  surface: "#121B33",
  surface2: "#1B2645",
  line: "#2A3557",
  courtBlue: "#2454E8",
  courtBlueDeep: "#173A9E",
  lime: "#D7F238",
  limeDeep: "#8FA30F",
  coral: "#FF6B4A",
  textPrimary: "#F4F6FB",
  textMuted: "#8891AA",
  textFaint: "#5C6683",
};

const MATCHES = [
  {
    id: 1,
    date: "8 Ağu",
    venue: "Kort 2 · Pinar Padel",
    teamA: ["Nik", "Miguel"],
    teamB: ["Frankie", "Sam J."],
    winner: "B",
    duration: "25.1 dk",
    time: "19:22",
  },
  {
    id: 2,
    date: "3 Ağu",
    venue: "Kort 1 · Pinar Padel",
    teamA: ["Burak", "Ege"],
    teamB: ["Deniz", "Can"],
    winner: "A",
    duration: "31.4 dk",
    time: "20:05",
  },
];

const HIGHLIGHTS = [
  { id: 1, label: "En uzun rally", detail: "60 vuruş", duration: "0:48" },
  { id: 2, label: "En hızlı seri", detail: "9 vuruş / 6.2 sn", duration: "0:11" },
  { id: 3, label: "Maç sarsıcı anı", detail: "Winner — Frankie", duration: "0:07" },
];

function PhoneFrame({ children }) {
  return (
    <div
      style={{
        width: 360,
        height: 740,
        background: "#000",
        borderRadius: 44,
        padding: 10,
        boxShadow: "0 0 0 1px " + c.line,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: c.bg,
          borderRadius: 34,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
          color: c.textPrimary,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 22px 6px",
        fontSize: 13,
        fontWeight: 600,
        color: c.textPrimary,
      }}
    >
      <span>11:02</span>
      <span>Kort 2 · Canlı</span>
    </div>
  );
}

function BottomNav({ tab, setTab }) {
  const items = [
    { id: "home", label: "Ana sayfa", Icon: Home },
    { id: "matches", label: "Maçlar", Icon: BarChart3 },
    { id: "profile", label: "Profil", Icon: User },
  ];
  return (
    <div
      style={{
        display: "flex",
        borderTop: `1px solid ${c.line}`,
        background: c.surface,
        padding: "10px 8px 16px",
      }}
    >
      {items.map(({ id, label, Icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              color: active ? c.lime : c.textFaint,
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <Icon size={20} strokeWidth={2} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

function InitialsAvatar({ name, size = 30 }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: c.courtBlueDeep,
        border: `1px solid ${c.courtBlue}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 700,
        color: c.lime,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

function MatchCard({ m, onOpen }) {
  return (
    <div
      onClick={onOpen}
      style={{
        background: c.surface2,
        border: `1px solid ${c.line}`,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: c.textMuted,
          marginBottom: 10,
          fontWeight: 600,
          letterSpacing: 0.3,
        }}
      >
        <span>{m.date.toUpperCase()}</span>
        <span>{m.venue}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: -8 }}>
          <InitialsAvatar name={m.teamA[0]} />
          <div style={{ marginLeft: -8 }}>
            <InitialsAvatar name={m.teamA[1]} />
          </div>
        </div>
        <span style={{ fontSize: 11, color: c.textFaint, fontWeight: 700 }}>VS</span>
        <div style={{ display: "flex" }}>
          <InitialsAvatar name={m.teamB[0]} />
          <div style={{ marginLeft: -8 }}>
            <InitialsAvatar name={m.teamB[1]} />
          </div>
        </div>
        <span style={{ fontSize: 13, color: c.textMuted, fontWeight: 600 }}>{m.time}</span>
      </div>
      <button
        style={{
          width: "100%",
          marginTop: 12,
          padding: "10px 0",
          background: c.lime,
          color: "#1A2200",
          border: "none",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        Maçı görüntüle
      </button>
    </div>
  );
}

function HomeScreen({ onOpenMatch, scanning, onScan }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "4px 18px 18px" }}>
      <div style={{ marginTop: 6, marginBottom: 22 }}>
        <div style={{ fontSize: 13, color: c.textMuted, fontWeight: 600 }}>Hoş geldin</div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>Burak</div>
      </div>

      <button
        onClick={onScan}
        style={{
          width: "100%",
          border: "none",
          borderRadius: 20,
          padding: "26px 20px",
          background: `linear-gradient(135deg, ${c.courtBlueDeep}, ${c.courtBlue})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        {scanning ? (
          <>
            <Check size={30} color={c.lime} strokeWidth={2.5} />
            <div style={{ fontWeight: 800, fontSize: 15, color: c.textPrimary }}>
              Kayıt başladı — iyi maçlar
            </div>
          </>
        ) : (
          <>
            <QrCode size={30} color={c.lime} strokeWidth={2} />
            <div style={{ fontWeight: 800, fontSize: 15, color: c.textPrimary }}>
              Kort QR'ını okut
            </div>
            <div style={{ fontSize: 12, color: "#C9D6FF" }}>Kamerayı başlatır, maçını sana bağlar</div>
          </>
        )}
      </button>

      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: c.textMuted,
          marginBottom: 10,
          letterSpacing: 0.3,
        }}
      >
        Son maçlar
      </div>
      {MATCHES.map((m) => (
        <MatchCard key={m.id} m={m} onOpen={() => onOpenMatch(m)} />
      ))}
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        background: c.surface2,
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
      }}
    >
      {options.map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            style={{
              flex: 1,
              padding: "8px 0",
              border: "none",
              borderRadius: 9,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              background: active ? c.lime : "transparent",
              color: active ? "#1A2200" : c.textMuted,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function CourtSVG({ children }) {
  return (
    <svg viewBox="0 0 220 320" width="100%" height="260">
      <defs>
        <radialGradient id="hot1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.coral} stopOpacity="0.95" />
          <stop offset="55%" stopColor="#F2C94C" stopOpacity="0.55" />
          <stop offset="100%" stopColor={c.courtBlue} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hot2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F2C94C" stopOpacity="0.8" />
          <stop offset="100%" stopColor={c.courtBlue} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="4" y="4" width="212" height="312" rx="6" fill={c.courtBlue} />
      <rect x="4" y="4" width="212" height="312" rx="6" fill="none" stroke="#7FA3F5" strokeWidth="2" />
      <line x1="4" y1="160" x2="216" y2="160" stroke="#7FA3F5" strokeWidth="2" />
      <line x1="110" y1="4" x2="110" y2="316" stroke="#7FA3F5" strokeWidth="1.4" strokeDasharray="4 4" />
      {children}
    </svg>
  );
}

function CoverageTab() {
  return (
    <div>
      <div
        style={{
          fontSize: 12,
          color: c.textMuted,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        Kort kapsama alanı — 63.0 sn top içi süre
      </div>
      <div style={{ background: c.surface2, borderRadius: 16, padding: 12, border: `1px solid ${c.line}` }}>
        <CourtSVG>
          <ellipse cx="105" cy="230" rx="70" ry="65" fill="url(#hot1)" />
          <ellipse cx="150" cy="190" rx="35" ry="30" fill="url(#hot2)" />
        </CourtSVG>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <StatChip label="Baskın bölge" value="Alt-sağ" Icon={Flame} />
        <StatChip label="Kort kullanımı" value="%68" Icon={Target} />
      </div>
    </div>
  );
}

function ShotsTab() {
  const dots = [
    [40, 210], [55, 240], [70, 200], [48, 260], [90, 230],
    [35, 190], [60, 270], [100, 245], [75, 215], [52, 225],
  ];
  return (
    <div>
      <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
        <PctLabel value="35%" />
        <PctLabel value="12%" />
        <PctLabel value="53%" />
      </div>
      <div style={{ background: c.surface2, borderRadius: 16, padding: 12, border: `1px solid ${c.line}` }}>
        <CourtSVG>
          {dots.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4.5"
              fill={i % 4 === 0 ? c.lime : "#F2C94C"}
              opacity="0.9"
            />
          ))}
        </CourtSVG>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
        {["Nik", "Miguel", "Frankie", "Sam J."].map((p, i) => (
          <div
            key={p}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              background: i === 1 ? c.lime : c.surface2,
              color: i === 1 ? "#1A2200" : c.textMuted,
              border: `1px solid ${i === 1 ? c.lime : c.line}`,
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}

function PctLabel({ value }) {
  return (
    <div style={{ textAlign: "center", flex: 1 }}>
      <div style={{ fontSize: 18, fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: 10, color: c.textFaint }}>↑ vuruş yönü</div>
    </div>
  );
}

function StatChip({ label, value, Icon }) {
  return (
    <div
      style={{
        flex: 1,
        background: c.surface2,
        border: `1px solid ${c.line}`,
        borderRadius: 12,
        padding: 12,
      }}
    >
      <Icon size={16} color={c.lime} />
      <div style={{ fontSize: 16, fontWeight: 800, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 11, color: c.textMuted }}>{label}</div>
    </div>
  );
}

function HighlightsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {HIGHLIGHTS.map((h) => (
        <div
          key={h.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: c.surface2,
            border: `1px solid ${c.line}`,
            borderRadius: 14,
            padding: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: c.courtBlueDeep,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Play size={18} color={c.lime} fill={c.lime} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{h.label}</div>
            <div style={{ fontSize: 11, color: c.textMuted }}>{h.detail}</div>
          </div>
          <div style={{ fontSize: 12, color: c.textFaint, fontWeight: 600 }}>{h.duration}</div>
        </div>
      ))}
    </div>
  );
}

function MatchDetail({ match, onBack }) {
  const [tab, setTab] = useState("coverage");
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 18px 4px",
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: c.textPrimary,
            cursor: "pointer",
            padding: 4,
          }}
        >
          <ChevronLeft size={22} />
        </button>
        <div style={{ fontSize: 15, fontWeight: 800 }}>Maç özeti</div>
      </div>

      <div style={{ padding: "8px 18px" }}>
        <div
          style={{
            background: `linear-gradient(135deg, ${c.courtBlueDeep}, ${c.courtBlue})`,
            borderRadius: 16,
            padding: 16,
            marginBottom: 14,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: -6 }}>
              <InitialsAvatar name={match.teamA[0]} size={34} />
              <div style={{ marginLeft: -8 }}>
                <InitialsAvatar name={match.teamA[1]} size={34} />
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#C9D6FF", fontWeight: 700 }}>
                {match.winner === "B" ? "TAKIM B KAZANDI" : "TAKIM A KAZANDI"}
              </div>
              <div style={{ fontSize: 11, color: "#C9D6FF", marginTop: 2 }}>{match.duration}</div>
            </div>
            <div style={{ display: "flex" }}>
              <InitialsAvatar name={match.teamB[0]} size={34} />
              <div style={{ marginLeft: -8 }}>
                <InitialsAvatar name={match.teamB[1]} size={34} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <StatChip label="Maç süresi" value={match.duration} Icon={Clock} />
          <StatChip label="En uzun rally" value="60 vuruş" Icon={Flame} />
        </div>

        <Segmented
          value={tab}
          onChange={setTab}
          options={[
            { id: "coverage", label: "Kort kapsama" },
            { id: "shots", label: "Vuruşlar" },
            { id: "highlights", label: "Öne çıkanlar" },
          ]}
        />
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 18px 20px" }}>
        {tab === "coverage" && <CoverageTab />}
        {tab === "shots" && <ShotsTab />}
        {tab === "highlights" && <HighlightsTab />}
      </div>
    </div>
  );
}

function MatchesScreen({ onOpenMatch }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 18px 18px" }}>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Maçların</div>
      {MATCHES.map((m) => (
        <MatchCard key={m.id} m={m} onOpen={() => onOpenMatch(m)} />
      ))}
    </div>
  );
}

function ProfileScreen() {
  return (
    <div style={{ flex: 1, padding: "10px 18px" }}>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Profil</div>
      <div
        style={{
          background: c.surface2,
          border: `1px solid ${c.line}`,
          borderRadius: 16,
          padding: 16,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <InitialsAvatar name="Burak" size={44} />
        <div>
          <div style={{ fontWeight: 700 }}>Burak</div>
          <div style={{ fontSize: 12, color: c.textMuted }}>8 maç oynandı</div>
        </div>
      </div>
    </div>
  );
}

export default function CourtDemo() {
  const [tab, setTab] = useState("home");
  const [openMatch, setOpenMatch] = useState(null);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2600);
  };

  return (
    <div style={{ padding: "24px 0", background: "transparent" }}>
      <PhoneFrame>
        <StatusBar />
        {openMatch ? (
          <MatchDetail match={openMatch} onBack={() => setOpenMatch(null)} />
        ) : (
          <>
            {tab === "home" && (
              <HomeScreen onOpenMatch={setOpenMatch} scanning={scanning} onScan={handleScan} />
            )}
            {tab === "matches" && <MatchesScreen onOpenMatch={setOpenMatch} />}
            {tab === "profile" && <ProfileScreen />}
          </>
        )}
        {!openMatch && <BottomNav tab={tab} setTab={setTab} />}
      </PhoneFrame>
    </div>
  );
}
