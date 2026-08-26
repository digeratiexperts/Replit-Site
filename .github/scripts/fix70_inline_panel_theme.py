from pathlib import Path

ROOT = Path('.')

def replace_once(path: str, old: str, new: str, label: str) -> None:
    p = ROOT / path
    text = p.read_text(encoding='utf-8')
    count = text.count(old)
    if count != 1:
        raise SystemExit(f'{label}: expected exactly 1 anchor, found {count}')
    p.write_text(text.replace(old, new, 1), encoding='utf-8')
    print(f'Applied {label}')

# CartContext: type + canonical inline CSS variable maps.
replace_once(
    'client/src/contexts/CartContext.tsx',
    '  type ReactNode,\n} from "react";',
    '  type ReactNode,\n  type CSSProperties,\n} from "react";',
    'CartContext CSSProperties import',
)

style_block = '''\nconst PANEL_THEME_STYLES: Record<"dark" | "light", CSSProperties> = {\n  dark: {\n    "--dp-panel-bg": "#0a0a0a",\n    "--dp-card-bg": "rgb(255 255 255 / 0.03)",\n    "--dp-tint-bg": "rgb(255 255 255 / 0.10)",\n    "--dp-hover-bg": "rgb(255 255 255 / 0.08)",\n    "--dp-border-10": "rgb(255 255 255 / 0.10)",\n    "--dp-border-15": "rgb(255 255 255 / 0.15)",\n    "--dp-border-20": "rgb(255 255 255 / 0.20)",\n    "--dp-border-25": "rgb(255 255 255 / 0.25)",\n    "--dp-text-primary": "#ffffff",\n    "--dp-text-hover": "#ffffff",\n    "--dp-text-80": "rgb(255 255 255 / 0.80)",\n    "--dp-text-75": "rgb(255 255 255 / 0.75)",\n    "--dp-text-70": "rgb(255 255 255 / 0.70)",\n    "--dp-text-65": "rgb(255 255 255 / 0.65)",\n    "--dp-text-60": "rgb(255 255 255 / 0.60)",\n    "--dp-text-55": "rgb(255 255 255 / 0.55)",\n    "--dp-text-50": "rgb(255 255 255 / 0.50)",\n    "--dp-text-45": "rgb(255 255 255 / 0.45)",\n    "--dp-text-40": "rgb(255 255 255 / 0.40)",\n    "--dp-text-35": "rgb(255 255 255 / 0.35)",\n    "--dp-danger": "#fca5a5",\n    "--dp-danger-hover-bg": "rgb(239 68 68 / 0.10)",\n    "--dp-warn-border": "rgb(251 191 36 / 0.25)",\n    "--dp-warn-bg": "rgb(251 191 36 / 0.05)",\n    "--dp-warn-text": "#fde68a",\n    "--dp-success": "#34d399",\n  } as CSSProperties,\n  light: {\n    "--dp-panel-bg": "#ffffff",\n    "--dp-card-bg": "#f8fafc",\n    "--dp-tint-bg": "#f1f5f9",\n    "--dp-hover-bg": "#f1f5f9",\n    "--dp-border-10": "#e2e8f0",\n    "--dp-border-15": "#cbd5e1",\n    "--dp-border-20": "#cbd5e1",\n    "--dp-border-25": "#cbd5e1",\n    "--dp-text-primary": "#0f172a",\n    "--dp-text-hover": "#0f172a",\n    "--dp-text-80": "#334155",\n    "--dp-text-75": "#475569",\n    "--dp-text-70": "#475569",\n    "--dp-text-65": "#475569",\n    "--dp-text-60": "#64748b",\n    "--dp-text-55": "#64748b",\n    "--dp-text-50": "#64748b",\n    "--dp-text-45": "#94a3b8",\n    "--dp-text-40": "#94a3b8",\n    "--dp-text-35": "#94a3b8",\n    "--dp-danger": "#dc2626",\n    "--dp-danger-hover-bg": "#fef2f2",\n    "--dp-warn-border": "#fde68a",\n    "--dp-warn-bg": "#fffbeb",\n    "--dp-warn-text": "#b45309",\n    "--dp-success": "#059669",\n  } as CSSProperties,\n};\n\nexport function getPanelThemeStyle(theme: "dark" | "light"): CSSProperties {\n  return PANEL_THEME_STYLES[theme];\n}\n'''
replace_once(
    'client/src/contexts/CartContext.tsx',
    '''function readStoredPanelTheme(): "dark" | "light" {\n  try {\n    return localStorage.getItem(PANEL_THEME_KEY) === "light" ? "light" : "dark";\n  } catch {\n    return "dark";\n  }\n}\n''',
    '''function readStoredPanelTheme(): "dark" | "light" {\n  try {\n    return localStorage.getItem(PANEL_THEME_KEY) === "light" ? "light" : "dark";\n  } catch {\n    return "dark";\n  }\n}\n''' + style_block,
    'CartContext panel theme style map',
)

# Shopping cart root gets canonical inline vars.
replace_once(
    'client/src/components/store/ShoppingCart.tsx',
    'import { useCart, isRecurringPricing } from "@/contexts/CartContext";',
    'import { getPanelThemeStyle, isRecurringPricing, useCart } from "@/contexts/CartContext";',
    'ShoppingCart theme style import',
)
replace_once(
    'client/src/components/store/ShoppingCart.tsx',
    '            data-theme={panelTheme}\n            data-testid="shopping-cart-panel"',
    '            data-theme={panelTheme}\n            style={getPanelThemeStyle(panelTheme)}\n            data-testid="shopping-cart-panel"',
    'ShoppingCart inline panel theme style',
)

# Configure drawer root gets the same canonical inline vars.
replace_once(
    'client/src/components/store/ConfigureProductDrawer.tsx',
    'import { useCart } from "@/contexts/CartContext";',
    'import { getPanelThemeStyle, useCart } from "@/contexts/CartContext";',
    'Configure drawer theme style import',
)
replace_once(
    'client/src/components/store/ConfigureProductDrawer.tsx',
    '            data-theme={panelTheme}\n            data-testid="configure-product-drawer"',
    '            data-theme={panelTheme}\n            style={getPanelThemeStyle(panelTheme)}\n            data-testid="configure-product-drawer"',
    'Configure drawer inline panel theme style',
)

# Remove global token declarations; leave only the tiny transition rule.
css = ROOT / 'client/src/index.css'
text = css.read_text(encoding='utf-8')
start_marker = '/*\n * Store panel theme tokens -- scoped to the cart drawer and configure-product\n'
end_marker = '.de-panel-theme-toggle {\n'
start = text.find(start_marker)
end = text.find(end_marker, start)
if start < 0 or end < 0:
    raise SystemExit('index.css theme token block anchors not found')
replacement = '/* Store drawer theme values are supplied inline on each .de-panel root. */\n'
text = text[:start] + replacement + text[end:]
css.write_text(text, encoding='utf-8')
print('Removed global panel token declarations from index.css')

# Structural assertions.
cart = (ROOT / 'client/src/components/store/ShoppingCart.tsx').read_text(encoding='utf-8')
configure = (ROOT / 'client/src/components/store/ConfigureProductDrawer.tsx').read_text(encoding='utf-8')
ctx = (ROOT / 'client/src/contexts/CartContext.tsx').read_text(encoding='utf-8')
css_text = css.read_text(encoding='utf-8')
assert 'style={getPanelThemeStyle(panelTheme)}' in cart
assert 'style={getPanelThemeStyle(panelTheme)}' in configure
assert 'export function getPanelThemeStyle' in ctx
assert '.de-panel[data-theme="light"]' not in css_text
assert '--dp-panel-bg:' not in css_text
assert '.de-panel-theme-toggle {' in css_text
print('Fix 70 inline-theme structural assertions passed')
