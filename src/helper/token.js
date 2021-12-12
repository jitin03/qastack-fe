import jwt_decode from "jwt-decode";

export const getUserDetailFromToken = (params) => {
  let decoded = jwt_decode(params);
  return decoded;
};
