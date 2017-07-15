!function(e){function t(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return i});var i,a=function(){function e(){this.title="",this.band="",this.difficulty=i.EXPERT,this.level=0,this.bpm=[],this.measure=[],this.notes=[],this.time=0,this.fever={ready:null,start:null,end:null}}return e}();!function(e){e[e.EXPERT=3]="EXPERT",e[e.HARD=2]="HARD",e[e.NORMAL=1]="NORMAL",e[e.EASY=0]="EASY"}(i||(i={}))},function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return i}),n.d(t,"c",function(){return r});var i,a=function(){function e(e,t,n,i,a,r,o,s,c){this.measureCount=e,this.beat=t,this.time=n,this.lane=i,this.type=a,this.next=r,this.slideStart=o,this.skillRange=s,this.feverRange=c}return e}();!function(e){e[e.LANE_1=1]="LANE_1",e[e.LANE_2=2]="LANE_2",e[e.LANE_3=3]="LANE_3",e[e.LANE_4=4]="LANE_4",e[e.LANE_5=5]="LANE_5",e[e.LANE_6=6]="LANE_6",e[e.LANE_7=7]="LANE_7"}(i||(i={}));var r;!function(e){e[e.NORMAL=1]="NORMAL",e[e.SKILL=2]="SKILL",e[e.FLICK=3]="FLICK",e[e.HOLD=4]="HOLD",e[e.SKILL_HOLD=5]="SKILL_HOLD",e[e.SLIDE_A=6]="SLIDE_A",e[e.SLIDE_A_END=7]="SLIDE_A_END",e[e.SLIDE_B=8]="SLIDE_B",e[e.SLIDE_B_END=9]="SLIDE_B_END"}(r||(r={}))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(3),a=n(7);window.addEventListener("DOMContentLoaded",function(){function e(e){a.a.setMessage(e)}try{var t=function(){var e=location.search.match(/load=([^&]*)(&|$)/);if(e)return e[1];throw new Error("パラメータエラー")}();!function(){window.addEventListener("dragover",function(e){e.preventDefault()}),window.addEventListener("drop",function(t){if(t.dataTransfer){var n=t.dataTransfer.files[0],r=new FileReader;if(t.preventDefault(),n.size>1048576)throw new Error("ファイルサイズが大きすぎます");r.addEventListener("load",function(){try{var t=r.result,n=i.a.parse(t),o=a.a.create(n);a.a.update(o)}catch(t){e(t.message)}}),r.readAsText(n)}});var t=document.getElementById("menu-btn"),n=document.getElementById("menu-bg"),r=document.getElementById("menu-panel");t.addEventListener("click",function(){"on"!==t.className?(t.className="on",n.className="on",r.className="on"):(t.className="off",n.className="off",r.className="off")})}(),i.a.load(t,function(t,n){try{if(t||!n)throw t;var i=a.a.create(n);a.a.update(i)}catch(t){console.error(t),e(t.message)}})}catch(t){console.error(t),e(t.message)}})},function(e,t,n){"use strict";n.d(t,"a",function(){return c});var i=n(0),a=n(1),r=n(4),o=n(5),s=n(6),c=function(){function e(){}return e.parse=function(e){for(var t=new i.b,n=this.normalize(e),o=0,s=0,c=1,l=!1,u=!1,m=0,f=0,d=120,h=[],p=0,b=n.length;p<b;p++){var v=n[p];if("#"===v.charAt(0))this.parseOrder(t,v,c,o,m),t.bpm.length>0&&(d=t.bpm[t.bpm.length-1].value);else{if(0===o&&(s=this.getMeasureLineCount(n,p)),","===v.charAt(0)){0===s&&(m+=60/d*1*4*1e3);var E=new r.a(4,4,c,f);t.measure.push(E),o=0,c++,f=m;continue}for(var g=a.a.LANE_1;g<=a.a.LANE_7;g++){var L=parseInt(v.charAt(g-a.a.LANE_1));if(!isNaN(L)){var y=!1;if(L===a.c.SLIDE_A)if(l)for(var N=g+1;N<=a.a.LANE_7;N++){var S=parseInt(v.charAt(N-a.a.LANE_1));if(S===a.c.SLIDE_A_END){y=!0;break}}else y=!0,l=!0;else if(L===a.c.SLIDE_B)if(u)for(var N=g+1;N<=a.a.LANE_7;N++){var S=parseInt(v.charAt(N-a.a.LANE_1));if(S===a.c.SLIDE_B_END){y=!0;break}}else y=!0,u=!0;L!==a.c.SKILL&&L!==a.c.SKILL_HOLD||h.push(m);var _=new a.b(c,o,m,g,L,0,y,!1,!1);if(t.notes.push(_),L===a.c.SLIDE_A_END){l=!1;for(var N=g-1;N>=a.a.LANE_1;N--){var S=parseInt(v.charAt(N-a.a.LANE_1));if(S===a.c.SLIDE_A){l=!0;break}}}else if(L===a.c.SLIDE_B_END){u=!1;for(var N=g-1;N>=a.a.LANE_1;N--){var S=parseInt(v.charAt(N-a.a.LANE_1));if(S===a.c.SLIDE_B){u=!0;break}}}}}m+=60/d*1*4*1e3/s,o+=4/s}}t.notes.sort(function(e,t){return e.time-t.time});for(var p=0,b=t.notes.length;p<b;p++){var _=t.notes[p];if((_.type===a.c.HOLD||_.type===a.c.SKILL_HOLD)&&-1!==_.next)for(var I=p+1;I<b;I++){var H=t.notes[I];if(_.lane===H.lane){_.next=I,H.next=-1;break}}if(_.type===a.c.SLIDE_A)for(var I=p+1;I<b;I++){var H=t.notes[I];if(H.type===a.c.SLIDE_A_END){_.next=I;break}if(H.type===a.c.SLIDE_A){_.next=I;for(var A=I+1;A<b;A++){var D=t.notes[A];if(H.time<D.time)break;if(D.type===a.c.SLIDE_A_END){_.next=A;break}}break}}if(_.type===a.c.SLIDE_B)for(var I=p+1;I<b;I++){var H=t.notes[I];if(H.type===a.c.SLIDE_B_END){_.next=I;break}if(H.type===a.c.SLIDE_B){_.next=I;for(var A=I+1;A<b;A++){var D=t.notes[A];if(H.time<D.time)break;if(D.type===a.c.SLIDE_B_END){_.next=A;break}}break}}}if(null!==t.fever.start&&null!==t.fever.end){var x=t.fever.start,C=t.fever.end;t.notes.filter(function(e){return e.time>=x.time&&e.time<C.time}).forEach(function(e){return e.feverRange=!0})}return t.notes.filter(function(e){for(var t=0,n=h;t<n.length;t++){var i=n[t];if(e.time>=i&&e.time<i+7e3)return!0}return!1}).forEach(function(e){return e.skillRange=!0}),t.time=t.notes[t.notes.length-1].time,t},e.load=function(e,t){var n=this;try{var i=new XMLHttpRequest;i.open("get",e,!0),i.addEventListener("load",function(){if(200===i.status)try{var a=n.parse(i.responseText);t(null,a)}catch(e){t(e,null)}else t(new Error("譜面の読み込みに失敗しました : "+e),null)}),i.send()}catch(n){t(new Error("譜面の読み込みに失敗しました : "+e),null)}},e.normalize=function(e){for(var t=e.split(/\r\n|\r|\n/),n=0,i=t.length;n<i;n++){var a=t[n],r=a.indexOf("//");-1!==r&&(a=a.substr(0,r)),0!==a.length?t[n]=a:(t.splice(n,1),n--,i--)}return t},e.parseOrder=function(e,t,n,a,r){var c,l,u=t.indexOf(":");switch(-1===u?(c=t.trim(),l=""):(c=t.substr(0,u),l=t.substr(u+1)),c.toUpperCase()){case"#TITLE":e.title=l;break;case"#BAND":e.band=l;break;case"#LEVEL":e.level=parseInt(l);break;case"#DIFFICULTY":var m=l.toUpperCase();"EXPERT"!==m&&"HARD"!==m&&"NORMAL"!==m&&"EASY"!==m||(e.difficulty=i.a[m]);break;case"#BPM":var f=new o.a(n,a,parseFloat(l));e.bpm.push(f);break;case"#FEVERREADY":e.fever.ready=new s.a(n,a,r);break;case"#FEVERSTART":e.fever.start=new s.a(n,a,r);break;case"#FEVEREND":e.fever.end=new s.a(n,a,r);break;case"#MEASURE":break;default:console.warn("未対応の命令 : "+c)}},e.getMeasureLineCount=function(e,t){for(var n=0,i=t,a=e.length;i<a;i++){var r=e[i];if("#"!==r.charAt(0)){if(","===r.charAt(0))break;n++}}return n},e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(e,t,n,i){this.numer=e,this.denom=t,this.value=n,this.time=i}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(e,t,n){this.measureCount=e,this.beat=t,this.value=n}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(e,t,n){this.measureCount=e,this.beat=t,this.time=n}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return c});var i=n(0),a=n(1),r=n(8),o=n(9),s=n(10),c=function(){function e(){}return e.create=function(e){var t=new r.a;return t.title=e.title,t.band=e.band,t.difficulty=i.a[e.difficulty],t.level=""+e.level,t.bpm=this.getBpmStr(e),t.combo=""+e.notes.length,t.time=this.getTimeStr(e),t.scorePotential=this.calcScorePotential(e,this.option.comprehensivePower),t.scoreElement=this.createScoreElement(e),t},e.update=function(e){o.a.pageTitle=e.title+" 【"+e.difficulty+"】",o.a.title=e.title,o.a.difficulty=e.difficulty,o.a.level=e.level,o.a.band=e.band,o.a.bpm=e.bpm,o.a.combo=e.combo,o.a.time=e.time,o.a.scorePotential=e.scorePotential,o.a.scoreElement=e.scoreElement},e.setMessage=function(e){o.a.message=e},e.getBpmStr=function(e){if(1===e.bpm.length)return""+Math.ceil(100*e.bpm[0].value)/100;var t=e.bpm.map(function(e){return e.value}),n=Math.min.call(null,t),i=Math.max.call(null,t);return i===n?""+i:n+" ～ "+i},e.getTimeStr=function(e){var t=new Date(e.time);return t.getMinutes()+":"+("0"+t.getSeconds()).slice(-2)},e.calcScorePotential=function(e,t){for(var n=0,i=.01*(e.level-5)+1,a=e.notes.length,r=3*t*i/a*1.1,o=0,s=e.notes.length;o<s;o++){var c=e.notes[o],l=this.getComboCoefficient(o),u=c.skillRange?2:1,m=c.feverRange?2:1;n+=Math.floor(r*l)*u*m}return""+(n/1e4).toFixed(4)},e.getComboCoefficient=function(e){for(var t=[{combo:20,coefficient:1},{combo:50,coefficient:1.01},{combo:100,coefficient:1.02},{combo:150,coefficient:1.03},{combo:200,coefficient:1.04},{combo:250,coefficient:1.05},{combo:300,coefficient:1.06},{combo:400,coefficient:1.07},{combo:500,coefficient:1.08},{combo:600,coefficient:1.09},{combo:700,coefficient:1.1},{combo:9999,coefficient:1.11}],n=0,i=t;n<i.length;n++){var a=i[n];if(e<a.combo)return a.coefficient}throw new Error("コンボ係数取得エラー : "+e)},e.createScoreElement=function(e){this.uncompleteHoldNotes=[],this.uncompleteSlideNotes=[];var t=document.createElement("table"),n=document.createElement("tr");t.appendChild(n),t.className="measure-col";for(var i=0,a=e.measure.length;i<a;){var r=document.createElement("td");n.appendChild(r);var o=document.createElement("table");o.className="measure-row",r.appendChild(o);var s=0,c=4,l=e.measure[i],u=!0;do{var m=i+1;if(i<a){l=e.measure[i];c=l.numer/l.denom*4}var f=this.createMeasureElement(m,c);if(i<a){for(var d=f.getElementsByClassName("note-area")[0],h=0;h<this.uncompleteHoldNotes.length;h++){var p=this.uncompleteHoldNotes[h],b=e.notes[p.next],v=this.createHoldLine(e,l,p,!1,u);d.appendChild(v),l.value===b.measureCount&&(this.uncompleteHoldNotes.splice(h,1),h--)}for(var h=0;h<this.uncompleteSlideNotes.length;h++){var p=this.uncompleteSlideNotes[h],b=e.notes[p.next],E=this.createSlideLine(e,l,p,!1,u);d.appendChild(E),l.value===b.measureCount&&(this.uncompleteSlideNotes.splice(h,1),h--)}this.addNote(f,e,l),this.addBackgroundArea(f,e,l)}o.insertBefore(f,o.firstChild),i++,u=!1,s+=c}while(s<this.option.measureBeat)}return t},e.createMeasureElement=function(e,t){var n=document.createElement("tr");n.id="measure-"+e;var i=document.createElement("th"),a=document.createElement("div");a.className="header-area",a.innerHTML=""+e,i.appendChild(a),n.appendChild(i);var r=document.createElement("td"),o=document.createElement("div"),s=document.createElement("div");o.className="note-area",o.style.width=7*this.option.laneWidth-1+"px",o.style.height=t*this.option.beatHeight-1+"px",s.className="background-area",s.style.width=7*this.option.laneWidth-1+"px",s.style.height=t*this.option.beatHeight-1+"px";for(var c=0;c<t;c++){var l=document.createElement("div");l.className="beat-sub-line",l.style.bottom=(c+.5)*this.option.beatHeight-1+"px",s.appendChild(l)}for(var c=1;c<t;c++){var u=document.createElement("div");u.className="beat-line",u.style.bottom=c*this.option.beatHeight-1+"px",s.appendChild(u)}for(var c=1;c<7;c++){var m=document.createElement("div");m.className="lane-split-line",m.style.left=c*this.option.laneWidth-1+"px",s.appendChild(m)}return r.appendChild(s),r.appendChild(o),n.appendChild(r),n},e.addNote=function(e,t,n){for(var i=e.getElementsByClassName("note-area")[0],r=0,o=t.notes.length;r<o;r++){var s=t.notes[r];if(s.measureCount===n.value){var c=document.createElement("div");switch(s.type){case a.c.NORMAL:c.className="note normal";break;case a.c.SKILL:c.className="note skill";break;case a.c.FLICK:c.className="note flick";break;case a.c.HOLD:c.className="note hold";break;case a.c.SKILL_HOLD:c.className="note skill";break;case a.c.SLIDE_A_END:case a.c.SLIDE_B_END:c.className="note hold"}s.type===a.c.SLIDE_A?s.slideStart?(c.style.height=this.option.noteSize+"px",c.style.bottom=this.option.beatHeight*s.beat-this.option.noteSize/2+"px",c.className="note hold"):(c.style.bottom=this.option.beatHeight*s.beat-2+"px",c.className="note slide"):s.type===a.c.SLIDE_B?s.slideStart?(c.style.height=this.option.noteSize+"px",c.style.bottom=this.option.beatHeight*s.beat-this.option.noteSize/2+"px",c.className="note hold"):(c.style.bottom=this.option.beatHeight*s.beat-1.5+"px",c.className="note slide"):(c.style.height=this.option.noteSize+"px",c.style.bottom=this.option.beatHeight*s.beat-this.option.noteSize/2-.5+"px"),c.style.width=this.option.noteSize+"px";var l=(this.option.laneWidth-1)/2-this.option.noteSize/2;if(c.style.left=this.option.laneWidth*(s.lane-1)+l+"px",c.style.zIndex=""+(o-r+1e3),i.appendChild(c),(s.type===a.c.HOLD||s.type===a.c.SKILL_HOLD)&&s.next>=0){var u=this.createHoldLine(t,n,s,!0,!1);i.appendChild(u)}else if(s.type===a.c.SLIDE_A||s.type===a.c.SLIDE_B){var m=this.createSlideLine(t,n,s,!0,!1);i.appendChild(m)}}}return e},e.addBackgroundArea=function(e,t,n){for(var i=e.getElementsByClassName("background-area")[0],a=[t.fever.ready,t.fever.start,t.fever.end],r=["fever-ready-area","fever-area"],o=n.numer/n.denom*4,s=0;s<2;s++){var c=a[s],l=a[s+1];if(null!==c&&null!==l&&!(c.measureCount>n.value||l.measureCount<n.value))if(c.measureCount===n.value){var u=document.createElement("div");u.className=r[s],u.style.height=(o-c.beat)*this.option.beatHeight+"px",u.style.bottom=c.beat*this.option.beatHeight-1+"px",i.appendChild(u)}else if(l.measureCount===n.value){var u=document.createElement("div");u.className=r[s],u.style.height=l.beat*this.option.beatHeight+"px",u.style.bottom="-1px",i.appendChild(u)}else{var u=document.createElement("div");u.className=r[s],u.style.height=o*this.option.beatHeight+"px",u.style.bottom="-1px",i.appendChild(u)}}return e},e.createHoldLine=function(e,t,n,i,a){var r=document.createElement("div");r.className="hold-line";var o,s,c=t.numer/t.denom*4,l=e.notes[n.next];n.measureCount===l.measureCount?(o=(l.beat-n.beat)*this.option.beatHeight,s=n.beat*this.option.beatHeight):t.value===n.measureCount?(o=(c-n.beat)*this.option.beatHeight,s=n.beat*this.option.beatHeight,i&&this.uncompleteHoldNotes.push(n)):t.value===l.measureCount?(o=l.beat*this.option.beatHeight,s=0):(o=c*this.option.beatHeight,s=0,i&&this.uncompleteHoldNotes.push(n)),a&&(o-=1,s+=1),r.style.height=o+"px",r.style.bottom=s-1+"px",r.style.width=this.option.noteSize+"px";var u=(this.option.laneWidth-1)/2-this.option.noteSize/2;return r.style.left=this.option.laneWidth*(n.lane-1)+u+"px",r},e.createSlideLine=function(e,t,n,i,a){var r=document.createElement("div");r.className="slide-line";var o=document.createElement("div"),s=t.numer/t.denom*4,c=e.notes[n.next],l=0,u=0;if(n.measureCount===c.measureCount)l=c.beat-n.beat;else{if(!i){var m=e.measure[n.measureCount-1];u+=(m.numer/m.denom*4-n.beat)*this.option.beatHeight}for(var f=n.measureCount,d=e.measure.length;f<d;f++){var m=e.measure[f];if(m.value===c.measureCount){l+=s-n.beat+c.beat;break}l+=m.numer/m.denom*4,m.value<t.value&&!i&&(u+=m.numer/m.denom*4*this.option.beatHeight)}}var h,p,b=l*this.option.beatHeight,v=(c.lane-n.lane)*this.option.laneWidth,E=Math.atan2(v,b)/Math.PI*180,g=Math.sqrt(Math.pow(b,2)+Math.pow(v,2));n.measureCount===c.measureCount?(h=(c.beat-n.beat)*this.option.beatHeight,p=n.beat*this.option.beatHeight):t.value===n.measureCount?(h=(s-n.beat)*this.option.beatHeight,p=n.beat*this.option.beatHeight,i&&this.uncompleteSlideNotes.push(n)):t.value===c.measureCount?(h=c.beat*this.option.beatHeight,p=0):(h=s*this.option.beatHeight,p=0,i&&this.uncompleteSlideNotes.push(n)),a&&(h-=.5,p+=.5),o.className="slide-line-area",o.style.width=Math.abs(v)+this.option.noteSize+"px",o.style.height=h+"px",o.style.bottom=p-.5+"px";var L=(this.option.laneWidth-1)/2-this.option.noteSize/2;o.style.left=this.option.laneWidth*(Math.min(n.lane,c.lane)-1)+L+"px";var y=this.option.noteSize*Math.abs(Math.sin(Math.atan2(b,v)));return r.style.width=y+"px",r.style.height=g+2*this.option.noteSize+"px",E>0?(r.style.left="0px",r.style.setProperty("-ms-transform-origin","0 100%"),r.style.transformOrigin="0 100%"):(r.style.right="0px",r.style.setProperty("-ms-transform-origin","100% 100%"),r.style.transformOrigin="100% 100%"),r.style.bottom=-u+"px",r.style.setProperty("-ms-transform","rotate("+E+"deg"),r.style.transform="rotate("+E+"deg",o.appendChild(r),o},e}();c.option=new s.a},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){this.title="No Title",this.difficulty="EXPERT",this.level="0",this.band="No Band",this.bpm="120",this.combo="0",this.time="0:00",this.scorePotential="0.00",this.scoreElement=null}return e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){}return Object.defineProperty(e,"pageTitle",{get:function(){return document.title},set:function(e){document.title=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"title",{get:function(){return document.getElementById("title").innerHTML},set:function(e){document.getElementById("title").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"difficulty",{get:function(){return document.getElementById("difficulty").innerHTML},set:function(e){document.getElementById("difficulty").innerHTML=e,document.body.className=e.toLowerCase()},enumerable:!0,configurable:!0}),Object.defineProperty(e,"level",{get:function(){return document.getElementById("level").innerHTML},set:function(e){document.getElementById("level").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"band",{get:function(){return document.getElementById("band").innerHTML},set:function(e){document.getElementById("band").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"bpm",{get:function(){return document.getElementById("bpm").innerHTML},set:function(e){document.getElementById("bpm").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"combo",{get:function(){return document.getElementById("combo").innerHTML},set:function(e){document.getElementById("combo").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"time",{get:function(){return document.getElementById("time").innerHTML},set:function(e){document.getElementById("time").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"scorePotential",{get:function(){return document.getElementById("score-potential").innerHTML},set:function(e){document.getElementById("score-potential").innerHTML=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"scoreElement",{get:function(){return document.getElementById("score-html")},set:function(e){var t=document.getElementById("score-html");e instanceof HTMLElement&&(t.innerHTML="",t.appendChild(e),document.getElementById("contents").className="fadein")},enumerable:!0,configurable:!0}),Object.defineProperty(e,"message",{get:function(){return document.getElementById("message").innerHTML},set:function(e){var t=document.getElementById("message");t.innerHTML=e,t.style.display=""!==e?"block":"none"},enumerable:!0,configurable:!0}),e}()},function(e,t,n){"use strict";n.d(t,"a",function(){return i});var i=function(){function e(){this.measureBeat=24,this.beatHeight=32,this.laneWidth=12,this.noteSize=9,this.comprehensivePower=2e5}return e}()}]);