//* IMPORTANDO MÓDULOS
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const axios = require("axios").default;



/*
// * Primer flow (flujo) conversacional
// ?Todos los floujos deben comenzar con la funcion addKeyword
// const flowSaludo = addKeyword(["hola","buenas","hey"],
//     {
//         sensitive: false,
//     }
// ).addAnswer("Hola, gracias por su preferencia. Bienvenido. 😊🤝");
// const flowDespedida = addKeyword(["adios", "bye", "chao"]).addAnswer("Hasta luego, bonito día.")



// * Eventos
// Disparar mensaje sin importar lo que diga el texto del mensaje. Dispara también si el mensaje es una nota de voz, ubicación, documento, imagen, etc.
// const flowBienvenida = addKeyword(EVENTS.WELCOME).addAnswer("Hola! Bienvenido a Marc7Commerce 🤝");
// const flowNotaVoz = addKeyword(EVENTS.VOICE_NOTE).addAnswer("Te escucho en un momento 👂");
// const flowUbicacion = addKeyword(EVENTS.LOCATION).addAnswer("Dirección recibida");
// const flowMedia = addKeyword(EVENTS.MEDIA).addAnswer("Imagen recibido");
// const flowDocumento = addKeyword(EVENTS.DOCUMENT).addAnswer("Documento recibido");
*/


/*
// * Enviar archivos multimedia
const flujoMultimedia = addKeyword("hola")
.addAnswer("Te envío una imagen",
    {
        media: "https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png",
    }
)
.addAnswer("Te envío un video", 
    {
        media: "https://www.youtube.com/watch?v=SCO3KDf8s6E&pp=ygUWbHVjZXMgZGUgbmF2aWRhZCByZW1peA%3D%3D"
    }
)
.addAnswer("Te envío un audio",
    {
        media: "http://www.sonidosmp3gratis.com/sounds/picadura-de-la-cobra-gay-graciosos-.mp3"
    }
)
.addAnswer("Te envío un pdf", 
    {
        media: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    }
);
*/

/* El método addAnswer puede concatenarse infinidad de veces, véase:
const flujoMultimedia = addKeyword("hola").addAnswer("Hey")
    .addAnswer("hola").addAnswer("cómo te va").addAnswer("a ti");
    */

/* El método addAnswer puede recibir 4 argumentos:
const flujo = addKeyword("hola").addAnswer(a, b, c, d); // Si queremos omitir un argumento, basta con usar "null", por ejemplo: .addAnswer("Hola!", null, c, d).

const a = Requerido: Recibe strings "hola" o array de strings ["hola", "que tal"]. Si se envía un array de string, el mensaje resultará en un string por línea, tomando el ejemplo, quedaría:
hola
que tal

const b =  Opcional: recibe un objeto con propiedades 
    {
        media: "url"
        delay: 1000 (milisegundos)
        capture: true (Si es true, el chatbot debe esperar a que el usuario responda)
        buttons: [
            {
                body: "cursos"
            },
            {
                body: "libros"
            },
            {
                body: "podcasts"
            },
        ] // Los botones dependen totalmente del proveedor que se esté usando. Se recomienda solo enviar solo 3 botones por temas de compatibilidad, si se necesitan enviar más botones es mejor concatenar.
    }

const c =  Opcional: recibe una función callback, por ejemplo:
const flujo = addKeyword("hola").addAnswer("Hola")
    .addAnswer("Bienvenido a mi tienda", null, 
    async () => {
        console.log("Aquí va la lógica de mi función");
    })
    .addAnswer("¿En qué puedo ayudarte?");

const d =  Recibe array de flujos hijos, estos flujos hijos se activan solo si algún flujo padre se ha activado ya, por ejemplo:

const flujoDespedida = addKeyword("bye").addAnswer("Hasta luego, cuídate!");
const flujoBienvenida = addKeyword("hola").addAnswer("Bienvenido a la tienda").
    addAnswer("¿Cómo puedo ayudarte?", null, null, [flujoDespedida]);
Si el usuario escribe "bye" después del "¿como puedo ayudarte?" entonces se activará el flujo secundario, el cual responderá el mensaje "Hasta luego, cuídate!".
*/


// !LOS BOTONES NO ESTÁN FUNCIONANDO CON PROVEEDORES GRATUITOS COMO BAILEYS, CON META Y TWILIO SI ESTAN FUNCIONADO!!!

/*
//! FLUJOS DINÁMICOS.
//Flujo hijo: Usaremos como argumento una función callback que hace uso de la librería axios, la cual conectará a la api de fakestore para hacer pruebas.
const flujoDeProductos = addKeyword("VER").addAnswer("Consultando base de datos... por favor espere un momento", null, 
    async (ctx, {flowDynamic}) => {
        let contador = 1;
        const respuesta = await axios("https://fakestoreapi.com/products");
        
        //Este For recorre la cantidad de veces que hay datos en "respuesta", que vendrían siendo 20 lo que nos arroja la api, pero indicamos que al llegar a 4 registros, detenga el ciclo.
        for (const item of respuesta.data){
            if (contador > 4) break;
            contador++;
            flowDynamic([{
                body:[item.title + "\n*$" + +item.price+"*"], 
                media:item.image
            }]);
        }
    }
);

const flujoInicial = addKeyword("hola").addAnswer("Bienvenido a mi e-commerce, escribe 'VER' para consultar items ", null, null, [flujoDeProductos]);

*/

/*
//! FLUJOS HIJOS
// *Los flujos hijos se declaran antes que el flujo padre
const flujoHumano = addKeyword("humano")
.addAnswer("Te echaremos un grito a la brevedad ;)");
const flujoMenu = addKeyword("menu").addAnswer("Estas son las especialidades de hoy 👩‍🍳 ")
.addAnswer([
    "*1.-* Pepperoni",
    "*2.-* Hawaiana",
    "*3.-* Mexicana",
    "*4.-* Al pastor"
    ],
    {capture: true},
    //Con fallBack entraremos en un bucle hasta que el usuario ingrese alguna opción válida.
    async(ctx, {fallBack}) => {
        //if (ctx.body !== "1" && ctx.body !== "2" && ctx.body !== "3" && ctx.body !== "4")
        if(!["1","2","3","4"].includes(ctx.body)){
            return fallBack("Opción no valida, por favor intente de nuevo");
        }
        console.log(`Pedido capturado: ${ctx.body}`);
    }
)
.addAnswer("Pedido capturado exitosamente");

//Flujo padre
const flujoPrincipal = addKeyword(["hola","buenas"])
.addAnswer([
    "*Bienvenido a KheBuenaPizza🍕🥤",
    "Échale un vistazo al menú del día 🧐"
])
.addAnswer([
    "Escribe *menu* para ver todas las opciones.",
    "Escribe *humano* para contactar contigo"
],
null,
null,
[flujoMenu, flujoHumano]
);
*/

//! CONECTANDO BOT CON DASHBOARD DE STRAPI

//* Función que guarda el ticket
// Este código se obtuvo desde Postman
const guardarTicket = async (datosEntrantes) => {

    let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api-aquee.strapidemo.com/api/tickets',
    headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer fc238507c127df8fc32688786a84ed5b448c63321c22128b060bd741cb26164cf4e7b95c880bb19bb13ec4b7be511d735b993c8a5d14620d64d8f5b717afd87ac99f5bfde7fc75e4813ab346dc9534aabe256b1f9cd9767fc802726a61b31ee31a191dce70be78167f39cd6e03a7b979ad1d1c7509ffe466a29002aad81c48a2'
    },
    data : JSON.stringify({
        data: datosEntrantes,
        })
    };

    return axios.request(config);

}


let GLOBAL_STATE = {}

const flujoPrincipal = addKeyword("hola")
    .addAnswer("*Bienvenido*")
    .addAnswer("_A continuación comenzaremos con tu pedido_")
    .addAnswer("¿Cuál es tu nombre?", {capture: true}, async (ctx, {endFlow}) => {
        //Añadir funcionalidad para cancelar el flujo si el usuario escribe "Cancelar"
        if (ctx.body === "Cancelar"){
            return endFlow();
        }
        //Este objeto nos crea los campos vacíos a modo de plantilla, y actualiza el primer campo "nombre_cliente".
        GLOBAL_STATE[ctx.from] = {
            "nombre_cliente": ctx.body,
            "description": "",
            "direccion": "",
            "promocion": ""
        }
    })
    .addAnswer("¿Dirección de envío?", {capture: true}, async (ctx, {endFlow}) => {
        if (ctx.body === "Cancelar"){
            return endFlow();
        }
        GLOBAL_STATE[ctx.from].direccion = ctx.body;
    })
    .addAnswer("Código promocional (opcional)", {capture: true}, async (ctx, {endFlow}) => {
        if (ctx.body === "Cancelar"){
            return endFlow();
        }
        GLOBAL_STATE[ctx.from].promocion = ctx.body;
    })
    .addAnswer("_Tu pedido se está procesando..._", null, async (ctx, {flowDynamic}) => {
        //Ejecutaremos la función guardarTicket que recibe como argumento los "datos entrantes" del usuario que se han ido coleccionando
        const respuestaStrapi = await guardarTicket(GLOBAL_STATE[ctx.from]);
        await flowDynamic(`Tu orden/ticket es: #${respuestaStrapi.data.data.id}`);
    });




//* MAIN
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterProvider = createProvider(BaileysProvider);
    // Flujos globales, se dispararán en cualquier contexto y momento de la conversación.
    const adapterFlow = createFlow([flujoPrincipal]);
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
    QRPortalWeb();
}

main();

/*
const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )
*/