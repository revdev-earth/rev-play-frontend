// slices reducer

import { reducer as editables } from "+redux/slices/editables"
import { reducer as info } from "+redux/slices/info"
import { reducer as purchases } from "+redux/slices/purchases"
import { reducer as access } from "+redux/slices/access"
import { reducer as ws } from "+redux/slices/ws"

export default {
  info,
  editables,
  purchases,
  access,
  ws
}
