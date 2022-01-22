<template>
  <q-page v-if="userLogged && allLoaded">
    <div class="q-pa-lg">
      <q-btn @click="openModal('load-contract', 'Carica Appalto', true, loadContractClassObj, false)"></q-btn>
    </div>
    <div v-if="(userLogged && boardContractsLoaded)" >
    </div>
    <div v-if="userLogged.admin && !boardContractsLoaded" class="flex column justify-center items-center q-pt-xl" >
      <h5 class="text-center no-margin q-pb-lg">Ancora nessun appalto caricato</h5>
    </div>
    <div v-if="!userLogged.admin && !boardContractsLoaded" class="flex column justify-center items-center q-pt-xl" >
      <h5 class="text-center no-margin q-pb-lg">Ancora nessun appalto caricato</h5>
    </div>
    <modal :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :component="modalComponent" :title="modalTitle" :selected-contract="selectedContract"/>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modal from 'components/Modal'

export default {
  name: 'Contract',
  components: { Modal },
  data () {
    return {
      allLoaded: false,
      boardContractsLoaded: false,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      selectedContract: null,
      modal: false,
      classObj: {},
      loadContractClassObj: {
        'q-pa-none': true
      }
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user',
      boardContracts: 'boardContracts'
    })
  },
  methods: {
    ...mapActions([
      'fetchAllContracts',
      'fetchUser'
    ]),
    async loadContracts () {
      if (this.userLogged) {
        await this.fetchAllContracts()
        this.boardContractsLoaded = this.boardContracts.length > 0
        this.allLoaded = true
      }
      this.$q.loading.hide()
    },
    openModal (component, title, isMaximized, classObj) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
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
    await this.loadContracts()
  }
}
</script>

<style scoped>

</style>
