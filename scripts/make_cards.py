import os
import zipfile

import qrcode
from PIL import Image, ImageDraw, ImageFont

BLUE = (20, 80, 210)
NAVY = (5, 15, 37)
INK = (12, 22, 43)
SLATE = (82, 98, 124)
PALE = (226, 233, 245)
WHITE = (255, 255, 255)
GREEN = (37, 192, 138)

W, H = 1050, 600  # 3.5 x 2 inches at 300 DPI
MARGIN = 64

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "business-cards")
LOGO_PATH = os.path.join(ROOT, "public", "trustcode-systems-logo.png")
FONTS = r"C:\Windows\Fonts"
os.makedirs(OUT, exist_ok=True)


def font(name, size):
    path = os.path.join(FONTS, name)
    return ImageFont.truetype(path, size) if os.path.exists(path) else ImageFont.load_default()


F_NAME = font("seguisb.ttf", 49)
F_TITLE = font("segoeui.ttf", 25)
F_CONTACT = font("segoeui.ttf", 22)
F_LABEL = font("consolab.ttf", 16)
F_WORD = font("seguisb.ttf", 57)
F_TAG = font("segoeui.ttf", 26)
F_CAP = font("consola.ttf", 21)

logo_source = Image.open(LOGO_PATH).convert("RGBA")

qr = qrcode.QRCode(
    version=None,
    error_correction=qrcode.constants.ERROR_CORRECT_M,
    box_size=12,
    border=1,
)
qr.add_data("https://trustcodesystem.tech")
qr.make(fit=True)
qr_image = qr.make_image(fill_color=NAVY, back_color="white").convert("RGB")


def crop_logo():
    alpha = logo_source.getchannel("A")
    box = alpha.getbbox()
    if box:
        return logo_source.crop(box)
    return logo_source


def fit_logo(target_width):
    source = crop_logo()
    height = round(source.height * target_width / source.width)
    return source.resize((target_width, height), Image.Resampling.LANCZOS)


def wrap(draw, text, fnt, max_width):
    lines, current = [], ""
    for word in text.split():
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=fnt) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def contact_item(draw, x, y, label, value, max_width):
    draw.text((x, y), label.upper(), font=F_LABEL, fill=BLUE)
    lines = wrap(draw, value, F_CONTACT, max_width)
    for index, line in enumerate(lines[:2]):
        draw.text((x, y + 24 + index * 28), line, font=F_CONTACT, fill=INK)


def make_front(name, title, email, phone, location):
    image = Image.new("RGB", (W, H), WHITE)
    draw = ImageDraw.Draw(image)

    draw.rectangle((0, 0, 16, H), fill=BLUE)
    draw.rectangle((16, 0, W, 12), fill=NAVY)

    logo = fit_logo(355)
    image.paste(logo, (MARGIN, 46), logo)

    draw.line((MARGIN, 170, W - MARGIN, 170), fill=PALE, width=2)
    draw.text((MARGIN, 197), name, font=F_NAME, fill=INK)

    title_y = 261
    for line in wrap(draw, title, F_TITLE, 690)[:2]:
        draw.text((MARGIN, title_y), line, font=F_TITLE, fill=BLUE)
        title_y += 31

    draw.rounded_rectangle((752, 206, 986, 290), radius=10, fill=NAVY)
    draw.ellipse((774, 234, 788, 248), fill=GREEN)
    draw.text((800, 224), "CO-FOUNDER", font=F_LABEL, fill=WHITE)

    draw.line((MARGIN, 349, W - MARGIN, 349), fill=PALE, width=2)
    contact_item(draw, MARGIN, 382, "Email", email, 480)
    contact_item(draw, 610, 382, "Phone", phone, 360)
    contact_item(draw, MARGIN, 486, "Web", "trustcodesystem.tech", 480)
    contact_item(draw, 610, 486, "Location", location, 360)

    return image


def make_back():
    image = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(image)

    for x in range(0, W, 60):
        draw.line((x, 0, x, H), fill=(10, 30, 68), width=1)
    for y in range(0, H, 60):
        draw.line((0, y, W, y), fill=(10, 30, 68), width=1)

    draw.rectangle((0, 0, 16, H), fill=BLUE)
    draw.text((72, 74), "Trust", font=F_WORD, fill=WHITE)
    trust_width = draw.textlength("Trust", font=F_WORD)
    draw.text((72 + trust_width - 4, 74), "Code", font=F_WORD, fill=(105, 151, 255))
    code_width = draw.textlength("Code", font=F_WORD)
    draw.text((72 + trust_width + code_width - 8, 74), " Systems", font=F_WORD, fill=WHITE)
    draw.text((74, 154), "Software you can stake your business on.", font=F_TAG, fill=PALE)

    draw.ellipse((77, 237, 91, 251), fill=GREEN)
    draw.text((108, 225), "PRODUCT ENGINEERING / CLOUD / AI / SECURITY", font=F_CAP, fill=PALE)
    draw.line((74, 289, 650, 289), fill=(42, 70, 125), width=2)

    draw.text((74, 326), "LAGOS / LONDON / REMOTE WORLDWIDE", font=F_CAP, fill=(154, 176, 218))
    draw.text((74, 375), "hello@trustcodesystem.tech", font=F_CAP, fill=(105, 151, 255))

    panel = 242
    panel_x, panel_y = 742, 166
    draw.rounded_rectangle(
        (panel_x, panel_y, panel_x + panel, panel_y + panel),
        radius=20,
        fill=WHITE,
    )
    qr_resized = qr_image.resize((panel - 34, panel - 34), Image.Resampling.NEAREST)
    image.paste(qr_resized, (panel_x + 17, panel_y + 17))
    draw.text((735, 431), "SCAN TO VISIT", font=F_LABEL, fill=(154, 176, 218))
    draw.text((694, 462), "trustcodesystem.tech", font=F_CAP, fill=WHITE)

    return image


people = [
    (
        "Abass Ibrahim",
        "Full-Stack Delivery & Design Lead",
        "a.ibrahim@trustcodesystem.tech",
        "+234 808 307 1747",
        "Lagos, Nigeria",
    ),
    (
        "Bashir Abdulah",
        "Frontend & Product Engineering Lead",
        "b.abdulah@trustcodesystem.tech",
        "+44 7466 601843",
        "London, United Kingdom",
    ),
    (
        "Abdulhaleem Sanuth",
        "Cloud & Backend Engineering Lead",
        "a.sanuth@trustcodesystem.tech",
        "+234 905 498 5795",
        "Lagos, Nigeria",
    ),
    (
        "Olamilekan Oyedele",
        "Security & SOC Lead",
        "o.oyedele@trustcodesystem.tech",
        "+234 814 764 9852",
        "Lagos, Nigeria",
    ),
]


def slug(name):
    return name.lower().replace(" ", "-")


back = make_back()
back.save(os.path.join(OUT, "trustcode-card-back.png"), dpi=(300, 300))

for person in people:
    name, title, email, phone, location = person
    front = make_front(name, title, email, phone, location)
    file_slug = slug(name)
    front.save(os.path.join(OUT, f"{file_slug}-front.png"), dpi=(300, 300))
    front.save(
        os.path.join(OUT, f"{file_slug}-business-card.pdf"),
        "PDF",
        resolution=300,
        save_all=True,
        append_images=[back],
    )

    preview = Image.new("RGB", (W, H * 2 + 28), (231, 235, 241))
    preview.paste(front, (0, 0))
    preview.paste(back, (0, H + 28))
    preview.save(os.path.join(OUT, f"{file_slug}-preview.jpg"), quality=92)

zip_path = os.path.join(OUT, "trustcode-business-cards.zip")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as archive:
    for filename in sorted(os.listdir(OUT)):
        if filename != os.path.basename(zip_path):
            archive.write(os.path.join(OUT, filename), arcname=filename)

print(f"Created {len(people)} personalized cards in {OUT}")
