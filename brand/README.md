# Digerati Experts — logo system

Master vector artwork for the Digerati Experts identity. Everything here is
resolution-independent SVG; the PNGs under `png/` are exports, not sources.

## Provenance

Rebuilt from the legacy raster logo (`client/public/logo.png`, 500×500) into
clean vector outlines. Two things were regularized in the process:

- **The mark** was redrawn as exact geometry — four bars on a fixed pitch,
  fully rounded ends, long/short/short/long, optically centred on one axis.
  The original was hand-placed and drifted by a pixel or two per bar.
- **The gold** was corrected from `#F5E48A` to `#E3B23C`. The original pale
  yellow fails contrast on warm paper (`#F7F5F2`) and disappears in CMYK
  print. The new value holds at 16px and survives four-colour process.

Letterforms are unchanged — the wordmark is the existing one, outlined.

## Colour

| Role | Hex | Use |
|---|---|---|
| Signal Gold | `#E3B23C` | the mark, always |
| Graphite | `#050312` | wordmark on light grounds (locked brand token) |
| White | `#FFFFFF` | wordmark on dark grounds |
| Paper | `#F7F5F2` | the light ground the primary lockup is drawn for |

Graphite and paper are the locked foundation tokens from `design/BRAND.md`.
The gold belongs to the logo only — it is not a UI accent, and it does not
replace brand magenta `#D3126A` anywhere in the interface.

## Files

| File | Use |
|---|---|
| `digerati-logo.svg` | **Primary.** Gold mark, graphite wordmark. Light grounds. |
| `digerati-logo-reverse.svg` | Gold mark, white wordmark. Dark grounds — the default over photography and dark UI. |
| `digerati-logo-mono-black.svg` | One colour, graphite. Fax, engraving, single-colour print. |
| `digerati-logo-mono-white.svg` | One colour, white. Knockouts. |
| `digerati-logo-stacked.svg` | Square-ish spaces. Mark set 1.5× above the wordmark. |
| `digerati-logo-stacked-reverse.svg` | Stacked, dark grounds. |
| `digerati-mark.svg` | Mark alone, transparent, square artboard. |
| `digerati-mark-mono-black.svg` / `-mono-white.svg` | Mark, one colour. |
| `digerati-mark-tile.svg` | Gold mark on a graphite rounded tile. Favicon, app icon, avatar. |
| `png/` | Exports. Lockups at 2400px, stacked at 1600px, mark at 1024/512/256, tile down to 16px. Transparent except the tile. |

## Rules

**Clear space** — leave the height of one bar (⅛ of the mark's height) on
every side of the lockup. Nothing enters it.

**Minimum size** — primary lockup 110px wide on screen, 30mm in print. Below
that use the stacked lockup or the mark alone. The mark is legible to 16px.

**Ground** — the reverse lockup on graphite is the sharpest of the set; prefer
it. On photography, place the reverse lockup over a settled dark area, never
over detail.

**Don't** — recolour the mark; set the wordmark in a live font (these are
outlines, and the original typeface is not licensed here); stretch, rotate,
add effects, or box the primary lockup; separate the mark from the wordmark
in the horizontal lockup to reposition it.

## Regenerating

The build is deterministic and lives in the PR that introduced this folder:
trace the legacy raster in two zones (the uppercase wordmark with sharp corner
detection, `Experts` with smoothing), flatten near-straight curves to lines,
snap near-axis edges, then compose against the geometry above. Re-run it only
if the source artwork changes — otherwise edit the SVGs directly.
