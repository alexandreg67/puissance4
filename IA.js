let IA = {
    choixColonne(){
        let tabColonne = this.getTableauCellulesPossibles();
        let meilleurColonne = 0;
        let tabMeilleurColonne = [0]
        
        for (let i = 1; i < tabColonne.length; i++) {
            if (tabColonne[i] > tabColonne[meilleurColonne]) {
                meilleurColonne = i;
                tabMeilleurColonne = new Array();
                tabMeilleurColonne.push(i);
            } else if (tabColonne[i] === tabColonne[meilleurColonne]) {
                tabMeilleurColonne.push(i)
            }
            
        }

        return tabMeilleurColonne[Math.floor(Math.random() * tabMeilleurColonne.length)];
    },

    getTableauCellulesPossibles : function(){
        let tabColonne = [];
    for (let i = 0; i < jeu.nbColonne; i++) {
        tabColonne.push(this.getPoidsCellule(jeu.retournerLigneCaseVideColonne(i), i));
    }

    return tabColonne;
    },

    getPoidsCellule : function(ligne, colonne){
        if (ligne === -1) return 0 // la colonne est pleine --> le poids à renvoyer sera de 0 
        if (this.verifGagner(ligne, colonne, 2)) return 100;
        if (this.verifGagner(ligne, colonne, 1)) return 99; 
        
        if (this.coupPerdant(ligne, colonne, 2)) return 0;
        
        let poids = 0;
        if (this.positionDefensive(ligne, colonne, 1)) poids += 20;
        if (this.positionDefensive(ligne, colonne, 2)) poids += 20; // Attaque
        poids += this.getPoidsBase(ligne, colonne);
            
        return poids;
    },

    positionDefensive : function(ligne, colonne, joueur){
        let cpt = 1;

        if (jeu.puissance4[ligne][colonne+1] === joueur) {
            cpt ++;
            if (jeu.puissance4[ligne][colonne+2] === joueur && jeu.puissance4[ligne][colonne+3] === 0) cpt ++;
        }       

        if (jeu.puissance4[ligne][colonne-1] === joueur) {
            cpt ++;
            if (jeu.puissance4[ligne][colonne-2] === joueur && jeu.puissance4[ligne][colonne-3] === 0) cpt ++;
        }            
        
        if (cpt > 2) return true;
    },

    getPoidsBase : function(ligne, colonne){
        let poidsLigne = 0;
        let poidsColonne = 0;
        switch (ligne) {
            case 0 : poidsLigne = 1;                
                break;
            case 1 : poidsLigne = 2;                
                break;
            case 2 : poidsLigne = 3;                
                break;
            case 3 : poidsLigne = 4;                
                break;
            case 4 : poidsLigne = 3;                
                break;
            case 5 : poidsLigne = 2;                
                break;        
            default:
                break;
        }
        switch (colonne) {
            case 0 : poidsColonne = 1;                
                break;
            case 1 : poidsColonne = 2;                
                break;
            case 2 : poidsColonne = 3;                
                break;
            case 3 : poidsColonne = 3;                
                break;
            case 4 : poidsColonne = 3;                
                break;
            case 5 : poidsColonne = 2;                
                break;        
            case 6 : poidsColonne = 1;                
                break;        
            default:
                break;
        }
        return poidsColonne * poidsLigne
    },


    // verifier si on peut gagner (IA) --> on retourne un poids de 100
    // verifier si on peut perdre (le joueur 1 peut gagner) --> on retourne un poids de 99

    // autres cas
    // Eviter de faire un coup perdant
    // defendre (2 jetons adverse à coté --> le bloquer)
    // Attaquer (2 jetons de l'IA à coté)
    // Additionner les poids

    verifGagner : function(ligne, colonne, joueur) {
        if (this.verifGagnerLigne(ligne, colonne, joueur)) return true;
        if (this.verifGagnerColonne(ligne, colonne, joueur)) return true;       
        if (this.verifGagnerDiagonale(ligne, colonne, joueur)) return true;       
    },

    verifGagnerLigne : function(ligne, colonne, joueur) {
        let cpt = 1;
        if (jeu.puissance4[ligne][colonne+1] === joueur) {
            cpt++;
            if(jeu.puissance4[ligne][colonne+2] === joueur){
                cpt++;
                if (jeu.puissance4[ligne][colonne+3] === joueur) {
                    cpt++;
                }
            }
        }
        if (jeu.puissance4[ligne][colonne-1] === joueur) {
            cpt++;
            if(jeu.puissance4[ligne][colonne-2] === joueur){
                cpt++;
                if (jeu.puissance4[ligne][colonne-3] === joueur) {
                    cpt++;
                }
            }
        }
        if(cpt>3) return true;
    },

    verifGagnerColonne : function(ligne, colonne, joueur) {
        let cpt = 1;
        if (ligne < 3) {
            if (jeu.puissance4[ligne+1][colonne] === joueur) {
                cpt++;
                if (jeu.puissance4[ligne+2][colonne] === joueur) {
                    cpt++;
                    if (jeu.puissance4[ligne+3][colonne] === joueur) {
                        cpt++;
                    }
                }
            }
        }

        if(cpt>3) return true;
    },

    verifGagnerDiagonale : function(ligne, colonne, joueur) {
        let cpt=1;
        if ( (ligne-1 >=0) && (colonne+1 <= jeu.nbColonne) && jeu.puissance4[ligne-1][colonne+1] === joueur) {
            cpt++;
            if ( (ligne-2 >=0) && (colonne+2 <= jeu.nbColonne) && jeu.puissance4[ligne-2][colonne+2] === joueur) {
                cpt++;
                if ( (ligne-3 >=0) && (colonne+3 <= jeu.nbColonne) && jeu.puissance4[ligne-3][colonne+3] === joueur) {
                    cpt++;
                }
            }
        }

        if ( (ligne+1 <jeu.nbLigne) && (colonne-1 >= 0) && jeu.puissance4[ligne+1][colonne-1] === joueur) {
            cpt++;
            if ( (ligne+2 <jeu.nbLigne) && (colonne-2 >= 0) && jeu.puissance4[ligne+2][colonne-2] === joueur) {
                cpt++;
                if ( (ligne+3 <jeu.nbLigne) && (colonne-3 >= 0) && jeu.puissance4[ligne+3][colonne-3] === joueur) {
                    cpt++;
                }
            }
        }

        if(cpt>3) return true;

        cpt=1;
        if ( (ligne-1 >=0) && (colonne-1 >= 0) && jeu.puissance4[ligne-1][colonne-1] === joueur) {
            cpt++;
            if ( (ligne-2 >=0) && (colonne-2 >= 0) && jeu.puissance4[ligne-2][colonne-2] === joueur) {
                cpt++;
                if ( (ligne-3 >=0) && (colonne-3 >= 0) && jeu.puissance4[ligne-3][colonne-3] === joueur) {
                    cpt++;
                }
            }
        }

        if ( (ligne+1 <jeu.nbLigne) && (colonne+1 <= jeu.nbColonne) && jeu.puissance4[ligne+1][colonne+1] === joueur) {
            cpt++;
            if ( (ligne+2 <jeu.nbLigne) && (colonne+2 <= jeu.nbColonne) && jeu.puissance4[ligne+2][colonne+2] === joueur) {
                cpt++;
                if ( (ligne+3 <jeu.nbLigne) && (colonne+3 <= jeu.nbColonne) && jeu.puissance4[ligne+3][colonne+3] === joueur) {
                    cpt++;
                }
            }
        }

        if(cpt>3) return true;

    },

    coupPerdant : function(ligne, colonne, joueur){
        if (ligne-1 === 0) {
            if(this.verifGagner(ligne-1, colonne, 1)) return true;
        }
    }


}


