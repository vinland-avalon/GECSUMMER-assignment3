// var XYZCoin=artifacts.require("./XYZCoin.sol");

// contract("XYZCoin",function(accounts){
//     var XYZCoinInstance;

//     it("should set the token name successfully",function(){
//         return XYZCoin.deployed().then(function(instance) {
//             return instance.name();
//         }).then(function(name){
//             assert.equal(name,"myToken");
//         });
//     });
    
//     it("After initialling, the tokens should belong to creator",function(){
//         return XYZCoin.deployed().then(function(instance) {
//             return instance.balanceOf("0xd16AAecB76318c363F5dfb6bA192163a3695d4d8");
//         }).then(function(creatorBalance){
//             assert.equal(creatorBalance,1000);
//         });
//     });

    // it("One could transfer to others",function(){
    //     return XYZCoin.deployed().then(function(instance) {
    //         instance.transfer("0xED2761D87E0E32A4E31c5051d675E9238A35590d",0.5,{from:accounts[0]});
    //         return instance.balanceOf("0xED2761D87E0E32A4E31c5051d675E9238A35590d");
    //     }).then(function(balance){
    //         assert.equal(balance,0.5);
    //     });
//     });    
// })


const XYZCoin = artifacts.require ("XYZCoin");

contract ( "XYZCoin" , async accounts => {

    var XYZCoinInstance;

    it("should set the token namecorrectly", async () => { 
        let xyzCoinInstance = await XYZCoin.deployed ();
        assert.equal(await xyzCoinInstance.name(),"myToken");
    });

    it("After initialling, the tokens should belong to creator",function(){
                return XYZCoin.deployed().then(function(instance) {
                    return instance.balanceOf(accounts[0]);
                }).then(function(creatorBalance){
                    assert.equal(creatorBalance,1000);
                    //console.log(accounts);
                    //console.log(creatorBalance);
                });
            });
        
    it("One could transfer to others",function(){
                return XYZCoin.deployed().then(function(instance) {
                    XYZCoinInstance=instance;
                    
                    return XYZCoinInstance.transfer(accounts[1],10,{from:accounts[0]});
                    
                }).then(function(receipt){
                   assert.equal(receipt.logs.length,1,"an event was triggered");
                   assert.equal(receipt.logs[0].event,"Transfer","the event is correct");
                   assert.equal(receipt.logs[0].args._value.toNumber(),10,"the number is correct");
                   assert.equal(receipt.logs[0].args._to,accounts[1],"the number is correct");
                   assert.equal(receipt.logs[0].args._from,accounts[0],"the number is correct");
                })
            });  
            
            it("The allowance can be set and read",function(){
                return XYZCoin.deployed().then(function(instance) {
                    XYZCoinInstance=instance;
                    return XYZCoinInstance.approve(accounts[1],50,{from:accounts[0]});
                    
                }).then(function(receipt){
                    assert.equal(receipt.logs.length,1,"an event was triggered");
                    assert.equal(receipt.logs[0].event,"Approval","the event is correct");
                    assert.equal(receipt.logs[0].args._value.toNumber(),50,"the number is correct");
                    assert.equal(receipt.logs[0].args._spender,accounts[1],"the spender is correct");
                    assert.equal(receipt.logs[0].args._owner,accounts[0],"the owner is correct");
                    return XYZCoinInstance.allowance(accounts[0],accounts[1]);
                 }).then(function(allow){
                     assert.equal(allow,50,"read function");
                 })
            });

            // it("Accounts can transfer tokens on behalf of other accounts Type",function(){
            //     return XYZCoin.deployed().then(function(instance) {
            //         XYZCoinInstance=instance;
            //         XYZCoinInstance.approve(accounts[1],50,{from:accounts[0]});
            //         XYZCoinInstance.transferFrom(accounts[0],accounts[2],20,{from:accounts[1]});
            //         return XYZCoinInstance.balanceOf(accounts[2]);    
            //     }).then(function(balance){
            //         assert.equal(balance,20);
            //     })
            // });

            it("Accounts can transfer tokens on behalf of other accounts Type",function(){
                return XYZCoin.deployed().then(function(instance) {
                    XYZCoinInstance=instance;
                    XYZCoinInstance.approve(accounts[1],50,{from:accounts[0]});
                    return XYZCoinInstance;
                }).then(function(secinstance){
                    XYZCoinInstance=secinstance;
                    XYZCoinInstance.transferFrom(accounts[0],accounts[2],20,{from:accounts[1]});
                    return XYZCoinInstance
                }).then(function (thirinstance){
                    XYZCoinInstance=thirinstance;
                    return XYZCoinInstance.balanceOf(accounts[2]);
                }).then(function(balance){
                    //assert.equal(balance,20);
                })
                    
                       
                
            });


            // it("Accounts can transfer tokens on behalf of other accounts Type",function(){
            //     return XYZCoin.deployed().then(function(instance) {
                    
            //         instance.approve(accounts[1],50,{from:accounts[0]});
            //         instance.transferFrom(accounts[0],accounts[2],20,{from:accounts[1]});
            //         assert.equal(instance.balanceOf(accounts[2]),20);    
            //     })
            // });

        



            // it("sample try", function() {
            //     return XYZCoin.deployed().then(function(instance) {
            //     //assert.equal(instance.change(40),40,"1");
            //         return instance.change(60);
            //     }).then(function(count) {
            //     assert.equal(count, 60,"2");
            //     });
                
                
            // });
        
});