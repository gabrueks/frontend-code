const ENCRYPT_KEY = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAtrIo+W0rI7vwX/oTP7xZ/F5/I/hbOR3ZizRK0NIHi/194VRF+3Bb
hNCtxGFNGD1GglCjR5vHjkE0enDoyB5kRgxI1doQiFUrsiGwuzA7ff6SW/5zndkT
f5QTbfPL1rKkPCpCaYYJ6dAOSTYSa4T3t1Y7Dl39+BlaoSo2AEif31H3C0hQPjY8
E75tLU9BoQUgksGBeI0Q6YPmy9AkpAngdT4hNiJpkj1xV33LUJI5lzQWYN5UP0EE
awKv6R2S466/9A2JRMiFc0flhDglNG4PVHtM6WSSxLRCt7MakWOxQEfKZ1XpdC71
MqkqEFXtQ/fGR1w2T0Xw4dEn5dC905vL1QIDAQAB
-----END RSA PUBLIC KEY-----`;

export default async function encrypt(data: string): Promise<string> {
    const crypto = await import("crypto").then((md) => md.default);
    const encryptedData = crypto.publicEncrypt(ENCRYPT_KEY, Buffer.from(data));
    return encryptedData.toString("base64");
}
