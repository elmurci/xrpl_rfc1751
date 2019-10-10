const assert = require('assert');

const x = require('./index');

const rfc1751 = require('./rfc1751');

function test(obj) {
  console.log(`${obj.key}`);

  // Remove whitespace and interpret hex
  const buf = Buffer.from(obj.key.replace(/\s+/g, ''), 'hex');

  assert(rfc1751.key_to_english(x.buffer_to_array(buf)) === obj.expected_rfc1751);

  assert(buf.equals(Buffer.from(rfc1751.english_to_key(obj.expected_rfc1751))));

  console.log(`  ✅  <-> ${obj.expected_rfc1751}`);

  // `expected_master_key` is the `master_key` as returned by `wallet_propose`
  assert(
    rfc1751.key_to_english(x.buffer_to_array(x.swap128(buf))) === obj.expected_master_key,
    `${rfc1751.key_to_english(x.buffer_to_array(x.swap128(buf)))} === ${obj.expected_master_key}`
  );

  assert(buf.equals(x.swap128(Buffer.from(rfc1751.english_to_key(obj.expected_master_key)))));

  assert(
    rfc1751.key_to_english(x.buffer_to_array(x.swap128_alt(buf))) === obj.expected_master_key,
    `${rfc1751.key_to_english(x.buffer_to_array(x.swap128_alt(buf)))} === ${obj.expected_master_key}`
  );

  assert(buf.equals(x.swap128_alt(Buffer.from(rfc1751.english_to_key(obj.expected_master_key)))));

  console.log(`  ✅  <-> ${obj.expected_master_key}`);
  console.log();
}

test({
  key: 'CCAC 2AED 5910 56BE 4F90 FD44 1C53 4766',
  expected_rfc1751: 'RASH BUSH MILK LOOK BAD BRIM AVID GAFF BAIT ROT POD LOVE',
  expected_master_key: 'CHOW SAP ODIN GAUR SELF ME MONT LIST GEE SHED LASS CHOU'
});

test({
  key: 'EFF8 1F9B FBC6 5350 920C DD74 16DE 8009',
  expected_rfc1751: 'TROD MUTE TAIL WARM CHAR KONG HAAG CITY BORE O TEAL AWL',
  expected_master_key: 'BUT BEN FOUL TEST ROAR AGEE BABE IDLE MORE RAM YEAR DUEL'
});

test({
  key: 'DEDCE9CE67B451D852FD4E846FCDE31C',
  expected_rfc1751: 'SLEW TALK DINT RIDE WET TINE BARK THEY JERK SLOT SLAB GONE',
  expected_master_key: 'I IRE BOND BOW TRIO LAID SEAT GOAL HEN IBIS IBIS DARE'
});


