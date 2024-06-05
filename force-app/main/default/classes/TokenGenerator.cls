public class TokenGenerator {
    public static String generateToken() {
        Blob cryptoBlob = Crypto.generateAesKey(128);
        return EncodingUtil.convertToHex(cryptoBlob);
    }
}