const middleware = {}

middleware['verification'] = require('../middleware/verification.ts')
middleware['verification'] = middleware['verification'].default || middleware['verification']

export default middleware
