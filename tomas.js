var Client =require('bitcore-wallet-client');
var fs = require('fs');

var BWS_INSTANCE_URL='https://bws.bitpay.com/bws/api'
var secret=process.argv[2];
if(!secret){
    console.log('./tomas.js <Secret')
    process.exit(0);
}
    var client = new Client({
        baseUrl =BWS_INSTANCE_URL,
        verbose:false,
    });

    client.joinWallet(secret,"Tomas",{},function(err, wallet){
        if(err){
            console.log('error',err);
            return
        };
        console.log('Joined' + wallet.name+'!');
        fs.writeFileSync('tomas.dat',client.export());

        client.openWallet(function(err, ret){
            if(err){
                console.log('error',err);
                return
            };
            console.log('\n\n** Wallet info', ret);
            console.log('\n\nCreating first address:',ret);
            if(ret.wallet.status=="complete"){
                client.createAddress({},function(err,addr){
                    if(err){
                        console.log('error:',err);
                        return
                    };
                    console.log('\nReturn:',addr)
                });
            }
        });
    });
