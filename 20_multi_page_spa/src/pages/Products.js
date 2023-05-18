import React from "react";
import ProductDrtailPage from "./ProductDrtailPage";
import { Link } from "react-router-dom";

const Products = () => {
  const PRODUCTS = [
    { id: "p1", title: "product1" },
    { id: "p2", title: "product2" },
    { id: "p3", title: "product3" },
  ];

  return (
    <>
      <div>Products</div>

      <ul>
        {PRODUCTS.map((prod) => {
          return (
            <li>
              <Link to={prod.id}>{prod.title}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Products;
