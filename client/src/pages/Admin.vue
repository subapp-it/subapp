<template>
  <q-page class="q-pa-xl">
    <q-table
      title="Lista utenti"
      :data="data"
      :columns="columns"
      row-key="name"
      bordered
      :hide-bottom="true"
      :filter="filter"
      :filter-method="customFilter"
      separator="cell"
      :pagination="pagination"
    >
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Lista utenti</div>
        <q-input borderless dense debounce="300" v-model="search" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-auto"
        />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td :auto-width="true" key="companyName" :props="props">
            <div>
              {{ props.row.user.companyName }}
            </div>
            <q-icon style="font-size: 2rem;" name="search" class="text-secondary cursor-pointer" @click="viewSelectedProfile(props.row.user)"/>
          </q-td>
          <q-td :auto-width="true" key="user" :props="props">
            <div>
              {{ props.row.user.username }}
            </div>
          </q-td>
          <q-td :auto-width="true" key="registrationDate" :props="props">
            {{ date.formatDate(props.row.user.createdAt, 'DD-MM-YYYY') }}
          </q-td>
          <q-td  key="blocked" :props="props">
            <q-btn v-if="props.row.user.blocked" push class="bg-warning text-white" @click="openConfirmDialog(props.row.user, 'Sicuro di voler sbloccare l\'utente selezionato?', update , false, null)">Sblocca</q-btn>
            <q-btn v-else push class="bg-warning text-white" @click="openConfirmDialog(props.row.user, 'Sicuro di voler bloccare l\'utente selezionato?', update, true, null)">Blocca</q-btn>
          </q-td>
          <q-td  key="payed" :props="props">
            <div v-if="props.row.user.payed" class="flex column items-center justify-around full-width">
              <div class="text-negative" style="font-weight: bold">{{getDaysLeftToEndSubscription(props.row.user)}}</div>
              <q-icon  class="text-positive cursor-pointer" style="font-size: 2rem" name="done"></q-icon>
            </div>
            <div v-else>
              <q-icon  class="text-negative cursor-pointer" style="font-size: 2rem" name="error"></q-icon>
            </div>
          </q-td>
          <q-td key="annual" :props="props">
            <q-btn push class="bg-accent text-white" :disable="props.row.user.payed"  @click="openConfirmDialog(props.row.user,'Sicuro di voler attivare l\'abbonamento di un anno?', confirmUser, undefined, 1)">Attiva</q-btn>
          </q-td>
          <q-td  key="soaFile" :props="props">
            <q-icon v-if="props.row.user.soaFile" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.soaFile.Key)"></q-icon>
            <q-icon class="text-negative" v-else name="remove"></q-icon>
          </q-td>
          <q-td  key="isoFile" :props="props" >
            <q-icon v-if="props.row.user.isoFile" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.isoFile.Key)"></q-icon>
            <q-icon class="text-negative" v-else name="remove"></q-icon>
          </q-td>
          <q-td  key="fgasFile" :props="props">
            <q-icon v-if="props.row.user.fgasFile" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.fgasFile.Key)"></q-icon>
            <q-icon class="text-negative" v-else name="remove"></q-icon>
          </q-td>
          <q-td  key="antimafiaFile" :props="props" v-if="props.row.user.antimafiaFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.antimafiaFile.Key)"></q-icon>
          </q-td>
          <q-td  key="lendingFile" :props="props" v-if="props.row.user.lendingFile">
            <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.user.lendingFile.Key)"></q-icon>
          </q-td>
          <q-td  key="certificateFile" :props="props" v-if="props.row.user.certificateFile">
            <div class="flex column items-center full-width" >
              <div class="text-negative text-center" style="font-weight: bold;">{{getDaysLeftToEndFile(props.row.user.certificateDate, props.row.user)}}</div>
              <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem;" @click="downloadFile(props.row.user.certificateFile.Key)"></q-icon>
            </div>
          </q-td>
          <q-td  key="durcRegolarityFile" :props="props" v-if="props.row.user.durcRegolarityFile">
            <div class="flex column items-center full-width" >
              <div class="text-negative text-center" style="font-weight: bold;">{{getDaysLeftToEndFile(props.row.user.durcRegolarityDate, props.row.user)}}</div>
              <q-icon class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem;" @click="downloadFile(props.row.user.durcRegolarityFile.Key)"></q-icon>
            </div>
          </q-td>
          <q-td  key="artSixA" :props="props">
            <div v-if="props.row.user.regulationLetterA" class="flex column items-center justify-around full-width">
              <q-icon  class="text-positive cursor-pointer" style="font-size: 2rem" name="done"></q-icon>
            </div>
            <div v-else>
              <q-icon  class="text-negative cursor-pointer" style="font-size: 2rem" name="close"></q-icon>
            </div>
          </q-td>
          <q-td key="accessesNumber" :props="props">
            <span class="text-h6">{{props.row.user.accessesNumber}}</span>
          </q-td>
          <q-td key="rdosNumber" :props="props">
            <span class="text-h6">{{props.row.user.loadedRdos.length}}</span>
          </q-td>
          <q-td key="lastLoginDate" :props="props">
            {{ date.formatDate(props.row.user.lastLoginDate, 'DD-MM-YYYY HH:mm') }}
          </q-td>
          <q-td key="delete" :props="props" >
            <q-icon style="font-size: 2rem;" name="delete_forever" class="text-negative cursor-pointer" @click="openConfirmDialog(props.row.user, 'Sicuro di voler eliminare l\'utente selezionato?', removeUser)"></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <modal @editSelectedUserSuccess="editSelectedUserSuccess" :class-obj="classObj" :modal.sync="modal" :is-maximized="isMaximized" :is-editing="isEditing" :component="modalComponent" :title="modalTitle" :is-admin="true" :selected-user="selectedUser"/>
    <confirm-dialog :message="message" :data-obj="dataObj" :callback="callback" :confirm.sync="confirm"></confirm-dialog>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { date } from 'quasar'
import Modal from 'components/Modal'
import ConfirmDialog from 'components/ConfirmDialog'
import { nodemailer } from 'src/costants/options'

export default {
  name: 'Admin',
  components: { ConfirmDialog, Modal },
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      subscriptionPeriod: null,
      haveToBlock: false,
      message: undefined,
      dataObj: undefined,
      callback: undefined,
      confirm: false,
      selectedUser: undefined,
      isEditing: false,
      modal: false,
      modalComponent: undefined,
      modalTitle: undefined,
      isMaximized: false,
      classObj: {},
      viewProfileClassObj: {
        'bg-white': true
      },
      search: '',
      date: date,
      users: [],
      columns: [
        {
          name: 'companyName',
          required: true,
          label: 'Ragione Sociale',
          align: 'center',
          sortable: true,
          headerClasses: 'text-weight-bold'
        },
        {
          name: 'user',
          required: true,
          label: 'Username',
          align: 'center',
          sortable: true,
          headerClasses: 'text-weight-bold'
        },
        { name: 'registrationDate', required: true, label: 'Data iscrizione', sortable: true, align: 'center' },
        {
          name: 'blocked',
          required: true,
          label: 'Blocca/Sblocca',
          align: 'center',
          headerClasses: 'text-weight-bold'
        },
        { name: 'payed', required: true, label: 'Abbonamento', align: 'center' },
        { name: 'annual', required: true, label: 'Annuale', align: 'center' },
        { name: 'soaFile', label: 'Soa File', align: 'center' },
        { name: 'isoFile', label: 'Iso File', align: 'center' },
        { name: 'fgasFile', label: 'FGas File', align: 'center' },
        { name: 'antimafiaFile', required: true, label: 'Antimafia File', align: 'center' },
        { name: 'lendingFile', required: true, label: 'Presentazione File', align: 'center' },
        { name: 'certificateFile', required: true, label: 'Certificato o Visura Camerale File', align: 'center' },
        { name: 'durcRegolarityFile', required: true, label: 'Regolarità Durc File', align: 'center' },
        { name: 'artSixA', required: true, label: 'Art.6 Lett.a', align: 'center' },
        { name: 'accessesNumber', required: true, label: 'Numero accessi', align: 'center' },
        { name: 'rdosNumber', required: true, label: 'Numero RDO caricate', align: 'center' },
        { name: 'lastLoginDate', required: true, label: 'Ultimo accesso', align: 'center' },
        { name: 'delete', required: true, label: 'Elimina', align: 'center' }
      ],
      data: []
    }
  },
  computed: {
    filter () {
      return {
        search: this.search
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchUsers',
      'updateLoggedUser',
      'deleteUser',
      'fetchFile',
      'sendMail'
    ]),
    async editSelectedUserSuccess () {
      await this.loadUsers()
    },
    openConfirmDialog (data, message, callback, haveToBlock, period) {
      this.haveToBlock = haveToBlock
      this.subscriptionPeriod = period
      this.callback = callback
      this.dataObj = data
      this.message = message
      this.confirm = true
    },
    openModal (component, title, isMaximized, classObj, isEditing) {
      this.modalComponent = component
      this.modalTitle = title
      this.isMaximized = isMaximized
      this.modal = true
      this.classObj = classObj
      this.isEditing = isEditing
    },
    getData () {
      if (this.data.length > 0) this.data = []
      this.users.forEach((user) => {
        if (!user.admin) {
          const obj = {
            user: user
          }
          this.data.push(obj)
        }
      })
    },
    viewSelectedProfile (user) {
      this.selectedUser = user
      this.openModal('sign-in', 'MODIFICA UTENTE - VISTA ADMIN', true, this.viewProfileClassObj, true)
    },
    async downloadFile (key) {
      const obj = {
        pathParam: key
      }
      const data = await this.fetchFile(obj)
      window.open(data.url)
    },
    async confirmUser (user) {
      if (user) {
        user.payed = true
        user.subscriptionDate = new Date()
        if (this.subscriptionPeriod === 1) {
          user.annual = true
        } else {
          user.biennial = true
        }
        this.update(user)
        const confirmActivationEmail = {
          to: user.username,
          from: nodemailer.from,
          subject: 'Subapp.it: Conferma attivazione account',
          html: 'Gentile cliente,<br/><br/>' +
            'confermiamo la corretta attivazione del suo account per la durata di anni: ' + (this.subscriptionPeriod === 1 ? '1' : '2') + '<br/>' +
            'Acceda al portale cliccando su: <a target="_blank" href="https://www.subapp.it">Subapp.it</a><br/>' +
            '<br/>Distinti Saluti,<br/>' +
            '<span style="color:#29ABF4">Subapp.it s.r.l.s</span>'
        }
        await this.sendMail(confirmActivationEmail)
      }
    },
    async update (user) {
      user.blocked = this.haveToBlock
      const obj = {
        pathParam: user._id,
        body: user
      }
      await this.updateLoggedUser(obj)
      await this.loadUsers()
    },
    async removeUser (user) {
      this.$q.loading.show()
      const obj = {
        pathParam: user._id
      }
      await this.deleteUser(obj)
      await this.loadUsers()
    },
    async loadUsers () {
      const { users } = await this.fetchUsers()
      this.users = users
      this.getData()
      this.$q.loading.hide()
    },
    getDaysLeftToEndSubscription (user) {
      const period = user.annual ? 1 : 2
      const expirySubscriptionDate = date.addToDate(new Date(user.subscriptionDate), { year: period })
      if (date.getDateDiff(expirySubscriptionDate, new Date(), 'days') >= 0) {
        return 'Scade tra: ' + date.getDateDiff(expirySubscriptionDate, new Date(), 'days') + ' giorni'
      } else {
        return 'SCADUTO'
      }
    },
    getDaysLeftToEndFile (fileDate, user) {
      if (date.getDateDiff(fileDate, new Date(), 'days') > 0) {
        user.needBlock = true
        return 'Scade tra: ' + date.getDateDiff(fileDate, new Date(), 'days') + ' giorni'
      } else {
        user.needBlock = true
        return 'SCADUTO'
      }
    },
    customFilter (rows, terms) {
      const lowerSearch = terms.search ? terms.search.toLowerCase() : ''
      const filteredRows = rows.filter(
        (row, i) => {
          let ans = false
          let s1 = true

          if (lowerSearch !== '') {
            s1 = false
            const s1Values = Object.values(row.user)
            const s1Lower = s1Values.map((x) => {
              if (x != null) { return x.toString().toLowerCase() }
            })

            for (let val = 0; val < s1Lower.length; val++) {
              if (val != null && s1Lower[val].includes(lowerSearch)) {
                s1 = true
                break
              }
            }
          }

          ans = false
          if (s1) {
            ans = true
          }

          return ans
        })

      return filteredRows
    }
  },
  async mounted () {
    this.$q.loading.show()
    await this.loadUsers()
  }
}
</script>

<style scoped>

</style>
