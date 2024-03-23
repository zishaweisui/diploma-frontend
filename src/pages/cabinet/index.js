import { Navigate } from "react-router-dom"
import serviceAuth from "services/auth"

const Cabinet = () => <Navigate to={`/${serviceAuth.getRole()}`} />

export default Cabinet
