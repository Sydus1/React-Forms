import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({ emailState: true, passwordState: true, submitted: false });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{9,}$/;
    return passwordRegex.test(password);
  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
    
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

  const clickSubmit = () => {
    const isValidEmail = validateEmail(formValues.email);
    setValidationStates({ ...validationStates, emailState: isValidEmail, submitted: true });
  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>
      <Form>
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

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange} value={formValues.favClass}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
