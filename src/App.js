import './App.css';
import './Doubt.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home1 from './pages/Home1';
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
          <Route path='/' element={<Home1 />} />
          <Route path='/editor/:id' element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
