<template>
  <q-table
    :data="data"
    :columns="columns"
    row-key="name"
    bordered
    :filter="filter"
    :filter-method="customFilter"
    no-results-label="Nessun avvalimento"
    separator="cell"
    :pagination="pagination"
  >
    <template v-slot:top="props">
      <q-input borderless dense debounce="300" v-model="search" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <div v-if="allAvailments && !userLogged.admin" class="text-center" style="margin: auto; font-size: 1.2rem; color: #165081;">Cerca avvalimento</div>
      <div v-if="!allAvailments" class="text-center" style="margin: auto; font-size: 1.2rem; color: #165081;">Avvalimenti da te offerti</div>
      <div  class="q-ml-auto">
        <q-btn v-if="!allAvailments"
               push
               :ripple="false"
               label="Offri avvalimento"
               @click="loadAvailment()"
               color="accent">
        </q-btn>
        <q-btn
          flat round dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </div>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props">
        <!-- <q-td :auto-width="true" key="rdos" :props="props">
         <div v-for="(rdo, index) in props.row.rdo.rdos" :key="index" >
            {{rdo.description}}
          </div>
        </q-td>-->
        <q-td :auto-width="true" key="business" :props="props">
          {{ props.row.availment.business }}
        </q-td>
        <q-td style="white-space: normal" :auto-width="true" key="category" :props="props">
          {{ props.row.availment.category.description }}
        </q-td>
        <q-td style="white-space: normal" :auto-width="true" key="classification" :props="props">
          {{ props.row.availment.classification }}
        </q-td>
        <q-td :auto-width="true" key="totalAvailment" :props="props">
          <div v-if="props.row.availment.totalAvailment" class="flex column items-center justify-around full-width">
            <q-icon  class="text-positive cursor-pointer" style="font-size: 1.5rem" name="done"></q-icon>
          </div>
          <div v-else>
            <q-icon  class="text-negative cursor-pointer" style="font-size: 1.5rem" name="close"></q-icon>
          </div>
        </q-td>
        <q-td :auto-width="true" key="splittedAvailment" :props="props">
          <div v-if="props.row.availment.splittedAvailment" class="flex column items-center justify-around full-width">
            <q-icon  class="text-positive cursor-pointer" style="font-size: 1.5rem" name="done"></q-icon>
          </div>
          <div v-else>
            <q-icon  class="text-negative cursor-pointer" style="font-size: 1.5rem" name="close"></q-icon>
          </div>
        </q-td>
        <q-td :auto-width="true" key="rti" :props="props">
          <div v-if="props.row.availment.rti" class="flex column items-center justify-around full-width">
            <q-icon  class="text-positive cursor-pointer" style="font-size: 1.5rem" name="done"></q-icon>
          </div>
          <div v-else>
            <q-icon  class="text-negative cursor-pointer" style="font-size: 1.5rem" name="close"></q-icon>
          </div>
        </q-td>
        <q-td :auto-width="true" key="participationFee" :props="props">
          {{ props.row.availment.participationFee.split(' ')[0] }}
        </q-td>
        <q-td :auto-width="true" key="percentage" :props="props">
          {{ props.row.availment.percentage }}
        </q-td>
        <q-td :auto-width="true" key="contact" :props="props">
          {{ props.row.availment.contact }}
        </q-td>
        <q-td :auto-width="true" key="soaFile" :props="props">
          <q-icon v-if="props.row.availment.soaFile" class="text-accent cursor-pointer" name="file_download" style="font-size: 2rem" @click="downloadFile(props.row.availment.soaFile.Key)"></q-icon>
          <q-icon class="text-negative" v-else name="remove"></q-icon>
        </q-td>
        <q-td :auto-width="true" key="viewAvailment" :props="props">
          <q-icon style="font-size: 2rem;" name="search" @click="openAvailment(props.row.availment)" class="text-accent cursor-pointer"></q-icon>
        </q-td>
        <q-td v-if="!allAvailments" :auto-width="true" key="deleteAvailment" :props="props">
          <q-icon style="font-size: 2rem;" name="delete_forever" class="text-negative cursor-pointer" @click="cancelAvailment(props.row.availment)"></q-icon>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TableAvailment',
  props: ['allAvailments', 'filtered'],
  data () {
    return {
      pagination: {
        rowsPerPage: 10
      },
      search: '',
      columns: [
        { name: 'business', required: true, label: 'Impresa', align: 'center' },
        { name: 'category', required: true, label: 'Categoria', align: 'center' },
        { name: 'classification', required: true, label: 'Classifica', align: 'center' },
        { name: 'totalAvailment', required: true, label: 'Avv. totale', align: 'center' },
        { name: 'splittedAvailment', required: true, label: 'Avv. frazionato', align: 'center' },
        { name: 'rti', required: true, label: 'R.T.I.', align: 'center' },
        { name: 'participationFee', required: true, label: 'Quota partec.', align: 'center' },
        { name: 'percentage', required: true, label: 'Percentuale', align: 'center' },
        { name: 'contact', required: true, label: 'Contatto', align: 'center' },
        { name: 'soaFile', required: true, label: 'SOA', align: 'center' },
        { name: 'viewAvailment', required: true, label: 'Visualizza avvalimento', align: 'center' }
      ],
      data: []
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    }),
    filter () {
      return {
        search: this.search
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchFile',
      'deleteAvailment',
      'fetchAllAvailments',
      'fetchUser'
    ]),
    async cancelAvailment (availment) {
      this.$q.loading.show()
      const userId = !this.userLogged.admin ? this.userLogged._id : availment.user._id
      const objDelete = {
        pathParam: availment._id + '/' + userId
      }
      const objUser = {
        pathParam: userId
      }
      await this.deleteAvailment(objDelete)
      if (!this.userLogged.admin) {
        await this.fetchUser(objUser)
        this.getData(this.userLogged.loadedRdos)
      } else {
        await this.fetchAllAvailments()
        // this.getData(filteredRdos)
      }
      this.$q.loading.hide()
    },
    openAvailment (availment) {
      this.$emit('openSelectedAvailment', availment)
    },
    async downloadFile (key) {
      const obj = {
        pathParam: key
      }
      const data = await this.fetchFile(obj)
      window.open(data.url)
    },
    getData (data) {
      if (this.data && this.data.length > 0) {
        this.data = []
      }
      data.forEach((availment) => {
        if (availment.participationFee) {
          availment.percentage = availment.participationFee.split(' ')[1]
        }
        const obj = {
          availment: availment
        }
        this.data.push(obj)
      })
    },
    loadAvailment () {
      this.$emit('resetSelectedAvailment')
      this.$emit('openModal')
    },
    customFilter (rows, terms) {
      const lowerSearch = terms.search ? terms.search.toLowerCase() : ''

      const filteredRows = rows.filter(
        (row, i) => {
          let ans = false
          let s1 = true

          if (lowerSearch !== '') {
            s1 = false
            const searchObj = { }
            Object.entries(row.rdo).forEach((obj) => {
              if (obj[0] === 'rdos') {
                searchObj.descMacro = obj[1].descMacro
                searchObj.subCategory = obj[1].description
              }
              if (obj[0] === 'regionOfInterest') {
                searchObj[obj[0]] = obj[1].description
              }
              if (obj[0] === 'import') {
                searchObj[obj[0]] = obj[1]
              }
              if (obj[0] === 'contractor') {
                searchObj[obj[0]] = obj[1]
              }
            })

            const s1Values = Object.values(searchObj)

            const s1Lower = s1Values.map(x => x.toString().toLowerCase())

            for (let val = 0; val < s1Lower.length; val++) {
              if (s1Lower[val].includes(lowerSearch)) {
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
  mounted () {
    if (!this.allAvailments) {
      this.getData(this.userLogged.loadedAvailments)
      this.columns.push({ name: 'deleteAvailment', required: true, label: 'Elimina Avvalimento', align: 'center' })
    }
  },
  watch: {
    userLogged: {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal && !this.allAvailments) {
          this.getData(newVal.loadedAvailments)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
