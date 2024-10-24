export function copyDocument() {
  const documentElement = document.querySelector('table');
  const range = document.createRange();
  range.selectNodeContents(documentElement);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);

  try {
    const successful = document.execCommand('copy');
    if (successful) {
      alert('Document copié avec succès !');
    } else {
      alert('La copie a échoué.');
    }
  } catch (err) {
    console.error('Erreur lors de la copie :', err);
  }
  selection.removeAllRanges();
}
