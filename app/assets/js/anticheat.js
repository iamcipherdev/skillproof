/* SkillProof anti-cheat helpers: tab-switch detection, fullscreen, paste guard */
(function(){
  'use strict';
  window.AntiCheat = {
    /* opts: {max:3, warnEl, onLock} */
    tabWatch: function(opts){
      opts = opts || {};
      var max = opts.max || 3, count = 0;
      var warnEl = typeof opts.warnEl==='string' ? document.getElementById(opts.warnEl) : opts.warnEl;
      function show(msg){
        if(warnEl){ warnEl.textContent = msg; warnEl.classList.add('show'); }
        else { alert(msg); }
      }
      document.addEventListener('visibilitychange', function(){
        if(document.hidden){
          count++;
          if(count >= max){
            show('\u26a0\ufe0f 3 dafa tab switch! Test LOCK ho gaya hai.');
            if(opts.onLock) opts.onLock(count);
          } else {
            show('\u26a0\ufe0f Tab switch detected ('+count+'/'+max+')! Test par wapas aao, warna lock ho jayega.');
          }
        }
      });
      return { count: function(){ return count; } };
    },
    goFullscreen: function(){
      var el = document.documentElement;
      try{
        if(el.requestFullscreen) el.requestFullscreen();
        else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      }catch(e){}
    },
    /* prevent paste into an input (typing test) */
    noPaste: function(inputEl, warnEl){
      inputEl.addEventListener('paste', function(e){
        e.preventDefault();
        var w = typeof warnEl==='string' ? document.getElementById(warnEl) : warnEl;
        if(w){ w.textContent = '\u26a0\ufe0f Paste karna mana hai! Khud type karo.'; w.classList.add('show'); }
      });
    }
  };
})();
