import React from "react";

const MenuItem = ({image, name, description, basePrice, sizes, extraIngredientPrice}) => {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-black/50 hover:shadow-2xl transition-all">
      <div className="text-center">
        <img src="/p3.png" alt="pizza" className="max-h-24 block mx-auto" />
      </div>

      <h4 className="font-semibold my-2 text-xl">Pepperoni Pizza</h4>
      <p className="text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        fuga eaque.
      </p>

      <button
        className="bg-primary text-white rounded-full
            px-8 py-2 mt-4"
      >
        Add to cart Rs/- 110
      </button>
    </div>
  );
};

export default MenuItem;
