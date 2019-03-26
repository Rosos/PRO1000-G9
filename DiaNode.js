// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');

// inititierer database sammenkobling
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'ws://chatbot-prototype-c2ec1.firebaseio.com',
});
const db = admin.firestore();
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  




  function ordre (agent) {
    // Skaffer her byen som blir skrevet inn og legger den i const By.
    
    const fornavn = agent.parameters.fornavn;
    const etternavn = agent.parameters.etternavn;
    const nummer = agent.parameters.nummer;
                    
    
    
      return db.runTransaction(t => {


      var addDoc = db.collection('users').add({

          Fornavn: fornavn,
          Etternavn: etternavn,
          Nummer: nummer,
      });
        
        



      // Returnerer at det var suksessfullt
      
    }).then(doc => {
      // Sender så til chatboten 'Takk'
      agent.add(`You are now registered with the number ${nummer} #registrert`);
        
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
      agent.add(`You are now registered with the number ${nummer} #registrert`);
        
      return Promise.resolve('Write complete');
      });
  
  
  
  }


  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Bestilling', ordre);
  
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
