export function getGrades() {
  return [
    'Policier Adjoint',
    'Gardien de la Paix Stagiaire',
    'Gardien de la Paix',
    'Sous-Brigadier',
    'Brigadier',
    'Brigadier-Chef',
    'Major',
    'Major Exceptionnel',
    'Élève-Lieutenant',
    'Lieutenant-Stagiaire',
    'Lieutenant',
    'Capitaine',
    'Commandant',
    'Commandant Divisionnaire',
    'Élève-Commissaire',
    'Commissaire de police',
    'Commissaire Divisionnaire',
    'Commissaire Général',
  ];
}

export function getQualifications() {
  return [
    { index: 'APJA', label: 'AGENT DE POLICE JUDICIAIRE ADJOINT' },
    { index: 'APJ', label: 'AGENT DE POLICE JUDICIAIRE' },
    { index: 'OPJ', label: 'OFFICIER DE POLICE JUDICIAIRE' },
  ];
}

export function getLinesType() {
  return [
    { index: 1, label: 'Personnalisé' },
    { index: 2, label: 'Contrôle d\'identité' },
    { index: 3, label: 'Contrôle d\'identité - Résultat' },
    { index: 4, label: 'Palpation' },
    { index: 5, label: 'Palpation - Résultat' },
    { index: 6, label: 'SIV' },
    { index: 7, label: 'SIV - Résultat' },
    { index: 8, label: 'Menottage' },
    { index: 9, label: 'Transport Ciat' },
    { index: 10, label: 'Fouille' },
    { index: 11, label: 'Fouille de véhicule' },
    { index: 12, label: 'Fouille - Résultat' },
    { index: 13, label: 'Lecture des droits' },
    { index: 14, label: 'Droits' },
  ];
}
