const { chromium } = require('playwright');
const fs = require('fs');
const OUT='/tmp/claude-0/-home-user-plarix-website/e3019c87-5633-5b7d-916c-bd3a3f9dba48/scratchpad/shots';
fs.mkdirSync(OUT,{recursive:true});
const URL='http://127.0.0.1:3214';

const anchors = ['processes','method','start','pricing','faq','count'];

(async () => {
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox','--force-color-profile=srgb'] });

  for (const [name, vp, dsf] of [['d',{width:1440,height:900},2], ['m',{width:390,height:844},2]]) {
    const ctx = await b.newContext({ viewport:vp, deviceScaleFactor:dsf });
    const p = await ctx.newPage();
    const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.goto(URL,{waitUntil:'networkidle'});
    await p.waitForTimeout(2500);
    await p.screenshot({path:`${OUT}/${name}-hero.png`});

    // the sections that have no anchor
    await p.evaluate(()=>window.scrollTo(0, window.innerHeight*1.02));
    await p.waitForTimeout(1000);
    await p.screenshot({path:`${OUT}/${name}-after.png`});

    for (const a of anchors) {
      await p.evaluate(id=>{const el=document.getElementById(id); if(el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 20);}, a);
      await p.waitForTimeout(1000);
      await p.screenshot({path:`${OUT}/${name}-${a}.png`});
    }
    // refusals sits between start and pricing with no id
    await p.evaluate(()=>{const el=document.getElementById('start'); window.scrollTo(0, el.getBoundingClientRect().top+window.scrollY+el.offsetHeight-40);});
    await p.waitForTimeout(1000);
    await p.screenshot({path:`${OUT}/${name}-refusals.png`});

    await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(900);
    await p.screenshot({path:`${OUT}/${name}-footer.png`});

    const ov = await p.evaluate(()=>({doc:document.documentElement.scrollWidth, win:window.innerWidth}));
    console.log(`[${name}] overflow=${JSON.stringify(ov)} errors=${errs.length?JSON.stringify(errs):'none'}`);
    await ctx.close();
  }
  await b.close();
})();
