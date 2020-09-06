const formulariocontactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecuta
    formulariocontactos.addEventListener('submit', leerFormulario);
    // Listener para eliminar el boton
    if (listadoContactos) {
        listadoContactos.addEventListener('click', eliminarContacto);
    }
}

//Se agrega una e como parametro para eliminar la accion por default
function leerFormulario(e) {
    e.preventDefault();

    //Leer los datos de los inputs
    const nombre = document.querySelector("#nombre").value,
        empresa = document.querySelector("#empresa").value,
        telefono = document.querySelector("#telefono").value,
        accion = document.querySelector('#accion').value;


    //Validar que los campos no esten vacios
    if (nombre === "" || empresa === "" || telefono === "") {
        mostrarNotificacion('Todos los mensajes son obligatorios', 'error');
    } else {
        //Pasa la validacon, crear llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if (accion === 'crear') {
            // crearemos un nuevo contacto
            insertarBD(infoContacto);
        } else {
            // editar el contacto
            // leer el Id
            const idRegistro = document.querySelector('#id').value;
            infoContacto.append('id', idRegistro);
            actualizarRegistro(infoContacto);
        }

    }
}

/** Inserta en la base de datos via Ajax */
function insertarBD(infoContacto) {
    // llamado a ajax

    // crear el objeto
    const xhr = new XMLHttpRequest();

    // abrir la conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);


    // pasar los datos
    xhr.onload = function() {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //Leemos la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            //Para acceder a un elemento en especifico del jason
            //console.log(respuesta.empresa)

            // Inserta un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                 <td>${respuesta.datos.nombre}</td>
                 <td>${respuesta.datos.empresa}</td>
                 <td>${respuesta.datos.telefono}</td>
            `;

            // crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            // crear el icono de Editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            // crea el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            // agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            // crear el icono de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            // crear el boton de eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            // agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);

            // Agregarlo al tr
            nuevoContacto.appendChild(contenedorAcciones);

            // agregarlo con los contactos
            listadoContactos.appendChild(nuevoContacto);

            // Resetear el formulario
            document.querySelector('form').reset();

            // Mostrar la notificacion
            mostrarNotificacion('Contacto Creado Correctamente', 'correcto');

        }
    }

    // enviar los datos
    xhr.send(infoContacto)
}

function actualizarRegistro(datos) {
    //console.log(...datos);

    //Crear objeto
    const xhr = new XMLHttpRequest();

    //Abrir conexion
    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    //Leer la conexion
    xhr.onload = function() {
            if (this.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);
                //console.log(respuesta);
                if (respuesta.respuesta === 'correcto') {
                    // mostrar notificación de Correcto
                    mostrarNotificacion('Contacto Editado Correctamente', 'correcto');
                } else {
                    // hubo un error
                    mostrarNotificacion('Hubo un error...', 'error');
                }
                // Después de 3 segundos redireccionar
                setTimeout(() => {
                    window.location.href = 'index.php';
                }, 4000)
            }
        }
        //Enviar la peticion
    xhr.send(datos);



}


function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        // tomar el ID
        const id = e.target.parentElement.getAttribute('data-id');

        //Preguntar al usuario
        //console.log(id);
        const respuesta = confirm('¿Estas seguro(a) de eliminar el contacto?');

        if (respuesta) {
            // llamado a ajax
            // crear el objeto
            const xhr = new XMLHttpRequest();

            // abrir la conexión
            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            // leer la respuesta
            xhr.onload = function() {
                    if (this.status === 200) {
                        const resultado = JSON.parse(xhr.responseText);
                        console.log(resultado);

                        if (resultado.respuesta == 'correcto') {
                            // Eliminar el registro del DOM
                            console.log(e.target.parentElement.parentElement.parentElement);
                            e.target.parentElement.parentElement.parentElement.remove();

                            // mostrar Notificación
                            mostrarNotificacion('Contacto eliminado', 'correcto');
                        }
                    }
                }
                //enviar  la peticion
            xhr.send();
        }
    }
}


//Notaficacion el parametro clase es para agregarla ya sea si es exitoso o es error y la funcion sea mas versatil
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement("div");
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //Formulario contacto
    formulariocontactos.insertBefore(notificacion, document.querySelector("form legend"));

    //ocultar y mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500)
        }, 3000);
    }, 100)
}