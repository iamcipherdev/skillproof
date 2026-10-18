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
  var DEMO_ACADEMY = {id:'academy', password:'academy123', name:'Roots Academy', email:'academy'};

  var DEFAULT_ACADEMY = {name:'Roots Academy', email:'', logo:'', address:'', phone:''};
  var DEFAULT_DESIGN = {theme:'gold', template:'classic', directorName:'', directorTitle:'Director', showScore:true, tagline:'Pehle TEST, phir certificate.'};

  function allStudents(){
    var custom = LS.get('students', []);
    return DEMO_STUDENTS.concat(custom);
  }
  function allTeachers(){
    var custom = LS.get('teachers', []);
    return [DEMO_TEACHER].concat(custom);
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
      var t = allTeachers().find(function(x){ return x.id===id && x.password===pw; });
      if(t){
        LS.set('session', {role:'teacher', id:t.id, name:t.name, academy:t.academy});
        return t;
      }
      return null;
    },
    loginAcademy: function(id, pw){
      id = String(id||'').trim(); pw = String(pw||'').trim();
      var prof = api.getAcademyProfile();
      var okId = (id===DEMO_ACADEMY.id || (prof.email && id===prof.email));
      if(okId && pw===DEMO_ACADEMY.password){
        LS.set('session', {role:'academy', id:id, name:prof.name||DEMO_ACADEMY.name, academy:prof.name||DEMO_ACADEMY.name});
        return DEMO_ACADEMY;
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

    /* ---------- teachers (academy-managed) ---------- */
    teachers: allTeachers,
    addTeacher: function(name, id, password){
      var custom = LS.get('teachers', []);
      if(allTeachers().some(function(x){ return x.id===id; })) return {error:'Ye ID pehle se hai!'};
      custom.push({id:id, password:password, name:name, academy:'Roots Academy'});
      LS.set('teachers', custom);
      rtdbPut('/skillproof/teachers/'+encodeURIComponent(id), {name:name});
      return {ok:true};
    },
    removeTeacher: function(id){
      var custom = LS.get('teachers', []).filter(function(x){ return x.id!==id; });
      LS.set('teachers', custom);
      return {ok:true};
    },

    /* ---------- academy profile + certificate design ---------- */
    getAcademyProfile: function(){
      var p = LS.get('academy', {});
      return Object.assign({}, DEFAULT_ACADEMY, p);
    },
    saveAcademyProfile: function(p){
      LS.set('academy', p);
      rtdbPut('/skillproof/academy/profile', {name:p.name, address:p.address, phone:p.phone});
    },
    getCertDesign: function(){
      var d = LS.get('certdesign', {});
      return Object.assign({}, DEFAULT_DESIGN, d);
    },
    saveCertDesign: function(d){
      LS.set('certdesign', d);
      var slim = Object.assign({}, d); delete slim.logo;
      rtdbPut('/skillproof/academy/certdesign', slim);
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

    /* ---------- certificate HTML renderer (shared) ---------- */
    certHTML: function(cert, design, profile, verifyUrl){
      design = design || api.getCertDesign();
      profile = profile || api.getAcademyProfile();
      var qr = 'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=' + encodeURIComponent(verifyUrl);
      var logo = profile.logo ? '<img class="clogo" src="'+profile.logo+'" alt="logo">' : '';
      var sigName = design.directorName ? '<b>'+api.esc(design.directorName)+'</b><br>'+api.esc(design.directorTitle||'') : 'Authorized<br><b>'+api.esc(profile.name||'SkillProof')+'</b>';
      var scoreLine = design.showScore === false ? '' : '<div class="meta"><b>'+cert.score+'%</b> score ke saath</div>';
      return '<div class="cert cert-theme-'+design.theme+' cert-tpl-'+design.template+'">'
        + logo
        + '<div class="orn">✦ '+api.esc(profile.name||'SkillProof')+' ✦</div>'
        + '<h1>Certificate</h1>'
        + '<div class="ofline">OF ACHIEVEMENT</div>'
        + '<div class="meta" style="margin-top:20px">Ye certificate diya jata hai</div>'
        + '<div class="rname">'+api.esc(cert.studentName)+'</div>'
        + '<div class="meta"><b>'+api.esc(cert.course)+'</b> course mukammal karne par</div>'
        + scoreLine
        + '<div class="meta">'+api.esc(profile.name||cert.academy||'')+' — '+api.esc(cert.date)+'</div>'
        + '<div class="cid">'+api.esc(cert.id)+'</div>'
        + '<div class="qrrow">'
        +   '<div class="sig">'+sigName+'</div>'
        +   '<div style="text-align:center"><img src="'+qr+'" alt="QR" width="140" height="140"><div class="sig">Scan karke verify karo</div></div>'
        + '</div>'
        + '</div>';
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
