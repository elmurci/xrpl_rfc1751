/**
 * Command-line usage:
 *   node . hex '<128 bits in hex, to encode to rippled master_key>'
 *   node . master_key '<a rippled master_key of 12 words, to decode>'
 * 
 * Examples:
 *   node . hex 'CCAC 2AED 5910 56BE 4F90 FD44 1C53 4766'
 *   node . master_key 'CHOW SAP ODIN GAUR SELF ME MONT LIST GEE SHED LASS CHOU'
 */

const rfc1751 = require('./rfc1751');

const inputType = process.argv[2];
const input = process.argv[3];

if (inputType === 'hex') {
  // Remove whitespace and interpret hex
  const buf = Buffer.from(input.replace(/\s+/g, ''), 'hex');
  // Swap byte order and use rfc1751
  console.log(rfc1751.key_to_english(buffer_to_array(swap128(buf))));
} else if (inputType === 'master_key') {
  console.log(swap128(Buffer.from(rfc1751.english_to_key(input))).toString('hex').toUpperCase());
} else {
  console.log('Unrecognized command');
}

function buffer_to_array(buf) {
  return Array.prototype.slice.call(buf);
}

/**
 * Swap the byte order of a 128-bit buffer.
 * 
 * @param {Buffer} buf - A 128-bit (16 byte) buffer
 * @return {Buffer} - A buffer containing the same data with reversed endianness
 */
function swap128(buf) {
  const result = Buffer.alloc(16);
  result.writeBigUInt64LE(buf.readBigUInt64BE(0), 8);
  result.writeBigUInt64LE(buf.readBigUInt64BE(8), 0);
  return result;
}

/**
 * Swap the byte order of a 128-bit buffer.
 * 
 * Alternate implementation.
 * 
 * @param {Buffer} buf - A 128-bit (16 byte) buffer
 * @return {Buffer} - A buffer containing the same data with reversed endianness
 */
function swap128_alt(buf) {
  // Interprets buffer as an array of (two, in this case) 64-bit numbers and swaps byte order in-place.
  const buf2 = buf.swap64();

  // Swap the two 64-bit numbers since our buffer is 128 bits.
  return Buffer.concat([buf2.slice(8, 16), buf2.slice(0, 8)], 16);
}

module.exports = {
  buffer_to_array,
  swap128,
  swap128_alt
}
