import FlyingButton from 'react-flying-item'

const AddToCartButton = ({hasSizesOrExtras, onClick, basePrice, image, }) => {

    if(!hasSizesOrExtras){
        return (
            <div className='flyingButtonParent mt-4'>
                <FlyingButton src={image} targetTop	="5%" targetLeft	="95%"  >
                <div  onClick={onClick}>Add to cart Rs/- {basePrice}</div>
                </FlyingButton>
            </div>


        )
    }
  return (
    <>
     <button type="button" onClick={onClick}
        className="bg-primary text-white rounded-full
            px-8 py-2 mt-4">
        
       
       <span>Add to cart (starting Rs/- {basePrice})</span>
          
      </button>
    </>
  )
}


export default AddToCartButton