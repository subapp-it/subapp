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

      <q-select class="col-12 col-md-3"
                outlined
                :disable="selectedAvailment != null"
                :options-dense="true"
                use-chips
                v-model="availment.category"
                label="Categoria *"
                :options="categoryOptions" option-label="description"
                reactive-rules
                name="category"
                emit-value
                map-options
                :rules="[ (val) => isValid('category', val, $v.availment) ]"
                transition-show="scale"
                transition-hide="scale"/>

      <q-select class="col-12 col-md-2"
                outlined
                :options-dense="true"
                :disable="selectedAvailment != null"
                v-model="availment.classification"
                label="Classifica *"
                :options="classificationOptions" option-label="description"
                reactive-rules
                name="classification"
                emit-value
                map-options
                :rules="[ (val) => isValid('classification', val, $v.availment) ]"
                transition-show="scale"
                transition-hide="scale"/>

      <div class="desktop-only col-md-4"></div>

      <q-input outlined
               v-model="availment.participationFee"
               :disable="selectedAvailment != null"
               label="Quota richiesta in fase di partecipazione"
               class="col-12 col-md-3"
               style="margin-bottom: 20px"
               type="number"
               name="participationFee" />
      <q-select class="col-12 col-md-2"
                outlined
                :disable="!availment.participationFee || selectedAvailment != null"
                :options-dense="true"
                v-model="partecipationFeeType"
                label="Tipo"
                :options="['€', '%']" option-label="description"
                name="partecipationFeeType"
                reactive-rules
                :rules="[ (val) => isValid('partecipationFeeType', val, $v) ]"
                emit-value
                map-options
                transition-show="scale"
                transition-hide="scale"/>

      <div class="desktop-only col-md-4"></div>

      <q-input outlined
               v-model="availment.awardFee"
               label="Quota richiesta in caso di aggiudicazione"
               :disable="selectedAvailment != null"
               class="col-12 col-md-3"
               style="margin-bottom: 20px"
               type="number"
               name="participationFee" />
      <q-select class="col-12 col-md-2"
                outlined
                :disable="!availment.awardFee || selectedAvailment != null"
                :options-dense="true"
                v-model="awardFeeType"
                label="Tipo"
                :options="['€', '%']" option-label="description"
                name="awardFeeType"
                reactive-rules
                :rules="[ (val) => isValid('awardFeeType', val, $v) ]"
                emit-value
                map-options
                transition-show="scale"
                transition-hide="scale"/>

      <div class="desktop-only col-md-4"></div>

      <q-input outlined
               v-model="availment.contact"
               :disable="selectedAvailment != null"
               label="Contatto email *"
               class="col-12 col-md-3"
               type="text"
               reactive-rule name="contact"
               :rules="[ (val) => isValid('contact', val, $v.availment) ]"/>

      <div class="col-12 col-md-2">
        <q-file
          v-model="soaFile"
          v-if="!selectedAvailment"
          label="Allegato SOA"
          accept=".pdf"
          outlined
          use-chips>
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>

      <div class="desktop-only col-md-4"></div>

      <div class="col-12 col-md-3 flex column justify-center" style="height: 56px">
        <div>
          <span>Disponibilità Avvalimento Totale</span>
          <q-toggle
            :disable="selectedAvailment != null"
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
            :disable="selectedAvailment != null"
            color="accent"
            unchecked-icon="clear"/>
        </div>
      </div>
      <div class="col-12 col-md-3 flex column justify-center" style="height: 56px">
        <div>
          <span>Disponibilità R.T.I.</span>
          <q-toggle
            :disable="selectedAvailment != null"
            v-model="availment.rti"
            checked-icon="check"
            color="accent"
            unchecked-icon="clear"/>
        </div>
      </div>
      <div v-if="selectedAvailment != null && selectedAvailment.soaFile" class="col-12 col-md-3">
        <q-table
          title="Lista file"
          :data="data"
          :columns="columns"
          row-key="name"
          bordered
          separator="cell"
          :pagination="pagination"
          :hide-bottom="true"
        >
          <template>
            <div class="col-2 q-table__title">Lista file</div>
          </template>
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td  key="description" :props="props">
                <div>
                  {{ props.row.file.Key.split('.')[1] }} <span v-if="props.row.file.index != null"> n. {{ props.row.file.index+1 }}</span>
                </div>
              </q-td>
              <q-td key="download" :props="props" >
                <q-icon v-if="props.row.file.Key" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.file.Key)"></q-icon>  </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-12 row justify-center q-pt-xl q-pb-xl no-margin">
        <q-btn  push
                :ripple="false"
                v-if="selectedAvailment === null"
                class="col-3"
                label="Salva"
                color="secondary"
                type='submit'/>
      </div>
    </div>
    <confirm-dialog :message="message" :data-obj="dataObj" :callback="callback" :confirm.sync="confirm"></confirm-dialog>
  </q-form>
</template>

<script>
import ConfirmDialog from 'components/ConfirmDialog'
import Availment from 'src/model/availment'
import validator from 'src/validations/validator'
import { email, required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { classifications } from '../costants/options'

export default {
  name: 'LoadAvailment',
  components: { ConfirmDialog },
  props: ['selectedAvailment'],
  data () {
    return {
      message: undefined,
      dataObj: undefined,
      callback: undefined,
      confirm: false,
      partecipationFeeType: undefined,
      awardFeeType: undefined,
      availment: new Availment(),
      categoryOptions: [],
      classificationOptions: [],
      isValid: validator.isValid,
      soaFile: null,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'description', label: 'File', align: 'center' },
        { name: 'download', label: 'Download', align: 'center' }
      ],
      data: []
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
  },
  methods: {
    ...mapActions([
      'getMacroRdo',
      'getCatRdo',
      'getSubRdo',
      'createAvailment',
      'uploadFile',
      'updateAvailment',
      'fetchUser',
      'fetchFile',
      'fetchAllAvailments'
    ]),
    async downloadFile (key) {
      const obj = {
        pathParam: key
      }
      const data = await this.fetchFile(obj)
      window.open(data.url)
    },
    getData () {
      if (this.data.length > 0) this.data = []
      this.availment.soaFile.index = 0
      const obj = {
        file: this.availment.soaFile
      }
      this.data.push(obj)
    },
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
        this.$q.loading.show()
        this.availment.user = this.userLogged
        const obj = {
          pathParam: this.userLogged._id,
          body: this.availment
        }
        if (this.partecipationFeeType) {
          this.availment.participationFee += ' ' + this.partecipationFeeType
        }
        if (this.awardFeeType) {
          this.availment.awardFee += ' ' + this.awardFeeType
        }
        const { availment } = await this.createAvailment(obj)
        if (this.soaFile && this.soaFile.size > 0) {
          const formData = new FormData()
          const soaFileSlipt = this.soaFile.name.split('.')
          const soaFileFileType = soaFileSlipt[soaFileSlipt.length - 1]
          formData.append('file', this.soaFile, `soaFile.${soaFileFileType}`)
          const uploadedFiles = await this.uploadFile(formData)
          uploadedFiles.files.forEach((file) => {
            availment[file.Key.split('.')[1]] = file
          })
          const obj = {
            pathParam: availment._id + '/' + this.userLogged._id,
            body: availment
          }
          await this.updateAvailment(obj)
        }
        await this.fetchUser(obj)
        await this.fetchAllAvailments()
        this.$emit('loadAvailmentSuccess', false)
        this.$q.notify({
          type: 'positive',
          message: 'Avvalimento offerto con successo!'
        })
        this.$q.loading.hide()
      }
    }
  },
  async created () {
    if (this.selectedAvailment) {
      this.availment = JSON.parse(JSON.stringify(this.selectedAvailment))
      if (this.availment.soaFile) {
        this.getData()
      }
    } else {
      this.classificationOptions = classifications
      const rdoMacroCategories = await this.getMacroRdo()
      const workCategory = rdoMacroCategories.macroRdo.find((rdoMacrocategory) => {
        return rdoMacrocategory.description === 'Lavori'
      })
      let obj = {
        queryparams: { rdomacroId: workCategory._id },
        order: 'first'
      }
      const rdoCategories = await this.getCatRdo(obj)
      obj = {
        queryparams: { rdocatId: rdoCategories.catRdo.map(item => item._id) },
        order: 'first'
      }
      const response = await this.getSubRdo(obj)
      this.categoryOptions = response.subRdo
    }
  },
  async mounted () {
    if (this.selectedAvailment) {
      this.availment.business = this.selectedAvailment.business
    } else {
      this.availment.business = this.userLogged.companyName
    }
    this.$v.$touch()
  },
  watch: {
    availment: {
      deep: true,
      handler (newVal, oldVal) {
        if (!newVal.participationFee) {
          this.partecipationFeeType = undefined
        }
        if (!newVal.awardFee) {
          this.awardFeeType = undefined
        }
      }
    }
  },
  validations () {
    return {
      availment: {
        business: {
          required
        },
        category: {
          required
        },
        classification: {
          required
        },
        contact: {
          email,
          required
        }
      },
      partecipationFeeType: {
        required: this.availment.participationFee ? required : false
      },
      awardFeeType: {
        required: this.availment.awardFee ? required : false
      }
    }
  }
}
</script>

<style scoped>

</style>
