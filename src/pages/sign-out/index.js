import { useEffect } from "react";
import serviceAuth from "services/auth";

const SignOut = () => {
  useEffect(() => {
    serviceAuth.signOut()
  }, [])

  return <></>
}

export default SignOut;
