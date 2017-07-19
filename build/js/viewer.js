!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,n){"use strict";n.d(t,"a",function(){return l});var o=n(1),i=n(2),a=n(5),r=n(6),c=n(7),l=function(){function e(){}return e.parse=function(t){for(var n=new o.b,r=e.normalize(t),c=0,l=0,u=1,s=!1,d=!1,m=0,f=0,p=120,h=[],b=0,v=r.length;b<v;b++){var g=r[b];if("#"===g.charAt(0))e.parseOrder(n,g,u,c,m),n.bpm.length>0&&(p=n.bpm[n.bpm.length-1].value);else{if(0===c&&(l=e.getMeasureLineCount(r,b)),","===g.charAt(0)){0===l&&(m+=60/p*1*4*1e3);var E=new a.a(4,4,u,f);n.measure.push(E),c=0,u++,f=m;continue}for(var y=i.a.LANE_1;y<=i.a.LANE_7;y++){var L=parseInt(g.charAt(y-i.a.LANE_1));if(!isNaN(L)){var I=!1;if(L===i.c.SLIDE_A)if(s)for(var N=y+1;N<=i.a.LANE_7;N++){var S=parseInt(g.charAt(N-i.a.LANE_1));if(S===i.c.SLIDE_A_END){I=!0;break}}else I=!0,s=!0;else if(L===i.c.SLIDE_B)if(d)for(var N=y+1;N<=i.a.LANE_7;N++){var S=parseInt(g.charAt(N-i.a.LANE_1));if(S===i.c.SLIDE_B_END){I=!0;break}}else I=!0,d=!0;L!==i.c.SKILL&&L!==i.c.SKILL_HOLD||h.push(m);var _=new i.b(u,c,m,y,L,0,I,!1,!1);if(n.notes.push(_),L===i.c.SLIDE_A_END){s=!1;for(var N=y-1;N>=i.a.LANE_1;N--){var S=parseInt(g.charAt(N-i.a.LANE_1));if(S===i.c.SLIDE_A){s=!0;break}}}else if(L===i.c.SLIDE_B_END){d=!1;for(var N=y-1;N>=i.a.LANE_1;N--){var S=parseInt(g.charAt(N-i.a.LANE_1));if(S===i.c.SLIDE_B){d=!0;break}}}}}m+=60/p*1*4*1e3/l,c+=4/l}}n.notes.sort(function(e,t){return e.time-t.time});for(var b=0,v=n.notes.length;b<v;b++){var _=n.notes[b];if((_.type===i.c.HOLD||_.type===i.c.SKILL_HOLD)&&-1!==_.next)for(var B=b+1;B<v;B++){var H=n.notes[B];if(_.lane===H.lane){_.next=B,H.next=-1;break}}if(_.type===i.c.SLIDE_A)for(var B=b+1;B<v;B++){var H=n.notes[B];if(H.type===i.c.SLIDE_A_END){_.next=B;break}if(H.type===i.c.SLIDE_A){_.next=B;for(var w=B+1;w<v;w++){var C=n.notes[w];if(H.time<C.time)break;if(C.type===i.c.SLIDE_A_END){_.next=w;break}}break}}if(_.type===i.c.SLIDE_B)for(var B=b+1;B<v;B++){var H=n.notes[B];if(H.type===i.c.SLIDE_B_END){_.next=B;break}if(H.type===i.c.SLIDE_B){_.next=B;for(var w=B+1;w<v;w++){var C=n.notes[w];if(H.time<C.time)break;if(C.type===i.c.SLIDE_B_END){_.next=w;break}}break}}}if(null!==n.fever.start&&null!==n.fever.end){var D=n.fever.start,A=n.fever.end;n.notes.filter(function(e){return e.time>=D.time&&e.time<A.time}).forEach(function(e){return e.feverRange=!0})}return n.notes.filter(function(e){for(var t=0,n=h;t<n.length;t++){var o=n[t];if(e.time>=o&&e.time<o+7e3)return!0}return!1}).forEach(function(e){return e.skillRange=!0}),n.time=n.notes[n.notes.length-1].time,n},e.load=function(t,n){try{var o=new XMLHttpRequest;o.open("get",t,!0),o.addEventListener("load",function(){if(200===o.status)try{var i=e.parse(o.responseText);n(null,i)}catch(e){n(e,null)}else n(new Error("譜面の読み込みに失敗しました : "+t),null)}),o.send()}catch(e){n(new Error("譜面の読み込みに失敗しました : "+t),null)}},e.normalize=function(e){for(var t=e.split(/\r\n|\r|\n/),n=0,o=t.length;n<o;n++){var i=t[n],a=i.indexOf("//");-1!==a&&(i=i.substr(0,a)),0!==i.length?t[n]=i:(t.splice(n,1),n--,o--)}return t},e.parseOrder=function(e,t,n,i,a){var l,u,s=t.indexOf(":");switch(-1===s?(l=t.trim(),u=""):(l=t.substr(0,s),u=t.substr(s+1)),l.toUpperCase()){case"#TITLE":e.title=u;break;case"#BAND":e.band=u;break;case"#LEVEL":e.level=parseInt(u);break;case"#DIFFICULTY":var d=u.toUpperCase();"EXPERT"!==d&&"HARD"!==d&&"NORMAL"!==d&&"EASY"!==d||(e.difficulty=o.a[d]);break;case"#BPM":var m=new r.a(n,i,parseFloat(u));e.bpm.push(m);break;case"#FEVERREADY":e.fever.ready=new c.a(n,i,a);break;case"#FEVERSTART":e.fever.start=new c.a(n,i,a);break;case"#FEVEREND":e.fever.end=new c.a(n,i,a);break;case"#MEASURE":break;default:console.warn("未対応の命令 : "+l)}},e.getMeasureLineCount=function(e,t){for(var n=0,o=t,i=e.length;o<i;o++){var a=e[o];if("#"!==a.charAt(0)){if(","===a.charAt(0))break;n++}}return n},e}()},function(e,t,n){"use strict";n.d(t,"b",function(){return i}),n.d(t,"a",function(){return o});var o,i=function(){function e(){this.title="",this.band="",this.difficulty=o.EXPERT,this.level=0,this.bpm=[],this.measure=[],this.notes=[],this.time=0,this.fever={ready:null,start:null,end:null}}return e}();!function(e){e[e.EXPERT=3]="EXPERT",e[e.HARD=2]="HARD",e[e.NORMAL=1]="NORMAL",e[e.EASY=0]="EASY"}(o||(o={}))},function(e,t,n){"use strict";n.d(t,"b",function(){return i}),n.d(t,"a",function(){return o}),n.d(t,"c",function(){return a});var o,i=function(){function e(e,t,n,o,i,a,r,c,l){this.measureCount=e,this.beat=t,this.time=n,this.lane=o,this.type=i,this.next=a,this.slideStart=r,this.skillRange=c,this.feverRange=l}return e}();!function(e){e[e.LANE_1=1]="LANE_1",e[e.LANE_2=2]="LANE_2",e[e.LANE_3=3]="LANE_3",e[e.LANE_4=4]="LANE_4",e[e.LANE_5=5]="LANE_5",e[e.LANE_6=6]="LANE_6",e[e.LANE_7=7]="LANE_7"}(o||(o={}));var a;!function(e){e[e.NORMAL=1]="NORMAL",e[e.SKILL=2]="SKILL",e[e.FLICK=3]="FLICK",e[e.HOLD=4]="HOLD",e[e.SKILL_HOLD=5]="SKILL_HOLD",e[e.SLIDE_A=6]="SLIDE_A",e[e.SLIDE_A_END=7]="SLIDE_A_END",e[e.SLIDE_B=8]="SLIDE_B",e[e.SLIDE_B_END=9]="SLIDE_B_END"}(a||(a={}))},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o=function(){function e(){}return Object.defineProperty(e,"pageTitle",{get:function(){return document.title},set:function(e){document.title=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"title",{get:function(){return document.getElementById("title").innerHTML},set:function(e){document.getElementById("title").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"difficulty",{get:function(){return document.getElementById("difficulty").innerHTML},set:function(e){document.getElementById("difficulty").innerHTML=e,document.body.className=e.toLowerCase()},enumerable:!0,configurable:!0}),Object.defineProperty(e,"level",{get:function(){return document.getElementById("level").innerHTML},set:function(e){document.getElementById("level").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"band",{get:function(){return document.getElementById("band").innerHTML},set:function(e){document.getElementById("band").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"bpm",{get:function(){return document.getElementById("bpm").innerHTML},set:function(e){document.getElementById("bpm").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"combo",{get:function(){return document.getElementById("combo").innerHTML},set:function(e){document.getElementById("combo").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"time",{get:function(){return document.getElementById("time").innerHTML},set:function(e){document.getElementById("time").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"scorePotential",{get:function(){return document.getElementById("score-potential").innerHTML},set:function(e){document.getElementById("score-potential").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"scoreElement",{get:function(){return document.getElementById("score-html")},set:function(e){var t=document.getElementById("score-html");e instanceof HTMLElement&&(t.innerHTML="",t.appendChild(e),document.getElementById("contents").className="fadein")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionColBeat",{get:function(){return parseInt(document.getElementById("col-beat-value").value)},set:function(e){document.getElementById("col-beat-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionBeatHeight",{get:function(){return parseInt(document.getElementById("beat-height-value").value)},set:function(e){document.getElementById("beat-height-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionLaneWidth",{get:function(){return parseInt(document.getElementById("lane-width-value").value)},set:function(e){document.getElementById("lane-width-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"optionNoteSize",{get:function(){return parseInt(document.getElementById("note-size-value").value)},set:function(e){document.getElementById("note-size-value").value=""+e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"message",{get:function(){return document.getElementById("message").innerHTML},set:function(e){var t=document.getElementById("message");t.innerHTML=e,t.style.display=""!==e?"block":"none"},enumerable:!0,configurable:!0}),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),i=n(8);window.addEventListener("DOMContentLoaded",function(){try{var e=function(){var e=location.search.match(/load=([^&]*)(&|$)/);if(e)return e[1];throw new Error("パラメータエラー")}();o.a.load(e,function(e,t){try{if(e||!t)throw e;i.a.init(t)}catch(e){console.error(e),i.a.outputError(e.message)}})}catch(e){console.error(e),i.a.outputError(e.message)}window.addEventListener("dragover",function(e){e.preventDefault()}),window.addEventListener("drop",function(e){e.preventDefault(),i.a.load(e.dataTransfer.files[0])}),document.getElementById("menu-btn").addEventListener("click",i.a.menuSwitch),document.getElementById("option-close-btn").addEventListener("click",i.a.menuSwitch),document.getElementById("col-beat-inc").addEventListener("click",function(){i.a.optionColBeatInc()}),document.getElementById("col-beat-dec").addEventListener("click",function(){i.a.optionColBeatDec()}),document.getElementById("beat-height-inc").addEventListener("click",function(){i.a.optionBeatHeightInc()}),document.getElementById("beat-height-dec").addEventListener("click",function(){i.a.optionBeatHeightDec()}),document.getElementById("lane-width-inc").addEventListener("click",function(){i.a.optionLaneWidthInc()}),document.getElementById("lane-width-dec").addEventListener("click",function(){i.a.optionLaneWidthDec()}),document.getElementById("note-size-inc").addEventListener("click",function(){i.a.optionNoteSizeInc()}),document.getElementById("note-size-dec").addEventListener("click",function(){i.a.optionNoteSizeDec()})})},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o=function(){function e(e,t,n,o){this.numer=e,this.denom=t,this.value=n,this.time=o}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o=function(){function e(e,t,n){this.measureCount=e,this.beat=t,this.value=n}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o=function(){function e(e,t,n){this.measureCount=e,this.beat=t,this.time=n}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return u});var o=n(0),i=n(1),a=n(2),r=n(9),c=n(3),l=n(10),u=function(){function e(){}return e.init=function(t){e.option=e.loadOption(),e.isOptionChange=!1,e.update(t)},e.update=function(t){t&&(e.viewer=new r.a,e.viewer.title=t.title,e.viewer.band=t.band,e.viewer.difficulty=i.a[t.difficulty],e.viewer.level=""+t.level,e.viewer.bpm=e.getBpmStr(t),e.viewer.combo=""+t.notes.length,e.viewer.time=e.getTimeStr(t),e.viewer.scorePotential=e.calcScorePotential(t,e.option.comprehensivePower),e.viewer.grpScript=t,c.a.pageTitle=e.viewer.title+" 【"+e.viewer.difficulty+"】",c.a.title=e.viewer.title,c.a.difficulty=e.viewer.difficulty,c.a.level=e.viewer.level,c.a.band=e.viewer.band,c.a.bpm=e.viewer.bpm,c.a.combo=e.viewer.combo,c.a.time=e.viewer.time,c.a.scorePotential=e.viewer.scorePotential),c.a.scoreElement=e.createScoreElement(e.viewer.grpScript)},e.setMessage=function(e){c.a.message=e},e.load=function(t){var n=new FileReader;if(t.size){if(t.size>1048576)throw new Error("ファイルサイズが大きすぎます");n.addEventListener("load",function(){try{var t=n.result,i=o.a.parse(t);e.update(i)}catch(t){e.outputError(t.message)}}),n.readAsText(t)}},e.menuSwitch=function(){var t=document.getElementById("menu-btn"),n=document.getElementById("menu-bg"),o=document.getElementById("menu-panel");"on"!==t.className?(t.className="on",n.className="on",o.className="on",e.isOptionChange=!1):(t.className="off",n.className="off",o.className="off",e.isOptionChange&&(e.update(),e.writeOption()))},e.optionColBeatInc=function(){e.option.colBeat<1e3&&(e.option.colBeat+=4,e.isOptionChange=!0)},e.optionColBeatDec=function(){e.option.colBeat>4&&(e.option.colBeat-=4,e.isOptionChange=!0)},e.optionBeatHeightInc=function(){e.option.beatHeight<1e3&&(e.option.beatHeight+=4,e.isOptionChange=!0)},e.optionBeatHeightDec=function(){e.option.beatHeight>4&&(e.option.beatHeight-=4,e.isOptionChange=!0)},e.optionLaneWidthInc=function(){e.option.laneWidth<100&&(e.option.laneWidth+=2,e.isOptionChange=!0)},e.optionLaneWidthDec=function(){e.option.laneWidth>2&&(e.option.laneWidth-=2,e.isOptionChange=!0)},e.optionNoteSizeInc=function(){e.option.noteSize<100&&(e.option.noteSize+=2,e.isOptionChange=!0)},e.optionNoteSizeDec=function(){e.option.noteSize>2&&(e.option.noteSize-=2,e.isOptionChange=!0)},e.outputError=function(t){e.setMessage(t)},e.loadOption=function(){var e=localStorage.getItem("grp_viewer_option"),t=null;if(e){var n=JSON.parse(e);t=new l.a(n._colBeat,n._beatHeight,n._laneWidth,n._noteSize)}else t=new l.a;return t},e.writeOption=function(){var t=JSON.stringify(e.option);localStorage.setItem("grp_viewer_option",t)},e.getBpmStr=function(e){if(1===e.bpm.length)return""+Math.ceil(100*e.bpm[0].value)/100;var t=e.bpm.map(function(e){return e.value}),n=Math.min.call(null,t),o=Math.max.call(null,t);return o===n?""+o:n+" ～ "+o},e.getTimeStr=function(e){var t=new Date(e.time);return t.getMinutes()+":"+("0"+t.getSeconds()).slice(-2)},e.calcScorePotential=function(t,n){for(var o=0,i=.01*(t.level-5)+1,a=t.notes.length,r=3*n*i/a*1.1,c=0,l=t.notes.length;c<l;c++){var u=t.notes[c],s=e.getComboCoefficient(c),d=u.skillRange?2:1,m=u.feverRange?2:1;o+=Math.floor(r*s)*d*m}return""+(o/1e4).toFixed(4)},e.getComboCoefficient=function(e){for(var t=[{combo:20,coefficient:1},{combo:50,coefficient:1.01},{combo:100,coefficient:1.02},{combo:150,coefficient:1.03},{combo:200,coefficient:1.04},{combo:250,coefficient:1.05},{combo:300,coefficient:1.06},{combo:400,coefficient:1.07},{combo:500,coefficient:1.08},{combo:600,coefficient:1.09},{combo:700,coefficient:1.1},{combo:9999,coefficient:1.11}],n=0,o=t;n<o.length;n++){var i=o[n];if(e<i.combo)return i.coefficient}throw new Error("コンボ係数取得エラー : "+e)},e.createScoreElement=function(t){e.uncompleteHoldNotes=[],e.uncompleteSlideNotes=[];var n=document.createElement("table"),o=document.createElement("tr");n.appendChild(o),n.className="measure-col";for(var i=0,a=t.measure.length;i<a;){var r=document.createElement("td");o.appendChild(r);var c=document.createElement("table");c.className="measure-row",r.appendChild(c);var l=0,u=4,s=t.measure[i],d=!0;do{var m=i+1;if(i<a){s=t.measure[i];u=s.numer/s.denom*4}var f=e.createMeasureElement(m,u);if(i<a){for(var p=f.getElementsByClassName("note-area")[0],h=0;h<e.uncompleteHoldNotes.length;h++){var b=e.uncompleteHoldNotes[h],v=t.notes[b.next],g=e.createHoldLine(t,s,b,!1,d);p.appendChild(g),s.value===v.measureCount&&(e.uncompleteHoldNotes.splice(h,1),h--)}for(var h=0;h<e.uncompleteSlideNotes.length;h++){var b=e.uncompleteSlideNotes[h],v=t.notes[b.next],E=e.createSlideLine(t,s,b,!1,d);p.appendChild(E),s.value===v.measureCount&&(e.uncompleteSlideNotes.splice(h,1),h--)}e.addNote(f,t,s),e.addBackgroundArea(f,t,s)}c.insertBefore(f,c.firstChild),i++,d=!1,l+=u}while(l<e.option.colBeat)}return n},e.createMeasureElement=function(t,n){var o=document.createElement("tr");o.id="measure-"+t;var i=document.createElement("th"),a=document.createElement("div");a.className="header-area",a.innerHTML=""+t,i.appendChild(a),o.appendChild(i);var r=document.createElement("td"),c=document.createElement("div"),l=document.createElement("div");c.className="note-area",c.style.width=7*e.option.laneWidth-1+"px",c.style.height=n*e.option.beatHeight-1+"px",l.className="background-area",l.style.width=7*e.option.laneWidth-1+"px",l.style.height=n*e.option.beatHeight-1+"px";for(var u=0;u<n;u++){var s=document.createElement("div");s.className="beat-sub-line",s.style.bottom=(u+.5)*e.option.beatHeight-1+"px",l.appendChild(s)}for(var u=1;u<n;u++){var d=document.createElement("div");d.className="beat-line",d.style.bottom=u*e.option.beatHeight-1+"px",l.appendChild(d)}for(var u=1;u<7;u++){var m=document.createElement("div");m.className="lane-split-line",m.style.left=u*e.option.laneWidth-1+"px",l.appendChild(m)}return r.appendChild(l),r.appendChild(c),o.appendChild(r),o},e.addNote=function(t,n,o){for(var i=t.getElementsByClassName("note-area")[0],r=0,c=n.notes.length;r<c;r++){var l=n.notes[r];if(l.measureCount===o.value){var u=document.createElement("div");switch(l.type){case a.c.NORMAL:u.className="note normal";break;case a.c.SKILL:u.className="note skill";break;case a.c.FLICK:u.className="note flick";break;case a.c.HOLD:u.className="note hold";break;case a.c.SKILL_HOLD:u.className="note skill";break;case a.c.SLIDE_A_END:case a.c.SLIDE_B_END:u.className="note hold"}l.type===a.c.SLIDE_A?l.slideStart?(u.style.height=e.option.noteSize+"px",u.style.bottom=e.option.beatHeight*l.beat-e.option.noteSize/2+"px",u.className="note hold"):(u.style.bottom=e.option.beatHeight*l.beat-2+"px",u.className="note slide"):l.type===a.c.SLIDE_B?l.slideStart?(u.style.height=e.option.noteSize+"px",u.style.bottom=e.option.beatHeight*l.beat-e.option.noteSize/2+"px",u.className="note hold"):(u.style.bottom=e.option.beatHeight*l.beat-1.5+"px",u.className="note slide"):(u.style.height=e.option.noteSize+"px",u.style.bottom=e.option.beatHeight*l.beat-e.option.noteSize/2-.5+"px"),u.style.width=e.option.noteSize+"px";var s=(e.option.laneWidth-1)/2-e.option.noteSize/2;if(u.style.left=e.option.laneWidth*(l.lane-1)+s+"px",u.style.zIndex=""+(c-r+1e3),i.appendChild(u),(l.type===a.c.HOLD||l.type===a.c.SKILL_HOLD)&&l.next>=0){var d=e.createHoldLine(n,o,l,!0,!1);i.appendChild(d)}else if(l.type===a.c.SLIDE_A||l.type===a.c.SLIDE_B){var m=e.createSlideLine(n,o,l,!0,!1);i.appendChild(m)}}}return t},e.addBackgroundArea=function(t,n,o){for(var i=t.getElementsByClassName("background-area")[0],a=[n.fever.ready,n.fever.start,n.fever.end],r=["fever-ready-area","fever-area"],c=o.numer/o.denom*4,l=0;l<2;l++){var u=a[l],s=a[l+1];if(null!==u&&null!==s&&!(u.measureCount>o.value||s.measureCount<o.value))if(u.measureCount===o.value){var d=document.createElement("div");d.className=r[l],d.style.height=(c-u.beat)*e.option.beatHeight+"px",d.style.bottom=u.beat*e.option.beatHeight-1+"px",i.appendChild(d)}else if(s.measureCount===o.value){var d=document.createElement("div");d.className=r[l],d.style.height=s.beat*e.option.beatHeight+"px",d.style.bottom="-1px",i.appendChild(d)}else{var d=document.createElement("div");d.className=r[l],d.style.height=c*e.option.beatHeight+"px",d.style.bottom="-1px",i.appendChild(d)}}return t},e.createHoldLine=function(t,n,o,i,a){var r=document.createElement("div");r.className="hold-line";var c,l,u=n.numer/n.denom*4,s=t.notes[o.next];o.measureCount===s.measureCount?(c=(s.beat-o.beat)*e.option.beatHeight,l=o.beat*e.option.beatHeight):n.value===o.measureCount?(c=(u-o.beat)*e.option.beatHeight,l=o.beat*e.option.beatHeight,i&&e.uncompleteHoldNotes.push(o)):n.value===s.measureCount?(c=s.beat*e.option.beatHeight,l=0):(c=u*e.option.beatHeight,l=0,i&&e.uncompleteHoldNotes.push(o)),a&&(c-=1,l+=1),r.style.height=c+"px",r.style.bottom=l-1+"px",r.style.width=e.option.noteSize+"px";var d=(e.option.laneWidth-1)/2-e.option.noteSize/2;return r.style.left=e.option.laneWidth*(o.lane-1)+d+"px",r},e.createSlideLine=function(t,n,o,i,a){var r=document.createElement("div");r.className="slide-line";var c=document.createElement("div"),l=n.numer/n.denom*4,u=t.notes[o.next],s=0,d=0;if(o.measureCount===u.measureCount)s=u.beat-o.beat;else{if(!i){var m=t.measure[o.measureCount-1];d+=(m.numer/m.denom*4-o.beat)*e.option.beatHeight}for(var f=o.measureCount,p=t.measure.length;f<p;f++){var m=t.measure[f];if(m.value===u.measureCount){s+=l-o.beat+u.beat;break}s+=m.numer/m.denom*4,m.value<n.value&&!i&&(d+=m.numer/m.denom*4*e.option.beatHeight)}}var h,b,v=s*e.option.beatHeight,g=(u.lane-o.lane)*e.option.laneWidth,E=Math.atan2(g,v)/Math.PI*180,y=Math.sqrt(Math.pow(v,2)+Math.pow(g,2));o.measureCount===u.measureCount?(h=(u.beat-o.beat)*e.option.beatHeight,b=o.beat*e.option.beatHeight):n.value===o.measureCount?(h=(l-o.beat)*e.option.beatHeight,b=o.beat*e.option.beatHeight,i&&e.uncompleteSlideNotes.push(o)):n.value===u.measureCount?(h=u.beat*e.option.beatHeight,b=0):(h=l*e.option.beatHeight,b=0,i&&e.uncompleteSlideNotes.push(o)),a&&(h-=.5,b+=.5),c.className="slide-line-area",c.style.width=Math.abs(g)+e.option.noteSize+"px",c.style.height=h+"px",c.style.bottom=b-.5+"px";var L=(e.option.laneWidth-1)/2-e.option.noteSize/2;c.style.left=e.option.laneWidth*(Math.min(o.lane,u.lane)-1)+L+"px";var I=e.option.noteSize*Math.abs(Math.sin(Math.atan2(v,g)));return r.style.width=I+"px",r.style.height=y+2*e.option.noteSize+"px",E>0?(r.style.left="0px",r.style.setProperty("-ms-transform-origin","0 100%"),r.style.transformOrigin="0 100%"):(r.style.right="0px",r.style.setProperty("-ms-transform-origin","100% 100%"),r.style.transformOrigin="100% 100%"),r.style.bottom=-d+"px",r.style.setProperty("-ms-transform","rotate("+E+"deg"),r.style.transform="rotate("+E+"deg",c.appendChild(r),c},e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return o});var o=function(){function e(){this.title="No Title",this.difficulty="EXPERT",this.level="0",this.band="No Band",this.bpm="120",this.combo="0",this.time="0:00",this.scorePotential="0.00",this.grpScript=null}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var o=n(3),i=function(){function e(e,t,n,o){void 0===e&&(e=24),void 0===t&&(t=32),void 0===n&&(n=12),void 0===o&&(o=9),this.colBeat=e,this.beatHeight=t,this.laneWidth=n,this.noteSize=o,this.comprehensivePower=2e5}return Object.defineProperty(e.prototype,"colBeat",{get:function(){return this._colBeat},set:function(e){this._colBeat=e,o.a.optionColBeat=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"beatHeight",{get:function(){return this._beatHeight},set:function(e){this._beatHeight=e,o.a.optionBeatHeight=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"laneWidth",{get:function(){return this._laneWidth},set:function(e){this._laneWidth=e,o.a.optionLaneWidth=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"noteSize",{get:function(){return this._noteSize},set:function(e){this._noteSize=e,o.a.optionNoteSize=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"comprehensivePower",{get:function(){return this._comprehensivePower},set:function(e){this._comprehensivePower=e},enumerable:!0,configurable:!0}),e}()}]);