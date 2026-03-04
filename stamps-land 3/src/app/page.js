"use client";
import { useAuth } from "@/lib/auth-context";
import LandingPage from "@/components/LandingPage";
import StampsLand from "@/components/StampsLand";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#F5F0E8", display: "flex",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 14, color: "#5A5A6E",
          animation: "fadeIn 0.5s ease-out",
        }}>
          ✦
        </div>
      </div>
    );
  }

  if (!user) {
    return <LandingPage />;
  }

  return <StampsLand />;
}
