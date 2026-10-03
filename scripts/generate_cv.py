"""Generate a readable, selectable one-page CV. Keep dates aligned with src/lib/experience.ts."""

from pathlib import Path
import pymupdf

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "Ridho-CV.pdf"

DOC = pymupdf.open()
PAGE = DOC.new_page(width=595, height=842)
INK = (0.09, 0.16, 0.20)
RUST = (0.62, 0.21, 0.15)
MUTED = (0.31, 0.38, 0.41)
LINE = (0.82, 0.86, 0.84)
LEFT = 43
RIGHT = 552
WIDTH = RIGHT - LEFT
y = 52.0


def write(text: str, size: float = 9.2, bold: bool = False, color=MUTED, indent: int = 0, leading: float | None = None) -> None:
    global y
    text = text.replace('—', '-').replace('–', '-').replace('•', '-')
    font = "hebo" if bold else "helv"
    gap = leading or size * 1.42
    max_width = WIDTH - indent
    words = text.split()
    line = ""
    for word in words:
        candidate = f"{line} {word}" if line else word
        if line and pymupdf.get_text_length(candidate, fontname=font, fontsize=size) > max_width:
            PAGE.insert_text((LEFT + indent, y), line, fontname=font, fontsize=size, color=color)
            y += gap
            line = word
        else:
            line = candidate
    if line:
        PAGE.insert_text((LEFT + indent, y), line, fontname=font, fontsize=size, color=color)
        y += gap


def rule() -> None:
    global y
    PAGE.draw_line((LEFT, y), (RIGHT, y), color=LINE, width=.8)
    y += 17


def section(title: str) -> None:
    global y
    y += 8
    write(title.upper(), 9.2, True, RUST, leading=14)
    rule()


def entry(title: str, dates: str, details: str) -> None:
    global y
    write(title, 10.2, True, INK, leading=14)
    write(dates, 8.5, False, RUST, leading=12)
    write(details, 9.1, False, MUTED, leading=13)
    y += 8


write("RIDHO WAHYU NUGROHO", 22, True, INK, leading=29)
write("Frontend & Mobile Engineer  |  QA Automation", 11.5, True, RUST, leading=19)
write("wridho246@gmail.com  |  +62 851 5878 1399  |  Indonesia", 9.2, color=INK, leading=14)
write("ridho-portfolio.vercel.app  |  github.com/Wridho788", 9.2, color=INK, leading=17)

section("Profile")
write(
    "Engineer with seven years across web, mobile, and internal operations products. I build maintainable interfaces with React, Next.js, Flutter, and Kotlin, and automate critical web and mobile journeys with Playwright and Maestro.",
    9.5, color=INK, leading=14,
)

section("Experience")
entry(
    "Taiwan Mobile — QA Automation",
    "March 2026 – September 2026 | Remote",
    "Built and maintained end-to-end mobile and web tests with Maestro and Playwright. Investigated failures across application, backend, and environment layers; created reusable flows and AI-assisted QA workflows.",
)
entry(
    "PT Propadu Konair Tarahubun — Frontend & Mobile Engineer",
    "January 2025 – January 2026 | North Sumatra, Indonesia",
    "Built public and internal web applications with React, Next.js, and TypeScript, plus field-facing Flutter applications. Established reusable UI and state patterns across product modules.",
)
entry(
    "PT Taqnia Utama — Frontend Web Engineer",
    "January 2022 – December 2024 | North Sumatra, Indonesia",
    "Developed enterprise React and TypeScript interfaces. Structured reusable components, service boundaries, and data fetching patterns for maintainable product modules.",
)
entry(
    "PT Cipta Kerja Arunika Nusantara — Mobile Application Developer",
    "January 2019 – December 2021 | North Sumatra, Indonesia",
    "Built native Android applications in Kotlin with MVVM and Coroutines, including a job marketplace released on Google Play.",
)

section("Selected work")
entry(
    "LapakBenz — Vehicle marketplace",
    "React, TypeScript, Vite, React Query, Zustand",
    "Built catalog, checkout, merchant, and event journeys and a static HTML pipeline for shareable product and event pages. Public source and demo are linked from the portfolio.",
)
entry(
    "RavaSIM — eSIM frontend prototype",
    "Next.js, TypeScript, React Query, Zustand",
    "Built package, checkout, and eSIM management journeys against a mock service layer. This is a frontend prototype, not a live transaction system.",
)

section("Core skills")
write("Web: React, Next.js, TypeScript, React Query, Zustand, REST APIs", 9.2, color=INK, leading=13)
write("Mobile: Flutter, React Native, Android/Kotlin  |  Quality: Playwright, Maestro", 9.2, color=INK, leading=13)

section("Education")
write("Bachelor of Informatics Engineering — STMIK IBBI Medan, 2015–2019", 9.2, color=INK, leading=13)

if y > 805:
    raise RuntimeError(f"CV overflows the page: final baseline {y:.1f}")

PAGE.insert_link({"kind": pymupdf.LINK_URI, "from": pymupdf.Rect(LEFT, 89, RIGHT, 104), "uri": "mailto:wridho246@gmail.com"})
PAGE.insert_link({"kind": pymupdf.LINK_URI, "from": pymupdf.Rect(LEFT, 105, RIGHT, 121), "uri": "https://ridho-portfolio.vercel.app"})
DOC.set_metadata({"title": "Ridho Wahyu Nugroho — CV", "author": "Ridho Wahyu Nugroho", "subject": "Frontend, mobile, and QA automation experience"})
DOC.save(OUT, garbage=4, deflate=True)
DOC.close()
print(f"Saved {OUT}; final content baseline {y:.1f}")
