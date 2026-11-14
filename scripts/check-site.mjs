import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const root=process.cwd();
const required=['index.html','style.css','app.js','sw.js','offline.html','manifest.webmanifest','icon.svg','robots.txt','sitemap.xml','data/sports-data.json','data/articles.json','data/gallery.json'];
for(const file of required)assert.ok(fs.existsSync(path.join(root,file)),'Missing file: '+file);

const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'style.css'),'utf8');
const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
const sports=JSON.parse(fs.readFileSync(path.join(root,'data/sports-data.json'),'utf8'));
const articles=JSON.parse(fs.readFileSync(path.join(root,'data/articles.json'),'utf8'));
const gallery=JSON.parse(fs.readFileSync(path.join(root,'data/gallery.json'),'utf8'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'manifest.webmanifest'),'utf8'));

assert.match(html,/id="main"/,'Main landmark missing');
assert.match(html,/rel="manifest"/,'PWA manifest not linked');
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
assert.match(sw,/endsWith\('\.json'\)/,'Sports JSON should use network-first caching');
assert.ok(Array.isArray(sports.competitions),'Sports competitions must be an array');
assert.ok(Array.isArray(articles.articles),'Articles must be an array');
assert.ok(Array.isArray(gallery.items),'Gallery items must be an array');
assert.equal(new Set(articles.articles.map(a=>a.id)).size,articles.articles.length,'Article IDs must be unique');
for(const article of articles.articles){
 assert.ok(article.id&&article.title&&article.category,'Article core fields are required');
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
assert.ok(manifest.start_url&&manifest.scope,'PWA start_url and scope required');
console.log('RugbyXVNews quality checks passed.');
