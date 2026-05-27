/**
 * Blog article body — long-form article content for the "How we draw a Tiny Friend" post.
 * Hardcoded to match prototype PageBlogDetail (lines 771-817).
 */

const PALETTE = [
  { name: "Cream", hex: "#FFE8C2" },
  { name: "Peach", hex: "#FFD79E" },
  { name: "Sage",  hex: "#A8B099" },
];

export function BlogArticleBody() {
  return (
    <article
      className="mx-auto max-w-[760px] px-4 pb-16 text-[16px] sm:px-6 sm:text-[18px] md:px-8"
      style={{ lineHeight: 1.7, color: "#1a2410" }}
    >
      <p>
        I start every book the same way — with a five-minute scribble on the back of a coffee receipt.
        The Tiny Friends sketch happened on a Tuesday afternoon in March, in a cafe near the studio.
        I was waiting for a meeting that ran late, and I drew a fox curled up on a tea cup.
      </p>
      <p>
        The cafe sketch is rarely the final composition. But it&apos;s almost always the{" "}
        <em>emotional brief</em> for the book: warm, sleepy, low-stakes.
      </p>

      <h2
        className="text-[#0D1801]"
        style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.02em", margin: "48px 0 16px" }}
      >
        Step 1 · The scribble pass
      </h2>
      <p>
        Before any digital tools come out, I do twenty pencil thumbnails on one sheet of A4.
        Each one is the size of a postage stamp. Most are bad. That&apos;s the point — bad thumbnails
        make the good ones obvious.
      </p>

      {/* Figure: 4 thumbnail placeholders */}
      <figure
        className="rounded-[20px] p-4 sm:p-6"
        style={{ margin: "36px 0", background: "#FFFAE5" }}
      >
        <div className="grid grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="flex aspect-square items-center justify-center rounded-xl bg-white p-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/coloring-pages/free-coloring-page.svg"
                alt=""
                style={{ width: "80%", opacity: 0.7 }}
              />
            </div>
          ))}
        </div>
        <figcaption className="mt-3 text-[12px] italic text-[#3a3a14]">
          Four of twenty initial thumbnails. The third one became the cover.
        </figcaption>
      </figure>

      <h2
        className="text-[#0D1801]"
        style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.02em", margin: "48px 0 16px" }}
      >
        Step 2 · The line test
      </h2>
      <p>
        Once I pick a thumbnail, I redraw it at full size in Procreate with a single-weight pencil brush.
        No shading, no color — just lines. This is the step where I find out if the composition{" "}
        <strong>actually breathes</strong>. A cute fox can still feel cramped if there&apos;s no air around it.
      </p>
      <p>
        For Tiny Friends I went through six line tests before I had the version that ended up on the cover.
        The fox&apos;s ears were the last thing to settle.
      </p>

      <blockquote
        style={{
          borderLeft: "4px solid #BFFF00", padding: "8px 0 8px 24px", margin: "40px 0",
          fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 700, color: "#0D1801",
          letterSpacing: "-.01em", lineHeight: 1.35,
        }}
      >
        &ldquo;A coloring page is mostly negative space. If you forget that, the whole book feels noisy.&rdquo;
      </blockquote>

      <h2
        className="text-[#0D1801]"
        style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.02em", margin: "48px 0 16px" }}
      >
        Step 3 · The dashed border
      </h2>
      <p>
        Every iRoly cover has a dashed border floating six pixels inside the frame. It&apos;s the one detail
        that ties the whole library together. People ask about it constantly. The honest answer is that I was
        prototyping the very first cover in 2024 and forgot to delete a guide layer. It looked right. We kept it.
      </p>

      <h2
        className="text-[#0D1801]"
        style={{ fontSize: 36, fontWeight: 900, fontFamily: "var(--font-display)", letterSpacing: "-.02em", margin: "48px 0 16px" }}
      >
        Step 4 · Color palette lock
      </h2>
      <p>
        I pick three palette options and walk them down the studio hallway. Whoever&apos;s around —
        Tora, Sara, the cat — picks one. The room votes more honestly than I would. For Tiny Friends,
        the cream/peach/sage combination won 4 to 1 (cat was abstaining).
      </p>

      <div className="my-6 grid grid-cols-3 gap-2.5">
        {PALETTE.map(({ name, hex }) => (
          <div
            key={name}
            className="rounded-2xl px-4 py-5 text-center"
            style={{ background: hex }}
          >
            <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "var(--font-display)", color: "#0D1801" }}>{name}</div>
            <div style={{ fontSize: 11, color: "#0D1801", opacity: 0.6, fontFamily: "monospace", marginTop: 2 }}>{hex}</div>
          </div>
        ))}
      </div>

      <p>
        The rest of the process — pages 1 through 12, the inside spread, the back cover, file handoff
        to Sara for app integration — takes about three weeks. Most of that is staring, not drawing.
      </p>

      <p
        className="mt-9 rounded-2xl px-6 py-5 text-base"
        style={{ background: "#F5F2EA" }}
      >
        Tiny Friends is available now — ¥9.9 in the app or as a printable PDF.{" "}
        <a href="/shop" style={{ color: "#0D1801", fontWeight: 700 }}>See the book →</a>
      </p>
    </article>
  );
}
