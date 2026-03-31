// "use client"
// import { configureStore } from '@reduxjs/toolkit'
// import { userSlice } from './slice/userSlice'

// export default configureStore({
//   reducer: {
//     user:userSlice.reducer
//   }
// })

'use client'

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'  // ✅ default import

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});