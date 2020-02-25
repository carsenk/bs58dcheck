var bs58grscheck = require('../')
var fixtures = require('./fixtures')
var tape = require('tape')
var Buffer = require('safe-buffer').Buffer

fixtures.valid.forEach(function (f) {
  tape('decodes ' + f.string, function (t) {
    t.plan(2)
    var actual = bs58grscheck.decode(f.string).toString('hex')
    t.equal(actual, f.payload)

    actual = bs58grscheck.decodeUnsafe(f.string).toString('hex')
    t.equal(actual, f.payload)
  })
})

fixtures.invalid.forEach(function (f) {
  tape('decode throws on ' + f.string, function (t) {
    t.plan(2)
    t.throws(function () {
      bs58grscheck.decode(f.string)
    }, new RegExp(f.exception))

    t.equal(bs58grscheck.decodeUnsafe(f.string), undefined)
  })
})

fixtures.valid.forEach(function (f) {
  tape('encodes ' + f.string, function (t) {
    t.plan(1)
    var actual = bs58grscheck.encode(Buffer.from(f.payload, 'hex'))

    t.equal(actual, f.string)
  })
})
