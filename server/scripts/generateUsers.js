const {secp256k1} = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const NUMBER_OF_USERS = 3;

function generateUsers(NUMBER_OF_USERS){
    for (let i = 1; i <= NUMBER_OF_USERS; i++){
        const privKey = secp256k1.utils.randomPrivateKey();
        const pubKey = secp256k1.getPublicKey(privKey);
        const ethAddress = getAddress(pubKey);
        console.log(`Private Key ${i} : `,toHex(privKey));
        console.log(`Public Key ${i}: `,toHex(pubKey));
        console.log(`Address ${i}: `, toHex(ethAddress));
        
    }
}

function getAddress(publicKey) {
    hash = keccak256(publicKey.slice(1));
    return hash.slice(12);
}

generateUsers(3)


// Private Key 1 :  10d5d6e12ffc1ef400e920634ab1e1702e86dbcb6ab4f25c0af1b549f97c81db
// Public Key 1:  02bcd94015bb7d21a5651a5b82d83b94eb0425559673699a111fcae9b9bed85517
// Address 1:  7bb382dd0bc0f67efd14088b7e9b6442b00c153a
// Private Key 2 :  d5b4acfb3fdbb977d2bb66d084c3c20bdc4da79ba5876b07cf691ccf05b14282
// Public Key 2:  02c8b295100339a76a70823ead8500232d9ff00e5627501c2cc076348fb43117f8
// Address 2:  f8d3eff57a44f86e61190724c823de0c28073828
// Private Key 3 :  9926a3e12b51ac590f6bd8bb4da8655346b9cd7748665eb610a4b1a6dcf01cce
// Public Key 3:  03e328c0695f092ff786e68b2bf14e1d88fa225412eff89e57d7683ef109413523
// Address 3:  c33cddff21d05f7ada70b988bf0004b7c00a2c78