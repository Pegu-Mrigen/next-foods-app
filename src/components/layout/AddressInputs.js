import React from 'react'

const AddressInput  = ({addressProps, setAddressProps, disabled=false}) => {
      const {phone, streetAddress, postalCode, city, country}= addressProps
  return (
    <>
    <label>Phone</label>
            <input disabled={disabled}
            
              type="tel"
              
              placeholder="Phone number"

              value={phone || ""}
              onChange={(e) => setAddressProps( "phone", e.target.value)}
            />
            <label>Street address</label>
            <input disabled={disabled}
              type="text"
              placeholder="Street address"
              value={streetAddress || ""}
              onChange={(e) =>  setAddressProps( "streetAddress", e.target.value)}
            />
           <div className="grid grid-cols-2 gap-2">
           <div>
           <label>Postal code</label>
            <input disabled={disabled} 
            
              type="text"
              placeholder="Postal code"
              value={postalCode || ""}
              onChange={(e) => setAddressProps( "postalCode", e.target.value)}
              
            />
           </div>
            <div>
            <label>City</label>
            <input disabled={disabled}
            
              type="text"
              placeholder="City"
              value={city || ""}
              onChange={(e) => setAddressProps( "city", e.target.value)}
            />
            </div>
           </div>
           <label>Country</label>
           <input disabled={disabled} 
              type="text"
              placeholder="Country"
              value={country || ""}
              onChange={(e) => setAddressProps( "country", e.target.value)}
            />
    </>
  )
}

export default AddressInput