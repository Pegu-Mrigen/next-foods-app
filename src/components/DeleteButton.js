import React, { useState } from 'react'

const DeleteButton = ({label, onDelete}) => {

    const [showConfirm, setShowConfirm] = useState(false)

    if(showConfirm){
        return (
           <div className='fixed inset-0 flex items-center justify-center h-full bg-gray-400/60 '>
            <div className='bg-white   p-2 rounded-lg '>
            <div className='mb-4'>Are you sure you want to delete?</div>
            <div className='flex gap-4 mt-2 '>
             <button type='button' onClick={()=>setShowConfirm(false)} >
                Cancel
            </button>
             <button type='button' className='primary' onClick={onDelete} >
                Yes,&nbsp;delete!
            </button>
           </div>
           </div>
           </div>
          )
    }


  return (
    <button type='button' onClick={()=>setShowConfirm(true)}>
        {label}
    </button>
  )
}

export default DeleteButton