"""Create a deterministic social preview from the portfolio's visual system."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.png"
FAVICON = ROOT / "src" / "app" / "favicon.ico"
FONT_REGULAR = Path("C:/Windows/Fonts/arial.ttf")
FONT_BOLD = Path("C:/Windows/Fonts/arialbd.ttf")


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_BOLD if bold else FONT_REGULAR), size)


image = Image.new("RGB", (1200, 630), "#f6f4ef")
draw = ImageDraw.Draw(image)

ink = "#172832"
rust = "#9f3525"
teal = "#165b62"
muted = "#53616a"

draw.rectangle((0, 0, 1200, 16), fill=rust)
draw.ellipse((825, 90, 1220, 485), fill="#dfeae6")
draw.ellipse((917, 180, 1125, 388), outline=teal, width=10)
draw.line((865, 450, 1130, 450), fill=teal, width=9)
draw.line((1020, 114, 1020, 180), fill=rust, width=10)
draw.line((1130, 450, 1130, 540), fill=rust, width=10)

draw.text((68, 65), "PORTFOLIO / 2026", fill=rust, font=font(22, True), stroke_width=0)
draw.text((64, 147), "RIDHO", fill=ink, font=font(100, True))
draw.text((68, 265), "WAHYU NUGROHO", fill=ink, font=font(56, True))
draw.rectangle((68, 359, 143, 369), fill=rust)
draw.text((68, 405), "Frontend & Mobile Engineer", fill=teal, font=font(38, True))
draw.text((68, 463), "Products that work. Journeys that stay tested.", fill=muted, font=font(25))
draw.text((68, 568), "ridho-portfolio.vercel.app", fill=muted, font=font(20))

image.save(OUT, optimize=True)
print(f"Saved {OUT} ({image.width}x{image.height})")

icon = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
icon_draw = ImageDraw.Draw(icon)
icon_draw.rounded_rectangle((1, 1, 63, 63), radius=13, fill=rust)
icon_draw.text((10, 0), "R", fill="white", font=font(55, True))
icon_draw.ellipse((47, 45, 55, 53), fill="white")
icon.save(FAVICON, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print(f"Saved {FAVICON}")
