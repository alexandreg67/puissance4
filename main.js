const tour = document.querySelector('#tour');
const alert = document.querySelector('.alert');
const messagej1 = document.querySelector("#j1");
const messagej2 = document.querySelector("#j2");
const imageJ2 = document.querySelector("#imageJoueur2");
const affichagePointJ1 = document.querySelector('#pointJ1');
const affichagePointJ2 = document.querySelector('#pointJ2');
const menu = document.querySelector("#menu");

let pointJ1 = 0;
let pointJ2 = 0;
let joueurEnCours = 1;
let finJeu = false;

let isIAon = false;


initialisationTableau();


// placeForTest(0);
// placeForTest(0);
// placeForTest(1);
// placeForTest(1);




function startIA(){
    isIAon = !isIAon;
    if (isIAon) {
        imageJ2.src='./images/icons8-homer-simpson-80.png';
        imageJ2.style.width='75%'
    } else {
        imageJ2.src='./images/MeditatingDoodle.png';
        imageJ2.style.width='100%';
    }
    
}

function jouer(colonne){
    jouerCase(colonne);
    if (isIAon) {
        colonneIA = IA.choixColonne();
        setTimeout(() => {
            jouerCase(colonneIA);
        }, 1000)
    }
}

function placeForTest(colonne){
    jouer(colonne);
}

/**
 * Fonction permettant à un joueur de jouer une case
 * Retourne true si le joueur a gagné
 */
function jouerCase(colonne){
    if(!finJeu){

        let ligneVide = jeu.retournerLigneCaseVideColonne(colonne);
        
        if (ligneVide !== -1) {
            jeu.jouerCase(joueurEnCours, ligneVide, colonne);
            jeu.afficherPuissance4();
            if(jeu.verificationFinJeu(joueurEnCours)) {
                gererFinJeu();
            }
        
            if (joueurEnCours === 1) {            
                joueurEnCours = 2;
                tour.innerHTML = "Tour du joueur 2"

            }else {
                joueurEnCours = 1;
                tour.innerHTML = "Tour du joueur 1"
    
    
            }
        }
    }

}



function initialisationTableau(){

    tour.innerHTML = "Tour du joueur 1";
    menu.style.background = "antiquewhite";
    
    alert.classList.add("d-none");
    finJeu = false;
    joueurEnCours = 1;

    jeu.initialisation();
    jeu.afficherPuissance4();

}

function gererFinJeu(){
    finJeu = true;
    let contentAlert = "✨ Partie terminée, le gagnant est le joueur : " + joueurEnCours + " ✨";
    contentAlert += '<button type="button" class="btn" onClick = initialisationTableau()>Recommencer</button>';
    alert.innerHTML = contentAlert;
    alert.classList.remove("d-none");
    menu.style.backgroundImage = "linear-gradient(to right, #a8ff78, #78FFD6)";
    
    
    if (joueurEnCours === 1){
        pointJ1++;
        affichagePointJ1.innerHTML = pointJ1
    }else {
        pointJ2++;
        affichagePointJ2.innerHTML = pointJ2
    }
  
    
}




