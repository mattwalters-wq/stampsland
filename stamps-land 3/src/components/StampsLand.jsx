"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

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

const STAMP_LEVELS = [
  { name: "First Press", key: "first_press", stamps: 0, icon: "◐" },
  { name: "B-Side", key: "b_side", stamps: 50, icon: "◑" },
  { name: "Deep Cut", key: "deep_cut", stamps: 150, icon: "●" },
  { name: "Inner Sleeve", key: "inner_sleeve", stamps: 300, icon: "◉" },
  { name: "Stamped", key: "stamped", stamps: 500, icon: "✦" },
];

const Heading = ({ children, size = 24, color = INK, style = {} }) => (
  <div style={{
    fontFamily: "'CooperBT', 'Cooper Black', 'Rockwell Extra Bold', 'Georgia', serif",
    fontSize: size, color, fontWeight: 900, lineHeight: 1.1, ...style,
  }}>{children}</div>
);

function timeAgo(dateStr) {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function PostCard({ post, currentUserId, supabase, onLikeToggle }) {
  const [liked, setLiked] = useState(post.user_has_liked || false);
  const [likeCount, setLikeCount] = useState(post.like_count || 0);
  const isBand = post.profiles?.role === "band";
  const isAdmin = post.profiles?.role === "admin";
  const isEx = post.is_exclusive;

  const displayName = post.profiles?.display_name || "unknown";
  const avatar = isBand && post.profiles?.band_member
    ? MEMBERS[post.profiles.band_member]?.emoji || "✦"
    : isAdmin ? "✦" : displayName.charAt(0).toLowerCase();

  const handleLike = async () => {
    if (!currentUserId) return;
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeCount((c) => c + (newLiked ? 1 : -1));

    if (newLiked) {
      await supabase.from("post_likes").insert({ post_id: post.id, user_id: currentUserId });
      await supabase.from("posts").update({ like_count: likeCount + 1 }).eq("id", post.id);
    } else {
      await supabase.from("post_likes").delete().eq("post_id", post.id).eq("user_id", currentUserId);
      await supabase.from("posts").update({ like_count: Math.max(0, likeCount - 1) }).eq("id", post.id);
    }
  };

  return (
    <div style={{
      background: isEx ? DARK_CREAM : OFF_WHITE, borderRadius: 3, padding: "18px 20px", marginBottom: 10,
      border: `1px solid ${isEx ? WARM_GOLD + "44" : "#E8E2D8"}`, position: "relative",
      transition: "border-color 0.2s ease",
    }}>
      {isEx && <div style={{ position: "absolute", top: 12, right: 14, fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 500, color: WARM_GOLD, letterSpacing: "1.5px", textTransform: "uppercase" }}>✦ stamped only</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 3, background: (isBand || isAdmin) ? INK : DUSTY_ROSE + "33",
          color: (isBand || isAdmin) ? CREAM : SLATE, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: (isBand || isAdmin) ? 14 : 13, fontFamily: "'DM Mono', monospace", fontWeight: 600, textTransform: "uppercase",
        }}>{avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, color: INK }}>
              {isBand ? (post.profiles?.band_member ? MEMBERS[post.profiles.band_member]?.name?.toLowerCase() : "the stamps") : displayName}
            </span>
            {(isBand || isAdmin) && <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, fontWeight: 500, color: RUST, border: `1px solid ${RUST}55`, padding: "1px 6px", borderRadius: 2, letterSpacing: "0.8px", textTransform: "uppercase" }}>{isBand ? "band" : "admin"}</span>}
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE + "99" }}>{timeAgo(post.created_at)}</span>
        </div>
      </div>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.65, color: INK + "DD", margin: "0 0 14px 0" }}>{post.content}</p>
      {isEx && (
        <div style={{ background: `repeating-linear-gradient(45deg, ${WARM_GOLD}08, ${WARM_GOLD}08 10px, transparent 10px, transparent 20px)`, border: `1px dashed ${WARM_GOLD}44`, borderRadius: 3, padding: "24px 16px", textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 24, marginBottom: 6, color: WARM_GOLD }}>✦</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>Stamped Content</div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE, marginTop: 4 }}>reach 500 stamps to unlock</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Mono', monospace", fontSize: 12, color: liked ? RUST : SLATE + "88", fontWeight: liked ? 600 : 400, padding: 0 }}>
          <span style={{ fontSize: 14 }}>{liked ? "♥" : "♡"}</span> {likeCount}
        </button>
        <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "'DM Mono', monospace", fontSize: 12, color: SLATE + "88", padding: 0 }}>↩ {post.comment_count || 0}</button>
        <button style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 12, color: SLATE + "88", padding: 0, marginLeft: "auto" }}>↗</button>
      </div>
    </div>
  );
}

function MemberHeader({ member }) {
  const m = MEMBERS[member];
  return (
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
  );
}

export default function StampsLand() {
  const { user, profile, signOut, supabase, refreshProfile } = useAuth();
  const [mainTab, setMainTab] = useState("feed");
  const [feedView, setFeedView] = useState("community");
  const [showWelcome, setShowWelcome] = useState(true);
  const [posts, setPosts] = useState([]);
  const [shows, setShows] = useState({});
  const [stampActions, setStampActions] = useState([]);
  const [stampTransactions, setStampTransactions] = useState([]);
  const [topCollectors, setTopCollectors] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [posting, setPosting] = useState(false);
  const [expandedRegion, setExpandedRegion] = useState("europe");
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchPosts = useCallback(async (feed = feedView) => {
    setLoadingPosts(true);
    const feedType = feed === "community" ? "community" : feed;

    let query = supabase
      .from("posts")
      .select("*, profiles(display_name, role, band_member, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(30);

    if (feed === "community") {
      query = query.eq("feed_type", "community");
    } else if (["sofia", "scarlett", "rubina"].includes(feed)) {
      query = query.eq("feed_type", feed);
    }

    const { data } = await query;

    if (data && user) {
      const { data: likes } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("user_id", user.id);

      const likedPostIds = new Set((likes || []).map((l) => l.post_id));
      const postsWithLikes = data.map((p) => ({
        ...p,
        user_has_liked: likedPostIds.has(p.id),
      }));
      setPosts(postsWithLikes);
    } else {
      setPosts(data || []);
    }
    setLoadingPosts(false);
  }, [feedView, user, supabase]);

  const fetchShows = useCallback(async () => {
    const { data } = await supabase
      .from("shows")
      .select("*")
      .order("date");

    if (data) {
      const grouped = {};
      data.forEach((show) => {
        const region = show.region || "other";
        if (!grouped[region]) grouped[region] = [];
        grouped[region].push(show);
      });
      setShows(grouped);
    }
  }, [supabase]);

  const fetchStampData = useCallback(async () => {
    const { data: actions } = await supabase
      .from("stamp_actions")
      .select("*")
      .eq("is_active", true)
      .order("points");

    if (actions) setStampActions(actions);

    if (user) {
      const { data: transactions } = await supabase
        .from("stamp_transactions")
        .select("*, stamp_actions(name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20);

      if (transactions) setStampTransactions(transactions);
    }

    const { data: topUsers } = await supabase
      .from("profiles")
      .select("display_name, stamp_count")
      .order("stamp_count", { ascending: false })
      .limit(5);

    if (topUsers) setTopCollectors(topUsers);
  }, [user, supabase]);

  useEffect(() => {
    fetchPosts();
  }, [feedView]);

  useEffect(() => {
    if (mainTab === "shows") fetchShows();
    if (mainTab === "stamps") fetchStampData();
    if (mainTab === "you") refreshProfile();
  }, [mainTab]);

  const handlePost = async () => {
    if (!newPost.trim() || posting) return;
    setPosting(true);

    const feedType = feedView === "community" ? "community" : feedView;
    const canPostToMemberFeed = profile?.role === "band" && profile?.band_member === feedView;
    const canPostToAnyFeed = profile?.role === "admin";

    const actualFeedType = feedView === "community" || canPostToMemberFeed || canPostToAnyFeed
      ? feedType : "community";

    const { error } = await supabase.from("posts").insert({
      author_id: user.id,
      content: newPost.trim(),
      feed_type: actualFeedType,
    });

    if (!error) {
      setNewPost("");
      // Award stamps for posting
      await supabase.rpc("award_stamps", {
        target_user_id: user.id,
        action_trigger_key: "post_created",
      });
      await refreshProfile();
      await fetchPosts();
    }
    setPosting(false);
  };

  const formatShowDate = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
  };

  const userStamps = profile?.stamp_count || 0;
  const currentLevel = STAMP_LEVELS.slice().reverse().find((l) => userStamps >= l.stamps) || STAMP_LEVELS[0];
  const nextLevel = STAMP_LEVELS.find((l) => l.stamps > userStamps);

  const mainTabs = [
    { id: "feed", label: "feed", icon: "◎" },
    { id: "shows", label: "shows", icon: "♫" },
    { id: "stamps", label: "stamps", icon: "✦" },
    { id: "you", label: "you", icon: "○" },
  ];

  const REGION_ORDER = ["australia", "europe", "uk", "north_america"];

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
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: CREAM + "EE", backdropFilter: "blur(16px)", borderBottom: `1px solid ${DARK_CREAM}` }}>
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
            <Heading size={28} color={CREAM} style={{ marginBottom: 10, lineHeight: 1.15 }}>welcome to{"\n"}stamps land</Heading>
            <p style={{ fontSize: 13, color: CREAM + "BB", lineHeight: 1.6, marginBottom: 16 }}>
              you're in. this is where sofia, scarlett and rubina share what they're making, thinking and feeling - and where fans connect with each other. earn stamps by being here.
            </p>
            <button onClick={() => setShowWelcome(false)} style={{ background: CREAM, color: INK, border: "none", borderRadius: 2, padding: "10px 20px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>start exploring</button>
          </div>
        )}

        {/* FEED TAB */}
        {mainTab === "feed" && (
          <div style={{ animation: "fadeIn 0.3s ease-out" }}>
            {/* Feed selector */}
            <div style={{ display: "flex", borderBottom: `1px solid ${DARK_CREAM}`, marginTop: 10, marginBottom: 14, background: OFF_WHITE, borderRadius: "3px 3px 0 0" }}>
              <button onClick={() => setFeedView("community")} style={{
                flex: 1, padding: "12px 6px 10px", background: feedView === "community" ? OFF_WHITE : "transparent",
                border: "none", borderBottom: feedView === "community" ? `2.5px solid ${INK}` : "2.5px solid transparent",
                cursor: "pointer", fontSize: 11, fontWeight: feedView === "community" ? 700 : 500,
                color: feedView === "community" ? INK : SLATE, display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              }}><span style={{ fontSize: 16 }}>◎</span>everyone</button>
              {Object.keys(MEMBERS).map((key) => {
                const m = MEMBERS[key];
                const isActive = feedView === key;
                return (
                  <button key={key} onClick={() => setFeedView(key)} style={{
                    flex: 1, padding: "12px 6px 10px", background: isActive ? m.color.bg : "transparent",
                    border: "none", borderBottom: isActive ? `2.5px solid ${m.color.primary}` : "2.5px solid transparent",
                    cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                  }}>
                    <span style={{ fontSize: 16 }}>{m.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: isActive ? 700 : 500, color: isActive ? m.color.primary : SLATE }}>{m.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Member header */}
            {feedView !== "community" && <MemberHeader member={feedView} />}

            {/* Compose */}
            <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "14px 16px", marginBottom: 12, border: "1px solid #E8E2D8", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 2, background: DUSTY_ROSE + "33", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontFamily: "'DM Mono', monospace", color: SLATE }}>
                {profile?.display_name?.charAt(0)?.toLowerCase() || "○"}
              </div>
              <input type="text" placeholder="say something..." value={newPost} onChange={(e) => setNewPost(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePost()}
                style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: INK, background: "transparent" }} />
              <button onClick={handlePost} disabled={posting || !newPost.trim()} style={{
                background: newPost.trim() ? INK : DARK_CREAM, border: "none", borderRadius: 2,
                padding: "7px 14px", fontSize: 11, fontWeight: 600, color: newPost.trim() ? CREAM : SLATE + "66",
                cursor: newPost.trim() ? "pointer" : "default", transition: "all 0.2s ease",
              }}>{posting ? "..." : "post"}</button>
            </div>

            {/* Posts */}
            {loadingPosts ? (
              <div style={{ textAlign: "center", padding: 40, fontFamily: "'DM Mono', monospace", fontSize: 12, color: SLATE }}>loading...</div>
            ) : posts.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, fontFamily: "'DM Mono', monospace", fontSize: 12, color: SLATE }}>
                no posts yet. be the first ✦
              </div>
            ) : (
              posts.map((post, i) => (
                <div key={post.id} style={{ animation: `fadeIn 0.35s ease-out ${i * 0.04}s both` }}>
                  <PostCard post={post} currentUserId={user?.id} supabase={supabase} />
                </div>
              ))
            )}
          </div>
        )}

        {/* SHOWS TAB */}
        {mainTab === "shows" && (
          <div style={{ animation: "fadeIn 0.3s ease-out", paddingTop: 14 }}>
            <div style={{ background: INK, borderRadius: 3, padding: "28px 22px", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 30%, rgba(196,93,62,0.15), transparent 60%)" }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: WARM_GOLD, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10, position: "relative" }}>on the road · 2026</div>
              <Heading size={34} color={CREAM} style={{ position: "relative" }}>the stamps</Heading>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: CREAM + "88", marginTop: 6, position: "relative", letterSpacing: "1px" }}>AU · EU · UK</div>
            </div>

            {REGION_ORDER.filter((r) => shows[r]).map((region) => (
              <div key={region} style={{ marginBottom: 10 }}>
                <button onClick={() => setExpandedRegion(expandedRegion === region ? null : region)} style={{
                  width: "100%", background: expandedRegion === region ? INK : OFF_WHITE,
                  border: expandedRegion === region ? "none" : "1px solid #E8E2D8",
                  borderRadius: expandedRegion === region ? "3px 3px 0 0" : 3,
                  padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
                }}>
                  <Heading size={16} color={expandedRegion === region ? CREAM : INK}>{region}</Heading>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: expandedRegion === region ? CREAM + "66" : SLATE }}>
                    {shows[region].length} shows {expandedRegion === region ? "−" : "+"}
                  </span>
                </button>
                {expandedRegion === region && (
                  <div style={{ background: OFF_WHITE, border: "1px solid #E8E2D8", borderTop: "none", borderRadius: "0 0 3px 3px" }}>
                    {shows[region].map((show, i) => {
                      const sold = show.status === "sold_out";
                      return (
                        <div key={show.id} style={{
                          padding: "13px 18px", display: "flex", alignItems: "center", gap: 14,
                          borderBottom: i < shows[region].length - 1 ? `1px solid ${DARK_CREAM}` : "none",
                          opacity: sold ? 0.4 : 1, animation: `fadeIn 0.25s ease-out ${i * 0.03}s both`,
                        }}>
                          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: SLATE, minWidth: 52 }}>{formatShowDate(show.date)}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>
                              {show.city}{show.country && !["AU", "UK"].includes(show.country) && <span style={{ color: SLATE, fontWeight: 400 }}> {show.country}</span>}
                            </div>
                            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE + "AA" }}>{show.venue}</div>
                          </div>
                          {sold ? (
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: RUST, letterSpacing: "0.8px", textTransform: "uppercase" }}>sold out</span>
                          ) : show.ticket_url ? (
                            <a href={show.ticket_url} target="_blank" rel="noopener noreferrer" style={{ background: INK, color: CREAM, border: "none", borderRadius: 2, padding: "6px 12px", fontSize: 10, fontWeight: 600, textDecoration: "none" }}>tickets</a>
                          ) : (
                            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SAGE, letterSpacing: "0.8px", textTransform: "uppercase" }}>on sale</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* STAMPS TAB */}
        {mainTab === "stamps" && (
          <div style={{ animation: "fadeIn 0.3s ease-out", paddingTop: 14 }}>
            {/* Your count */}
            <div style={{ background: INK, borderRadius: 3, padding: "30px 22px", textAlign: "center", marginBottom: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${RUST}15, transparent 70%)` }} />
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: WARM_GOLD, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 12, position: "relative" }}>your collection</div>
              <Heading size={56} color={CREAM} style={{ position: "relative" }}>{userStamps}</Heading>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: CREAM + "77", marginTop: 6, position: "relative" }}>stamps collected · {currentLevel.name}</div>
              {nextLevel && (
                <>
                  <div style={{ marginTop: 18, background: CREAM + "15", borderRadius: 2, height: 4, overflow: "hidden", position: "relative" }}>
                    <div style={{ width: `${(userStamps / nextLevel.stamps) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${RUST}, ${WARM_GOLD})`, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: CREAM + "55", marginTop: 6, position: "relative" }}>{nextLevel.stamps - userStamps} stamps to {nextLevel.name} {nextLevel.icon}</div>
                </>
              )}
            </div>

            {/* Levels */}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>levels</div>
            {STAMP_LEVELS.map((level, i) => {
              const unlocked = userStamps >= level.stamps;
              return (
                <div key={level.name} style={{
                  background: OFF_WHITE, borderRadius: 3, padding: "14px 18px", marginBottom: 6,
                  border: `1px solid ${unlocked ? WARM_GOLD + "33" : "#E8E2D8"}`, display: "flex", alignItems: "center", gap: 14,
                  opacity: unlocked ? 1 : 0.5,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 3, background: unlocked ? INK : DARK_CREAM, color: unlocked ? WARM_GOLD : SLATE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontFamily: "'DM Mono', monospace" }}>{level.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{level.name}</div>
                  </div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: unlocked ? WARM_GOLD : SLATE }}>{level.stamps > 0 ? `${level.stamps} ✦` : "✓"}</div>
                </div>
              );
            })}

            {/* Earn stamps */}
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 18, marginBottom: 10 }}>earn stamps</div>
            <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "16px 18px", border: "1px solid #E8E2D8", marginBottom: 18 }}>
              {stampActions.map((action, i) => (
                <div key={action.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: i < stampActions.length - 1 ? `1px solid ${DARK_CREAM}` : "none" }}>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, color: SLATE, width: 20, textAlign: "center" }}>{action.action_type === "auto" ? "↗" : "★"}</span>
                  <span style={{ flex: 1, fontSize: 12, color: INK + "CC" }}>{action.name}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, color: RUST }}>+{action.points}</span>
                </div>
              ))}
            </div>

            {/* Top collectors */}
            {topCollectors.length > 0 && (
              <>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>top collectors</div>
                <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "12px 18px", border: "1px solid #E8E2D8" }}>
                  {topCollectors.map((u, i) => (
                    <div key={u.display_name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < topCollectors.length - 1 ? `1px solid ${DARK_CREAM}` : "none" }}>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: i === 0 ? WARM_GOLD : SLATE, width: 20, textAlign: "center" }}>{i + 1}</span>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: INK }}>{u.display_name}</span>
                      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: SLATE }}>{u.stamp_count} ✦</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* YOU TAB */}
        {mainTab === "you" && profile && (
          <div style={{ animation: "fadeIn 0.3s ease-out", paddingTop: 14 }}>
            <div style={{ background: OFF_WHITE, borderRadius: 3, padding: "28px 22px", textAlign: "center", border: "1px solid #E8E2D8", marginBottom: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 3, background: DARK_CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontFamily: "'DM Mono', monospace", margin: "0 auto 14px", color: SLATE }}>
                {profile.display_name?.charAt(0)?.toLowerCase() || "○"}
              </div>
              <Heading size={22}>{profile.display_name}</Heading>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: SLATE, marginTop: 4 }}>
                {currentLevel.name.toLowerCase()} · {userStamps} stamps
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 22 }}>
                {[
                  { label: "stamps", value: userStamps },
                  { label: "shows", value: profile.show_count || 0 },
                ].map((s) => (
                  <div key={s.label}>
                    <Heading size={24}>{s.value}</Heading>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: SLATE, letterSpacing: 1, textTransform: "uppercase" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: OFF_WHITE, borderRadius: 3, border: "1px solid #E8E2D8", overflow: "hidden" }}>
              {[
                { label: "edit profile", icon: "✎", action: null },
                { label: "notifications", icon: "◈", action: null },
                { label: "invite a friend", icon: "⊕", action: null },
                { label: "help & feedback", icon: "?", action: null },
              ].map((item, i) => (
                <div key={item.label} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                  borderBottom: `1px solid ${DARK_CREAM}`, cursor: "pointer",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = CREAM)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: SLATE, width: 24, textAlign: "center" }}>{item.icon}</span>
                  <span style={{ fontSize: 13, color: INK, flex: 1 }}>{item.label}</span>
                  <span style={{ fontFamily: "'DM Mono', monospace", color: SLATE + "55", fontSize: 14 }}>→</span>
                </div>
              ))}
              {/* Sign out */}
              <div onClick={signOut} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", cursor: "pointer",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.background = CREAM)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 15, color: RUST, width: 24, textAlign: "center" }}>↪</span>
                <span style={{ fontSize: 13, color: RUST, flex: 1 }}>sign out</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM NAV */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, background: OFF_WHITE + "F0", backdropFilter: "blur(16px)", borderTop: `1px solid ${DARK_CREAM}` }}>
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", justifyContent: "space-around", padding: "6px 0 22px" }}>
          {mainTabs.map((tab) => (
            <button key={tab.id} onClick={() => setMainTab(tab.id)} style={{
              background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 18px",
            }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color: mainTab === tab.id ? INK : SLATE + "66" }}>{tab.icon}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: mainTab === tab.id ? 500 : 400, color: mainTab === tab.id ? INK : SLATE + "66" }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
