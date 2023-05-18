import React from "react";
import { useParams } from "react-router-dom";

const ProductDrtailPage = () => {
  const params = useParams();

  return (
    <>
      <div>ProductDrtailPage</div>
      <p>{params.productId}</p>
    </>
  );
};

export default ProductDrtailPage;
