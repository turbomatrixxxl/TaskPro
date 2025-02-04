"use strict";(self.webpackChunkmy_react_app=self.webpackChunkmy_react_app||[]).push([[548],{7548:(e,i,o)=>{o.r(i),o.d(i,{default:()=>d});var a=o(5043),n=o(3003),l=o(1870),t=o(6276),r=o(3216),s=o(6592);const c={container:"VerifyEmailPageComponent_container__8IaQN",title:"VerifyEmailPageComponent_title__NpOlo",message:"VerifyEmailPageComponent_message__ndlL5",strong:"VerifyEmailPageComponent_strong__t6Cd0",infoCont:"VerifyEmailPageComponent_infoCont__5cAiE",infoText:"VerifyEmailPageComponent_infoText__5kjyE",emailLink:"VerifyEmailPageComponent_emailLink__Fmb8e",link:"VerifyEmailPageComponent_link__Dnh7c"};var m=o(579);const d=()=>{var e;const{user:i,isLoggedIn:o,errorAuth:d}=(0,t.A)(),u=(0,n.wA)(),h=(0,r.Zp)();(0,a.useEffect)((()=>{(o||null!==i&&void 0!==i&&i.verify)&&h("/")}),[o,i,h]);(0,a.useEffect)((()=>{d&&console.error("Error:",d)}),[d]);const f=null!==(e=null===i||void 0===i?void 0:i.email)&&void 0!==e?e:"your email address";return(0,m.jsxs)("section",{className:c.container,children:[(0,m.jsx)("h2",{className:c.title,children:"Please verify your email address"}),(0,m.jsxs)("p",{className:c.message,children:["We sent a verification link to your email:"," ",(0,m.jsx)("strong",{className:c.strong,children:f})]}),(0,m.jsx)("a",{className:c.emailLink,href:(e=>{if(!e||!e.includes("@"))return console.warn("Invalid email format:",e),"https://mail.google.com";const i=null===e||void 0===e?void 0:e.split("@")[1];switch(i){case"gmail.com":return"https://mail.google.com/mail/u/0/#inbox";case"yahoo.com":return"https://mail.yahoo.com";case"outlook.com":case"hotmail.com":return"https://outlook.live.com/mail/0/inbox";case"icloud.com":return"https://www.icloud.com/mail";default:return"https://mail.".concat(i)}})(null===i||void 0===i?void 0:i.email),target:"_blank",rel:"noopener noreferrer",children:(0,m.jsx)(s.A,{variant:"auth",children:"Go to your email provider"})}),(0,m.jsx)(s.A,{handleClick:()=>{i?u((0,l.nA)(null===i||void 0===i?void 0:i.email)):h("/auth/login")},type:"button",variant:"auth",children:"Resend Verification Email"}),d&&"string"===typeof d&&(0,m.jsx)("p",{className:c.error,children:d}),(0,m.jsxs)("div",{className:c.infoCont,children:[(0,m.jsx)("p",{className:c.infoText,children:"If you've already verified your email, you can go to the"}),(0,m.jsx)(s.A,{variant:"auth",handleClick:()=>{h("/auth/login")},children:"Login page"}),(0,m.jsx)("p",{className:c.infoText,children:"to sign in."})]})]})}}}]);
//# sourceMappingURL=548.9ddb7661.chunk.js.map