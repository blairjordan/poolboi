const axios = require("axios");
const { secret } = require("../config.json").recaptcha;

/*
  secret	Required. The shared key between your site and reCAPTCHA.
  response	Required. The user response token provided by the reCAPTCHA client-side integration on your site.
  remoteip	Optional. The user's IP address.
*/
verifyRecaptcha = response => {
  console.log(response);
  console.log(secret);
  return axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`, {},
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
    });
};

module.exports = { verifyRecaptcha };
