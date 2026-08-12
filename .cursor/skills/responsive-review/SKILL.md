---
name: responsive-review
description: Audit and improve responsive behavior across desktop, tablet, and mobile layouts.
---
# RESPONSIVE REVIEW
Responsive design is not desktop design scaled down.
Evaluate the interface at:
- large desktop
- standard desktop
- tablet
- mobile
## CHECK
### Navigation
Does navigation remain understandable and usable?
### Typography
Does text:
- wrap naturally?
- maintain hierarchy?
- remain readable?
- avoid awkward line breaks?
### Layout
Does content:
- stack appropriately?
- maintain hierarchy?
- avoid excessive compression?
- avoid horizontal overflow?
### Cards
Check:
- number of columns
- card height
- image cropping
- internal spacing
- CTA placement
### Imagery
Images should:
- maintain focal point
- crop intentionally
- avoid becoming tiny
- avoid excessive height
- remain relevant to the content
### Buttons
Ensure:
- adequate touch targets
- clear hierarchy
- no awkward wrapping
- appropriate stacking
### Spacing
Do not simply preserve desktop spacing on mobile.
Use responsive spacing appropriate to the viewport.
## IMPLEMENTATION
Prefer structural responsive changes over piles of overrides.
If a component requires many breakpoint-specific hacks, reconsider its underlying layout.
## FINAL TEST
After changes, inspect:
- desktop
- tablet
- mobile
Look for visual regressions.
Do not declare success based solely on one viewport.
