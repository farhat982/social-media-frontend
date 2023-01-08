import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import LoginIcon from '@mui/icons-material/Login';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className='login'>
      <div className='card'>
        <div className='left'>
          <h1>hello world</h1>
          <p>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <span>Don't have an account?</span>
          <Link to='/register'>
            <button>Register</button>
          </Link>
        </div>
        <div className='right'>
          <h1>
            Login
            <LoginIcon style={{ fontSize: '40px' }} />
          </h1>
          <form>
            <input
              type='text'
              placeholder='Username'
              name='username'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
