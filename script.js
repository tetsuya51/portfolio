const menuHamburger = document.querySelector(".burgerList")
const navLinks = document.querySelector(".nav-links")

menuHamburger.addEventListener('click',()=>{
navLinks.classList.toggle('mobile-menu')
})

/*   Memory Game  */


/*      bouton recommencer 
function delet () {
    remove('reset')
}
*/

const divResultat = document.querySelector('.resultat');


let tabJeu = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];



let tabResultat = genereTableau();

let oldSelection = [] ;
let nbAffiche = 0;
let ready = true ;

afficherTableau();

function afficherTableau() {
    let txt = "";

    for (let i=0; i < tabJeu.length ; i++){
        txt += `<div id='line${i}'>`;
        for(let j = 0; j < tabJeu[i].length; j++){
            if(tabJeu[i][j] === 0) {
            txt += "<button id='responsiveBTN' class='btn btn-secondary m-2' onClick='verif(\""+i+"-"+j+"\")'>Click me</button>"
            } else {
                txt += "<img id='responsiveBTN2' src='"+getImage(tabJeu[i][j])+"' class='m-2'>";
            }
        }
        txt += "</div>"
    }
    divResultat.innerHTML = txt
}

function getImage(valeur) {
    let imgTxt ="";
    switch(valeur) {
        case 1 :
            imgTxt += "image/memory/as.png"
        break;
        case 2 :
            imgTxt += "image/memory/king.png"
        break;
        case 3 :
            imgTxt += "image/memory/queen.png"
        break;
        case 4 :
            imgTxt += "image/memory/valet.png"
        break;
        case 5 :
            imgTxt += "image/memory/kingPiq.png"
        break;
        case 6 :
            imgTxt += "image/memory/kingtrefle.png"
        break;
        case 7 :
            imgTxt += "image/memory/heart10.png"
        break;
        case 8 :
            imgTxt += "image/memory/diamonds09.png"
        break;
        default:
        console.log("error")
    }
    return imgTxt;
}

function verif(bouton) {
    if (ready) {
        nbAffiche++ ;
    let ligne = bouton.substr(0,1);
    let colonne = bouton.substr(2,1);
    
    tabJeu[ligne][colonne] = tabResultat[ligne][colonne];
    afficherTableau()
    
    if (nbAffiche > 1) {
        ready = false;
        setTimeout(() => {
            if(tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){
                tabJeu[ligne][colonne] = 0;
                tabJeu[oldSelection[0]][oldSelection[1]] = 0 ;
            }
            afficherTableau();
            ready = true;
            nbAffiche = 0;
            oldSelection = [ligne, colonne];
        },600)
    } else {
        oldSelection = [ligne, colonne];
    }
    }
}

function genereTableau() {
    let tab = [];
    let nbImage = [0,0,0,0,0,0,0,0];
    
    for (let i = 0 ; i < 4 ; i++){
        let ligne = [];
        for(let j = 0 ; j < 4 ; j++){
            let fin = false ;
            while (!fin) {
                let randomImage = Math.floor(Math.random() * 8);
                if(nbImage[randomImage] < 2) {
                    ligne.push(randomImage+1);
                    nbImage[randomImage]++;
                    fin = true;
                }
            }
        }
        tab.push(ligne);
    }

    return tab;
}

document.getElementById("reload").addEventListener(
    "click",
    function() {
        for (let i = 0; i < 4; i++) {
            const element = document.getElementById("line" + i)
            element.remove()
        }
        tabResultat = genereTableau();
        afficherTableau();
        oldSelection = [] ;
        nbAffiche = 0;
        ready = true ;
        tabJeu = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ];
    }
)