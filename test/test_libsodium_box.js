var assert = require('assert');
var sodium = require('../build/Release/sodium');

var expected1 = Buffer.from([
    0xf3,0xff,0xc7,0x70,0x3f,0x94,0x00,0xe5,
    0x2a,0x7d,0xfb,0x4b,0x3d,0x33,0x05,0xd9,
    0x8e,0x99,0x3b,0x9f,0x48,0x68,0x12,0x73,
    0xc2,0x96,0x50,0xba,0x32,0xfc,0x76,0xce,
    0x48,0x33,0x2e,0xa7,0x16,0x4d,0x96,0xa4,
    0x47,0x6f,0xb8,0xc5,0x31,0xa1,0x18,0x6a,
    0xc0,0xdf,0xc1,0x7c,0x98,0xdc,0xe8,0x7b,
    0x4d,0xa7,0xf0,0x11,0xec,0x48,0xc9,0x72,
    0x71,0xd2,0xc2,0x0f,0x9b,0x92,0x8f,0xe2,
    0x27,0x0d,0x6f,0xb8,0x63,0xd5,0x17,0x38,
    0xb4,0x8e,0xee,0xe3,0x14,0xa7,0xcc,0x8a,
    0xb9,0x32,0x16,0x45,0x48,0xe5,0x26,0xae,
    0x90,0x22,0x43,0x68,0x51,0x7a,0xcf,0xea,
    0xbd,0x6b,0xb3,0x73,0x2b,0xc0,0xe9,0xda,
    0x99,0x83,0x2b,0x61,0xca,0x01,0xb6,0xde,
    0x56,0x24,0x4a,0x9e,0x88,0xd5,0xf9,0xb3,
    0x79,0x73,0xf6,0x22,0xa4,0x3d,0x14,0xa6,
    0x59,0x9b,0x1f,0x65,0x4c,0xb4,0x5a,0x74,
    0xe3,0x55,0xa5
]);

var expected2 = Buffer.from([
    0xf3,0xff,0xc7,0x70,0x3f,0x94,0x00,0xe5,
    0x2a,0x7d,0xfb,0x4b,0x3d,0x33,0x05,0xd9,
    0x8e,0x99,0x3b,0x9f,0x48,0x68,0x12,0x73,
    0xc2,0x96,0x50,0xba,0x32,0xfc,0x76,0xce,
    0x48,0x33,0x2e,0xa7,0x16,0x4d,0x96,0xa4,
    0x47,0x6f,0xb8,0xc5,0x31,0xa1,0x18,0x6a,
    0xc0,0xdf,0xc1,0x7c,0x98,0xdc,0xe8,0x7b,
    0x4d,0xa7,0xf0,0x11,0xec,0x48,0xc9,0x72,
    0x71,0xd2,0xc2,0x0f,0x9b,0x92,0x8f,0xe2,
    0x27,0x0d,0x6f,0xb8,0x63,0xd5,0x17,0x38,
    0xb4,0x8e,0xee,0xe3,0x14,0xa7,0xcc,0x8a,
    0xb9,0x32,0x16,0x45,0x48,0xe5,0x26,0xae,
    0x90,0x22,0x43,0x68,0x51,0x7a,0xcf,0xea,
    0xbd,0x6b,0xb3,0x73,0x2b,0xc0,0xe9,0xda,
    0x99,0x83,0x2b,0x61,0xca,0x01,0xb6,0xde,
    0x56,0x24,0x4a,0x9e,0x88,0xd5,0xf9,0xb3,
    0x79,0x73,0xf6,0x22,0xa4,0x3d,0x14,0xa6,
    0x59,0x9b,0x1f,0x65,0x4c,0xb4,0x5a,0x74,
    0xe3,0x55,0xa5
]);

var alicesk = Buffer.from([
    0x77, 0x07, 0x6d, 0x0a, 0x73, 0x18, 0xa5, 0x7d, 0x3c, 0x16, 0xc1,
    0x72, 0x51, 0xb2, 0x66, 0x45, 0xdf, 0x4c, 0x2f, 0x87, 0xeb, 0xc0,
    0x99, 0x2a, 0xb1, 0x77, 0xfb, 0xa5, 0x1d, 0xb9, 0x2c, 0x2a
]);

var bobpk = Buffer.from([
    0xde, 0x9e, 0xdb, 0x7d, 0x7b, 0x7d, 0xc1, 0xb4, 0xd3, 0x5b, 0x61,
    0xc2, 0xec, 0xe4, 0x35, 0x37, 0x3f, 0x83, 0x43, 0xc8, 0x5b, 0x78,
    0x67, 0x4d, 0xad, 0xfc, 0x7e, 0x14, 0x6f, 0x88, 0x2b, 0x4f
]);

var small_order_p = Buffer.from([
    0xe0, 0xeb, 0x7a, 0x7c, 0x3b, 0x41, 0xb8, 0xae, 0x16, 0x56, 0xe3,
    0xfa, 0xf1, 0x9f, 0xc4, 0x6a, 0xda, 0x09, 0x8d, 0xeb, 0x9c, 0x32,
    0xb1, 0xfd, 0x86, 0x62, 0x05, 0x16, 0x5f, 0x49, 0xb8, 0x00
]);

var nonce = Buffer.from([
    0x69, 0x69, 0x6e, 0xe9, 0x55, 0xb6,
    0x2b, 0x73, 0xcd, 0x62, 0xbd, 0xa8,
    0x75, 0xfc, 0x73, 0xd6, 0x82, 0x19,
    0xe0, 0x03, 0x6b, 0x7a, 0x0b, 0x37 
]);

var m = Buffer.from([
    0xbe, 0x07, 0x5f, 0xc5,
    0x3c, 0x81, 0xf2, 0xd5, 0xcf, 0x14, 0x13, 0x16, 0xeb, 0xeb, 0x0c, 0x7b,
    0x52, 0x28, 0xc5, 0x2a, 0x4c, 0x62, 0xcb, 0xd4, 0x4b, 0x66, 0x84, 0x9b,
    0x64, 0x24, 0x4f, 0xfc, 0xe5, 0xec, 0xba, 0xaf, 0x33, 0xbd, 0x75, 0x1a,
    0x1a, 0xc7, 0x28, 0xd4, 0x5e, 0x6c, 0x61, 0x29, 0x6c, 0xdc, 0x3c, 0x01,
    0x23, 0x35, 0x61, 0xf4, 0x1d, 0xb6, 0x6c, 0xce, 0x31, 0x4a, 0xdb, 0x31,
    0x0e, 0x3b, 0xe8, 0x25, 0x0c, 0x46, 0xf0, 0x6d, 0xce, 0xea, 0x3a, 0x7f,
    0xa1, 0x34, 0x80, 0x57, 0xe2, 0xf6, 0x55, 0x6a, 0xd6, 0xb1, 0x31, 0x8a,
    0x02, 0x4a, 0x83, 0x8f, 0x21, 0xaf, 0x1f, 0xde, 0x04, 0x89, 0x77, 0xeb,
    0x48, 0xf5, 0x9f, 0xfd, 0x49, 0x24, 0xca, 0x1c, 0x60, 0x90, 0x2e, 0x52,
    0xf0, 0xa0, 0x89, 0xbc, 0x76, 0x89, 0x70, 0x40, 0xe0, 0x82, 0xf9, 0x37,
    0x76, 0x38, 0x48, 0x64, 0x5e, 0x07, 0x05
]);

describe("libsodium_box", function () {
    it('crypto_box', function() {
        var c = sodium.crypto_box(m, nonce, bobpk, alicesk);
        assert( c != null);
        var c1 = c.slice(16, c.length);
        assert(c1.equals(expected1));

        c = sodium.crypto_box(m, nonce, small_order_p, alicesk);
        assert(c == null);
    });

    it('crypto_box_beforenm/afternm', function() {
        var k = sodium.crypto_box_beforenm(bobpk, alicesk);
        assert(k != null);
        
        var c = sodium.crypto_box_afternm(m, nonce, k);
        var c1 = c.slice(16, c.length);
        assert(c1.equals(expected1));

        k = sodium.crypto_box_beforenm(small_order_p, alicesk);
        assert(k == null);
    });

    it('crypto_box constants', function() {
            assert(sodium.crypto_box_seedbytes() > 0);
            assert(sodium.crypto_box_publickeybytes() > 0);
            assert(sodium.crypto_box_secretkeybytes() > 0);
            assert(sodium.crypto_box_beforenmbytes() > 0);
            assert(sodium.crypto_box_noncebytes() > 0);
            assert(sodium.crypto_box_zerobytes() > 0);
            assert(sodium.crypto_box_boxzerobytes() > 0);
            assert(sodium.crypto_box_macbytes() > 0);
            assert(sodium.crypto_box_messagebytes_max() > 0);

            assert(sodium.crypto_box_publickeybytes() == sodium.crypto_box_PUBLICKEYBYTES);
            assert(sodium.crypto_box_secretkeybytes() == sodium.crypto_box_SECRETKEYBYTES);
            assert(sodium.crypto_box_beforenmbytes() == sodium.crypto_box_BEFORENMBYTES);
            assert(sodium.crypto_box_noncebytes() == sodium.crypto_box_NONCEBYTES);
            assert(sodium.crypto_box_zerobytes() == sodium.crypto_box_ZEROBYTES);
            assert(sodium.crypto_box_boxzerobytes() == sodium.crypto_box_BOXZEROBYTES);
            assert(sodium.crypto_box_macbytes() == sodium.crypto_box_MACBYTES);
            
            assert.equal(sodium.crypto_box_primitive(), "curve25519xsalsa20poly1305");
                          
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_seedbytes() ==
                   sodium.crypto_box_seedbytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_publickeybytes() ==
                   sodium.crypto_box_publickeybytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_secretkeybytes() ==
                   sodium.crypto_box_secretkeybytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_beforenmbytes() ==
                   sodium.crypto_box_beforenmbytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_noncebytes() ==
                   sodium.crypto_box_noncebytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_zerobytes() ==
                   sodium.crypto_box_zerobytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_boxzerobytes() ==
                   sodium.crypto_box_boxzerobytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_macbytes() ==
                   sodium.crypto_box_macbytes());
            assert(sodium.crypto_box_curve25519xsalsa20poly1305_messagebytes_max() ==
                   sodium.crypto_box_messagebytes_max());
    });

});

