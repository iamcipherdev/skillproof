/* SkillProof shared utilities: auth, storage, Firebase RTDB via REST */
(function(){
  'use strict';
  var RTDB = 'https://ewntro-default-rtdb.firebaseio.com';

  var LS = {
    get: function(k, d){ try{ var v = localStorage.getItem('sp_'+k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
    set: function(k, v){ try{ localStorage.setItem('sp_'+k, JSON.stringify(v)); }catch(e){} },
    del: function(k){ try{ localStorage.removeItem('sp_'+k); }catch(e){} }
  };

  var DEMO_STUDENTS = [
    {id:'demo123', password:'demo123', name:'Demo Student', academy:'Roots Academy'}
  ];
  var DEMO_TEACHER = {id:'admin', password:'admin123', name:'Admin Teacher', academy:'Roots Academy'};

  function allStudents(){
    var custom = LS.get('students', []);
    return DEMO_STUDENTS.concat(custom);
  }

  function rtdbPut(path, data){
    try{
      fetch(RTDB + path + '.json', {method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data)})
        .catch(function(){});
    }catch(e){}
  }
  function rtdbGet(path){
    return fetch(RTDB + path + '.json').then(function(r){ return r.json(); }).catch(function(){ return null; });
  }

  var api = {
    /* ---------- auth ---------- */
    loginStudent: function(id, pw){
      id = String(id||'').trim(); pw = String(pw||'').trim();
      var s = allStudents().find(function(x){ return x.id===id && x.password===pw; });
      if(s){ LS.set('session', {role:'student', id:s.id, name:s.name, academy:s.academy||'Roots Academy'}); return s; }
      return null;
    },
    loginTeacher: function(id, pw){
      id = String(id||'').trim(); pw = String(pw||'').trim();
      if(id===DEMO_TEACHER.id && pw===DEMO_TEACHER.password){
        LS.set('session', {role:'teacher', id:id, name:DEMO_TEACHER.name, academy:DEMO_TEACHER.academy});
        return DEMO_TEACHER;
      }
      return null;
    },
    logout: function(loginUrl){ LS.del('session'); location.href = loginUrl || 'index.html'; },
    session: function(){ return LS.get('session', null); },
    requireAuth: function(role, loginUrl){
      var s = api.session();
      if(!s || s.role!==role){ location.href = loginUrl; return null; }
      return s;
    },

    /* ---------- students ---------- */
    students: allStudents,
    addStudent: function(name, id, password){
      var custom = LS.get('students', []);
      if(allStudents().some(function(x){ return x.id===id; })) return {error:'Ye ID pehle se hai!'};
      custom.push({id:id, password:password, name:name, academy:'Roots Academy'});
      LS.set('students', custom);
      rtdbPut('/skillproof/students/'+encodeURIComponent(id), {name:name, academy:'Roots Academy'});
      return {ok:true};
    },

    /* ---------- results ---------- */
    saveResult: function(studentId, testId, data){
      var all = LS.get('results', {});
      if(!all[studentId]) all[studentId] = {};
      data.updatedAt = new Date().toISOString();
      all[studentId][testId] = data;
      LS.set('results', all);
      rtdbPut('/skillproof/results/'+encodeURIComponent(studentId)+'/'+encodeURIComponent(testId), data);
    },
    getResults: function(studentId){
      var all = LS.get('results', {});
      return all[studentId] || {};
    },
    getResult: function(studentId, testId){
      return api.getResults(studentId)[testId] || null;
    },
    overall: function(studentId){
      var r = api.getResults(studentId);
      var keys = Object.keys(r);
      if(!keys.length) return {avg:0, count:0};
      var sum = 0, n = 0;
      keys.forEach(function(k){ if(typeof r[k].total==='number'){ sum += r[k].total; n++; } });
      return {avg: n? Math.round(sum/n):0, count:n};
    },

    /* ---------- certificates ---------- */
    makeCertId: function(){
      return 'SP-2026-' + Math.floor(10000 + Math.random()*90000);
    },
    saveCert: function(cert){
      var all = LS.get('certs', {});
      all[cert.id] = cert;
      LS.set('certs', all);
      rtdbPut('/skillproof/certificates/'+encodeURIComponent(cert.id), cert);
    },
    getCertLocal: function(id){ return LS.get('certs', {})[id] || null; },
    getCert: function(id){
      var local = api.getCertLocal(id);
      if(local) return Promise.resolve(local);
      return rtdbGet('/skillproof/certificates/'+encodeURIComponent(id));
    },

    /* ---------- utils ---------- */
    esc: function(s){
      return String(s==null?'':s).replace(/[&<>"']/g, function(c){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
      });
    },
    fmtTime: function(sec){
      sec = Math.max(0, Math.floor(sec));
      var m = Math.floor(sec/60), s = sec%60;
      return (m<10?'0':'')+m + ':' + (s<10?'0':'')+s;
    },
    shuffle: function(arr){
      var a = arr.slice();
      for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
      return a;
    },
    today: function(){
      var d = new Date();
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return d.getDate()+' '+months[d.getMonth()]+' '+d.getFullYear();
    }
  };

  window.SP = api;
})();
