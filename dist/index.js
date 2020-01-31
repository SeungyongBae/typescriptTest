"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const getBlockChain = () => blockChain;
const getLatestBlock = () => blockChain[blockChain.length - 1];
const getBlockHash = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const creatNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const nextTimestamp = getNewTimestamp();
    const nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimestamp, data);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    return newBlock;
};
const isBlockValid = (candidateBlock, preiviousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (preiviousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (preiviousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getBlockHash(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else
        return true;
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
const run = (aData) => {
    addBlock(creatNewBlock(aData));
};
const genesisBlock = new Block(0, "headHash", "", "first", 1580452900);
let blockChain = [genesisBlock];
run("second");
run("third");
console.log(getBlockChain());
console.log(getLatestBlock());
//# sourceMappingURL=index.js.map