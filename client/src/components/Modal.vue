<template>
  <q-dialog v-model="localModal"
            persistent
            :maximized="isMaximized"
            transition-show="slide-up"
            transition-hide="slide-down"
            @hide="hideDialog">
      <q-card :class="{'bg-secondary': component === 'login'}">
        <q-card-section class="relative-position bg-secondary ">
          <div class="text-h6 text-white text-center text-capitalize">{{ title }}</div>
          <div class="absolute-top-right z-max">
            <q-btn class="text-white" icon="close" flat round dense v-close-popup />
          </div>
        </q-card-section>
        <q-card-section :class="classObj">
          <login @loginSuccess="loginSuccess" v-if="component === 'login'" />
          <sign-in :is-admin="isAdmin" :selectedUser="selectedUser" :is-editing="isEditing" @editSelectedUserSuccess="editSelectedUserSuccess" @signupSuccess="signupSuccess" @editSuccess="editSuccess" v-if="component === 'sign-in'" ></sign-in>
          <load-rdo :selected-rdo="selectedRdo" @loadRdoSuccess="loadRdoSuccess"  v-if="component==='load-rdo'"></load-rdo>
          <load-availment v-if="component==='load-availment'" @loadAvailmentSuccess="loadAvailmentSuccess" :selected-availment="selectedAvailment"></load-availment>
          <load-contract v-if="component==='load-contract'" @loadContractSuccess="loadContractSuccess" :selected-contract="selectedContract"></load-contract>
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>

import Login from 'components/Login'
import SignIn from 'components/SignIn'
import LoadRdo from 'components/LoadRdo'
import LoadAvailment from 'components/LoadAvailment'
import LoadContract from 'components/LoadContract'

export default {
  name: 'Modal',
  components: { LoadContract, LoadAvailment, LoadRdo, SignIn, Login },
  props: ['component', 'modal', 'title', 'isMaximized', 'classObj', 'isEditing', 'selectedRdo', 'isAdmin', 'selectedUser', 'selectedAvailment', 'selectedContract'],
  data () {
    return {
      localModal: this.modal
    }
  },
  methods: {
    editSelectedUserSuccess () {
      this.$emit('editSelectedUserSuccess')
    },
    loginSuccess (value) {
      this.$emit('update:modal', value)
    },
    signupSuccess (value) {
      this.$emit('update:modal', value)
      this.$emit('signupSuccess')
    },
    loadRdoSuccess (value) {
      this.$emit('update:modal', value)
    },
    loadAvailmentSuccess (value) {
      this.$emit('update:modal', value)
    },
    loadContractSuccess (value) {
      this.$emit('update:modal', value)
    },
    editSuccess (value) {
      this.$emit('update:modal', value)
    },
    hideDialog () {
      this.$emit('update:modal', this.localModal)
    }
  },
  watch: {
    modal (newVal, oldVal) {
      if (oldVal !== newVal) {
        this.localModal = newVal
      }
    }
  }
}
</script>
