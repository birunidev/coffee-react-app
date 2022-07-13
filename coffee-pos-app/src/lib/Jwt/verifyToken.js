import jwt_decode from "jwt-decode";

function verifyToken(token) {
  if (!token) return false;

  const decoded = jwt_decode(token);
  console.log(decoded);
  return decoded;
}
export default verifyToken;
