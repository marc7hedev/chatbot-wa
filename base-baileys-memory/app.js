//* 1.- IMPORTANDO MÓDULOS
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// // Primer flow (flujo) conversacional
// const flowSaludo = addKeyword(["hola","buenas","hey"],
//     {
//         sensitive: false,
//     }
// ).addAnswer("Hola, gracias por su preferencia. Bienvenido. 😊🤝");

// const flowDespedida = addKeyword(["adios", "bye", "chao"]).addAnswer("Hasta luego, bonito día.")


// Esto es una prueba!!!!!!



// * Eventos
// Disparar mensaje sin importar lo que diga el texto del mensaje. Dispara también si el mensaje es una nota de voz, ubicación, documento, imagen, etc.
const flowBienvenida = addKeyword(EVENTS.WELCOME).addAnswer("Hola! Bienvenido a Marc7Commerce 🤝");
const flowNotaVoz = addKeyword(EVENTS.VOICE_NOTE).addAnswer("Te escucho en un momento 👂");
const flowUbicacion = addKeyword(EVENTS.LOCATION).addAnswer("Dirección recibida");
const flowMedia = addKeyword(EVENTS.MEDIA).addAnswer("Imagen recibido");
const flowDocumento = addKeyword(EVENTS.DOCUMENT).addAnswer("Documento recibido");



//* 2.- Definición de función principal main
const main = async () => {
    
    const adapterDB = new MockAdapter();
    
    const adapterProvider = createProvider(BaileysProvider);
    
    // Flujos globales, se dispararán en cualquier contexto y momento de la conversación.
    const adapterFlow = createFlow([flowBienvenida, flowNotaVoz, flowUbicacion, flowMedia, flowDocumento]);
    
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