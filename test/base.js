var tape = require('tape')
var Buffer = require('safe-buffer').Buffer
var createBlakeHash = require('blake-hash')
var bs58grscheckBase = require('../base')

function blake256x2 (buffer) {
  buffer = createBlakeHash('blake256').update(buffer).digest()
  return createBlakeHash('blake256').update(buffer).digest()
}

var bs58grscheck = bs58grscheckBase(blake256x2)

tape('custom checksum function (blake256x2)', function (t) {
  const address = 'DsRLWShUQexhKE1yRdpe2kVH7fmULcEUFDk'
  const payload = Buffer.from('073f0415e993935a68154fda7018b887c4e3fe8b4e10', 'hex')

  t.equal(bs58grscheck.encode(payload, blake256x2), address)
  t.same(bs58grscheck.decodeUnsafe(address, blake256x2), payload)
  t.same(bs58grscheck.decode(address, blake256x2), payload)

  t.end()
})
