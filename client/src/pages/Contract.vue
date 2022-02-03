<template>
  <q-page v-if="userLogged && allLoaded">
    <div v-if="(userLogged && boardContractsLoaded)" class="flex column justify-center items-center q-pt-md">
      <div class="flex items-center">
        <h5 class="text-center no-margin">Lista appalti</h5>
        <q-input   outlined
                   v-model="searchString"
                   type="text"
                   label="Filtra per tipologia o regione"
                   class="col-12 col-md-3 q-ml-md" />
        <q-btn v-if="userLogged.admin" round flat icon="add" class="q-ml-md" color="accent" @click="openModal('load-contract', 'Carica Appalto', true, loadContractClassObj, false), selectedContract = null" />
      </div>
      <contract-card v-for="(contract,index) in contractList" :contract="contract" :key="index" :index="index" class="q-mb-md" @modifyContract="modifyContract"></contract-card>
    </div>
    <div v-if="userLogged.admin && !boardContractsLoaded" class="flex column justify-center items-center q-pt-xl" >
      <h5 class="text-center no-margin q-pb-lg">Ancora nessun appalto caricato</h5>
      <q-btn push label="Carica appalto" color="accent" @click="openModal('load-contract', 'Carica Appalto', true, loadContractClassObj, false)" />
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
import ContractCard from 'components/ContractCard'

export default {
  name: 'Contract',
  components: { ContractCard, Modal },
  data () {
    return {
      allLoaded: false,
      boardContractsLoaded: false,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      selectedContract: null,
      modal: false,
      searchString: '',
      classObj: {},
      contractList: [],
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
    modifyContract (selectedContract) {
      console.log('ciao', selectedContract)
      this.selectedContract = selectedContract
      this.openModal('load-contract', 'Modifica Appalto', true, this.loadContractClassObj, false)
    },
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
  watch: {
    boardContracts: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length !== oldVal.length) {
          this.boardContractsLoaded = newVal.length > 0
          this.contractList = this.boardContracts
        }
      }
    },
    searchString: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal.length !== oldVal.length && newVal !== '') {
          this.contractList = this.boardContracts.filter((contract) => {
            return contract.region.toLowerCase().includes(newVal.toLowerCase()) || contract.typology.toLowerCase().includes(newVal.toLowerCase())
          })
        }
        if (newVal === '') {
          this.contractList = this.boardContracts
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
    await this.loadContracts()
  }
}
</script>

<style scoped>

</style>
