import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import PageHeader from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Every photograph used on TripNest, with its author, licence and source page on Wikimedia Commons.",
};

interface Credit {
  file: string;
  title: string | null;
  artist: string | null;
  license: string | null;
  licenseUrl: string | null;
  sourcePage: string | null;
  description: string | null;
}

export default function CreditsPage() {
  const raw = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "public", "image-credits.json"), "utf8"),
  ) as Record<string, Credit>;

  const entries = Object.entries(raw)
    .map(([slug, c]) => ({ slug, ...c }))
    .sort((a, b) => (a.artist ?? "").localeCompare(b.artist ?? ""));

  return (
    <>
      <PageHeader
        eyebrow="Attribution"
        title="Photo credits"
        description="TripNest uses photography from Wikimedia Commons under open licences. Each image below is listed with its author, licence and source. Images are resized for the web; no other edits beyond colour grading."
      />
      <section className="shell py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-[0.8rem] text-muted">
          <span>{entries.length} images</span>
          <span aria-hidden>·</span>
          <span>Licences: CC BY, CC BY-SA, CC0 and public domain</span>
          <span aria-hidden>·</span>
          <a href="https://commons.wikimedia.org" className="underline decoration-line underline-offset-2 hover:text-forest">
            Wikimedia Commons
          </a>
        </div>

        <ul className="divide-y divide-line border border-line bg-white">
          {entries.map((entry) => (
            <li key={entry.slug} className="flex flex-wrap items-start gap-4 p-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={entry.file} alt="" className="h-14 w-20 shrink-0 object-cover" loading="lazy" />
              <div className="min-w-0 flex-1">
                <p className="text-[0.84rem] font-medium text-forest">{entry.title ?? entry.slug}</p>
                <p className="text-[0.74rem] text-muted">
                  {entry.artist ?? "Author unknown"}
                  {entry.license ? ` · ${entry.license}` : ""}
                </p>
                {entry.description && (
                  <p className="mt-0.5 line-clamp-1 text-[0.72rem] text-muted/80">{entry.description}</p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1 text-[0.72rem]">
                {entry.sourcePage && (
                  <a
                    href={entry.sourcePage}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="font-semibold text-forest underline underline-offset-2"
                  >
                    Source
                  </a>
                )}
                {entry.licenseUrl && (
                  <a
                    href={entry.licenseUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-muted underline underline-offset-2 hover:text-forest"
                  >
                    Licence
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl text-[0.76rem] leading-relaxed text-muted">
          Photography is used to illustrate the destination it depicts. Where a photograph shows a wider area
          rather than a specific property, the listing labels it as an area illustration.
        </p>
      </section>
    </>
  );
}
