import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// layouts
import MainLayout from "./layout/MainLayout";

// pages
import Home from './page/Home';
import Login from "./page/Login";
import Register from "./page/Register";
import Create from "./page/Create";
import RecipeDetail from "./page/RecipeDetail";
import Chart from "./page/Chart";
import Cart from './page/Cart';

// components
import Error from "./components/Error";
import ProtectedRoutes from "./components/ProtectedRoutes";

// redux
import { useSelector, useDispatch } from "react-redux";
import { login, isAuthReady, clear } from "./features/userSlice";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const dispatch = useDispatch();
  const { user, authReady } = useSelector((state) => state.currentUser);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Используйте только сериализуемые данные
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }));
      } else {
        dispatch(clear());
      }
      dispatch(isAuthReady());
    });

    return () => unsubscribe();
  }, [dispatch]);

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
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
        },
        {
          path: "/recipe/:id",
          element: <RecipeDetail />,
        },
        {
          path: "/chart",
          element: <Chart />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
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

  if (!authReady) return <div>Loading...</div>;

  return <RouterProvider router={routes} />;
}

export default App;

