"use client";
import { useState } from "react";

export default function StampsLand() {
  return <div>Loading...</div>;
}"use client";
import { useState } from "react";

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
  rubina: { name: "Rubina", role: "The Daydreamer", emoji: "🌿", tagline: "pluto in aquarius & i'm feeling it", color: MEMBER_COLORS.rubina },
};

const COMMUNITY_POSTS = [
  { id: 1, author: "the stamps", avatar: "✦", badge: "band", content: "studio day 47. we wrote something at 2am that made all three of us cry. that's usually a good sign.", likes: 1203, comments: 287, time: "3h ago" },
  { id: 2, author: "wavesandwonder", avatar: "w", badge: null, content: "just played 'holy verse' for my mum and she cried. these songs hit different when you share them.", likes: 89, comments: 23, time: "5h ago" },
  { id: 3, author: "the stamps", avatar: "✦", badge: "band", content: "STAMPED EXCLUSIVE: voice memo from the studio.", likes: 847, comments: 134, time: "1d ago", exclusive: true },
  { id: 4, author: "fremantle.kid", avatar: "f", badge: "og", content: "been following since the nannup days. seeing them at the retreat was one of the best nights of my life.", likes: 156, comments: 41, time: "1d ago" },
  { id: 5, author: "melodyintransit", avatar: "m", badge: null, content: "anyone going to the london show at LVLS in june?", likes: 67, comments: 52, time: "2d ago" },
];

const MEMBER_POSTS = {
  sofia: [
    { id: "s1", content: "been listening to lizzy mcalpine and the paper kites. the way they let songs breathe.", time: "2h ago", likes: 234, comments: 45 },
    { id: "s2", content: "journal pages from the writing session. the best lyrics start as absolute nonsense at 1am.", time: "1d ago", likes: 567, comments: 89, exclusive: true },
    { id: "s3", content: "i don't understand what i'm feeling until i write it down. the song tells me what i meant.", time: "3d ago", likes: 891, comments: 132 },
  ],
  scarlett: [
    { id: "sc1", content: "found a tiny venue in fitzroy with incredible acoustics. we need to play there.", time: "4h ago", likes: 189, comments: 34 },
    { id: "sc2", content: "DEMO DROP: rough guitar loop i've been obsessing over.", time: "2d ago", likes: 445, comments: 167, exclusive: true },
    { id: "sc3", content: "joni mitchell's hejira changed everything for me.", time: "4d ago", likes: 623, comments: 78 },
  ],
  rubina: [
    { id: "r1", content: "pluto's fully in aquarius now. everything is shifting. 2026 is the year of the stamp.", time: "6h ago", likes: 312, comments: 67 },
    { id: "r2", content: "PLAYLIST: rubina's sunday slow burn - updated weekly.", time: "1d ago", likes: 534, comments: 45 },
    { id: "r3", content: "being three people in a band means you're never alone with a feeling. that's the magic.", time: "5d ago", likes: 789, comments: 156 },
  ],
};

const TOUR_SECTIONS = [
  { region: "australia", dates: [
    { date: "12 Mar", city: "Brisbane", venue: "Black Bear Lodge", status: "sold out" },
    { date: "13 Mar", city: "Sydney", venue: "The Eveleigh", status: "sold out" },
    { date: "14 Mar", city: "Melbourne", venue: "Bergy Bandroom", status: "sold out" },
  ]},
  { region: "europe", dates: [
    { date: "15 May", city: "Saarbrucken", venue: "Terminus", country: "DE", status: "on sale" },
    { date: "31 May", city: "Berlin", venue: "Zimmer 16", country: "DE", status: "on sale" },
    { date: "1 Jun", city: "Hamburg", venue: "Knust Bar", country: "DE", status: "on sale" },
  ]},
  { region: "uk", dates: [
    { date: "3 Jun", city: "Leeds", venue: "Northern Guitars Cafe Bar", status: "on sale" },
    { date: "4 Jun", city: "Manchester", venue: "Gullivers", status: "on sale" },
    { date: "6 Jun", city: "London", venue: "LVLS", status: "on sale" },
    { date: "7 Jun", city: "Brighton", venue: "The Brunswick", status: "on sale" },
  ]},
];

const STAMP_LEVELS = [
  { name: "First Press", desc: "Join the community", stamps: 0, unlocked: true, icon: "◐" },
  { name: "B-Side", desc: "10 posts or comments", stamps: 50, unlocked: true, icon: "◑" },
  { name: "Deep Cut", desc: "Attend a live show", stamps: 150, unlocked: false, icon: "●" },
  { name: "Inner Sleeve", desc: "6 months active", stamps: 300, unlocked: false, icon: "◉" },
  { name: "Stamped", desc: "Unlock everything", stamps: 500, unlocked: false, icon: "✦" },
];

const Heading = ({ children, size = 24, color = INK, style = {} }) => (
  <div style={{ fontFamily: "serif", fontSize: size, color, fontWeight: 900, lineHeight: 1.1, ...style }}>{children}</div>
);

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const isBand = post.badge === "band";
  const isEx = post.exclusive;
  return (
    <div style={{ background: isEx ? DARK_CREAM : OFF_WHITE, borderRadius: 3, padding: "18px 20px", marginBottom: 10, border: `1px solid ${isEx ? WARM_GOLD + "44" : "#E8E2D8"}` }}>
      {isEx && <div style={{ fontSize: 9, color: WARM_GOLD, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 8 }}>✦ stamped only</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 3, background: isBand ? INK : DUSTY_ROSE + "33", color: isBand ? CREAM : SLATE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{post.avatar}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: INK }}>{post.author}</div>
          <div style={{ fontSize: 10, color: SLATE + "99" }}>{post.time}</div>
        </div>
      </div>
      <p style={{ fontSize: 13.5, lineHeight: 1.65, color: INK, margin: "0 0 14px 0" }}>{post.content}</p>
      <div style={{ display: "flex", gap: 18 }}>
        <button onClick={() => setLiked(!liked)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: liked ? RUST : SLATE, padding: 0 }}>
          {liked ? "♥" : "♡"} {post.likes + (liked ? 1 : 0)}
        </button>
        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: SLATE, padding: 0 }}>↩ {post.comments}</button>
      </div>
    </div>
  );
}

function MemberFeed({ member }) {
  const m = MEMBERS[member];
  const posts = MEMBER_POSTS[member];
  return (
    <div>
      <div style={{ background: m.color.bg, borderRadius: 3, padding: "22px 20px", marginBottom: 14, borderLeft: "3px solid " + m.color.primary }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 3, background: m.color.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{m.emoji}</div>
          <div>
            <Heading size={22}>{m.name}</Heading>
            <div style={{ fontSize: 10, color: m.color.primary, marginTop: 3 }}>{m.role}</div>
            <div style={{ fontSize: 12, color: SLATE, marginTop: 4, fontStyle: "italic" }}>"{m.tagline}"</div>
          </div>
        </div>
      </div>
      {posts.map(post => (
        <PostCard key={post.id} post={{ ...post, author: m.name.toLowerCase(), avatar: m.emoji, badge: "band" }} />
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
    <div style={{ minHeight: "100vh", background: CREAM }}>
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: CREAM + "EE", backdropFilter: "blur(16px)", borderBottom: "1px solid " + DARK_CREAM }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Heading size={24}>the stamps</Heading>
          <div style={{ fontSize: 12, background: DARK_CREAM, padding: "5px 12px", borderRadius: 2 }}>✦ {userStamps}</div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px 100px" }}>
        {showWelcome && mainTab === "feed" && (
          <div style={{ background: INK, borderRadius: 3, padding: "24px 22px", margin: "14px 0" }}>
            <button onClick={() => setShowWelcome(false)} style={{ float: "right", background: "none", border: "none", color: CREAM, cursor: "pointer", fontSize: 16 }}>×</button>
            <Heading size={28} color={CREAM} style={{ marginBottom: 10 }}>welcome to stamps land</Heading>
            <p style={{ fontSize: 13, color: CREAM + "BB", lineHeight: 1.6, marginBottom: 16 }}>
              you're in. earn stamps by being here. unlock exclusive demos, voice memos and early access.
            </p>
            <button style={{ background: CREAM, color: INK, border: "none", borderRadius: 2, padding: "10px 20px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>start exploring</button>
          </div>
        )}

        {mainTab === "feed" && (
          <div>
            <div style={{ display: "flex", borderBottom: "1px solid " + DARK_CREAM, marginTop: 10, marginBottom: 14 }}>
              <button onClick={() => setFeedView("community")} style={{ flex: 1, padding: "12px 6px 10px", background: "none", border: "none", borderBottom: feedView === "community" ? "2.5px solid " + INK : "2.5px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: feedView === "community" ? 700 : 500, color: feedView === "community" ? INK : SLATE }}>
                ◎ everyone
              </button>
              {Object.keys(MEMBERS).map(key => {
                const m = MEMBERS[key];
                return (
                  <button key={key} onClick={() => setFeedView(key)} style={{ flex: 1, padding: "12px 6px 10px", background: "none", border: "none", borderBottom: feedView === key ? "2.5px solid " + m.color.primary : "2.5px solid transparent", cursor: "pointer", fontSize: 11, fontWeight: feedView === key ? 700 : 500, color: feedView === key ? m.color.primary : SLATE }}>
                    {m.emoji} {m.name}
                  </button>
                );
              })}
            </div>
            {feedView === "community" ? (
              <div>
                <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "14px 16px", marginBottom: 12, border: "1px solid #E8E2D8", display: "flex", gap: 12 }}>
                  <input type="text" placeholder="say something..." value={newPost} onChange={e => setNewPost(e.target.value)} style={{ flex: 1, border: "none", outline: "none", fontSize: 13, background: "transparent" }} />
                  <button style={{ background: newPost ? INK : DARK_CREAM, border: "none", borderRadius: 2, padding: "7px 14px", fontSize: 11, color: newPost ? CREAM : SLATE, cursor: "pointer" }}>post</button>
                </div>
                {COMMUNITY_POSTS.map(post => <PostCard key={post.id} post={post} />)}
              </div>
            ) : (
              <MemberFeed member={feedView} />
            )}
          </div>
        )}

        {mainTab === "shows" && (
          <div style={{ paddingTop: 14 }}>
            <div style={{ background: INK, borderRadius: 3, padding: "28px 22px", marginBottom: 16 }}>
              <Heading size={34} color={CREAM}>the stamps</Heading>
              <div style={{ fontSize: 13, color: CREAM + "88", marginTop: 6 }}>AU · EU · UK</div>
            </div>
            {TOUR_SECTIONS.map(section => (
              <div key={section.region} style={{ marginBottom: 10 }}>
                <button onClick={() => setExpandedRegion(expandedRegion === section.region ? null : section.region)} style={{ width: "100%", background: expandedRegion === section.region ? INK : OFF_WHITE, border: "1px solid #E8E2D8", borderRadius: 3, padding: "14px 18px", display: "flex", justifyContent: "space-between", cursor: "pointer" }}>
                  <span style={{ fontWeight: 700, color: expandedRegion === section.region ? CREAM : INK }}>{section.region}</span>
                  <span style={{ fontSize: 11, color: expandedRegion === section.region ? CREAM + "66" : SLATE }}>{section.dates.length} shows {expandedRegion === section.region ? "−" : "+"}</span>
                </button>
                {expandedRegion === section.region && (
                  <div style={{ background: OFF_WHITE, border: "1px solid #E8E2D8", borderTop: "none", borderRadius: "0 0 3px 3px" }}>
                    {section.dates.map((show, i) => (
                      <div key={i} style={{ padding: "13px 18px", display: "flex", alignItems: "center", gap: 14, borderBottom: i < section.dates.length - 1 ? "1px solid " + DARK_CREAM : "none", opacity: show.status === "sold out" ? 0.4 : 1 }}>
                        <div style={{ fontSize: 11, color: SLATE, minWidth: 52 }}>{show.date}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{show.city}</div>
                          <div style={{ fontSize: 10, color: SLATE }}>{show.venue}</div>
                        </div>
                        {show.status === "sold out" ? (
                          <span style={{ fontSize: 9, color: RUST }}>sold out</span>
                        ) : (
                          <button style={{ background: INK, color: CREAM, border: "none", borderRadius: 2, padding: "6px 12px", fontSize: 10, cursor: "pointer" }}>tickets</button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {mainTab === "stamps" && (
          <div style={{ paddingTop: 14 }}>
            <div style={{ background: INK, borderRadius: 3, padding: "30px 22px", textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 56, fontWeight: 900, color: CREAM }}>{userStamps}</div>
              <div style={{ fontSize: 10, color: CREAM + "77", marginTop: 6 }}>stamps collected</div>
            </div>
            {STAMP_LEVELS.map((level, i) => (
              <div key={level.name} style={{ background: OFF_WHITE, borderRadius: 3, padding: "14px 18px", marginBottom: 6, border: "1px solid " + (level.unlocked ? WARM_GOLD + "33" : "#E8E2D8"), display: "flex", alignItems: "center", gap: 14, opacity: level.unlocked ? 1 : 0.5 }}>
                <div style={{ width: 36, height: 36, borderRadius: 3, background: level.unlocked ? INK : DARK_CREAM, color: level.unlocked ? WARM_GOLD : SLATE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{level.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{level.name}</div>
                  <div style={{ fontSize: 10, color: SLATE }}>{level.desc}</div>
                </div>
                <div style={{ fontSize: 11, color: level.unlocked ? WARM_GOLD : SLATE }}>{level.stamps > 0 ? level.stamps + " ✦" : "✓"}</div>
              </div>
            ))}
          </div>
        )}

        {mainTab === "you" && (
          <div style={{ paddingTop: 14 }}>
            <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "28px 22px", textAlign: "center", border: "1px solid #E8E2D8", marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 3, background: DARK_CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 14px", color: SLATE }}>○</div>
              <Heading size={22}>newstamp</Heading>
              <div style={{ fontSize: 10, color: SLATE, marginTop: 4 }}>member since march 2026 · b-side level</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 22 }}>
                {[{ label: "posts", value: "12" }, { label: "stamps", value: "87" }, { label: "shows", value: "0" }].map(s => (
                  <div key={s.label}>
                    <div style={{ fontSize: 24, fontWeight: 900 }}>{s.value}</div>
                    <div style={{ fontSize: 9, color: SLATE, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: OFF_WHITE + "F0", backdropFilter: "blur(16px)", borderTop: "1px solid " + DARK_CREAM }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", justifyContent: "space-around", padding: "6px 0 22px" }}>
          {mainTabs.map(tab => (
            <button key={tab.id} onClick={() => setMainTab(tab.id)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 18px" }}>
              <span style={{ fontSize: 18, color: mainTab === tab.id ? INK : SLATE + "66" }}>{tab.icon}</span>
              <span style={{ fontSize: 9, color: mainTab === tab.id ? INK : SLATE + "66" }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
