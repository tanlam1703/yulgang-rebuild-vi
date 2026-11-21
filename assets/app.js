
(function(){
 var q=document.getElementById('q'),box=document.getElementById('results'),P=window.SITE_PREFIX||'',sel=-1;
 function norm(s){return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d');}
 var IDX=(window.SEARCH_INDEX||[]).map(function(d){return {t:d.t,u:d.u,x:d.x,n:norm(d.t+' '+d.x)};});
 function esc(s){return s.replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
 function snippet(d,terms){var n=norm(d.x),i=n.indexOf(terms[0]);if(i<0)i=0;var a=Math.max(0,i-60);
  var s=esc(d.x.substr(a,180));return (a>0?'…':'')+s+'…';}
 function run(){var v=norm(q.value.trim());sel=-1;if(v.length<2){box.hidden=true;return;}
  var terms=v.split(/\s+/),res=[];
  IDX.forEach(function(d){var ok=terms.every(function(t){return d.n.indexOf(t)>=0;});
   if(ok){var sc=terms.reduce(function(a,t){return a+(norm(d.t).indexOf(t)>=0?10:0);},0);res.push([sc,d]);}});
  res.sort(function(a,b){return b[0]-a[0];});
  box.innerHTML=res.length?res.slice(0,20).map(function(r){return '<a href="'+P+r[1].u+'"><b>'+esc(r[1].t)+'</b><small>'+snippet(r[1],terms)+'</small></a>';}).join(''):'<a><small>Không tìm thấy kết quả</small></a>';
  box.hidden=false;}
 q.addEventListener('input',run);
 q.addEventListener('keydown',function(e){var a=box.querySelectorAll('a[href]');if(!a.length)return;
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();sel=(sel+(e.key==='ArrowDown'?1:-1)+a.length)%a.length;
   a.forEach(function(x,i){x.classList.toggle('sel',i===sel);});}
  if(e.key==='Enter'){(a[sel>=0?sel:0]).click();} if(e.key==='Escape'){box.hidden=true;}});
 document.addEventListener('click',function(e){if(!e.target.closest('.search'))box.hidden=true;});
 document.addEventListener('keydown',function(e){if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus();}});
 var lb=document.getElementById('lightbox');
 document.querySelectorAll('figure img').forEach(function(im){im.addEventListener('click',function(){lb.querySelector('img').src=im.src;lb.hidden=false;});});
 var act=document.querySelector('.sidebar li.active');if(act)act.scrollIntoView({block:'center'});
})();
