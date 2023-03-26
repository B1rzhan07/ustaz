import RoutesComponent from './routes/Routes'
import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from './store/hook'

import { decrement, increment } from './store/Slices/profileSlice'
function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  console.log(count)

  return (
    <div className="wrapper">
      <RoutesComponent />
    </div>
  )
}
export default App
