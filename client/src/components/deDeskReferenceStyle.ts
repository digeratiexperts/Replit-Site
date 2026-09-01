export const DE_DESK_REFERENCE_STYLE = String.raw`
  .de-desk-shell {
    --desk-shell: #fbfbfa !important;
    --desk-shell-soft: #f4f3f1 !important;
    --desk-shell-border: rgba(15,15,18,0.12) !important;
    --desk-shell-border-strong: rgba(15,15,18,0.22) !important;
    --desk-shell-text: #111116 !important;
    --desk-shell-muted: #5e5b66 !important;
    --desk-shell-dim: #807b88 !important;
    --desk-paper: #fbfbfa !important;
    --desk-well: #f7f5f2 !important;
    --desk-surface: #ffffff !important;
    --desk-box: #ffffff !important;
    --desk-inset: #f7f5f2 !important;
    --desk-border: rgba(15,15,18,0.12) !important;
    --desk-border-strong: rgba(15,15,18,0.22) !important;
    --desk-ink: #111116 !important;
    --desk-ink-muted: #5e5b66 !important;
    --desk-ink-dim: #807b88 !important;
    color-scheme: light !important;
    background: #fbfbfa !important;
    border: 1px solid rgba(15,15,18,0.12) !important;
    border-radius: 24px !important;
    box-shadow: 0 26px 72px rgba(9,9,16,0.24), 0 6px 22px rgba(9,9,16,0.10) !important;
    color: #111116 !important;
  }

  .de-desk-tabs { display: none !important; }
  .de-desk-avatar-dot { display: none !important; }

  .de-desk-head {
    padding: 20px 20px 12px !important;
    background: transparent !important;
  }
  .de-desk-avatar {
    background: #ffffff !important;
    color: #111116 !important;
    border: 1px solid rgba(15,15,18,0.15) !important;
    box-shadow: 0 5px 16px rgba(15,15,18,0.08) !important;
  }
  .de-desk-id h2,
  .de-desk-id p,
  .de-desk-msg-who strong,
  .de-desk-tools-intro h3,
  .de-desk-tools-intro p,
  .de-desk-ticket-lead h3,
  .de-desk-ticket-lead p,
  .de-desk-launch-heading,
  .de-desk-discover-intro h3,
  .de-desk-discover-intro p,
  .de-desk-field label,
  .de-desk-urgency-label,
  .de-desk-composer-caption,
  .de-desk-form-phone {
    color: #111116 !important;
  }
  .de-desk-id p,
  .de-desk-ticket-lead p,
  .de-desk-discover-intro p,
  .de-desk-tools-intro p,
  .de-desk-composer-caption {
    color: #65616c !important;
  }
  .de-desk-close {
    color: #111116 !important;
    border: 1px solid rgba(15,15,18,0.10) !important;
    background: transparent !important;
  }
  .de-desk-close:hover {
    color: #000 !important;
    background: #f2f1ef !important;
    border-color: rgba(15,15,18,0.18) !important;
  }

  .de-desk-body,
  .de-desk-panel,
  .de-desk-scroll {
    background: transparent !important;
  }
  .de-desk-scroll {
    padding: 12px 20px 20px !important;
  }
  .de-desk-scroll::-webkit-scrollbar-thumb {
    background: rgba(15,15,18,0.18) !important;
  }

  .de-desk-hero,
  .de-desk-form,
  .de-desk-discover-list,
  .de-desk-tools-list,
  .de-desk-tools-now,
  .de-desk-security-escape {
    background: #ffffff !important;
    border-color: rgba(15,15,18,0.11) !important;
    color: #111116 !important;
    box-shadow: 0 10px 30px -24px rgba(15,15,18,0.34) !important;
  }

  .de-desk-msg-id,
  .de-desk-chip-icon,
  .de-desk-discover-icon,
  .de-desk-tool-icon,
  .de-desk-incident-icon,
  .de-desk-issue-icon {
    background: #f7f5f2 !important;
    border-color: rgba(15,15,18,0.10) !important;
    color: #111116 !important;
  }

  .de-desk-bubble.is-bot,
  .de-desk-bubble:not(.is-user) {
    background: #ffffff !important;
    color: #17141f !important;
    border: 1px solid rgba(15,15,18,0.10) !important;
    box-shadow: 0 8px 24px -20px rgba(15,15,18,0.30) !important;
  }
  .de-desk-bubble.is-user {
    background: #111116 !important;
    color: #ffffff !important;
    border-color: #111116 !important;
  }
  .de-desk-msg-time,
  .de-desk-msg-who em {
    color: #77727f !important;
  }

  .de-desk-discover-row,
  .de-desk-chip,
  .de-desk-tool-link,
  .de-desk-incident,
  .de-desk-issue-row,
  .de-desk-row {
    background: #ffffff !important;
    color: #17141f !important;
    border-color: rgba(15,15,18,0.10) !important;
  }
  .de-desk-discover-row:hover,
  .de-desk-chip:hover,
  .de-desk-tool-link:hover,
  .de-desk-incident:hover,
  .de-desk-issue-row:hover,
  .de-desk-row:hover {
    background: #f8f7f5 !important;
    color: #111116 !important;
  }
  .de-desk-discover-label,
  .de-desk-chip-label,
  .de-desk-tool-title,
  .de-desk-issue-label,
  .de-desk-incident-copy strong,
  .de-desk-incident-copy span {
    color: #17141f !important;
  }
  .de-desk-incident-copy span { color: #696470 !important; }
  .de-desk-discover-arrow,
  .de-desk-chip-arrow,
  .de-desk-tool-arrow,
  .de-desk-issue-arrow,
  .de-desk-incident-arrow {
    color: #4f4b56 !important;
  }

  .de-desk-shell .de-desk-input,
  .de-desk-shell input,
  .de-desk-shell textarea,
  .de-desk-shell select {
    background-color: #ffffff !important;
    background-image: none !important;
    color: #17141f !important;
    border-color: rgba(15,15,18,0.14) !important;
    -webkit-text-fill-color: #17141f !important;
  }
  .de-desk-shell input::placeholder,
  .de-desk-shell textarea::placeholder {
    color: #8a8591 !important;
    -webkit-text-fill-color: #8a8591 !important;
  }
  /* The dark shell's hover/focus/invalid field states repaint an opaque
     graphite gradient; in the light treatment that read as a solid black bar.
     Match those selectors so fields stay white in every state. */
  .de-desk-shell .de-desk-input:hover:not(:focus):not([aria-invalid="true"]) {
    background-color: #ffffff !important;
    background-image: none !important;
    border-color: rgba(15,15,18,0.30) !important;
    box-shadow: 0 1px 3px rgba(15,15,18,0.08) !important;
  }
  .de-desk-shell .de-desk-input:focus,
  .de-desk-shell .de-desk-input:focus-visible {
    background-color: #ffffff !important;
    background-image: none !important;
    border-color: #D3126A !important;
    box-shadow: 0 0 0 3px rgba(211,18,106,0.16) !important;
  }
  .de-desk-shell .de-desk-input[aria-invalid="true"] {
    background-color: #ffffff !important;
    background-image: none !important;
    border-color: #f0455b !important;
  }
  .de-desk-input-wrap > svg { color: #615d68 !important; }

  .de-desk-urgency {
    background: #f3f2f0 !important;
    border-color: rgba(15,15,18,0.10) !important;
  }
  .de-desk-urgency button { color: #5e5a64 !important; }
  .de-desk-urgency button:hover { background: #ffffff !important; color: #111116 !important; }
  .de-desk-urgency button.is-on {
    background: #111116 !important;
    color: #ffffff !important;
    box-shadow: none !important;
  }

  .de-desk-composer {
    margin: 0 20px 8px !important;
    background: #ffffff !important;
    border: 1px solid rgba(15,15,18,0.12) !important;
    box-shadow: 0 8px 24px -20px rgba(15,15,18,0.25) !important;
  }
  .de-desk-composer input {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }
  .de-desk-composer:focus-within {
    border-color: #D3126A !important;
    box-shadow: 0 0 0 3px rgba(211,18,106,0.14), 0 8px 24px -20px rgba(15,15,18,0.25) !important;
  }
  /* Desk design rule: magenta stays on send + primary CTAs even in the light
     treatment (white/black/graphite everywhere else). */
  .de-desk-send {
    background: #D3126A !important;
    color: #ffffff !important;
    box-shadow: 0 8px 18px -10px rgba(211,18,106,0.55) !important;
  }
  .de-desk-send:hover { background: #bd105f !important; }
  .de-desk-send:disabled { box-shadow: none !important; }
  .de-desk-composer-caption { padding: 0 20px 16px !important; }

  .de-desk-btn-grad {
    background: #D3126A !important;
    color: #ffffff !important;
    border-color: #D3126A !important;
    box-shadow: 0 10px 24px -14px rgba(211,18,106,0.6) !important;
  }
  .de-desk-btn-grad:hover {
    background: #bd105f !important;
    color: #ffffff !important;
  }

  .de-desk-signin,
  .de-desk-security-action {
    background: #111116 !important;
    color: #ffffff !important;
    border-color: #111116 !important;
    box-shadow: none !important;
  }
  .de-desk-signin:hover,
  .de-desk-security-action:hover {
    background: #2a2830 !important;
    color: #ffffff !important;
  }

  .de-desk-perk-list,
  .de-desk-perk-list li,
  .de-desk-route-note,
  .de-desk-more-toggle,
  .de-desk-field-error,
  .de-desk-form-error,
  .de-desk-login-hint,
  .de-desk-signin-alt {
    color: #68636f !important;
  }
  .de-desk-signin-alt:hover { color: #111116 !important; }
  .de-desk-login .de-desk-form-error {
    background: #fdf2f5 !important;
    border-color: rgba(211,18,106,0.28) !important;
    color: #8f1035 !important;
  }

  @media (max-width: 639px) {
    .de-desk-shell {
      border-radius: 22px !important;
    }
    .de-desk-head { padding: 16px 16px 10px !important; }
    .de-desk-scroll { padding-left: 16px !important; padding-right: 16px !important; }
    .de-desk-composer { margin-left: 16px !important; margin-right: 16px !important; }
    .de-desk-composer-caption { padding-left: 16px !important; padding-right: 16px !important; }
  }
`;
