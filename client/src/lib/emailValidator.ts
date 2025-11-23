// Corporate email validator - blocks personal email providers
const BLOCKED_PERSONAL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'mail.com',
  'protonmail.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'ymail.com',
  'rocketmail.com',
  'juno.com',
  'comcast.net',
  'verizon.net',
  'att.net',
  'cox.net',
  'charter.net',
  'frontier.com',
  'sbcglobal.net',
  'bellsouth.net',
  'earthlink.net',
  'msn.com',
  'live.com',
  'aim.com',
  'icq.com',
  'mail.ru',
  '163.com',
  'qq.com',
  'sina.com',
];

export function isValidCorporateEmail(email: string): boolean {
  if (!email || !email.includes('@')) {
    return false;
  }

  const domain = email.split('@')[1].toLowerCase();
  return !BLOCKED_PERSONAL_DOMAINS.includes(domain);
}

export function getCorporateEmailError(email: string): string | null {
  if (!email) {
    return 'Email is required';
  }
  
  if (!email.includes('@')) {
    return 'Please enter a valid email address';
  }

  const domain = email.split('@')[1].toLowerCase();
  if (BLOCKED_PERSONAL_DOMAINS.includes(domain)) {
    return `Please use your company email address, not ${domain}`;
  }

  return null;
}
