import { useState, useEffect, useCallback } from "react";

const COMPASS = {
  fire: {
    letter: "S",
    name: "Sovereignty",
    element: "Fire",
    direction: "East",
    color: "#C0392B",
    glow: "rgba(192,57,43,0.15)",
    mantra: "Love begins with not abandoning yourself.",
    icon: "🔥",
    sparks: [
      "What did I say yes to today that I meant no to?",
      "Where in my body do I feel my own aliveness right now?",
      "Name one truth about yourself you have been softening for someone else.",
      "What would change if you trusted your own knowing today?",
      "Write one sentence that begins: \"I am not willing to…\"",
      "When was the last time you felt fully like yourself? What were you doing?",
      "What is one thing you stopped doing because someone else was uncomfortable with it?",
    ],
    daily: [
      { title: "The Abandoned Self", prompt: "Write about a time you left yourself to keep a relationship intact. What did it cost you? What did you hope to gain? Knowing what you know now, what would you say to that version of yourself?" },
      { title: "The Sovereignty Inventory", prompt: "List five things that are non-negotiably yours—truths, values, practices, boundaries. For each one, write a sentence about the last time you honored it and the last time you didn't." },
      { title: "Fire Letter", prompt: "Write a letter to the part of yourself that dims its light to make others comfortable. What does that part need to hear?" },
      { title: "The Intuition You Ignored", prompt: "Describe a moment when you knew something was off in a relationship but overrode your gut. What were the signals? What story did you tell yourself to justify staying?" },
    ],
    deep: [
      { title: "The Loss of Center", prompt: "Write the full story of a relationship where you lost your sovereignty. Begin with the moment you first felt yourself slipping. Follow the thread all the way through. What were you afraid of? What did you believe about love that made you abandon yourself? End with where you are now in relationship to that version of you." },
      { title: "The Reclaiming", prompt: "Write about the moment—or the slow process—of coming back to yourself after a relationship where you lost center. What was the first thing you reclaimed? What was the hardest? What surprised you about who you were when you returned?" },
    ],
  },
  water: {
    letter: "O",
    name: "Ownership",
    element: "Water",
    direction: "South",
    color: "#2980B9",
    glow: "rgba(41,128,185,0.15)",
    mantra: "Emotions are information, not weapons.",
    icon: "🌊",
    sparks: [
      "What emotion am I avoiding right now? Name it without explaining it.",
      "What am I blaming someone else for that is actually mine to feel?",
      "Write one sentence that begins: \"I am feeling…\" without adding \"because you…\"",
      "Where do you feel your current emotion in your body? Describe the sensation, not the story.",
      "What is the difference between what happened and the story you are telling about it?",
      "Name an emotion you felt today that you did not express. Where did it go?",
      "If your anger could speak one clean sentence, what would it say?",
    ],
    daily: [
      { title: "The Storm Log", prompt: "Describe a recent moment when your emotions escalated beyond what the situation called for. What was the trigger? What was the older wound underneath? What would it look like to feel the emotion fully without directing it at anyone?" },
      { title: "The Blame Inventory", prompt: "List three things you are currently blaming someone else for. For each one, write what is actually yours to own. Not to excuse their behavior—but to reclaim your power over your own emotional experience." },
      { title: "Water Letter", prompt: "Write a letter to an emotion you have been running from—grief, rage, loneliness, jealousy. Address it directly. Ask it what it needs. Let it answer." },
      { title: "The Reaction vs. The Response", prompt: "Describe a conflict where you reacted instead of responded. Rewrite the scene as if you had paused, felt the emotion, and chosen your words from a grounded place." },
    ],
    deep: [
      { title: "The Escalation Story", prompt: "Write the full story of a relationship conflict that spiraled. Start with the surface-level trigger and peel back every layer. What were you really fighting about? What emotions were you unable to name in the moment? What did you need that you could not ask for? Write it with compassion for everyone involved, including yourself." },
      { title: "The Emotional Inheritance", prompt: "Trace one of your emotional patterns back to its origin. How did the people who raised you handle this emotion? What did you learn about this feeling before you had words for it? How does it show up in your relationships now? What would it mean to feel it differently?" },
    ],
  },
  earth: {
    letter: "L",
    name: "Letting Go",
    element: "Earth",
    direction: "West",
    color: "#27AE60",
    glow: "rgba(39,174,96,0.15)",
    mantra: "Letting go is not failure. It is completion.",
    icon: "🌍",
    sparks: [
      "What are you holding onto that has already ended?",
      "Name one thing you need to release today. Just name it.",
      "Write one sentence that begins: \"I am complete with…\"",
      "What would you do differently if you believed that endings could carry dignity?",
      "What relationship—to a person, a habit, an identity—are you keeping alive out of guilt?",
      "If you gave yourself permission to grieve something fully, what would it be?",
      "What version of yourself are you ready to let die?",
    ],
    daily: [
      { title: "The Completion Ceremony", prompt: "Choose one relationship, habit, or identity that has run its course. Write its eulogy. Honor what it gave you. Name what it cost you. Say goodbye as if you meant it." },
      { title: "The Grip Inventory", prompt: "List three things you are gripping tightly—a hope, a grudge, an expectation, a version of someone. For each one, write what you believe will happen if you let go. Then write what might actually happen." },
      { title: "Earth Letter", prompt: "Write a letter to someone you have already lost—through breakup, distance, death, or change. Say the things you did not say. Do not send it. Let the paper hold it." },
      { title: "The Dignity of Endings", prompt: "Describe an ending you handled badly. Not to shame yourself—but to imagine what it would have looked like to let go with grace. What would you have said? What would you have not said?" },
    ],
    deep: [
      { title: "The Letting-Go Story", prompt: "Write the full story of the hardest goodbye. The breakup, the divorce, the friendship that faded, the love that changed shape. Begin with the first crack. Follow it through the negotiations, the bargaining, the moment you knew it was over. End with who you became on the other side. Let this be a story about completion, not failure." },
      { title: "The Archaeology of Attachment", prompt: "Choose one pattern of attachment—clinging, avoiding, anxiously checking, refusing to let go. Trace it back. Where did you learn that love required this? What would it look like to love without this pattern? Write a scene from your life as it could be." },
    ],
  },
  air: {
    letter: "O",
    name: "Opening",
    element: "Air",
    direction: "North",
    color: "#8E44AD",
    glow: "rgba(142,68,173,0.15)",
    mantra: "Love evolves when we do.",
    icon: "🌬️",
    sparks: [
      "What surprised you about love recently?",
      "Name one way you are different in relationships than you were a year ago.",
      "Write one sentence that begins: \"I am open to…\"",
      "What is one form of love you never expected to receive?",
      "If love could speak to you right now, what would it say?",
      "What lesson took you the longest to learn? Write it in one line.",
      "Where in your life is love trying to enter that you have not yet noticed?",
    ],
    daily: [
      { title: "The Return Moment", prompt: "Describe a moment when your heart opened again after you thought it wouldn't. What happened? What did it feel like in your body? What made it possible?" },
      { title: "The Evolved Love Letter", prompt: "Write a love letter—not to a person, but to the version of love you are now capable of. What does this love look like? How is it different from what you chased before?" },
      { title: "Air Letter", prompt: "Write a letter to your future self—the one who has fully integrated these lessons. What do you want them to remember about this season? What do you hope they have let go of?" },
      { title: "The New Form", prompt: "Describe a relationship that changed shape but did not end. A romance that became a friendship. A friendship that deepened. A family bond that transformed. What made the transition possible?" },
    ],
    deep: [
      { title: "The Return to Love", prompt: "Write the full story of when love came back. Not necessarily romantic love—though it can be. The moment you realized you were not broken. The day you laughed fully again. The first time you trusted someone new. Let this story carry hope without bypassing the pain that preceded it." },
      { title: "The Love Warrior Manifesto", prompt: "Write your personal manifesto as a Love Warrior. What do you stand for in relationships? What will you no longer tolerate—in others or in yourself? What kind of love are you building? This is not aspirational. Write it as if it is already true." },
    ],
  },
  void: {
    letter: "∅",
    name: "The Void",
    element: "Center",
    direction: "Within",
    color: "#2C3E50",
    glow: "rgba(44,62,80,0.2)",
    mantra: "When you don't know what to do: return to the breath.",
    icon: "◯",
    sparks: [
      "Sit with three breaths. In the pause between exhale and inhale, what do you notice?",
      "What identity are you between right now? Name what you were. Name that you don't yet know what's next.",
      "Write one sentence that begins: \"I don't know who I am, and…\"",
      "What are you resisting about not knowing?",
      "If emptiness were not frightening, what would you do with this moment?",
      "Name three things you are certain of. Now name three things you are not. Which list feels more alive?",
    ],
    daily: [
      { title: "The Between Place", prompt: "Describe where you are right now in the space between who you were and who you are becoming. Do not try to resolve it. Just describe the landscape. What does it look like? What does it feel like? What sounds are here?" },
      { title: "The Emptying Practice", prompt: "Set a timer for 10 minutes. Write everything you think you know about yourself. Then cross out everything that is not true anymore. What remains?" },
      { title: "Void Letter", prompt: "Write a letter to the unknown. Not to God, not to a person—to the actual experience of not knowing. What is your relationship with uncertainty? What would change if you befriended it?" },
    ],
    deep: [
      { title: "The Void Story", prompt: "Write the full story of a time you had no idea who you were anymore. After heartbreak, during a major transition, in a season of loneliness or disorientation. Do not rush to the resolution. Stay in the middle of the story. Let the reader—and yourself—feel what it is like to be unformed. The Void is where the Love Warrior is forged." },
      { title: "The Art of Emptying", prompt: "Reflect on what you have been carrying that is not yours—other people's expectations, old identities, inherited beliefs about love. Write each one down. Then write what it would feel like to set it down. Not throw it away. Just set it down." },
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
  const [view, setView] = useState("home");
  const [activeDir, setActiveDir] = useState(null);
  const [activeTier, setActiveTier] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);
  const [journalText, setJournalText] = useState("");
  const [journal, setJournal] = useState([]);
  const [showJournal, setShowJournal] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("solo-dojo-journal") || "[]");
      if (Array.isArray(raw)) setJournal(raw);
    } catch {}
  }, []);

  useEffect(() => {
    setFadeIn(false);
    const t = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(t);
  }, [view, activeDir, activePrompt]);

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

  const compass = activeDir ? COMPASS[activeDir] : null;

  return (
    <div style={styles.app}>
      <div style={{
        ...styles.ambientGlow,
        background: compass
          ? `radial-gradient(ellipse at 50% 30%, ${compass.glow}, transparent 70%)`
          : "radial-gradient(ellipse at 50% 30%, rgba(212,165,116,0.06), transparent 70%)"
      }} />

      <div style={{ ...styles.content, opacity: fadeIn ? 1 : 0, transition: "opacity 0.3s ease" }}>

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
                {daily.compass.letter} — {daily.compass.name}
              </div>
              <div style={styles.tapHint}>tap to begin</div>
            </div>

            <div style={styles.compassWheel}>
              <button
                style={{ ...styles.compassPoint, ...styles.pointTop, borderColor: COMPASS.air.color }}
                onClick={() => navigate("direction", "air")}
              >
                <span style={styles.cardinal}>N</span>
                <span style={styles.pointIcon}>{COMPASS.air.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.air.color }}>O</span>
                <span style={styles.pointName}>Opening</span>
              </button>

              <button
                style={{ ...styles.compassPoint, ...styles.pointRight, borderColor: COMPASS.fire.color }}
                onClick={() => navigate("direction", "fire")}
              >
                <span style={styles.cardinal}>E</span>
                <span style={styles.pointIcon}>{COMPASS.fire.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.fire.color }}>S</span>
                <span style={styles.pointName}>Sovereignty</span>
              </button>

              <button
                style={{ ...styles.compassPoint, ...styles.pointBottom, borderColor: COMPASS.water.color }}
                onClick={() => navigate("direction", "water")}
              >
                <span style={styles.cardinal}>S</span>
                <span style={styles.pointIcon}>{COMPASS.water.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.water.color }}>O</span>
                <span style={styles.pointName}>Ownership</span>
              </button>

              <button
                style={{ ...styles.compassPoint, ...styles.pointLeft, borderColor: COMPASS.earth.color }}
                onClick={() => navigate("direction", "earth")}
              >
                <span style={styles.cardinal}>W</span>
                <span style={styles.pointIcon}>{COMPASS.earth.icon}</span>
                <span style={{ ...styles.pointLetter, color: COMPASS.earth.color }}>L</span>
                <span style={styles.pointName}>Letting Go</span>
              </button>

              <button
                style={{ ...styles.compassPoint, ...styles.pointCenter, borderColor: COMPASS.void.color }}
                onClick={() => navigate("direction", "void")}
              >
                <span style={styles.voidIcon}>{COMPASS.void.icon}</span>
                <span style={styles.voidLabel}>The Void</span>
              </button>

              <div style={styles.compassLineVertical} />
              <div style={styles.compassLineHorizontal} />
            </div>

            <div style={styles.bottomLinks}>
              <button style={styles.linkBtn} onClick={() => navigate("about")}>
                About the Compass
              </button>
              <button style={styles.linkBtn} onClick={() => setShowJournal(true)}>
                My Journal ({journal.length})
              </button>
            </div>

            <p style={styles.footerText}>A Djedi Dojo Experience · DjediDojo.com</p>
          </div>
        )}

        {view === "about" && (
          <div style={styles.aboutContainer}>
            <button style={styles.backBtn} onClick={() => navigate("home")}>← Compass</button>

            <h2 style={styles.aboutTitle}>About the Compass</h2>
            <div style={styles.accentLine} />

            <p style={styles.aboutHook}>
              This isn't a self-help app. It's what I wish someone had handed me at 2am after the worst night of my life.
            </p>

            <p style={styles.aboutPara}>
              Most people are taught how to fall in love. Almost no one is taught how to navigate love when it changes. SOLO Dojo is a relational discipline — a practice for moving through connection, conflict, separation, and renewal without losing your center.
            </p>

            <p style={styles.aboutPara}>
              It's not about finding love. It's about removing the obstacles within yourself that block it.
            </p>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>The Love Warrior</h3>
              <p style={styles.aboutPara}>
                Anyone who practices this becomes a Love Warrior. Not someone who conquers others — but someone with the courage to look inward and remove the inner obstacles to love.
              </p>
              <p style={styles.aboutParaItalic}>
                You don't need to be ready. You just need to be here.
              </p>
            </div>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>The Compass & The Medicine Wheel</h3>
              <p style={styles.aboutPara}>
                The SOLO Compass draws from the ancient Medicine Wheel — a sacred map found across many indigenous wisdom traditions, where the four directions, four elements, and the sacred center form a complete picture of being human.
              </p>
              <p style={styles.aboutPara}>
                Each compass point is a movement of the heart. Each element is its medicine.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>🔥</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.fire.color }}>S — Sovereignty</div>
                  <div style={styles.elementMeta}>Fire · East · Dawn · Spirit</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                Fire is the element of sovereignty, aliveness, and truth. In the Medicine Wheel, East is the direction of the rising sun — illumination, new beginnings, spirit. Fire burns away what is not yours and reveals what is. This is where love begins: with not abandoning yourself.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>🔥</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.water.color }}>O — Ownership</div>
                  <div style={styles.elementMeta}>Water · South · Midday · Emotion</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                Water is the element of emotion, flow, and depth. South is midday — full presence, full feeling, the heat of being human. Water teaches that emotions are information, not weapons. To own your emotions is to reclaim your power over your own inner weather.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>🌍</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.earth.color }}>L — Letting Go</div>
                  <div style={styles.elementMeta}>Earth · West · Dusk · Body</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                Earth is the element of grounding, embodiment, and return. West is the setting sun — completion, integration, the dignity of endings. Earth teaches that letting go is not failure. It is completion. What is finished gets composted into what will grow next.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>🌬️</span>
                <div>
                  <div style={{ ...styles.elementName, color: COMPASS.air.color }}>O — Opening</div>
                  <div style={styles.elementMeta}>Air · North · Night · Mind</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                Air is the element of breath, wisdom, and vision. North is the still point of deep night — where insight lives, where we see clearly. Air teaches that love evolves when we do. To open is to allow new forms of love and life to emerge, unforced.
              </p>
            </div>

            <div style={styles.elementCard}>
              <div style={styles.elementHeader}>
                <span style={styles.elementIcon}>◯</span>
                <div>
                  <div style={{ ...styles.elementName, color: "#d4a574" }}>The Void</div>
                  <div style={styles.elementMeta}>Center · Within · The Pause · Source</div>
                </div>
              </div>
              <p style={styles.elementDesc}>
                At the center of every compass is the Void. Not emptiness — potential. It is the pause between breaths. The threshold between endings and beginnings. The space where identities soften and new possibilities emerge. When you don't know what to do, you return here. The Void is always available.
              </p>
              <p style={styles.aboutParaItalic}>
                The Love Warrior is forged in the Void.
              </p>
            </div>

            <div style={styles.aboutSection}>
              <h3 style={styles.aboutSectionTitle}>How to Practice</h3>
              <p style={styles.aboutPara}>
                Each week, move through one compass direction. Fire in Week 1, Water in Week 2, Earth in Week 3, Air in Week 4. Return to the Void anytime you feel between identities.
              </p>
              <p style={styles.aboutPara}>
                Within each direction, you'll find three tiers of practice:
              </p>
              <p style={styles.aboutParaSmall}>
                <strong style={{ color: "#d4a574" }}>Spark</strong> — 5 minutes. Pull a quick fire prompt. Do it standing in line, between meetings, before bed.
              </p>
              <p style={styles.aboutParaSmall}>
                <strong style={{ color: "#d4a574" }}>Daily Sit</strong> — 10–15 minutes. Settle in with breath. Write from the body, not the head.
              </p>
              <p style={styles.aboutParaSmall}>
                <strong style={{ color: "#d4a574" }}>Deep Dive</strong> — 30–60 minutes. The weekly excavation. This is where chapters are born.
              </p>
              <p style={styles.aboutPara}>
                Voice memos count. Writing counts. The practice is the reflection, not the medium.
              </p>
            </div>

            <div style={{ ...styles.accentLine, margin: "24px auto" }} />

            <p style={styles.aboutClosing}>
              You are not writing a book. You are practicing the discipline of becoming a Love Warrior. The book is what falls out of the practice.
            </p>

            <p style={styles.aboutSignoff}>
              — Sparkle Tony
            </p>

            <button style={styles.returnBtn} onClick={() => navigate("home")}>
              Return to the Compass
            </button>
          </div>
        )}

        {view === "direction" && compass && (
          <div style={styles.centered}>
            <button style={styles.backBtn} onClick={() => navigate("home")}>← Compass</button>
            <div style={{ fontSize: "36px", marginBottom: "8px" }}>{compass.icon}</div>
            <h2 style={{ ...styles.dirTitle, color: compass.color }}>
              {compass.letter} — {compass.name}
            </h2>
            <p style={styles.dirMeta}>{compass.element} · {compass.direction}</p>
            <p style={styles.mantra}>"{compass.mantra}"</p>
            <div style={styles.accentLine} />

            {TIERS.map((tier) => {
              const prompts = compass[tier];
              if (!prompts) return null;
              return (
                <div key={tier} style={styles.tierSection}>
                  <div style={{ ...styles.tierLabel, background: compass.color }}>
                    {TIER_LABELS[tier]}
                  </div>
                  {prompts.map((p, i) => {
                    const isObj = typeof p === "object";
                    return (
                      <button
                        key={i}
                        style={styles.promptBtn}
                        onClick={() => navigate("prompt", activeDir, tier, p)}
                      >
                        {isObj && <span style={styles.promptTitle}>{p.title}</span>}
                        <span style={styles.promptText}>
                          {isObj ? p.prompt.slice(0, 80) + "…" : p}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {view === "prompt" && activePrompt && compass && (
          <div style={styles.centered}>
            <button style={styles.backBtn} onClick={() => navigate("direction", activeDir)}>
              ← {compass.name}
            </button>
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

            <textarea
              style={styles.textarea}
              placeholder="Begin writing…"
              value={journalText}
              onChange={e => setJournalText(e.target.value)}
              rows={8}
            />
            <button
              style={{
                ...styles.saveBtn,
                background: journalText.trim() ? compass.color : "#333",
                cursor: journalText.trim() ? "pointer" : "default",
              }}
              onClick={saveEntry}
              disabled={!journalText.trim()}
            >
              Save to Journal
            </button>
          </div>
        )}

        {view === "saved" && (
          <div style={{ ...styles.centered, justifyContent: "center", minHeight: "60vh" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✦</div>
            <h2 style={styles.savedTitle}>Saved</h2>
            <p style={styles.savedText}>Your words are held.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap", justifyContent: "center" }}>
              <button style={styles.linkBtnAlt} onClick={() => navigate("home")}>Return to Compass</button>
              <button style={styles.linkBtnAlt} onClick={() => setShowJournal(true)}>View Journal</button>
            </div>
          </div>
        )}
      </div>

      {showJournal && (
        <div style={styles.modalOverlay} onClick={() => setShowJournal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>My Journal</h2>
              <button style={styles.closeBtn} onClick={() => setShowJournal(false)}>✕</button>
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
  dailyCard: { width: "100%", padding: "24px 20px", border: "1px solid", borderRadius: "8px", background: "rgba(255,255,255,0.02)", cursor: "pointer", textAlign: "center", marginBottom: "28px", transition: "all 0.3s ease" },
  dailyLabel: { fontSize: "9px", letterSpacing: "0.25em", color: "#d4a574", marginBottom: "12px", fontFamily: "sans-serif", textTransform: "uppercase" },
  dailyIcon: { fontSize: "24px", marginBottom: "10px" },
  dailyText: { fontSize: "16px", fontStyle: "italic", color: "#c0b8ae", lineHeight: 1.5, marginBottom: "10px" },
  dailyDir: { fontSize: "12px", fontWeight: "600", fontFamily: "sans-serif", letterSpacing: "0.05em" },
  tapHint: { fontSize: "10px", color: "#666", marginTop: "8px", fontFamily: "sans-serif", letterSpacing: "0.1em" },
  compassWheel: { position: "relative", width: "320px", height: "320px", marginBottom: "32px", marginTop: "8px" },
  compassLineVertical: { position: "absolute", top: "50%", left: "50%", width: "1px", height: "260px", background: "linear-gradient(to bottom, rgba(212,165,116,0.15), rgba(212,165,116,0.4), rgba(212,165,116,0.15))", transform: "translate(-50%, -50%)", zIndex: 0, pointerEvents: "none" },
  compassLineHorizontal: { position: "absolute", top: "50%", left: "50%", width: "260px", height: "1px", background: "linear-gradient(to right, rgba(212,165,116,0.15), rgba(212,165,116,0.4), rgba(212,165,116,0.15))", transform: "translate(-50%, -50%)", zIndex: 0, pointerEvents: "none" },
  compassPoint: { position: "absolute", width: "90px", height: "90px", borderRadius: "50%", border: "1.5px solid", background: "rgba(13,13,15,0.85)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", color: "#e8e4df", fontFamily: "inherit", transition: "all 0.3s ease", zIndex: 2 },
  pointTop: { top: "0px", left: "50%", transform: "translateX(-50%)" },
  pointRight: { top: "50%", right: "0px", transform: "translateY(-50%)" },
  pointBottom: { bottom: "0px", left: "50%", transform: "translateX(-50%)" },
  pointLeft: { top: "50%", left: "0px", transform: "translateY(-50%)" },
  pointCenter: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(44,62,80,0.6), rgba(13,13,15,0.95))", borderWidth: "2px" },
  pointIcon: { fontSize: "18px" },
  pointLetter: { fontSize: "18px", fontWeight: "bold", fontFamily: "sans-serif", lineHeight: 1 },
  pointName: { fontSize: "9px", color: "#999", fontFamily: "sans-serif", letterSpacing: "0.05em", textAlign: "center" },
  voidIcon: { fontSize: "28px", color: "#d4a574", lineHeight: 1 },
  voidLabel: { fontSize: "9px", color: "#d4a574", fontFamily: "sans-serif", letterSpacing: "0.1em", marginTop: "4px", textTransform: "uppercase" },
  cardinal: { fontSize: "8px", color: "#d4a574", fontFamily: "sans-serif", letterSpacing: "0.2em", marginBottom: "2px", opacity: 0.6 },
  bottomLinks: { display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap", justifyContent: "center" },
  linkBtn: { background: "none", border: "none", color: "#d4a574", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.05em", textDecoration: "underline", textUnderlineOffset: "3px" },
  linkBtnAlt: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,165,116,0.3)", color: "#d4a574", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.05em", padding: "10px 20px", borderRadius: "6px" },
  footerText: { fontSize: "10px", color: "#555", fontFamily: "sans-serif", letterSpacing: "0.1em" },
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
  aboutHook: { fontSize: "16px", fontStyle: "italic", color: "#d4a574", lineHeight: 1.6, textAlign: "center", marginBottom: "24px", padding: "0 8px" },
  aboutPara: { fontSize: "14px", color: "#c0b8ae", lineHeight: 1.7, marginBottom: "14px" },
  aboutParaItalic: { fontSize: "14px", color: "#a89a8a", lineHeight: 1.7, fontStyle: "italic", marginBottom: "14px", textAlign: "center" },
  aboutParaSmall: { fontSize: "13px", color: "#a89a8a", lineHeight: 1.6, marginBottom: "8px", paddingLeft: "12px" },
  aboutSection: { marginTop: "24px", marginBottom: "8px" },
  aboutSectionTitle: { fontSize: "16px", fontWeight: "normal", color: "#d4a574", fontFamily: "'Georgia', serif", marginBottom: "12px", letterSpacing: "0.03em" },
  elementCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,165,116,0.1)", borderRadius: "8px", padding: "16px", marginBottom: "12px" },
  elementHeader: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" },
  elementIcon: { fontSize: "28px", lineHeight: 1 },
  elementName: { fontSize: "16px", fontWeight: "600", fontFamily: "'Georgia', serif", marginBottom: "2px" },
  elementMeta: { fontSize: "10px", color: "#888", fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" },
  elementDesc: { fontSize: "13px", color: "#b5ada3", lineHeight: 1.7 },
  aboutClosing: { fontSize: "15px", fontStyle: "italic", color: "#c0b8ae", lineHeight: 1.7, textAlign: "center", marginTop: "16px", marginBottom: "16px" },
  aboutSignoff: { fontSize: "13px", color: "#a89a8a", textAlign: "center", fontStyle: "italic", marginBottom: "24px" },
  returnBtn: { background: "rgba(212,165,116,0.1)", border: "1px solid rgba(212,165,116,0.3)", color: "#d4a574", fontSize: "12px", cursor: "pointer", fontFamily: "sans-serif", letterSpacing: "0.1em", padding: "14px 24px", borderRadius: "6px", textTransform: "uppercase", marginTop: "12px", alignSelf: "center" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 16px", overflowY: "auto" },
  modal: { background: "#151518", borderRadius: "12px", width: "100%", maxWidth: "480px", maxHeight: "80vh", overflow: "auto", border: "1px solid rgba(212,165,116,0.15)" },
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
  journalText: { fontSize: "13px", color: "#bbb", lineHeight: 1.6 }
};
