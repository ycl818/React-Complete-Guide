import React from "react";
import { Link, useParams } from "react-router-dom";

const ProductDrtailPage = () => {
  const params = useParams();

  return (
    <>
      <div>ProductDrtailPage</div>
      <p>{params.productId}</p>
      <button>
        <Link to=".." relative="path">
          Back
        </Link>
      </button>
    </>
  );
};

export default ProductDrtailPage;
