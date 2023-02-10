
var toolbox = {
   

    /*
     * Permet d'initialiser un tableau de tableau en fonction d'un nombre de ligne et de colonne passé en paramètre
     * @param {Number} nbLigne 
     * @param {Number} nbColonne 
     * @param {*} car 
     */
    initialiserTableauVide : function(nbLigne, nbColonne, car = ''){
        var tab = [];
        for(var i=0;i < nbLigne;i++){
            var ligne = [];
            for(var j=0;j < nbColonne; j++){
                ligne.push(car);
            }
            tab.push(ligne);
        }
        return tab;
    }
}
