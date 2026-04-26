/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      { source: '/business.html',                    destination: '/business',                    permanent: true },
      { source: '/company-about.html',               destination: '/company/about',               permanent: true },
      { source: '/company-contact.html',             destination: '/company/contact',             permanent: true },
      { source: '/company-legal.html',               destination: '/company/legal',               permanent: true },
      { source: '/company-partnerships.html',        destination: '/company/partnerships',        permanent: true },
      { source: '/faq-comprehensive.html',           destination: '/faq/comprehensive',           permanent: true },
      { source: '/freya.html',                       destination: '/freya',                       permanent: true },
      { source: '/government.html',                  destination: '/government',                  permanent: true },
      { source: '/ngo.html',                         destination: '/ngo',                         permanent: true },
      { source: '/resources-documentation.html',     destination: '/resources/documentation',     permanent: true },
      { source: '/resources-help-center.html',       destination: '/resources/help-center',       permanent: true },
      { source: '/resources-partner-programme.html', destination: '/resources/partner-programme', permanent: true },
      { source: '/resources-webinars.html',          destination: '/resources/webinars',          permanent: true },
      { source: '/trust-audit-trail.html',           destination: '/trust/audit-trail',           permanent: true },
      { source: '/trust-human-approval.html',        destination: '/trust/human-approval',        permanent: true },
      { source: '/trust-role-based-control.html',    destination: '/trust/role-based-control',    permanent: true },
      { source: '/trust-security.html',              destination: '/trust/security',              permanent: true },
    ];
  },
};

export default nextConfig;
