(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[4],{5437:function(e,t,a){e.exports=a.p+"img/subapp2.da57301b.svg"},"713b":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("q-layout",{attrs:{view:"lHh lpr lff"}},[i("q-header",{staticClass:"primary-header q-py-md bg-primary",style:"border-bottom: 3px solid #165081"},[i("div",{staticClass:"flex justify-between q-mx-lg"},[i("q-avatar",{staticStyle:{cursor:"pointer",width:"80px",height:"73px"},on:{click:function(t){return e.goToHome()}}},[i("img",{attrs:{src:a("5437")}})]),"termCondition"!==e.$route.name&&"cookiePolicy"!==e.$route.name?i("q-tabs",{attrs:{dense:"",align:"justify",shrink:"",breakpoint:0}},["home"===e.$route.name?i("q-tab",{attrs:{label:"Come Funziona"},on:{click:function(t){return e.scrollToElement("id_how_works")}}}):e._e(),e.isAuthenticated?e._e():i("q-tab",{attrs:{label:"Prezzi"},on:{click:function(t){return e.scrollToElement("id_pricing")}}}),"home"===e.$route.name?i("q-tab",{attrs:{label:"Contatti"},on:{click:function(t){return e.scrollToElement("contact_us")}}}):e._e(),e.isAuthenticated?e._e():i("q-tab",{attrs:{label:"Accedi"},on:{click:function(t){return e.openModal("login","accedi",!1,e.loginClassObj,!1)}}}),e.isAuthenticated?e._e():i("q-tab",{attrs:{label:"Registrati"},on:{click:function(t){return e.openModal("sign-in","registrati",!0,e.singInClassObj,!1)}}}),e.isAuthenticated&&e.user&&"board"!=e.$route.name&&"availment"!=e.$route.name?i("q-tab",{attrs:{disable:e.user&&e.user.blocked,label:"Bacheca"},on:{click:e.openBoard}},[e.user&&e.user.blocked?i("q-tooltip",{attrs:{"transition-show":"fade","transition-hide":"fade","content-class":"bg-accent","content-style":"font-size: 16px",anchor:"bottom middle",self:"top middle"}},[e.user&&e.user.hasFileExpired&&e.user.filesExpired.length>0?i("div",[e._v("\n                  Aggiorna il tuo profilo per continuare l'esperienza su Subapp.it "),i("br"),e._l(e.user.filesExpired,(function(t,a){return i("div",{key:a},[i("div",[e._v("File scaduto da aggiornare: "+e._s(t))])])}))],2):e._e(),e.user&&!e.user.hasFileExpired&&0==e.user.filesExpired.length?i("div",[e._v("\n                  L'account è stato bloccato perchè non in regola con le linee guida di Subapp.it  "),i("br"),e._v('\n                  Utilizza la sezione "contatti" per maggiori informazioni.\n                ')]):e._e()]):e._e()],1):e._e(),e.isAuthenticated&&e.user&&("board"==e.$route.name||"availment"==e.$route.name)?i("q-tab",{attrs:{disable:e.user&&e.user.blocked,label:"Richieste di offerta"},on:{click:e.openBoard}}):e._e(),e.isAuthenticated&&e.user&&("board"==e.$route.name||"availment"==e.$route.name)?i("q-tab",{attrs:{disable:e.user&&e.user.blocked,label:"Avvalimenti SOA"},on:{click:e.openAvailment}}):e._e(),e.isAuthenticated?i("q-tab",{attrs:{label:"Account"}},[i("q-menu",{attrs:{"transition-show":"jump-down","transition-hide":"jump-up"}},[i("div",{staticClass:"row no-wrap q-pa-sm"},[i("div",{staticClass:"column items-start"},[i("div",{staticClass:"text-h6 q-mb-xs q-ml-sm"},[e._v("Impostazioni")]),e.user&&e.user.admin?i("q-btn",{staticClass:"no-padding",attrs:{flat:"",color:"primary",size:"md",label:"Admin",icon:"admin_panel_settings"},on:{click:e.openAdminConsole}}):e._e(),e.user&&!e.user.admin?i("q-btn",{attrs:{flat:"",color:"primary",size:"md",label:"profilo",icon:"perm_identity"},on:{click:e.editProfile}}):e._e()],1),i("q-separator",{staticClass:"q-mx-md",attrs:{vertical:"",inset:""}}),i("div",{staticClass:"column items-center justify-center q-gutter-sm"},[i("q-icon",{attrs:{color:"secondary",name:"account_circle",size:"xl"}}),i("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{color:"primary",label:"Logout",push:"",size:"sm"},on:{click:e.logout}})],1)],1)])],1):e._e()],1):e._e()],1)]),i("q-page-container",[i("transition",{attrs:{appear:"","enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[i("router-view",{on:{refreshAos:e.refreshAos}})],1)],1),i("q-footer",{staticClass:"q-pa-lg bg-primary text-white",attrs:{bordered:""}},[i("cookie-law",{attrs:{buttonText:"Accetta",buttonDecline:e.showButtonDecline,buttonDeclineText:"Declina"}},[i("div",{attrs:{slot:"message"},slot:"message"},[e._v("\n        Questo sito utilizza cookie, anche di terze parti, per garantire una esperienza di navigazione ottimale.\n        Se vuoi saperne di più, negare il consenso a tutti o ad alcuni cookie "),i("a",{staticClass:"hyperlink",on:{click:e.goToCookies}},[e._v("clicca quì")]),e._v('.\n        cliccando su "Accetta" consenti all\'uso dei cookie.\n      ')])]),i("div",{staticClass:"row no-wrap"},[i("q-toolbar",[i("q-avatar",{staticStyle:{width:"80px",height:"73px"}},[i("img",{attrs:{src:a("5437")}})])],1),i("div",{staticClass:"flex column justify-center col-md-6"},[i("div",{staticClass:"column"},[i("div",{staticClass:"info"},[i("div",[e._v("Subapp.it s.r.l.s. - P.IVA: 09754101211 | Copyright © 2021 - Tutti i diritti riservati")]),i("div",[i("a",{staticClass:"cursor-pointer",on:{click:function(t){return e.$router.push("termCondition")}}},[e._v("\n                Termini e Condizioni\n              ")]),e._v("\n              |\n              "),i("a",{staticClass:"cursor-pointer",on:{click:e.downloadInfoPrivacy}},[e._v("\n                Privacy Policy\n              ")]),e._v("\n              |\n              "),i("a",{staticClass:"cursor-pointer",on:{click:function(t){return e.$router.push("cookiePolicy")}}},[e._v("\n                Cookie policy\n              ")])])])])]),i("div",{staticClass:"col-md-4"},[i("div",{staticClass:"col-12 row justify-end social-container"},[i("div",{staticClass:"flex column justify-center text-center"},[i("span",{staticClass:"text-center text-h6"},[e._v("Follow Us")])]),i("div",{staticClass:"q-pa-md q-gutter-sm"},[i("q-btn",{attrs:{round:"",color:"secondary"}},[i("q-icon",{attrs:{color:"white",name:"fab fa-facebook-f"},on:{click:e.goToFacebookPage}})],1),i("q-btn",{attrs:{round:"",color:"secondary"}},[i("q-icon",{attrs:{color:"white",name:"fab fa-instagram"},on:{click:e.goToInstagramPage}})],1)],1)])])],1)],1),i("modal",{attrs:{"class-obj":e.classObj,modal:e.modal,"is-maximized":e.isMaximized,"is-editing":e.isEditing,component:e.modalComponent,title:e.modalTitle},on:{signupSuccess:e.signupSuccess,"update:modal":function(t){e.modal=t}}})],1)},o=[],s=(a("e6cf"),a("ded3")),n=a.n(s),r=a("0831"),l=a("714b"),c=a("2f62"),u=a("f5af"),d=a.n(u),m=(a("e829"),a("d2d0")),p=a.n(m);const{getScrollTarget:h,setScrollPosition:b}=r["a"];var g={name:"MainLayout",components:{Modal:l["a"],CookieLaw:p.a},data(){return{aosNeedRefresh:!1,isEditing:!1,modal:!1,modalComponent:void 0,modalTitle:void 0,isMaximized:!1,classObj:{},loginClassObj:{"bg-white":!0},singInClassObj:{"q-pa-none":!0},showButtonDecline:!0}},computed:n()({},Object(c["c"])(["user","isAuthenticated"])),methods:n()(n()({},Object(c["b"])(["signupPaymentSuccess","deleteUser"])),{},{goToFacebookPage(){window.open("https://www.facebook.com/subapp.it","_blank")},goToInstagramPage(){window.open("https://www.instagram.com/subapp.it/","_blank")},scrollToElement(e){const t=document.getElementById(e),a=h(t),i=t.offsetTop+3,o=600;b(a,i,o)},openModal(e,t,a,i,o){this.modalComponent=e,this.modalTitle=t,this.isMaximized=a,this.modal=!0,this.classObj=i,this.isEditing=o},editProfile(){this.openModal("sign-in","Modifica Profilo",!0,this.singInClassObj,!0)},signupSuccess(){},logout(){this.$q.loading.show(),setTimeout((()=>{this.$store.commit("DESTROY_AUTH"),"home"!==this.$route.name&&this.$router.push("/"),this.$q.loading.hide(),this.$q.notify({type:"positive",message:"Logout avvenuto con successo!"})}),1e3)},openAdminConsole(){"admin"!==this.$route.name&&this.$router.push("/admin")},openBoard(){"board"!==this.$route.name&&this.$router.push("/board")},openAvailment(){"availment"!==this.$route.name&&this.$router.push("/availment")},refreshAos(){this.aosNeedRefresh=!0},goToCookies(){const e=this.$router.resolve({name:"cookiePolicy"});window.open(e.href,"_blank")},goToHome(){this.$router.push("/")},downloadInfoPrivacy(){window.open("/public/privacy.pdf","_blank")}}),async mounted(){if("true"===this.$route.query.paymentSuccess&&this.$route.query.username&&(await this.signupPaymentSuccess({username:this.$route.query.username}),setTimeout((()=>{this.$q.notify({type:"positive",message:"Ci siamo quasi! Entro 24h il tuo account sarà attivo. Controlla la tua casella postale"})}),1e3)),"false"===this.$route.query.paymentSuccess&&this.$route.query.username){const e={pathParam:this.$route.query.username};await this.deleteUser(e),setTimeout((()=>{this.$q.notify({type:"negative",message:"Pagamento fallito"})}),1e3)}},watch:{aosNeedRefresh(e,t){e&&setTimeout((()=>{this.aosNeedRefresh=!1,console.log("AOS Refreshing"),d.a.refresh()}),500)}}},f=g,v=a("2877"),y=a("4d5a"),q=a("e359"),w=a("cb32"),k=a("429b"),_=a("7460"),C=a("05c0"),$=a("4e73"),x=a("9c40"),T=a("eb85"),A=a("0016"),z=a("09e3"),P=a("7ff0"),j=a("65c6"),S=a("7f67"),E=a("eebe"),O=a.n(E),Q=Object(v["a"])(f,i,o,!1,null,null,null);t["default"]=Q.exports;O()(Q,"components",{QLayout:y["a"],QHeader:q["a"],QAvatar:w["a"],QTabs:k["a"],QTab:_["a"],QTooltip:C["a"],QMenu:$["a"],QBtn:x["a"],QSeparator:T["a"],QIcon:A["a"],QPageContainer:z["a"],QFooter:P["a"],QToolbar:j["a"]}),O()(Q,"directives",{ClosePopup:S["a"]})}}]);