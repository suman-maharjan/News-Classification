const userModel = require("../modules/user/user.model");
const { verifyToken } = require("./jwt");

const compareRoles = (user_perm, access_perm) => {
  // Ensure user_perm is an array
  if (!Array.isArray(user_perm)) {
    user_perm = [user_perm];
  }

  // If no specific access permissions are required, allow access
  if (access_perm.length === 0) return true;

  // Check if any of the user permissions match the access permissions
  return user_perm.some((v) => access_perm.indexOf(v) !== -1);
};

const secureAPI = (roles) => {
  return async (req, res, next) => {
    try {
      const bearerToken = req?.headers?.authorization;
      if (!bearerToken) throw new Error("Access Token is required");
      const token = bearerToken.split("Bearer ")[1];
      const tokenData = verifyToken(token);
      if (!tokenData) throw new Error("Invalid Token");
      const { data } = tokenData;

      // Find the user, check the user and get is role
      const user = await userModel.findOne({
        email: data.email,
        isActive: true,
      });

      if (!user) throw new Error("User not found");
      const isAllowed = compareRoles(roles, user.roles);
      if (!isAllowed) throw new Error("Access Denied");
      req.currentUser = user._id;
      req.currentRole = user.roles;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = secureAPI;
