<script setup>
import { computed } from 'vue'
import { getGrades, getLinesType, getQualifications } from '@/services/police.js'

const props = defineProps({
  formData: Object
})
const emit = defineEmits(['update:formData'])
const localFormData = computed({
  get: () => props.formData,
  set: (newValue) => {
    emit('update:formData', newValue)
  }
})

function addItem(property, defaultValue = '') {
  if (Array.isArray(localFormData.value[property])) {
    if (property === 'lines') {
      localFormData.value[property].push({ type: '', text: '' })
    } else if (property === 'vacationPersons') {
      localFormData.value[property].push({ grade: '', name: '' })
    } else {
      localFormData.value[property].push(defaultValue)
    }
  }
}
function removeItem(property, index) {
  if (Array.isArray(localFormData.value[property]) && index >= 0 && index < localFormData.value[property].length) {
    localFormData.value[property].splice(index, 1)
  }
}
function updateItem(property, index, value) {
  if (Array.isArray(localFormData.value[property]) && index >= 0 && index < localFormData.value[property].length) {
    localFormData.value[property][index] = value
  }
}

function moveUp(property, index) {
  if (index > 0 && Array.isArray(localFormData.value[property])) {
    const temp = localFormData.value[property][index]
    localFormData.value[property].splice(index, 1)
    localFormData.value[property].splice(index - 1, 0, temp)
  }
}
function moveDown(property, index) {
  if (index < localFormData.value[property].length - 1 && Array.isArray(localFormData.value[property])) {
    const temp = localFormData.value[property][index]
    localFormData.value[property].splice(index, 1)
    localFormData.value[property].splice(index + 1, 0, temp)
  }
}
</script>

<template>
  <form>
    <div class="grid grid-cols-5 gap-2 my-6">
      <div class="col-span-1">
        <label for="numberPvi" class="block mb-2 text-sm font-medium text-gray-900">N° PVI :</label>
        <input type="number" id="numberPvi" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.numberPvi" />
      </div>
      <div class="col-span-2">
        <label for="grade" class="block mb-2 text-sm font-medium text-gray-900">Grade :</label>
        <select id="grade" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.grade">
          <option disabled value="" selected>Sélectionnez votre grade</option>
          <option v-for="grade in getGrades()" :key="grade" :value="grade">{{ grade }}</option>
        </select>
      </div>
      <div class="col-span-2">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Votre nom :</label>
        <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.name" />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 mb-6">
      <div class="col-span-2">
        <label for="qualification" class="block mb-2 text-sm font-medium text-gray-900">Qualification :</label>
        <select id="qualification" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.qualification">
          <option disabled value="" selected>Sélectionnez votre qualification</option>
          <option v-for="qualification in getQualifications()" :key="qualification" :value="qualification">{{ qualification.label }}</option>
        </select>
      </div>
      <div class="col-span-1">
        <label for="vacation" class="block mb-2 text-sm font-medium text-gray-900">Vacation :</label>
        <input type="text" id="vacation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.vacation" />
      </div>
    </div>
    <div class="mb-4">
      <label class="block mb-2 text-sm font-medium text-gray-900">Personnes dans la vacation :</label>
      <div v-for="(person, index) in localFormData.vacationPersons" :key="index" class="flex items-center gap-2 mb-2">
        <select
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
          v-model="person.grade"
        >
          <option disabled value="">Sélectionnez le grade</option>
          <option v-for="grade in getGrades()" :key="grade" :value="grade">{{ grade }}</option>
        </select>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
          v-model="person.name"
          placeholder="Nom"
        />
        <button type="button" @click="removeItem('vacationPersons', index)">&times;</button>
      </div>
      <button type="button" @click="addItem('vacationPersons')" class="bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white rounded-2xl mb-3">+ Ajouter</button>
    </div>
    <div class="grid grid-cols-5 gap-2 mb-6">
      <div class="col-span-1">
        <label for="genre" class="block mb-2 text-sm font-medium text-gray-900">Genre :</label>
        <select id="genre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.genre">
          <option selected value="Monsieur">Homme</option>
          <option value="Madame">Femme</option>
        </select>
      </div>
      <div class="col-span-2">
        <label for="individu" class="block mb-2 text-sm font-medium text-gray-900">Individu interpellé :</label>
        <input type="text" id="individu" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.individu" />
      </div>
      <div class="col-span-2">
        <label for="naissance" class="block mb-2 text-sm font-medium text-gray-900">Date de naissance :</label>
        <input type="date" id="naissance" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="localFormData.naissance"  />
      </div>
    </div>
    <div class="mb-6">
      <label for="faits" class="block mb-2 text-sm font-medium text-gray-900">Faits reprochés :</label>
      <div v-for="(fait, index) in localFormData.faits" :key="index" class="flex items-center gap-2 mb-2">
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          v-model="localFormData.faits[index]"
          @input="updateItem('faits', index, fait)"
        />
        <button type="button" @click="removeItem('faits', index)">&times;</button>
      </div>
      <button type="button" @click="addItem('faits')" class="bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white rounded-2xl mb-3">+ Ajouter</button>
    </div>
    <div class="mb-6">
      <label for="opj" class="block mb-2 text-sm font-medium text-gray-900">OPJ en charge :</label>
      <input type="text" id="opj" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required v-model="localFormData.opj" />
    </div>

    <hr class="my-2">

    <div class="mt-2">
      <div class="mb-4">
        <label class="block mb-2 text-sm font-medium text-gray-900">Lignes</label>
        <div v-for="(line, index) in localFormData.lines" :key="index" class="flex items-center gap-2 mb-2">
          <div class="flex flex-col">
            <button v-if="index !== 0" type="button" @click="moveUp('lines', index)" class="focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <button type="button" @click="moveDown('lines', index)" v-if="index !== localFormData.lines.length - 1" class="focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
            v-model="line.type"
          >
            <option disabled value="" selected>Sélectionnez le type</option>
            <option v-for="type in getLinesType()" :key="type.index" :value="type.index">{{ type.label }}</option>
          </select>
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
            v-model="line.text"
            placeholder="Phrase"
          />
          <button type="button" @click="removeItem('lines', index)" class="focus:outline-none">&times;</button>
        </div>
        <button type="button" @click="addItem('lines')" class="bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white rounded-2xl mb-3">
          + Ajouter
        </button>
      </div>
      <div class="mb-6">
        <label for="faits" class="block mb-2 text-sm font-medium text-gray-900">Pièces jointes :</label>
        <div v-for="(piece, index) in localFormData.pieces" :key="index" class="flex items-center gap-2 mb-2">
          <input
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-model="localFormData.pieces[index]"
            placeholder="URL vers la pièce jointe"
            @input="updateItem('pieces', index, piece)"
          />
          <button type="button" @click="removeItem('pieces', index)">&times;</button>
        </div>
        <button type="button" @click="addItem('pieces')" class="bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white rounded-2xl mb-3">+ Ajouter</button>
      </div>
    </div>
  </form>
</template>
