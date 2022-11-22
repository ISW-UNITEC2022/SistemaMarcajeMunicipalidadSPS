import nodemailer from 'nodemailer'

/* 
    Declaracion del transportador el cual utiliza los datos de autenticacion y la
    libreria con smtp para conectarse con el servidor de correo y hacer el puente
    para hacer el envio de correos.

    En nuestro caso, el servidor de correos sera gmail por ellos nuests host es
    smtp.gmail.com, el puerto es el puerto que utiliza la libreria para establecer 
    la conexion, y en nuestro caso los correos se enviaran con seguridad por lo que
    debemos indicar al transportador que aplique las medidas, y enviarle los datos
    de autenticacion.
*/
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
})

/*
    Permite verificar que la conexion con el transportador, usando las credeciales
    otorgadas es establecida con exito.
*/
transporter.verify().then(() => {
  console.log('Configuracion del transportador diseñada con exito.')
})

export default transporter;
