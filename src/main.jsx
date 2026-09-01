```jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const friends = [
  ["Neha", "🌸"], ["Sunita", "✨"], ["Indu", "🌷"], ["Chandan Bhai", "🫶"],
  ["Soaib", "⭐"], ["Himanshu", "🌙"], ["Sonam", "💖"], ["Priti", "🌺"],
  ["Prinsi", "🦋"], ["Shakshi", "🌼"], ["Neha 2", "💫"], ["Awanish", "🌿"],
  ["Pari", "🧚"], ["Aapka Pyaar Doggy", "🐶"], ["Main", "❤️"]
];

const places = [
  {
    name: "Nainital",
    icon: "🌊",
    tag: "Serenity in the air",
    image:
      "https://images.unsplash.com/photo-1626621331169-5f34be280ed9?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Rishikesh",
    icon: "🕉️",
    tag: "Peace of soul",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Auli",
    icon: "🏔️",
    tag: "Snow & mountains",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Kedarnath",
    icon: "🙏",
    tag: "Divine blessings",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Mussoorie",
    icon: "🌄",
    tag: "Queen of hills",
    image:
      "https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=900&q=85"
  }
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, []);
}

function Stars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 52 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 6
      })),
    []
  );

  return (
    <div className="stars" aria-hidden="true">
      {stars.map(s => (
        <i
          key={s.id}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}
    </div>
  );
}

function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * -12,
        duration: 8 + Math.random() * 10,
        size: 8 + Math.random() * 14
      })),
    []
  );

  return (
    <div className="petals" aria-hidden="true">
      {petals.map(p => (
        <span
          key={p.id}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: p.size,
            height: p.size
          }}
        >
          🌸
        </span>
      ))}
    </div>
  );
}

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);

  function move(e) {
    if (
      !ref.current ||
      window.matchMedia("(max-width: 700px)").matches
    ) {
      return;
    }

    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;

    ref.current.style.transform = `perspective(900px) rotateY(${
      x * 7
    }deg) rotateX(${y * -7}deg) translateY(-5px)`;
  }

  function reset() {
    if (ref.current) {
      ref.current.style.transform = "";
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}

function Hero({ onStart }) {
  return (
    <section className="hero section-shell">
      <Stars />
      <Petals />

      <div className="hero-orb orb-a" />
      <div className="hero-orb orb-b" />

      <div className="hero-copy" data-reveal>
        <p className="eyebrow">
          ✦ A LITTLE DIGITAL UNIVERSE, MADE WITH LOVE ✦
        </p>

        <h1>
          Kajal <span>Maruya</span>
          <b>♥</b>
        </h1>

        <p className="hero-line">
          A beautiful soul who makes
          <br />
          every moment more <em>special.</em>
        </p>

        <button className="primary-btn" onClick={onStart}>
          Begin the Journey <span>→</span>
        </button>

        <p className="mobile-note">
          Best viewed in portrait mode • 360–430px optimized
        </p>
      </div>

      <div className="hero-girl-wrap" data-reveal>
        <div className="halo" />
        <div className="hero-girl" />

        <div className="quote-glass">
          <span>“</span>
          Some people come in our lives...
          <br />
          and quietly make everything more beautiful.
          <br />
          <strong>♥</strong>
        </div>
      </div>

      <div className="scroll-cue">
        SCROLL TO EXPLORE <i>↓</i>
      </div>
    </section>
  );
}

function Uttarakhand() {
  const [active, setActive] = useState("Nainital");

  return (
    <section id="uttarakhand" className="section-shell uk-section">
      <div className="section-title" data-reveal>
        <p>THE LAND OF MOUNTAINS</p>
        <h2>
          Uttarakhand <span>♡</span>
        </h2>
        <div className="line" />
      </div>

      <div className="uk-layout">
        <TiltCard className="map-card" data-reveal>
          <div className="map-copy">
            <h3>Her Mountain Story</h3>

            <p>
              Mountains, rivers, peace and happiness — a journey through
              places as beautiful as the memories they hold.
            </p>
          </div>

          <div className="map-stage">
            <svg
              viewBox="0 0 700 360"
              className="uk-map"
              role="img"
              aria-label="Stylized Uttarakhand map"
            >
              <defs>
                <linearGradient
                  id="mapGrad"
                  x1="0"
                  x2="1"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#6c7e50"
                  />
                  <stop
                    offset="45%"
                    stopColor="#536a42"
                  />
                  <stop
                    offset="100%"
                    stopColor="#2e422d"
                  />
                </linearGradient>

                <filter id="glow">
                  <feGaussianBlur
                    stdDeviation="4"
                    result="b"
                  />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M92 193 L120 136 L173 112 L224 86 L281 105 L329 73 L381 91 L429 67 L470 102 L522 96 L578 137 L606 181 L571 221 L520 236 L468 269 L408 252 L360 292 L294 278 L250 303 L195 267 L151 264 L112 228 Z"
                fill="url(#mapGrad)"
                stroke="#d7bd82"
                strokeWidth="3"
              />

              <path
                d="M130 180 C220 132, 255 220, 330 158 S460 220, 560 160"
                fill="none"
                stroke="#e9c65d"
                strokeWidth="4"
                opacity=".85"
              />

              {[
                ["Nainital", 285, 155],
                ["Mussoorie", 210, 146],
                ["Rishikesh", 175, 215],
                ["Auli", 375, 115],
                ["Kedarnath", 470, 145]
              ].map(([name, x, y]) => (
                <g
                  key={name}
                  onClick={() => setActive(name)}
                  className={`map-pin ${
                    active === name ? "active" : ""
                  }`}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    fill="#ff6fa8"
                    filter="url(#glow)"
                  />

                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#fff5fa"
                  />

                  <text
                    x={x}
                    y={y - 29}
                    textAnchor="middle"
                  >
                    {name}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="active-place">
            ✦ Exploring: <strong>{active}</strong>
          </div>
        </TiltCard>

        <div className="place-scroll" data-reveal>
          {places.map(p => (
            <TiltCard
              key={p.name}
              className="place-card"
            >
              <img
                src={p.image}
                alt={`${p.name}, Uttarakhand`}
                loading="lazy"
                onError={e => {
                  e.currentTarget.style.display = "none";
                }}
              />

              <div>
                <span>{p.icon}</span>
                <h4>{p.name}</h4>
                <p>{p.tag}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="story section-shell">
      <Petals />

      <div className="story-grid">
        <TiltCard
          className="story-visual"
          data-reveal
        >
          <div className="story-girl" />
          <div className="floating-butterfly">
            🦋
          </div>
        </TiltCard>

        <div
          className="story-text glass"
          data-reveal
        >
          <p className="eyebrow">
            A LITTLE STORY ABOUT HER
          </p>

          <h2>
            Ek Pyaari Si <span>Ladki</span> ♡
          </h2>

          <p>
            Ek pyaari si ladki, jiski muskaan se roshan
            ho jaata hai har din…
          </p>

          <p>
            Jiski baatein dil ko sukoon deti hain, aur
            jiski khushi apno ke liye ek pyari si dua ban
            jaati hai.
          </p>

          <p>
            Woh sirf ek naam nahi — ek ehsaas hai.
            <strong>
              Wohi hai hamari Kajal Didi. ♥
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}

function FatherMessage() {
  return (
    <section className="section-shell message-section">
      <div
        className="father-card glass"
        data-reveal
      >
        <div className="quote-mark">“</div>

        <p className="eyebrow">
          PAPA KA MESSAGE ♥
        </p>

        <h2>मेरी प्यारी बेटी,</h2>

        <p>
          हमेशा खुश रहो और अपने जीवन में आगे बढ़ती
          रहो।
        </p>

        <p>
          तुम्हारी मुस्कान हमेशा बनी रहे और तुम्हारे
          सारे सपने पूरे हों।
        </p>

        <p>
          पापा का प्यार और आशीर्वाद हमेशा तुम्हारे साथ
          है। ♥
        </p>

        <div className="sign">
          — Papa ♥
        </div>
      </div>
    </section>
  );
}

function People() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="people section-shell">
      <div className="section-title" data-reveal>
        <p>
          THE PEOPLE WHO MAKE LIFE MORE BEAUTIFUL
        </p>

        <h2>
          Our Beautiful People <span>♡</span>
        </h2>
      </div>

      <div className="friends-grid" data-reveal>
        {friends.map(([name, emoji], i) => (
          <button
            key={name + i}
            className={`friend ${
              selected === i ? "selected" : ""
            }`}
            onClick={() => setSelected(i)}
          >
            <span className="avatar">
              {emoji}
            </span>

            <small>{name}</small>
          </button>
        ))}
      </div>

      <p className="people-caption">
        {selected === null
          ? "Tap any star in her universe ✨"
          : `${friends[selected][0]} is part of Kajal Didi's beautiful universe 💖`}
      </p>
    </section>
  );
}

function Doggy() {
  return (
    <section className="doggy section-shell">
      <TiltCard
        className="doggy-card glass"
        data-reveal
      >
        <div className="doggy-art">🐶</div>

        <div>
          <p className="eyebrow">
            THE PUREST LOVE
          </p>

          <h2>
            Aapka Pyaar <span>Doggy</span> 🐾
          </h2>

          <p>
            Wo jo bina kahe sab samajh jaaye, sirf pyaar
            de… hamara special buddy. ♡
          </p>
        </div>

        <div className="hearts">
          ♥ ♥ ♥
        </div>
      </TiltCard>
    </section>
  );
}

function Surprise() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className={`surprise section-shell ${
        open ? "opened" : ""
      }`}
    >
      <Petals />
      <Stars />

      <div
        className="surprise-inner"
        data-reveal
      >
        <p>
          TO THE ONE WHO MAKES LIFE
        </p>

        <h2>
          More <span>Beautiful</span> ♥
        </h2>

        <div
          className="gift-wrap"
          onClick={() => setOpen(!open)}
          role="button"
          tabIndex="0"
        >
          <div className="gift-lid">✦</div>
          <div className="gift-box">🎁</div>
        </div>

        {!open ? (
          <button
            className="primary-btn"
            onClick={() => setOpen(true)}
          >
            Open Your Surprise <span>🎁</span>
          </button>
        ) : (
          <div className="final-message">
            <h3>
              We all love you so much, Kajal Didi! ❤️
            </h3>

            <p>
              May your life always be filled with
              happiness, beautiful memories, love and
              endless reasons to smile.
            </p>

            <div className="fireworks">
              ✦ ✧ ✦ ✧ ✦
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function App() {
  useReveal();

  const [music, setMusic] = useState(false);
  const audioRef = useRef(null);

  const start = () =>
    document
      .querySelector("#uttarakhand")
      ?.scrollIntoView({
        behavior: "smooth"
      });

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        audio.volume = 0.45;
        await audio.play();
        setMusic(true);
      } else {
        audio.pause();
        setMusic(false);
      }
    } catch (error) {
      console.error(
        "Music could not start:",
        error
      );

      setMusic(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/kajal.mp3"
        loop
        preload="auto"
      />

      <main>
        <nav className="mobile-nav">
          <div className="brand">
            K<span>♥</span>M
          </div>

          <button onClick={toggleMusic}>
            {music ? "♫ Playing" : "♫ Music"}
          </button>
        </nav>

        <Hero onStart={start} />
        <Uttarakhand />
        <Story />
        <FatherMessage />
        <People />
        <Doggy />
        <Surprise />

        <footer>
          Made with ❤️ especially for{" "}
          <strong>Kajal Maruya</strong> • A little
          universe of memories ✨
        </footer>
      </main>
    </>
  );
}

createRoot(
  document.getElementById("root")
).render(<App />);
```
