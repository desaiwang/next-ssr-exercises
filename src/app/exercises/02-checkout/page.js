"use client";
import React from "react";

import DATA from "./data";
import reducer from "./reducer";
import StoreItem from "./StoreItem";
import CheckoutFlow from "./CheckoutFlow";
import "./styles.css";

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, null);

  React.useEffect(() => {
    dispatch({
      type: "initialize",
      items: [],
    });

    const localItems = window.localStorage.getItem("items");

    dispatch({
      type: "initialize",
      items: localItems === null ? [] : JSON.parse(localItems),
    });
  }, []);

  React.useEffect(() => {
    if (items !== null) {
      window.localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                dispatch({
                  type: "add-item",
                  item,
                });
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) => {
            dispatch({
              type: "delete-item",
              item,
            });
          }}
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
