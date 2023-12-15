import React from 'react'

const datTimeModifier = (str) => {
  return (
    str.replace("T", " ").substring(0, 16)
  )
}

export default datTimeModifier