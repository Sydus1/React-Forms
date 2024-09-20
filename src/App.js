import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  // Estados para manejar los valores del formulario y las validaciones
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ emailState: true, passwordState: true, submitted: false });

  // Validar el formato del correo
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar la contraseña (que tenga letras, números y al menos 9 caracteres)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
    return passwordRegex.test(password);
  };

  // Handlers para manejar los cambios en los inputs
  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
    
    // Si el usuario empieza a escribir y ya hizo submit antes, ocultar mensaje de error
    if (validationStates.submitted) {
      setValidationStates({ ...validationStates, emailState: true });
    }
  };

  const handlePasswordChange = (e) => {
    const isValidPassword = validatePassword(e.target.value);
    setFormValues({ ...formValues, password: e.target.value });
    setValidationStates({ ...validationStates, passwordState: isValidPassword });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  // Handler para el submit
  const clickSubmit = () => {
    const isValidEmail = validateEmail(formValues.email);
    
    // Marcar que se hizo submit y hacer la validación del correo
    setValidationStates({ ...validationStates, emailState: isValidEmail, submitted: true });
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
      <Form>
        {/* Email */}
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange={handleEmailChange} 
            value={formValues.email} 
            isInvalid={!validationStates.emailState && validationStates.submitted}
          />
          { !validationStates.emailState && validationStates.submitted && (
            <Form.Text className="text-danger">
              Your email should follow an established format.
            </Form.Text>
          )}
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={handlePasswordChange} 
            value={formValues.password}
            isInvalid={!validationStates.passwordState}
          />
          { !validationStates.passwordState && (
            <Form.Text className="text-danger">
              Your password should have numbers and letters and should be at least 9 characters long.
            </Form.Text>
          )}
        </Form.Group>

        {/* Select */}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        {/* Submit button */}
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
