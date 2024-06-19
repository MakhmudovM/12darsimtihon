import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { addProduct, decreaseAmount, increaseAmount } from "../features/productSlice";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.items.find((item) => item.id === id));

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRecipe(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  const handleAddToCart = () => {
    dispatch(addProduct({ ...recipe, id }));
  };

  return (
    <div className="container-class mx-auto mt-20 ml-auto mr-auto mb-10">
      <h1 className="text-3xl font-bold text-center mb-6">{recipe.title}</h1>
      <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {recipe.images && recipe.images.length > 0 ? (
          recipe.images.map((img, index) => (
            <div className="carousel-item" key={index}>
              <img
                src={img}
                className="rounded-box max-w-full h-auto"
                alt={`carousel-item-${index}`}
                width={500}
                height={400}
              />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <p className="text-lg mt-6 ml-auto mr-auto">{recipe.method}</p>
      <p className="text-lg mt-4">
        <strong>Cooking Time:</strong> {recipe.cookingTime}
      </p>
      <p className="text-lg mt-4 ml-0">
        <strong>Ingredients:</strong>
      </p>
      <ul className="list-disc list-inside flex gap-2">
        {recipe.ingredients.map((ingredient, index) => (
          <li className=" bg-emerald-400 px-3 rounded-lg" key={index}>{ingredient}</li>
        ))}
      </ul>
      <div className="mt-8 flex gap-9">
        <div className="rounded-lg bg-slate-200 w-28 items-center justify-center flex gap-4">
          <button
            className="text-emerald-500 text-3xl cursor-pointer"
            onClick={() => product && dispatch(decreaseAmount(id))}
            disabled={!product || product.amount === 0}
          >
            -
          </button>
          <button>{product ? product.amount : 0}</button>
          <button
            className="text-emerald-500 text-2xl"
            onClick={() => product && dispatch(increaseAmount(id))}
          >
            +
          </button>
        </div>
        <button
          className="btn btn-secondary bg-emerald-500 w-48 add"
          onClick={handleAddToCart}
        >
          <BsCart3 className="" />
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail;


