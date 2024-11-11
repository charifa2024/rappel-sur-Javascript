// Déclaration d'un objet contenant les réponses correctes pour chaque question
const correctAnswers = {
  q1: "Rabat",
  q2: "Portuguese",
  q3: "Paris",
  q4: "spanish",
};
// Fonction qui est appelée lors de la soumission du quiz
function submitQuiz() {
  let score = 0;  // Initialisation du score à 0
  // Parcours de chaque question pour vérifier les réponses
  for (let question in correctAnswers) {
      // Récupération de la réponse sélectionnée pour chaque question
      const selected = document.querySelector(`input[name="${question}"]:checked`);
      // Si une réponse est sélectionnée et elle correspond à la réponse correcte, incrémenter le score
      if (selected && selected.value === correctAnswers[question]) {
          score++;
      }
  }
  // Affichage du score final dans un élément avec l'ID "result"
  document.getElementById("result").innerText = `Your score is: ${score}/4`;
}
// Fonction pour lire à voix haute la question passée en argument
function readQuestion(question) {
  const utterance = new SpeechSynthesisUtterance(question);
  utterance.lang = 'en-US'; 
  speechSynthesis.speak(utterance);
}
// Fonction pour changer la couleur de fond de la page en fonction de la valeur sélectionnée
function changeBgColor() {
  document.body.style.backgroundColor = document.getElementById('bgColor').value;  // Appliquer la couleur sélectionnée
}
// Fonction pour changer la couleur du texte de la page en fonction de la valeur sélectionnée
function changeTextColor() {
  document.body.style.color = document.getElementById('textColor').value;  // Appliquer la couleur du texte
}
// Fonction pour changer la taille du texte de la page en fonction de la valeur saisie
function changeTextSize() {
  document.body.style.fontSize = `${document.getElementById('textSize').value}px`;  // Appliquer la taille du texte
}
