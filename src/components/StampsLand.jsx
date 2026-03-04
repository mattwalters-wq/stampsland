"use client";
import { useState } from "react";

// Palette - moodier, indie, textured
const INK = "#1a1a1a";
const CREAM = "#F5F0E8";
const RUST = "#C45D3E";
const SAGE = "#7D8B6A";
const DUSTY_ROSE = "#C49B9B";
const WARM_GOLD = "#D4A843";
const SLATE = "#5A5A6E";
const OFF_WHITE = "#FAF8F4";
const DARK_CREAM = "#EDE6D8";

const MEMBER_COLORS = {
  sofia: { primary: RUST, bg: "#FDF0EC" },
  scarlett: { primary: "#6B5B8D", bg: "#F3F0F8" },
  rubina: { primary: SAGE, bg: "#F0F3EC" },
};

const MEMBERS = {
  sofia: { name: "Sofia", role: "The Planner", emoji: "🌙", tagline: "processing feelings through songs since '15", color: MEMBER_COLORS.sofia },
  scarlett: { name: "Scarlett", role: "The Extrovert", emoji: "⚡", tagline: "joni mitchell made me do it", color: MEMBER_COLORS.scarlett },
  rubina: { name: "Rubina", role: "The Daydreamer", emoji: "🌿", tagline: "pluto's in aquarius & i'm feeling it", color: MEMBER_COLORS.rubina },
};

const COMMUNITY_POSTS = [
  { id: 1, author: "the stamps", avatar: "✦", badge: "band", content: "studio day 47. we wrote something at 2am that made all three of us cry. that's usually a good sign. new music is coming and it feels different to anything we've made before.", likes: 1203, comments: 287, time: "3h ago" },
  { id: 2, author: "wavesandwonder", avatar: "w", badge: null, content: "just played 'holy verse' for my mum and she cried. said it reminded her of leaving home. these songs hit different when you share them with people you love.", likes: 89, comments: 23, time: "5h ago" },
  { id: 3, author: "the stamps", avatar: "✦", badge: "band", content: "🔒 STAMPED EXCLUSIVE: voice memo from the studio - the first 30 seconds of something we haven't named yet. only for the stamped crew.", likes: 847, comments: 134, time: "1d ago", exclusive: true },
  { id: 4, author: "fremantle.kid", avatar: "f", badge: "og", content: "been following since the nannup days. seeing them at the retreat for the album launch was honestly one of the best nights of my life. the three-part harmony on 'bitter place' live is unreal.", likes: 156, comments: 41, time: "1d ago" },
  { id: 5, author: "melodyintransit", avatar: "m", badge: null, content: "anyone else going to the london show at LVLS in june? flying from sydney for it. would love to meet some of you before the gig 🇬🇧", likes: 67, comments: 52, time: "2d ago" },
];

const MEMBER_POSTS = {
  sofia: [
    { id: "s1", content: "been listening to a lot of lizzy mcalpine and the paper kites this week. there's something about the way they let songs breathe that i want to bring into our next record.", time: "2h ago", likes: 234, comments: 45 },
    { id: "s2", content: "📸 journal pages from the writing session. sometimes the best lyrics start as absolute nonsense scribbled at 1am.", time: "1d ago", likes: 567, comments: 89, exclusive: true },
    { id: "s3", content: "someone asked me how i write. honestly - i don't understand what i'm feeling until i write it down. the song tells me what i meant. weird but true.", time: "3d ago", likes: 891, comments: 132 },
  ],
  scarlett: [
    { id: "sc1", content: "just discovered this tiny venue in fitzroy that has the most incredible acoustics. we need to play there. adding it to the list. 📋", time: "4h ago", likes: 189, comments: 34 },
    { id: "sc2", content: "🎸 DEMO DROP: rough guitar loop i've been obsessing over. should we build something from this? tell me what you hear.", time: "2d ago", likes: 445, comments: 167, exclusive: true },
    { id: "sc3", content: "joni mitchell's hejira changed everything for me. the way she bends folk into something completely her own - that's what i want for us. always reaching.", time: "4d ago", likes: 623, comments: 78 },
  ],
  rubina: [
    { id: "r1", content: "pluto's fully in aquarius now and honestly i feel like everything is shifting. our sound, our lives, everything. 2026 is the year of the stamp.", time: "6h ago", likes: 312, comments: 67 },
    { id: "r2", content: "🎵 PLAYLIST: 'rubina's sunday slow burn' - the songs i listen to when the light gets golden and everything feels tender. updated weekly.", time: "1d ago", likes: 534, comments: 45 },
    { id: "r3", content: "the thing about being three people in a band is that you're never alone with a feeling. someone always gets it. that's the magic.", time: "5d ago", likes: 789, comments: 156 },
  ],
};

const TOUR_SECTIONS = [
  {
    region: "australia",
    dates: [
      { date: "5 Feb", city: "Fremantle", venue: "Mojos", status: "sold out" },
      { date: "12 Feb", city: "Fremantle", venue: "Mojos", status: "sold out" },
      { date: "19 Feb", city: "Fremantle", venue: "Mojos", status: "sold out" },
      { date: "26 Feb", city: "Fremantle", venue: "Mojos", status: "sold out" },
      { date: "12 Mar", city: "Brisbane", venue: "Black Bear Lodge", status: "sold out" },
      { date: "13 Mar", city: "Sydney", venue: "The Eveleigh", status: "sold out" },
      { date: "14 Mar", city: "Melbourne", venue: "Bergy Bandroom", status: "sold out" },
    ],
  },
  {
    region: "europe",
    dates: [
      { date: "15 May", city: "Saarbrücken", venue: "Terminus", country: "DE", status: "on sale" },
      { date: "16 May", city: "Karlsruhe", venue: "Café Nun", country: "DE", status: "on sale" },
      { date: "20 May", city: "Grevenbroich", venue: "Kultus Das Café", country: "DE", status: "on sale" },
      { date: "22 May", city: "Bergneustadt", venue: "Schauspielhaus", country: "DE", status: "on sale" },
      { date: "23 May", city: "Wallisellen", venue: "Bar 8304", country: "CH", status: "on sale" },
      { date: "27 May", city: "Wien", venue: "Club Lucia", country: "AT", status: "on sale" },
      { date: "29 May", city: "Magdeburg", venue: "Volksbad Buckau", country: "DE", status: "on sale" },
      { date: "31 May", city: "Berlin", venue: "Zimmer 16", country: "DE", status: "on sale" },
      { date: "1 Jun", city: "Hamburg", venue: "Knust Bar", country: "DE", status: "on sale" },
    ],
  },
  {
    region: "uk",
    dates: [
      { date: "3 Jun", city: "Leeds", venue: "Northern Guitars Cafe Bar", status: "on sale" },
      { date: "4 Jun", city: "Manchester", venue: "Gullivers", status: "on sale" },
      { date: "5 Jun", city: "Exeter", venue: "Cavern Club", status: "on sale" },
      { date: "6 Jun", city: "London", venue: "LVLS", status: "on sale" },
      { date: "7 Jun", city: "Brighton and Hove", venue: "The Brunswick", status: "on sale" },
    ],
  },
];

const STAMP_LEVELS = [
  { name: "First Press", desc: "Join the community", stamps: 0, unlocked: true, icon: "◐" },
  { name: "B-Side", desc: "10 posts or comments", stamps: 50, unlocked: true, icon: "◑" },
  { name: "Deep Cut", desc: "Attend a live show", stamps: 150, unlocked: false, icon: "●" },
  { name: "Inner Sleeve", desc: "6 months active", stamps: 300, unlocked: false, icon: "◉" },
  { name: "Stamped", desc: "Unlock everything", stamps: 500, unlocked: false, icon: "✦" },
];

// Cooper Black heading component
const Heading = ({ children, size = 24, color = INK, style = {} }) => (
  <div style={{
    fontFamily: "'CooperBT', 'Cooper Black', 'Cooper BT', 'Rockwell Extra Bold', 'Georgia', serif",
    fontSize: size, color, fontWeight: 900, lineHeight: 1.1, ...style,
  }}>{children}</div>
);

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const isBand = post.badge === "band";
  const isEx = post.exclusive;
  return (
    <div style={{
      background: isEx ? DARK_CREAM : OFF_WHITE, borderRadius: 3, padding: "18px 20px", marginBottom: 10,
      border: `1px solid ${isEx ? WARM_GOLD + "44" : "#E8E2D8"}`, position: "relative", transition: "border-color 0.2s ease",
    }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = isEx ? WARM_GOLD + "88" : "#D0C8BC")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = isEx ? WARM_GOLD + "44" : "#E8E2D8")}
    >
      {isEx && <div style={{ position: "absolute", top: 12, right: 14, fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 500, color: WARM_GOLD, letterSpacing: "1.5px", textTransform: "uppercase" }}>✦ stamped only</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 3, background: isBand ? INK : DUSTY_ROSE + "33",
          color: isBand ? CREAM : SLATE, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isBand ? 14 : 13, fontFamily: "'DM Mono', monospace", fontWeight: 600, textTransform: "uppercase",
        }}>{post.avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: INK }}>{post.author}</span>
            {post.badge === "og" && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, color: SAGE, border: `1px solid ${SAGE}55`, padding: "1px 6px", borderRadius: 2, letterSpacing: "0.8px", textTransform: "uppercase" }}>og fan</span>}
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE + "99" }}>{post.time}</span>
        </div>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: INK + "DD", margin: "0 0 14px 0" }}>{post.content}</p>
      {isEx && (
        <div style={{ background: `repeating-linear-gradient(45deg, ${WARM_GOLD}08, ${WARM_GOLD}08 10px, transparent 10px, transparent 20px)`, border: `1px dashed ${WARM_GOLD}44`, borderRadius: 3, padding: "24px 16px", textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 24, marginBottom: 6, color: WARM_GOLD }}>✦</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: INK }}>Stamped Content</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE, marginTop: 4 }}>reach 500 stamps to unlock</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <button onClick={() => setLiked(!liked)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Mono', monospace", fontSize: 12, color: liked ? RUST : SLATE + "88", fontWeight: liked ? 600 : 400, padding: 0 }}>
          <span style={{ fontSize: 14 }}>{liked ? "♥" : "♡"}</span> {post.likes + (liked ? 1 : 0)}
        </button>
        <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Mono', monospace", fontSize: 12, color: SLATE + "88", padding: 0 }}>↩ {post.comments}</button>
        <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 12, color: SLATE + "88", padding: 0, marginLeft: "auto" }}>↗</button>
      </div>
    </div>
  );
}

function MemberFeed({ member }) {
  const m = MEMBERS[member];
  const posts = MEMBER_POSTS[member];
  return (
    <div style={{ animation: "fadeIn 0.35s ease-out" }}>
      <div style={{ background: m.color.bg, borderRadius: 3, padding: "22px 20px", marginBottom: 14, borderLeft: `3px solid ${m.color.primary}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 3, background: m.color.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{m.emoji}</div>
          <div>
            <Heading size={22}>{m.name}</Heading>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: m.color.primary, marginTop: 3, letterSpacing: "0.5px" }}>{m.role.toUpperCase()}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: SLATE, marginTop: 4, fontStyle: "italic" }}>"{m.tagline}"</div>
          </div>
        </div>
      </div>
      {posts.map((post, i) => (
        <div key={post.id} style={{ animation: `fadeIn 0.35s ease-out ${i * 0.06}s both` }}>
          <PostCard post={{ ...post, author: m.name.toLowerCase(), avatar: m.emoji, badge: "band" }} />
        </div>
      ))}
    </div>
  );
}

export default function StampsLand() {
  const [mainTab, setMainTab] = useState("feed");
  const [feedView, setFeedView] = useState("community");
  const [showWelcome, setShowWelcome] = useState(true);
  const [userStamps] = useState(87);
  const [newPost, setNewPost] = useState("");
  const [expandedRegion, setExpandedRegion] = useState("europe");

  const mainTabs = [
    { id: "feed", label: "feed", icon: "◎" },
    { id: "shows", label: "shows", icon: "♫" },
    { id: "stamps", label: "stamps", icon: "✦" },
    { id: "you", label: "you", icon: "○" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: CREAM, fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${DUSTY_ROSE}66; border-radius: 2px; }
        input::placeholder { color: ${SLATE}77; }
      `}</style>

      {/* HEADER */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: CREAM + "EE", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: `1px solid ${DARK_CREAM}` }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <Heading size={24}>the stamps</Heading>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, color: SLATE, letterSpacing: "1.5px", textTransform: "uppercase", position: "relative", top: -1 }}>land</span>
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: INK, background: DARK_CREAM, padding: "5px 12px", borderRadius: 2, fontWeight: 500 }}>✦ {userStamps}</div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 100px" }}>

        {showWelcome && mainTab === "feed" && (
          <div style={{ background: INK, borderRadius: 3, padding: "24px 22px", margin: "14px 0", position: "relative", animation: "fadeIn 0.5s ease-out" }}>
            <button onClick={() => setShowWelcome(false)} style={{ position: "absolute", top: 12, right: 14, background: "none", border: "none", color: CREAM + "66", cursor: "pointer", fontSize: 16, fontFamily: "'DM Mono', monospace" }}>×</button>
            <Heading size={28} color={CREAM} style={{ marginBottom: 10, lineHeight: 1.15 }}>
              welcome to{"\n"}stamps land
            </Heading>
            <p style={{ fontSize: 13, color: CREAM + "BB", lineHeight: 1.6, marginBottom: 16 }}>
              you're in. this is where sofia, scarlett and rubina share what they're making, thinking and feeling - and where fans connect with each other. earn stamps by being here. unlock exclusive demos, voice memos and early access to everything.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ background: CREAM, color: INK, border: "none", borderRadius: 2, padding: "10px 20px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>start exploring</button>
              <button style={{ background: "transparent", color: CREAM + "88", border: `1px solid ${CREAM}33`, borderRadius: 2, padding: "10px 20px", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>how it works</button>
            </div>
          </div>
        )}

        {/* FEED */}
        {mainTab === "feed" && (
          <div style={{ animation: "fadeIn 0.3s ease-out" }}>
            <div style={{ display: "flex", borderBottom: `1px solid ${DARK_CREAM}`, marginTop: 10, marginBottom: 14, background: OFF_WHITE, borderRadius: "3px 3px 0 0" }}>
              <button onClick={() => setFeedView("community")} style={{
                flex: 1, padding: "12px 6px 10px", background: feedView === "community" ? OFF_WHITE : "transparent",
                border: "none", borderBottom: feedView === "community" ? `2.5px solid ${INK}` : "2.5px solid transparent",
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: feedView === "community" ? 700 : 500,
                color: feedView === "community" ? INK : SLATE, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "all 0.2s ease",
              }}><span style={{ fontSize: 16 }}>◎</span>everyone</button>
              {Object.keys(MEMBERS).map((key) => {
                const m = MEMBERS[key];
                const isActive = feedView === key;
                return (
                  <button key={key} onClick={() => setFeedView(key)} style={{
                    flex: 1, padding: "12px 6px 10px", background: isActive ? m.color.bg : "transparent",
                    border: "none", borderBottom: isActive ? `2.5px solid ${m.color.primary}` : "2.5px solid transparent",
                    cursor: "pointer", transition: "all 0.25s ease", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                  }}>
                    <span style={{ fontSize: 16 }}>{m.emoji}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: isActive ? 700 : 500, color: isActive ? m.color.primary : SLATE }}>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {feedView === "community" ? (
              <>
                <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "14px 16px", marginBottom: 12, border: `1px solid #E8E2D8`, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 2, background: DUSTY_ROSE + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "'DM Mono', monospace", color: SLATE }}>○</div>
                  <input type="text" placeholder="say something..." value={newPost} onChange={(e) => setNewPost(e.target.value)}
                    style={{ flex: 1, border: "none", outline: "none", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: INK, background: "transparent" }} />
                  <button style={{ background: newPost ? INK : DARK_CREAM, border: "none", borderRadius: 2, padding: "7px 14px", fontSize: 11, fontWeight: 600, color: newPost ? CREAM : SLATE + "66", cursor: newPost ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s ease" }}>post</button>
                </div>
                {COMMUNITY_POSTS.map((post, i) => (
                  <div key={post.id} style={{ animation: `fadeIn 0.35s ease-out ${i * 0.06}s both` }}><PostCard post={post} /></div>
                ))}
              </>
            ) : (
              <MemberFeed member={feedView} />
            )}
          </div>
        )}

        {/* SHOWS */}
        {mainTab === "shows" && (
          <div style={{ animation: "fadeIn 0.3s ease-out", paddingTop: 14 }}>
            <div style={{ background: INK, borderRadius: 3, padding: "28px 22px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(196,93,62,0.15), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(125,139,106,0.1), transparent 50%)" }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: WARM_GOLD, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10, position: "relative" }}>on the road · 2026</div>
              <Heading size={34} color={CREAM} style={{ position: "relative" }}>the stamps</Heading>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: CREAM + "88", marginTop: 6, position: "relative", letterSpacing: "1px" }}>AU · EU · UK</div>
              <p style={{ fontSize: 12, color: CREAM + "77", lineHeight: 1.5, marginTop: 10, position: "relative" }}>21 shows across three continents. find your city.</p>
            </div>

            {TOUR_SECTIONS.map((section) => (
              <div key={section.region} style={{ marginBottom: 10 }}>
                <button onClick={() => setExpandedRegion(expandedRegion === section.region ? null : section.region)} style={{
                  width: "100%", background: expandedRegion === section.region ? INK : OFF_WHITE,
                  border: expandedRegion === section.region ? "none" : `1px solid #E8E2D8`,
                  borderRadius: expandedRegion === section.region ? "3px 3px 0 0" : 3,
                  padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "all 0.2s ease",
                }}>
                  <Heading size={16} color={expandedRegion === section.region ? CREAM : INK}>{section.region}</Heading>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: expandedRegion === section.region ? CREAM + "66" : SLATE }}>
                    {section.dates.length} shows {expandedRegion === section.region ? "−" : "+"}
                  </span>
                </button>
                {expandedRegion === section.region && (
                  <div style={{ background: OFF_WHITE, border: `1px solid #E8E2D8`, borderTop: "none", borderRadius: "0 0 3px 3px" }}>
                    {section.dates.map((show, i) => {
                      const sold = show.status === "sold out";
                      return (
                        <div key={i} style={{
                          padding: "13px 18px", display: "flex", alignItems: "center", gap: 14,
                          borderBottom: i < section.dates.length - 1 ? `1px solid ${DARK_CREAM}` : "none",
                          opacity: sold ? 0.4 : 1, animation: `fadeIn 0.25s ease-out ${i * 0.03}s both`,
                        }}>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: SLATE, minWidth: 52, whiteSpace: "nowrap" }}>{show.date}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: INK }}>
                              {show.city}{show.country ? <span style={{ color: SLATE, fontWeight: 400 }}> {show.country}</span> : null}
                            </div>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE + "AA" }}>{show.venue}</div>
                          </div>
                          {sold ? (
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: RUST, letterSpacing: "0.8px", textTransform: "uppercase" }}>sold out</span>
                          ) : (
                            <button style={{ background: INK, color: CREAM, border: "none", borderRadius: 2, padding: "6px 12px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>tickets</button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div style={{ background: SAGE + "11", borderRadius: 3, padding: "18px", border: `1px solid ${SAGE}22`, marginTop: 6 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: INK, marginBottom: 6 }}>fan meetups</div>
              <p style={{ fontSize: 12, color: SLATE, lineHeight: 1.5, marginBottom: 12 }}>fans are organizing pre-show hangs in each city. join the conversation in the feed.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["berlin crew (12)", "london crew (23)", "hamburg crew (8)"].map((g) => (
                  <span key={g} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SAGE, border: `1px solid ${SAGE}33`, padding: "4px 10px", borderRadius: 2, cursor: "pointer" }}>{g}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAMPS */}
        {mainTab === "stamps" && (
          <div style={{ animation: "fadeIn 0.3s ease-out", paddingTop: 14 }}>
            <div style={{ background: INK, borderRadius: 3, padding: "30px 22px", textAlign: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${RUST}15, transparent 70%)` }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: WARM_GOLD, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12, position: "relative" }}>your collection</div>
              <Heading size={56} color={CREAM} style={{ position: "relative" }}>{userStamps}</Heading>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: CREAM + "77", marginTop: 6, position: "relative" }}>stamps collected</div>
              <div style={{ marginTop: 18, background: CREAM + "15", borderRadius: 2, height: 4, overflow: "hidden", position: "relative" }}>
                <div style={{ width: `${(userStamps / 150) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${RUST}, ${WARM_GOLD})`, borderRadius: 2, transition: "width 0.8s ease" }} />
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: CREAM + "55", marginTop: 6, position: "relative" }}>{150 - userStamps} stamps to Deep Cut ●</div>
            </div>

            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>levels</div>
            {STAMP_LEVELS.map((level, i) => (
              <div key={level.name} style={{
                background: OFF_WHITE, borderRadius: 3, padding: "14px 18px", marginBottom: 6,
                border: `1px solid ${level.unlocked ? WARM_GOLD + "33" : "#E8E2D8"}`,
                display: "flex", alignItems: "center", gap: 14, opacity: level.unlocked ? 1 : 0.5,
                animation: `fadeIn 0.35s ease-out ${i * 0.05}s both`,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 3, background: level.unlocked ? INK : DARK_CREAM, color: level.unlocked ? WARM_GOLD : SLATE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontFamily: "'DM Mono', monospace" }}>{level.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{level.name}</div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE }}>{level.desc}</div>
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: level.unlocked ? WARM_GOLD : SLATE }}>{level.stamps > 0 ? `${level.stamps} ✦` : "✓"}</div>
              </div>
            ))}

            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 18, marginBottom: 10 }}>earn stamps</div>
            <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "16px 18px", border: "1px solid #E8E2D8", marginBottom: 18 }}>
              {[
                { action: "post in the community", amount: "+5", icon: "↗" },
                { action: "reply to someone", amount: "+2", icon: "↩" },
                { action: "attend a show", amount: "+50", icon: "♫" },
                { action: "bring a friend", amount: "+25", icon: "⊕" },
                { action: "daily check-in streak", amount: "+3/day", icon: "◆" },
                { action: "share a playlist", amount: "+10", icon: "≡" },
              ].map((item, i) => (
                <div key={item.action} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < 5 ? `1px solid ${DARK_CREAM}` : "none" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: SLATE, width: 20, textAlign: "center" }}>{item.icon}</span>
                  <span style={{ flex: 1, fontSize: 12, color: INK + "CC" }}>{item.action}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, color: RUST }}>{item.amount}</span>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>top collectors</div>
            <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "12px 18px", border: "1px solid #E8E2D8" }}>
              {[
                { name: "fremantle.kid", stamps: 420 },
                { name: "wavesandwonder", stamps: 385 },
                { name: "bitterplaceclub", stamps: 310 },
                { name: "melodyintransit", stamps: 245 },
                { name: "slowburnsunday", stamps: 198 },
              ].map((user, i) => (
                <div key={user.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? `1px solid ${DARK_CREAM}` : "none" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: i === 0 ? WARM_GOLD : SLATE, width: 20, textAlign: "center" }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: INK }}>{user.name}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: SLATE }}>{user.stamps} ✦</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YOU */}
        {mainTab === "you" && (
          <div style={{ animation: "fadeIn 0.3s ease-out", paddingTop: 14 }}>
            <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "28px 22px", textAlign: "center", border: "1px solid #E8E2D8", marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 3, background: DARK_CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontFamily: "'DM Mono', monospace", margin: "0 auto 14px", color: SLATE }}>○</div>
              <Heading size={22}>newstamp</Heading>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE, marginTop: 4 }}>member since march 2026 · b-side level</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 22 }}>
                {[{ label: "posts", value: "12" }, { label: "stamps", value: "87" }, { label: "shows", value: "0" }].map((s) => (
                  <div key={s.label}>
                    <Heading size={24}>{s.value}</Heading>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: OFF_WHITE, borderRadius: 3, border: "1px solid #E8E2D8", overflow: "hidden" }}>
              {[
                { label: "edit profile", icon: "✎" }, { label: "notifications", icon: "◈" },
                { label: "linked streaming", icon: "♫" }, { label: "merch orders", icon: "◻" },
                { label: "invite a friend", icon: "⊕" }, { label: "help & feedback", icon: "?" },
              ].map((item, i) => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                  borderBottom: i < 5 ? `1px solid ${DARK_CREAM}` : "none", cursor: "pointer", transition: "background 0.15s ease",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = CREAM)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: SLATE, width: 24, textAlign: "center" }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: INK, flex: 1 }}>{item.label}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", color: SLATE + "55", fontSize: 14 }}>→</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: OFF_WHITE + "F0", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderTop: `1px solid ${DARK_CREAM}` }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", justifyContent: "space-around", padding: "6px 0 22px" }}>
          {mainTabs.map((tab) => (
            <button key={tab.id} onClick={() => setMainTab(tab.id)} style={{
              background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 18px",
            }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color: mainTab === tab.id ? INK : SLATE + "66", transition: "color 0.2s ease" }}>{tab.icon}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: mainTab === tab.id ? 500 : 400, color: mainTab === tab.id ? INK : SLATE + "66", letterSpacing: "0.5px" }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
