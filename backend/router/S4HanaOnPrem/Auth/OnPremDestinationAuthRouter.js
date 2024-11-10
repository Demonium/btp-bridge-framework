const Router = require("express");
const OnPremDestinationAuthRouter = Router();
const AuthManager = require("../../../services/authManager");

const getBtpAccessToken = function (req, res, next) {
    AuthManager.getBtpXsuaaAccessTokenWithTeamsAuthToken(
      req.headers.teams_auth_token
    )
      .then((accessToken) => {
        console.log("BTP token obtained in Destination auth:", accessToken);
        req.accessToken = accessToken;
        next();
      })
      .catch((error) => {
        console.log("Error while fetching BTP token", error);
      });
};
OnPremDestinationAuthRouter.use(getBtpAccessToken);
module.exports = OnPremDestinationAuthRouter;
