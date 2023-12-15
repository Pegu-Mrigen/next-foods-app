import React from 'react'

const SuccessBox = ({children}) => {
  return (
    <h2 className="text-center bg-green-100 p-2 rounded-lg border border-green-400">
           {children}
          </h2>
  )
}

export default SuccessBox