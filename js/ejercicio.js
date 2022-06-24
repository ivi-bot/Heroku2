let cargarDatos=() => {
    /*alert("Hola");*/
    fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
        .then(response => response.text())
        .then(data =>{
            const parser =new DOMParser();
            const xml = parser.parseFromString(data,"application/xml");
           /* console.log(xml); imprime*/
            let escritores = xml.getElementsByTagName('escritor');
           /* console.log(escritores); */
            for(let escritor of escritores){
                let id=escritor.getElementsByTagName('id')[0].textContent;
                let nombre=escritor.getElementsByTagName('nombre')[0].textContent;
                let plantilla = `<option value="${id}">${nombre}</option>`;
                document.querySelector('div.input-group > select').innerHTML += plantilla;
            }
        })
        .catch(console.error);

        
        let etiquetaSelect= document.querySelector('div.input-group > select');

        etiquetaSelect.addEventListener('change', (event) => {
            fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
                .then(response => response.json())
                .then(dataFrases => {
                    /* Id del select escogido*/
                    let id=event.target.value;
                    
                    /* Filtrado del json por id*/
                    var filtrado = dataFrases.frases.filter(d => d.id_autor == id);

                    /* Arreglo node para conseguir Nombre*/
                    let arregloOption=etiquetaSelect.querySelectorAll('select > option');
                    let filtroOption=Array.from(arregloOption).filter(d => d.value == id);
                    let nombre=filtroOption[0].textContent;

                    /* Limpiar div*/
                    document.getElementById('frases').innerHTML = "";

                    /* Filter devuelve arreglo de todo*/
                    for(let f of filtrado){
                        plantilla=`
                        <div class="col-lg-3">
                            <div class="test-inner ">
                                <div class="test-author-thumb d-flex">
                                    <div class="test-author-info">
                                        <h4>${nombre}</h4>                                            
                                    </div>
                                </div>
                                <span>${f.texto}</span>
                                <i class="fa fa-quote-right"></i>
                            </div>
                        </div>`;
                        document.getElementById('frases').innerHTML += plantilla;

                    }
                }).catch(console.error);
        
        });
}
window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
  });




