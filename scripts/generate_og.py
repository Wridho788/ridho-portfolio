"""Create a deterministic social preview from the portfolio's visual system."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og-image.png"
FAVICON = ROOT / "src" / "app" / "favicon.ico"
PORTRAIT = ROOT / "public" / "images" / "profile-cutout.webp"
FONT_REGULAR = Path("C:/Windows/Fonts/arial.ttf")
FONT_BOLD = Path("C:/Windows/Fonts/arialbd.ttf")
FONT_BLACK = Path("C:/Windows/Fonts/ariblk.ttf")


def font(size: int, weight: str = "regular") -> ImageFont.FreeTypeFont:
    path = {"regular": FONT_REGULAR, "bold": FONT_BOLD, "black": FONT_BLACK}[weight]
    return ImageFont.truetype(str(path), size)


ink = "#0b0b0b"
muted = "#5c5c5c"
teal = "#165b62"

image = Image.new("RGB", (1200, 630), "#ffffff")

# Soft teal glow from the top edge, matching the hero.
glow = Image.new("L", image.size, 0)
ImageDraw.Draw(glow).ellipse((150, -420, 1050, 330), fill=255)
glow = glow.filter(ImageFilter.GaussianBlur(120))
image.paste(Image.new("RGB", image.size, "#bfe3da"), mask=glow)

draw = ImageDraw.Draw(image)
wordmark = font(196, "black")
draw.text((60, 70), "RIDHO", fill=ink, font=wordmark)
baseline = draw.textbbox((60, 70), "RIDHO", font=wordmark)[3]
dot_x = draw.textbbox((60, 70), "RIDHO", font=wordmark)[2] + 12
draw.ellipse((dot_x, baseline - 46, dot_x + 46, baseline), fill=teal)

portrait = Image.open(PORTRAIT).convert("RGBA")
portrait = portrait.resize((int(portrait.width * 470 / portrait.height), 470), Image.LANCZOS)
image.paste(portrait, (1200 - portrait.width - 40, 630 - portrait.height), portrait)

draw.text((66, 330), "Frontend & Mobile Engineer", fill=ink, font=font(40, "bold"))
draw.text((66, 392), "Web and mobile products, plus the", fill=muted, font=font(26))
draw.text((66, 428), "tests that keep them working.", fill=muted, font=font(26))
draw.rounded_rectangle((66, 520, 418, 572), radius=26, fill=ink)
draw.text((92, 532), "ridho-portfolio.vercel.app", fill="#ffffff", font=font(22, "bold"))

image.save(OUT, optimize=True)
print(f"Saved {OUT} ({image.width}x{image.height})")

icon = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
icon_draw = ImageDraw.Draw(icon)
icon_draw.rounded_rectangle((1, 1, 63, 63), radius=32, fill=ink)
icon_draw.text((13, 2), "R", fill="white", font=font(48, "black"))
icon_draw.ellipse((44, 40, 52, 48), fill="#6cc3b4")
icon.save(FAVICON, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print(f"Saved {FAVICON}")
