import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PatientCRUD from './PatientCRUD';
import LoginPage from './Login';
import DoctorCRUD from './DoctorCRUD';

function App() {
    return (
            <Routes>
                <Route path="/" element={<LoginPage />} />
                
                {/* Protected Routes */}
                <Route 
                    path="/PatientCRUD" 
                    element={
                        <ProtectedRoute allowedRoles={["Doctor's Assistant"]}>
                            <PatientCRUD />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/DoctorCRUD" 
                    element={
                        <ProtectedRoute allowedRoles={["Doctor"]}>
                            <DoctorCRUD />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
    );
}
export default App;
