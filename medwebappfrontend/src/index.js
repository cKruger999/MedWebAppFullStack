import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PatientCRUD from './PatientCRUD';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Login';
import AdminCRUD from './AdminCRUD';
import DoctorCRUD from './DoctorCRUD';

const router = createBrowserRouter([{path: "/", element: <LoginPage/>},
  {path:"/PatientCRUD", element: <PatientCRUD/>},
  {path:"/AdminCRUD", element: <AdminCRUD/>},
  {path:"/DoctorCRUD", element: <DoctorCRUD/>}
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
