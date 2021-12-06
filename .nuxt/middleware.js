const middleware = {}

middleware['auths'] = require('../middleware/auths.js')
middleware['auths'] = middleware['auths'].default || middleware['auths']

middleware['verification'] = require('../middleware/verification.js')
middleware['verification'] = middleware['verification'].default || middleware['verification']

export default middleware
