const socketCliente = io();

const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');


let user;

Swal.fire({
    title: "Bienvenido",
    text: "Ingrese su nombre de usuario:",
    input: "text",
    allowOutsideClick: false,
    inputValidator: (value) => {
        if (!value) {
            return 'Necesitas escribir un nombre de usuario';
        }
    },
}).then(result => {     //result contiene información sobre si se confirmó la ventana emergente o se canceló.
    user = result.value  // Contiene el valor ingresado por el usuario en el campo de texto de la ventana emergente
    socket.emit('authenticated', user);
})


sendButton.addEventListener('click', event =>{
    const message = messageInput.value.trim();
    console.log(message);
    if(message.length > 0){
        socket.emit('message', { user: user, message: message })
        messageInput.value = '';
    }
});

// const enviarMensaje = (e) => {

// 	e.preventDefault();
// 	const message = messageInput.value.trim();
//     console.log(message);

//     if(message.length > 0){
//         socket.emit('message', { user: user, message: message })
//         messageInput.value = '';
//     }
// };



socket.on('messageLogs', data => {
    if (!user) return;
    const messagesLog = document.getElementById('messages-log');
    let messages = "";
    data.forEach(message => {
        messages = messages + `${data.user} dice: ${data.message} </br>`
    })
    messagesLog.innerHTML = messages;
})

// socket.on('newUserConnected', user=>{
//     if (!user) return
//     Swal.fire({
//         toast: true,
//         position: "top-right",
//         text: "Nuevo usuario conectado",
//         title: `${user} se ha unido al chat`,
//         timer: 3000,
//         showConfirmButton: false
//     })
// })





// Swal.fire({
//     title: 'Bienvenido',
//     input: 'text',
//     inputLabel: 'ingrese su nombre de usuario',
//     showCancelButton: true, //mostrar boton de cancelar
//     showLoaderOnConfirm: true, //mostrar boton de confirmar
//     confirmButtonText: 'Ingresar', // texto del boton de confirmar 
//     //allowOutsideClick: false,   //click fuera del cuadro pára cerrar: false
//     allowOutsideClick: () => !Swal.isLoading()
//   }).then((result) => {    //Esta es una función que se ejecuta después de que se cierra la ventana emergente. result contiene información sobre si se confirmó la ventana emergente o se canceló.
//     if (result.isConfirmed) {   //Un booleano que indica si se confirmó la ventana emergente.
//         socket.emit('newUser', result.value);
//     }
//   })