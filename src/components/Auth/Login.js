import React, { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";
import { FormContext } from "../../context/DataContext";
import AlertMessage from "../layout/AlertMessage";
const Login = () => {
  const { updateForm } = useContext(FormContext);
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  
  
  const userForm = { email, password };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(userForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
      else{
        updateForm("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="authentication">
    <AlertMessage info={alert} />
      <div className="card" style={{ height: 400 }}>
        <h2>Đăng nhập</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="password" className='mb-0 mt-4'>
            <Form.Label>Mật khẩu :</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
         
          <Button type="submit" className="w-100 mt-4">
            Đăng nhập
          </Button>
        </Form>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <span style={{color:"#333"}}>Bạn chưa có tài khoản NCT ?</span>

          <p
            style={{ padding: 0, cursor: "pointer" }}
            onClick={() => updateForm("Register")}
          >
            Đăng kí
          </p>
        </div>
        <i className="close-form" onClick={() => updateForm("")}>
          <ClearIcon />
        </i>
      </div>
    </div>
  );
};

export default Login;
