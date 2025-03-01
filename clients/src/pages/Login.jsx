import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { googleAuth, loginUser, validUser } from '../apis/auth';
import { BsEmojiLaughing, BsEmojiExpressionless } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const defaultData = {
  email: '',
  password: '',
};

function Login() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State for Google button hover
  const [isSubmitHovered, setIsSubmitHovered] = useState(false); // State for submit button hover
  const pageRoute = useNavigate();

  const googleSuccess = async (res) => {
    if (res?.profileObj) {
      setIsLoading(true);
      const response = await googleAuth({ tokenId: res.tokenId });
      setIsLoading(false);
      if (response.data.token) {
        localStorage.setItem('userToken', response.data.token);
        pageRoute('/chats');
      }
    }
  };

  const googleFailure = () => {
    toast.error('Something Went Wrong. Try Again!');
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes('@') && formData.password.length > 6) {
      setIsLoading(true);
      const { data } = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem('userToken', data.token);
        toast.success('Successfully Logged In!');
        setIsLoading(false);
        pageRoute('/chats');
      } else {
        setIsLoading(false);
        toast.error('Invalid Credentials!');
        setFormData({ ...formData, password: '' });
      }
    } else {
      setIsLoading(false);
      toast.warning('Provide valid Credentials!');
      setFormData(defaultData);
    }
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);

    const isValid = async () => {
      const data = await validUser();
      if (data?.user) {
        window.location.href = '/chats';
      }
    };
    isValid();
  }, []);

  // Inline styles for the Google button
  const googleButtonStyle = {
    border: '1px solid #FFD700',
    background: isHovered ? '#FFD700' : 'transparent',
    color: isHovered ? '#121418' : 'white',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  // Inline styles for the submit button
  const submitButtonStyle = {
    background: 'linear-gradient(90deg, rgba(255,215,0,1) 0%, rgba(224,205,115,1) 100%)',
    color: '#121418',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    transform: isSubmitHovered ? 'scale(1.05)' : 'scale(1)',
    opacity: isSubmitHovered ? 0.9 : 1,
  };

  return (
    <div className="bg-gradient-to-r from-[#3c475d] to-[#000000] w-full h-screen flex justify-center items-center">
      <div className="w-[90%] sm:w-[500px] bg-[#1e1e1e] p-10 rounded-lg shadow-lg text-center">
        <img src="/logo.png" alt="Logo" className="mx-auto w-24 h-24 mb-6" />
        <h3 className="text-3xl font-bold text-white">Welcome to Communication Media</h3>
        <p className="text-sm text-gray-400 mb-8">
          No Account?{' '}
          <Link className="text-[#FFD700] hover:underline" to="/register">
            Sign up
          </Link>
        </p>

        <form className="flex flex-col gap-y-6" onSubmit={formSubmit}>
          <input
            className="w-full bg-[#222222] h-[55px] pl-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all"
            onChange={handleOnChange}
            name="email"
            type="text"
            placeholder="Email"
            value={formData.email}
            required
          />
          <div className="relative">
            <input
              className="w-full bg-[#222222] h-[55px] pl-4 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all"
              onChange={handleOnChange}
              name="password"
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-3.5 right-3 text-white hover:text-[#FFD700] transition-colors"
            >
              {!showPass ? <BsEmojiLaughing /> : <BsEmojiExpressionless />}
            </button>
          </div>

          <button
            style={submitButtonStyle}
            onMouseEnter={() => setIsSubmitHovered(true)}
            onMouseLeave={() => setIsSubmitHovered(false)}
            type="submit"
          >
            {isLoading ? (
              <div className="absolute inset-0 flex justify-center items-center">
                <lottie-player
                  src="https://assets2.lottiefiles.com/packages/lf20_h9kds1my.json"
                  background="transparent"
                  speed="1"
                  style={{ width: '50px', height: '50px' }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            ) : (
              <p className="text-white">Login</p>
            )}
          </button>

          <p className="text-center text-gray-400">or</p>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <button
                style={googleButtonStyle}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                aria-label="Continue with Google"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg"
                  alt="google"
                  style={{ width: '24px', height: '24px', marginRight: '12px' }}
                />
                <p>Continue with Google</p>
              </button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
            redirectUri="http://localhost:3000"
          />
        </form>
      </div>
    </div>
  );
}

export default Login;