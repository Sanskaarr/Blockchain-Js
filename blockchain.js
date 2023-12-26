const SHA256 = require('crypto-js/sha256');

class block{
    constructor(index,timestamp,data,previoushash=''){
        this.index = index; 
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculatehash();
    }

    calculatehash() {
    return SHA256(this.index+this.previoushash+this.timestamp+JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor() {
    this.chain=[this.creategenesisblock()];
    }

    creategenesisblock(){
        return new block(0,"date","GenesisBlock","0");
    }

    getLastestBlock(){
        return this.chain[this.chain.length -1];
    }

    adblock(newblock){
        newblock.previoushash= this.getLastestBlock().hash;
        newblock.hash=newblock.calculatehash();
        this.chain.push(newblock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++) {
            const currentblock = this.chain[i];
            const previousblock = this.chain[i - 1];
        
            if(currentblock.hash !== currentblock.calculatehash()){
                return false;
            }
            
            if(currentblock.previoushash !== previousblock.hash){
                return false;
            }
            return true;
        }
    }
}

let chain = new Blockchain();
chain.adblock(new block("1","8/09/2022","Hello, this is Second Block"));
chain.adblock(new block("2","9/09/2022","a.jpg"));
chain.adblock(new block("3","15/02/2023","Heya, Everyone this is febuary and we are in 2023 "));
console.log(JSON.stringify(chain, null,4));

console.log("Is BLockChain Valid ? : " + chain.isChainValid());
chain.chain[1].data = "Namaste !! This is Second Block!!!";
console.log("Is BLockChain Valid ? : " + chain.isChainValid());