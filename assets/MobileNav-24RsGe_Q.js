import{c as t,e as m,j as e,b as n,L as r,X as g}from"./index-Dg8riLNE.js";import{l as h,B as o}from"./shavi-logo-Xbi-ji2S.js";import{U as p}from"./users-BkcchiZo.js";import{M as u}from"./menu-CNe7i1dX.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=t("BookText",[["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"M8 11h8",key:"vwpz6n"}],["path",{d:"M8 7h6",key:"1f0q6e"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=t("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=t("CircleUser",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}],["path",{d:"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662",key:"154egf"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=t("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=t("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=t("MessageSquareQuote",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}],["path",{d:"M8 12a2 2 0 0 0 2-2V8H8",key:"1jfesj"}],["path",{d:"M14 12a2 2 0 0 0 2-2V8h-2",key:"1dq9mh"}]]),A=({isOpen:s,onClose:i})=>{const c=m(),d=[{label:"Dashboard",icon:y,path:"/admin"},{label:"Consultations",icon:p,path:"/admin/leads"},{label:"Testimonials",icon:v,path:"/admin/testimonials"},{label:"Blogs",icon:w,path:"/admin/blogs"},{label:"My Profile",icon:f,path:"/admin/profile"}],x=()=>{localStorage.removeItem("admin_token"),localStorage.removeItem("admin_user"),window.location.href="/admin/login"};return e.jsxs(e.Fragment,{children:[s&&e.jsx("div",{className:"fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-[80] lg:hidden",onClick:i}),e.jsxs("aside",{className:n("fixed inset-y-0 left-0 z-[90] w-64 bg-[#1E3A8A] border-r border-white/10 flex flex-col pt-8 pb-6 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",s?"translate-x-0":"-translate-x-full"),children:[e.jsxs("div",{className:"px-6 mb-10 flex items-center justify-between",children:[e.jsxs(r,{to:"/",className:"flex flex-col gap-1",children:[e.jsx("img",{src:h,alt:"Shavi Homes",className:"h-10 w-auto brightness-0 invert"}),e.jsx("p",{className:"text-[10px] text-white/40 tracking-[0.2em] uppercase font-black pl-1",children:"Admin Panel"})]}),i&&e.jsx(o,{variant:"ghost",size:"icon",onClick:i,className:"lg:hidden text-white/40 hover:text-white",children:e.jsx(g,{className:"w-5 h-5"})})]}),e.jsx("nav",{className:"flex-1 px-4 space-y-2",children:d.map(a=>{const l=c.pathname===a.path;return e.jsxs(r,{to:a.path,onClick:i,className:n("flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group",l?"bg-[#3B82F6] text-white shadow-lg shadow-blue-900/40":"text-white/60 hover:text-white hover:bg-white/5"),children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx(a.icon,{className:n("w-5 h-5",l?"text-white":"text-white/60 group-hover:text-white")}),e.jsx("span",{className:`font-semibold text-sm tracking-tight ${l?"font-bold":""}`,children:a.label})]}),l&&e.jsx(b,{className:"w-4 h-4 text-white/70"})]},a.path)})}),e.jsxs("div",{className:"px-4 mt-auto",children:[e.jsxs("div",{className:"bg-white/10 rounded-2xl p-4 mb-6 ring-1 ring-white/10",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-1",children:[e.jsx("div",{className:"w-2 h-2 rounded-full bg-blue-300 animate-pulse shadow-[0_0_8px_rgba(147,197,253,0.5)]"}),e.jsx("span",{className:"text-[10px] font-bold text-white/50 uppercase tracking-widest",children:"Network Active"})]}),e.jsx("p",{className:"text-xs text-white/70 font-medium leading-relaxed",children:"Connected to secure gateway."})]}),e.jsxs(o,{variant:"outline",onClick:x,className:"w-full justify-start gap-3 h-12 rounded-xl bg-transparent border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300 font-semibold",children:[e.jsx(j,{className:"w-5 h-5"}),e.jsx("span",{className:"font-semibold",children:"Sign Out"})]})]})]})]})},C=({onOpenSidebar:s})=>e.jsxs("div",{className:"lg:hidden flex items-center justify-between p-4 bg-[#1E3A8A] text-white",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsxs(r,{to:"/",className:"flex items-center gap-2",children:[e.jsx("img",{src:h,alt:"Shavi Homes",className:"h-8 w-auto brightness-0 invert"}),e.jsx("h1",{className:"font-heading font-black text-white text-lg tracking-tight",children:"Admin"})]})}),e.jsx(o,{variant:"ghost",size:"icon",onClick:s,className:"text-white hover:bg-white/10 h-10 w-10 rounded-xl",children:e.jsx(u,{className:"w-6 h-6"})})]});export{b as C,C as M,A as S,v as a};
