<template>
  <q-page v-if="userLogged && allLoaded">
    <div class="q-py-lg tab-rdo">
      <q-tabs
        v-if="!userLogged.admin"
        v-model="tab"
        class="text-secondary"
        active-color="accent"
        indicator-color="accent"
        dense
        narrow-indicator
        align="center"
      >
        <q-tab :ripple="false" name="availments" label="Cerca Avvalimenti" class="q-mr-lg"/>
        <q-tab :ripple="false" name="availmentOfferedByYou" label="Avvalimenti da te offerti" class="q-ml-lg" />
      </q-tabs>

      <h5 v-if="userLogged.admin" class="text-center no-margin">Lista RDO vista ADMIN</h5>
      <div>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="full-width"
        >
          <q-tab-panel name="availments">
            CIAO
          </q-tab-panel>

          <q-tab-panel name="availmentOfferedByYou">
            <user-availment></user-availment>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import UserAvailment from 'components/UserAvailment'

export default {
  name: 'Availment',
  components: { UserAvailment },
  data () {
    return {
      allLoaded: false,
      tab: 'availments'
    }
  },
  methods: {
    ...mapActions([
      'fetchAllAvailments',
      'fetchUser'
    ]),
    async loadAvailments () {
      this.$q.loading.show()
      if (this.userLogged) {
        await this.fetchAllAvailments()
        this.allLoaded = true
      }
      this.$q.loading.hide()
    }
  },
  computed: {
    ...mapGetters({
      userLogged: 'user'
    })
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
    await this.loadAvailments()
  }
}
</script>

<style scoped>

</style>
