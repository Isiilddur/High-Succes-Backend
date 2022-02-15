const admin = require('firebase-admin')

const serviceAccount = require('./firebase-config.json')

const params = {
    type: serviceAccount.type,
    projectId: process.env.PROJECT_ID,
    privateKeyId: process.env.PRIVATE_KEY_ID,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
};

// Initialize Firebase
admin.initializeApp({
    credential : admin.credential.cert(params),
})

const database = admin.firestore()
module.exports = database;
