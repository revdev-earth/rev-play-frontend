// reducer con slices

import { reducer as editables } from "+redux/slices/editables"
import { reducer as info } from "+redux/slices/info"
import { reducer as purchases } from "+redux/slices/purchases"
import { reducer as access } from "+redux/slices/access"

export default {
  info,
  editables,
  purchases,
  access
}
