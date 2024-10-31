// Import necessary libraries
const crypto = require('crypto');
const hash = require('./hash');
const params = require('./params');

class SPHINCSPlusKeyGen {
  constructor(securityLevel) {
    this.securityLevel = securityLevel;
    this.params = params.getParams(securityLevel);
  }

  generateKeypair() {
    const { n, k, w, l, d } = this.params;
    const sk = this.generateSecretKey(n, k, w, l, d);
    const pk = this.generatePublicKey(sk, n, k, w, l, d);
    return { sk, pk };
  }

  generateSecretKey(n, k, w, l, d) {
    const sk = new Array(n);
    for (let i = 0; i < n; i++) {
      sk[i] = this.generateRandomBytes(k);
    }
    return sk;
  }

  generatePublicKey(sk, n, k, w, l, d) {
    const pk = new Array(n);
    for (let i = 0; i < n; i++) {
      pk[i] = this.hash(sk[i], k, w, l, d);
    }
    return pk;
  }

  generateRandomBytes(length) {
    return crypto.randomBytes(length);
  }

  hash(message, k, w, l, d) {
    return hash.sha256(message, k, w, l, d);
  }
}

module.exports = SPHINCSPlusKeyGen;
