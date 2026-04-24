import { useState, useEffect, useCallback, useRef } from "react";

const TALLY_FORM_URL = "https://tally.so/embed/A7qM9z?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1";
const STRIPE_LINK = "https://buy.stripe.com/eVq7sLf5C4Bm5DI8YB0kE02";

const COMPASS = {
  fire: {
    letter: "S",
    name: "Spark",
    fullName: "Sovereignty",
    element: "Fire",
    direction: "East",
    represents: "Spirit",
    color: "#C0392B",
    glow: "rgba(192,57,43,0.15)",
    mantra: "Becoming begins with not abandoning yourself.",
    icon: "🔥",
    sparks: [
      "What did you say yes to recently that you meant no to?",
      "What is one truth about yourself you’ve been softening for someone else?",
      "When was the last time you felt fully like yourself? What were you doing?",
      "What part of yourself do you protect the most? What are you protecting it from?",
      "If the people closest to you could only keep one version of you, which would you want them to keep?",
      "What is the most honest thing you could say right now that you haven’t said yet?",
      "What turns you on about being alive right now? Not sexually — what makes your spirit say yes?",
      "Where in your life are you performing instead of being?",
    ],
    daily: [
      { title: "The Abandoned Self", prompt: "Write about a time you left yourself to keep something intact — a relationship, a job, a friendship, a family peace. What did it cost you? What did you hope to gain?" },
      { title: "The Sovereignty Inventory", prompt: "List five things that are non-negotiably yours — truths, values, practices, boundaries. For each: when did you last honor it? When did you last betray it?" },
      { title: "The Honest Introduction", prompt: "Introduce yourself as if they could handle the real version. Not your title, not your role — who you actually are right now, in this season of your life." },
      { title: "Desire as Sovereignty", prompt: "Write about something you desire — sexually, creatively, spiritually — that you haven’t given yourself permission to want. What story have you been telling yourself about why you can’t have it?" },
      { title: "Fire Letter", prompt: "Write a letter to the part of yourself that dims its light to make others comfortable. What does that part need to hear?" },
    ],
    deep: [
      { title: "The Loss of Center", prompt: "Write the full story of a time you lost your sovereignty — in a relationship, a career, a family system, an identity. Begin with the moment you first felt yourself slipping. Follow the thread. End with where you are now." },
      { title: "The Erotic Self-Portrait", prompt: "Write a portrait of yourself as a sexual and sensual being — not performing, not for anyone’s consumption. Who are you when desire exists without shame, without performance, without agenda?" },
      { title: "The Reclaiming", prompt: "Write about coming back to yourself after losing center. What was the first thing you reclaimed? What was the hardest? What surprised you about who you were when you returned?" },
    ],
  },
  water: {
    letter: "O",
    name: "Owning",
    fullName: "Ownership",
    element: "Water",
    direction: "South",
    represents: "Emotions",
    color: "#2980B9",
    glow: "rgba(41,128,185,0.15)",
    mantra: "Emotions are information, not weapons.",
    icon: "🌊",
    sparks: [
      "What emotion are you carrying right now that you haven’t named yet?",
      "What are you blaming someone else for that might actually be yours to feel?",
      "If your anger could speak one clean sentence, what would it say?",
      "Where in your body do you feel your current emotion? Describe the sensation, not the story.",
      "What is the emotion underneath your default emotion? Under the anger — what? Under the numbness — what?",
      "Name a feeling you had during intimacy that you didn’t share. What stopped you?",
      "What emotion did you feel today that you did not express? Where did it go?",
      "What would you say to someone you love if you could only use 'I feel' statements?",
    ],
    daily: [
      { title: "The Storm Log", prompt: "Describe a recent moment when your emotions exceeded what the situation called for. What was the trigger? What was the older wound underneath?" },
      { title: "The Shame Inventory", prompt: "Name three things you feel shame about. For each: where did you learn this was shameful? Is it yours, or did someone hand it to you?" },
      { title: "The Sentence That Changes Everything", prompt: "Complete: 'I am feeling ___ and it is mine.' Write what shifts when you own it fully instead of directing it outward." },
      { title: "Water Letter", prompt: "Write a letter to an emotion you’ve been running from — grief, rage, loneliness, shame, desire. Ask it what it needs. Let it answer." },
      { title: "The Body’s Emotional Memory", prompt: "Think of deep intimacy where you felt truly met. Where did you feel it in your body? Now think of deep shame in intimacy. What would it take to let both memories live in the same body?" },
    ],
    deep: [
      { title: "The Escalation Story", prompt: "Write the full story of a conflict that spiraled. Start with the surface trigger and peel back every layer. What were you really fighting about? Write with compassion for everyone involved, including yourself." },
      { title: "The Emotional Inheritance", prompt: "Trace one of your emotional patterns back to its origin. How did the people who raised you handle this emotion? What did you learn about this feeling before you had words for it? How does it show up in your relationships and sexuality now?" },
      { title: "The Shame Story", prompt: "Write the full story of a shame you carry — around your body, your desire, your identity, your past. Not to exorcise it. To witness it. Then write one sentence about who you’d be if this shame had no power over you." },
    ],
  },
  earth: {
    letter: "L",
    name: "Letting",
    fullName: "Letting Be",
    element: "Earth",
    direction: "West",
    represents: "Body",
    color: "#27AE60",
    glow: "rgba(39,174,96,0.15)",
    mantra: "Let it be. Let it be. Let it be.",
    icon: "🌍",
    sparks: [
      "What are you trying to control right now that might not be yours to control?",
      "What would happen if you stopped trying to fix this?",
      "Name something you’re gripping tightly. What are you afraid will happen if you let go?",
      "Where is your body holding tension right now? What is it holding for you?",
      "What version of yourself are you ready to let die?",
      "When was the last time you let someone truly see your body — without performing or hiding?",
      "What would your body say if it could speak one sentence right now?",
      "What are you holding onto that has already ended?",
    ],
    daily: [
      { title: "The Completion Ceremony", prompt: "Choose something that has run its course. Write its eulogy. Honor what it gave you. Name what it cost you. Say goodbye as if you meant it." },
      { title: "The Body’s Story", prompt: "Your body has been through everything you have. Write its lived experience. What has it endured? Enjoyed? Been denied? What does it need now?" },
      { title: "The Grip Inventory", prompt: "List three things you’re gripping — a hope, a grudge, an expectation, a fantasy, an old identity. For each: what will happen if you let go? What might actually happen?" },
      { title: "Earth Letter", prompt: "Write a letter to someone you’ve already lost — through breakup, distance, death, or change. Say the things you didn’t say. Do not send it." },
      { title: "Letting Pleasure In", prompt: "Write about your relationship with receiving pleasure — not giving, not performing, but receiving. Where do you brace? Where do you deflect? What would it feel like to let pleasure all the way in without wondering if you deserve it?" },
    ],
    deep: [
      { title: "The Letting Story", prompt: "Write the full story of the hardest goodbye — or the thing you haven’t been able to let be. Begin with the first crack. Follow it through. End with who you became on the other side." },
      { title: "The Archaeology of Armor", prompt: "Map the armor you wear — in your body, in your relationships, in your sexuality, in your public self. Where did each piece come from? Which pieces kept you safe? Which ones are keeping you trapped? If you removed one piece today, which would it be?" },
    ],
  },
  air: {
    letter: "O",
    name: "Opening",
    fullName: "Opening",
    element: "Air",
    direction: "North",
    represents: "Mind",
    color: "#8E44AD",
    glow: "rgba(142,68,173,0.15)",
    mantra: "Who you are becoming has not arrived yet. Make room.",
    icon: "🌬️",
    sparks: [
      "What surprised you about love — or yourself in love — recently?",
      "Name one way you are different in relationships than you were a year ago.",
      "What is your Inner Critic’s favorite line? Write it. Now write what your Spirit would say back.",
      "Where in your life is something new trying to emerge that you haven’t made room for?",
      "What would you want from a lover if you weren’t afraid to ask?",
      "What lesson took you the longest to learn? Write it in one line.",
      "If love could speak to you right now, what would it say?",
      "What form of intimacy are you curious about but haven’t experienced?",
    ],
    daily: [
      { title: "The Return Moment", prompt: "Describe a moment when your heart opened again after you thought it wouldn’t. What happened? What did it feel like in your body? What made it possible?" },
      { title: "The Evolved Love Letter", prompt: "Write a love letter — not to a person, but to the version of love, intimacy, or connection you are now capable of. What does this love look like?" },
      { title: "The Critic and the Child", prompt: "Write a conversation between your Inner Critic and your Inner Child. Let the Critic say what it’s been saying — about your body, your worth, your desirability. Then let the Child respond. Then let your Sovereign self say the final word." },
      { title: "The New Form", prompt: "Describe a relationship that changed shape but didn’t end. A romance that became a friendship. A sexual connection that became spiritual. What made the transition possible?" },
      { title: "Air Letter", prompt: "Write a letter to your future self — the one who has integrated these lessons. What do you want them to remember about this season?" },
    ],
    deep: [
      { title: "The Return to Love", prompt: "Write the full story of when love came back — romantic, self-love, erotic, spiritual. The moment you realized you were not broken. Let this carry hope without bypassing the pain that preceded it." },
      { title: "The Practitioner’s Manifesto", prompt: "Write your personal manifesto. What do you stand for in your relationships, your sexuality, your self-expression, your daily life? What will you no longer tolerate — in others or in yourself? Write it as if it is already true." },
    ],
  },
  void: {
    letter: "∅",
    name: "The Void",
    fullName: "The Center",
    element: "Center",
    direction: "Within",
    represents: "The Pause",
    color: "#2C3E50",
    glow: "rgba(44,62,80,0.2)",
    mantra: "When you don’t know what to do: return to the breath.",
    icon: "◯",
    sparks: [
      "In the pause between exhale and inhale, what do you notice?",
      "What identity are you between right now? Name what you were. Name that you don’t yet know what’s next.",
      "What are you resisting about not knowing?",
      "If emptiness were not frightening, what would you do with this moment?",
      "Name three things you are certain of. Now three you are not. Which list feels more alive?",
      "What part of your desire is in the Void right now — not gone, but unformed, waiting?",
    ],
    daily: [
      { title: "The Between Place", prompt: "Describe where you are right now in the space between who you were and who you’re becoming. Do not try to resolve it. Just describe the landscape." },
      { title: "The Emptying Practice", prompt: "Set a timer for 10 minutes. Write everything you think you know about yourself. Then cross out everything that is not true anymore. What remains?" },
      { title: "Void Letter", prompt: "Write a letter to the unknown. Not to God, not to a person — to the actual experience of not knowing. What is your relationship with uncertainty?" },
    ],
    deep: [
      { title: "The Void Story", prompt: "Write the full story of a time you had no idea who you were anymore. Do not rush to the resolution. Stay in the middle of the story. Let yourself feel what it is like to be unformed." },
      { title: "The Art of Emptying", prompt: "Reflect on what you have been carrying that is not yours — other people’s expectations, old identities, inherited beliefs about love, sex, success, and worth. Write each one down. Then write what it would feel like to set it down." },
    ],
  },
};

const DIRECTIONS = ["fire", "water", "earth", "air", "void"];
const TIERS = ["sparks", "daily", "deep"];
const TIER_LABELS = { sparks: "Spark · 5 min", daily: "Daily Sit · 10–15 min", deep: "Deep Dive · 30–60 min" };

function getDailyPrompt() {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  const weekNum = Math.floor(dayOfYear / 7) % 4;
  const dir = DIRECTIONS[weekNum];
  const compass = COMPASS[dir];
  const promptIdx = dayOfYear % compass.sparks.length;
  return { direction: dir, compass, prompt: compass.sparks[promptIdx] };
}

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [showTally, setShowTally] = useState(false);
  const [view, setView] = useState("home");
  const [activeDir, setActiveDir] = useState(null);
  const [activeTier, setActiveTier] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [journal, setJournal] = useState([]);
  const [showJournal, setShowJournal] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const [breathPhase, setBreathPhase] = useState(null);
  const [breathCount, setBreathCount] = useState(0);
  const breathRef = useRef(null);

  useEffect(() => {
    try {
      const entered = localStorage.getItem("solo-dojo-entered");
      if (entered === "true") setHasEntered(true);
      const raw = JSON.parse(localStorage.getItem("solo-dojo-journal") || "[]");
      if (Array.isArray(raw)) setJournal(raw);
    } catch {}
  }, []);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [view, activeDir, activePrompt, hasEntered]);

  const daily = getDailyPrompt();

  const navigate = useCallback((newView, dir = null, tier = null, prompt = null) => {
    setFadeIn(false);
    setTimeout(() => {
      setView(newView);
      setActiveDir(dir);
      setActiveTier(tier);
      setActivePrompt(prompt);
      setJournalText("");
      setFadeIn(true);
    }, 150);
  }, []);

  const enterDojo = () => {
    try { localStorage.setItem("solo-dojo-entered", "true"); } catch {}
    setHasEntered(true);
    setShowTally(false);
  };

  const signOut = () => {
    try { localStorage.removeItem("solo-dojo-entered"); } catch {}
    setHasEntered(false);
    setView("home");
  };

  const saveEntry = () => {
    if (!journalText.trim() || !activePrompt) return;
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      direction: activeDir,
      tier: activeTier,
      promptText: typeof activePrompt === "string" ? activePrompt : activePrompt.prompt,
      promptTitle: typeof activePrompt === "string" ? null : activePrompt.title,
      text: journalText.trim(),
    };
    const updated = [entry, ...journal];
    setJournal(updated);
    try { localStorage.setItem("solo-dojo-journal", JSON.stringify(updated)); } catch {}
    setJournalText("");
    navigate("saved");
  };

  const startBreath = () => { setBreathCount(0); runBreath(0); };
  const runBreath = (n) => {
    if (n >= 12) { setBreathPhase(null); return; }
    const phases = ["Inhale (Fire)", "Hold (Water)", "Exhale (Earth)", "Pause (Void)"];
    const durations = [4000, 3000, 5000, 3000];
    setBreathPhase(phases[n % 4]); setBreathCount(n);
    breathRef.current = setTimeout(() => runBreath(n + 1), durations[n % 4]);
  };
  const stopBreath = () => { clearTimeout(breathRef.current); setBreathPhase(null); };

  const compass = activeDir ? COMPASS[activeDir] : null;

  // ========== WELCOME / GATE SCREEN ==========
  if (!hasEntered) {
    return (
      <div style={styles.app}>
        <div style={{ ...styles.ambientGlow, background: "radial-gradient(ellipse at 50% 30%, rgba(212,165,116,0.08), transparent 70%)" }} />
        <div style={{ ...styles.content, opacity: fadeIn ? 1 : 0, transition: "opacity 0.3s ease" }}>
          <div style={{ ...styles.centered, justifyContent: "center", minHeight: "90vh" }}>
            <h1 style={styles.title}>SOLO DOJO</h1>
            <p style={styles.subtitleItalic}>A Compass for the Dark Night of the Soul. Or whatever.</p>
            <div style={styles.accentLine} />
            <div style={styles.welcomeCard}>
              <p style={styles.welcomePara}>Most people are taught how to fall in love.</p>
              <p style={styles.welcomePara}>Almost no one is taught how to become themselves.</p>
              <p style={styles.welcomeParaAccent}>This is a practice for the rest of it.</p>
            </div>
            <button style={styles.enterBtn} onClick={() => setShowTally(true)}>Enter the Dojo</button>
            <p style={styles.welcomeHint}>Leave your name and the compass will open.</p>
            <p style={{ ...styles.footerText, marginTop: "40px" }}>A Djedi Dojo Experience &middot; DjediDojo.com</p>
          </div>
        </div>
        {showTally && (
          <div style={styles.modalOverlay} onClick={() => setShowTally(false)}>
            <div style={styles.tallyModal} onClick={e => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>Enter the Dojo</h2>
                <button style={styles.closeBtn} onClick={() => setShowTally(false)}>&times;</button>
              </div>
              <iframe src={TALLY_FORM_URL} style={styles.tallyIframe} title="Enter the Dojo" frameBorder="0" />
              <div style={styles.tallyFooter}>
                <button style={styles.tallyContinueBtn} onClick={enterDojo}>
                  I've submitted &mdash; take me to the compass &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ========== MAIN APP ==========
  return (
    <div style={styles.app}>
      <div style={{
        ...styles.ambientGlow,
        background: compass
          ? `radial-gradient(ellipse at 50% 30%, ${compass.glow}, transparent 70%)`
          : "radial-gradient(ellipse at 50% 30%, rgba(212,165,116,0.06), transparent 70%)"
      }} />

      <div style={{ ...styles.content, opacity: fadeIn ? 1 : 0, transition: "opacity 0.3s ease" }}>

        {/* ========== HOME ========== */}
        {view === "home" && (
          <div style={styles.centered}>
            <h1 style={styles.title}>SOLO DOJO</h1>
            <p style={styles.subtitleItalic}>A Compass for the Dark Night of the Soul. Or whatever.</p>
            <div style={styles.accentLine} />

            <div
              style={{ ...styles.dailyCard, borderColor: daily.compass.color + "40" }}
              onClick={() => navigate("prompt", daily.direction, "sparks", daily.prompt)}
            >
              <div style={styles.dailyLabel}>TODAY'S PROMPT</div>
              <div style={styles.dailyIcon}>{daily.compass.icon}</div>
              <p style={styles.dailyText}>"{daily.prompt}"</p>
              <div style={{ ...styles.dailyDir, color: daily.compass.color }}>
                {daily.compass.letter} &mdash; {daily.compass.name}
              </div>
              <div style={styles.tapHint}>tap to begin</div>
            </div>

            <div style={styles.compassWheel}>
              <button style={{ ...styles.compassPoint, ...styles.pointTop, borderColor: COMPASS.air.color }} onClick={() => navigate("direction", "air")}>
                <span style={styles.cardinal}>N</span>
                <span style={styles.pointIcon}>{COMPASS.air.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.air.color }}>O</span>
                <span style={styles.pointName}>Opening</span>
                <span style={styles.pointRepresents}>Mind</span>
              </button>

              <button style={{ ...styles.compassPoint, ...styles.pointRight, borderColor: COMPASS.fire.color }} onClick={() => navigate("direction", "fire")}>
                <span style={styles.cardinal}>E</span>
                <span style={styles.pointIcon}>{COMPASS.fire.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.fire.color }}>S</span>
                <span style={styles.pointName}>Spark</span>
                <span style={styles.pointRepresents}>Spirit</span>
              </button>

              <button style={{ ...styles.compassPoint, ...styles.pointBottom, borderColor: COMPASS.water.color }} onClick={() => navigate("direction", "water")}>
                <span style={styles.cardinal}>S</span>
                <span style={styles.pointIcon}>{COMPASS.water.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.water.color }}>O</span>
                <span style={styles.pointName}>Owning</span>
                <span style={styles.pointRepresents}>Emotions</span>
              </button>

              <button style={{ ...styles.compassPoint, ...styles.pointLeft, borderColor: COMPASS.earth.color }} onClick={() => navigate("direction", "earth")}>
                <span style={styles.cardinal}>W</span>
                <span style={styles.pointIcon}>{COMPASS.earth.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.earth.color }}>L</span>
                <span style={styles.pointName}>Letting</span>
                <span style={styles.pointRepresents}>Body</span>
              </button>

              <button style={{ ...styles.compassPoint, ...styles.pointCenter, borderColor: COMPASS.void.color }} onClick={() => navigate("direction", "void")}>
                <span style={styles.voidIcon}>{COMPASS.void.icon}</span>
                <span style={styles.voidLabel}>THE VOID</span>
              </button>

              <div style={styles.compassLineVertical} />
              <div style={styles.compassLineHorizontal} />
            </div>

            {/* Wheel direction labels */}
            <div style={{ display: "flex", justifyContent: "center", gap: "28px", marginBottom: "20px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#d4a574" }}>Clockwise</div>
                <div style={{ fontSize: "9px", color: "#888", fontFamily: "sans-serif", marginTop: "2px" }}>Healing &middot; Clearing</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "11px", color: "#d4a574" }}>Counterclockwise</div>
                <div style={{ fontSize: "9px", color: "#888", fontFamily: "sans-serif", marginTop: "2px" }}>Creating &middot; Manifesting</div>
              </div>
            </div>

            <div style={styles.bottomLinks}>
              <button style={styles.linkBtn} onClick={() => navigate("about")}>About the Compass</button>
              <button style={styles.linkBtn} onClick={() => setShowJournal(true)}>My Journal ({journal.length})</button>
              <button style={styles.linkBtn} onClick={() => navigate("breath")}>Void Breath</button>
            </div>

            <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-block", padding: "14px 32px", background: "rgba(212,165,116,0.15)",
              border: "1px solid #d4a574", color: "#d4a574", fontSize: "12px",
              fontFamily: "sans-serif", letterSpacing: "0.15em", textTransform: "uppercase",
              textDecoration: "none", borderRadius: "6px", marginBottom: "8px", textAlign: "center",
            }}>Join the Weekly Dojo &mdash; $27/month</a>
            <p style={{ fontSize: "10px", color: "#666", fontStyle: "italic", marginBottom: "20px" }}>Founding member rate. Locks in.</p>

            <p style={styles.footerText}>A Djedi Dojo Experience &middot; DjediDojo.com</p>
            <button style={styles.signOutBtn} onClick={signOut}>sign out</button>
          </div>
        )}

        {/* ========== ABOUT ========== */}
        {view === "about" && (
          <div style={styles.aboutContainer}>
            <button style={styles.backBtn} onClick={() => navigate("home")}>&larr; Compass</button>

            <h2 style={styles.aboutTitle}>About the Compass</h2>
            <p style={{ ...styles.subtitleItalic, marginBottom: "16px" }}>The Practice of Becoming Who You Are</p>
            <div style={styles.accentLine} />

            <p style={styles.aboutPara}>
              SOLO Dojo is a practice of becoming &mdash; a weekly community dojo built around the SOLO Compass, a four-directional framework that maps Spirit, Emotions, Body, and Mind onto a wheel that turns in two directions: clockwise for healing, counterclockwise for creating.
            </p>

            <p style={styles.aboutPara}>
              The practice works whether you are navigating a dark night of the soul &mdash; divorce, grief, identity crisis &mdash; or simply asking the most important question: who am I when I stop performing, protecting, and pretending?
            </p>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>The Four Directions</h3>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>{COMPASS.fire.icon}</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.fire.color }}>S &mdash; Spark (Sovereignty)</div>
                  <div style={styles.elementMeta}>Fire &middot; East &middot; Spirit &mdash; The Boss</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                East represents our Spirit &mdash; the Spark. The thing that makes you want to get out of bed. The Sovereign self, the I Am, is the boss. When Spirit is lit, everything moves. When it dims, the whole wheel stalls.
              </p>
              <p style={{ ...styles.elementDesc, fontStyle: "italic", marginTop: "8px", color: "#888" }}>
                When out of balance: We lose the thing that makes us want to get up. The wheel stops. Sovereignty &mdash; reclaiming the Spark &mdash; is how it begins again.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>{COMPASS.water.icon}</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.water.color }}>O &mdash; Owning</div>
                  <div style={styles.elementMeta}>Water &middot; South &middot; Emotions &mdash; The Inner Child</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                South represents our Emotions &mdash; the Inner Child. When armored by trauma, emotions pressurize and erupt like a geyser. Owning is the discipline of emotional honesty: feeling without blaming. The vulnerability of feeling authentically gives way to great personal potency and resonance.
              </p>
              <p style={{ ...styles.elementDesc, fontStyle: "italic", marginTop: "8px", color: "#888" }}>
                When out of balance: We become numb. Unfinished emotional business pressurizes. Owning teaches that feeling authentically is the source of our greatest power.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>{COMPASS.earth.icon}</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.earth.color }}>L &mdash; Letting</div>
                  <div style={styles.elementMeta}>Earth &middot; West &middot; Body &mdash; The Battery</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                West represents the Body &mdash; our battery. It drains when disconnected from Spirit's spark. Letting is the practice of allowing &mdash; not forcing, not fixing, not fleeing. The hardest discipline on the compass: to be present with what is, without needing it to be different. Let it be.
              </p>
              <p style={{ ...styles.elementDesc, fontStyle: "italic", marginTop: "8px", color: "#888" }}>
                When out of balance: We're exhausted, running on fumes. Letting &mdash; allowing, resting without guilt &mdash; is how the battery recharges.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>{COMPASS.air.icon}</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.air.color }}>O &mdash; Opening</div>
                  <div style={styles.elementMeta}>Air &middot; North &middot; Mind &mdash; The Facilitator</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                North represents the Mind &mdash; the facilitator of Spirit's directive. But when out of balance, it becomes the Inner Critic &mdash; protecting the Inner Child from disappointment by shutting down possibility. Opening restores the Mind to its true role: facilitator, not jailer.
              </p>
              <p style={{ ...styles.elementDesc, fontStyle: "italic", marginTop: "8px", color: "#888" }}>
                When out of balance: The Inner Critic says 'Don't try. You'll fail. Stay safe.' Opening gives the Mind its real job back.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>{COMPASS.void.icon}</span>
                <div>
                  <div style={{ ...styles.elementName, color: "#d4a574" }}>The Void &mdash; The Center</div>
                  <div style={styles.elementMeta}>The Pause Between Breaths &middot; Always Available</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                The Void is not a direction. It is the center &mdash; the still point around which everything turns. The space between identities, the threshold between endings and beginnings. When you don't know what to do, return to the breath.
              </p>
            </div>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>The Wheel Turns Both Ways</h3>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#d4a574" }}>Clockwise &mdash; The Healing Wheel:</strong> Spirit &rarr; Emotions &rarr; Body &rarr; Mind. Emptying, clearing, healing. The wheel for dark nights.
              </p>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#d4a574" }}>Counterclockwise &mdash; The Wheel of Manifestation:</strong> Spirit &rarr; Mind &rarr; Body &rarr; Emotions. Creating, manifesting, becoming. When vulnerability gives way to potency, the universe responds &mdash; sings back &mdash; to that resonance. This is where synchronicity and flow are experienced.
              </p>
            </div>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>Lineage</h3>
              <p style={styles.aboutPara}>
                The SOLO Compass draws from the Medicine Wheel of Manifestation as taught in the Deer Tribe Metis Medicine Society's Sweet Medicine SunDance Long House of Shamanic Training. Tony studied the Twisted Hairs &mdash; multicultural shamanic practices from around the world that work &mdash; for three years. The framework also integrates Dagara tradition, Hawaiian practice, and Advanced Psychosomatic Character Therapy / Jungian Shamanism.
              </p>
            </div>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>Three Ways to Practice</h3>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#e8e4df" }}>Solo</strong> &mdash; Alone with your journal, voice memo, morning coffee.
              </p>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#e8e4df" }}>Paired</strong> &mdash; Between two people. One reads the prompt. Both answer. The listener holds space without fixing.
              </p>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#e8e4df" }}>Group</strong> &mdash; In the weekly dojo, a dinner party, a circle. Write first, then share. No advice. Just witnessing.
              </p>
            </div>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>Save to Your Home Screen</h3>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#d4a574" }}>iPhone:</strong> Tap the Share button at the bottom of Safari, then tap "Add to Home Screen"
              </p>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#d4a574" }}>Android:</strong> Tap the menu icon in Chrome, then tap "Add to Home screen"
              </p>
              <p style={styles.aboutPara}>
                <strong style={{ color: "#d4a574" }}>Desktop:</strong> Click the install icon in the address bar
              </p>
              <p style={{ ...styles.aboutPara, fontStyle: "italic", color: "#666" }}>
                Once installed, SOLO Dojo opens like a native app.
              </p>
            </div>

            <div style={{ ...styles.accentLine, margin: "24px auto" }} />

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>Join the Weekly Dojo</h3>
              <p style={styles.aboutPara}>
                The app is free. The weekly live practice is where the compass comes alive. Every Tuesday at 7pm CST / 5pm PST, we meet in the dojo. Breath. Teaching. Prompt. Writing. Sharing. Witnessing.
              </p>
              <div style={{ textAlign: "center", margin: "20px 0" }}>
                <a href={STRIPE_LINK} target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-block", padding: "14px 32px", background: "#d4a574",
                  color: "#0d0d0f", fontSize: "12px", fontFamily: "sans-serif",
                  letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none",
                  borderRadius: "6px", fontWeight: "600",
                }}>Join SOLO Dojo &mdash; $27/month</a>
              </div>
              <p style={{ fontSize: "12px", fontStyle: "italic", color: "#666", textAlign: "center" }}>Founding member rate. Locks in.</p>
            </div>

            <div style={{ ...styles.accentLine, margin: "24px auto" }} />

            <p style={styles.aboutSignoff}>&mdash; Sparkle Tony</p>

            <button style={styles.returnBtn} onClick={() => navigate("home")}>Return to the Compass</button>
          </div>
        )}

        {/* ========== BREATH ========== */}
        {view === "breath" && (
          <div style={{ ...styles.centered, justifyContent: "center", minHeight: "60vh" }}>
            <button style={styles.backBtn} onClick={() => navigate("home")}>&larr; Compass</button>
            <h2 style={{ fontSize: "22px", fontWeight: "normal", color: "#e8e4df", marginBottom: "6px" }}>The Void Breath</h2>
            <p style={{ fontSize: "12px", fontStyle: "italic", color: "#888", marginBottom: "32px" }}>
              Inhale (Fire) &middot; Hold (Water) &middot; Exhale (Earth) &middot; Pause (Void)
            </p>

            {breathPhase ? (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "180px", height: "180px", borderRadius: "50%",
                  border: "1px solid rgba(212,165,116,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                  background: breathCount % 4 === 0 ? "rgba(192,57,43,0.12)" : breathCount % 4 === 1 ? "rgba(41,128,185,0.12)" : breathCount % 4 === 2 ? "rgba(39,174,96,0.12)" : "rgba(44,62,80,0.15)",
                  transition: "background 1s ease",
                }}>
                  <span style={{ fontSize: "16px", color: "#d4a574" }}>{breathPhase}</span>
                </div>
                <div style={{ fontSize: "11px", color: "#666", marginBottom: "16px" }}>Round {Math.floor(breathCount / 4) + 1} of 3</div>
                <button onClick={stopBreath} style={{ background: "none", border: "none", color: "#666", fontSize: "13px", cursor: "pointer" }}>Stop</button>
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  width: "180px", height: "180px", borderRadius: "50%",
                  border: "1px solid rgba(212,165,116,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 24px",
                }}>
                  <span style={{ fontSize: "14px", color: "#888" }}>Ready</span>
                </div>
                <button onClick={startBreath} style={{
                  padding: "14px 48px", background: "#d4a574", color: "#0d0d0f",
                  border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "600",
                  letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "sans-serif",
                }}>Begin</button>
              </div>
            )}
          </div>
        )}

        {/* ========== DIRECTION ========== */}
        {view === "direction" && compass && (
          <div style={styles.centered}>
            <button style={styles.backBtn} onClick={() => navigate("home")}>&larr; Compass</button>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>{compass.icon}</div>
            <h2 style={{ ...styles.dirTitle, color: compass.color }}>
              {compass.letter} &mdash; {compass.name}
            </h2>
            <p style={styles.dirMeta}>{compass.element} &middot; {compass.direction} &middot; {compass.represents}</p>
            <p style={styles.mantra}>"{compass.mantra}"</p>
            <div style={styles.accentLine} />

            {TIERS.map((tier) => {
              const prompts = compass[tier];
              if (!prompts) return null;
              const isLocked = tier !== "sparks";
              return (
                <div key={tier} style={styles.tierSection}>
                  <div style={{ ...styles.tierLabel, background: isLocked ? "#444" : compass.color }}>
                    {TIER_LABELS[tier]}{isLocked ? " — Members" : ""}
                  </div>
                  {prompts.map((p, i) => {
                    const isObj = typeof p === "object";
                    return (
                      <button key={i} style={{
                        ...styles.promptBtn,
                        opacity: isLocked ? 0.45 : 1,
                        position: "relative",
                      }} onClick={() => isLocked ? window.open(STRIPE_LINK, '_blank') : navigate("prompt", activeDir, tier, p)}>
                        {isLocked && <span style={{
                          position: "absolute", top: "8px", right: "10px",
                          fontSize: "9px", color: "#d4a574", fontFamily: "sans-serif",
                          letterSpacing: "0.1em", textTransform: "uppercase",
                          background: "rgba(212,165,116,0.1)", padding: "2px 8px", borderRadius: "10px",
                        }}>Join</span>}
                        {isObj && <span style={styles.promptTitle}>{p.title}</span>}
                        <span style={styles.promptText}>{isObj ? p.prompt.slice(0, 80) + "..." : p}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* ========== PROMPT ========== */}
        {view === "prompt" && activePrompt && compass && (
          <div style={styles.centered}>
            <button style={styles.backBtn} onClick={() => navigate("direction", activeDir)}>&larr; {compass.name}</button>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>{compass.icon}</div>
            {typeof activePrompt === "object" && (
              <h3 style={{ ...styles.promptViewTitle, color: compass.color }}>{activePrompt.title}</h3>
            )}
            <p style={styles.promptViewText}>
              {typeof activePrompt === "string" ? activePrompt : activePrompt.prompt}
            </p>
            <div style={{ ...styles.tierBadge, background: compass.color + "20", color: compass.color }}>
              {TIER_LABELS[activeTier]}
            </div>
            <div style={styles.accentLine} />
            <textarea style={styles.textarea} placeholder="Begin writing..." value={journalText} onChange={e => setJournalText(e.target.value)} rows={8} />
            <button
              style={{ ...styles.saveBtn, background: journalText.trim() ? compass.color : "#333", cursor: journalText.trim() ? "pointer" : "default" }}
              onClick={saveEntry} disabled={!journalText.trim()}
            >Save to Journal</button>
          </div>
        )}

        {/* ========== SAVED ========== */}
        {view === "saved" && (
          <div style={{ ...styles.centered, justifyContent: "center", minHeight: "60vh" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>&diams;</div>
            <h2 style={styles.savedTitle}>Saved</h2>
            <p style={styles.savedText}>Your words are held.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap", justifyContent: "center" }}>
              <button style={styles.linkBtnAlt} onClick={() => navigate("home")}>Return to Compass</button>
              <button style={styles.linkBtnAlt} onClick={() => setShowJournal(true)}>View Journal</button>
            </div>
          </div>
        )}
      </div>

      {/* ========== JOURNAL MODAL ========== */}
      {showJournal && (
        <div style={styles.modalOverlay} onClick={() => setShowJournal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>My Journal</h2>
              <button style={styles.closeBtn} onClick={() => setShowJournal(false)}>&times;</button>
            </div>
            {journal.length === 0 ? (
              <p style={styles.emptyJournal}>No entries yet. Pull a prompt and begin writing.</p>
            ) : (
              <div style={styles.journalList}>
                {journal.map((entry) => {
                  const c = COMPASS[entry.direction];
                  return (
                    <div key={entry.id} style={{ ...styles.journalEntry, borderLeftColor: c?.color || "#666" }}>
                      <div style={styles.journalMeta}>
                        <span style={{ color: c?.color || "#999" }}>{c?.icon} {c?.name}</span>
                        <span style={styles.journalDate}>
                          {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                      {entry.promptTitle && <div style={styles.journalPromptTitle}>{entry.promptTitle}</div>}
                      <p style={styles.journalPrompt}>"{entry.promptText?.slice(0, 60)}…"</p>
                      <p style={styles.journalText}>{entry.text}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: { minHeight: "100vh", background: "#0d0d0f", color: "#e8e4df", fontFamily: "'Georgia', 'Times New Roman', serif", position: "relative", overflow: "hidden" },
  ambientGlow: { position: "fixed", top: 0, left: 0, right: 0, height: "60vh", pointerEvents: "none", zIndex: 0 },
  content: { position: "relative", zIndex: 1, maxWidth: "480px", margin: "0 auto", padding: "24px 20px 40px" },
  centered: { display: "flex", flexDirection: "column", alignItems: "center" },
  title: { fontSize: "42px", fontWeight: "normal", letterSpacing: "0.2em", marginBottom: "8px", fontFamily: "'Georgia', serif" },
  subtitleItalic: { fontSize: "13px", fontStyle: "italic", color: "#a89a8a", marginBottom: "16px", textAlign: "center", fontFamily: "'Georgia', serif" },
  accentLine: { width: "50px", height: "1px", background: "#d4a574", margin: "16px auto 20px" },
  welcomeCard: { width: "100%", padding: "28px 24px", border: "1px solid rgba(212,165,116,0.15)", borderRadius: "8px", background: "rgba(255,255,255,0.02)", textAlign: "center", marginBottom: "28px" },
  welcomePara: { fontSize: "15px", color: "#c0b8ae", lineHeight: 1.6, marginBottom: "12px", fontStyle: "italic" },
  welcomeParaAccent: { fontSize: "15px", color: "#d4a574", lineHeight: 1.6, marginTop: "16px", fontStyle: "italic" },
  enterBtn: { background: "linear-gradient(135deg, rgba(212,165,116,0.15), rgba(212,165,116,0.05))", border: "1px solid #d4a574", color: "#e8e4df", fontSize: "14px", cursor: "pointer", fontFamily: "'Georgia', serif", letterSpacing: "0.2em", padding: "16px 36px", borderRadius: "6px", textTransform: "uppercase", marginBottom: "12px", transition: "all 0.3s ease" },
  welcomeHint: { fontSize: "11px", color: "#666", fontStyle: "italic", textAlign: "center" },
  dailyCard: { width: "100%", padding: "24px 20px", border: "1px solid", borderRadius: "8px", background: "rgba(255,255,255,0.02)", cursor: "pointer", textAlign: "center", marginBottom: "28px", transition: "all 0.3s ease" },
  dailyLabel: { fontSize: "9px", letterSpacing: "0.25em", color: "#d4a574", marginBottom: "12px", fontFamily: "sans-serif", textTransform: "uppercase" },
  dailyIcon: { fontSize: "24px", marginBottom: "10px" },
  dailyText: { fontSize: "16px", fontStyle: "italic", color: "#c0b8ae", lineHeight: 1.5, marginBottom: "10px" },
  dailyDir: { fontSize: "12px", fontWeight: "600", fontFamily: "sans-serif", letterSpacing: "0.05em" },
  tapHint: { fontSize: "10px", color: "#666", marginTop: "8px", fontFamily: "sans-serif", letterSpacing: "0.1em" },
  compassWheel: { position: "relative", width: "320px", height: "320px", marginBottom: "24px", marginTop: "8px" },
  compassLineVertical: { position: "absolute", top: "50%", left: "50%", width: "1px", height: "260px", background: "linear-gradient(to bottom, rgba(212,165,116,0.15), rgba(212,165,116,0.4), rgba(212,165,116,0.15))", transform: "translate(-50%, -50%)", zIndex: 0, pointerEvents: "none" },
  compassLineHorizontal: { position: "absolute", top: "50%", left: "50%", width: "260px", height: "1px", background: "linear-gradient(to right, rgba(212,165,116,0.15), rgba(212,165,116,0.4), rgba(212,165,116,0.15))", transform: "translate(-50%, -50%)", zIndex: 0, pointerEvents: "none" },
  compassPoint: { position: "absolute", width: "90px", height: "90px", borderRadius: "50%", border: "1.5px solid", background: "rgba(13,13,15,0.85)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1px", color: "#e8e4df", fontFamily: "inherit", transition: "all 0.3s ease", zIndex: 2 },
  pointTop: { top: "0px", left: "50%", transform: "translateX(-50%)" },
  pointRight: { top: "50%", right: "0px", transform: "translateY(-50%)" },
  pointBottom: { bottom: "0px", left: "50%", transform: "translateX(-50%)" },
  pointLeft: { top: "50%", left: "0px", transform: "translateY(-50%)" },
  pointCenter: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(44,62,80,0.6), rgba(13,13,15,0.95))", borderWidth: "2px" },
  pointIcon: { fontSize: "18px" },
  pointLetter: { fontSize: "18px", fontWeight: "bold", fontFamily: "sans-serif", lineHeight: 1 },
  pointName: { fontSize: "9px", color: "#999", fontFamily: "sans-serif", letterSpacing: "0.05em", textAlign: "center" },
  pointRepresents: { fontSize: "7px", color: "#666", fontFamily: "sans-serif", letterSpacing: "0.05em", textAlign: "center" },
  voidIcon: { fontSize: "28px", color: "#d4a574", lineHeight: 1 },
  voidLabel: { fontSize: "9px", color: "#d4a574", fontFamily: "sans-serif", letterSpacing: "0.1em", marginTop: "4px", textTransform: "uppercase" },
  cardinal: { fontSize: "8px", color: "#d4a574", fontFamily: "sans-serif", letterSpacing: "0.2em", marginBottom: "1px", opacity: 0.6 },
  bottomLinks: { display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" },
  linkBtn: { background: "none", border: "none", color: "#d4a574", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.05em", textDecoration: "underline", textUnderlineOffset: "3px" },
  linkBtnAlt: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,165,116,0.3)", color: "#d4a574", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.05em", padding: "10px 20px", borderRadius: "6px" },
  footerText: { fontSize: "10px", color: "#555", fontFamily: "sans-serif", letterSpacing: "0.1em" },
  signOutBtn: { background: "none", border: "none", color: "#444", fontSize: "9px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.1em", marginTop: "12px", textTransform: "uppercase" },
  backBtn: { background: "none", border: "none", color: "#a89a8a", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", alignSelf: "flex-start", marginBottom: "20px", padding: "4px 0" },
  dirTitle: { fontSize: "28px", fontWeight: "normal", marginBottom: "4px", fontFamily: "'Georgia', serif" },
  dirMeta: { fontSize: "11px", color: "#888", fontFamily: "sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" },
  mantra: { fontSize: "14px", fontStyle: "italic", color: "#a89a8a", textAlign: "center", marginBottom: "8px" },
  tierSection: { width: "100%", marginBottom: "20px" },
  tierLabel: { fontSize: "10px", fontFamily: "sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", padding: "8px 14px", borderRadius: "6px 6px 0 0", fontWeight: "600" },
  promptBtn: { display: "flex", flexDirection: "column", width: "100%", padding: "12px 14px", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "transparent", cursor: "pointer", textAlign: "left", color: "#e8e4df", fontFamily: "inherit", transition: "background 0.2s" },
  promptTitle: { fontSize: "12px", fontWeight: "bold", fontFamily: "sans-serif", marginBottom: "3px", color: "#ccc" },
  promptText: { fontSize: "13px", color: "#999", lineHeight: 1.4 },
  promptViewTitle: { fontSize: "20px", fontWeight: "normal", marginBottom: "10px", fontFamily: "'Georgia', serif" },
  promptViewText: { fontSize: "16px", lineHeight: 1.6, color: "#c0b8ae", textAlign: "center", marginBottom: "12px", fontStyle: "italic", maxWidth: "400px" },
  tierBadge: { fontSize: "10px", fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 12px", borderRadius: "20px", fontWeight: "600" },
  textarea: { width: "100%", minHeight: "180px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#e8e4df", fontFamily: "'Georgia', serif", fontSize: "14px", lineHeight: 1.7, padding: "16px", resize: "vertical", outline: "none" },
  saveBtn: { width: "100%", padding: "14px", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "600", letterSpacing: "0.05em", marginTop: "12px", transition: "all 0.2s" },
  savedTitle: { fontSize: "24px", fontWeight: "normal", color: "#d4a574", marginBottom: "6px" },
  savedText: { fontSize: "14px", color: "#888", fontStyle: "italic" },
  aboutContainer: { display: "flex", flexDirection: "column", width: "100%" },
  aboutTitle: { fontSize: "28px", fontWeight: "normal", color: "#e8e4df", fontFamily: "'Georgia', serif", textAlign: "center", marginBottom: "4px", letterSpacing: "0.05em" },
  aboutPara: { fontSize: "14px", color: "#c0b8ae", lineHeight: 1.7, marginBottom: "14px" },
  aboutSection: { marginTop: "24px", marginBottom: "8px" },
  aboutSectionTitle: { fontSize: "16px", fontWeight: "normal", color: "#d4a574", fontFamily: "'Georgia', serif", marginBottom: "12px", letterSpacing: "0.03em" },
  elementCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,165,116,0.1)", borderRadius: "8px", padding: "16px", marginBottom: "12px" },
  elementHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" },
  elementIcon: { fontSize: "28px", lineHeight: 1 },
  elementName: { fontSize: "16px", fontWeight: "600", fontFamily: "'Georgia', serif", marginBottom: "2px" },
  elementMeta: { fontSize: "10px", color: "#888", fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" },
  elementDesc: { fontSize: "13px", color: "#b5ada3", lineHeight: 1.7 },
  aboutSignoff: { fontSize: "13px", color: "#a89a8a", textAlign: "center", fontStyle: "italic", marginBottom: "24px" },
  returnBtn: { background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.3)", color: "#d4a574", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.1em", padding: "14px 24px", borderRadius: "6px", textTransform: "uppercase", marginTop: "12px", alignSelf: "center" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 16px", overflowY: "auto" },
  modal: { background: "#151518", borderRadius: "12px", width: "100%", maxWidth: "480px", maxHeight: "80vh", overflow: "auto", border: "1px solid rgba(212,165,116,0.15)" },
  tallyModal: { background: "#151518", borderRadius: "12px", width: "100%", maxWidth: "500px", maxHeight: "90vh", display: "flex", flexDirection: "column", border: "1px solid rgba(212,165,116,0.2)" },
  tallyIframe: { width: "100%", flex: 1, minHeight: "480px", border: "none", background: "transparent" },
  tallyFooter: { padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center" },
  tallyContinueBtn: { background: "rgba(212,165,116,0.15)", border: "1px solid rgba(212,165,116,0.4)", color: "#d4a574", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.05em", padding: "12px 24px", borderRadius: "6px" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  modalTitle: { fontSize: "18px", fontWeight: "normal", color: "#d4a574" },
  closeBtn: { background: "none", border: "none", color: "#888", fontSize: "18px", cursor: "pointer" },
  emptyJournal: { padding: "40px 20px", textAlign: "center", color: "#666", fontSize: "13px", fontStyle: "italic" },
  journalList: { padding: "12px" },
  journalEntry: { padding: "14px 16px", borderLeft: "3px solid", marginBottom: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "0 6px 6px 0" },
  journalMeta: { display: "flex", justifyContent: "space-between", fontSize: "11px", fontFamily: "sans-serif", marginBottom: "6px" },
  journalDate: { color: "#666" },
  journalPromptTitle: { fontSize: "12px", fontWeight: "bold", fontFamily: "sans-serif", color: "#aaa", marginBottom: "2px" },
  journalPrompt: { fontSize: "12px", color: "#777", fontStyle: "italic", marginBottom: "8px" },
  journalText: { fontSize: "13px", color: "#bbb", lineHeight: 1.6 },
};
