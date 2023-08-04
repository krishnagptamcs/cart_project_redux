import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAsync } from "./productSlice";
import "./Products.css";
import { addAsync } from "../cart/cartSlice";

export function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useState(() => {
    dispatch(fetchAsync());
  }, []);
  console.log("the products obtained is", products);

  return (
    <>
      {/* cards */}

      {products.map((item) => (
        <div className="card">
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ width: "100%" }}
          />
          <h1>{item.title}</h1>
          <p className="price">${item.price}</p>
          <p>{item.description}</p>
          <p>
            <button onClick={() => dispatch(addAsync(item))}>
              {" "}
              Add to Cart
            </button>
          </p>
        </div>
      ))}
    </>
  );
}
