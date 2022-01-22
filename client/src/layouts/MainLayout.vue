<template>
  <q-layout view="lHh lpr lff">
    <q-header class="primary-header q-py-md bg-primary" :style="'border-bottom: 3px solid #165081'">
      <div class="flex justify-between q-mx-lg">
          <q-avatar style="cursor: pointer; width: 80px ; height: 73px" @click="goToHome()">
            <img src="~assets/subapp2.svg">
          </q-avatar>
          <q-tabs v-if="$route.name !== 'termCondition' && $route.name !== 'cookiePolicy'"
                  dense
                  align="justify"
                  shrink
                  :breakpoint="0">
              <q-tab v-if="$route.name==='home'" @click="scrollToElement('id_how_works')" label="Come Funziona" >
              </q-tab>
              <q-tab v-if="!isAuthenticated" @click="scrollToElement('id_pricing')" label="Prezzi" />
              <q-tab v-if="$route.name==='home'" @click="scrollToElement('contact_us')" label="Contatti" />
              <q-tab v-if="!isAuthenticated" @click="openModal('login', 'accedi', false, loginClassObj, false)" label="Accedi"/>
              <q-tab v-if="!isAuthenticated" @click="openModal('sign-in', 'registrati', true, singInClassObj, false)" label="Registrati"/>
              <q-tab v-if="isAuthenticated && user && $route.name!= 'board' && $route.name != 'availment' && $route.name != 'contract'" :disable="user && user.blocked" @click="openBoard"  label="Bacheca">
                <q-tooltip v-if="user && user.blocked"
                           transition-show="fade"
                           transition-hide="fade"
                           content-class="bg-accent"
                           content-style="font-size: 16px"
                           anchor="bottom middle" self="top middle">
                  <div v-if="user && user.hasFileExpired && user.filesExpired.length > 0">
                    Aggiorna il tuo profilo per continuare l'esperienza su Subapp.it <br/>
                    <div v-for="(fileExpired, index) in user.filesExpired" :key="index">
                      <div>File scaduto da aggiornare: {{fileExpired}}</div>
                    </div>
                  </div>
                  <div v-if="user && !user.hasFileExpired && user.filesExpired.length == 0">
                    L'account è stato bloccato perchè non in regola con le linee guida di Subapp.it  <br/>
                    Utilizza la sezione "contatti" per maggiori informazioni.
                  </div>
                </q-tooltip>
              </q-tab>
              <q-tab v-if="isAuthenticated && user && ($route.name == 'board' || $route.name == 'availment' || $route.name == 'contract' )" :disable="user && user.blocked" @click="openBoard"  label="Richieste di offerta" />
              <q-tab v-if="isAuthenticated && user && ($route.name == 'board' || $route.name == 'availment' || $route.name == 'contract')" :disable="user && user.blocked" @click="openAvailment"  label="Avvalimenti SOA" />
              <q-tab v-if="isAuthenticated && user && ($route.name == 'board' || $route.name == 'availment' || $route.name == 'contract')" :disable="user && user.blocked" @click="openContract"  label="Focus Appalti" />
              <q-tab v-if="isAuthenticated" label="Account">
                <q-menu transition-show="jump-down" transition-hide="jump-up">
                  <div class="row no-wrap q-pa-sm">
                    <div class="column items-start">
                      <div class="text-h6 q-mb-xs q-ml-sm">Impostazioni</div>
                      <q-btn v-if="user && user.admin" class="no-padding" flat color="primary" size="md" label="Admin" @click="openAdminConsole" icon="admin_panel_settings" />
                      <q-btn flat  color="primary" size="md" v-if="user && !user.admin" label="profilo" @click="editProfile" icon="perm_identity" />
                    </div>
                    <q-separator vertical inset class="q-mx-md" />

                    <div class="column items-center justify-center q-gutter-sm">
                      <q-icon color="secondary" name="account_circle" size="xl"></q-icon>
                      <q-btn
                        color="primary"
                        label="Logout"
                        @click="logout"
                        push
                        size="sm"
                        v-close-popup
                      />
                    </div>
                  </div>
                </q-menu>
              </q-tab>
          </q-tabs>
      </div>
    </q-header>

    <q-page-container>
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <router-view @refreshAos="refreshAos" ></router-view>
      </transition>
    </q-page-container>

    <q-footer bordered class="q-pa-lg bg-primary text-white">
      <cookie-law buttonText="Accetta" :buttonDecline=showButtonDecline buttonDeclineText="Declina">
        <div slot="message">
          Questo sito utilizza cookie, anche di terze parti, per garantire una esperienza di navigazione ottimale.
          Se vuoi saperne di più, negare il consenso a tutti o ad alcuni cookie <a class="hyperlink" @click="goToCookies">clicca quì</a>.
          cliccando su "Accetta" consenti all'uso dei cookie.
        </div>
      </cookie-law>
      <div class="row no-wrap">
          <q-toolbar>
            <q-avatar style=" width: 80px ; height: 73px" >
              <img src="~assets/subapp2.svg">
            </q-avatar>
          </q-toolbar>
        <div class="flex column justify-center col-md-6">
          <div class="column">
            <div class="info">
              <div>Subapp.it s.r.l.s. - P.IVA: 09754101211 | Copyright © 2021 - Tutti i diritti riservati</div>
              <div>
                <a class="cursor-pointer" @click="$router.push('termCondition')">
                  Termini e Condizioni
                </a>
                |
                <a class="cursor-pointer" @click=downloadInfoPrivacy>
                  Privacy Policy
                </a>
                |
                <a class="cursor-pointer" @click="$router.push('cookiePolicy')">
                  Cookie policy
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="col-12 row justify-end social-container">
            <div class="flex column justify-center text-center">
              <span class="text-center text-h6">Follow Us</span>
            </div>
            <div class="q-pa-md q-gutter-sm">
              <q-btn round color="secondary">
                <q-icon color="white" name="fab fa-facebook-f" @click="goToFacebookPage"></q-icon>
              </q-btn>
              <q-btn round color="secondary">
                <q-icon color="white" name="fab fa-instagram" @click="goToInstagramPage"></q-icon>
              </q-btn>
              <!--
              <q-btn round color="secondary">
                <q-icon color="white" name="fab fa-twitter"></q-icon>
              </q-btn>
              <q-btn round color="secondary">
                <q-icon color="white" name="fab fa-linkedin-in"></q-icon>
              </q-btn>
              -->
            </div>
          </div>
        </div>
      </div>
    </q-footer>

    <modal  @signupSuccess="signupSuccess" :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :is-editing="isEditing" :component="modalComponent" :title="modalTitle"/>

  </q-layout>

</template>

<script>
import { scroll } from 'quasar'
import Modal from 'components/Modal'
import { mapActions, mapGetters } from 'vuex'
import AOS from 'aos'
import 'aos/dist/aos.css'
import CookieLaw from 'vue-cookie-law'

const { getScrollTarget, setScrollPosition } = scroll

export default {
  name: 'MainLayout',
  components: { Modal, CookieLaw },
  data () {
    return {
      aosNeedRefresh: false,
      isEditing: false,
      modal: false,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      classObj: {},
      loginClassObj: {
        'bg-white': true
      },
      singInClassObj: {
        'q-pa-none': true
      },
      showButtonDecline: true
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'isAuthenticated'
    ])
  },
  methods: {
    ...mapActions([
      'signupPaymentSuccess',
      'deleteUser'
    ]),
    goToFacebookPage () {
      window.open('https://www.facebook.com/subapp.it', '_blank')
    },
    goToInstagramPage () {
      window.open('https://www.instagram.com/subapp.it/', '_blank')
    },
    scrollToElement (id) {
      const el = document.getElementById(id)
      const target = getScrollTarget(el)
      const offset = el.offsetTop + 3
      const duration = 600
      setScrollPosition(target, offset, duration)
    },
    openModal (component, title, isMaximized, classObj, isEditing) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
      this.isEditing = isEditing
    },
    editProfile () {
      this.openModal('sign-in', 'Modifica Profilo', true, this.singInClassObj, true)
    },
    signupSuccess () {
      // setTimeout(() => {
      //   this.$q.notify({
      //     type: 'positive',
      //     message: 'Ci siamo quasi! Controlla la mail per scoprire i prossimi passi da seguire per completare la registrazione.'
      //   })
      //   this.openModal('login', 'accedi', false, this.loginClassObj, false)
      // }, 1000)
    },
    logout () {
      this.$q.loading.show()
      setTimeout(() => {
        this.$store.commit('DESTROY_AUTH')
        if (this.$route.name !== 'home') {
          this.$router.push('/')
        }
        this.$q.loading.hide()
        this.$q.notify({ type: 'positive', message: 'Logout avvenuto con successo!' })
      }, 1000)
    },
    openAdminConsole () {
      if (this.$route.name !== 'admin') {
        this.$router.push('/admin')
      }
    },
    openBoard () {
      if (this.$route.name !== 'board') {
        this.$router.push('/board')
      }
    },
    openAvailment () {
      if (this.$route.name !== 'availment') {
        this.$router.push('/availment')
      }
    },
    openContract () {
      if (this.$route.name !== 'contract') {
        this.$router.push('/contract')
      }
    },
    refreshAos () {
      this.aosNeedRefresh = true
    },
    goToCookies () {
      const routeData = this.$router.resolve({ name: 'cookiePolicy' })
      window.open(routeData.href, '_blank')
    },
    goToHome () {
      this.$router.push('/')
    },
    downloadInfoPrivacy () {
      window.open('/public/privacy.pdf', '_blank')
    }
  },
  async mounted () {
    if (this.$route.query.paymentSuccess === 'true' && this.$route.query.username) {
      await this.signupPaymentSuccess({ username: this.$route.query.username })
      setTimeout(() => {
        this.$q.notify({
          type: 'positive',
          message: 'Ci siamo quasi! Entro 24h il tuo account sarà attivo. Controlla la tua casella postale'
        })
      }, 1000)
    }
    if (this.$route.query.paymentSuccess === 'false' && this.$route.query.username) {
      const obj = {
        pathParam: this.$route.query.username
      }
      await this.deleteUser(obj)
      setTimeout(() => {
        this.$q.notify({
          type: 'negative',
          message: 'Pagamento fallito'
        })
      }, 1000)
    }
  },
  watch: {
    aosNeedRefresh (newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.aosNeedRefresh = false
          console.log('AOS Refreshing')
          AOS.refresh()
        }, 500)
      }
    }
  }
}
</script>
