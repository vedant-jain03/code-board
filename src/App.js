import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <>
      <div>
        <Toaster position='top-center' toastOptions={{
          success: {
            theme: {
              primary: '#4aed88',
            }
          }
        }} ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:id' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
