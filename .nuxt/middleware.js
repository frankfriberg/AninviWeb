const middleware = {}

middleware['verification'] = require('../middleware/verification.js')
middleware['verification'] = middleware['verification'].default || middleware['verification']

export default middleware
