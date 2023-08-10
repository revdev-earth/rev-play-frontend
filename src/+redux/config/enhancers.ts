import { debounce } from "lodash"
import { batchedSubscribe } from "redux-batched-subscribe"

// enhancers

const debounceNotify = debounce((notify: any) => notify())

export default [batchedSubscribe(debounceNotify)]
