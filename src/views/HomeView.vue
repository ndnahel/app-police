<script setup>
import { ref } from 'vue'
import Formulaire from '@/components/FormComponent.vue'
import Document from '@/components/DocumentComponent.vue'
import Footer from '@/components/FooterComponent.vue'

const formData = ref({
  numberPvi: '',
  grade: '',
  name: '',
  qualification: '',
  vacation: '',
  genre: 'Monsieur',
  individu: '',
  naissance: '',
  faits: [],
  vacationPersons: [],
  opj: '',
  lines: [],
  pieces: []
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 m-5">
    <Formulaire v-model:formData="formData" />
    <Document :formData="formData" />
  </div>
  <Footer />
</template>
