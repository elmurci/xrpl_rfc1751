# rippled_master_key

Encode/decode rippled `wallet_propose` `master_key`s

[View source](./index.js)

## Command-line usage:

    node . hex '<128 bits in hex, to encode to rippled master_key>'

    node . master_key '<a rippled master_key of 12 words, to decode>'

## Examples:
    node . hex 'CCAC 2AED 5910 56BE 4F90 FD44 1C53 4766'

    node . master_key 'CHOW SAP ODIN GAUR SELF ME MONT LIST GEE SHED LASS CHOU'

## Run tests:

    node test
