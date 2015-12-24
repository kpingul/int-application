var path = require('path');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var rootPath = path.normalize(__dirname + '/../../');
var fs = require('fs');

module.exports = (function () {
  return {
    development: {
      db: 'mongodb://iNeedTreez_Dev:RHEBZCtcIxWVvSNQVAenOyczJnAcgYmni.NmoYLLavk-@ds045087.mongolab.com:45087/iNeedTreez_Dev',
      //db:'mongodb://localhost:27017/iNeedTreez_Dev',
      port: process.env.PORT || 3030,
      rootPath: rootPath,
      azure: {
        storageAccount: 'ineedtreez',
        accessKey: 'QjSH10SpnUGU3kiIOsjAkjwGZQa89b3gO1AoZB+/zn/CA5Z2Lah5Kr2frtQwtPWJUwoW7mAcIDA1MTQi/nL9Ow==',
        container: 'dev'
      },
      token_ttl: 3600,
      twitter: {
        key: "GdJOsqYgAWvewBBUTk2tT73Qn",
        secret: "Tj9j0S4Q4VheNJFNVMkCcHGR4iZn4NsxSOspv3RFlCCfVGv3gz",
        callback: "http://127.0.0.1:3030/api/auth/twitter/callback"
      },
      facebook: {
        clientId: "406480956206264",
        secret: "17d03dca5cf5c2f206553592561083b7",
        callback: "http://127.0.0.1:3030/api/auth/facebook/callback"
      },
      sendgrid: {
        user: 'ineedtreez2',
        pass: 'limitless1',
        no_reply: 'no_reply@ineedtreez.com'
      },
      imageBase: "https://ineedtreez.blob.core.windows.net/dev/",
      stripe: {
        apiKey: "sk_test_KS6bIykE0EeNeATqgYYnMC8L",
        defaultPlan: 'int-premium-test',
        planData: {
          'int-starter-test': {
            name: 'Starter',
            price: 50
          },
          'int-premium-test': {
            name: 'Premium',
            price: 300
          },
          'int-ultimate-test': {
            name: 'Ultimate',
            price: 1000
          },
          'platinum': {
            name: 'Platinum',
            price: 10000
          }
        }
      }
    }
  };
})()[env];
