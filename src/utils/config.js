let config = {
  development: {
    basicUrl: "api/",
    uploadUrl: "api/commonManager/filesUpload"
  },
  test: {
    basicUrl: "api/",
    uploadUrl: "api/commonManager/filesUpload"
  },
  production: {
    basicUrl: "api/",
    uploadUrl: "api/commonManager/filesUpload"
  }
};
let configObj = config[process.env.NODE_ENV];
export let basicUrl = configObj.basicUrl;
export let uploadUrl = configObj.uploadUrl;
