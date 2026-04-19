# FileVault 🔐

**Secure File Operations** - Encryption, secure delete.

## Features

- **🔒 Encrypt** - AES file encryption
- **🔓 Decrypt** - Decrypt files
- **🗑️ Secure Delete** - Irreversible deletion

## Installation

```bash
npm install filevault
```

## Usage

```typescript
import { FileVault } from 'filevault';

const vault = new FileVault();

// Encrypt file
await vault.encryptFile('data.txt', 'data.enc', 'my-key');

// Decrypt file
await vault.decryptFile('data.enc', 'data.txt', 'my-key');

// Secure delete
await vault.secureDelete('sensitive.dat');
```

## License

MIT
