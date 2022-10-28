let formulario = document.querySelector('.formulario');

// Usaremos en esta los prototypes.

function DatosSeguro(nombre, year, seguro){
    this.nombre = nombre;
    this.year = year;
    this.seguro = seguro;
}


DatosSeguro.prototype.RenderizarDatos = function(){
     /**
     * Algoritmos para poder cotizar
     * 1 = Americano 1.15
     * 2 = Asiatico 1.05
     * 3 = Europeo 1.35
     */

    //El saldo del usuario.
    let cantidad;
    const costo = 2000; //precio base de auto...

    switch(this.nombre){
        case "Americano":
            cantidad = costo * 1.15;
            break;

        case "Asiatico":
            cantidad = costo * 1.05;
            break;

        case "Europeo":
            cantidad = costo * 1.35;
            break;

        default:
            break;
    }

    //Vamos a ir calculando dependiendo del YEAR. por cada diferencia
   // de year, le descontaremos un 3%
   let diferencia = new Date().getFullYear() - parseInt(this.year);
   
   cantidad -= (cantidad * (diferencia * 3) / 100);

   /**
     * Seguro Basico = cantidad * 30% -> 0.3
     * Seguro Completo = cantidad 50% -> 0.5
     */

   switch(this.seguro){
        case "Basico":
            cantidad = (cantidad * 30) / 100;
           
            break;

        case "Completo":
            cantidad = (cantidad * 50) / 100;
            break;

        default:
            break;
   } 

   let $resultado = document.querySelector(".resultado");
    let $contenedor_resultado = document.createElement('DIV');
    $contenedor_resultado.classList.add('resultado_contenedor');
   setTimeout(() => {
       $contenedor_resultado.innerHTML = `
            <h3 class="resultado_heading">Seguro De Auto</h3>
            <p>Tipo: <span>${this.nombre}</span></p>
            <p>Year: <span>${this.year}</span></p>
            <p>Tipo Seguro: <span>${this.seguro}</span></p>
            <p>Cotizacion: <span>$${cantidad}</span></p>
       `;

        $resultado.appendChild($contenedor_resultado);
   },5000);
}

// Generaremos diferentes prototypes.
function UI(){ }


UI.prototype.GenerarYear = () => {
    //Desde 2002 hasta el year actual

    let max = new Date().getFullYear();
    let min = max - 20; //2002
    
    const selectYear = document.querySelector('#Year');
    
    //Vamos a ir generando los year.
    for(let i=max; i >= min; i--){
        let opciones = document.createElement('option');
        
        opciones.value = i;
        opciones.textContent = i;

        selectYear.appendChild(opciones);
    }
}


UI.prototype.validandoCampos = () => {

    //Eliminamos nuestro cuadro informativo (si existe) cada vez que damos un click...
    let $eliminar = document.querySelector('.resultado_contenedor');
   
    //Marca...
    let marca = document.querySelector('.formulario .campo #Marca').value;
    
    //Year...
    let year = document.querySelector('.formulario .campo #Year').value;
    
    //Seguro...
    let tipoSeguro = document.querySelector('input[type="radio"]:checked').value;
    
    if(marca === "" || year === "" || tipoSeguro === ""){

         if($eliminar){
                $eliminar.remove();
          }
        MostrarAlerta("Revisa tu formulario. Campos vacios!", "error");

        return;
    }


    if($eliminar){
        $eliminar.remove();
    }

    MostrarAlerta("Cotizando...", "exito");

    let auto;

    switch(marca){
        case "1":
            auto = "Americano";
            break;

        case "2":
            auto = "Asiatico";
            break;

        case "3":
            auto = "Europeo";
            break;

        default:
            break;

    }

    let datos = new DatosSeguro(auto, year, tipoSeguro);
    datos.RenderizarDatos();

}



let ui = new UI();


document.addEventListener('DOMContentLoaded', () => {
    ui.GenerarYear();
});


LoadEventListener();
function LoadEventListener(){
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let objtDatos = ui.validandoCampos();
        
        
    })
}

function MostrarAlerta($mensaje, $tipo){

    let parrafo = document.createElement('P');
    const animacion = document.querySelector('div.load');

    if($tipo === "error"){
        parrafo.classList.add($tipo);
    }else{
        parrafo.classList.add($tipo);

        //Mostrar nuestra cargador animado...

        animacion.id = "";
    }

    parrafo.textContent = $mensaje;


    let $insertar = document.querySelectorAll(`.${$tipo}`);
    if($insertar.length === 0){
        formulario.insertBefore(parrafo, document.querySelector('input[type="submit"]'));
    }
   

    setTimeout(() => {
        parrafo.remove();

        if(animacion){
            animacion.id="hidden";
        }

    },4000);
}