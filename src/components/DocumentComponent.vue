<script setup>
import { formatDate, getFormattedTime } from '../services/datetime.js'
import { copyDocument } from '@/services/utils.js'

const formattedDate = formatDate(new Date());
const formattedTime = getFormattedTime();
const props = defineProps({
  formData: Object
})
const phrases = {
  2: (text) => `--- <b>${text}</b> procède au contrôle d’identité conformément à l'article <u>78-2 du Code de Procédure Pénale</u>. ---`,
  3: (text) => `--- Identité ressortant au nom de <b>${text}</b>. ---`,
  4: (text) => `--- <b>${text}</b> effectue une palpation de sécurité conformément à l'article <u>R434-16 du Code de Sécurité Intérieure</u>. ---`,
  5: (text) => `--- La palpation ${text ? 'révélera ' + text : 'ne révélera rien'}. ---`,
  6: (text) => `--- Effectuons une SIV du véhicule immatriculé <b>${text}</b>. ---`,
  7: (text) => `--- Véhicule ressortant au nom de <b>${text}</b>. ---`,
  8: (text) => `--- Menottons l'individu à ${text} et plaçons l’individu en garde à vue conformément à l'article <u>803-6 du Code de Procédure Pénale</u>. ---`,
  9: () => `--- Transportons l'individu au Commissariat de Police afin d'effectuer les procédures. ---`,
  10: (text) => `--- <b>${text}</b> effectue la fouille de l'individu selon l'article <u>63-7 Code de procédure pénale</u>. ---`,
  11: (text) => `--- <b>${text}</b> effectue une fouille du véhicule conformément à l’article <u>78-2-2 du Code de Procédure Pénale</u>. ---`,
  12: (text) => `--- La fouille ${text ? 'révélera ' + text : 'ne révélera rien'}. ---`,
  13: (text) => `--- <b>${text}</b> procède à la lecture des droits de l'individu conformément à l'article <u>803-6 du Code de Procédure Pénale</u>. ---`,
  14: (text) => `--- L'individu ${text ? 'souhaite jouir des droits : ' + text : 'ne souhaite jouir d\'aucun droit'}. ---`,
};


function formattedNaissance() {
  if (!props.formData.naissance) return '';
  return new Date(props.formData.naissance).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
function formattedRedactors() {
  const names = props.formData.vacationPersons.map(person => `${person.name} <br>`);
  return [`${props.formData.name} <br>`, ...names].join('');
}
function formattedVacationPersons() {
  return props.formData.vacationPersons.map(person => `${person.grade} ${person.name}`).join(', ');
}
</script>

<template>
  <div class="preview max-w-[1080px] bg-white">
    <div class="document">
      <table class="w-full">
        <tbody>
        <tr>
          <td class="w-1/3 align-top border-r border-black text-center px-4">
            <div class="text-xxs font-bold">
              <p>REPUBLIQUE FRANCAISE MINISTERE DE L'INTERIEUR &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>DIRECTION CENTRAL DE LA POLICE NATIONALE &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>PRÉFECTURE DE POLICE DE PARIS &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>-------- &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>COMMISSARIAT DE PARIS &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>RUE DE LA SANTÉ &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>75000 PARIS &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>Tel : 01 75 01 01 01 &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>Fax : 01 75 01 01 02 &nbsp;&nbsp;&nbsp;&nbsp;</p>
              <p>Code INSEE : 75185 &nbsp;&nbsp;&nbsp;&nbsp;</p>
            </div>
            <br>
            <div>
              <p class="font-bold">P.V. : N°2024/ {{ formData.numberPvi }} <br>-------------</p>
            </div>
            <br><br>
            <div>
              <p class="underline font-bold block">AFFAIRE :</p>
              <br>
              <p class="font-bold">C/ {{ formData.individu }}</p>
              <p class="text-sm" v-if="formData.genre === 'Monsieur'">Né le {{ formattedNaissance() }}</p>
              <p class="text-sm" v-else-if="formData.genre === 'Madame'">Née le {{ formattedNaissance() }}</p>
              <br><br>
              <ul>
                <li v-for="fait in formData.faits" :key="fait">{{ fait }}</li>
              </ul>
            </div>
            <div>
              <br><br>
              <p class="font-bold">OBJET : <br> Saisine d'interpellation</p>
            </div>
          </td>
          <td class="w-2/3 align-top pl-4 text-sm">
            <h1 class="text-4xl font-black text-center pt-4">PROCÈS-VERBAL</h1>
            <br><br>
            <p>L'An Deux Mille vingt quatre,</p>
            <p>Le <b>{{ formattedDate }}</b> à {{ formattedTime }}</p>

            <div class="font-bold">
              <br>
              <br>
              <p>Nous :</p>
              <p>{{ formData.grade }}, {{ formData.name }}</p>
              <p>En fonction à la CSP PARIS.</p>
            </div>

            <div class="font-bold">
              <br><br>
              <p>{{ formData.qualification.label }} en résidence à PARIS ;</p>
              <br><br>
            </div>

            <div>
              <p>--- Agissant conformément aux instructions de M. MAUGRAY Eugène, Commissaire Général de Police, chef de la circonscription de Sécurité publique de Paris ---</p>
              <p>--- Étant de patrouille portée dans le secteur Paris 75. ---</p>
              <p v-if="formData.vacationPersons.length > 0">--- Assisté du {{ formattedVacationPersons() }} du service. ---</p>
              <p>--- Revêtus de nos uniformes et porteurs des insignes justificatifs de notre qualité. ---</p>
              <br><br>
            </div>

            <p>--- Étions de patrouille sur le secteur en {{ formData.vacation }} ---</p>
            <p v-for="line in formData.lines" :key="line">
              <span v-html="phrases[line.type] ? phrases[line.type](line.text) : `--- ${line.text} ---`"></span>
            </p>

            <div>
              <br><br>
              <p>--- Avisons des faits l'Officier de Police Judiciaire du service, qui nous demande la rédaction du présent. ---</p>
              <p>--- Dont procès-verbal que signent avec nous nos assistants. ---</p>
            </div>

            <div class="flex flex-wrap gap-3">
              <br>
              <img v-for="piece in formData.pieces" :key="piece" :src="piece" alt="Pièce jointe">
            </div>

            <div class="flex justify-between text-base">
              <div>
                <br>
                <p class="font-bold">Rédacteurs</p>
                <p style="font-family: 'Dancing Script', cursive;" v-html="formattedRedactors()"></p>
              </div>
              <div class="text-right">
                <br><br>
                <p class="font-bold">OPJ</p>
                <p style="font-family: 'Dancing Script', cursive;">{{ formData.opj }}</p>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <button @click="copyDocument" class="mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded-xl flex items-center gap-1">
      <i class="fa-solid fa-copy"></i> Copier le document
    </button>
  </div>
</template>

<style scoped>
.preview {
  padding: 20px;
  border: 1px solid #ccc;
  white-space: pre-wrap;
}

.document {
  font-family: 'Arial', sans-serif;
}

.text-xxs {
  font-size: 6pt !important;
}

li::before {
  content: "-";
  position: relative;
  left: -5px;
  top: 0;
}
</style>
