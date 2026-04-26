import html from '@/data/html/trust-human-approval.js';

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
