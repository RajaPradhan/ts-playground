// import { PasswordManager } from './PasswordManager';

import { SignedUrlGenerator } from './SignedUrlGenerator';

// (async () => {
//     const passwordManager = new PasswordManager();

//     await passwordManager.toHash('myPassword');

//     console.log(await passwordManager.isValidPassowrd('myPassword'));
//     console.log(await passwordManager.isValidPassowrd('sndnsdnds'));
// })();

const url = 'https://www.xyz.com/cat.png';

const signedUrlGenerator = new SignedUrlGenerator({ secret: 'gsg2675' });
const signedUrl = signedUrlGenerator.sign(url);
console.log(signedUrlGenerator.verify(signedUrl));
