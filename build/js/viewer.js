!function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";n.d(t,"a",function(){return l});var i=n(1),o=n(2),a=n(5),r=n(6),c=n(7),l=function(){function e(){}return e.parse=function(t){for(var n=new i.b,r=e.normalize(t),c=0,l=0,s=1,u=!1,d=!1,m=0,p=0,f=120,h=[],b=0,v=r.length;b<v;b++){var g=r[b];if("#"===g.charAt(0))e.parseOrder(n,g,s,c,m),n.bpm.length>0&&(f=n.bpm[n.bpm.length-1].value);else{if(0===c&&(l=e.getMeasureLineCount(r,b)),","===g.charAt(0)){0===l&&(m+=60/f*1*4*1e3);var E=new a.a(4,4,s,p);n.measure.push(E),c=0,s++,p=m;continue}for(var L=o.a.LANE_1;L<=o.a.LANE_7;L++){var y=parseInt(g.charAt(L-o.a.LANE_1));if(!isNaN(y)){var I=!1;if(y===o.c.SLIDE_A)if(u)for(var S=L+1;S<=o.a.LANE_7;S++){var N=parseInt(g.charAt(S-o.a.LANE_1));if(N===o.c.SLIDE_A_END){I=!0;break}}else I=!0,u=!0;else if(y===o.c.SLIDE_B)if(d)for(var S=L+1;S<=o.a.LANE_7;S++){var N=parseInt(g.charAt(S-o.a.LANE_1));if(N===o.c.SLIDE_B_END){I=!0;break}}else I=!0,d=!0;y!==o.c.SKILL&&y!==o.c.SKILL_HOLD||h.push(m);var _=new o.b(s,c,m,L,y,0,-1,-1,I,!1);if(n.notes.push(_),y===o.c.SLIDE_A_END){u=!1;for(var S=L-1;S>=o.a.LANE_1;S--){var N=parseInt(g.charAt(S-o.a.LANE_1));if(N===o.c.SLIDE_A){u=!0;break}}}else if(y===o.c.SLIDE_B_END){d=!1;for(var S=L-1;S>=o.a.LANE_1;S--){var N=parseInt(g.charAt(S-o.a.LANE_1));if(N===o.c.SLIDE_B){d=!0;break}}}}}m+=60/f*1*4*1e3/l,c+=4/l}}n.notes.sort(function(e,t){return e.time!==t.time?e.time-t.time:e.type!==o.c.SKILL&&e.type!==o.c.SKILL_HOLD||t.type===o.c.SKILL||t.type===o.c.SKILL_HOLD?t.type!==o.c.SKILL&&t.type!==o.c.SKILL_HOLD||e.type===o.c.SKILL||e.type===o.c.SKILL_HOLD?0:1:-1});for(var b=0,v=n.notes.length;b<v;b++){var _=n.notes[b];if((_.type===o.c.HOLD||_.type===o.c.SKILL_HOLD)&&-1!==_.next)for(var H=b+1;H<v;H++){var B=n.notes[H];if(_.lane===B.lane){_.next=H,B.next=-1;break}}if(_.type===o.c.SLIDE_A)for(var H=b+1;H<v;H++){var B=n.notes[H];if(B.type===o.c.SLIDE_A_END){_.next=H;break}if(B.type===o.c.SLIDE_A){_.next=H;for(var w=H+1;w<v;w++){var C=n.notes[w];if(B.time<C.time)break;if(C.type===o.c.SLIDE_A_END){_.next=w;break}}break}}if(_.type===o.c.SLIDE_B)for(var H=b+1;H<v;H++){var B=n.notes[H];if(B.type===o.c.SLIDE_B_END){_.next=H;break}if(B.type===o.c.SLIDE_B){_.next=H;for(var w=H+1;w<v;w++){var C=n.notes[w];if(B.time<C.time)break;if(C.type===o.c.SLIDE_B_END){_.next=w;break}}break}}}if(null!==n.fever.start&&null!==n.fever.end){var D=n.fever.start,O=n.fever.end;n.notes.filter(function(e){return e.time>=D.time&&e.time<O.time}).forEach(function(e){return e.feverRange=!0})}h&&n.notes.forEach(function(e){if(!(e.time<h[0])){e.time>=h[h.length-1]&&e.type!==o.c.SKILL&&e.type!==o.c.SKILL_HOLD&&(e.timeFromSkill=e.time-h[h.length-1],e.skillIndex=h.length-1);for(var t=0,n=h.length;t<n;t++)e.time!==h[t]||e.type!==o.c.SKILL&&e.type!==o.c.SKILL_HOLD?e.time>=h[t]&&e.time<h[t+1]&&(e.timeFromSkill=e.time-h[t],e.skillIndex=t):0!==t&&(e.timeFromSkill=e.time-h[t-1],e.skillIndex=t-1)}}),n.time=n.notes[n.notes.length-1].time;var A=0;return n.notes.forEach(function(e){A++}),n},e.load=function(t,n){try{var i=new XMLHttpRequest;i.open("get",t,!0),i.addEventListener("load",function(){if(200===i.status)try{var o=e.parse(i.responseText);n(null,o)}catch(e){n(e,null)}else n(new Error("譜面の読み込みに失敗しました : "+t),null)}),i.send()}catch(e){n(new Error("譜面の読み込みに失敗しました : "+t),null)}},e.normalize=function(e){for(var t=e.split(/\r\n|\r|\n/),n=0,i=t.length;n<i;n++){var o=t[n],a=o.indexOf("//");-1!==a&&(o=o.substr(0,a)),0!==o.length?t[n]=o:(t.splice(n,1),n--,i--)}return t},e.parseOrder=function(e,t,n,o,a){var l,s,u=t.indexOf(":");switch(-1===u?(l=t.trim(),s=""):(l=t.substr(0,u),s=t.substr(u+1)),l.toUpperCase()){case"#TITLE":e.title=s;break;case"#BAND":e.band=s;break;case"#LEVEL":e.level=parseInt(s);break;case"#DIFFICULTY":var d=s.toUpperCase();"EXPERT"!==d&&"HARD"!==d&&"NORMAL"!==d&&"EASY"!==d||(e.difficulty=i.a[d]);break;case"#BPM":var m=new r.a(n,o,parseFloat(s));e.bpm.push(m);break;case"#FEVERREADY":e.fever.ready=new c.a(n,o,a);break;case"#FEVERSTART":e.fever.start=new c.a(n,o,a);break;case"#FEVEREND":e.fever.end=new c.a(n,o,a);break;case"#MEASURE":break;default:console.warn("未対応の命令 : "+l)}},e.getMeasureLineCount=function(e,t){for(var n=0,i=t,o=e.length;i<o;i++){var a=e[i];if("#"!==a.charAt(0)){if(","===a.charAt(0))break;n++}}return n},e}()},function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"a",function(){return i});var i,o=function(){function e(){this.title="",this.band="",this.difficulty=i.EXPERT,this.level=0,this.bpm=[],this.measure=[],this.notes=[],this.time=0,this.fever={ready:null,start:null,end:null}}return e}();!function(e){e[e.EXPERT=3]="EXPERT",e[e.HARD=2]="HARD",e[e.NORMAL=1]="NORMAL",e[e.EASY=0]="EASY"}(i||(i={}))},function(e,t,n){"use strict";n.d(t,"b",function(){return o}),n.d(t,"a",function(){return i}),n.d(t,"c",function(){return a});var i,o=function(){function e(e,t,n,i,o,a,r,c,l,s){this.measureCount=e,this.beat=t,this.time=n,this.lane=i,this.type=o,this.next=a,this.timeFromSkill=r,this.skillIndex=c,this.slideStart=l,this.feverRange=s}return e}();!function(e){e[e.LANE_1=1]="LANE_1",e[e.LANE_2=2]="LANE_2",e[e.LANE_3=3]="LANE_3",e[e.LANE_4=4]="LANE_4",e[e.LANE_5=5]="LANE_5",e[e.LANE_6=6]="LANE_6",e[e.LANE_7=7]="LANE_7"}(i||(i={}));var a;!function(e){e[e.NORMAL=1]="NORMAL",e[e.SKILL=2]="SKILL",e[e.FLICK=3]="FLICK",e[e.HOLD=4]="HOLD",e[e.SKILL_HOLD=5]="SKILL_HOLD",e[e.SLIDE_A=6]="SLIDE_A",e[e.SLIDE_A_END=7]="SLIDE_A_END",e[e.SLIDE_B=8]="SLIDE_B",e[e.SLIDE_B_END=9]="SLIDE_B_END"}(a||(a={}))},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){}return Object.defineProperty(e,"pageTitle",{get:function(){return document.title},set:function(e){document.title=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"title",{get:function(){return document.getElementById("title").innerHTML},set:function(e){document.getElementById("title").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"difficulty",{get:function(){return document.getElementById("difficulty").innerHTML},set:function(e){document.getElementById("difficulty").innerHTML=e,document.body.className=e.toLowerCase()},enumerable:!0,configurable:!0}),Object.defineProperty(e,"level",{get:function(){return document.getElementById("level").innerHTML},set:function(e){document.getElementById("level").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"band",{get:function(){return document.getElementById("band").innerHTML},set:function(e){document.getElementById("band").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"bpm",{get:function(){return document.getElementById("bpm").innerHTML},set:function(e){document.getElementById("bpm").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"combo",{get:function(){return document.getElementById("combo").innerHTML},set:function(e){document.getElementById("combo").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"time",{get:function(){return document.getElementById("time").innerHTML},set:function(e){document.getElementById("time").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"scorePotential",{get:function(){return document.getElementById("score-potential").innerHTML},set:function(e){document.getElementById("score-potential").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"scoreElement",{get:function(){return document.getElementById("score-html")},set:function(e){var t=document.getElementById("score-html");e instanceof HTMLElement&&(t.innerHTML="",t.appendChild(e),document.getElementById("contents").className="fadein")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionColBeat",{get:function(){return parseInt(document.getElementById("col-beat-value").value)},set:function(e){document.getElementById("col-beat-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionBeatHeight",{get:function(){return parseInt(document.getElementById("beat-height-value").value)},set:function(e){document.getElementById("beat-height-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionLaneWidth",{get:function(){return parseInt(document.getElementById("lane-width-value").value)},set:function(e){document.getElementById("lane-width-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionNoteSize",{get:function(){return parseInt(document.getElementById("note-size-value").value)},set:function(e){document.getElementById("note-size-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"message",{get:function(){return document.getElementById("message").innerHTML},set:function(e){var t=document.getElementById("message");t.innerHTML=e,t.style.display=""!==e?"block":"none"},enumerable:!0,configurable:!0}),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),o=n(8);window.addEventListener("DOMContentLoaded",function(){try{var e=function(){var e=location.search.match(/load=([^&]*)(&|$)/);if(e)return e[1];throw new Error("パラメータエラー")}();i.a.load(e,function(e,t){try{if(e||!t)throw e;o.a.init(t)}catch(e){console.error(e),o.a.outputError(e.message)}})}catch(e){console.error(e),o.a.outputError(e.message)}window.addEventListener("dragover",function(e){e.preventDefault()}),window.addEventListener("drop",function(e){e.preventDefault(),o.a.load(e.dataTransfer.files[0])}),document.getElementById("menu-btn").addEventListener("click",o.a.menuSwitch),document.getElementById("option-reset-btn").addEventListener("click",o.a.resetOption),document.getElementById("option-close-btn").addEventListener("click",o.a.menuSwitch),document.getElementById("col-beat-inc").addEventListener("click",function(){o.a.optionColBeatInc()}),document.getElementById("col-beat-dec").addEventListener("click",function(){o.a.optionColBeatDec()}),document.getElementById("beat-height-inc").addEventListener("click",function(){o.a.optionBeatHeightInc()}),document.getElementById("beat-height-dec").addEventListener("click",function(){o.a.optionBeatHeightDec()}),document.getElementById("lane-width-inc").addEventListener("click",function(){o.a.optionLaneWidthInc()}),document.getElementById("lane-width-dec").addEventListener("click",function(){o.a.optionLaneWidthDec()}),document.getElementById("note-size-inc").addEventListener("click",function(){o.a.optionNoteSizeInc()}),document.getElementById("note-size-dec").addEventListener("click",function(){o.a.optionNoteSizeDec()})})},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(e,t,n,i){this.numer=e,this.denom=t,this.value=n,this.time=i}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(e,t,n){this.measureCount=e,this.beat=t,this.value=n}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(e,t,n){this.measureCount=e,this.beat=t,this.time=n}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return s});var i=n(0),o=n(1),a=n(2),r=n(9),c=n(3),l=n(10),s=function(){function e(){}return e.init=function(t){e.option=e.loadOption(),e.isOptionChange=!1,e.update(t)},e.update=function(t){t&&(e.viewer=new r.a,e.viewer.title=t.title,e.viewer.band=t.band,e.viewer.difficulty=o.a[t.difficulty],e.viewer.level=""+t.level,e.viewer.bpm=e.getBpmStr(t),e.viewer.combo=""+t.notes.length,e.viewer.time=e.getTimeStr(t),e.viewer.scorePotential=e.calcScorePotential(t,e.option.comprehensivePower),e.viewer.grpScript=t,c.a.pageTitle=e.viewer.title+" 【"+e.viewer.difficulty+"】",c.a.title=e.viewer.title,c.a.difficulty=e.viewer.difficulty,c.a.level=e.viewer.level,c.a.band=e.viewer.band,c.a.bpm=e.viewer.bpm,c.a.combo=e.viewer.combo,c.a.time=e.viewer.time,c.a.scorePotential=e.viewer.scorePotential),c.a.scoreElement=e.createScoreElement(e.viewer.grpScript)},e.setMessage=function(e){c.a.message=e},e.load=function(t){var n=new FileReader;if(t.size){if(t.size>1048576)throw new Error("ファイルサイズが大きすぎます");n.addEventListener("load",function(){try{var t=n.result,o=i.a.parse(t);e.update(o)}catch(t){e.outputError(t.message)}}),n.readAsText(t)}},e.menuSwitch=function(){var t=document.getElementById("menu-btn"),n=document.getElementById("menu-bg"),i=document.getElementById("menu-panel");"on"!==t.className?(t.className="on",n.className="on",i.className="on",e.isOptionChange=!1):(t.className="off",n.className="off",i.className="off",e.isOptionChange&&(e.update(),e.writeOption()))},e.optionColBeatInc=function(){e.option.colBeat<1e3&&(e.option.colBeat+=4,e.isOptionChange=!0)},e.optionColBeatDec=function(){e.option.colBeat>4&&(e.option.colBeat-=4,e.isOptionChange=!0)},e.optionBeatHeightInc=function(){e.option.beatHeight<1e3&&(e.option.beatHeight+=4,e.isOptionChange=!0)},e.optionBeatHeightDec=function(){e.option.beatHeight>4&&(e.option.beatHeight-=4,e.isOptionChange=!0)},e.optionLaneWidthInc=function(){e.option.laneWidth<100&&(e.option.laneWidth+=2,e.isOptionChange=!0)},e.optionLaneWidthDec=function(){e.option.laneWidth>2&&(e.option.laneWidth-=2,e.isOptionChange=!0)},e.optionNoteSizeInc=function(){e.option.noteSize<100&&(e.option.noteSize+=2,e.isOptionChange=!0)},e.optionNoteSizeDec=function(){e.option.noteSize>2&&(e.option.noteSize-=2,e.isOptionChange=!0)},e.outputError=function(t){e.setMessage(t)},e.resetOption=function(){e.option=new l.a,e.isOptionChange=!0},e.loadOption=function(){var e=localStorage.getItem("grp_viewer_option"),t=null;if(e){var n=JSON.parse(e);t=new l.a(n._colBeat,n._beatHeight,n._laneWidth,n._noteSize)}else t=new l.a;return t},e.writeOption=function(){var t=JSON.stringify(e.option);localStorage.setItem("grp_viewer_option",t)},e.getBpmStr=function(e){if(1===e.bpm.length)return""+Math.ceil(100*e.bpm[0].value)/100;var t=e.bpm.map(function(e){return e.value}),n=Math.min.apply(null,t),i=Math.max.apply(null,t);return i===n?""+i:n+" ～ "+i},e.getTimeStr=function(e){var t=new Date(e.time);return t.getMinutes()+":"+("0"+t.getSeconds()).slice(-2)},e.calcScorePotential=function(t,n){for(var i=0,o=.01*(t.level-5)+1,a=t.notes.length,r=3*n*o/a*1.1,c=0,l=t.notes.length;c<l;c++){var s=t.notes[c],u=e.getComboCoefficient(c),d=1;-1!==s.skillIndex&&this.option.skills[s.skillIndex].isScore&&s.timeFromSkill<this.option.skills[s.skillIndex].time&&(d=this.option.skills[s.skillIndex].rate);var m=e.option.isFeverActive&&s.feverRange?2:1,p=Math.floor(r*u);i+=Math.floor(p*d)*m}return""+i.toLocaleString()},e.getComboCoefficient=function(e){for(var t=[{combo:20,coefficient:1},{combo:50,coefficient:1.01},{combo:100,coefficient:1.02},{combo:150,coefficient:1.03},{combo:200,coefficient:1.04},{combo:250,coefficient:1.05},{combo:300,coefficient:1.06},{combo:400,coefficient:1.07},{combo:500,coefficient:1.08},{combo:600,coefficient:1.09},{combo:700,coefficient:1.1},{combo:9999,coefficient:1.11}],n=0,i=t;n<i.length;n++){var o=i[n];if(e<o.combo)return o.coefficient}throw new Error("コンボ係数取得エラー : "+e)},e.createScoreElement=function(t){e.uncompleteHoldNotes=[],e.uncompleteSlideNotes=[];var n=document.createElement("table"),i=document.createElement("tr");n.appendChild(i),n.className="measure-col";for(var o=0,a=t.measure.length;o<a;){var r=document.createElement("td");i.appendChild(r);var c=document.createElement("table");c.className="measure-row",r.appendChild(c);var l=0,s=4,u=t.measure[o],d=!0;do{var m=o+1;if(o<a){u=t.measure[o];s=u.numer/u.denom*4}var p=e.createMeasureElement(m,s);if(o<a){for(var f=p.getElementsByClassName("note-area")[0],h=0;h<e.uncompleteHoldNotes.length;h++){var b=e.uncompleteHoldNotes[h],v=t.notes[b.next],g=e.createHoldLine(t,u,b,!1,d);f.appendChild(g),u.value===v.measureCount&&(e.uncompleteHoldNotes.splice(h,1),h--)}for(var h=0;h<e.uncompleteSlideNotes.length;h++){var b=e.uncompleteSlideNotes[h],v=t.notes[b.next],E=e.createSlideLine(t,u,b,!1,d);f.appendChild(E),u.value===v.measureCount&&(e.uncompleteSlideNotes.splice(h,1),h--)}e.addNote(p,t,u),e.addBackgroundArea(p,t,u)}c.insertBefore(p,c.firstChild),o++,d=!1,l+=s}while(l<e.option.colBeat)}return n},e.createMeasureElement=function(t,n){var i=document.createElement("tr");i.id="measure-"+t;var o=document.createElement("th"),a=document.createElement("div");a.className="header-area",a.innerHTML=""+t,o.appendChild(a),i.appendChild(o);var r=document.createElement("td"),c=document.createElement("div"),l=document.createElement("div");c.className="note-area",c.style.width=7*e.option.laneWidth-1+"px",c.style.height=n*e.option.beatHeight-1+"px",l.className="background-area",l.style.width=7*e.option.laneWidth-1+"px",l.style.height=n*e.option.beatHeight-1+"px";for(var s=0;s<n;s++){var u=document.createElement("div");u.className="beat-sub-line",u.style.bottom=(s+.5)*e.option.beatHeight-1+"px",l.appendChild(u)}for(var s=1;s<n;s++){var d=document.createElement("div");d.className="beat-line",d.style.bottom=s*e.option.beatHeight-1+"px",l.appendChild(d)}for(var s=1;s<7;s++){var m=document.createElement("div");m.className="lane-split-line",m.style.left=s*e.option.laneWidth-1+"px",l.appendChild(m)}return r.appendChild(l),r.appendChild(c),i.appendChild(r),i},e.addNote=function(t,n,i){for(var o=t.getElementsByClassName("note-area")[0],r=0,c=n.notes.length;r<c;r++){var l=n.notes[r];if(l.measureCount===i.value){var s=document.createElement("div");switch(l.type){case a.c.NORMAL:s.className="note normal";break;case a.c.SKILL:s.className="note skill";break;case a.c.FLICK:s.className="note flick";break;case a.c.HOLD:s.className="note hold";break;case a.c.SKILL_HOLD:s.className="note skill";break;case a.c.SLIDE_A_END:case a.c.SLIDE_B_END:s.className="note hold"}l.type===a.c.SLIDE_A?l.slideStart?(s.style.height=e.option.noteSize+"px",s.style.bottom=e.option.beatHeight*l.beat-e.option.noteSize/2+"px",s.className="note hold"):(s.style.bottom=e.option.beatHeight*l.beat-2+"px",s.className="note slide"):l.type===a.c.SLIDE_B?l.slideStart?(s.style.height=e.option.noteSize+"px",s.style.bottom=e.option.beatHeight*l.beat-e.option.noteSize/2+"px",s.className="note hold"):(s.style.bottom=e.option.beatHeight*l.beat-1.5+"px",s.className="note slide"):(s.style.height=e.option.noteSize+"px",s.style.bottom=e.option.beatHeight*l.beat-e.option.noteSize/2-.5+"px"),s.style.width=e.option.noteSize+"px";var u=(e.option.laneWidth-1)/2-e.option.noteSize/2;if(s.style.left=e.option.laneWidth*(l.lane-1)+u+"px",s.style.zIndex=""+(c-r+1e3),o.appendChild(s),(l.type===a.c.HOLD||l.type===a.c.SKILL_HOLD)&&l.next>=0){var d=e.createHoldLine(n,i,l,!0,!1);o.appendChild(d)}else if(l.type===a.c.SLIDE_A||l.type===a.c.SLIDE_B){var m=e.createSlideLine(n,i,l,!0,!1);o.appendChild(m)}}}return t},e.addBackgroundArea=function(t,n,i){for(var o=t.getElementsByClassName("background-area")[0],a=[n.fever.ready,n.fever.start,n.fever.end],r=["fever-ready-area","fever-area"],c=i.numer/i.denom*4,l=0;l<2;l++){var s=a[l],u=a[l+1];if(null!==s&&null!==u&&e.option.isFeverActive&&!(s.measureCount>i.value||u.measureCount<i.value))if(s.measureCount===i.value){var d=document.createElement("div");d.className=r[l],d.style.height=(c-s.beat)*e.option.beatHeight+"px",d.style.bottom=s.beat*e.option.beatHeight-1+"px",o.appendChild(d)}else if(u.measureCount===i.value){var d=document.createElement("div");d.className=r[l],d.style.height=u.beat*e.option.beatHeight+"px",d.style.bottom="-1px",o.appendChild(d)}else{var d=document.createElement("div");d.className=r[l],d.style.height=c*e.option.beatHeight+"px",d.style.bottom="-1px",o.appendChild(d)}}return t},e.createHoldLine=function(t,n,i,o,a){var r=document.createElement("div");r.className="hold-line";var c,l,s=n.numer/n.denom*4,u=t.notes[i.next];i.measureCount===u.measureCount?(c=(u.beat-i.beat)*e.option.beatHeight,l=i.beat*e.option.beatHeight):n.value===i.measureCount?(c=(s-i.beat)*e.option.beatHeight,l=i.beat*e.option.beatHeight,o&&e.uncompleteHoldNotes.push(i)):n.value===u.measureCount?(c=u.beat*e.option.beatHeight,l=0):(c=s*e.option.beatHeight,l=0,o&&e.uncompleteHoldNotes.push(i)),a&&(c-=1,l+=1),r.style.height=c+"px",r.style.bottom=l-1+"px",r.style.width=e.option.noteSize+"px";var d=(e.option.laneWidth-1)/2-e.option.noteSize/2;return r.style.left=e.option.laneWidth*(i.lane-1)+d+"px",r},e.createSlideLine=function(t,n,i,o,a){var r=document.createElement("div");r.className="slide-line";var c=document.createElement("div"),l=n.numer/n.denom*4,s=t.notes[i.next],u=0,d=0;if(i.measureCount===s.measureCount)u=s.beat-i.beat;else{if(!o){var m=t.measure[i.measureCount-1];d+=(m.numer/m.denom*4-i.beat)*e.option.beatHeight}for(var p=i.measureCount,f=t.measure.length;p<f;p++){var m=t.measure[p];if(m.value===s.measureCount){u+=l-i.beat+s.beat;break}u+=m.numer/m.denom*4,m.value<n.value&&!o&&(d+=m.numer/m.denom*4*e.option.beatHeight)}}var h,b,v=u*e.option.beatHeight,g=(s.lane-i.lane)*e.option.laneWidth,E=Math.atan2(g,v)/Math.PI*180,L=Math.sqrt(Math.pow(v,2)+Math.pow(g,2));i.measureCount===s.measureCount?(h=(s.beat-i.beat)*e.option.beatHeight,b=i.beat*e.option.beatHeight):n.value===i.measureCount?(h=(l-i.beat)*e.option.beatHeight,b=i.beat*e.option.beatHeight,o&&e.uncompleteSlideNotes.push(i)):n.value===s.measureCount?(h=s.beat*e.option.beatHeight,b=0):(h=l*e.option.beatHeight,b=0,o&&e.uncompleteSlideNotes.push(i)),a&&(h-=.5,b+=.5),c.className="slide-line-area",c.style.width=Math.abs(g)+e.option.noteSize+"px",c.style.height=h+"px",c.style.bottom=b-.5+"px";var y=(e.option.laneWidth-1)/2-e.option.noteSize/2,I=e.option.laneWidth*(Math.min(i.lane,s.lane)-1)+y;c.style.left=I+"px";var S=Math.abs(Math.sin(Math.atan2(v,g))),N=e.option.noteSize*S;return r.style.width=N+"px",r.style.height=L+2*e.option.noteSize+"px",E>0?(r.style.left="0px",r.style.setProperty("-ms-transform-origin","0 100%"),r.style.transformOrigin="0 100%"):(r.style.right="0px",r.style.setProperty("-ms-transform-origin","100% 100%"),r.style.transformOrigin="100% 100%"),r.style.bottom=-d+"px",r.style.setProperty("-ms-transform","rotate("+E+"deg"),r.style.transform="rotate("+E+"deg",c.appendChild(r),c},e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){this.title="No Title",this.difficulty="EXPERT",this.level="0",this.band="No Band",this.bpm="120",this.combo="0",this.time="0:00",this.scorePotential="0.00",this.grpScript=null}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return a});var i=n(3),o=n(11),a=function(){function e(e,t,n,i,a,r){void 0===e&&(e=24),void 0===t&&(t=32),void 0===n&&(n=12),void 0===i&&(i=9),void 0===a&&(a=[new o.a(!0,2,7e3),new o.a(!0,2,7e3),new o.a(!0,2,7e3),new o.a(!0,2,7e3),new o.a(!0,2,7e3),new o.a(!0,2,7e3)]),void 0===r&&(r=!0),this.colBeat=e,this.beatHeight=t,this.laneWidth=n,this.noteSize=i,this.comprehensivePower=2e5,this.skills=a,this.isFeverActive=r}return Object.defineProperty(e.prototype,"colBeat",{get:function(){return this._colBeat},set:function(e){this._colBeat=e,i.a.optionColBeat=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"beatHeight",{get:function(){return this._beatHeight},set:function(e){this._beatHeight=e,i.a.optionBeatHeight=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"laneWidth",{get:function(){return this._laneWidth},set:function(e){this._laneWidth=e,i.a.optionLaneWidth=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"noteSize",{get:function(){return this._noteSize},set:function(e){this._noteSize=e,i.a.optionNoteSize=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"comprehensivePower",{get:function(){return this._comprehensivePower},set:function(e){this._comprehensivePower=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"skills",{get:function(){return this._skills},set:function(e){this._skills=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isFeverActive",{get:function(){return this._isFeverActive},set:function(e){this._isFeverActive=e},enumerable:!0,configurable:!0}),e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(e,t,n){this.isScore=e,this.rate=t,this.time=n}return e}()}]);