(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{"030c":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.userLogged&&e.allLoaded?a("q-page",[a("div",{staticClass:"q-py-lg tab-rdo"},[e.userLogged.admin?e._e():a("q-tabs",{staticClass:"text-secondary",attrs:{"active-color":"accent","indicator-color":"accent",dense:"","narrow-indicator":"",align:"center"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab",{staticClass:"q-mr-lg",attrs:{ripple:!1,name:"availments",label:"Cerca Avvalimenti"}}),a("q-tab",{staticClass:"q-ml-lg",attrs:{ripple:!1,name:"availmentOfferedByYou",label:"Avvalimenti da te offerti"}})],1),e.userLogged.admin?a("h5",{staticClass:"text-center no-margin"},[e._v("Lista Avvalimenti vista ADMIN")]):e._e(),a("div",[a("q-tab-panels",{staticClass:"full-width",attrs:{animated:"","transition-prev":"scale","transition-next":"scale"},model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("q-tab-panel",{attrs:{name:"availments"}},[e.userLogged&&e.boardAvailmentsLoaded?a("div",[a("div",{staticClass:"q-pa-lg"},[a("table-availment",{attrs:{allAvailments:!0},on:{resetSelectedRdo:function(t){e.selectedAvailment=null},openSelectedAvailment:e.openSelectedAvailment}})],1)]):e._e(),e.userLogged.admin&&!e.boardAvailmentsLoaded?a("div",{staticClass:"flex column justify-center items-center q-pt-xl"},[a("h5",{staticClass:"text-center no-margin q-pb-lg"},[e._v("Nessun avvalimento trovato")])]):e._e(),e.userLogged.admin||e.boardAvailmentsLoaded?e._e():a("div",{staticClass:"flex column justify-center items-center q-pt-xl"},[a("h5",{staticClass:"text-center no-margin q-pb-lg"},[e._v("Ancora nessun avvalimento caricato")])]),a("modal",{attrs:{"selected-availment":e.selectedAvailment,"class-obj":e.classObj,modal:e.modal,"is-maximized":e.isMaximized,component:e.modalComponent,title:e.modalTitle},on:{"update:modal":function(t){e.modal=t}}})],1),a("q-tab-panel",{attrs:{name:"availmentOfferedByYou"}},[a("user-availment")],1)],1)],1)],1)]):e._e()},n=[],l=(a("e6cf"),a("ded3")),s=a.n(l),o=a("2f62"),r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.userLogged?a("div",[a("div",{staticClass:"q-pa-lg"},[a("table-availment",{on:{resetSelectedAvailment:function(t){e.selectedAvailment=null},openSelectedAvailment:e.openSelectedAvailment,openModal:function(t){return e.openModal("load-availment","Offri Avvalimento",!0,e.loadAvailmentClassObj,!1)}}})],1),a("modal",{attrs:{"class-obj":e.classObj,modal:e.modal,"is-maximized":e.isMaximized,component:e.modalComponent,title:e.modalTitle,"selected-availment":e.selectedAvailment},on:{"update:modal":function(t){e.modal=t}}})],1):e._e()},c=[],d=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-table",{attrs:{data:e.data,columns:e.columns,"row-key":"name",bordered:"",filter:e.filter,"filter-method":e.customFilter,"no-results-label":"Nessun avvalimento",separator:"cell",pagination:e.pagination},scopedSlots:e._u([{key:"top",fn:function(t){return[a("q-input",{attrs:{borderless:"",dense:"",debounce:"300",placeholder:"Search"},scopedSlots:e._u([{key:"append",fn:function(){return[a("q-icon",{attrs:{name:"search"}})]},proxy:!0}],null,!0),model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e.allAvailments&&!e.userLogged.admin?a("div",{staticClass:"text-center",staticStyle:{margin:"auto","font-size":"1.2rem",color:"#165081"}},[e._v("Cerca avvalimento")]):e._e(),e.allAvailments?e._e():a("div",{staticClass:"text-center",staticStyle:{margin:"auto","font-size":"1.2rem",color:"#165081"}},[e._v("Avvalimenti da te offerti")]),a("div",{staticClass:"q-ml-auto"},[e.allAvailments?e._e():a("q-btn",{attrs:{push:"",ripple:!1,label:"Offri avvalimento",color:"accent"},on:{click:function(t){return e.loadAvailment()}}}),a("q-btn",{staticClass:"q-ml-md",attrs:{flat:"",round:"",dense:"",icon:t.inFullscreen?"fullscreen_exit":"fullscreen"},on:{click:t.toggleFullscreen}})],1)]}},{key:"body",fn:function(t){return[a("q-tr",{attrs:{props:t}},[a("q-td",{key:"business",attrs:{"auto-width":!0,props:t}},[e._v("\n        "+e._s(t.row.availment.business)+"\n      ")]),a("q-td",{key:"category",staticStyle:{"white-space":"normal"},attrs:{"auto-width":!0,props:t}},[e._v("\n        "+e._s(t.row.availment.category.description)+"\n      ")]),a("q-td",{key:"classification",staticStyle:{"white-space":"normal"},attrs:{"auto-width":!0,props:t}},[e._v("\n        "+e._s(t.row.availment.classification)+"\n      ")]),a("q-td",{key:"totalAvailment",attrs:{"auto-width":!0,props:t}},[t.row.availment.totalAvailment?a("div",{staticClass:"flex column items-center justify-around full-width"},[a("q-icon",{staticClass:"text-positive cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{name:"done"}})],1):a("div",[a("q-icon",{staticClass:"text-negative cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{name:"close"}})],1)]),a("q-td",{key:"splittedAvailment",attrs:{"auto-width":!0,props:t}},[t.row.availment.splittedAvailment?a("div",{staticClass:"flex column items-center justify-around full-width"},[a("q-icon",{staticClass:"text-positive cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{name:"done"}})],1):a("div",[a("q-icon",{staticClass:"text-negative cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{name:"close"}})],1)]),a("q-td",{key:"rti",attrs:{"auto-width":!0,props:t}},[t.row.availment.rti?a("div",{staticClass:"flex column items-center justify-around full-width"},[a("q-icon",{staticClass:"text-positive cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{name:"done"}})],1):a("div",[a("q-icon",{staticClass:"text-negative cursor-pointer",staticStyle:{"font-size":"1.5rem"},attrs:{name:"close"}})],1)]),t.row.availment.participationFee?a("q-td",{key:"participationFee",attrs:{"auto-width":!0,props:t}},[e._v("\n        "+e._s(t.row.availment.participationFee.split(" ")[0])+"\n      ")]):a("q-td",{key:"participationFee",attrs:{"auto-width":!0,props:t}},[e._v("\n        "+e._s(t.row.availment.participationFee)+"\n      ")]),a("q-td",{key:"percentage",attrs:{"auto-width":!0,props:t}},[e._v("\n        "+e._s(t.row.availment.percentage)+"\n      ")]),a("q-td",{key:"contact",attrs:{"auto-width":!0,props:t}},[e._v("\n        "+e._s(t.row.availment.contact)+"\n      ")]),a("q-td",{key:"soaFile",attrs:{"auto-width":!0,props:t}},[t.row.availment.soaFile?a("q-icon",{staticClass:"text-accent cursor-pointer",staticStyle:{"font-size":"2rem"},attrs:{name:"file_download"},on:{click:function(a){return e.downloadFile(t.row.availment.soaFile.Key)}}}):a("q-icon",{staticClass:"text-negative",attrs:{name:"remove"}})],1),a("q-td",{key:"viewAvailment",attrs:{"auto-width":!0,props:t}},[a("q-icon",{staticClass:"text-accent cursor-pointer",staticStyle:{"font-size":"2rem"},attrs:{name:"search"},on:{click:function(a){return e.openAvailment(t.row.availment)}}})],1),!e.allAvailments||e.allAvailments&&e.userLogged.admin?a("q-td",{key:"deleteAvailment",attrs:{"auto-width":!0,props:t}},[a("q-icon",{staticClass:"text-negative cursor-pointer",staticStyle:{"font-size":"2rem"},attrs:{name:"delete_forever"},on:{click:function(a){return e.cancelAvailment(t.row.availment)}}})],1):e._e()],1)]}}])})},m=[],v=(a("e01a"),{name:"TableAvailment",props:["allAvailments","filtered"],data(){return{pagination:{rowsPerPage:10},search:"",columns:[{name:"business",required:!0,label:"Impresa",align:"center"},{name:"category",required:!0,label:"Categoria",align:"center"},{name:"classification",required:!0,label:"Classifica",align:"center"},{name:"totalAvailment",required:!0,label:"Avv. totale",align:"center"},{name:"splittedAvailment",required:!0,label:"Avv. frazionato",align:"center"},{name:"rti",required:!0,label:"R.T.I.",align:"center"},{name:"participationFee",required:!0,label:"Quota partec.",align:"center"},{name:"percentage",required:!0,label:"Percentuale",align:"center"},{name:"contact",required:!0,label:"Contatto",align:"center"},{name:"soaFile",required:!0,label:"SOA",align:"center"},{name:"viewAvailment",required:!0,label:"Visualizza avvalimento",align:"center"}],data:[]}},computed:s()(s()({},Object(o["c"])({userLogged:"user",boardAvailments:"boardAvailments"})),{},{filter(){return{search:this.search}}}),methods:s()(s()({},Object(o["b"])(["fetchFile","deleteAvailment","fetchAllAvailments","fetchUser"])),{},{async cancelAvailment(e){this.$q.loading.show();const t=this.userLogged.admin?e.user._id:this.userLogged._id,a={pathParam:e._id+"/"+t},i={pathParam:t};await this.deleteAvailment(a),await this.fetchAllAvailments(),this.userLogged.admin?this.getData(this.boardAvailments):(await this.fetchUser(i),this.getData(this.userLogged.loadedAvailments)),this.$q.loading.hide()},openAvailment(e){this.$emit("openSelectedAvailment",e)},async downloadFile(e){const t={pathParam:e},a=await this.fetchFile(t);window.open(a.url)},getData(e){this.data&&this.data.length>0&&(this.data=[]),e&&e.length>0&&e.forEach((e=>{e.participationFee&&(e.percentage=e.participationFee.split(" ")[1]);const t={availment:e};this.data.push(t)}))},loadAvailment(){this.$emit("resetSelectedAvailment"),this.$emit("openModal")},customFilter:function(e,t){const a=t.search?t.search.toLowerCase():"",i=e.filter(((e,t)=>{let i=!1,n=!0;if(""!==a){n=!1;const t={};Object.entries(e.availment).forEach((a=>{"business"!==a[0]&&"contact"!==a[0]||(t[a[0]]=e.availment[a[0]]),"category"===a[0]&&(t[a[0]]=e.availment[a[0]].description)}));const i=Object.values(t),l=i.map((e=>e.toString().toLowerCase()));for(let e=0;e<l.length;e++)if(l[e].includes(a)){n=!0;break}}return i=!1,n&&(i=!0),i}));return i}}),mounted(){this.allAvailments?(this.userLogged.admin&&this.columns.push({name:"deleteAvailment",required:!0,label:"Elimina Avvalimento",align:"center"}),this.getData(this.boardAvailments)):(this.getData(this.userLogged.loadedAvailments),this.columns.push({name:"deleteAvailment",required:!0,label:"Elimina Avvalimento",align:"center"}))},watch:{userLogged:{deep:!0,handler(e,t){e&&!this.allAvailments&&this.getData(e.loadedAvailments)}}}}),u=v,p=a("2877"),h=a("eaac"),g=a("27f9"),b=a("0016"),f=a("9c40"),A=a("bd08"),q=a("db86"),w=a("eebe"),y=a.n(w),C=Object(p["a"])(u,d,m,!1,null,"00b6e828",null),_=C.exports;y()(C,"components",{QTable:h["a"],QInput:g["a"],QIcon:b["a"],QBtn:f["a"],QTr:A["a"],QTd:q["a"]});var x=a("714b"),L={name:"UserAvailment",components:{Modal:x["a"],TableAvailment:_},data(){return{loadAvailmentClassObj:{"q-pa-none":!0},modalComponent:void 0,modalTitle:void 0,isMaximized:!1,modal:!1,selectedAvailment:null,classObj:{}}},computed:s()({},Object(o["c"])({userLogged:"user"})),methods:{openSelectedAvailment(e){this.selectedAvailment=e,this.openModal("load-availment","Avvalimento di "+e.business,!0,this.loadAvailmentClassObj,!1)},openModal(e,t,a,i){this.modalComponent=e,this.modalTitle=t,this.isMaximized=a,this.modal=!0,this.classObj=i}}},S=L,j=Object(p["a"])(S,r,c,!1,null,"7787a714",null),k=j.exports,O={name:"Availment",components:{Modal:x["a"],TableAvailment:_,UserAvailment:k},data(){return{allLoaded:!1,selectedAvailment:null,boardAvailmentsLoaded:!0,modalComponent:void 0,modalTitle:void 0,isMaximized:!1,modal:!1,classObj:{},loadAvailmentClassObj:{"q-pa-none":!0},tab:"availments"}},computed:s()({},Object(o["c"])({userLogged:"user",boardAvailments:"boardAvailments"})),methods:s()(s()({},Object(o["b"])(["fetchAllAvailments","fetchUser"])),{},{openSelectedAvailment(e){this.selectedAvailment=e,this.openModal("load-availment","Avvalimento di "+e.business,!0,this.loadAvailmentClassObj,!1)},openModal(e,t,a,i){this.modalComponent=e,this.modalTitle=t,this.isMaximized=a,this.modal=!0,this.classObj=i},async loadAvailments(){this.userLogged&&(await this.fetchAllAvailments(),this.boardAvailmentsLoaded=this.boardAvailments.length>0,this.allLoaded=!0),this.$q.loading.hide()}}),watch:{boardAvailments:{deep:!0,handler(e,t){e.length!==t.length&&(this.boardAvailmentsLoaded=e.length>0)}}},async mounted(){if(this.$q.loading.show(),!this.userLogged){const e=window.localStorage.getItem("userId");if(e){const t={pathParam:e};await this.fetchUser(t)}}await this.loadAvailments()}},z=O,F=a("9989"),T=a("429b"),M=a("7460"),Q=a("adad"),P=a("823b"),$=Object(p["a"])(z,i,n,!1,null,"1e124e2d",null);t["default"]=$.exports;y()($,"components",{QPage:F["a"],QTabs:T["a"],QTab:M["a"],QTabPanels:Q["a"],QTabPanel:P["a"]})}}]);