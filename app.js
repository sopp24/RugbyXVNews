'use strict';
(() => {
const PREVIEW_MODE = true; // Passer à false après remplacement et validation de tous les contenus de démonstration.
const DATA_URL = './data/sports-data.json';
const ARTICLES_URL = './data/articles.json';
const GALLERY_URL = './data/gallery.json';
const LOCALES_URL = './data/locales.json';
const COMPETITIONS = [
 {id:'top14',name:'Top 14',short:'TOP 14',description:'L’élite du rugby français : clubs, actualités, analyses et suivi du championnat.'},
 {id:'pro-d2',name:'Pro D2',short:'PRO D2',description:'Le championnat de deuxième division, ses clubs et les enjeux de la saison.'},
 {id:'nationale',name:'Nationale',short:'NATIONALE',description:'Les clubs, les projets sportifs et les histoires du troisième échelon national.'},
 {id:'international',name:'International',short:'INTERNATIONAL',description:'Les sélections, les grandes compétitions et les cultures du rugby mondial.'}
];
let ARTICLES = [
 {id:'top14-lecture-du-jeu',title:'Top 14 : les détails qui font basculer un grand match',category:'Top 14',country:'France',type:'Analyse',author:'La rédaction',published:'Exemple éditorial',read:'5 min',tone:'green',excerpt:'Conquête, discipline, occupation et gestion des temps faibles : une lecture des paramètres qui structurent une rencontre.',lead:'Un match ne se résume jamais à son score. La préparation, la qualité de la conquête et la capacité à faire les bons choix dans les moments décisifs racontent souvent une autre histoire.',sections:[['Le rapport de force commence devant','La mêlée, la touche et les ballons portés donnent le tempo. Une équipe capable de sécuriser ses lancements peut installer son jeu et mettre son adversaire sous pression.'],['La discipline comme fil conducteur','Les pénalités concédées éloignent une équipe de son plan de jeu. La maîtrise des zones de collision et la qualité du replacement sont des indicateurs à observer tout au long de la rencontre.'],['Savoir jouer les bons temps','Un match se gagne aussi dans la gestion : accélérer après un ballon de récupération, conserver quand le contexte l’impose et occuper le terrain au bon moment.']],tags:['Top 14','Analyse','Tactique']},
 {id:'pro-d2-identites-jeu',title:'Pro D2 : les identités de jeu qui font la différence',category:'Pro D2',country:'France',type:'Décryptage',author:'La rédaction',published:'Exemple éditorial',read:'4 min',tone:'blue',excerpt:'Un championnat exigeant où la régularité, la profondeur d’effectif et le caractère pèsent lourd.',lead:'La Pro D2 est un championnat de rythme et de densité. Pour s’y installer, les équipes doivent construire une identité lisible et tenir leur niveau semaine après semaine.',sections:[['Trouver une identité','Chaque club cherche un équilibre entre conquête, vitesse et occupation. La cohérence entre le projet de jeu et les profils disponibles reste déterminante.'],['La profondeur de banc','La saison est longue et les séquences s’enchaînent. Les rotations doivent préserver l’intensité sans dénaturer les repères collectifs.']],tags:['Pro D2','Décryptage']},
 {id:'nationale-projets-clubs',title:'Nationale : un championnat charnière pour les clubs ambitieux',category:'Nationale',country:'France',type:'Focus',author:'La rédaction',published:'Exemple éditorial',read:'4 min',tone:'red',excerpt:'Entre structuration, formation et ambition sportive, la division occupe une place singulière.',lead:'La Nationale constitue un espace de progression majeur pour les clubs qui souhaitent consolider leur projet et franchir un cap sportif.',sections:[['Un cadre exigeant','Le niveau sportif demande des structures solides, une préparation adaptée et un suivi précis des joueurs.'],['Faire grandir le collectif','La continuité du groupe et la formation des jeunes peuvent devenir de véritables leviers de performance.']],tags:['Nationale','Clubs']},
 {id:'international-styles-jeu',title:'Rugby international : quand les styles de jeu se rencontrent',category:'International',country:'International',type:'Analyse',author:'La rédaction',published:'Exemple éditorial',read:'6 min',tone:'ink',excerpt:'Cultures de jeu, intensité, adaptation tactique : les confrontations internationales sont un laboratoire passionnant.',lead:'Les rencontres internationales mettent en lumière des cultures de jeu différentes. Leur confrontation donne à voir la richesse tactique et humaine du rugby.',sections:[['Des identités fortes','Chaque sélection s’appuie sur son histoire, ses formations et les profils de joueurs qui composent son effectif.'],['L’adaptation au contexte','Le niveau d’opposition impose de savoir ajuster son plan de jeu, sans perdre les principes collectifs qui font sa force.']],tags:['International','Sélections']},
 {id:'transferts-construire-effectif',title:'Transferts : comment se construit un effectif sur une saison ?',category:'Actus & transferts',country:'Marché',type:'Dossier',author:'La rédaction',published:'Exemple éditorial',read:'5 min',tone:'gold',excerpt:'Recrutement, complémentarité des profils, formation : le marché ne se résume pas à une succession d’annonces.',lead:'Un recrutement réussi répond à un besoin précis. Il s’inscrit dans une stratégie sportive, dans un calendrier et dans un équilibre de vestiaire.',sections:[['Identifier les besoins','Le staff évalue les postes, la disponibilité des joueurs et les profils susceptibles de compléter le groupe.'],['Penser complémentarité','La performance d’un effectif dépend de l’association des talents, de l’expérience et de la capacité à faire vivre un projet collectif.']],tags:['Transferts','Dossier']},
 {id:'formation-parcours-joueurs',title:'Formation : les étapes qui construisent un joueur de rugby',category:'Actus & transferts',country:'Formation',type:'Grand format',author:'La rédaction',published:'Exemple éditorial',read:'7 min',tone:'blue',excerpt:'De l’école de rugby au haut niveau, le développement se construit dans la durée et au contact du collectif.',lead:'Le parcours d’un joueur repose sur une succession d’apprentissages, de rencontres et de choix. La progression ne suit pas toujours une trajectoire linéaire.',sections:[['Apprendre les fondamentaux','La technique individuelle, la perception du jeu et le plaisir de pratiquer forment un socle essentiel.'],['Construire autour du collectif','L’accompagnement, le suivi physique et l’environnement humain comptent autant que les résultats immédiats.']],tags:['Formation','Joueurs']},
 {id:'arbitrage-regles-comprendre',title:'Arbitrage : mieux comprendre les décisions au cœur du jeu',category:'International',country:'Règles',type:'Pédagogie',author:'La rédaction',published:'Exemple éditorial',read:'5 min',tone:'ink',excerpt:'Les lois du jeu, la communication et la cohérence arbitrale influencent la lecture d’une rencontre.',lead:'L’arbitrage fait partie intégrante du rugby. Comprendre les principes qui guident les décisions permet aussi de mieux lire les situations de jeu.',sections:[['La sécurité comme priorité','Les décisions arbitrales visent notamment à protéger l’intégrité physique des joueurs et à préserver l’équité de la rencontre.'],['Une relation de jeu','La communication entre arbitres, capitaines et joueurs aide à rendre les décisions compréhensibles dans le rythme du match.']],tags:['Arbitrage','Règles']},
 {id:'rugby-feminin-progression',title:'Rugby féminin : les leviers pour accompagner la progression',category:'International',country:'Rugby féminin',type:'Focus',author:'La rédaction',published:'Exemple éditorial',read:'6 min',tone:'red',excerpt:'Visibilité, formation, structuration et accès à la pratique : les enjeux d’un développement durable.',lead:'Le développement du rugby féminin s’appuie sur des parcours de pratique lisibles, des structures d’accueil et une exposition qui valorise les compétitions.',sections:[['Rendre les parcours accessibles','Les clubs, les écoles et les structures fédérales jouent un rôle essentiel pour accompagner les pratiquantes à chaque étape.'],['Installer une visibilité durable','La couverture éditoriale, la valorisation des joueuses et la régularité des rendez-vous contribuent à élargir le public.']],tags:['Rugby féminin','Développement']}
];
let GALLERY = [
 {title:'Au cœur de la ligne d’avantage',kind:'Photo',tone:'green',caption:'Le combat collectif au plus près du jeu.'},
 {title:'La conquête aérienne',kind:'Photo',tone:'blue',caption:'La touche, un secteur clé de la stratégie.'},
 {title:'Un ballon à jouer',kind:'Vidéo',tone:'red',caption:'Séquence vidéo de démonstration.'},
 {title:'Le regard du bord de terrain',kind:'Photo',tone:'gold',caption:'Les émotions vivent aussi en dehors du terrain.'},
 {title:'Le geste technique',kind:'Vidéo',tone:'ink',caption:'Un temps fort à revoir.'},
 {title:'La communion avec le public',kind:'Photo',tone:'green',caption:'Le rugby et ses supporters.'}
];
let SPORTS={provider:null,updatedAt:null,competitions:[],clubs:[],players:[],podcasts:[],videos:[]};
const params=new URLSearchParams(location.search);
let view=params.get('view')||'home';
let compId=params.get('comp')||'top14';
let tab=params.get('tab')||'actualites';
let articleId=params.get('id')||'';
let query=params.get('q')||'';
let currentLang='fr';
let LOCALES={ui:{},articleTranslations:{},galleryTranslations:{}};
try{currentLang=localStorage.getItem('rxn-lang')==='en'?'en':'fr'}catch(e){}
const main=document.getElementById('main');
const $=(s,root=document)=>root.querySelector(s);
const safeHttpUrl=value=>{if(typeof value!=='string'||!value.trim())return '';try{const u=new URL(value.trim(),document.baseURI);return (u.protocol==='https:'||u.protocol==='http:')?u.href:''}catch(e){return ''}};
const $$=(s,root=document)=>Array.from(root.querySelectorAll(s));
const esc=value=>String(value==null?'':value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const compInfo=id=>COMPETITIONS.find(c=>c.id===id)||COMPETITIONS[0];
const compHref=id=>'?view=competition&comp='+encodeURIComponent(id);
const articleHref=a=>'?view=article&id='+encodeURIComponent(a.id);
const articleById=id=>ARTICLES.find(a=>a.id===id);
const allSaved=()=>{try{return JSON.parse(localStorage.getItem('rxn-saved')||'[]')}catch(e){return[]}};
const storeSaved=list=>{try{localStorage.setItem('rxn-saved',JSON.stringify(list));return true}catch(e){return false}};
const escText=s=>String(s||'').toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const pill=(text,kind='')=>'<span class="pill '+kind+'">'+esc(text)+'</span>';
const sectionHead=(title,desc='',href='',label='Voir tout')=>'<div class="section-head"><div><h2>'+title+'</h2>'+(desc?'<p>'+desc+'</p>':'')+'</div>'+(href?'<a class="more-link" href="'+href+'">'+label+' ↗</a>':'')+'</div>';
const crumb=(items)=>'<div class="crumb"><a href="?view=home">Accueil</a>'+items.map(x=>'<span> / </span>'+(x.href?'<a href="'+x.href+'">'+esc(x.label)+'</a>':esc(x.label))).join('')+'</div>';
const emptyState=(title,desc,extra='')=>'<div class="empty-state"><strong>'+esc(title)+'</strong><p>'+esc(desc)+'</p>'+extra+'</div>';
const visual=(tone='ink',label='RugbyXVNews',cls='news-visual',src='',alt='')=>{const image=safeHttpUrl(src),priority=cls==='article-cover'||cls==='hero-media';return '<span class="'+cls+' '+esc(tone)+(image?' has-image':'')+'" role="img" aria-label="'+esc(alt||label||'Illustration éditoriale de rugby')+'">'+(image?'<img src="'+esc(image)+'" alt="" loading="'+(priority?'eager':'lazy')+'" '+(priority?'fetchpriority="high"':'')+' decoding="async" width="1200" height="675">':'')+'<span class="visual-label">'+esc(label)+'</span></span>'};
const headline=(value)=>{let title=String(value||'').trim();if(currentLang==='en')title=translateValue(title,buildTranslationMap());if(!title)return '';const colon=title.indexOf(':');let split=colon>0&&colon<42?colon:(title.indexOf(' ')>0?title.indexOf(' ',title.indexOf(' ')+1):-1);if(split<1)return esc(title);const first=title.slice(0,split).trim();const rest=title.slice(split).replace(/^\s*:\s*|^\s+/,'');return '<mark>'+esc(first)+'</mark>'+(rest?' '+esc(rest):'')};
const scoreMarkup=(homeScore,awayScore)=>{const valid=homeScore!==null&&homeScore!==undefined&&awayScore!==null&&awayScore!==undefined&&Number.isFinite(Number(homeScore))&&Number.isFinite(Number(awayScore));if(!valid)return 'VS';const h=Number(homeScore),a=Number(awayScore),homeClass=h>a?'is-winner':h<a?'is-loser':'is-draw',awayClass=a>h?'is-winner':a<h?'is-loser':'is-draw';return '<span class="score-value '+homeClass+'">'+esc(homeScore)+'</span><span class="score-value '+awayClass+'">'+esc(awayScore)+'</span>'};
const articleTags=a=>'<div class="meta-row">'+pill(a.type,'gold')+pill(a.category,'')+'</div>';
const saveButton=a=>'<button class="save-button" type="button" data-save="'+esc(a.id)+'" aria-label="Sauvegarder : '+esc(a.title)+'" aria-pressed="'+String(allSaved().includes(a.id))+'" title="Sauvegarder cet article">'+(allSaved().includes(a.id)?'★':'☆')+'</button>';
function card(a){
 return '<article class="news-card"><a href="'+articleHref(a)+'">'+visual(a.tone,a.category,'news-visual',a.image,a.imageAlt)+'</a><div class="news-card-body">'+articleTags(a)+'<h3><a href="'+articleHref(a)+'">'+headline(a.title)+'</a></h3><p>'+esc(a.excerpt)+'</p><div class="byline">'+esc(a.author)+' · '+esc(a.read)+' · '+esc(a.published)+'</div><div class="card-actions"><a class="text-link" href="'+articleHref(a)+'">Lire l’article ↗</a>'+saveButton(a)+'</div></div></article>';
}
function feedItem(a){
 return '<article class="feed-item"><a href="'+articleHref(a)+'">'+visual(a.tone,a.category,'news-visual',a.image,a.imageAlt)+'</a><div>'+articleTags(a)+'<h3><a href="'+articleHref(a)+'">'+headline(a.title)+'</a></h3><p>'+esc(a.excerpt)+'</p><div class="feed-meta"><span>'+esc(a.author)+'</span><span>·</span><span>'+esc(a.published)+'</span><span>·</span><span>'+esc(a.read)+'</span></div><div class="card-actions"><a class="text-link" href="'+articleHref(a)+'">Lire ↗</a>'+saveButton(a)+'</div></div></article>';
}
function getCompetitionFeed(id){return SPORTS.competitions.find(c=>c.id===id)||null}
function validUpdatedAt(value){
 if(!value)return false;
 const n=Date.parse(value);
 return Number.isFinite(n)&&n<=Date.now()+5*60*1000;
}
function formatDate(value,options={dateStyle:'medium',timeStyle:'short'}){
 const d=new Date(value);
 if(!Number.isFinite(d.getTime()))return 'Date non renseignée';
 const locale=currentLang==='en'?'en-GB':'fr-FR';
 try{return new Intl.DateTimeFormat(locale,options).format(d)}catch(e){return d.toLocaleDateString(locale)}
}
function freshness(value){
 if(!validUpdatedAt(value))return 'Mise à jour non renseignée';
 const minutes=Math.floor((Date.now()-Date.parse(value))/60000);
 if(minutes<2)return 'Mis à jour à l’instant';
 if(minutes<60)return 'Mis à jour il y a '+minutes+' min';
 const hours=Math.floor(minutes/60);
 if(hours<24)return 'Mis à jour il y a '+hours+' h';
 return 'Mis à jour le '+formatDate(value,{dateStyle:'short'});
}
function currentMatches(){
 return SPORTS.competitions.flatMap(c=>(Array.isArray(c.matches)?c.matches:[]).map(m=>({...m,competition:c.name,competitionId:c.id,sourceUpdatedAt:m.updatedAt||c.updatedAt||SPORTS.updatedAt,sourceName:m.sourceName||c.sourceName||SPORTS.provider,sourceUrl:m.sourceUrl||c.sourceUrl||SPORTS.sourceUrl})));
}
function matchIsLive(m){
 return m.status==='live'&&validUpdatedAt(m.updatedAt||m.sourceUpdatedAt)&&(Date.now()-Date.parse(m.updatedAt||m.sourceUpdatedAt)<=10*60*1000);
}
function renderScoreCard(m){
 const live=matchIsLive(m),state=m.status==='live'?(live?'EN DIRECT':'DIRECT NON ACTUALISÉ'):m.status==='finished'?'TERMINÉ':m.status==='postponed'?'REPORTÉ':'À VENIR';
 const date=m.kickoff?formatDate(m.kickoff):'Horaire à confirmer';
 const score=m.homeScore!==null&&m.homeScore!==undefined&&m.awayScore!==null&&m.awayScore!==undefined&&Number.isFinite(Number(m.homeScore))&&Number.isFinite(Number(m.awayScore));
 const scoreLabel=score?String(m.home||'Équipe recevante')+' '+m.homeScore+', '+String(m.away||'Équipe visiteuse')+' '+m.awayScore:'Score non publié';
 return '<article class="score-card"><div class="score-card-head"><span>'+esc(m.competition||'Rugby')+'</span><span class="'+(live?'pill live':'pill')+'">'+state+'</span></div><div class="score-teams"><div class="score-team">'+esc(m.home||'Équipe à confirmer')+'</div><div class="score-num" aria-label="'+esc(scoreLabel)+'">'+scoreMarkup(m.homeScore,m.awayScore)+'</div><div class="score-team">'+esc(m.away||'Équipe à confirmer')+'</div></div><div class="score-status">'+esc(m.round||'')+' '+(m.round?'· ':'')+esc(date)+(m.venue?' · '+esc(m.venue):'')+(m.updatedAt||m.sourceUpdatedAt?' · '+esc(freshness(m.updatedAt||m.sourceUpdatedAt)):'')+'</div>'+((m.sourceName||m.sourceUrl)?'<div class="feed-meta">'+(m.sourceName?'<span>Source : '+esc(m.sourceName)+'</span>':'')+(safeHttpUrl(m.sourceUrl)?' <a class="text-link" href="'+esc(safeHttpUrl(m.sourceUrl))+'" target="_blank" rel="noopener noreferrer">Vérifier ↗</a>':'')+'</div>':'')+(m.id?'<div class="score-detail-link"><a class="text-link" href="?view=match&id='+encodeURIComponent(m.id)+'&comp='+encodeURIComponent(m.competitionId||'')+'">Fiche du match ↗</a></div>':'')+'</article>';
}
function matchWidget(limit=2){
 const matches=currentMatches().filter(m=>matchIsLive(m)).concat(currentMatches().filter(m=>!matchIsLive(m)&&m.status==='finished')).slice(0,limit);
 if(!matches.length)return emptyState('Le direct arrive','Le centre de match est prêt. Les scores s’afficheront dès qu’une source sportive fiable et autorisée sera renseignée dans data/sports-data.json.','<a class="text-link" href="?view=live">Ouvrir le centre de match ↗</a>');
 return '<div class="score-grid">'+matches.map(renderScoreCard).join('')+'</div>';
}
function renderCompetitionCards(){
 return '<div class="comp-strip">'+COMPETITIONS.map(c=>'<article class="comp-card"><span class="kicker">Compétition</span><span class="comp-name">'+esc(c.name)+'</span><p>'+esc(c.description)+'</p><a href="'+compHref(c.id)+'">Explorer la rubrique ↗</a></article>').join('')+'</div>';
}
function renderStandings(c){
 const rows=Array.isArray(c&&c.standings)?c.standings:[];
 if(!rows.length)return emptyState('Classement en attente','Le tableau sera publié dès que les données officielles de la compétition seront disponibles.');
 
 const body=rows.map((r,i)=>'<tr><td>'+esc(r.position||i+1)+'</td><td class="club-name">'+esc(r.club||r.name||'Club')+'</td><td>'+esc(r.played??'—')+'</td><td>'+esc(r.wins??'—')+'</td><td>'+esc(r.draws??'—')+'</td><td>'+esc(r.losses??'—')+'</td><td>'+esc(r.points??'—')+'</td></tr>').join('');
 return '<div class="table-wrap"><table class="standings"><thead><tr><th>#</th><th>Club</th><th>J</th><th>G</th><th>N</th><th>P</th><th>Pts</th></tr></thead><tbody>'+body+'</tbody></table></div><p class="standings-note">'+esc(freshness(c.updatedAt||SPORTS.updatedAt))+(safeHttpUrl(c.sourceUrl)?' · <a href="'+esc(safeHttpUrl(c.sourceUrl))+'" target="_blank" rel="noopener noreferrer">Source des données ↗</a>':'')+'</p>';
}
function renderFixtures(c){
 const matches=Array.isArray(c&&c.matches)?c.matches:[];
 if(!matches.length)return emptyState('Calendrier non connecté','Les journées et horaires seront ajoutés dès qu’un flux officiel ou une saisie éditoriale sera relié à la rubrique.');
 return '<div class="score-grid">'+matches.slice().sort((a,b)=>Date.parse(a.kickoff||0)-Date.parse(b.kickoff||0)).map(m=>renderScoreCard({...m,competition:c.name,sourceUpdatedAt:m.updatedAt||c.updatedAt||SPORTS.updatedAt,sourceName:m.sourceName||c.sourceName||SPORTS.provider,sourceUrl:m.sourceUrl||c.sourceUrl||SPORTS.sourceUrl})).join('')+'</div>';
}
function renderHome(){
 document.title='RugbyXVNews — Le rugby, sans détour';
 const lead=ARTICLES[0],secondary=ARTICLES.slice(1,3),latest=ARTICLES.slice(3,8);
 const live=currentMatches().filter(matchIsLive);
 main.innerHTML='<div class="wrap">'+
 '<section class="hero-grid" aria-label="À la une"><article class="hero-primary">'+visual(lead.tone,lead.category,'hero-media',lead.image,lead.imageAlt)+'<div class="hero-copy"><span class="kicker">Le média rugby · À la une</span>'+articleTags(lead)+'<h1 class="headline">'+headline(lead.title)+'</h1><p>'+esc(lead.excerpt)+'</p><div class="card-actions"><a class="btn" href="'+articleHref(lead)+'">Lire le dossier <span>↗</span></a>'+saveButton(lead)+'</div></div></article><div class="hero-side">'+secondary.map(a=>'<article class="hero-secondary"><span class="kicker">'+esc(a.category)+'</span><h2><a href="'+articleHref(a)+'">'+headline(a.title)+'</a></h2><p>'+esc(a.excerpt)+'</p><a class="text-link" href="'+articleHref(a)+'">Lire ↗</a></article>').join('')+'</div></section>'+
 '<section class="feed-layout"><div>'+sectionHead('Les dernières actualités','Le fil éditorial RugbyXVNews','?view=news','Toutes les actus')+'<div class="card-grid">'+latest.slice(0,3).map(card).join('')+'</div><div class="feed-list" style="margin-top:16px">'+ARTICLES.slice(1,4).map(feedItem).join('')+'</div><div style="margin-top:18px"><a class="btn dark" href="?view=news">Toute l’actualité <span>↗</span></a></div></div><aside class="sidebar-stack"><section class="widget"><span class="kicker">Centre de match</span><h2>En direct & résultats</h2>'+(live.length?'<p>'+live.length+' rencontre(s) signalée(s) en direct.</p>':'<p>Les scores seront affichés dès que la source sera connectée.</p>')+matchWidget(2)+'<p style="margin-top:13px"><a class="text-link" href="?view=live">Ouvrir le centre de match ↗</a></p></section><section class="widget-dark"><span class="kicker">Le média rugby</span><h2>Les compétitions à suivre</h2><p>Retrouve les rubriques, les analyses et les prochains rendez-vous.</p><a class="btn" href="?view=live">Calendriers & classements ↗</a></section><section class="widget"><span class="kicker">À retrouver</span><h2>Les dossiers du moment</h2>'+ARTICLES.slice(0,4).map(a=>'<div class="widget-line"><b><a href="'+articleHref(a)+'">'+esc(a.title)+'</a></b><span>'+esc(a.category)+'</span></div>').join('')+'</section></aside></section>'+
 '<section class="page-shell">'+sectionHead('Toutes les compétitions','Un accès direct aux rubriques majeures','?view=live','Résultats & classements')+renderCompetitionCards()+'</section>'+
 '<section class="page-shell">'+sectionHead('Décryptages & grands formats','Du jeu, des histoires et des analyses')+'<div class="card-grid">'+ARTICLES.slice(2,5).map(card).join('')+'</div></section>'+
 '<section class="page-shell">'+sectionHead('La médiathèque','Photos, vidéos et podcasts rugby','?view=media','Explorer les médias')+'<div class="media-grid"><a class="media-card" href="?view=gallery"><span class="kicker">En images</span><h3>La galerie RugbyXVNews</h3><p>Les gestes, les émotions et les coulisses.</p></a><a class="media-card" href="?view=videos"><span class="kicker">À regarder</span><h3>Vidéos & temps forts</h3><p>Les séquences à retrouver dans la médiathèque.</p></a><a class="media-card" href="?view=podcasts"><span class="kicker">À écouter</span><h3>Podcasts rugby</h3><p>Entretiens, débats et décryptages audio.</p></a></div></section>'+
 '<section class="widget newsletter-widget"><span class="kicker">Dans le vestiaire</span><div><h2>Ne manque rien de l’actualité rugby</h2><p>Retrouve les dernières publications et les formats de la rédaction. La newsletter sera activée lors du branchement d’un service d’inscription.</p></div><a class="btn dark" href="mailto:contact@rugbyxvnew.com?subject=Newsletter%20RugbyXVNews">Contacter la rédaction ↗</a></section>'+
 '</div>';
}
function pageIntro(title,description,trail=[]){
 return '<section class="pageintro"><div class="wrap">'+crumb(trail)+'<span class="eyebrow">RugbyXVNews · '+(PREVIEW_MODE?'Prévisualisation':'Média rugby')+'</span><h1>'+esc(title)+'</h1><p>'+esc(description)+'</p></div></section>';
}
function renderCompetition(){
 const info=compInfo(compId),c=getCompetitionFeed(info.id),related=ARTICLES.filter(a=>a.category===info.name||(info.id==='international'&&a.category==='International'));
 document.title=info.name+' — RugbyXVNews';
 const validTabs=['actualites','calendrier','classement'];if(!validTabs.includes(tab))tab='actualites';
 const tabs='<div class="tabs" role="tablist" aria-label="Rubriques '+esc(info.name)+'">'+[['actualites','Actualités'],['calendrier','Calendrier'],['classement','Classement']].map(([id,label])=>'<a class="tab" role="tab" aria-selected="'+String(tab===id)+'" href="'+compHref(info.id)+'&tab='+id+'">'+label+'</a>').join('')+'</div>';
 let content='';
 if(tab==='actualites'){
  content=related.length?'<div class="card-grid">'+related.map(card).join('')+'</div>':emptyState('Les articles arrivent','Les publications de cette compétition seront regroupées dans cette rubrique.');
 }else if(tab==='calendrier'){content=renderFixtures(c)}
 else{content=renderStandings(c)}
 main.innerHTML=pageIntro(info.name,info.description,[{label:info.name}])+'<section class="page-shell"><div class="wrap"><div class="competition-banner"><span class="kicker">Dossier compétition</span><h2>'+esc(info.name)+'</h2><p>'+(c&&c.season?'Saison : '+esc(c.season):'Saison et données officielles à renseigner')+'</p></div>'+tabs+content+'<div class="section-head"><div><h2>Explorer les autres compétitions</h2></div></div>'+renderCompetitionCards()+'</div></section>';
}
function renderLive(){
 document.title='Live & résultats — RugbyXVNews';
 const matches=currentMatches();
 const live=matches.filter(matchIsLive),finished=matches.filter(m=>m.status==='finished'),upcoming=matches.filter(m=>m.status==='scheduled'||m.status==='upcoming');
 const allTabs='<div class="tabs">'+[['live','En direct ('+live.length+')'],['finished','Résultats ('+finished.length+')'],['upcoming','À venir ('+upcoming.length+')'],['standings','Classements']].map(([t,l])=>'<a class="tab" aria-selected="'+String((params.get('tab')||'live')===t)+'" href="?view=live&tab='+t+'">'+l+'</a>').join('')+'</div>';
 const currentTab=params.get('tab')||'live';
 let contents='';
 if(currentTab==='standings'){
  contents=COMPETITIONS.map(c=>'<section style="margin-bottom:25px">'+sectionHead(c.name,'Classement de la compétition')+renderStandings(getCompetitionFeed(c.id))+'</section>').join('');
 }else{
  const chosen=currentTab==='finished'?finished:currentTab==='upcoming'?upcoming:live;
  contents=chosen.length?'<div class="score-grid">'+chosen.map(m=>renderScoreCard({...m,competition:m.competition,sourceUpdatedAt:m.updatedAt||m.sourceUpdatedAt})).join('')+'</div>':emptyState(currentTab==='live'?'Aucun direct disponible':currentTab==='finished'?'Aucun résultat publié':'Aucune rencontre programmée', 'Le centre de match est opérationnel côté interface. Il affichera les informations lorsque le fichier de données sera alimenté par une source vérifiée.');
 }
 main.innerHTML=pageIntro('Live & résultats','Le centre de match rassemble scores, calendriers, classements et informations des compétitions.')+'<section class="page-shell"><div class="wrap"><div class="match-toolbar"><div><span class="kicker">Centre de match</span><p class="data-freshness">'+(SPORTS.provider?'Source : '+esc(SPORTS.provider)+' · ':'')+esc(freshness(SPORTS.updatedAt))+'</p></div><button class="filter-button" type="button" data-refresh-data>↻ Actualiser</button></div>'+allTabs+contents+'<div class="section-head"><div><h2>Par compétition</h2><p>Accès aux calendriers et classements détaillés.</p></div></div>'+renderCompetitionCards()+'</div></section>';
}

function renderMatch(){
 const matchId=params.get('id')||'';
 const match=currentMatches().find(m=>String(m.id)===matchId);
 if(!match){
  document.title='Match indisponible — RugbyXVNews';
  main.innerHTML=pageIntro('Centre du match','Les informations de cette rencontre ne sont pas encore disponibles.')+'<section class="page-shell"><div class="wrap">'+emptyState('Fiche de match indisponible','Les fiches détaillées seront ouvertes dès qu’une rencontre issue d’une source validée sera ajoutée.','<a class="btn dark" href="?view=live">Retour au centre de match ↗</a>')+'</div></section>';
  return;
 }
 document.title=(match.home||'Match')+' – '+(match.away||'')+' — RugbyXVNews';
 const info=match.competition||compInfo(match.competitionId).name;
 const live=matchIsLive(match);
 const stats=Array.isArray(match.stats)?match.stats:[];
 const events=Array.isArray(match.events)?match.events:[];
 const lineups=match.lineups||{};
 const statBlock=stats.length?'<div class="table-wrap"><table class="standings"><thead><tr><th>Statistique</th><th>Recevant</th><th>Visiteur</th></tr></thead><tbody>'+stats.map(x=>'<tr><td>'+esc(x.label||'Statistique')+'</td><td>'+esc(x.home??'—')+'</td><td>'+esc(x.away??'—')+'</td></tr>').join('')+'</tbody></table></div>':emptyState('Statistiques à venir','Les statistiques détaillées apparaîtront si le fournisseur de données les propose.');
 const eventBlock=events.length?'<ol class="match-events">'+events.map(x=>'<li><b>'+esc(x.minute||'')+'</b><span>'+esc(x.description||x.type||'Événement')+'</span></li>').join('')+'</ol>':emptyState('Fil du match non disponible','Le fil chronologique sera affiché lorsqu’un flux détaillé sera connecté.');
 const lineupBlock=(Array.isArray(lineups.home)&&lineups.home.length)||(Array.isArray(lineups.away)&&lineups.away.length)?'<div class="lineup-grid"><section class="widget"><h2>'+esc(match.home)+'</h2><ol>'+((lineups.home||[]).map(x=>'<li>'+esc(x.number||'')+' '+esc(x.name||x)+'</li>').join(''))+'</ol></section><section class="widget"><h2>'+esc(match.away)+'</h2><ol>'+((lineups.away||[]).map(x=>'<li>'+esc(x.number||'')+' '+esc(x.name||x)+'</li>').join(''))+'</ol></section></div>':emptyState('Compositions non publiées','Les feuilles de match seront ajoutées après confirmation officielle des compositions.');
 main.innerHTML=pageIntro('Fiche du match',info+' · '+(match.round||'Rencontre') )+'<section class="page-shell"><div class="wrap"><div class="match-feature"><div class="match-feature-head"><span class="kicker">'+esc(info)+'</span><span class="'+(live?'pill live':'pill light')+'">'+(live?'EN DIRECT':match.status==='finished'?'TERMINÉ':match.status==='postponed'?'REPORTÉ':'À VENIR')+'</span></div><div class="match-feature-teams"><div><small>Équipe recevante</small><strong>'+esc(match.home)+'</strong></div><div class="match-feature-score" aria-label="'+(match.homeScore!==null&&match.homeScore!==undefined&&match.awayScore!==null&&match.awayScore!==undefined?esc(String(match.home)+' '+match.homeScore+', '+String(match.away)+' '+match.awayScore):'Score non publié')+'">'+scoreMarkup(match.homeScore,match.awayScore)+'</div><div><small>Équipe visiteuse</small><strong>'+esc(match.away)+'</strong></div></div><p>'+esc(match.round||'')+' '+(match.round?'· ':'')+esc(match.kickoff?formatDate(match.kickoff):'Horaire à confirmer')+(match.venue?' · '+esc(match.venue):'')+'</p><p class="standings-note">'+esc(freshness(match.updatedAt||match.sourceUpdatedAt))+(match.sourceName?' · Source : '+esc(match.sourceName):'')+(safeHttpUrl(match.sourceUrl)?' · <a href="'+esc(safeHttpUrl(match.sourceUrl))+'" target="_blank" rel="noopener noreferrer">Vérifier la source ↗</a>':'')+'</p></div><div class="match-tabs"><section>'+sectionHead('Statistiques','Données du match')+statBlock+'</section><section>'+sectionHead('Fil du match','Temps forts et événements')+eventBlock+'</section><section>'+sectionHead('Compositions','Feuilles de match')+lineupBlock+'</section></div><p style="margin-top:20px"><a class="text-link" href="'+compHref(match.competitionId||'top14')+'">Retour à la compétition ↗</a> · <a class="text-link" href="?view=live">Tous les résultats ↗</a></p></div></section>';
}
function renderNews(){
 document.title='Actualités & transferts — RugbyXVNews';
 main.innerHTML=pageIntro('Actualités & transferts','Le fil complet de la rédaction : informations, analyses, dossiers, coulisses et mouvements du rugby.')+'<section class="page-shell"><div class="wrap"><div class="filterbar"><label class="sr-only" for="news-filter">Rechercher dans les actualités</label><input type="search" id="news-filter" placeholder="Rechercher un sujet, une équipe, un joueur…"><label class="sr-only" for="news-category">Filtrer par rubrique</label><select id="news-category"><option value="">Toutes les rubriques</option>'+['Top 14','Pro D2','Nationale','International','Actus & transferts'].map(c=>'<option>'+esc(c)+'</option>').join('')+'</select><label class="sr-only" for="news-type">Filtrer par format</label><select id="news-type"><option value="">Tous les formats</option>'+Array.from(new Set(ARTICLES.map(a=>a.type))).map(c=>'<option>'+esc(c)+'</option>').join('')+'</select></div><p class="results-count" id="news-count" aria-live="polite"></p><div class="card-grid" id="news-results">'+ARTICLES.map(card).join('')+'</div></div></section>';
}
function renderArticle(){
 const a=articleById(articleId);
 if(!a){main.innerHTML=pageIntro('Article introuvable','Cet article n’existe pas ou n’est plus disponible.')+'<section class="page-shell"><div class="wrap">'+emptyState('Contenu indisponible','Reviens aux dernières actualités pour découvrir les publications disponibles.','<a class="btn dark" href="?view=news">Voir les actualités ↗</a>')+'</div></section>';return}
 document.title=a.title+' — RugbyXVNews';
 const ids=a.sections.map((s,i)=>'section-'+i);
 const compForArticle=COMPETITIONS.find(c=>c.name===a.category);
 const articleCategoryHref=compForArticle?compHref(compForArticle.id):'?view=news';
 const body=a.sections.map((s,i)=>'<section id="'+ids[i]+'"><h2>'+esc(s[0])+'</h2><p>'+esc(s[1])+'</p>'+(i===0?'<blockquote>Au rugby, la performance se construit dans la précision du geste et la force du collectif.</blockquote>':'')+'</section>').join('');
 main.innerHTML='<section class="pageintro pageintro-compact"><div class="wrap">'+crumb([{label:a.category,href:articleCategoryHref},{label:'Article'}])+'</div></section><div class="reading-progress" aria-hidden="true"><span id="reading-progress-bar"></span></div><section class="page-shell"><div class="wrap article-layout"><article class="article-main"><header class="article-header">'+articleTags(a)+'<h1 class="headline">'+headline(a.title)+'</h1><p class="article-deck">'+esc(a.excerpt)+'</p><div class="article-meta-bar"><div class="authorline"><span class="author-avatar">XV</span><span><b>'+esc(a.author)+'</b><br>'+esc(a.published)+' · '+esc(a.read)+' de lecture'+(a.updatedAt?' · Mis à jour le '+esc(formatDate(a.updatedAt,{dateStyle:'medium'})):'')+'</span></div><div class="article-tools"><button type="button" data-share>Partager ↗</button><button type="button" data-copy>Copier le lien</button>'+saveButton(a)+'<button type="button" data-print>Imprimer</button></div></div></header>'+visual(a.tone,a.category,'article-cover',a.image,a.imageAlt)+'<p class="image-caption">'+esc(a.imageCaption||'Illustration éditoriale. Ajouter un crédit et une légende lorsque le visuel est remplacé.')+'</p><div class="article-body"><p><strong>'+esc(a.lead)+'</strong></p>'+(PREVIEW_MODE?'<div class="editorialnote"><b>Exemple éditorial :</b> ce contenu sert à illustrer la mise en page. Remplace les textes, faits, citations, noms et dates par des informations vérifiées avant publication.</div>':'')+body+'<p>Cette structure peut accueillir des citations attribuées, des statistiques sourcées, des liens vers les comptes rendus et des réactions d’après-match.</p>'+(Array.isArray(a.sources)&&a.sources.length?'<section class="article-sources"><h2>Sources & références</h2><ul>'+a.sources.map(src=>'<li>'+(safeHttpUrl(src.url)?'<a href="'+esc(safeHttpUrl(src.url))+'" target="_blank" rel="noopener noreferrer">'+esc(src.label||src.publisher||src.url)+'</a>':esc(src.label||src.publisher||''))+(src.date?' · '+esc(src.date):'')+'</li>').join('')+'</ul></section>':'')+'</div><div class="article-meta-bar"><span>Rubrique : <b>'+esc(a.category)+'</b> · <a href="mailto:contact@rugbyxvnew.com?subject='+encodeURIComponent('Correction : '+a.title)+'&body='+encodeURIComponent('Article : '+location.href+'\n\nPrécision à apporter : ')+'">Signaler une correction</a></span><div class="article-tools"><button type="button" data-share>Partager ↗</button>'+saveButton(a)+'</div></div><section>'+sectionHead('À lire aussi','D’autres sujets pour prolonger la lecture')+'<div class="card-grid">'+ARTICLES.filter(x=>x.id!==a.id).slice(0,3).map(card).join('')+'</div></section></article><aside class="article-aside"><section class="widget"><span class="kicker">Dans cet article</span><h2>Sommaire</h2><ol class="toc">'+a.sections.map((s,i)=>'<li><a href="#'+ids[i]+'">'+esc(s[0])+'</a></li>').join('')+'</ol></section><section class="widget"><span class="kicker">Votre lecture</span><h2>Confort de lecture</h2><div class="article-tools"><button type="button" data-font="down">A−</button><button type="button" data-font="up">A+</button></div><p style="margin-top:10px">Ajuste la taille du texte selon ton écran.</p></section><section class="widget-dark"><span class="kicker">À suivre</span><h2>Le fil rugby</h2><p>Retrouve les autres actualités et dossiers de la rédaction.</p><a class="btn" href="?view=news">Toutes les actus ↗</a></section></aside></div></section>';
}
function renderDirectory(){
 const kind=params.get('kind')||'clubs',isClubs=kind==='clubs',items=isClubs?SPORTS.clubs:SPORTS.players;
 const title=isClubs?'Clubs':'Joueurs';
 document.title=title+' — RugbyXVNews';
 main.innerHTML=pageIntro('Clubs & joueurs','Repères, fiches, effectifs, parcours et informations pour retrouver les acteurs du rugby.')+'<section class="page-shell"><div class="wrap"><div class="tabs"><a class="tab" aria-selected="'+String(isClubs)+'" href="?view=directory&kind=clubs">Clubs</a><a class="tab" aria-selected="'+String(!isClubs)+'" href="?view=directory&kind=players">Joueurs</a></div><div class="filterbar"><label class="sr-only" for="directory-filter">Rechercher</label><input id="directory-filter" type="search" value="'+esc(params.get('q')||'')+'" placeholder="'+(isClubs?'Rechercher un club…':'Rechercher un joueur…')+'"></div><div id="directory-results" class="directory-grid">'+(Array.isArray(items)&&items.length?items.map(x=>'<article class="directory-card"><span class="kicker">'+esc(isClubs?x.competition||'Club':x.position||'Joueur')+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.description||'Fiche à compléter avec des informations vérifiées.')+'</p>'+(safeHttpUrl(x.url)?'<a class="text-link" href="'+esc(safeHttpUrl(x.url))+'" target="_blank" rel="noopener noreferrer">Consulter ↗</a>':'')+'</article>').join(''):emptyState(isClubs?'Annuaire des clubs à connecter':'Fiches joueurs à connecter','Ajoute les fiches validées dans data/sports-data.json. Aucun effectif ou profil fictif n’est affiché.'))+'</div></div></section>';
}
function renderGallery(){
 document.title='Galerie — RugbyXVNews';
 main.innerHTML=pageIntro('Galerie','Les images, les gestes et les émotions qui racontent le rugby.')+'<section class="page-shell"><div class="wrap"><div class="tabs"><a class="tab" aria-selected="true" href="?view=gallery">Galerie</a><a class="tab" aria-selected="false" href="?view=videos">Vidéos</a><a class="tab" aria-selected="false" href="?view=podcasts">Podcasts</a></div><div class="filterbar"><button class="filter-button" data-gallery-filter="all" aria-pressed="true">Tout voir</button><button class="filter-button" data-gallery-filter="Photo" aria-pressed="false">Photos</button><button class="filter-button" data-gallery-filter="Vidéo" aria-pressed="false">Vidéos</button></div><div class="gallery-grid">'+GALLERY.map((g,i)=>'<button class="gallery-item" type="button" data-gallery="'+i+'" data-kind="'+g.kind+'"><span class="gallery-image '+g.tone+'"><strong>'+esc(g.title)+'</strong></span><small>'+esc(g.kind)+' · '+esc(g.caption)+'</small></button>').join('')+'</div>'+(PREVIEW_MODE?'<p class="byline">Vignettes de démonstration. À remplacer par des médias originaux ou dûment licenciés, avec crédits et légendes.</p>':'')+'</div></section>';
}
function renderVideos(){
 document.title='Vidéos — RugbyXVNews';
 const videos=Array.isArray(SPORTS.videos)?SPORTS.videos:[];
 main.innerHTML=pageIntro('Vidéos & temps forts','Les séquences vidéo, interviews et analyses proposées par la rédaction.')+'<section class="page-shell"><div class="wrap"><div class="tabs"><a class="tab" href="?view=gallery">Galerie</a><a class="tab" aria-selected="true" href="?view=videos">Vidéos</a><a class="tab" href="?view=podcasts">Podcasts</a></div>'+(videos.length?'<div class="media-grid">'+videos.map(v=>'<article class="media-card"><span class="kicker">'+esc(v.category||'Vidéo')+'</span><h3>'+esc(v.title)+'</h3><p>'+esc(v.description||'')+'</p>'+(safeHttpUrl(v.url)?'<a class="btn" href="'+esc(safeHttpUrl(v.url))+'" target="_blank" rel="noopener noreferrer">Regarder ↗</a>':'')+'</article>').join('')+'</div>':emptyState('Vidéos à venir','Les vidéos seront ajoutées lorsque les contenus et leurs droits de diffusion seront confirmés.'))+'</div></section>';
}
function renderPodcasts(){
 document.title='Podcasts — RugbyXVNews';
 const items=Array.isArray(SPORTS.podcasts)?SPORTS.podcasts:[];
 main.innerHTML=pageIntro('Podcasts','Entretiens, débats, analyses et histoires à écouter.')+'<section class="page-shell"><div class="wrap"><div class="tabs"><a class="tab" href="?view=gallery">Galerie</a><a class="tab" href="?view=videos">Vidéos</a><a class="tab" aria-selected="true" href="?view=podcasts">Podcasts</a></div>'+(items.length?'<div class="media-grid">'+items.map(p=>'<article class="media-card"><span class="kicker">'+esc(p.duration||'Podcast')+'</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.description||'')+'</p>'+(safeHttpUrl(p.url)?'<a class="btn" href="'+esc(safeHttpUrl(p.url))+'" target="_blank" rel="noopener noreferrer">Écouter ↗</a>':'')+'</article>').join('')+'</div>':emptyState('Les podcasts arrivent','Les épisodes seront publiés lorsque les fichiers audio et les informations de diffusion seront prêts.'))+'</div></section>';
}
function renderMedia(){
 document.title='Médiathèque — RugbyXVNews';
 main.innerHTML=pageIntro('Médiathèque','Tous les formats RugbyXVNews : images, séquences vidéo et podcasts.')+'<section class="page-shell"><div class="wrap"><div class="media-grid"><a class="media-card" href="?view=gallery"><span class="kicker">Voir</span><h3>Galerie photo</h3><p>Images et instants du rugby.</p></a><a class="media-card" href="?view=videos"><span class="kicker">Regarder</span><h3>Vidéos</h3><p>Les séquences et entretiens vidéo.</p></a><a class="media-card" href="?view=podcasts"><span class="kicker">Écouter</span><h3>Podcasts</h3><p>Les émissions et formats audio.</p></a></div></div></section>';
}
function renderSaved(){
 document.title='Mes articles sauvegardés — RugbyXVNews';
 const ids=allSaved(),items=ids.map(articleById).filter(Boolean);
 main.innerHTML=pageIntro('Mes favoris','Retrouve les articles que tu as enregistrés sur cet appareil.')+'<section class="page-shell"><div class="wrap">'+(items.length?'<div class="card-grid">'+items.map(card).join('')+'</div>':emptyState('Aucun article enregistré','Utilise l’étoile sur un article pour le retrouver ici.','<a class="btn dark" href="?view=news">Explorer les actualités ↗</a>'))+'<p class="standings-note">Tes favoris sont enregistrés localement dans ce navigateur. Ils ne sont pas synchronisés entre tes appareils.</p></div></section>';
}
function renderSearch(){
 document.title='Recherche — RugbyXVNews';
 const q=query.trim(),needle=escText(q);
 const found=q?ARTICLES.filter(a=>escText([a.title,a.excerpt,a.category,a.type,a.author,(a.tags||[]).join(' ')].join(' ')).includes(needle)):[];
 const clubs=q?(SPORTS.clubs||[]).filter(x=>escText([x.name,x.competition,x.description].join(' ')).includes(needle)):[];
 const players=q?(SPORTS.players||[]).filter(x=>escText([x.name,x.position,x.club,x.description].join(' ')).includes(needle)):[];
 const comps=q?COMPETITIONS.filter(x=>escText([x.name,x.description].join(' ')).includes(needle)):[];
 const matches=q?currentMatches().filter(x=>escText([x.home,x.away,x.competition,x.round].join(' ')).includes(needle)):[];
 const total=found.length+clubs.length+players.length+comps.length+matches.length;
 const results=(found.length?sectionHead('Articles','Publications et analyses')+'<div class="card-grid">'+found.map(card).join('')+'</div>':'')+
 (comps.length?sectionHead('Compétitions','Rubriques disponibles')+'<div class="comp-strip">'+comps.map(c=>'<article class="comp-card"><span class="comp-name">'+esc(c.name)+'</span><p>'+esc(c.description)+'</p><a href="'+compHref(c.id)+'">Voir la rubrique ↗</a></article>').join('')+'</div>':'')+
 (clubs.length?sectionHead('Clubs','Fiches disponibles')+'<div class="directory-grid">'+clubs.map(x=>'<article class="directory-card"><span class="kicker">'+esc(x.competition||'Club')+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.description||'')+'</p><a class="text-link" href="?view=directory&kind=clubs&q='+encodeURIComponent(x.name)+'">Voir la fiche ↗</a></article>').join('')+'</div>':'')+
 (players.length?sectionHead('Joueurs','Fiches disponibles')+'<div class="directory-grid">'+players.map(x=>'<article class="directory-card"><span class="kicker">'+esc(x.position||'Joueur')+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.description||'')+'</p><a class="text-link" href="?view=directory&kind=players&q='+encodeURIComponent(x.name)+'">Voir la fiche ↗</a></article>').join('')+'</div>':'')+
 (matches.length?sectionHead('Rencontres','Calendriers et résultats')+'<div class="score-grid">'+matches.map(renderScoreCard).join('')+'</div>':'');
 main.innerHTML=pageIntro('Recherche',q?'Résultats pour « '+q+' »':'Recherche dans les articles, les compétitions, les clubs, les joueurs et les rencontres.')+'<section class="page-shell"><div class="wrap"><form class="searchform search-page-form" id="page-search"><label class="sr-only" for="page-search-input">Mots-clés</label><input type="search" id="page-search-input" name="q" value="'+esc(q)+'" placeholder="Club, joueur, compétition, sujet…"><button type="submit">Rechercher ↗</button></form><p class="results-count">'+(q?total+' résultat(s) dans le média.':'Saisis un terme pour lancer une recherche.')+'</p>'+(q?(total?results:emptyState('Aucun résultat','Essaie avec un autre mot-clé ou explore les rubriques.')):renderCompetitionCards())+'</div></section>';
}
function renderContact(){
 document.title='Contact — RugbyXVNews';
 main.innerHTML=pageIntro('Contact','Une information à signaler, une question, une proposition de collaboration ou une demande média.')+'<section class="page-shell"><div class="wrap"><div class="directory-grid"><article class="directory-card"><span class="kicker">La rédaction</span><h3>Une information ?</h3><p>Pour transmettre une information, proposer un sujet ou contacter l’équipe éditoriale.</p><a class="text-link" href="mailto:contact@rugbyxvnew.com">contact@rugbyxvnew.com ↗</a></article><article class="directory-card"><span class="kicker">Instagram</span><h3>RugbyXVNews</h3><p>Retrouve les contenus, les coulisses et les temps forts sur nos réseaux.</p><a class="text-link" href="https://www.instagram.com/rugby_xv_news/" target="_blank" rel="noopener noreferrer">@rugby_xv_news ↗</a></article><article class="directory-card"><span class="kicker">TikTok</span><h3>Les formats courts</h3><p>Les séquences et formats vidéo du média.</p><a class="text-link" href="https://www.tiktok.com/@rugby_xv_news" target="_blank" rel="noopener noreferrer">@rugby_xv_news ↗</a></article></div></div></section>';
}
function renderLegal(){
 document.title='Mentions légales — RugbyXVNews';
 main.innerHTML=pageIntro('Mentions légales','Informations éditeur à compléter et à valider avant publication.')+'<section class="page-shell"><div class="wrap bodycopy"><div class="editorialnote"><b>Modèle de travail :</b> les champs ci-dessous ne constituent pas des mentions légales finalisées. L’éditeur doit les renseigner et les vérifier.</div><h2>Éditeur du site</h2><p>Nom / dénomination sociale : [à renseigner].<br>Forme juridique et capital : [à renseigner le cas échéant].<br>Adresse du siège : [à renseigner].<br>Numéro d’immatriculation : [à renseigner si applicable].<br>Adresse de contact : contact@rugbyxvnew.com.</p><h2>Direction de la publication</h2><p>Directeur ou directrice de la publication : [à renseigner].<br>Responsable de la rédaction : [à renseigner].</p><h2>Hébergement</h2><p>Le site est prévu pour être publié avec GitHub Pages. Confirmer l’entité d’hébergement et les coordonnées à mentionner au moment de la publication.</p><h2>Propriété intellectuelle</h2><p>Les textes, photographies, vidéos, logos et autres contenus doivent être publiés uniquement avec les droits et autorisations nécessaires. Les crédits et mentions d’auteur doivent être ajoutés à chaque média concerné.</p><h2>Contact</h2><p>Pour toute question : <a href="mailto:contact@rugbyxvnew.com">contact@rugbyxvnew.com</a>.</p></div></section>';
}
function renderPrivacy(){
 document.title='Confidentialité — RugbyXVNews';
 main.innerHTML=pageIntro('Confidentialité','Politique à adapter aux outils réellement activés sur le site.')+'<section class="page-shell"><div class="wrap bodycopy"><div class="editorialnote"><b>Modèle de travail :</b> cette page doit être mise à jour selon les outils, cookies et traitements effectivement déployés.</div><h2>Données collectées</h2><p>Dans cette version, le site ne propose pas de compte utilisateur, de commentaire, de formulaire de collecte ni d’inscription à une newsletter. Les liens de contact ouvrent le logiciel de messagerie du visiteur.</p><h2>Services tiers</h2><p>La version actuelle héberge ses polices directement sur le site et propose des liens vers des plateformes sociales externes. Les politiques de confidentialité de ces plateformes s’appliquent lorsque le visiteur utilise leurs services.</p><h2>Cookies et mesure d’audience</h2><p>Aucun outil de mesure d’audience ni gestionnaire publicitaire n’est intégré à cette maquette. Si un service de ce type est ajouté, documenter les traceurs utilisés et mettre en place le dispositif de consentement adapté avant son activation.</p><h2>Vos droits et contact</h2><p>Les coordonnées du responsable du traitement et les modalités d’exercice des droits doivent être précisées par l’éditeur avant publication. Contact : <a href="mailto:contact@rugbyxvnew.com">contact@rugbyxvnew.com</a>.</p></div></section>';
}
async function loadSportsData(){
 try{
  const response=await fetch(DATA_URL,{cache:'no-store'});
  if(!response.ok)throw new Error('Données sportives indisponibles');
  const data=await response.json();
  if(data&&typeof data==='object')SPORTS={...SPORTS,...data,competitions:Array.isArray(data.competitions)?data.competitions:[],clubs:Array.isArray(data.clubs)?data.clubs:[],players:Array.isArray(data.players)?data.players:[],videos:Array.isArray(data.videos)?data.videos:[],podcasts:Array.isArray(data.podcasts)?data.podcasts:[]};
 }catch(e){console.info('RugbyXVNews : fichier sports-data.json non chargé. Les modules de scores restent en attente de source.',e.message)}
}

async function loadEditorialData(){
 try{
  const [articleResponse,galleryResponse]=await Promise.all([
   fetch(ARTICLES_URL,{cache:'no-store'}),
   fetch(GALLERY_URL,{cache:'no-store'})
  ]);
  if(articleResponse.ok){
   const data=await articleResponse.json();
   if(data&&Array.isArray(data.articles)){
    const valid=data.articles.filter(a=>a&&typeof a.id==='string'&&typeof a.title==='string'&&typeof a.category==='string'&&Array.isArray(a.sections));
    if(valid.length||data.articles.length===0)ARTICLES=valid;
   }
  }
  if(galleryResponse.ok){
   const data=await galleryResponse.json();
   if(data&&Array.isArray(data.items))GALLERY=data.items.filter(g=>g&&typeof g.title==='string'&&typeof g.kind==='string');
  }
 }catch(e){console.info('RugbyXVNews : contenu éditorial distant non chargé, utilisation des données de démonstration.',e.message)}
}

function buildTranslationMap(){
 const map=new Map();
 if(currentLang!=='en')return map;
 const add=(from,to)=>{if(typeof from==='string'&&from&&typeof to==='string'&&to)map.set(from,to)};
 Object.entries(LOCALES.ui||{}).forEach(([fr,en])=>add(fr,en));
 Object.entries(LOCALES.competitionTranslations||{}).forEach(([id,en])=>{
  const competition=COMPETITIONS.find(c=>c.id===id);
  if(competition){add(competition.name,en.name);add(competition.description,en.description)}
 });
 ARTICLES.forEach(a=>{
  const en=LOCALES.articleTranslations&&LOCALES.articleTranslations[a.id];
  if(!en)return;
  ['title','category','type','author','published','excerpt','lead'].forEach(k=>add(a[k],en[k]));
  (a.sections||[]).forEach((section,i)=>{
   const translated=(en.sections||[])[i]||[];
   add(section[0],translated[0]);add(section[1],translated[1]);
  });
  (a.tags||[]).forEach((tag,i)=>add(tag,(en.tags||[])[i]));
 });
 GALLERY.forEach(g=>{
  const en=LOCALES.galleryTranslations&&LOCALES.galleryTranslations[g.title];
  if(en){add(g.title,en.title);add(g.caption,en.caption);add(g.kind,en.kind)}
 });
 function walkPairs(obj){
  if(!obj||typeof obj!=='object')return;
  if(Array.isArray(obj)){obj.forEach(walkPairs);return}
  Object.keys(obj).forEach(key=>{
   if(key.endsWith('En')&&typeof obj[key]==='string'){
    const frKey=key.slice(0,-2);add(obj[frKey],obj[key]);
   }
   walkPairs(obj[key]);
  });
 }
 walkPairs(SPORTS);
 return map;
}
function translateValue(value,map){
 if(typeof value!=='string'||!value)return value;
 const leading=(value.match(/^\s*/)||[''])[0],trailing=(value.match(/\s*$/)||[''])[0];
 const core=value.slice(leading.length,value.length-trailing.length);
 if(map.has(core))return leading+map.get(core)+trailing;
 let result=value;
 const keys=Array.from(map.keys()).sort((a,b)=>b.length-a.length);
 for(const key of keys){
  if(key.length<3||!result.includes(key))continue;
  result=result.split(key).join(map.get(key));
 }
 return result;
}
function updatePreferenceControls(){
 const langButton=$('[data-lang-toggle]');
 if(langButton){
  const current=$('[data-lang-current]',langButton),next=$('[data-lang-next]',langButton);
  if(current)current.textContent=currentLang.toUpperCase();
  if(next)next.textContent=(currentLang==='fr'?'en':'fr').toUpperCase();
  langButton.classList.toggle('is-en',currentLang==='en');
  const langAction=currentLang==='fr'?'Switch to English':'Passer en français';
  langButton.setAttribute('aria-label',langAction);
  langButton.title=langAction;
  langButton.setAttribute('aria-pressed',String(currentLang==='en'));
 }
 const themeButton=$('[data-theme-toggle]');
 if(themeButton){
  const dark=document.body.dataset.theme==='dark';
  const glyph=$('[data-theme-icon]',themeButton),label=$('[data-theme-label]',themeButton);
  if(glyph)glyph.textContent=dark?'☼':'☾';
  if(label)label.textContent=currentLang==='en'?(dark?'Light mode':'Dark mode'):(dark?'Mode clair':'Mode sombre');
  themeButton.setAttribute('aria-label',currentLang==='en'?(dark?'Switch to light mode':'Switch to dark mode'):(dark?'Activer le thème clair':'Activer le thème sombre'));
  themeButton.setAttribute('aria-pressed',String(dark));
 }
}
function initNavigation(){
 const menu=$('.menu'),nav=$('#navlinks');
 if(!menu||!nav)return;
 const setOpen=open=>{
  nav.classList.toggle('open',open);
  menu.setAttribute('aria-expanded',String(open));
  const closeLabel=currentLang==='en'?'Close menu':'Fermer le menu';
  const openLabel=currentLang==='en'?'Open menu':'Ouvrir le menu';
  menu.setAttribute('aria-label',open?closeLabel:openLabel);
  menu.title=open?closeLabel:openLabel;
  document.body.classList.toggle('menuopen',open);
 };
 menu.addEventListener('click',()=>setOpen(menu.getAttribute('aria-expanded')!=='true'));
 nav.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false)});
 document.addEventListener('click',e=>{
  if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menu.contains(e.target))setOpen(false);
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape')setOpen(false)});
 window.addEventListener('resize',()=>{
  if(window.innerWidth>1150&&menu.getAttribute('aria-expanded')==='true')setOpen(false);
 },{passive:true});
}
function initThemeToggle(){
 const themeButton=$('[data-theme-toggle]');
 if(!themeButton)return;
 themeButton.addEventListener('click',()=>{
  applyTheme(document.body.dataset.theme==='dark'?'light':'dark');
 });
}
function applyTheme(theme,persist=true){
 const safe=theme==='dark'?'dark':'light';
 document.body.dataset.theme=safe;
 document.documentElement.dataset.theme=safe;
 document.documentElement.style.colorScheme=safe;
 const themeMeta=$('meta[name="theme-color"]');
 if(themeMeta)themeMeta.content=safe==='dark'?'#111111':'#F6F5FA';
 const schemeMeta=$('meta[name="color-scheme"]');
 if(schemeMeta)schemeMeta.content=safe;
 if(persist){try{localStorage.setItem('rxn-theme',safe)}catch(e){}}
 updatePreferenceControls();
}
function applySiteLanguage(){
 const map=buildTranslationMap();
 document.documentElement.lang=currentLang;
 const localeMeta=$('meta[property="og:locale"]');
 if(localeMeta)localeMeta.content=currentLang==='en'?'en_GB':'fr_FR';
 if(currentLang==='en'){
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
  let node;
  while((node=walker.nextNode())){
   if(!node.nodeValue||!node.nodeValue.trim())continue;
   node.nodeValue=translateValue(node.nodeValue,map);
  }
  $('input,button,a,[aria-label],[title],[alt]').forEach(el=>{
   ['placeholder','title','aria-label','aria-description','alt'].forEach(attr=>{
    if(el.hasAttribute(attr))el.setAttribute(attr,translateValue(el.getAttribute(attr),map));
   });
  });
  document.title=translateValue(document.title,map);
  const description=$('meta[name="description"]');if(description)description.content=translateValue(description.content,map);
  const ogTitle=$('meta[property="og:title"]');if(ogTitle)ogTitle.content=translateValue(ogTitle.content,map);
  const ogDescription=$('meta[property="og:description"]');if(ogDescription)ogDescription.content=translateValue(ogDescription.content,map);
 }
 updatePreferenceControls();
}
async function loadLocaleData(){
 try{
  const response=await fetch(LOCALES_URL,{cache:'no-store'});
  if(!response.ok)throw new Error('Translations unavailable');
  const data=await response.json();
  if(data&&typeof data==='object')LOCALES=data;
 }catch(e){console.info('RugbyXVNews: English locale file not loaded.',e.message)}
}
function updateMeta(){
 const currentArticle=view==='article'?articleById(articleId):null;
 const description=currentArticle?currentArticle.excerpt:view==='competition'?compInfo(compId).description:view==='live'?'Scores, résultats, calendriers et classements des compétitions de rugby.':'RugbyXVNews : actualités, analyses et informations du rugby français et international.';
 const d=$('meta[name="description"]');if(d)d.content=description;
 const og=$('meta[property="og:title"]');if(og)og.content=document.title;
 const ogd=$('meta[property="og:description"]');if(ogd)ogd.content=description;
 const ogType=$('meta[property="og:type"]');if(ogType)ogType.content=currentArticle?'article':'website';
 const ogUrl=$('meta[property="og:url"]');if(ogUrl)ogUrl.content=location.href;
 const canonical=$('link[rel="canonical"]');if(canonical)canonical.href=location.href;
 let ogImage=$('meta[property="og:image"]');
 if(currentArticle&&safeHttpUrl(currentArticle.image)){
  if(!ogImage){ogImage=document.createElement('meta');ogImage.setAttribute('property','og:image');document.head.appendChild(ogImage)}
  ogImage.content=safeHttpUrl(currentArticle.image);
 }else if(ogImage){ogImage.remove()}
 const robots=$('meta[name="robots"]');if(robots)robots.content=(PREVIEW_MODE||(currentArticle&&currentArticle.demo))?'noindex,nofollow':'index,follow';
 const schema=$('#article-schema');if(schema)schema.remove();
 const a=view==='article'?articleById(articleId):null;
 if(a&&!PREVIEW_MODE&&!a.demo){
  const script=document.createElement('script');script.type='application/ld+json';script.id='article-schema';
  const articleSchema={'@context':'https://schema.org','@type':'NewsArticle','headline':a.title,'description':a.excerpt,'articleSection':a.category,'author':{'@type':'Organization','name':a.author},'publisher':{'@type':'Organization','name':'RugbyXVNews'},'mainEntityOfPage':location.href};
  if(a.datePublished)articleSchema.datePublished=a.datePublished;
  if(a.dateModified)articleSchema.dateModified=a.dateModified;
  if(safeHttpUrl(a.image))articleSchema.image=safeHttpUrl(a.image);
  script.textContent=JSON.stringify(articleSchema);
  document.head.appendChild(script);
 }
}
function render(){
 switch(view){
  case 'home':renderHome();break;
  case 'competition':renderCompetition();break;
  case 'live':renderLive();break;
  case 'match':renderMatch();break;
  case 'news':renderNews();break;
  case 'article':renderArticle();break;
  case 'directory':renderDirectory();break;
  case 'gallery':renderGallery();break;
  case 'videos':renderVideos();break;
  case 'podcasts':renderPodcasts();break;
  case 'media':renderMedia();break;
  case 'saved':renderSaved();break;
  case 'search':renderSearch();break;
  case 'contact':renderContact();break;
  case 'legal':renderLegal();break;
  case 'privacy':renderPrivacy();break;
  default:renderHome();
 }
 if(view==='directory'&&params.get('q'))applyDirectoryFilter();
 updateMeta();
 const active=view==='home'?'home':view==='live'||view==='match'?'live':view==='news'?'news':view==='competition'?compId:view==='directory'?'directory':view==='media'||view==='gallery'||view==='videos'||view==='podcasts'?'media':'';
 $$('[data-nav]').forEach(a=>{const key=a.dataset.nav;if(key===active||(active==='top14'&&key==='top14')||(active==='pro-d2'&&key==='prod2')||(active==='nationale'&&key==='nationale')||(active==='international'&&key==='international'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});
 $('[data-dock]').forEach(a=>a.toggleAttribute('aria-current',a.dataset.dock===(view==='match'?'live':view)));
 if(PREVIEW_MODE)$('#preview-notice').classList.remove('hidden');
 updateSavedCount();
 applySiteLanguage();
}
function notify(message){
 const el=$('#toast');if(!el)return;
 el.textContent=currentLang==='en'?translateValue(message,buildTranslationMap()):message;el.classList.add('show');
 clearTimeout(notify.timer);notify.timer=setTimeout(()=>el.classList.remove('show'),2400);
}
function toggleSaved(id){
 const saved=allSaved(),exists=saved.includes(id),next=exists?saved.filter(x=>x!==id):saved.concat(id);
 if(!storeSaved(next)){notify('Le navigateur ne permet pas de conserver les favoris.');return}
 $('[data-save]').filter(b=>b.dataset.save===id).forEach(b=>{b.setAttribute('aria-pressed',String(!exists));b.textContent=exists?'☆':'★'});
 updateSavedCount();notify(exists?'Article retiré des favoris.':'Article ajouté aux favoris.');
 if(view==='saved')renderSaved();
 applySiteLanguage();
}
function updateSavedCount(){
 const count=allSaved().length;
 $$('[data-saved-count]').forEach(x=>x.textContent=String(count));
}
async function sharePage(){
 const data={title:document.title,text:'À lire sur RugbyXVNews',url:location.href};
 try{
  if(navigator.share){await navigator.share(data);return}
  await navigator.clipboard.writeText(location.href);notify('Lien copié dans le presse-papiers.');
 }catch(e){if(e.name!=='AbortError')notify('Partage indisponible sur cet appareil.')}
}
async function copyPage(){
 try{await navigator.clipboard.writeText(location.href);notify('Lien copié dans le presse-papiers.')}
 catch(e){notify('Copie indisponible : copie l’adresse depuis la barre du navigateur.')}
}
function applyNewsFilters(){
 const input=$('#news-filter'),category=$('#news-category'),type=$('#news-type'),results=$('#news-results');
 if(!results)return;
 const q=escText(input?input.value:'');
 const c=category?category.value:'',t=type?type.value:'';
 const filtered=ARTICLES.filter(a=>(!q||escText([a.title,a.excerpt,a.category,a.type,a.tags.join(' ')].join(' ')).includes(q))&&(!c||a.category===c)&&(!t||a.type===t));
 results.innerHTML=filtered.length?filtered.map(card).join(''):emptyState('Aucun article','Modifie les filtres ou essaie une autre recherche.');
 const count=$('#news-count');if(count)count.textContent=filtered.length+' article(s) affiché(s).';
 applySiteLanguage();
}
function applyDirectoryFilter(){
 const input=$('#directory-filter'),results=$('#directory-results');if(!input||!results)return;
 const isClubs=(params.get('kind')||'clubs')==='clubs',items=isClubs?SPORTS.clubs:SPORTS.players,q=escText(input.value);
 const filtered=(items||[]).filter(x=>escText([x.name,x.competition,x.position,x.description].join(' ')).includes(q));
 results.innerHTML=filtered.length?filtered.map(x=>'<article class="directory-card"><span class="kicker">'+esc(isClubs?x.competition||'Club':x.position||'Joueur')+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.description||'')+'</p>'+(x.url?'<a class="text-link" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer">Consulter ↗</a>':'')+'</article>').join(''):emptyState('Aucun résultat','Aucune fiche ne correspond à ta recherche.');
 applySiteLanguage();
}
function initEvents(){
 document.addEventListener('click',e=>{
  const lang=e.target.closest('[data-lang-toggle]');
  if(lang){const next=currentLang==='fr'?'en':'fr';try{localStorage.setItem('rxn-lang',next)}catch(err){}location.reload();return}
  const save=e.target.closest('[data-save]');if(save){toggleSaved(save.dataset.save);return}
  if(e.target.closest('[data-share]')){sharePage();return}
  if(e.target.closest('[data-copy]')){copyPage();return}
  if(e.target.closest('[data-print]')){window.print();return}
  const gallery=e.target.closest('[data-gallery]');if(gallery){openGallery(Number(gallery.dataset.gallery));return}
  const font=e.target.closest('[data-font]');if(font){document.body.classList.toggle('article-font-large',font.dataset.font==='up');document.body.classList.toggle('article-font-small',font.dataset.font==='down');return}
  const refresh=e.target.closest('[data-refresh-data]');if(refresh){refreshSportsData(refresh);return}
  const filter=e.target.closest('[data-gallery-filter]');if(filter){applyGalleryFilter(filter.dataset.galleryFilter);return}
 });
 const newsFilter=$('#news-filter');if(newsFilter)newsFilter.addEventListener('input',applyNewsFilters);
 const newsCategory=$('#news-category');if(newsCategory)newsCategory.addEventListener('change',applyNewsFilters);
 const newsType=$('#news-type');if(newsType)newsType.addEventListener('change',applyNewsFilters);
 const directoryFilter=$('#directory-filter');if(directoryFilter)directoryFilter.addEventListener('input',applyDirectoryFilter);
 const searchForm=$('#page-search');if(searchForm)searchForm.addEventListener('submit',e=>{e.preventDefault();const q=$('#page-search-input').value.trim();location.href='?view=search&q='+encodeURIComponent(q)});
 const globalSearch=$('#global-search');if(globalSearch)globalSearch.addEventListener('submit',e=>{e.preventDefault();const q=$('#global-search-input').value.trim();if(q)location.href='?view=search&q='+encodeURIComponent(q)});
 const dialog=$('#search-dialog');
 $$('[data-open-search]').forEach(b=>b.addEventListener('click',()=>{if(dialog&&typeof dialog.showModal==='function'){dialog.showModal();setTimeout(()=>$('#global-search-input').focus(),20)}else location.href='?view=search'}));
 document.addEventListener('keydown',e=>{
  if((e.key==='/'&&!e.metaKey&&!e.ctrlKey&&!e.altKey)&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();if(dialog&&dialog.showModal)dialog.showModal();setTimeout(()=>$('#global-search-input').focus(),20)}
  if(e.key==='Escape'&&dialog&&dialog.open)dialog.close()
 });
 const toTop=$('.totop');
 if(toTop){window.addEventListener('scroll',()=>toTop.classList.toggle('visible',window.scrollY>450),{passive:true});toTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}))}
 if(view==='article')initReadingProgress();
}
function initReadingProgress(){
 const bar=$('#reading-progress-bar'),article=$('.article-main');if(!bar||!article)return;
 const update=()=>{const rect=article.getBoundingClientRect(),total=article.offsetHeight-window.innerHeight;const passed=Math.max(0,Math.min(total,-rect.top));bar.style.width=(total>0?passed/total*100:0)+'%'};
 window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
}
function applyGalleryFilter(kind){
 $$('[data-gallery-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.galleryFilter===kind)));
 $$('[data-gallery]').forEach(b=>b.classList.toggle('hidden',kind!=='all'&&b.dataset.kind!==kind));
}
function openGallery(index){
 const item=GALLERY[index];if(!item)return;
 let dlg=$('#gallery-dialog');
 if(!dlg){
  dlg=document.createElement('dialog');dlg.id='gallery-dialog';dlg.className='gallery-dialog';
  dlg.innerHTML='<form method="dialog" class="dialog-close-row"><button class="icon-button" aria-label="Fermer">×</button></form><div class="gallery-dialog-visual"><strong></strong></div><p></p>';
  document.body.appendChild(dlg);
 }
 const frame=$('.gallery-dialog-visual',dlg);
 frame.className='gallery-dialog-visual '+(item.tone||'green');
 frame.querySelectorAll('img').forEach(img=>img.remove());
 const image=safeHttpUrl(item.image);
 if(image){
  frame.classList.add('has-image');
  const img=document.createElement('img');img.src=image;img.alt='';img.width=1200;img.height=900;img.decoding='async';frame.prepend(img);
 }
 $('.gallery-dialog-visual strong',dlg).textContent=item.title;
 $('p',dlg).textContent=item.caption+(item.credit?' · Crédit : '+item.credit:'');
 applySiteLanguage();
 if(dlg.showModal)dlg.showModal();
}
async function refreshSportsData(button){
 const label=button.textContent;button.disabled=true;button.textContent='Actualisation…';
 await loadSportsData();
 render();
 notify('Données rechargées. Vérifie la date de dernière mise à jour et la source.');
}
function registerServiceWorker(){
 if('serviceWorker' in navigator&&location.protocol.startsWith('http')){
  navigator.serviceWorker.register('./sw.js').catch(e=>console.info('Service worker non activé',e.message));
 }
}
async function boot(){
 let initialTheme='dark';
 try{const savedTheme=localStorage.getItem('rxn-theme');if(savedTheme==='light'||savedTheme==='dark')initialTheme=savedTheme}catch(e){}
 applyTheme(initialTheme,false);
 initThemeToggle();
 initNavigation();
 await Promise.all([loadSportsData(),loadEditorialData(),loadLocaleData()]);
 render();
 initEvents();
 registerServiceWorker();
}
boot();
})();