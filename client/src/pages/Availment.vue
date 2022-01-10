<template>
  <q-page v-if="userLogged && allLoaded">
    <div class="q-py-lg tab-rdo">
      <q-tabs
        v-if="!userLogged.admin"
        v-model="tab"
        class="text-secondary"
        active-color="accent"
        indicator-color="accent"
        dense
        narrow-indicator
        align="center"
      >
        <q-tab :ripple="false" name="availments" label="Cerca Avvalimenti" class="q-mr-lg"/>
        <q-tab :ripple="false" name="availmentOfferedByYou" label="Avvalimenti da te offerti" class="q-ml-lg" />
      </q-tabs>

      <h5 v-if="userLogged.admin" class="text-center no-margin">Lista Avvalimenti vista ADMIN</h5>
      <div>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="full-width"
        >
          <q-tab-panel name="availments">
            <div v-if="(userLogged && boardAvailmentsLoaded)" >
              <div class="q-pa-lg">
                <table-availment @resetSelectedRdo="selectedAvailment= null" :allAvailments="true" @openSelectedAvailment="openSelectedAvailment"></table-availment>
              </div>
            </div>
            <div v-if="userLogged.admin && !boardAvailmentsLoaded" class="flex column justify-center items-center q-pt-xl" >
              <h5 class="text-center no-margin q-pb-lg">Nessun avvalimento trovato</h5>
            </div>
            <div v-if="!userLogged.admin && !boardAvailmentsLoaded" class="flex column justify-center items-center q-pt-xl" >
              <h5 class="text-center no-margin q-pb-lg">Ancora nessun avvalimento caricato</h5>
            </div>
            <modal :selected-availment="selectedAvailment" :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle"/>
          </q-tab-panel>

          <q-tab-panel name="availmentOfferedByYou">
            <user-availment></user-availment>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserAvailment from 'components/UserAvailment'
import TableAvailment from 'components/TableAvailment'
import Modal from 'components/Modal'

export default {
  name: 'Availment',
  components: { Modal, TableAvailment, UserAvailment },
  data () {
    return {
      allLoaded: false,
      selectedAvailment: null,
      boardAvailmentsLoaded: true,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      modal: false,
      classObj: {},
      loadAvailmentClassObj: {
        'q-pa-none': true
      },
      tab: 'availments'
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      boardAvailments: 'boardAvailments'
    })
  },
  methods: {
    ...mapActions([
      'fetchAllAvailments',
      'fetchUser'
    ]),
    openSelectedAvailment (availment) {
      this.selectedAvailment = availment
      this.openModal('load-availment', 'Avvalimento di ' + availment.business, true, this.loadAvailmentClassObj, false)
    },
    openModal (component, title, isMaximized, classObj) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
    },
    async loadAvailments () {
      if (this.userLogged) {
        await this.fetchAllAvailments()
        this.boardAvailmentsLoaded = this.boardAvailments.length > 0
        this.allLoaded = true
      }
      this.$q.loading.hide()
    }
  },
  watch: {
    boardAvailments: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          this.boardAvailmentsLoaded = newVal.length > 0
        }
      }
    }
  },
  async mounted () {
    this.$q.loading.show()
    if (!this.userLogged) {
      const userId = window.localStorage.getItem('userId')
      if (userId) {
        const obj = { pathParam: userId }
        await this.fetchUser(obj)
      }
    }
    await this.loadAvailments()
  }
}
</script>

<style scoped>

</style>
