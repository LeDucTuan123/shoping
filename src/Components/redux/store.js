import { createStoreHook } from "react-redux";

import rootReducers from "./reducer";

const store = createStoreHook(rootReducers)

export default store;