import React, { useEffect } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Create from "./page/Create";
import RecipeDetail from "./page/RecipeDetail";
import Chart from "./page/Chart";
import Cart from "./page/Cart";
import Error from "./components/Error";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useSelector, useDispatch } from "react-redux";
import { login, isAuthReady } from "./features/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.currentUser);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "/create", element: <Create /> },
        { path: "/recipe/:id", element: <RecipeDetail /> },
        { path: "/chart", element: <Chart /> },
        { path: "/cart", element: <Cart /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      errorElement: <Error />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      errorElement: <Error />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, photoURL, email } = user;
        dispatch(login({ uid, displayName, photoURL, email }));
        dispatch(isAuthReady());
      }
    });
  }, [dispatch]);

  return <RouterProvider router={routes} />;
};

export default App;


