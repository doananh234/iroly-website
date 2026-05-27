/**
 * Public profile page — /community/[profileId]
 * Server component wrapper. Matches prototype PageProfile (lines 2033-2262).
 */
import type { Metadata } from "next";
import { ProfileCoverActions, ProfileFollowActions } from "@/components/profile/profile-header-actions";
import { ProfilePageClient } from "@/components/profile/profile-page-client";

interface ProfilePageProps {
  params: Promise<{ locale: string; profileId: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { locale, profileId } = await params;
  const title = `${profileId} — iRoly Community`;
  const description = `View ${profileId}'s coloring artwork and profile on iRoly Community.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/community/${profileId}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: "/assets/logos/app-icon.png", width: 512, height: 512 }],
      type: "website",
      siteName: "iRoly",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CommunityProfilePage({ params }: ProfilePageProps) {
  await params;

  return (
    <div style={{ fontFamily: "var(--font-sans)", color: "var(--iroly-fg)", background: "var(--iroly-bg)" }}>
      {/* COVER */}
      <section
        className="relative h-[160px] overflow-hidden sm:h-[190px] md:h-[220px]"
        style={{
          background: "linear-gradient(135deg, #BFFF00 0%, #E8FF99 50%, #FFE8C2 100%)",
        }}
      >
        <div className="absolute inset-0" style={{ opacity: 0.15 }}>
          <svg viewBox="0 0 1440 220" width="100%" height="100%" preserveAspectRatio="none">
            <g fill="none" stroke="#0D1801" strokeWidth="1.5">
              {Array.from({ length: 20 }).map((_, i) => (
                <circle key={i} cx={i * 80} cy={i % 2 ? 40 : 160} r={i % 3 ? 20 : 35} />
              ))}
            </g>
          </svg>
        </div>
        <ProfileCoverActions shareProfileLabel="Share profile" />
      </section>

      {/* HEADER */}
      <header className="relative mx-auto max-w-[1320px] px-4 sm:px-6 md:px-8">
        {/* ── Mobile layout: stacked (avatar centered above name) ── */}
        <div className="md:hidden">
          {/* Avatar — centered, overlaps cover */}
          <div className="flex justify-center" style={{ marginTop: -48 }}>
            <div
              className="flex items-center justify-center rounded-full border-4 border-[var(--iroly-bg)] text-[40px] font-black text-[#0D1801]"
              style={{
                width: 96,
                height: 96,
                background: "#FFB68A",
                fontFamily: "var(--font-display)",
              }}
            >
              MY
            </div>
          </div>
          {/* Name + badge */}
          <div className="mt-3 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <h1
                className="m-0 text-[24px]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.02em" }}
              >
                Mei Yoshida
              </h1>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[.04em]"
                style={{ background: "#0D1801", color: "#BFFF00" }}
              >
                ◆ Founder
              </span>
            </div>
            <div className="mt-1 text-[13px]" style={{ color: "#666" }}>
              @meiyoshida · Tokyo, JP · Joined Mar 2024
            </div>
            <p className="mx-auto mt-3 max-w-[400px] text-[14px] leading-[1.5]" style={{ color: "#1d2a14" }}>
              I draw quiet animals and slow afternoons. Founder of iRoly. Spends an unreasonable amount of time on the ears of foxes.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <ProfileFollowActions followLabel="Follow" messageLabel="Message" />
            </div>
          </div>
        </div>

        {/* ── Desktop layout: avatar left, name right ── */}
        <div className="hidden md:block">
          {/* Avatar — overlaps cover */}
          <div
            className="absolute left-8 flex items-center justify-center rounded-full border-[6px] border-[var(--iroly-bg)] font-black text-[#0D1801]"
            style={{
              width: 144,
              height: 144,
              background: "#FFB68A",
              fontFamily: "var(--font-display)",
              fontSize: 56,
              top: -80,
            }}
          >
            MY
          </div>

          {/* Name row — padded left to clear avatar */}
          <div className="flex flex-wrap items-end justify-between gap-4 pl-[168px] pt-4">
            <div>
              <div className="flex items-center gap-2.5">
                <h1
                  className="m-0 text-[36px]"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.02em" }}
                >
                  Mei Yoshida
                </h1>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-[.04em]"
                  style={{ background: "#0D1801", color: "#BFFF00" }}
                >
                  ◆ Founder
                </span>
              </div>
              <div className="mt-0.5 text-[14px]" style={{ color: "#666" }}>
                @meiyoshida · Tokyo, JP · Joined Mar 2024
              </div>
            </div>
            <ProfileFollowActions followLabel="Follow" messageLabel="Message" />
          </div>

          {/* Bio */}
          <p className="mt-3 max-w-[580px] leading-[1.5]" style={{ fontSize: 15, color: "#1d2a14" }}>
            I draw quiet animals and slow afternoons. Founder of iRoly. Spends an unreasonable amount of time on the ears of foxes.
          </p>
        </div>

        {/* STATS BAR — responsive grid */}
        <div
          className="mt-6 grid grid-cols-3 gap-2 rounded-[18px] border border-[var(--iroly-border)] bg-[var(--iroly-card)] p-3 sm:gap-3 sm:p-4 md:mt-7 md:grid-cols-5 md:gap-2.5 md:p-[18px_20px]"
        >
          {[
            ["142", "Artworks"],
            ["12", "Books owned"],
            ["28", "Collections"],
            ["4.2K", "Followers"],
            ["89", "Following"],
          ].map(([n, l], i) => (
            <div
              key={l}
              className="text-center md:border-r md:border-[var(--iroly-border)] md:last:border-r-0"
            >
              <div
                className="text-[20px] sm:text-[24px]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 900, letterSpacing: "-.01em" }}
              >
                {n}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[.04em] text-[#666] sm:text-[11px]">
                {l}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* TABS + CONTENT + SIDEBAR (client) */}
      <ProfilePageClient />
    </div>
  );
}
