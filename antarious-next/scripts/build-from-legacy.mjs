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
  ['index.html', 'app/route.js', 'data/html/home.js'],
  ['business.html', 'app/business/route.js', 'data/html/business.js'],
  ['government.html', 'app/government/route.js', 'data/html/government.js'],
  ['ngo.html', 'app/ngo/route.js', 'data/html/ngo.js'],
  ['freya.html', 'app/freya/route.js', 'data/html/freya.js'],
  ['company-about.html', 'app/company/about/route.js', 'data/html/company-about.js'],
  ['company-contact.html', 'app/company/contact/route.js', 'data/html/company-contact.js'],
  ['company-legal.html', 'app/company/legal/route.js', 'data/html/company-legal.js'],
  ['company-partnerships.html', 'app/company/partnerships/route.js', 'data/html/company-partnerships.js'],
  ['faq-comprehensive.html', 'app/faq/comprehensive/route.js', 'data/html/faq-comprehensive.js'],
  ['resources-documentation.html', 'app/resources/documentation/route.js', 'data/html/resources-documentation.js'],
  ['resources-help-center.html', 'app/resources/help-center/route.js', 'data/html/resources-help-center.js'],
  ['resources-partner-programme.html', 'app/resources/partner-programme/route.js', 'data/html/resources-partner-programme.js'],
  ['resources-webinars.html', 'app/resources/webinars/route.js', 'data/html/resources-webinars.js'],
  ['trust-audit-trail.html', 'app/trust/audit-trail/route.js', 'data/html/trust-audit-trail.js'],
  ['trust-human-approval.html', 'app/trust/human-approval/route.js', 'data/html/trust-human-approval.js'],
  ['trust-role-based-control.html', 'app/trust/role-based-control/route.js', 'data/html/trust-role-based-control.js'],
  ['trust-security.html', 'app/trust/security/route.js', 'data/html/trust-security.js']
];

function stripBom(value) {
  return value.replace(/^\uFEFF/, '');
}

function escapeTemplate(value) {
  return value.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function extract(pattern, source, label) {
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Missing ${label}`);
  }
  return match[1];
}

function rewriteUrl(value) {
  if (!value) return value;
  if (value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('http://') || value.startsWith('https://') || value.startsWith('#')) {
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

function injectThemeBootScript(input) {
  const themeScript = `<script>(function(){try{var storedTheme=localStorage.getItem('antarious-theme');document.documentElement.dataset.theme=storedTheme==='dark'?'dark':'light';}catch(error){document.documentElement.dataset.theme='light';}})();</script>`;
  return input.replace(/<\/head>/i, `${themeScript}</head>`);
}

async function writeFile(relativePath, contents) {
  const fullPath = path.join(appRoot, relativePath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, contents);
}

function buildDataModule({ html }) {
  return `const html = \`${escapeTemplate(html)}\`;

export default html;
`;
}

function buildRouteModule(dataImport) {
  return `import html from '${dataImport}';

function response(body) {
  return new Response(body, {
    headers: {
      'content-type': 'text/html; charset=utf-8'
    }
  });
}

export async function GET() {
  return response(html);
}

export async function HEAD() {
  return response('');
}
`;
}

for (const [sourceFile, routeFile, dataFile] of pages) {
  const html = stripBom(await fs.readFile(path.join(repoRoot, sourceFile), 'utf8'));
  const cleanedHtml = injectThemeBootScript(rewriteQuotedLiterals(rewriteAttributeUrls(html)));

  await writeFile(dataFile, buildDataModule({ html: cleanedHtml }));

  await writeFile(routeFile, buildRouteModule(`@/${dataFile}`));
}
