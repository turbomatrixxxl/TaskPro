"use strict";(self.webpackChunkmy_react_app=self.webpackChunkmy_react_app||[]).push([[548],{7548:(e,a,i)=>{i.r(a),i.d(a,{default:()=>u});var o=i(5043),n=i(3003),l=i(1870),t=i(6276),r=i(3216),s=i(6592);const c={container:"VerifyEmailPageComponent_container__0X07e",title:"VerifyEmailPageComponent_title__fshNo",message:"VerifyEmailPageComponent_message__C6G5g",strong:"VerifyEmailPageComponent_strong__poebR",infoCont:"VerifyEmailPageComponent_infoCont__WJsn+",infoText:"VerifyEmailPageComponent_infoText__oaw2s",emailLink:"VerifyEmailPageComponent_emailLink__FQaee",link:"VerifyEmailPageComponent_link__v6QVf"};var m=i(579);const u=()=>{var e;const{user:a,isLoggedIn:i,errorAuth:u}=(0,t.A)(),d=(0,n.wA)(),h=(0,r.Zp)();(0,o.useEffect)((()=>{(i||null!==a&&void 0!==a&&a.verify)&&h("/")}),[i,a,h]);(0,o.useEffect)((()=>{u&&console.error("Error:",u)}),[u]);const f=null!==(e=null===a||void 0===a?void 0:a.email)&&void 0!==e?e:"your email address";return(0,m.jsxs)("section",{className:c.container,children:[(0,m.jsx)("h2",{className:c.title,children:"Please verify your email address"}),(0,m.jsxs)("p",{className:c.message,children:["We sent a verification link to your email:"," ",(0,m.jsx)("strong",{className:c.strong,children:f})]}),(0,m.jsx)("a",{className:c.emailLink,href:(e=>{if(!e||!e.includes("@"))return console.warn("Invalid email format:",e),"https://mail.google.com";const a=e.split("@")[1];switch(a){case"gmail.com":return"https://mail.google.com/mail/u/0/#inbox";case"yahoo.com":return"https://mail.yahoo.com";case"outlook.com":case"hotmail.com":return"https://outlook.live.com/mail/0/inbox";case"icloud.com":return"https://www.icloud.com/mail";default:return`https://mail.${a}`}})(null===a||void 0===a?void 0:a.email),target:"_blank",rel:"noopener noreferrer",children:(0,m.jsx)(s.A,{variant:"auth",children:"Go to your email provider"})}),(0,m.jsx)(s.A,{handleClick:()=>{a?d((0,l.nA)(a.email)):h("/auth/login")},type:"button",variant:"auth",children:"Resend Verification Email"}),u&&"string"===typeof u&&(0,m.jsx)("p",{className:c.error,children:u}),(0,m.jsxs)("div",{className:c.infoCont,children:[(0,m.jsx)("p",{className:c.infoText,children:"If you've already verified your email, you can go to the"}),(0,m.jsx)(s.A,{variant:"auth",handleClick:()=>{h("/auth/login")},children:"Login page"}),(0,m.jsx)("p",{className:c.infoText,children:"to sign in."})]})]})}}}]);
//# sourceMappingURL=548.34f1a52c.chunk.js.map