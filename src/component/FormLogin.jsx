import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../redux/auth';
import { ROUTES } from '../constant/routesConstant';
import { useNavigate } from 'react-router-dom';
import { users } from '../../public/data/userData';
import { Alert, Space, message } from 'antd';


const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    password: ""
  });

  const onFinish = (values) => {
    const { username, password } = values;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      message.success("Welcome Back!")
      dispatch(authActions.login(user));
      setTimeout(() => {
        navigate(ROUTES.PORTAL_RESTO);
      }, 500)
    } else {
      message.error("Invalid Username or Password");
    }
  };

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form className='w-full  login-form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
      layout='vertical'
    >
      <Form.Item
        label={<span className='text-primary text-[16px] font-bold'>Username</span>}
        name="username"
      >
        <Input onChange={(event) => onChange(event)} value={state.username} required />
      </Form.Item>

      <Form.Item
        label={<span className='text-primary text-[16px] font-bold'>Password</span>}
        name="password"
      >
        <Input.Password onChange={onChange} value={state.password} required />
      </Form.Item>


      <Form.Item>
        <Button className='bg-primary w-full font-bold' type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Auth;

