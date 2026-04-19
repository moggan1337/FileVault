# FileVault 🔐

[![npm version](https://img.shields.io/npm/v/filevault?style=flat-square)](https://www.npmjs.com/package/filevault)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](#)
[![Dependencies](https://img.shields.io/badge/dependencies-zero-success?style=flat-square)](#)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-%3C5KB-success?style=flat-square)](#)

> **Secure File Operations Made Simple** — A lightweight, zero-dependency TypeScript library for AES file encryption, decryption, and secure deletion.

FileVault provides a straightforward API for protecting sensitive files using industry-standard AES-256 encryption. Whether you need to encrypt documents, decrypt received files, or permanently delete sensitive data, FileVault makes it easy with a clean, promise-based interface.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
  - [Basic Encryption](#basic-encryption)
  - [Basic Decryption](#basic-decryption)
  - [Secure Delete](#secure-delete)
  - [Batch Operations](#batch-operations)
  - [Error Handling](#error-handling)
- [API Reference](#api-reference)
  - [FileVault Class](#filevault-class)
  - [Constructor Options](#constructor-options)
  - [Methods](#methods)
- [Security Details](#security-details)
- [Configuration](#configuration)
- [TypeScript Support](#typescript-support)
- [Best Practices](#best-practices)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 🔒 **AES File Encryption**
Secure your files using AES-256-CBC encryption. Protect sensitive documents, configuration files, credentials, and any data that needs to remain confidential.

- **AES-256-CBC** — Industry-standard encryption algorithm
- **PBKDF2 Key Derivation** — Secure key stretching for password-based encryption
- **Random IV Generation** — Each encryption operation uses a unique initialization vector
- **File Integrity** — HMAC-based authentication to detect tampering

### 🔓 **File Decryption**
Easily decrypt files that were encrypted with FileVault or compatible encryption tools.

- **Automatic IV Extraction** — IV is prepended to encrypted files for seamless decryption
- **Key Verification** — Validates the decryption key before processing
- **Streaming Support** — Efficient memory usage for large files

### 🗑️ **Secure Delete**
Permanently destroy sensitive files beyond forensic recovery.

- **Multi-pass Overwrite** — Overwrites file contents before deletion
- **Metadata Wiping** — Removes file metadata and attributes
- **Directory Entry Removal** — Ensures file cannot be located or recovered

### ✨ **Additional Features**

- **Zero Dependencies** — No external runtime dependencies for minimal attack surface
- **TypeScript First** — Full TypeScript support with comprehensive type definitions
- **ES Modules** — Modern ESM output for tree-shaking and bundler optimization
- **Promise-based API** — Clean async/await interface
- **Stream Support** — Process large files without memory issues
- **Cross-platform** — Works on Windows, macOS, and Linux

---

## Installation

### Prerequisites

- **Node.js** 18.0.0 or higher
- **npm** 8.0.0 or higher (or yarn/pnpm equivalent)

### Install via npm

```bash
npm install filevault
```

### Install via yarn

```bash
yarn add filevault
```

### Install via pnpm

```bash
pnpm add filevault
```

### Install from source

```bash
git clone https://github.com/your-username/filevault.git
cd filevault
npm install
npm run build
```

---

## Quick Start

```typescript
import { FileVault } from 'filevault';

// Initialize the vault with default settings
const vault = new FileVault();

// Define your encryption key (keep this secret!)
const encryptionKey = 'my-super-secret-password-123!';

// Encrypt a file
await vault.encryptFile('sensitive.txt', 'sensitive.enc', encryptionKey);

// Later, decrypt the file
await vault.decryptFile('sensitive.enc', 'sensitive_decrypted.txt', encryptionKey);

// When you're done, securely delete the original
await vault.secureDelete('sensitive.txt');
```

---

## Usage Examples

### Basic Encryption

Encrypt a single file using a password-based key:

```typescript
import { FileVault } from 'filevault';

async function encryptDocument() {
  const vault = new FileVault();
  
  try {
    // Encrypt the file
    await vault.encryptFile(
      'documents/contract.pdf',    // Source file
      'documents/contract.pdf.enc', // Encrypted output
      'strong-password-123!'        // Encryption key
    );
    
    console.log('File encrypted successfully!');
  } catch (error) {
    console.error('Encryption failed:', error.message);
  }
}

encryptDocument();
```

### Basic Decryption

Decrypt an encrypted file back to its original form:

```typescript
import { FileVault } from 'filevault';

async function decryptDocument() {
  const vault = new FileVault();
  
  try {
    // Decrypt the file
    await vault.decryptFile(
      'documents/contract.pdf.enc',    // Encrypted file
      'documents/contract_decrypted.pdf', // Decrypted output
      'strong-password-123!'             // Same key used for encryption
    );
    
    console.log('File decrypted successfully!');
  } catch (error) {
    console.error('Decryption failed:', error.message);
  }
}

decryptDocument();
```

### Secure Delete

Permanently delete a file beyond recovery:

```typescript
import { FileVault } from 'filevault';

async function securelyDeleteFile() {
  const vault = new FileVault();
  
  try {
    // Securely delete the file
    await vault.secureDelete('sensitive/passwords.txt');
    
    console.log('File securely deleted!');
  } catch (error) {
    console.error('Secure delete failed:', error.message);
  }
}

securelyDeleteFile();
```

### Batch Operations

Process multiple files in sequence:

```typescript
import { FileVault } from 'filevault';

async function batchEncrypt(files: string[], key: string) {
  const vault = new FileVault();
  const results = { success: [] as string[], failed: [] as string[] };
  
  for (const file of files) {
    try {
      const encryptedPath = `${file}.enc`;
      await vault.encryptFile(file, encryptedPath, key);
      results.success.push(file);
      console.log(`✓ Encrypted: ${file}`);
    } catch (error) {
      results.failed.push(file);
      console.error(`✗ Failed: ${file} - ${error.message}`);
    }
  }
  
  console.log(`\nCompleted: ${results.success.length} succeeded, ${results.failed.length} failed`);
  return results;
}

// Usage
const filesToEncrypt = [
  'data/financials.csv',
  'data/customers.json',
  'data/secrets.env'
];

batchEncrypt(filesToEncrypt, 'my-encryption-key');
```

### Error Handling

Robust error handling for production applications:

```typescript
import { FileVault } from 'filevault';

async function safeEncrypt(src: string, dest: string, key: string) {
  const vault = new FileVault();
  
  // Validate inputs
  if (!src || !dest || !key) {
    throw new Error('Source, destination, and key are required');
  }
  
  if (key.length < 8) {
    throw new Error('Encryption key must be at least 8 characters');
  }
  
  try {
    // Check if source file exists
    const fs = await import('fs');
    if (!fs.existsSync(src)) {
      throw new Error(`Source file not found: ${src}`);
    }
    
    await vault.encryptFile(src, dest, key);
    return { success: true, path: dest };
  } catch (error) {
    // Clean up partial output if exists
    try {
      const fs = await import('fs');
      fs.unlinkSync(dest);
    } catch {}
    
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
```

---

## API Reference

### FileVault Class

The main class for all file security operations.

```typescript
import { FileVault } from 'filevault';

const vault = new FileVault(options?: FileVaultOptions);
```

### Constructor Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `algorithm` | `string` | `'aes-256-cbc'` | Encryption algorithm to use |
| `keyLength` | `number` | `32` | Key length in bytes (256 bits) |
| `ivLength` | `number` | `16` | IV length in bytes (128 bits) |
| `iterations` | `number` | `100000` | PBKDF2 iterations for key derivation |
| `digest` | `string` | `'sha512'` | Hash algorithm for key derivation |
| `secureDeletePasses` | `number` | `3` | Number of overwrite passes for secure delete |

### Methods

#### `encryptFile(src, dest, key)`

Encrypts a file using AES-256-CBC encryption.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Path to the source file to encrypt |
| `dest` | `string` | Path where the encrypted file will be saved |
| `key` | `string` | Encryption key/password |

**Returns:** `Promise<void>`

**Example:**

```typescript
await vault.encryptFile('plain.txt', 'encrypted.enc', 'my-key');
```

---

#### `decryptFile(src, dest, key)`

Decrypts an encrypted file.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | `string` | Path to the encrypted file |
| `dest` | `string` | Path where the decrypted file will be saved |
| `key` | `string` | Decryption key (must match encryption key) |

**Returns:** `Promise<void>`

**Throws:** `Error` if the file cannot be decrypted (invalid key or corrupted data)

**Example:**

```typescript
await vault.decryptFile('encrypted.enc', 'decrypted.txt', 'my-key');
```

---

#### `secureDelete(path)`

Securely deletes a file, overwriting its contents before deletion.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | `string` | Path to the file to securely delete |

**Returns:** `Promise<void>`

**Security Note:** This method performs multiple overwrite passes with random data before deleting the file, making forensic recovery significantly more difficult.

**Example:**

```typescript
await vault.secureDelete('sensitive-file.txt');
```

---

## Security Details

### Encryption Algorithm

FileVault uses **AES-256-CBC** (Advanced Encryption Standard with 256-bit keys in Cipher Block Chaining mode), which is:

- **Approved by NIST** for classified information up to Top Secret
- **Resistant to all known practical attacks**
- **Widely audited and battle-tested**

### Key Derivation

Keys are derived using **PBKDF2** (Password-Based Key Derivation Function 2) with:

- **100,000 iterations** to slow brute-force attacks
- **SHA-512** as the pseudo-random function
- **Unique salt** per encryption operation

### File Format

Encrypted files contain:

```
[4 bytes]  Magic number "FVE\0"
[4 bytes]  Version number
[32 bytes] Salt
[16 bytes] Initialization Vector (IV)
[N bytes]  Encrypted data (AES-256-CBC)
[32 bytes] HMAC-SHA256 authentication tag
```

### Secure Delete

The secure delete implementation:

1. **Multi-pass overwrite** — Default 3 passes with cryptographically random data
2. **File truncation** — Reduces file size to 0 before deletion
3. **Sync operations** — Ensures data is flushed to disk
4. **Exception handling** — Handles read-only and locked files gracefully

---

## Configuration

### Custom Algorithm

```typescript
const vault = new FileVault({
  algorithm: 'aes-256-gcm'  // Use AES-GCM for additional authentication
});
```

### Increased Security

```typescript
const vault = new FileVault({
  iterations: 250000,         // More PBKDF2 iterations
  secureDeletePasses: 7       // More overwrite passes
});
```

### Custom Paths

```typescript
// Use absolute paths for clarity
import path from 'path';

const dataDir = path.resolve(process.cwd(), 'data');
const vault = new FileVault();

await vault.encryptFile(
  path.join(dataDir, 'input.txt'),
  path.join(dataDir, 'output.enc'),
  process.env.ENCRYPTION_KEY!
);
```

---

## TypeScript Support

FileVault is written in TypeScript and provides full type definitions out of the box.

### Import Styles

```typescript
// Named import (recommended)
import { FileVault } from 'filevault';

// Default import
import FileVault from 'filevault';
const vault = new FileVault();
```

### Type Definitions

```typescript
interface FileVaultOptions {
  algorithm?: string;
  keyLength?: number;
  ivLength?: number;
  iterations?: number;
  digest?: string;
  secureDeletePasses?: number;
}

interface EncryptResult {
  success: boolean;
  path?: string;
  error?: string;
}

interface DecryptResult {
  success: boolean;
  path?: string;
  error?: string;
}
```

---

## Best Practices

### Key Management

1. **Use strong keys** — Minimum 12 characters, mix of uppercase, lowercase, numbers, symbols
2. **Never hardcode keys** — Use environment variables or a secrets manager
3. **Rotate keys periodically** — Re-encrypt files with new keys regularly
4. **Backup keys securely** — Store encryption keys separately from encrypted data

```typescript
// Good: Use environment variable
const key = process.env.FILEVAULT_KEY!;
if (!key) throw new Error('Encryption key not configured');

// Better: Use a secrets manager
import { getSecret } from 'your-secrets-manager';
const key = await getSecret('filevault-production-key');
```

### File Handling

1. **Work in temporary directories** — Decrypt to temp, process, then re-encrypt or secure-delete
2. **Handle large files** — FileVault supports streaming for files that don't fit in memory
3. **Validate before processing** — Check file existence and permissions before operations

```typescript
import fs from 'fs';
import path from 'path';

async function processEncryptedFile(encPath: string, key: string) {
  const vault = new FileVault();
  const tmpDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'fv-'));
  const tmpPath = path.join(tmpDir, 'decrypted.tmp');
  
  try {
    await vault.decryptFile(encPath, tmpPath, key);
    // Process file...
    const data = fs.readFileSync(tmpPath);
    // ...
  } finally {
    await vault.secureDelete(tmpPath);
    fs.rmdirSync(tmpDir);
  }
}
```

### Error Handling

1. **Always wrap operations in try-catch** — Encryption/decryption can fail for many reasons
2. **Clean up on failure** — Delete partial output files if an operation fails
3. **Log securely** — Never log encryption keys or sensitive file contents

---

## FAQ

### Q: Can I encrypt files with FileVault and decrypt them with other tools?

**A:** FileVault uses a custom file format with a magic number header. For cross-tool compatibility, consider using standard OpenSSL format or PGP encryption instead.

### Q: What happens if I forget my encryption key?

**A:** Unfortunately, there is no way to recover data encrypted with FileVault if the key is lost. The encryption is designed to be computationally infeasible to break without the key.

### Q: Is FileVault suitable for compliance requirements (HIPAA, GDPR, etc.)?

**A:** FileVault uses strong encryption (AES-256) but is a general-purpose library. For specific compliance requirements, consult with your security team and legal counsel to ensure proper implementation and documentation.

### Q: How do I handle very large files?

**A:** FileVault uses streaming internally for large files to minimize memory usage. However, for extremely large files (>1GB), consider chunk-based encryption with parallel processing.

### Q: Can I use FileVault in a web browser?

**A:** FileVault is designed for Node.js and uses Node-specific APIs (`fs`, `crypto`). For browser use, consider Web Crypto API or libraries like `crypto-js`.

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/your-username/filevault.git
cd filevault
npm install
npm run build
npm test
```

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 FileVault Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  <strong>Made with 🔐 by developers, for developers</strong>
</p>
