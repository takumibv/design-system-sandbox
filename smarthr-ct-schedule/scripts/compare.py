"""screenshots/original と screenshots/smarthr を左右に並べた比較画像を screenshots/compare に出力する。"""
import os
from PIL import Image, ImageDraw

os.makedirs("screenshots/compare", exist_ok=True)
for f in sorted(os.listdir("screenshots/smarthr")):
    a = Image.open(f"screenshots/original/{f}")
    b = Image.open(f"screenshots/smarthr/{f}")
    gap = 24
    w, h = a.width + b.width + gap, max(a.height, b.height) + 40
    c = Image.new("RGB", (w, h), "white")
    d = ImageDraw.Draw(c)
    d.text((8, 12), "original (DADS)", fill="black")
    d.text((a.width + gap + 8, 12), "SmartHR Design System", fill="black")
    c.paste(a, (0, 40))
    c.paste(b, (a.width + gap, 40))
    if "1440" in f:
        c = c.resize((w // 2, h // 2))
    c.save(f"screenshots/compare/{f}", optimize=True)
