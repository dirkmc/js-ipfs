'use strict'

const multibase = require('multibase')
const { print } = require('../../utils')
const { cidToString } = require('../../../utils/cid')

module.exports = {
  command: 'links <key>',

  describe: 'Outputs the links pointed to by the specified object',

  builder: {
    'cid-base': {
      describe: 'Number base to display CIDs in. Note: specifying a CID base for v0 CIDs will have no effect.',
      type: 'string',
      choices: multibase.names
    }
  },

  handler ({ getIpfs, key, cidBase, resolve }) {
    resolve((async () => {
      const ipfs = await getIpfs()
      const links = await ipfs.object.links(key, { enc: 'base58' })

      links.forEach((link) => {
        const cidStr = cidToString(link.cid, { base: cidBase, upgrade: false })
        print(`${cidStr} ${link.size} ${link.name}`)
      })
    })())
  }
}
