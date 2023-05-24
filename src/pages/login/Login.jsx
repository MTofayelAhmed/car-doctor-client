import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import GoogleSign from "../../shared/googleSignIn/GoogleSign";


const Login = () => {
const location = useLocation()
console.log(location)

  const from = location?.state?.from?.pathname || '/'
  const navigate = useNavigate();
  const { logIn } = useContext(AuthContext);
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user)
        form.reset();
          navigate(from, {replace: true});
        })

      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="hero min-h-screen  mb-6">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2  mr-12">
          <img src={img} alt="" className="pt-10" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <h1 className="text-3xl font-bold">Login now!</h1>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="text-center my-5">
              New to Car Doctors?{" "}
              <Link className="text-orange-600 font-bold" to="/signup">
                SignUp
              </Link>
            </p>
            <GoogleSign></GoogleSign>
          </div>
        </div>
      </div>
  
    </div>
  );
};

export default Login;
