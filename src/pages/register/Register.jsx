import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    profilePic: '',
    coverPic: '',
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/register',
        inputs
      );
      navigate('/login');
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
          <h1>
            <PersonIcon style={{ fontSize: '40px' }} />
            Register
          </h1>
          <form>
            <input
              type='text'
              placeholder='Name'
              name='name'
              onChange={handleChange}
            />
            <input
              type='text'
              name='username'
              placeholder='Username'
              onChange={handleChange}
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
        <div className='right'>
          <h1>Socail Media</h1>
          <p>
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <span>Already have an account?</span>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
