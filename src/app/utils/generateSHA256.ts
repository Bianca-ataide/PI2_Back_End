import CryptoJS from "crypto-js";

export const generateSHA256 = (string: string) => {
    const hash = CryptoJS.SHA256(string).toString(CryptoJS.enc.Base64);

    return hash;
}