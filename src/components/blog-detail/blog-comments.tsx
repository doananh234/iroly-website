/**
 * Comments preview section — 3 hardcoded comments matching prototype lines 851-867.
 */

const COMMENTS = [
  { color: "#C2E0FF", initials: "RK", name: "Rena K.",  when: "2 days ago",  text: "The dashed border story made my whole day. So many \"iconic\" details are accidents." },
  { color: "#FCE7F3", initials: "TS", name: "Tomo S.",  when: "1 day ago",   text: "Bought Tiny Friends after reading this. The fox on page 7 is unreasonably good." },
  { color: "#DDF4D2", initials: "AB", name: "Alex B.",  when: "5 hours ago", text: "Please do one of these for the Mandala Series next." },
];

interface BlogCommentsProps {
  title: string;
}

export function BlogComments({ title }: BlogCommentsProps) {
  return (
    <section className="mx-auto max-w-[760px] px-4 pb-16 sm:px-6 md:px-8">
      <h3
        style={{ fontSize: 24, fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.01em", margin: "0 0 20px" }}
      >
        {title}
      </h3>
      <div className="flex flex-col gap-4">
        {COMMENTS.map(({ color, initials, name, when, text }) => (
          <div
            key={initials}
            className="grid gap-3.5 rounded-2xl px-5 py-[18px]"
            style={{ gridTemplateColumns: "auto 1fr", background: "#F5F2EA" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full font-black text-[#0D1801]"
              style={{ background: color, fontFamily: "var(--font-display)" }}
            >
              {initials}
            </div>
            <div>
              <div className="flex items-baseline gap-2.5">
                <span style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-display)" }}>{name}</span>
                <span className="text-[12px] text-[#666]">{when}</span>
              </div>
              <p className="mt-1 text-[14px] leading-[1.5] text-[#3a3a3a]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
