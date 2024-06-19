import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

function Create() {
    const navigate = useNavigate();
    const [ingredient, setIngredient] = useState("");
    const [title, setTitle] = useState("");
    const [method, setMethod] = useState("");
    const [image, setImage] = useState("");
    const [cookingTime, setCookingTime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [categories, setCategories] = useState("");
    const [showModal, setShowModal] = useState(false);

    const addIngredient = (e) => {
        e.preventDefault();
        if (ingredient.trim()) {
            if (!ingredients.includes(ingredient) && ingredient.trim() !== "") {
                setIngredients((prev) => [...prev, ingredient]);
                toast.success("This Item is added successfully");
            } else {
                toast.error("Ingredient already exists");
            }
        } else {
            toast.error("Ingredient cannot be empty");
        }
        setIngredient("");
    };

    const addImg = (e) => {
        e.preventDefault();
        if (image.trim()) {
            if (!imageList.includes(image) && image.trim() !== "") {
                setImageList((prev) => [...prev, image]);
                toast.success("Изображение успешно добавлено");
            } else {
                toast.error("Изображение уже существует");
            }
        } else {
            toast.error("URL изображения не может быть пустым");
        }
        setImage("");
    };

    const handlePreview = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRecipe = {
            title,
            method,
            image: imageList[0], // Assuming you want to use the first image as a preview or default
            cookingTime: `${cookingTime} minutes`,
            ingredients,
            images: imageList, // Use imageList for multiple images
            categories,
        };

        try {
            await addDoc(collection(db, "recipes"), newRecipe);
            toast.success("Recipe added successfully!");
            navigate("/");
        } catch (error) {
            toast.error("Error adding recipe: " + error.message);
        }
    };

    return (
        <div className="cardAdd mx-auto mt-10 p-4 w-full max-w-xl">
            <h1 className="text-2xl text-center font-bold mb-6">Create New Recipe</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Title</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Ingredients:</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full"
                            onChange={(e) => setIngredient(e.target.value)}
                            value={ingredient}
                        />
                        <button className="btn btn-primary" onClick={addIngredient}>
                            +
                        </button>
                    </div>
                    <div className="mt-2">
                        <p>Ingredients:{" "}
                            {ingredients.map((ing) => (
                                <span className="badge badge-outline mr-1" key={ing}>{ing}</span>
                            ))}
                        </p>
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Cooking Time</span>
                    </div>
                    <input
                        type="number"
                        placeholder="Type here"
                        className="input input-bordered w-full"
                        onChange={(e) => setCookingTime(e.target.value)}
                        value={cookingTime}
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Image:</span>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="url"
                            placeholder="image url"
                            className="input input-bordered w-full"
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                        />
                        <button className="btn btn-primary" onClick={addImg}>
                            +
                        </button>
                    </div>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Method</span>
                    </div>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Method"
                        onChange={(e) => setMethod(e.target.value)}
                        value={method}
                    ></textarea>
                </label>
                <div className="flex flex-col gap-3">
                    <button type="submit" className="btn btn-secondary w-full">
                        Submit
                    </button>
                    <button className="btn btn-primary w-full" onClick={handlePreview}>
                        Preview
                    </button>
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
                            <div className="relative w-auto max-w-4xl mx-auto my-6">
                                <div className="modal-box bg-white p-6 rounded-lg shadow-lg">
                                    <h1 className="text-2xl font-bold mb-4">{title}</h1>
                                    <div className="carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
                                        {imageList.map((img, index) => (
                                            <div className="carousel-item" key={index}>
                                                <img
                                                    src={img}
                                                    className="rounded-box max-w-full h-auto"
                                                    alt={`carousel-item-${index}`}
                                                    width={300}
                                                    height={200}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-lg mt-4">Cooking Time: {cookingTime} minutes</p>
                                    <p className="text-lg mt-4">Ingredients:</p>
                                    <ul className="list-disc list-inside flex gap-1">
                                        {ingredients.map((ingredient, index) => (
                                            <li className="bg-emerald-400 px-3 rounded-lg" key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                    <p className="text-lg mt-4">Method:</p>
                                    <p>{method}</p>
                                    <button
                                        className="btn btn-primary mt-6"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Create;

