import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(appRoot, '..');

const routes = {
  'index.html': '/',
  'business.html': '/business',
  'government.html': '/government',
  'ngo.html': '/ngo',
  'freya.html': '/freya',
  'company-about.html': '/company/about',
  'company-contact.html': '/company/contact',
  'company-legal.html': '/company/legal',
  'company-partnerships.html': '/company/partnerships',
  'faq-comprehensive.html': '/faq/comprehensive',
  'resources-documentation.html': '/resources/documentation',
  'resources-help-center.html': '/resources/help-center',
  'resources-partner-programme.html': '/resources/partner-programme',
  'resources-webinars.html': '/resources/webinars',
  'trust-audit-trail.html': '/trust/audit-trail',
  'trust-human-approval.html': '/trust/human-approval',
  'trust-role-based-control.html': '/trust/role-based-control',
  'trust-security.html': '/trust/security'
};

const pages = [
  ['index.html', 'data/html/home.js'],
  ['business.html', 'data/html/business.js'],
  ['government.html', 'data/html/government.js'],
  ['ngo.html', 'data/html/ngo.js'],
  ['freya.html', 'data/html/freya.js'],
  ['company-about.html', 'data/html/company-about.js'],
  ['company-contact.html', 'data/html/company-contact.js'],
  ['company-legal.html', 'data/html/company-legal.js'],
  ['company-partnerships.html', 'data/html/company-partnerships.js'],
  ['faq-comprehensive.html', 'data/html/faq-comprehensive.js'],
  ['resources-documentation.html', 'data/html/resources-documentation.js'],
  ['resources-help-center.html', 'data/html/resources-help-center.js'],
  ['resources-partner-programme.html', 'data/html/resources-partner-programme.js'],
  ['resources-webinars.html', 'data/html/resources-webinars.js'],
  ['trust-audit-trail.html', 'data/html/trust-audit-trail.js'],
  ['trust-human-approval.html', 'data/html/trust-human-approval.js'],
  ['trust-role-based-control.html', 'data/html/trust-role-based-control.js'],
  ['trust-security.html', 'data/html/trust-security.js']
];

const injectedThemeScript = '<script>(function(){try{var storedTheme=localStorage.getItem(\'antarious-theme\');document.documentElement.dataset.theme=storedTheme===\'dark\'?\'dark\':\'light\';}catch(error){document.documentElement.dataset.theme=\'light\';}})();</script>';

function stripBom(value) {
  return value.replace(/^\uFEFF/, '');
}

function extractGeneratedHtml(moduleSource) {
  const match = moduleSource.match(/const html = `([\s\S]*)`;\s*export default html;\s*$/m);
  if (!match) {
    throw new Error('Unable to extract HTML payload from generated module.');
  }

  // Reverse the escape order used by scripts/build-from-legacy.mjs
  return match[1]
    .replace(/\\\$\{/g, '${')
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\');
}

function rewriteUrl(value) {
  if (!value) return value;
  if (
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('#')
  ) {
    return value;
  }

  if (value.startsWith('assets/')) {
    return `/${value}`;
  }

  const [pathname, hash] = value.split('#');
  const nextRoute = routes[pathname];
  if (nextRoute) {
    return hash ? `${nextRoute}#${hash}` : nextRoute;
  }

  return value;
}

function rewriteAttributeUrls(input) {
  return input.replace(/\b(href|src|data-light-logo|data-dark-logo)=("([^"]*)"|'([^']*)')/g, (match, attr, wrapped, dq, sq) => {
    const raw = dq ?? sq ?? '';
    const next = rewriteUrl(raw);
    const quote = wrapped[0];
    return `${attr}=${quote}${next}${quote}`;
  });
}

function rewriteQuotedLiterals(input) {
  let output = input;

  Object.entries(routes).forEach(([legacyPath, nextRoute]) => {
    output = output.replaceAll(`'${legacyPath}'`, `'${nextRoute}'`);
    output = output.replaceAll(`"${legacyPath}"`, `"${nextRoute}"`);
    output = output.replaceAll(`'${legacyPath}#`, `'${nextRoute}#`);
    output = output.replaceAll(`"${legacyPath}#`, `"${nextRoute}#`);
  });

  output = output.replaceAll("'assets/", "'/assets/");
  output = output.replaceAll('"assets/', '"/assets/');

  return output;
}

function normalizeForCompare(input) {
  return input
    .replace(/\r\n?/g, '\n')
    .replace(injectedThemeScript, '')
    .replace(/^[\t ]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function fingerprint(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function describeFirstDiff(a, b) {
  const limit = Math.min(a.length, b.length);
  let i = 0;
  while (i < limit && a[i] === b[i]) {
    i += 1;
  }

  if (i === limit && a.length === b.length) {
    return null;
  }

  const start = Math.max(0, i - 120);
  const endA = Math.min(a.length, i + 120);
  const endB = Math.min(b.length, i + 120);

  return {
    index: i,
    expectedSnippet: a.slice(start, endA),
    actualSnippet: b.slice(start, endB)
  };
}

async function checkPage([legacyFile, generatedModule]) {
  const legacyPath = path.join(repoRoot, legacyFile);
  const generatedPath = path.join(appRoot, generatedModule);

  const legacyRaw = stripBom(await fs.readFile(legacyPath, 'utf8'));
  const generatedRaw = stripBom(await fs.readFile(generatedPath, 'utf8'));

  const legacyCanonical = normalizeForCompare(rewriteQuotedLiterals(rewriteAttributeUrls(legacyRaw)));
  const generatedCanonical = normalizeForCompare(extractGeneratedHtml(generatedRaw));

  const expectedHash = fingerprint(legacyCanonical);
  const actualHash = fingerprint(generatedCanonical);

  if (expectedHash === actualHash) {
    return { legacyFile, generatedModule, ok: true };
  }

  const diff = describeFirstDiff(legacyCanonical, generatedCanonical);
  return {
    legacyFile,
    generatedModule,
    ok: false,
    expectedHash,
    actualHash,
    diff
  };
}

async function main() {
  const results = await Promise.all(pages.map(checkPage));
  const failed = results.filter((result) => !result.ok);

  if (failed.length === 0) {
    console.log(`Parity check passed for ${results.length} pages.`);
    process.exit(0);
  }

  console.error(`Parity check failed for ${failed.length}/${results.length} pages.`);
  failed.forEach((result) => {
    console.error(`\n- ${result.legacyFile} -> ${result.generatedModule}`);
    console.error(`  expected: ${result.expectedHash}`);
    console.error(`  actual:   ${result.actualHash}`);
    if (result.diff) {
      console.error(`  first diff index: ${result.diff.index}`);
      console.error('  expected snippet:');
      console.error(result.diff.expectedSnippet);
      console.error('  actual snippet:');
      console.error(result.diff.actualSnippet);
    }
  });

  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
