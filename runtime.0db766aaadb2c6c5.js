(()=>{"use strict";var e,v={},m={};function t(e){var i=m[e];if(void 0!==i)return i.exports;var r=m[e]={exports:{}};return v[e].call(r.exports,r,r.exports,t),r.exports}t.m=v,e=[],t.O=(i,r,o,f)=>{if(!r){var a=1/0;for(n=0;n<e.length;n++){for(var[r,o,f]=e[n],c=!0,u=0;u<r.length;u++)(!1&f||a>=f)&&Object.keys(t.O).every(b=>t.O[b](r[u]))?r.splice(u--,1):(c=!1,f<a&&(a=f));if(c){e.splice(n--,1);var d=o();void 0!==d&&(i=d)}}return i}f=f||0;for(var n=e.length;n>0&&e[n-1][2]>f;n--)e[n]=e[n-1];e[n]=[r,o,f]},t.d=(e,i)=>{for(var r in i)t.o(i,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:i[r]})},t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce((i,r)=>(t.f[r](e,i),i),[])),t.u=e=>(592===e?"common":e)+"."+{126:"6369fc79f8a4c66f",305:"90404eac2824a7ba",361:"cc9c7abbbfd2af9d",388:"8018b37af42b25a1",592:"f5e2c3e8d3da75bc",680:"85278e03fb50f0f6",822:"0522da89d6ff0bff"}[e]+".js",t.miniCssF=e=>{},t.o=(e,i)=>Object.prototype.hasOwnProperty.call(e,i),(()=>{var e={},i="webauthn-tools:";t.l=(r,o,f,n)=>{if(e[r])e[r].push(o);else{var a,c;if(void 0!==f)for(var u=document.getElementsByTagName("script"),d=0;d<u.length;d++){var l=u[d];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==i+f){a=l;break}}a||(c=!0,(a=document.createElement("script")).type="module",a.charset="utf-8",a.timeout=120,t.nc&&a.setAttribute("nonce",t.nc),a.setAttribute("data-webpack",i+f),a.src=t.tu(r)),e[r]=[o];var s=(g,b)=>{a.onerror=a.onload=null,clearTimeout(p);var h=e[r];if(delete e[r],a.parentNode&&a.parentNode.removeChild(a),h&&h.forEach(_=>_(b)),g)return g(b)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=s.bind(null,a.onerror),a.onload=s.bind(null,a.onload),c&&document.head.appendChild(a)}}})(),t.r=e=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;t.tt=()=>(void 0===e&&(e={createScriptURL:i=>i},typeof trustedTypes<"u"&&trustedTypes.createPolicy&&(e=trustedTypes.createPolicy("angular#bundler",e))),e)})(),t.tu=e=>t.tt().createScriptURL(e),t.p="",(()=>{var e={666:0};t.f.j=(o,f)=>{var n=t.o(e,o)?e[o]:void 0;if(0!==n)if(n)f.push(n[2]);else if(666!=o){var a=new Promise((l,s)=>n=e[o]=[l,s]);f.push(n[2]=a);var c=t.p+t.u(o),u=new Error;t.l(c,l=>{if(t.o(e,o)&&(0!==(n=e[o])&&(e[o]=void 0),n)){var s=l&&("load"===l.type?"missing":l.type),p=l&&l.target&&l.target.src;u.message="Loading chunk "+o+" failed.\n("+s+": "+p+")",u.name="ChunkLoadError",u.type=s,u.request=p,n[1](u)}},"chunk-"+o,o)}else e[o]=0},t.O.j=o=>0===e[o];var i=(o,f)=>{var u,d,[n,a,c]=f,l=0;if(n.some(p=>0!==e[p])){for(u in a)t.o(a,u)&&(t.m[u]=a[u]);if(c)var s=c(t)}for(o&&o(f);l<n.length;l++)t.o(e,d=n[l])&&e[d]&&e[d][0](),e[d]=0;return t.O(s)},r=self.webpackChunkwebauthn_tools=self.webpackChunkwebauthn_tools||[];r.forEach(i.bind(null,0)),r.push=i.bind(null,r.push.bind(r))})()})();