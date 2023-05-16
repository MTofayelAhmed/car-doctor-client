import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const GoogleSign = () => {
const {googleSignIn} = useContext(AuthContext)

const handleGoogleSignIn = ()=>{
  googleSignIn()
  .then(result =>{
const user = result.user;
console.log(user)
  })
  .catch(error=> {
    console.log(error)
  })
}

  return (
    <div>
      <div className="divider">OR</div>
    <div className="text-center">
    <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline ">G</button>
    </div>
    </div>
  );
};

export default GoogleSign;
