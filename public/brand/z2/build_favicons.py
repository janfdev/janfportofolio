import os
import sys
import shutil

sys.path.insert(0, "/root/.hermes/skills/logo-design/scripts")
from render_png import render, write_ico

svg_source = "/root/janfportofolio/public/brand/z2/favicon-white-z2.svg"

# 1. Render PNG sizes
sizes = [16, 32, 48, 180, 192, 512]
png_paths = {}

for s in sizes:
    dest = f"/root/janfportofolio/public/icon-{s}.png" if s in [192, 512] else (
        f"/root/janfportofolio/public/apple-touch-icon.png" if s == 180 else (
            f"/root/janfportofolio/public/favicon-{s}.png"
        )
    )
    render(svg_source, dest, s, s)
    png_paths[s] = dest
    print(f"Generated {dest} ({s}x{s})")

# 2. Build multi-resolution favicon.ico (16, 32, 48)
ico_dest = "/root/janfportofolio/public/favicon.ico"
write_ico([png_paths[16], png_paths[32], png_paths[48]], ico_dest)
print(f"Generated {ico_dest}")

# 3. Copy SVG favicon
shutil.copy(svg_source, "/root/janfportofolio/public/favicon.svg")
print("Updated /root/janfportofolio/public/favicon.svg")
