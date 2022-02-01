<template>
  <q-form @submit="openConfirmContractDialog">
    <div class="row wrap justify-center content-center q-pt-lg no-margin q-gutter-x-md q-gutter-y-xs">
      <q-input   outlined
                 v-model="contract.entity"
                 type="text"
                 label="Ente *"
                 reactive-rules name="entity"
                 :rules="[ (val) => isValid('entity', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.typology"
                 type="text"
                 label="Tipologia *"
                 reactive-rules name="typology"
                 :rules="[ (val) => isValid('typology', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.procedure"
                 type="text"
                 label="Procedura *"
                 reactive-rules name="procedure"
                 :rules="[ (val) => isValid('procedure', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.amount"
                 type="text"
                 label="Importo *"
                 reactive-rules name="amount"
                 :rules="[ (val) => isValid('amount', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.link"
                 type="text"
                 label="Link *"
                 reactive-rules name="link"
                 :rules="[ (val) => isValid('link', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.region"
                 type="text"
                 label="Regione *"
                 reactive-rules name="region"
                 :rules="[ (val) => isValid('region', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.place"
                 type="text"
                 label="Luogo *"
                 reactive-rules name="place"
                 :rules="[ (val) => isValid('place', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.category"
                 type="text"
                 label="Categoria *"
                 reactive-rules name="subject"
                 :rules="[ (val) => isValid('category', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input   outlined
                 v-model="contract.subject"
                 type="textarea"
                 label="Oggetto *"
                 reactive-rules name="subject"
                 :rules="[ (val) => isValid('subject', val, $v.contract) ]"
                 class="col-12 col-md-3" />
      <q-input  @click="$refs.qDateCertificateProxy.show()"
                v-if="!selectedContract"
                onkeydown="return false"
                class="col-12 col-md-3" label="Data Scadenza"
                :rules="[ (val) => isValid('date', val, $v) ]"
                outlined v-model="date" mask="##/##/####">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateCertificateProxy" transition-show="scale" transition-hide="scale">
              <q-date :locale="currentLocale" v-model="date" :options="calendarDataScadenza"  mask="DD/MM/YYYY">
                <div class="row items-center justify-end q-gutter-sm">
                  <q-btn label="Annulla" color="primary" flat v-close-popup />
                  <q-btn label="OK" color="primary" flat v-close-popup />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="desktop-only col-md-3"></div>
      <div class="desktop-only col-md-3"></div>
      <div class="col-12 row justify-center q-pt-md no-margin">
        <q-btn  push
                :ripple="false"
                class="col-2"
                :label="selectedContract ? 'Modifica Appalto' : 'Carica Appalto'"
                color="secondary"
                type='submit'/>
      </div>
    </div>
    <confirm-dialog :message="message" :data-obj="dataObj" :callback="callback" :confirm.sync="confirm"></confirm-dialog>
  </q-form>
</template>

<script>
import ConfirmDialog from 'components/ConfirmDialog'
import { mapActions } from 'vuex'
import Contract from 'src/model/contract'
import validator from 'src/validations/validator'
import { required } from 'vuelidate/lib/validators'
import { date } from 'quasar'

export default {
  name: 'LoadContract',
  components: { ConfirmDialog },
  props: ['selectedContract'],
  data () {
    return {
      message: undefined,
      dataObj: undefined,
      callback: undefined,
      confirm: false,
      contract: new Contract(),
      isValid: validator.isValid,
      date: null,
      currentLocale: {
        days: 'Domenica_Lunedì_Martedì_Mercoledì_Giovedì_Sabato'.split('_'),
        daysShort: 'Dom_Lun_Mar_Mer_Gio_Ven_Sab'.split('_'),
        months: 'Gennaio_Febbraio_Marzo_Aprile_Maggio_Giugno_Luglio_Agosto_Settembre_Ottobre_Novembre_Dicembre'.split('_'),
        monthsShort: 'Gen_Feb_Mar_Apr_Mag_Giu_Lug_Ago_Set_Ott_Nov_Dic'.split('_'),
        firstDayOfWeek: 1
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchAllContracts',
      'createContract',
      'updateContract'
    ]),
    calendarDataScadenza (date) {
      const currentTime = new Date()
      return (date >= currentTime.toLocaleDateString('fr-CA').replaceAll('-', '/'))
    },
    addMonths (date, months) {
      var d = date.getDate()
      date.setMonth(date.getMonth() + +months)
      if (date.getDate() !== d) {
        date.setDate(0)
      }
      return date
    },
    openConfirmContractDialog () {
      const message = this.selectedContract ? 'Sei sicuro di voler modificare l\' appalto?' : 'Sei sicuro di voler caricare l\' appalto?'
      this.openConfirmDialog(null, message, this.loadContract)
    },
    openConfirmDialog (data, message, callback) {
      this.callback = callback
      this.dataObj = data
      this.message = message
      this.confirm = true
    },
    async loadContract () {
      if (!this.$v.$invalid) {
        this.$q.loading.show()
        let message = ''
        if (this.selectedContract) {
          const obj = {
            pathParam: this.contract._id,
            body: this.contract
          }
          await this.updateContract(obj)
          message = 'Appalto modificato con successo!'
        } else {
          this.contract.expirationDate = date.addToDate(date.extractDate(this.date, 'DD/MM/YYYY'), { hours: 2 })
          const obj = {
            body: this.contract
          }
          await this.createContract(obj)
          message = 'Appalto caricato con successo!'
        }
        await this.fetchAllContracts()
        this.$emit('loadContractSuccess', false)
        this.$q.notify({
          type: 'positive',
          message: message
        })
        this.$q.loading.hide()
      }
    }
  },
  async mounted () {
    this.$v.$touch()
  },
  created () {
    if (this.selectedContract) {
      this.contract = JSON.parse(JSON.stringify(this.selectedContract))
      console.log(this.contract)
    } else {
      this.contract = new Contract()
    }
  },
  validations () {
    return {
      date: {
        required
      },
      contract: {
        entity: {
          required
        },
        typology: {
          required
        },
        procedure: {
          required
        },
        amount: {
          required
        },
        region: {
          required
        },
        place: {
          required
        },
        category: {
          required
        },
        link: {
          required
        },
        subject: {
          required
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
