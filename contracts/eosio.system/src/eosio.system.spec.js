var expect = require('chai').expect;

describe('Global eos', () => {
  it('is an object', () => {
    expect(eos).to.be.an('object');
  });

  // it(`can get chain info and chainId is ${process.env.EOSIO_CHAIN_ID}`, async () => {
  //   const chainInfo = await eos.getInfo({});
  //   expect(chainInfo).to.be.an('object');
  //   expect(chainInfo.chain_id).to.equal(process.env.EOSIO_CHAIN_ID);
  // });

  it('can get account "eosio"', async () => {
    const eosioAccount = await eos.getAccount('eosio');
    expect(eosioAccount.account_name).to.equal('eosio');
    
    //查余额
    eos.getCurrencyBalance({ code: "eosio.token", account: "eosio", symbol: "ATC" }).then(result => console.log(result));
    eos.getCurrencyBalance({ code: "eosio.token", account: "eosio", symbol: "EOS" }).then(result => console.log(result));
    //代币信息
    callback = (err, res) => { err ? console.error(err) : console.log(res) };
    eos.getCurrencyStats({code: "eosio.token", symbol: "ATC"}, callback);
    eos.getCurrencyStats({code: "eosio.token", symbol: "EOS"}, callback);
  });

  it('new account "voter1"', async () => {
    creatoraccount = "eosio" //主账号
    newaccount = "voter1" //新账号
    newaccount_pubkey = "EOS63gKbqNRZjboQyfXBJPijZHNr1GtXJu5eCan3e6iSqN7yP5nFZ" //新账号的公钥 
     
    //构建transaction对象
    eos.transaction(tr => {
        //新建账号
        tr.newaccount({
            creator: creatoraccount,
            name: newaccount,
            owner: newaccount_pubkey,
            active: newaccount_pubkey
        })
        
        //为新账号充值RAM
        tr.buyrambytes({
            payer: creatoraccount,
            receiver: newaccount,
            bytes: 8192
        })
     
        //为新账号抵押CPU和NET资源
        tr.delegatebw({
            from: creatoraccount,
            receiver: newaccount,
            stake_net_quantity: '10 ATC',
            stake_cpu_quantity: '10 ATC',
            transfer: 0
        })
    })
    
    const eosioAccount = await eos.getAccount('voter1');
    expect(eosioAccount.account_name).to.equal('voter1');
     
  });
  

});