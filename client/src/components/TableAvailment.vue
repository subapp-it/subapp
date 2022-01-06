<template>
  <q-table
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
          {{ props.row }}
        </q-td>
        <q-td style="white-space: normal" :auto-width="true" key="category" :props="props">
          {{ props.row }}
        </q-td>
        <q-td style="white-space: normal" :auto-width="true" key="classification" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="totalAvailment" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="splittedAvailment" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="rti" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="participationFee" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="percentage" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="contact" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="soa" :props="props">
          {{ props.row }}
        </q-td>
        <q-td :auto-width="true" key="viewRdo" :props="props">
          <q-icon style="font-size: 2rem;" name="search" @click="openAvailment(props.row.rdo)" class="text-accent cursor-pointer"></q-icon>
        </q-td>
        <q-td v-if="!allAvailments || userLogged.admin" :auto-width="true" key="deleteRdo" :props="props">
          <q-icon style="font-size: 2rem;" name="delete_forever" class="text-negative cursor-pointer" @click="cancelRdo(props.row.rdo)"></q-icon>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableAvailment',
  props: ['allAvailments', 'filtered'],
  data () {
    return {
      pagination: {
        rowsPerPage: 0
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
        { name: 'soa', required: true, label: 'SOA', align: 'center' }
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
    loadAvailment () {
      // this.$emit('resetSelectedRdo')
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
  }
}
</script>

<style scoped>

</style>
