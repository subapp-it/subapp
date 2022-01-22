<template>
  <q-form @submit="openConfirmRdoDialog">
    <div>
      ciao
    </div>
    <confirm-dialog :message="message" :data-obj="dataObj" :callback="callback" :confirm.sync="confirm"></confirm-dialog>
  </q-form>
</template>

<script>
import ConfirmDialog from 'components/ConfirmDialog'
import { mapActions } from 'vuex'

export default {
  name: 'LoadContract',
  components: { ConfirmDialog },
  data () {
    return {
      message: undefined,
      dataObj: undefined,
      callback: undefined,
      confirm: false
    }
  },
  methods: {
    ...mapActions([
      'fetchAllContracts',
      'fetchUser'
    ]),
    openConfirmRdoDialog () {
      this.openConfirmDialog(null, 'Sei sicuro di voler caricare l\' appalto?', this.loadContract)
    },
    async loadContract () {
      if (!this.$v.$invalid) {
        this.$q.loading.show()
        const obj = {
          pathParam: this.userLogged._id
        }
        await this.fetchUser(obj)
        await this.fetchAllContracts()
        this.$emit('loadContractSuccess', false)
        this.$q.notify({
          type: 'positive',
          message: 'Appalto caricato con successo!'
        })
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style scoped>

</style>
