"use strict";(self.webpackChunkwebauthn_tools=self.webpackChunkwebauthn_tools||[]).push([[688],{688:(P,r,s)=>{s.r(r),s.d(r,{ProfileComponent:()=>C});var c=s(1670),l=s(6575),p=s(9877),u=s(274),e=s(1699),_=s(3286);function d(t,o){1&t&&(e.TgZ(0,"span",5),e._uU(1,"A passkey was automatically registered"),e.qZA())}function g(t,o){if(1&t&&(e.TgZ(0,"span",6),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij("Failed to create passkey: ",n.createPasskey.error,"")}}function f(t,o){1&t&&(e.ynx(0),e._uU(1,"Unknown"),e.BQk())}function m(t,o){1&t&&(e.ynx(0),e._uU(1,"Not supported"),e.BQk())}function y(t,o){1&t&&(e.ynx(0),e._uU(1,"Supported"),e.BQk())}let C=(()=>{class t{constructor(n){this.route=n,this.destroy$=new p.x,this.username="",this.capabilities={},this.createPasskey={}}ngOnInit(){var n=this;this.route.paramMap.pipe((0,u.R)(this.destroy$)).subscribe(i=>{this.username=i.get("username")||""}),this.route.queryParamMap.pipe((0,u.R)(this.destroy$)).subscribe(function(){var i=(0,c.Z)(function*(a){"true"===a.get("conditionalCreate")&&n.autoCreatePasskey()});return function(a){return i.apply(this,arguments)}}())}autoCreatePasskey(){var n=this;return(0,c.Z)(function*(){if(void 0===PublicKeyCredential.getClientCapabilities)return console.log("Conditional creation unavailable"),void(n.capabilities.conditionalCreate=!1);if(!(yield PublicKeyCredential.getClientCapabilities()).conditionalCreate)return console.log("Conditional creation unavailable"),void(n.capabilities.conditionalCreate=!1);const a=new Uint8Array(32);window.crypto.getRandomValues(a),n.capabilities.conditionalCreate=!0;try{yield window.navigator.credentials.create({mediation:"conditional",publicKey:{challenge:a,rp:{name:"WebAuthn Tools Demo"},user:{id:(new TextEncoder).encode(n.username),name:n.username,displayName:n.username},pubKeyCredParams:[{type:"public-key",alg:-7}]}}),n.createPasskey.success=!0}catch(h){n.createPasskey.error=String(h)}})()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}static#e=this.\u0275fac=function(i){return new(i||t)(e.Y36(_.gz))};static#n=this.\u0275cmp=e.Xpm({type:t,selectors:[["ng-component"]],standalone:!0,features:[e.jDz],decls:17,vars:6,consts:[[1,"page-container","container-md"],[1,"lead"],["class","text-success",4,"ngIf"],["class","text-danger",4,"ngIf"],[4,"ngIf"],[1,"text-success"],[1,"text-danger"]],template:function(i,a){1&i&&(e.TgZ(0,"div",0)(1,"h1"),e._uU(2,"Account Demo: User profile"),e.qZA(),e.TgZ(3,"p",1),e._uU(4,"This page represents a logged in view."),e.qZA(),e.TgZ(5,"h2"),e._uU(6),e.qZA(),e.YNc(7,d,2,0,"span",2),e.YNc(8,g,2,1,"span",3),e.TgZ(9,"h2"),e._uU(10,"Browser capabilities"),e.qZA(),e.TgZ(11,"ul")(12,"li"),e._uU(13," Conditional Create: "),e.YNc(14,f,2,0,"ng-container",4),e.YNc(15,m,2,0,"ng-container",4),e.YNc(16,y,2,0,"ng-container",4),e.qZA()()()),2&i&&(e.xp6(6),e.hij("User: ",a.username,""),e.xp6(1),e.Q6J("ngIf",a.createPasskey.success),e.xp6(1),e.Q6J("ngIf",a.createPasskey.error),e.xp6(6),e.Q6J("ngIf",void 0===a.capabilities.conditionalCreate),e.xp6(1),e.Q6J("ngIf",!1===a.capabilities.conditionalCreate),e.xp6(1),e.Q6J("ngIf",!0===a.capabilities.conditionalCreate))},dependencies:[l.ez,l.O5],encapsulation:2})}return t})()}}]);
//# sourceMappingURL=688.b11ff78570a44b11.js.map