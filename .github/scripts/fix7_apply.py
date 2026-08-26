import re
from pathlib import Path

files = [
    "client/src/components/store/ShoppingCart.tsx",
    "client/src/components/store/ConfigureProductDrawer.tsx",
    "client/src/components/store/CoverageScorePanel.tsx",
]

always_rules = [
    (r'bg-\[#0a0a0a\]', 'bg-[color:var(--dp-panel-bg)]'),
    (r'bg-\[#141414\]', 'bg-[color:var(--dp-card-bg)]'),
    (r'border-white/25\b', 'border-[color:var(--dp-border-25)]'),
    (r'border-white/20\b', 'border-[color:var(--dp-border-20)]'),
    (r'border-white/15\b', 'border-[color:var(--dp-border-15)]'),
    (r'border-white/10\b', 'border-[color:var(--dp-border-10)]'),
    (r'bg-white/\[0\.02\]', 'bg-[color:var(--dp-card-bg)]'),
    (r'bg-white/\[0\.03\]', 'bg-[color:var(--dp-card-bg)]'),
    (r'hover:bg-white/5\b', 'hover:bg-[color:var(--dp-hover-bg)]'),
    (r'hover:bg-white/10\b', 'hover:bg-[color:var(--dp-hover-bg)]'),
    (r'bg-white/5\b', 'bg-[color:var(--dp-card-bg)]'),
    (r'bg-white/10\b(?!0)', 'bg-[color:var(--dp-tint-bg)]'),
    (r'bg-white/15\b', 'bg-[color:var(--dp-border-15)]'),
    (r'text-white/80\b', 'text-[color:var(--dp-text-80)]'),
    (r'text-white/75\b', 'text-[color:var(--dp-text-75)]'),
    (r'text-white/70\b', 'text-[color:var(--dp-text-70)]'),
    (r'text-white/65\b', 'text-[color:var(--dp-text-65)]'),
    (r'text-white/60\b', 'text-[color:var(--dp-text-60)]'),
    (r'text-white/55\b', 'text-[color:var(--dp-text-55)]'),
    (r'text-white/50\b', 'text-[color:var(--dp-text-50)]'),
    (r'text-white/45\b', 'text-[color:var(--dp-text-45)]'),
    (r'text-white/40\b', 'text-[color:var(--dp-text-40)]'),
    (r'text-white/35\b', 'text-[color:var(--dp-text-35)]'),
    (r'text-red-300\b', 'text-[color:var(--dp-danger)]'),
    (r'hover:bg-red-500/10', 'hover:bg-[color:var(--dp-danger-hover-bg)]'),
    (r'border-amber-400/25', 'border-[color:var(--dp-warn-border)]'),
    (r'bg-amber-400/5', 'bg-[color:var(--dp-warn-bg)]'),
    (r'text-amber-200', 'text-[color:var(--dp-warn-text)]'),
    (r'text-emerald-400', 'text-[color:var(--dp-success)]'),
]

conditional_rules = [
    (r'hover:text-white\b', 'hover:text-[color:var(--dp-text-hover)]'),
    (r'text-white\b(?!/)', 'text-[color:var(--dp-text-primary)]'),
]

solid_accent_re = re.compile(r'bg-de-accent(?!/)')

for fp in files:
    p = Path(fp)
    lines = p.read_text(encoding='utf-8').splitlines(keepends=True)
    out_lines = []
    changed = 0
    for line in lines:
        is_solid = bool(solid_accent_re.search(line))
        new_line = line
        for pat, repl in always_rules:
            new_line = re.sub(pat, repl, new_line)
        if not is_solid:
            for pat, repl in conditional_rules:
                new_line = re.sub(pat, repl, new_line)
        changed += new_line != line
        out_lines.append(new_line)
    if changed == 0:
        raise SystemExit(f"No mechanical substitutions applied to {fp}")
    p.write_text(''.join(out_lines), encoding='utf-8')
    print(f"{fp}: changed {changed} lines mechanically")


def replace_once(path: str, old: str, new: str, label: str):
    p = Path(path)
    s = p.read_text(encoding='utf-8')
    count = s.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly 1 anchor, found {count}")
    p.write_text(s.replace(old, new, 1), encoding='utf-8')
    print(f"Applied {label}")


replace_once(
    "client/src/components/store/CoverageScorePanel.tsx",
    'text-[color:var(--dp-success)]/90',
    'text-[color:var(--dp-success)]',
    'CoverageScorePanel success opacity fix',
)

cart = "client/src/components/store/ShoppingCart.tsx"
replace_once(cart, '  Clock,\n} from "lucide-react";', '  Clock,\n  Sun,\n  Moon,\n} from "lucide-react";', 'ShoppingCart Sun/Moon imports')
replace_once(cart, '    announcement,\n  } = useCart();', '    announcement,\n    panelTheme,\n    togglePanelTheme,\n  } = useCart();', 'ShoppingCart cart theme fields')
replace_once(
    cart,
    'className={`fixed right-0 z-[61] flex w-full flex-col border-l border-[color:var(--dp-border-10)] bg-[color:var(--dp-panel-bg)] sm:max-w-xl ${',
    'className={`de-panel fixed right-0 z-[61] flex w-full flex-col border-l border-[color:var(--dp-border-10)] bg-[color:var(--dp-panel-bg)] sm:max-w-xl ${',
    'ShoppingCart de-panel class',
)
replace_once(
    cart,
    '            }`}\n            data-testid="shopping-cart-panel"',
    '            }`}\n            data-theme={panelTheme}\n            data-testid="shopping-cart-panel"',
    'ShoppingCart data-theme',
)
replace_once(
    cart,
    '              <div className="flex items-center gap-1">\n                <Button\n                  variant="ghost"\n                  size="icon"\n                  onClick={() => setIsMinimized(!isMinimized)}',
    '''              <div className="flex items-center gap-1">\n                <Button\n                  variant="ghost"\n                  size="icon"\n                  onClick={togglePanelTheme}\n                  className="de-panel-theme-toggle h-11 w-11 text-[color:var(--dp-text-60)] hover:bg-de-accent/10 hover:text-[color:var(--dp-text-hover)]"\n                  data-testid="button-toggle-cart-theme"\n                  title={panelTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}\n                  aria-label={panelTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}\n                >\n                  {panelTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}\n                </Button>\n                <Button\n                  variant="ghost"\n                  size="icon"\n                  onClick={() => setIsMinimized(!isMinimized)}''',
    'ShoppingCart theme toggle button',
)

cfg = "client/src/components/store/ConfigureProductDrawer.tsx"
replace_once(cfg, 'import { Check, FileText, Minus, Phone, Plus, Settings2, X } from "lucide-react";', 'import { Check, FileText, Minus, Moon, Phone, Plus, Settings2, Sun, X } from "lucide-react";', 'Configure Sun/Moon imports')
replace_once(cfg, 'import { useDockHiddenWhileOpen } from "@/hooks/useDockHiddenWhileOpen";\n', 'import { useDockHiddenWhileOpen } from "@/hooks/useDockHiddenWhileOpen";\nimport { useCart } from "@/contexts/CartContext";\n', 'Configure useCart import')
replace_once(cfg, '  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");\n  useDockHiddenWhileOpen(open);', '  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");\n  const { panelTheme, togglePanelTheme } = useCart();\n  useDockHiddenWhileOpen(open);', 'Configure cart theme fields')
replace_once(
    cfg,
    '            className="fixed right-0 top-0 z-[61] flex h-full min-h-0 w-full max-w-md flex-col overflow-hidden border-l border-[color:var(--dp-border-10)] bg-[color:var(--dp-panel-bg)]"\n            data-testid="configure-product-drawer"',
    '            className="de-panel fixed right-0 top-0 z-[61] flex h-full min-h-0 w-full max-w-md flex-col overflow-hidden border-l border-[color:var(--dp-border-10)] bg-[color:var(--dp-panel-bg)]"\n            data-theme={panelTheme}\n            data-testid="configure-product-drawer"',
    'Configure de-panel and data-theme',
)
replace_once(
    cfg,
    '''              <Button\n                variant="ghost"\n                size="icon"\n                onClick={onClose}\n                className="text-[color:var(--dp-text-60)] hover:bg-[color:var(--dp-hover-bg)] hover:text-[color:var(--dp-text-hover)]"\n                data-testid="button-close-configure"\n              >\n                <X className="h-5 w-5" />\n              </Button>''',
    '''              <div className="flex items-center gap-1">\n                <Button\n                  variant="ghost"\n                  size="icon"\n                  onClick={togglePanelTheme}\n                  className="de-panel-theme-toggle text-[color:var(--dp-text-60)] hover:bg-[color:var(--dp-hover-bg)] hover:text-[color:var(--dp-text-hover)]"\n                  data-testid="button-toggle-configure-theme"\n                  title={panelTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}\n                  aria-label={panelTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}\n                >\n                  {panelTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}\n                </Button>\n                <Button\n                  variant="ghost"\n                  size="icon"\n                  onClick={onClose}\n                  className="text-[color:var(--dp-text-60)] hover:bg-[color:var(--dp-hover-bg)] hover:text-[color:var(--dp-text-hover)]"\n                  data-testid="button-close-configure"\n                >\n                  <X className="h-5 w-5" />\n                </Button>\n              </div>''',
    'Configure theme toggle/header row',
)

ctx = "client/src/contexts/CartContext.tsx"
replace_once(ctx, '  getItemPrice: (productId: string) => { price: number; hasDiscount: boolean };\n}', '  getItemPrice: (productId: string) => { price: number; hasDiscount: boolean };\n  panelTheme: "dark" | "light";\n  togglePanelTheme: () => void;\n}', 'CartContext interface theme fields')
replace_once(
    ctx,
    'const SAVED_KEY = "digerati-store-saved";\n',
    '''const SAVED_KEY = "digerati-store-saved";\nconst PANEL_THEME_KEY = "digerati-store-panel-theme";\n\nfunction readStoredPanelTheme(): "dark" | "light" {\n  try {\n    return localStorage.getItem(PANEL_THEME_KEY) === "light" ? "light" : "dark";\n  } catch {\n    return "dark";\n  }\n}\n''',
    'CartContext theme storage helper',
)
replace_once(ctx, '  const [announcement, setAnnouncement] = useState("");\n', '  const [announcement, setAnnouncement] = useState("");\n  const [panelTheme, setPanelTheme] = useState<"dark" | "light">(readStoredPanelTheme);\n', 'CartContext theme state')
replace_once(
    ctx,
    '''  const toggleCart = useCallback(() => {\n    setIsOpen((prev) => {\n      if (!prev) analytics.storeViewCart(getCartTotal(), getItemCount());\n      return !prev;\n    });\n  }, [getCartTotal, getItemCount]);\n''',
    '''  const toggleCart = useCallback(() => {\n    setIsOpen((prev) => {\n      if (!prev) analytics.storeViewCart(getCartTotal(), getItemCount());\n      return !prev;\n    });\n  }, [getCartTotal, getItemCount]);\n\n  const togglePanelTheme = useCallback(() => {\n    setPanelTheme((prev) => {\n      const next = prev === "dark" ? "light" : "dark";\n      try {\n        localStorage.setItem(PANEL_THEME_KEY, next);\n      } catch {\n        // best-effort persistence only\n      }\n      return next;\n    });\n  }, []);\n''',
    'CartContext togglePanelTheme action',
)
replace_once(ctx, '        toggleCart,\n        setClientPricing,', '        toggleCart,\n        panelTheme,\n        togglePanelTheme,\n        setClientPricing,', 'CartContext provider theme fields')

css = Path("client/src/index.css")
css_text = css.read_text(encoding='utf-8')
if '.de-panel[data-theme="light"] {' in css_text:
    raise SystemExit('Panel theme CSS already exists unexpectedly')
block = r'''

/*
 * Store panel theme tokens -- scoped to the cart drawer and configure-product
 * drawer ONLY (the ".de-panel" class), not the rest of the site. Joe wanted
 * to keep both looks rather than pick one, so this is a per-viewer toggle
 * (CartContext.panelTheme, persisted in localStorage) rather than a redesign.
 * Dark is the existing look and stays the default; [data-theme="light"]
 * overrides swap every token to its light equivalent in one place, so the
 * component markup only ever references the semantic var, never a literal
 * color for these tokens.
 */
.de-panel {
  --dp-panel-bg: #0a0a0a;
  --dp-card-bg: rgb(255 255 255 / 0.03);
  --dp-tint-bg: rgb(255 255 255 / 0.10);
  --dp-hover-bg: rgb(255 255 255 / 0.08);
  --dp-border-10: rgb(255 255 255 / 0.10);
  --dp-border-15: rgb(255 255 255 / 0.15);
  --dp-border-20: rgb(255 255 255 / 0.20);
  --dp-border-25: rgb(255 255 255 / 0.25);
  --dp-text-primary: #ffffff;
  --dp-text-hover: #ffffff;
  --dp-text-80: rgb(255 255 255 / 0.80);
  --dp-text-75: rgb(255 255 255 / 0.75);
  --dp-text-70: rgb(255 255 255 / 0.70);
  --dp-text-65: rgb(255 255 255 / 0.65);
  --dp-text-60: rgb(255 255 255 / 0.60);
  --dp-text-55: rgb(255 255 255 / 0.55);
  --dp-text-50: rgb(255 255 255 / 0.50);
  --dp-text-45: rgb(255 255 255 / 0.45);
  --dp-text-40: rgb(255 255 255 / 0.40);
  --dp-text-35: rgb(255 255 255 / 0.35);
  --dp-danger: #fca5a5;
  --dp-danger-hover-bg: rgb(239 68 68 / 0.10);
  --dp-warn-border: rgb(251 191 36 / 0.25);
  --dp-warn-bg: rgb(251 191 36 / 0.05);
  --dp-warn-text: #fde68a;
  --dp-success: #34d399;
}

.de-panel[data-theme="light"] {
  --dp-panel-bg: #ffffff;
  --dp-card-bg: #f8fafc;
  --dp-tint-bg: #f1f5f9;
  --dp-hover-bg: #f1f5f9;
  --dp-border-10: #e2e8f0;
  --dp-border-15: #cbd5e1;
  --dp-border-20: #cbd5e1;
  --dp-border-25: #cbd5e1;
  --dp-text-primary: #0f172a;
  --dp-text-hover: #0f172a;
  --dp-text-80: #334155;
  --dp-text-75: #475569;
  --dp-text-70: #475569;
  --dp-text-65: #475569;
  --dp-text-60: #64748b;
  --dp-text-55: #64748b;
  --dp-text-50: #64748b;
  --dp-text-45: #94a3b8;
  --dp-text-40: #94a3b8;
  --dp-text-35: #94a3b8;
  --dp-danger: #dc2626;
  --dp-danger-hover-bg: #fef2f2;
  --dp-warn-border: #fde68a;
  --dp-warn-bg: #fffbeb;
  --dp-warn-text: #b45309;
  --dp-success: #059669;
}

.de-panel-theme-toggle {
  transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease;
}
'''
css.write_text(css_text.rstrip() + block + '\n', encoding='utf-8')

for path in files:
    text = Path(path).read_text(encoding='utf-8')
    if 'text-[color:var(--dp-success)]/90' in text:
        raise SystemExit('Invalid success alpha form remains')
cart_text = Path(cart).read_text(encoding='utf-8')
cfg_text = Path(cfg).read_text(encoding='utf-8')
ctx_text = Path(ctx).read_text(encoding='utf-8')
assert cart_text.count('data-testid="button-toggle-cart-theme"') == 1
assert cfg_text.count('data-testid="button-toggle-configure-theme"') == 1
assert cart_text.count('data-theme={panelTheme}') == 1
assert cfg_text.count('data-theme={panelTheme}') == 1
assert ctx_text.count('const togglePanelTheme = useCallback') == 1
assert '.de-panel[data-theme="light"] {' in css.read_text(encoding='utf-8')
print('Fix 7 structural assertions passed')
