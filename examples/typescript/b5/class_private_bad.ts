class Vault {
  private secret = "ts-private";
  #hidden = "hash-private";
}

const vault = new Vault();
console.log(vault.secret);
console.log(vault.hidden);
