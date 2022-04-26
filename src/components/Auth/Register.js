import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import ClearIcon from "@material-ui/icons/Clear";
import "./Auth.scss";
import { AuthContext } from "../../context/AuthContext";
import { FormContext } from "../../context/DataContext";
import AlertMessage from "../layout/AlertMessage";
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { updateForm } = useContext(FormContext);
  const { registerUser } = useContext(AuthContext);
  const [alert, setAlert] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password not match" });
      setTimeout(() => setAlert(null), 5000);
    } else {
      try {
        const newUser = {
          email: email,
          username: username,
          password: password,
        };
        const registerData = await registerUser(newUser);
        if (!registerData.success) {
          setAlert({ type: "danger", message: registerData.message });
          setTimeout(() => setAlert(null), 5000);
        } else {
          updateForm("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="authentication">
        <div className="card" style={{ height: 500 }}>
          <AlertMessage info={alert} />
          <h2>Đăng kí</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email :</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Tên tài khoản :</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Mật khẩu :</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="password-confirm" style={{ marginBottom: 0 }}>
              <Form.Label>Nhập lại mật khẩu : </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 mt-4">
              Đăng kí
            </Button>
          </Form>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#333" }}>Bạn đã có tài khoản NCT ?</span>

            <p
              style={{ padding: 0, cursor: "pointer" }}
              onClick={() => updateForm("Login")}
            >
              Đăng nhập
            </p>
          </div>
          <i className="close-form" onClick={() => updateForm("")}>
            <ClearIcon />
          </i>
        </div>
      </div>
    </>
  );
};

export default Register;
