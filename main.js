// Sélection des éléments du DOM
const cells = document.querySelectorAll('[data-cell]'); // Sélection de toutes les cellules du jeu
const gameStatus = document.getElementById('gameStatus'); // Élément affichant l'état du jeu
const messageStatus = document.getElementById('messageStatusX'); // Élément affichant le message pour le joueur X
const messageStatus2 = document.getElementById('messageStatusO'); // Élément affichant le message pour le joueur O
const endGameStatus = document.getElementById('endGameStatus'); // Élément affichant l'état final du jeu

// Définition des symboles des joueurs
const playerOne = 'X'; // Symbole du joueur 1 (X)
const playerTwo = 'O'; // Symbole du joueur 2 (O)

// Variable indiquant le tour du joueur
let playerTurn = playerOne; // Par défaut, c'est le tour du joueur 1

// Tableau des combinaisons gagnantes
const winningPatterns = [
    [0, 1, 2], // Ligne 1
    [3, 4, 5], // Ligne 2
    [6, 7, 8], // Ligne 3
    [0, 3, 6], // Colonne 1
    [1, 4, 7], // Colonne 2
    [2, 5, 8], // Colonne 3
    [0, 4, 8], // Diagonale 1
    [2, 4, 6]  // Diagonale 2
];

// Ajout d'un événement sur chaque cellule du jeu
cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});

// Fonction appelée lorsqu'une cellule est cliquée
function playGame(e){
    e.target.innerHTML = playerTurn; // Affichage du symbole du joueur dans la cellule cliquée

    const winningIndices = checkWin(playerTurn); // Vérification si le joueur a gagné
    if (winningIndices) {
        // Si le joueur a gagné, ajoute la classe "winning-cell" aux cellules correspondantes pour les colorer en vert
        winningIndices.forEach(index => {
            cells[index].classList.add('winning-cell');
        });
        updateGameStatus("wins" + playerTurn); // Mise à jour de l'état du jeu avec le joueur gagnant
        return endGame(); // Fin du jeu
    } else if (checkDraw()) { // Vérification si c'est un match nul
        updateGameStatus("draw"); // Mise à jour de l'état du jeu avec un match nul
        return endGame(); // Fin du jeu
    }

    updateGameStatus(playerTurn); // Mise à jour de l'état du jeu avec le prochain joueur
    playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne; // Changement de tour entre les joueurs
}


// Vérifie si le joueur donné a gagné
/* Cette fonction recherche le pattern gagnant en parcourant le tableau winningPatterns. Pour chaque combinaison de
 winningPatterns, elle vérifie si toutes les cellules correspondantes contiennent le symbole du joueur playerTurn. Si 
 une combinaison gagnante est trouvée, la fonction renvoie les indices correspondants, sinon elle renvoie null.

Cela permet de déterminer si le joueur actuel a gagné en vérifiant si la fonction checkWin() renvoie un tableau d'indices, 
et si c'est le cas, les symboles correspondants seront colorés en vert dans la fonction playGame().*/

function checkWin(playerTurn){
    // Recherche du pattern gagnant
    const winningIndices = winningPatterns.find(combination => {
        // Vérification si toutes les cellules de la combinaison appartiennent au joueur
        return combination.every(index => {
            return cells[index].innerHTML === playerTurn;
        });
    });

    // Si un pattern gagnant est trouvé, renvoie les indices correspondants, sinon renvoie null
    return winningIndices ? winningIndices : null;
}



// Vérifie s'il y a un match nul
function checkDraw(){
    return [...cells].every(cell => {
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo; // Vérification si toutes les cellules sont remplies par les joueurs
    });
    }
    
    // Mise à jour de l'état du jeu
    function updateGameStatus(status){
    let statusText;
    let messageTurnX;
    let messageTurnO;

    switch (status) {
        case 'X':
            statusText = "Au tour du joueur 2 (O)";
            messageTurnX = "Patientez pendant que le joueur 2 joue..";
            messageTurnO = "A ton tour !";
            break;
        case 'O':
            statusText = "Au tour du joueur 1 (X)";
            messageTurnX = "A ton tour !";
            messageTurnO = "Patientez pendant que le joueur 1 joue..";
            break;
        case 'winsX':
            statusText = "Le joueur 1 (X) a gagné !";
            messageTurnX = "Gagné !";
            document.getElementById('player-1').style.background = "green";
            messageTurnO = "Perdu !";
            break;
        case 'winsO':
            statusText = "Le joueur 2 (O) a gagné !";
            messageTurnX = "Perdu !";
            messageTurnO = "Gagné !";
            document.getElementById('player-2').style.background = "green";
            break;
        case 'draw':
            statusText = "Égalité !";
            messageTurnX = "Égalité !";
            messageTurnO = "Égalité !";
            break;
    }
    
    gameStatus.innerHTML = statusText; // Mise à jour de l'état du jeu affiché
    messageStatus.innerHTML = messageTurnX; // Mise à jour du message pour le joueur X affiché
    messageStatus2.innerHTML = messageTurnO; // Mise à jour du message pour le joueur O affiché
    endGameStatus.innerHTML = statusText; // Mise à jour de l'état final du jeu affiché
}

// Fin du jeu
function endGame(){
document.getElementById('gameEnd').style.display = "flex"; // Affichage de l'écran de fin de jeu
}

// Recharge du jeu
function reloadGame(){
window.location.reload(); // Rechargement de la page pour recommencer le jeu
}    

    
