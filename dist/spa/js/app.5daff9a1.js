(function(e){function t(t){for(var r,s,i=t[0],c=t[1],d=t[2],u=0,m=[];u<i.length;u++)s=i[u],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&m.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(m.length)m.shift()();return n.push.apply(n,d||[]),o()}function o(){for(var e,t=0;t<n.length;t++){for(var o=n[t],r=!0,s=1;s<o.length;s++){var c=o[s];0!==a[c]&&(r=!1)}r&&(n.splice(t--,1),e=i(i.s=o[0]))}return e}var r={},a={2:0},n=[];function s(e){return i.p+"js/"+({1:"chunk-common"}[e]||e)+"."+{1:"655ae6b9",3:"2228bdf2",4:"5fdcdbc2",5:"73610e44",6:"d4a81eff",7:"f65722ed",8:"ceb02cb4",9:"0693f1c9",10:"c2efe403"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.e=function(e){var t=[],o=a[e];if(0!==o)if(o)t.push(o[2]);else{var r=new Promise((function(t,r){o=a[e]=[t,r]}));t.push(o[2]=r);var n,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=s(e);var d=new Error;n=function(t){c.onerror=c.onload=null,clearTimeout(u);var o=a[e];if(0!==o){if(o){var r=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+n+")",d.name="ChunkLoadError",d.type=r,d.request=n,o[1](d)}a[e]=void 0}};var u=setTimeout((function(){n({type:"timeout",target:c})}),12e4);c.onerror=c.onload=n,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,o){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(o,r,function(t){return e[t]}.bind(null,r));return o},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=d;n.push([0,0]),o()})({0:function(e,t,o){e.exports=o("2f39")},"2f39":function(e,t,o){"use strict";o.r(t);o("e6cf"),o("5319"),o("7d6e"),o("e54f"),o("573e"),o("4439"),o("4605"),o("f580"),o("5b2b"),o("8753"),o("2967"),o("7e67"),o("d770"),o("dd82"),o("922c"),o("d7fb"),o("a533"),o("c32e"),o("a151"),o("8bc7"),o("e80f"),o("5fec"),o("e42f"),o("57fc"),o("d67f"),o("880e"),o("1c10"),o("9482"),o("e797"),o("4848"),o("53d0"),o("63b1"),o("e9fd"),o("195c"),o("64e9"),o("33c5"),o("4f62"),o("0dbc"),o("7c38"),o("0756"),o("4953"),o("81db"),o("2e52"),o("22485"),o("7797"),o("12a1"),o("ce96"),o("70ca"),o("2318"),o("24bd"),o("8f27"),o("3064"),o("c9a2"),o("8767"),o("4a8e"),o("b828"),o("3c1c"),o("21cb"),o("c00e"),o("e4a8"),o("e4d3"),o("f4d9"),o("fffd"),o("f645"),o("639e"),o("34ee"),o("b794"),o("af24"),o("7c9c"),o("7bb2"),o("64f7"),o("c382"),o("053c"),o("c48f"),o("f5d1"),o("3cec"),o("c00ee"),o("d450"),o("ca07"),o("14e3"),o("9393"),o("9227"),o("1dba"),o("674a"),o("de26"),o("6721"),o("9cb5"),o("ed9b"),o("fc83"),o("98e5"),o("605a"),o("ba60"),o("df07"),o("7903"),o("e046"),o("58af"),o("7713"),o("0571"),o("3e27"),o("6837"),o("3fc9"),o("0693"),o("bf41"),o("985d"),o("31cd"),o("460d"),o("4e97"),o("e9cc");var r=o("2b0e"),a=o("1f91"),n=o("42d2"),s=o("b05d"),i=o("9149"),c=o("f508"),d=o("2a19");r["a"].use(s["a"],{config:{notify:{position:"top",timeout:4e3},loading:{spinnerColor:"accent",spinner:"QSpinnerHourglass"}},lang:a["a"],iconSet:n["a"],components:{QSpinnerHourglass:i["a"]},plugins:{Loading:c["a"],Notify:d["a"]}});var u=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"q-app"}},[o("router-view")],1)},l=[],m=o("ded3"),p=o.n(m),f=o("2f62"),g={name:"App",methods:p()({},Object(f["b"])(["fetchUser"])),async created(){const e=window.localStorage.getItem("id_token"),t=window.localStorage.getItem("expiryDate"),o=window.localStorage.getItem("userId");if(!e||!t||!o)return;new Date(t)<=new Date&&this.$store.commit("DESTROY_AUTH");const r={pathParam:o},a=await this.fetchUser(r),n=new Date(t).getTime()-(new Date).getTime();setTimeout((()=>{this.$store.commit("DESTROY_AUTH"),"home"!==this.$route.name&&this.$router.push("/"),d["a"].create({type:"negative",message:"Sessione scaduta! Effettua nuovamente il login"})}),n),a&&a.user.blocked&&this.$router.push("/")}},h=g,b=o("2877"),w=Object(b["a"])(h,u,l,!1,null,null,null),R=w.exports;const S="id_token",y=()=>window.localStorage.getItem(S),v=e=>{window.localStorage.setItem(S,e)},T=()=>{window.localStorage.removeItem(S)};var E={getToken:y,saveToken:v,destroyToken:T},_={LOGIN_SUCCESS(e,t){e.isAuthenticated=!0,e.user=t.user,e.user.token=t.token,e.errors={},E.saveToken(e.user.token),window.localStorage.setItem("userId",t.user._id)},DESTROY_AUTH(e){e.isAuthenticated=!1,e.user={},e.errors={},E.destroyToken(),window.localStorage.removeItem("userId"),window.localStorage.removeItem("expiryDate")},SET_USER(e,t){e.user=t.user}},P=o("bc3a"),O=o.n(P),C=o("2106"),I=o.n(C);const D="",k=`${D}/rest/api/subapp`;const A=[{path:"/",component:()=>Promise.all([o.e(0),o.e(1),o.e(4)]).then(o.bind(null,"713b")),children:[{path:"",component:()=>Promise.all([o.e(0),o.e(1),o.e(3)]).then(o.bind(null,"8b24")),name:"home"},{path:"/forgotPassword/:userId",name:"forgotPassword",component:()=>Promise.all([o.e(0),o.e(1),o.e(9)]).then(o.bind(null,"1613"))},{path:"/admin",component:()=>Promise.all([o.e(0),o.e(1),o.e(5)]).then(o.bind(null,"34ab")),name:"admin"},{path:"/termCondition",name:"termCondition",component:()=>o.e(10).then(o.bind(null,"40de"))},{path:"/cookiePolicy",name:"cookiePolicy",component:()=>o.e(7).then(o.bind(null,"b683"))},{path:"/board",name:"board",component:()=>Promise.all([o.e(0),o.e(1),o.e(6)]).then(o.bind(null,"b733"))}]},{path:"*",component:()=>Promise.all([o.e(0),o.e(8)]).then(o.bind(null,"e51e"))}];var x=A;const U=e=>(E.getToken()&&(e.headers.Authorization=`Token ${E.getToken()}`),e),j=e=>{if(!e.response)return Promise.reject(e);switch(e.response.status){case 400:console.error(e.response.status,e.message),d["a"].create({type:"negative",message:e.response.data.message});break;case 401:E.destroyToken(),d["a"].create({type:"negative",message:e.response.data.message}),x.push("/");break;default:console.error(e.response.status,e.message),d["a"].create({type:"negative",message:e.response.data.message})}return c["a"].hide(),Promise.reject(e)},$=e=>{switch(e.status){case 200:e.data.message&&d["a"].create({type:"positive",message:e.data.message});break;default:}return e},M={init(){r["a"].use(I.a,O.a),r["a"].axios.defaults.baseURL=k,r["a"].axios.defaults.headers.common={Accept:"application/json","Content-Type":"application/json"},r["a"].axios.interceptors.request.use(U),r["a"].axios.interceptors.response.use($,j)},setHeader(){r["a"].axios.defaults.headers.common.Authorization=`Token ${E.getToken()}`},get(e){return r["a"].axios.get(`${e}`)},post(e,t){return r["a"].axios.post(`${e}`,t)},update(e,t){return r["a"].axios.put(`${e}`,t)},put(e,t){return r["a"].axios.put(`${e}`,t)},delete(e,t){return r["a"].axios.delete(e,t)}};var L=M;const N="/auth";var q={login(e){return L.post(N+"/login",e)},signup(e){return L.put(N+"/signup",e)},forgottenPassword(e){return L.get(N+e)},resetPassword(e,t){return L.post(N+e,t)}};const F="/geo";var B={get(e){return L.get(F+e)}};const H="/option";var V={get(e){return L.get(H+e)}};const z="/user";var G={get(e){return L.get(z+e)},post(e,t){return L.post(z+e,t)},put(e,t){return L.put(z+e,t)},delete(e,t){return L.delete(z+e,t)}};const Y="/email";var Q={post(e){return L.post(Y+"/send",e)}};const J="/board";var K={get(e){return L.get(J+e)},post(e,t){return L.post(J+e,t)},put(e,t){return L.put(J+e,t)},delete(e,t){return L.delete(J+e,t)}};const W={auth:q,geo:B,option:V,user:G,email:Q,board:K},X={get:e=>W[e]};var Z=o("72bf"),ee=o.n(Z);const te=X.get("auth");var oe={async login({commit:e},t){const{data:o}=await te.login(t);e("LOGIN_SUCCESS",o);const r=36e5,a=new Date((new Date).getTime()+r);return window.localStorage.setItem("expiryDate",a.toISOString()),setTimeout((()=>{e("DESTROY_AUTH"),this.$router.push("/"),d["a"].create({type:"negative",message:"Sessione scaduta! Effetua nuovamente il login"})}),r),o},async signup({commit:e},t){const{data:o}=await te.signup(t);return o},async forgottenPassword({commit:e},{queryparams:t}){const{data:o}=await te.forgottenPassword("/forgottenPassword?"+ee.a.stringify(t));return o},async resetPassword({commit:e},{body:t}){const{data:o}=await te.resetPassword("/resetPassword",t);return o}},re={user(e){return e.user},isAuthenticated(e){return e.isAuthenticated}},ae={state(){return{user:void 0,isAuthenticated:!!E.getToken()}},mutations:_,actions:oe,getters:re},ne={SET_COUNTRIES(e,t){e.countries=t},SET_REGIONS(e,t){e.regions=t},SET_PROVINCES(e,t){e.provinces=t},SET_CITIES(e,t){e.cities=t},RESET_REGIONS(e){e.regions=[]},RESET_PROVINCES(e){e.provinces=[]},RESET_CITIES(e){e.cities=[]}};const se=X.get("geo");var ie={async getCountries({commit:e}){const{data:t}=await se.get("/countries");return e("SET_COUNTRIES",t.countries),t},async getRegions({commit:e},t){const{data:o}=await se.get("/regions?countryId="+t);return e("SET_REGIONS",o.regions),o},async getProvinces({commit:e},t){const{data:o}=await se.get("/provinces?regionId="+t);return e("SET_PROVINCES",o.provinces),o},async getCities({commit:e},t){const{data:o}=await se.get("/cities?provinceId="+t);return e("SET_CITIES",o.cities),o}},ce={countries(e){return e.countries},regions(e){return e.regions},provinces(e){return e.provinces},cities(e){return e.cities}},de={state(){return{countries:[],regions:[],provinces:[],cities:[]}},mutations:ne,actions:ie,getters:ce},ue={SET_MACRORDO(e,t){e.macroRdo=t},SET_CATRDO(e,t){"first"===t.order&&(e.firstCatRdo=t.catRdo),"second"===t.order&&(e.secondCatRdo=t.catRdo),"third"===t.order&&(e.thirdCatRdo=t.catRdo)},SET_SUBRDO(e,t){"first"===t.order&&(e.firstSubRdo=t.subRdo),"second"===t.order&&(e.secondSubRdo=t.subRdo),"third"===t.order&&(e.thirdSubRdo=t.subRdo)}};const le=X.get("option");var me={async getMacroRdo({commit:e}){const{data:t}=await le.get("/rdo_macrocategory");return e("SET_MACRORDO",t.macroRdo),t},async getCatRdo({commit:e},{queryparams:t,order:o}){const{data:r}=await le.get("/rdo_category?"+ee.a.stringify(t));return r.order=o,e("SET_CATRDO",r),r},async getSubRdo({commit:e},{queryparams:t,order:o}){const{data:r}=await le.get("/rdo_subcategory?"+ee.a.stringify(t));return r.order=o,e("SET_SUBRDO",r),r}},pe={macroRdo(e){return e.macroRdo},firstCatRdo(e){return e.firstCatRdo},secondCatRdo(e){return e.secondCatRdo},thirdCatRdo(e){return e.thirdCatRdo},firstSubRdo(e){return e.firstSubRdo},secondSubRdo(e){return e.secondSubRdo},thirdSubRdo(e){return e.thirdSubRdo}},fe={state(){return{macroRdo:[],firstCatRdo:[],secondCatRdo:[],thirdCatRdo:[],firstSubRdo:[],secondSubRdo:[],thirdSubRdo:[]}},mutations:ue,actions:me,getters:pe},ge={};const he=X.get("user");var be={async uploadFile({commit:e},t){const{data:o}=await he.post("/upload",t);return o},async deleteFiles({commit:e},{pathParam:t,body:o}){const{data:r}=await he.post("/"+t+"/deletefiles",o);return r},async updateUser({commit:e},{pathParam:t,body:o}){const{data:r}=await he.post("/"+t,o);return r},async fetchUser({commit:e},{pathParam:t}){const{data:o}=await he.get("/"+t);return e("SET_USER",o),o},async fetchUsers(){const{data:e}=await he.get("/all");return e},async updateLoggedUser({commit:e},{pathParam:t,body:o}){const{data:r}=await he.post("/update/"+t,o);return r},async deleteUser({commit:e},{pathParam:t}){const{data:o}=await he.delete("/"+t);return o},async fetchFile({commit:e},{pathParam:t}){const{data:o}=await he.get("/file/"+t);return o}},we={users(e){return e.users}},Re={state(){return{users:void 0}},mutations:ge,actions:be,getters:we},Se={};const ye=X.get("email");var ve={async sendMail({commit:e},t){const{data:o}=await ye.post(t);return o}},Te={},Ee={state(){return{email:void 0}},mutations:Se,actions:ve,getters:Te},_e={SET_BOARD_RDOS(e,t){e.boardRdos=t.rdos},SET_BOARD_FILTERED_RDOS(e,t){e.boardFilteredRdos=t.rdos},SET_RDO(e,t){e.rdo=t.rdo}};const Pe=X.get("board");var Oe={async createRdo({commit:e},{pathParam:t,body:o}){const{data:r}=await Pe.post("/rdo/"+t,o);return r},async updateRdo({commit:e},{pathParam:t,body:o}){const{data:r}=await Pe.put("/rdo/"+t,o);return r},async fetchAllRdos({commit:e}){const{data:t}=await Pe.get("/rdo/all");return e("SET_BOARD_RDOS",t),t},async fetchFilteredRdos({commit:e},{queryparams:t}){const{data:o}=await Pe.get("/rdo?"+ee.a.stringify(t));return e("SET_BOARD_FILTERED_RDOS",o),o},async fetchRdo({commit:e},{pathParam:t}){const{data:o}=await Pe.get("/rdo/"+t);return e("SET_RDO",o),o},async deleteRdo({commit:e},{pathParam:t}){const{data:o}=await Pe.delete("/rdo/"+t);return e("SET_RDO",o),o}},Ce={boardRdos(e){return e.boardRdos},boardFilteredRdos(e){return e.boardFilteredRdos}},Ie={state(){return{boardRdos:[],boardFilteredRdos:[]}},mutations:_e,actions:Oe,getters:Ce};r["a"].use(f["a"]);const De=new f["a"].Store({modules:{authModule:ae,geoModule:de,optionModule:fe,userModule:Re,emailModule:Ee,boardModule:Ie},strict:!1});var ke=function(){return De},Ae=o("8c4f");r["a"].use(Ae["a"]);var xe=function(){const e=new Ae["a"]({scrollBehavior:()=>({x:0,y:0}),routes:x,mode:"history",base:"/"});return e.beforeEach(((e,t,o)=>{const r=["/","/termCondition","/cookiePolicy"];e.path.includes("forgotPassword")&&r.push(e.path);const a=!r.includes(e.path),n=E.getToken();if(a&&!n)return o("/");o()})),e},Ue=async function(){const e="function"===typeof ke?await ke({Vue:r["a"]}):ke,t="function"===typeof xe?await xe({Vue:r["a"],store:e}):xe;e.$router=t;const o={router:t,store:e,render:e=>e(R),el:"#q-app"};return{app:o,store:e,router:t}},je=o("a925"),$e={failed:"Action failed",success:"Action was successful"},Me={login:{title:"Condividi i tuoi progetti."},signin:{title:"Registrati",required:"Campo obbligatorio",minLength:"Numero di caratteri minimo: ",tooltip:{companyName:"Inserisci la Ragione Sociale della tua azienda compresa di forma giuridica",SDICode:"Il Codice destinatario (SDI) è un codice alfanumerico composto da 7 caratteri, utile ai fini della trasmissione delle fatture elettroniche.",password:"La password deve contentere almeno 6 caratteri di cui 1 maiuscola, 1 minuscola, 1 numero e 1 carattere speciale (@, $, !, %, *, ?, &)",username:"La Username corrisponde all'indirizzo email con il quale intendi registrarti"}}},Le={"en-us":$e,"it-IT":Me};r["a"].use(je["a"]);const Ne=new je["a"]({locale:"it-IT",fallbackLocale:"it-IT",messages:Le});var qe=({app:e})=>{e.i18n=Ne};L.init();var Fe=o("1dce"),Be=o.n(Fe);r["a"].use(Be.a);var He=o("f5af"),Ve=o.n(He);o("e829");Ve.a.init();const ze="/";async function Ge(){const{app:e,store:t,router:o}=await Ue();let a=!1;const n=e=>{a=!0;const t=Object(e)===e?o.resolve(e).route.fullPath:e;window.location.href=t},s=window.location.href.replace(window.location.origin,""),i=[qe,void 0,void 0,void 0];for(let d=0;!1===a&&d<i.length;d++)if("function"===typeof i[d])try{await i[d]({app:e,router:o,store:t,Vue:r["a"],ssrContext:null,redirect:n,urlPath:s,publicPath:ze})}catch(c){return c&&c.url?void(window.location.href=c.url):void console.error("[Quasar] boot error:",c)}!0!==a&&new r["a"](e)}Ge()},"31cd":function(e,t,o){},"460d":function(e,t,o){},"4e97":function(e,t,o){},e9cc:function(e,t,o){}});