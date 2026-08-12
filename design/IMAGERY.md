# Imagery

Images are part of the brand identity. Never treat website imagery as isolated assets.

Create a coherent visual family across the entire site. All imagery should feel as though it came from the same art director, renderer, and brand system.

Registry: `client/src/lib/visualAssets.ts`. Quality bar: `design/approved/` (especially `engage-sculpture-set-2026-08.md`). Skill: `.cursor/skills/image-art-direction/SKILL.md`.

## Locked system — dark technical sculpture

Default visual direction: PREMIUM ENTERPRISE TECHNOLOGY.

Characteristics:

- dark environments
- graphite
- gunmetal
- smoked glass
- subtle metallic materials
- deep violet illumination (violet as **lighting, not paint**)
- controlled studio lighting
- subtle rim lighting
- sophisticated shadows
- realistic/stylized 3D
- architectural/product visualization
- restrained composition
- generous negative space

Generate as a **set**. Bleed the still into the UI (e.g. upper ~55% of an engage-path card) — same dark field as the card, not an inner rounded purple square.

## Concept, not noun

Represent the underlying idea rather than the literal noun.

| Concept | Represent as | Not |
|---------|----------------|-----|
| Fully Managed IT & Cybersecurity | Central core connected to endpoints and nodes | Laptop |
| Co-Managed IT | Two systems interlocking on one spine | Two people / handshake |
| Cyber Risk Assessment | Lattice scanned by a lavender arc | Shield + padlock |
| Monitoring | Technical telemetry and system state | Generic dashboard screenshot |
| Identity | Controlled access architecture | ID badge cliché as the whole image |
| Backup | Redundancy and layered infrastructure | Cloud + padlock |

Locked engage-path files: `client/public/images/visual-system/engage-paths/`.

## Avoid

Do not default to: generic shields, padlocks, laptops, robots, hacker hoodies, generic server racks, binary code, cyberpunk, neon grids, rainbow gradients, excessive glow, toy-like 3D, cartoon illustrations, random AI objects.

Meshy Batch 01 stills remain on Stats / Tackle / Protect / Pricing until those sections get their own sculpture set. Do not mix Meshy icon-salad into engage-path cards.

Portal / mega-menu chrome stays Lucide.

## Consistency (locked camera / materials)

Across all images maintain:

- camera perspective
- lighting direction
- materials
- environment
- color palette
- contrast
- visual density
- scale
- negative space

Only the conceptual subject should significantly change.

## Composition

Images must work within the actual website component. Consider card dimensions, available negative space, text placement, crop, focal point, and responsive behavior. Do not create beautiful images that become unusable when cropped.

## Evaluation

Before approving an image ask:

1. Does it look like generic AI art?
2. Does it belong to the brand?
3. Does it communicate the concept?
4. Does it work at the actual rendered size?
5. Does it match neighboring imagery?
6. Does it complement rather than compete with typography?
7. Would this image still look intentional in six months?

If not, regenerate/rethink the concept.
