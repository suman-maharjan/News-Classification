const userModel = require("../modules/user/user.model");
const { verifyToken } = require("./jwt");

const compareRoles = (user_perm, access_perm) => {
  if (access_perm.length === 0) return true;
  return user_perm.some((v) => access_perm.indexOf(v) !== -1);
};

const secureAPI = (roles) => {
  return async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) throw new Error("Access Token not found");
    const token = bearerToken.split("Bearer ")[1];
    const tokenData = verifyToken(token);
    if (!tokenData) throw new Error("Invalid Token");
    const { data } = tokenData;

    // Find the user, check the user and get is role
    const user = userModel.findOne({ email: data.email, isActive: true });

    if (!user) throw new Error("User not found");
    const isAllowed = compareRoles(roles, user.roles);
    if (!isAllowed) throw new Error("Access Denied");
    req.currentUser = user._id;
    req.currentRole = user.roles;
    next();
  };
};

module.exports = secureAPI;
