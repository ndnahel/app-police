export function getFormattedTime() {
  const now = new Date();
  return now.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace(':', 'h');
}

export function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('fr-FR', options)
    .replace(/(\d+)\s(\S+)/, (_, day, month) => `${getDayInLetter(day)} ${month}`);
}

function getDayInLetter(day) {
  const days = ['premier', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf', 'vingt', 'vingt et un', 'vingt-deux', 'vingt-trois', 'vingt-quatre', 'vingt-cinq', 'vingt-six', 'vingt-sept', 'vingt-huit', 'vingt-neuf', 'trente', 'trente et un'];
  return days[day - 1];
}
