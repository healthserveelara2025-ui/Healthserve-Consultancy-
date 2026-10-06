const http = require('http');
const fs = require('fs');
const assert = require('assert');

async function testHttp() {
  console.log('--- Testing HTTP Endpoints ---');

  // 1. GET /api/leads should return 403
  await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:8080/api/leads', (res) => {
      console.log('GET /api/leads status:', res.statusCode);
      assert.strictEqual(res.statusCode, 403, 'GET /api/leads must be 403 Forbidden');
      resolve();
    }).on('error', reject);
  });

  // 2. POST /api/leads with Sharjah (SHA)
  const leadPayload = JSON.stringify({
    name: 'Sarah Connor',
    whatsapp: '+971501234567',
    profession: 'Registered Nurse',
    destination: 'Sharjah (SHA)',
    experience: '5-7 Years',
    education: 'Bachelor Degree',
    status: 'Ready to Start'
  });

  await new Promise((resolve, reject) => {
    const req = http.request('http://127.0.0.1:8080/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(leadPayload)
      }
    }, (res) => {
      console.log('POST /api/leads status:', res.statusCode);
      assert.strictEqual(res.statusCode, 200, 'POST /api/leads must return 200');
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        assert.strictEqual(body.status, 'success');
        assert.strictEqual(body.recorded, true);
        console.log('POST /api/leads response:', body);
        resolve();
      });
    });
    req.on('error', reject);
    req.write(leadPayload);
    req.end();
  });

  // 3. Verify leads.json contains the SHA lead
  const leads = JSON.parse(fs.readFileSync('leads.json', 'utf8'));
  const foundLead = leads.find(l => l.name === 'Sarah Connor' && l.destination === 'Sharjah (SHA)');
  assert(foundLead, 'Lead with Sharjah (SHA) destination must be recorded in leads.json');
  console.log('Verified lead recorded in leads.json:', foundLead);

  // 4. POST /api/reviews with sanitized input
  const reviewPayload = JSON.stringify({
    name: 'Dr. Tariq Al-Hashimi',
    profession: 'Specialist Physician',
    country: 'Jordan',
    rating: 5,
    category: 'Licensing',
    review: 'Consulted on Sharjah Health Authority (SHA) assessment certificate and licensing process. Clear guidance on practice requirements.'
  });

  await new Promise((resolve, reject) => {
    const req = http.request('http://127.0.0.1:8080/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(reviewPayload)
      }
    }, (res) => {
      console.log('POST /api/reviews status:', res.statusCode);
      assert.strictEqual(res.statusCode, 200, 'POST /api/reviews must return 200');
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        assert.strictEqual(body.status, 'success');
        assert.strictEqual(body.recorded, true);
        resolve();
      });
    });
    req.on('error', reject);
    req.write(reviewPayload);
    req.end();
  });

  // 5. GET /api/reviews returns review list
  await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:8080/api/reviews', (res) => {
      console.log('GET /api/reviews status:', res.statusCode);
      assert.strictEqual(res.statusCode, 200);
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        assert(Array.isArray(body.reviews), 'Reviews response must be array');
        console.log('GET /api/reviews returned count:', body.count);
        resolve();
      });
    }).on('error', reject);
  });

  console.log('--- All HTTP tests passed! ---');
}

function testCodeConsistency() {
  console.log('--- Testing Code Consistency ---');

  // Check file mirroring
  const appJs = fs.readFileSync('app.js', 'utf8');
  const jsAppJs = fs.readFileSync('js/app.js', 'utf8');
  assert.strictEqual(appJs, jsAppJs, 'app.js and js/app.js must be identical');

  const stylesCss = fs.readFileSync('styles.css', 'utf8');
  const cssStylesCss = fs.readFileSync('css/styles.css', 'utf8');
  assert.strictEqual(stylesCss, cssStylesCss, 'styles.css and css/styles.css must be identical');

  const revJs = fs.readFileSync('reviews-data.js', 'utf8');
  const jsRevJs = fs.readFileSync('js/reviews-data.js', 'utf8');
  assert.strictEqual(revJs, jsRevJs, 'reviews-data.js and js/reviews-data.js must be identical');

  // Check index.html requirements
  const indexHtml = fs.readFileSync('index.html', 'utf8');

  // 1. Hero trust row
  assert(indexHtml.includes('DHA · DOH · SHA · MOHAP'), 'Hero trust badge row must include SHA');

  // 2. Hero pills
  assert(indexHtml.includes('SHA (Sharjah)'), 'Hero regulator pills must include SHA (Sharjah)');

  // 3. #hookDest ordering
  const selectStart = indexHtml.indexOf('<select id="hookDest"');
  const selectEnd = indexHtml.indexOf('</select>', selectStart);
  const selectBlock = indexHtml.substring(selectStart, selectEnd);

  const expectedOrder = [
    'Dubai (DHA — Sheryan)',
    'Abu Dhabi (DOH)',
    'Sharjah (SHA)',
    'MOHAP (UAE)',
    'Saudi Arabia (SCFHS)',
    'Qatar (DHP)',
    'Bahrain (NHRA)',
    'Oman (OMSB)'
  ];
  let lastIdx = -1;
  for (const opt of expectedOrder) {
    const idx = selectBlock.indexOf(opt);
    assert(idx > -1, `Option ${opt} missing from hookDest in index.html`);
    assert(idx > lastIdx, `Option ${opt} is not in correct sequence in hookDest`);
    lastIdx = idx;
  }
  console.log('Verified #hookDest 8-authority order in index.html');

  // 4. Destination nav tabs
  assert(indexHtml.includes('data-dest="sha"'), 'Destination nav tab data-dest="sha" present');

  // 5. FAQ section
  assert(indexHtml.includes('faqAns4a'), 'FAQ item 4a present');
  assert(indexHtml.includes('faqAns4b'), 'FAQ item 4b present');
  assert(indexHtml.includes('faqAns4c'), 'FAQ item 4c present');
  assert(indexHtml.includes('faqAns4d'), 'FAQ item 4d present');

  // 6. JSON-LD schema
  assert(indexHtml.includes('Sharjah Health Authority (SHA)'), 'JSON-LD schema contains SHA');

  // 7. Check app.js SHA logic
  assert(appJs.includes('getAuthorityCode'), 'getAuthorityCode function present in app.js');
  assert(appJs.includes("'SHA'"), 'SHA code mapping present in app.js');
  assert(appJs.includes('Explore SHA Pathway →'), 'CTA text Explore SHA Pathway present');
  assert(appJs.includes('escapeHtml'), 'escapeHtml helper present in app.js');

  console.log('--- All Code Consistency tests passed! ---');
}

(async () => {
  try {
    testCodeConsistency();
    await testHttp();
    console.log('ALL AUDIT TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('TEST FAILED:', err);
    process.exit(1);
  }
})();
