/* ============================================================
   НАСТРОЙКИ САЙТА — заполняются один раз, здесь и больше нигде
   ============================================================ */
window.SITE = {
  YM_ID: 0   // номер счётчика Яндекс Метрики (только цифры). 0 = Метрика выключена
};

/* ---------- Яндекс Метрика ---------- */
(function(){
  var id = window.SITE.YM_ID;
  if(!id) return;
  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
  ym(id,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
})();

/* цель в Метрике: goal('audit_form') */
window.goal = function(name){
  try{ if(window.SITE.YM_ID && window.ym) ym(window.SITE.YM_ID,'reachGoal',name); }catch(e){}
};

/* цели по кликам: канал, аудит, бриф, скачивание протокола */
document.addEventListener('click',function(e){
  var a = e.target.closest ? e.target.closest('a') : null;
  if(!a) return;
  var h = a.getAttribute('href') || '';
  if(h.indexOf('t.me/') > -1 && h.indexOf('?direct') < 0) goal('tg_click');
  else if(h.indexOf('audit.html') === 0) goal(h.indexOf('express') > -1 ? 'express_click' : h.indexOf('discount') > -1 ? 'audit_click_discount' : 'audit_click');
  else if(h.indexOf('strateg.html') === 0) goal('brief_click');
  else if(h.indexOf('protokol.pdf') > -1)  goal('protocol_download');
});

/* уведомление о cookie — тихое, один раз */
(function(){
  var k='cookie_ok';
  try{ if(localStorage.getItem(k)) return; }catch(e){}
  function mount(){
    var d=document.createElement('div');
    d.setAttribute('role','region'); d.setAttribute('aria-label','Уведомление о cookie');
    d.style.cssText='position:fixed;left:12px;right:12px;bottom:12px;z-index:90;max-width:560px;margin:0 auto;'+
      'background:#16242F;border:1px solid #2A3F4E;border-radius:12px;padding:12px 14px;display:flex;gap:12px;align-items:center;'+
      'font:13px/1.45 Manrope,system-ui,sans-serif;color:#B4C5D0;box-shadow:0 12px 30px rgba(0,0,0,.35)';
    d.innerHTML='<span style="flex:1">Сайт использует cookie и Яндекс Метрику, чтобы понимать, что читают. '+
      'Подробнее — в <a href="privacy.html" style="color:#2DD4BF">Политике</a>.</span>'+
      '<button type="button" style="background:#2DD4BF;color:#06231F;border:0;border-radius:8px;padding:8px 12px;font:700 13px Manrope,system-ui,sans-serif;cursor:pointer">Понятно</button>';
    d.querySelector('button').onclick=function(){ try{localStorage.setItem(k,'1')}catch(e){} d.remove(); };
    document.body.appendChild(d);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount); else mount();
})();
