<template>
  <q-card class="my-card" style="min-width: 60%">
    <q-card-section class="relative-position" style="overflow-wrap: break-word;">
      <q-btn v-if="userLogged.admin" round flat icon="fas fa-trash-alt" class="absolute-top-right" color="negative" @click="removeContract"/>
      <q-btn v-if="userLogged.admin" round flat icon="fas fa-pencil-alt" class="absolute-top-right q-mr-xl" color="primary" @click="modifyContract"/>
      <div class="q-pb-md">
        <span class="text-body1 text-weight-medium">Ente: </span>
        <span class="text-body2">{{ contract.entity }}</span>
      </div>
      <div class="q-pb-md">
        <span class="text-body1 text-weight-medium">Tipologia: </span>
        <span class="text-body2">{{ contract.typology }}</span>
      </div>
      <div class="q-pb-md">
        <span class="text-body1 text-weight-medium">Procedura: </span>
        <span class="text-body2">{{ contract.procedure }}</span>
      </div>
      <div class="q-pb-md">
        <span class="text-body1 text-weight-medium">Oggetto: </span>
        <span class="text-body2">{{ contract.subject }}</span>
      </div>
      <div class="q-pb-md">
        <span class="text-body1 text-weight-medium">Importo: </span>
        <span class="text-body2">{{ contract.amount }}</span>
      </div>
      <div class="flex q-pb-md">
        <div>
          <span class="text-body1 text-weight-medium">Regione: </span>
          <span class="text-body2">{{ contract.region }}</span>
        </div>
        <div class="q-ml-xl">
          <span class="text-body1 text-weight-medium">Luogo: </span>
          <span class="text-body2">{{ contract.place }}</span>
        </div>
      </div>
      <div>
        <span class="text-body1 text-weight-medium">Link: </span>
        <a class="text-body2" :href="contract.link" target="_blank">Clicca per aprire il link</a>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ContractCard',
  props: ['contract', 'index'],
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
  },
  methods: {
    ...mapActions([
      'deleteContract',
      'fetchAllContracts'
    ]),
    async removeContract () {
      this.$q.loading.show()
      const objDelete = {
        pathParam: this.contract._id
      }
      await this.deleteContract(objDelete)
      await this.fetchAllContracts()
      this.$q.loading.hide()
    },
    modifyContract () {
      this.$emit('modifyContract', this.contract)
    }
  }
}
</script>

<style scoped>

</style>
