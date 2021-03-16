

// (function(){

    
// }());

const parar = document.getElementById('parar')
const iniciar = document.getElementById('iniciar')
const numeros = document.getElementById('numeros')
let num = 1;
let interval;

const actualizarNumero =  () => {
    var mili = new Date();
    var num = mili.getMilliseconds();
    // while( num < 200){
    //     num = num + 1; 
    //     numeros.textContent = num;
    //     if(num > 200){
    //         num = 1
    //     }
    // }
    
            numeros.textContent = num;
}

// actualizarNumero()
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

iniciar.addEventListener('click', ()=>{
        interval = setInterval(actualizarNumero, 10)
})

parar.addEventListener('click', ()=>{
        clearInterval(interval)
        var resp = getRandomInt(2,100)
        numeros.textContent = resp;
})
    
    