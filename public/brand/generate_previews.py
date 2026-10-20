import subprocess
import os

logos = [
    {
        "file": "/root/janfportofolio/public/brand/concept-z1-precision-fold.svg",
        "out": "/root/janfportofolio/public/brand/preview-z1-precision-fold.png",
        "name": "Concept Z1: Precision Fold Z",
        "bg": "#0C0D0E",
        "card_bg": "#18181B",
        "text_color": "#FAFAFA"
    },
    {
        "file": "/root/janfportofolio/public/brand/concept-z2-kinetic-split.svg",
        "out": "/root/janfportofolio/public/brand/preview-z2-kinetic-split.png",
        "name": "Concept Z2: Kinetic Split Z",
        "bg": "#0C0D0E",
        "card_bg": "#18181B",
        "text_color": "#FAFAFA"
    },
    {
        "file": "/root/janfportofolio/public/brand/concept-z3-symbol.svg",
        "out": "/root/janfportofolio/public/brand/preview-z3-monolith-prompt.png",
        "name": "Concept Z3: Monolith Prompt Z",
        "bg": "#0C0D0E",
        "card_bg": "#18181B",
        "text_color": "#FAFAFA"
    }
]

for item in logos:
    with open(item["file"], "r", encoding="utf-8") as f:
        svg_content = f.read()
    
    # Invert #18181B to #FAFAFA for dark theme presentation
    svg_dark = svg_content.replace("#18181B", "#FAFAFA")
    # Strip <svg> and </svg>
    inner_svg = svg_dark.split(">", 1)[1].rsplit("</svg>", 1)[0]
    
    board = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" fill="none">
      <rect width="600" height="600" fill="{item['bg']}"/>
      <rect x="50" y="50" width="500" height="500" rx="36" fill="{item['card_bg']}" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
      
      <!-- Logo Marks Layer (Centered 256x256 inside card) -->
      <g transform="translate(172, 140)">
        {inner_svg}
      </g>
      
      <!-- Label -->
      <text x="300" y="460" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="{item['text_color']}" text-anchor="middle" letter-spacing="0.05em">{item['name']}</text>
      <text x="300" y="490" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#71717A" text-anchor="middle" letter-spacing="0.08em">VECTOR GEOMETRIC SVG · 100/100 AUDIT</text>
    </svg>"""
    
    board_path = item["out"].replace(".png", ".svg")
    with open(board_path, "w", encoding="utf-8") as f:
        f.write(board)
    
    cmd = [
        "python3", "/root/.hermes/skills/logo-design/scripts/render_png.py",
        board_path, "--size", "600", "-o", item["out"]
    ]
    subprocess.run(cmd, check=True)
    print("Generated:", item["out"])
