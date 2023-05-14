import { useContext } from 'react';
import img from '../../assets/images/login/login.svg'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {
const navigate = useNavigate()
  const {createUser}= useContext(AuthContext)

const handleSignUp= event =>{
  event.preventDefault()
const form = event.target;
const name = form.name.value;
const email = form.email.value;
const password = form.password.value;

createUser(email, password)
.then(result =>{
  const createdUser = result.user;
  console.log( createdUser)
  navigate('/login')

})

.catch(error=>{
  const CreatedError = error.message;
  console.log(CreatedError)
})

console.log(name, email, password)

}

  return (
    <div className="hero min-h-screen  mb-6">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2  mr-12">
        <img src={img}alt="" className='pt-10' />
         
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
          <h1 className="text-3xl font-bold">SignUp now!</h1>
            <form onSubmit={handleSignUp} >

            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name='name'
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name='email'
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
                name='password'
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
             
              <input className="btn btn-primary" type="submit" value="SignUp" />
            </div>
            </form>
            <p className='text-center my-5'>Already have an Account?<Link className='text-orange-600 font-bold' to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;