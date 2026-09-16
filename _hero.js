const { chromium } = require('playwright');
const OUT='/tmp/claude-0/-home-user-plarix-website/e3019c87-5633-5b7d-916c-bd3a3f9dba48/scratchpad/shots';
(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox','--force-color-profile=srgb'] });
  const ctx = await b.newContext({ viewport:{width:1440,height:900}, deviceScaleFactor:2 });
  const p = await ctx.newPage();
  const bad=[]; p.on('response', r=>{ if(r.status()>=400) bad.push(r.status()+' '+r.url()); });
  await p.goto('http://127.0.0.1:3212',{waitUntil:'networkidle'});
  for (const [i,ms] of [[1,1500],[2,5000],[3,7000]]) { await p.waitForTimeout(ms); await p.screenshot({path:`${OUT}/hero-t${i}.png`}); }
  console.log('bad responses:', bad);
  await b.close();
})();
