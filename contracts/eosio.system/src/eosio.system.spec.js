var expect = require('chai').expect;


describe('Global eos', () => {
  it('is an object', () => {
    expect(eos).to.be.an('object');
  });

  // vscode内这段运行时会报错
  // it(`can get chain info and chainId is ${process.env.EOSIO_CHAIN_ID}`, async () => {
  //   const chainInfo = await eos.getInfo({});
  //   expect(chainInfo).to.be.an('object');
  //   expect(chainInfo.chain_id).to.equal(process.env.EOSIO_CHAIN_ID);
  // });

  //#region eosio-ubuntu
  it('can get account "eosio-ubuntu"', async () => {
    const eosioAccount = await eos.getAccount('eosio');
    expect(eosioAccount.account_name).to.equal('eosio');
    
    const chainInfo = await eos.getInfo({});
    console.log("head_block_num :"+chainInfo.head_block_num)

    //查余额
    eos.getCurrencyBalance({ code: "eosio.token", account: "eosio", symbol: "SYS" }).then(result => console.log("eosio的余额: "+result));
    //代币信息
    callback = (err, res) => { err ? console.error(err) : console.log(res) };
    eos.getCurrencyStats({code: "eosio.token", symbol: "SYS"}, callback);

    //获取智能合约代码
    // eos.getCode({ account_name: "eosio"}, callback)
    //获取智能合约ABI
    // eos.getAbi({ account_name: "eosio"}, callback)
    
    // 获取Table行数据 (某合约内某张数据表的某个key对应的value)
    eos.getTableRows({scope:"SYS", code:"eosio.token", table:"stat", json: true},callback)
    eos.getTableRows({scope:"eosio", code:"eosio.token", table:"accounts", json: true},callback)
  });
  //#endregion

  //#region eosio-eos studio
  // it('test-eos studio', async () => {
  //   const eosioAccount = await eos.getAccount('eosio');
  //   expect(eosioAccount.account_name).to.equal('eosio');
    
  //   const chainInfo = await eos.getInfo({});
  //   console.log("head_block_num :"+chainInfo.head_block_num)

  //   //查余额
  //   eos.getCurrencyBalance({ code: "eosio.token", account: "eosio", symbol: "ATC" }).then(result => console.log("eosio的余额: "+result));
  //   // eos.getCurrencyBalance({ code: "eosio.token", account: "eosio", symbol: "EOS" }).then(result => console.log("eosio的余额: "+result));
  //   //代币信息
  //   callback = (err, res) => { err ? console.error(err) : console.log(res) };
  //   eos.getCurrencyStats({code: "eosio.token", symbol: "ATC"}, callback);
  //   // eos.getCurrencyStats({code: "eosio.token", symbol: "EOS"}, callback);
    
  //   // 获取Table行数据 (某合约内某张数据表的某个key对应的value)
  //   eos.getTableRows({scope:"ATC", code:"eosio.token", table:"stat", json: true},callback)
  //   eos.getTableRows({scope:"eosio", code:"eosio.token", table:"accounts", json: true},callback)
  // });
  //#endregion

  callback = (err, res) => { err ? console.error(err) : console.log(res) };
  //投票
  it('test vote', async () => {
    options = {
      authorization: 'voter1@active',
      broadcast: true,
      sign: true
    }
    eos.voteproducer("voter1","",["bp1","hello"],options,callback)

  });

  //智能合约的执行
  // it('call hello contract', async () => {
  //   callback = (err, res) => { err ? console.error(err) : console.log(res) };

  //   eos.contract("hello").then(hello => {  //hello随便起的变量名
  //     hello.hi('axay', {                         //hi是方法名, 'axay'是该hello合约hi方法的参数
  //       authorization: ['eosio']        //建立该合约的用户
  //     }).then(result => {
  //         //console.log(result);
  //     });
  //   });
  // });

  //#region 转账交易
  // it('do transfer', async () => {
  //   callback = (err, res) => { err ? console.error(err) : console.log(res) };

  //   //转账交易 方法1
  //   options = {
  //     authorization: 'eosio@active',
  //     broadcast: true,
  //     sign: true
  //   }
  //   //eos.transfer('发送方帐号', '接收方帐号', '0.3000 DEV','memo', options, callback)
  //     eos.transfer('eosio', 'voter1', '0.3000 SYS','memo', options, callback)
      
  //     //转账交易 方法2
  //     eos.transaction(
  //       {
  //             // ...headers,
  //             actions: [
  //                 {
  //                     account: 'eosio.token',
  //                     name: 'transfer',
  //                     authorization: [{
  //                         actor: 'eosio',//发送方帐号
  //                         permission: 'active'
  //                     }],
  //                     data: {
  //                         from: 'eosio',//发送方帐号
  //                         to: 'voter1',//接收方帐号
  //                         quantity: '0.8888 SYS',
  //                         memo: '备注'
  //                     }
  //                 }
  //             ]
  //         }
  //         // options -- example: {broadcast: false}
  //     )

  //     eos.getCurrencyBalance({ code: "eosio.token", account: "voter1", symbol: "SYS" }).then(result => console.log("voter1的余额: "+result));

  //     //获取transaction交易细节 (查不到)
  //   // eos.getTransaction({id: "71b8b3b93b38182545a1f5adb6440b7e41cefaed127ed6478c1336a9a750b2fc"}, callback)
  // });
  //#endregion

//#region 创建普通账号 (有问题,创建的账号 资源无限的)
  // it('new account "voter"', async () => {
  //   creatoraccount = "eosio" //主账号
  //   newaccount = "hello" //新账号
  //   newaccount_pubkey = "EOS63gKbqNRZjboQyfXBJPijZHNr1GtXJu5eCan3e6iSqN7yP5nFZ" //新账号的公钥 
     
  //   //构建transaction对象
  //   eos.transaction(tr => {
  //       //新建账号
  //       tr.newaccount({
  //           creator: creatoraccount,
  //           name: newaccount,
  //           owner: newaccount_pubkey,
  //           active: newaccount_pubkey
  //       })
        
  //       //为新账号充值RAM
  //       tr.buyrambytes({
  //           payer: creatoraccount,
  //           receiver: newaccount,
  //           bytes: 8192
  //       })
     
  //       //为新账号抵押CPU和NET资源
  //       tr.delegatebw({
  //           from: creatoraccount,
  //           receiver: newaccount,
  //           stake_net_quantity: '1.0000 SYS',
  //           stake_cpu_quantity: '1.0000 SYS',
  //           transfer: 0
  //       })
  //   })
    
  //   获取账户信息
  //   const eosioAccount = await eos.getAccount(newaccount);
  //   expect(eosioAccount.account_name).to.equal(newaccount);
  //   // console.log(eosioAccount)
     
  // });
//#endregion

//#region 智能合约部署 (有问题,先不要用js来部署)
  // it('deploy system contract', async () => {
  //   fs = require('fs')
  //   wasm = fs.readFileSync(`./eosio.system.wasm`) //这个文件在客户端上，而不是在服务器上
  //   abi = fs.readFileSync(`./eosio.system.abi`)
    
  //   options = {
  //     authorization: 'eosio@active',
  //     broadcast: true,
  //     sign: true
  //   }

  //   mycode = await eos.setcode('eosio.system', 0, 0, wasm,options) // contract_name 为合约名
  //   myabi = await eos.setabi('eosio.system', JSON.parse(abi),options) // @returns {Promise}
  //   console.log(mycode)
  //   console.log(myabi)
  // });

  // it('deploy hello contract', async () => {
  //   fs = require('fs')
  //   wasm = fs.readFileSync(`D:/wcc/work/blockchain/cucubao/eosio.cdt/examples/hello/hello.wasm`) //这个文件在客户端上，而不是在服务器上
  //   abi = fs.readFileSync(`D:/wcc/work/blockchain/cucubao/eosio.cdt/examples/hello/hello.abi`)

  //   console.log("部署合约代码")
  //   mycode = await eos.setcode('hello', 0, 0, wasm) // contract_name 为合约名
  //   myabi = await eos.setabi('hello', JSON.parse(abi)) // @returns {Promise}
  //   console.log("code")
  //   console.log(mycode)
  //   console.log("abi")
  //   console.log(myabi)
  // });
  //#endregion

});