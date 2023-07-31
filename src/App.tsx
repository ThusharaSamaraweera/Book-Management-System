import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import ClientApp from "./ClientApp";
import { ReduxProvider } from "./providers/ReduxProvider";
import Login from "./components/pages/Login";
import LandingPage from "./components/pages/LandingPage";
import AddBook from "./components/pages/AddBook";
import RouterProtector from "./utils/RouterProtector";
import Book from "./components/pages/Book";
import SignUp from "./components/pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <ReduxProvider>
        <Routes>
          <Route path='/' element={<ClientApp />}>
            <Route path='/' element={<LandingPage />} />
            <Route
              path='/add-book'
              element={
                <RouterProtector>
                  <AddBook />
                </RouterProtector>
              }
            />
            <Route
              path='/update-book/:id'
              element={
                <RouterProtector>
                  <AddBook />
                </RouterProtector>
              }
            />
            <Route path='/books/:id' element={<Book />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
        </Routes>
      </ReduxProvider>
    </BrowserRouter>
  );
}

export default App;
