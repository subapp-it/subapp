<template>
  <q-form @submit="openConfirmRdoDialog">
    <div class="row wrap justify-center content-center q-pt-lg no-margin q-gutter-x-md q-gutter-y-xs">
      <q-input   outlined
                 :disable="true"
                 v-model="availment.business"
                 type="text"
                 label="Impresa *"
                 class="col-12 col-md-3"
                 reactive-rules name="business"
                 :rules="[ (val) => isValid('business', val, $v.availment) ]"/>

      <div class="desktop-only col-md-3"></div>
      <div class="desktop-only col-md-3"></div>

      <div class="col-12 col-md-3 flex column justify-center" style="height: 56px">
        <div>
          <span>Disponibilità Avvalimento Totale</span>
          <q-toggle
            v-model="availment.totalAvailment"
            checked-icon="check"
            color="accent"
            unchecked-icon="clear"/>
        </div>
      </div>
      <div class="col-12 col-md-3 flex column justify-center" style="height: 56px">
        <div>
          <span>Disponibilità Avvalimento Frazionato</span>
          <q-toggle
            v-model="availment.splittedAvailment"
            checked-icon="check"
            color="accent"
            unchecked-icon="clear"/>
        </div>
      </div>
      <div class="col-12 col-md-3 flex column justify-center" style="height: 56px">
        <div>
          <span>Disponibilità R.T.I.</span>
          <q-toggle
            v-model="availment.rti"
            checked-icon="check"
            color="accent"
            unchecked-icon="clear"/>
        </div>
      </div>
    </div>
    <confirm-dialog :message="message" :data-obj="dataObj" :callback="callback" :confirm.sync="confirm"></confirm-dialog>
  </q-form>
</template>

<script>
import ConfirmDialog from 'components/ConfirmDialog'
import Availment from 'src/model/availment'
import validator from 'src/validations/validator'
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'LoadAvailment',
  components: { ConfirmDialog },
  data () {
    return {
      message: undefined,
      dataObj: undefined,
      callback: undefined,
      confirm: false,
      availment: new Availment(),
      isValid: validator.isValid
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
  },
  methods: {
    openConfirmRdoDialog () {
      this.openConfirmDialog(null, 'Sei sicuro di voler offrire l\' avvalimento?', this.loadAvailment)
    },
    openConfirmDialog (data, message, callback) {
      this.callback = callback
      this.dataObj = data
      this.message = message
      this.confirm = true
    },
    async loadAvailment () {
      if (!this.$v.$invalid) {
        console.log('caricando')
      }
    }
  },
  async mounted () {
    this.availment.business = this.userLogged.companyName
    this.$v.$touch()
  },
  validations () {
    return {
      availment: {
        business: {
          required
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
