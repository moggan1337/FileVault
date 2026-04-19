import * as fs from 'fs';
export class FileVault {
  encryptFile(src: string, dest: string, key: string) { console.log(`Encrypting ${src} to ${dest}`); }
  decryptFile(src: string, dest: string, key: string) { console.log(`Decrypting ${src} to ${dest}`); }
  secureDelete(path: string) { fs.unlinkSync(path); }
}
export default FileVault;
