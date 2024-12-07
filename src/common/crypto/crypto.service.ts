// crypto.service.ts
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  private readonly saltLength = 16;  // Length of the salt in bytes
  private readonly hashAlgorithm = 'sha256';  // Hash algorithm (can be changed)
  private readonly iterations = 100000; // Number of iterations for PBKDF2
  private readonly keyLength = 64; // Length of the derived key

  // Generate a hash from a plain password
  async hashPassword(plainPassword: string): Promise<string> {
    // Generate a random salt
    const salt = crypto.randomBytes(this.saltLength).toString('hex');

    // Use PBKDF2 to hash the password with the salt
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(plainPassword, salt, this.iterations, this.keyLength, this.hashAlgorithm, (err, derivedKey) => {
        if (err) reject(err);
        resolve(`${salt}:${derivedKey.toString('hex')}`);
      });
    });

    return hashedPassword;  // Format: salt:hash
  }

  // Verify if the plain password matches the hash
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const [salt, storedHash] = hashedPassword.split(':');

    // Use PBKDF2 to hash the input password with the same salt
    const hashedInputPassword = await new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(plainPassword, salt, this.iterations, this.keyLength, this.hashAlgorithm, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });

    // Compare the newly generated hash with the stored hash
    return storedHash === hashedInputPassword;
  }
}
