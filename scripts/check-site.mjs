import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=process.cwd();
const required=['index.html','style.css','app.js','sw.js','offline.html','manifest.webmanifest','icon.svg','robots.txt','sitemap.xml','data/sports-data.json','data/articles.json','data/gallery.json','data/locales.json','assets/fonts/montserrat-latin-wght-normal.woff2','assets/fonts/montserrat-latin-wght-italic.woff2','assets/fonts/OFL.txt'];
for(const file of required)assert.ok(fs.existsSync(path.join(root,file)),'Missing file: '+file);

const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const sports=JSON.parse(fs.readFileSync(path.join(root,'data/sports-data.json'),'utf8'));
const articles=JSON.parse(fs.readFileSync(path.join(root,'data/articles.json'),'utf8'));
const gallery=JSON.parse(fs.readFileSync(path.join(root,'data/gallery.json'),'utf8'));
const locales=JSON.parse(fs.readFileSync(path.join(root,'data/locales.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));

assert.match(html,/id="main"/,'Main landmark missing');
assert.match(html,/rel="manifest"/,'PWA manifest not linked');
assert.ok(html.includes('rel="icon" href="./icon.svg?v=3"'),'Versioned SVG favicon must be linked');
assert.ok(manifest.icons[0].src.includes('icon.svg?v=3'),'PWA manifest must use the branded favicon');
assert.ok(sw.includes('rugbyxvnews-v7'),'Service worker cache must be bumped after favicon updates');
assert.ok(sw.includes('icon.svg?v=3'),'Versioned favicon must be included in the offline cache');

assert.match(html,/data-lang-toggle/,'Language switch missing');
assert.match(html,/data-theme-toggle/,'Theme switch missing');
assert.ok(html.includes('<a class="nav-podcast-cta" data-nav="media" href="?view=podcasts">Podcasts</a>'),'Podcasts CTA must stay outside the collapsible navigation list');
assert.ok(!html.includes('<li class="nav-podcast">'),'Podcasts CTA must not be hidden inside the collapsed menu');
assert.match(app,/function initNavigation\(\)/,'Navigation must have a dedicated early initializer');
assert.match(app,/initThemeToggle\(\);\s*initNavigation\(\);\s*await Promise\.all/,'Navigation and theme controls must work before asynchronous content loads');
assert.match(css,/\.nav-podcast-cta\{[^}]*display:inline-flex/s,'Podcasts CTA must remain visible beside navigation tools');
assert.match(css,/\.nav-tools\{[^}]*flex:0 0 auto/s,'Navigation tools must not shrink or disappear');
assert.match(fs.readFileSync(path.join(root,'icon.svg'),'utf8'),/stroke="#FFFFFF"/,'Favicon monogram must use high-contrast brand white');
assert.match(html,/name="viewport"/,'Viewport meta missing');
assert.match(html,/style\.css/,'Stylesheet not linked');
assert.match(html,/app\.js/,'Application script not linked');
assert.match(css,/@media\(max-width:390px\)/,'Small phone breakpoint missing');
assert.match(css,/@media\(max-width:820px\)/,'Tablet/mobile breakpoint missing');
assert.match(css,/prefers-reduced-motion/,'Reduced motion support missing');
assert.match(css,/:focus-visible/,'Visible keyboard focus missing');
assert.match(css,/@media print/,'Print stylesheet missing');
assert.match(app,/async function loadEditorialData/,'Editorial data loader missing');
assert.match(app,/function renderLive/,'Live centre missing');
assert.match(app,/function renderCompetition/,'Competition pages missing');
assert.match(app,/function renderArticle/,'Article page missing');
assert.match(app,/function applyTheme/,'Theme handler missing');
assert.match(app,/function initThemeToggle\(\)/,'Theme control must be initialized independently of asynchronous data loading');
assert.match(app,/applyTheme\(initialTheme,false\);\s*initThemeToggle\(\);\s*await Promise\.all/,'Theme control must be wired before data loaders');
assert.doesNotMatch(app,/const theme=e\.target\.closest\('\[data-theme-toggle\]'\)/,'Theme control must not be double-bound through delegated clicks');
assert.match(css,/@media\(max-width:1150px\)/,'Compact navigation breakpoint missing');
assert.match(css,/\.nav-tools\{[^}]*flex:0 0 auto/s,'Navigation preferences must not shrink into adjacent links');
assert.match(sw,/rugbyxvnews-v6/,'Service worker cache must be bumped after core UI fixes');
assert.match(app,/function applySiteLanguage/,'Language handler missing');
assert.match(app,/localStorage\.setItem\('rxn-lang'/,'Language preference persistence missing');
assert.match(app,/localStorage\.setItem\('rxn-theme'/,'Theme preference persistence missing');
assert.match(app,/themeButton\.addEventListener\('click'/,'Theme control must have a direct click handler');
assert.match(app,/function renderMatch/,'Match detail page missing');
assert.match(app,/const clubs=q\?/,'Universal club search missing');
assert.match(app,/const players=q\?/,'Universal player search missing');
assert.match(sw,/endsWith\('\.json'\)/,'Sports JSON should use network-first caching');
assert.ok(Array.isArray(sports.competitions),'Sports competitions must be an array');
assert.ok(Array.isArray(articles.articles),'Articles must be an array');
assert.ok(Array.isArray(gallery.items),'Gallery items must be an array');
assert.ok(locales.ui&&Object.keys(locales.ui).length>100,'English UI translation catalogue missing');
assert.ok(locales.articleTranslations&&Object.keys(locales.articleTranslations).length>=articles.articles.length,'English article translations are incomplete');
assert.ok(locales.competitionTranslations&&Object.keys(locales.competitionTranslations).length===4,'English competition translations missing');
assert.ok(sw.includes('data/locales.json'),'English locale should be cached');
assert.match(css,/body\[data-theme=dark\]/,'Dark palette missing');
assert.match(css,/--rxn-violet:\s*#5533EC/i,'Official brand violet token missing');
assert.match(css,/--rxn-black:\s*#111111/i,'Official black token missing');
assert.match(css,/--rxn-white:\s*#FFFFFF/i,'Official white token missing');
assert.match(css,/@font-face[^}]*font-family:"Montserrat"/s,'Self-hosted Montserrat font face missing');
assert.match(css,/montserrat-latin-wght-normal\.woff2/,'Local normal Montserrat font missing');
assert.match(css,/montserrat-latin-wght-italic\.woff2/,'Local italic Montserrat font missing');
assert.doesNotMatch(html,/fonts\.googleapis\.com|fonts\.gstatic\.com/,'Google Fonts should not be requested');
assert.match(html,/assets\/fonts\/montserrat-latin-wght-normal\.woff2/,'Normal font preload missing');
assert.match(sw,/assets\/fonts\/montserrat-latin-wght-normal\.woff2/,'Offline normal font cache missing');
assert.match(sw,/assets\/fonts\/montserrat-latin-wght-italic\.woff2/,'Offline italic font cache missing');
assert.match(app,/const scoreMarkup=/,'Winner/loser score component missing');
assert.match(app,/const headline=/,'Violet headline highlight helper missing');
assert.match(app,/hero-media/,'Full-bleed hero media component missing');
assert.match(app,/let initialTheme='dark'/,'Dark-first boot default missing');
assert.match(css,/aspect-ratio:4\/5/,'Portrait image ratio missing');
assert.match(css,/--rxn-grey-bar:\s*#3C3C3C/i,'Official standings bar grey missing');
assert.equal(new Set(articles.articles.map(a=>a.id)).size,articles.articles.length,'Article IDs must be unique');
for(const article of articles.articles){
 assert.ok(article.id&&article.title&&article.category,'Article core fields are required');
 assert.ok(locales.articleTranslations[article.id]?.title,'English title missing for '+article.id);
 assert.ok(Array.isArray(article.sections),'Article sections must be an array');
}
for(const competition of sports.competitions||[]){
 assert.ok(Array.isArray(competition.matches),'Competition matches must be an array');
 assert.ok(Array.isArray(competition.standings),'Competition standings must be an array');
 for(const match of competition.matches){
  assert.ok(['scheduled','upcoming','live','finished','postponed'].includes(match.status),'Unknown match status');
  if(match.status==='live')assert.ok(match.updatedAt||competition.updatedAt||sports.updatedAt,'Live match needs an update timestamp');
 }
}
assert.equal(manifest.background_color,'#111111','PWA background must use official black');
assert.equal(manifest.theme_color,'#5533EC','PWA theme must use official violet');
assert.ok(manifest.start_url&&manifest.scope,'PWA start_url and scope required');
console.log('RugbyXVNews quality checks passed.');
