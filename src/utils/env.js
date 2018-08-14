let [basicUrl, basicImgUrl, uploadUrl] = [];
if (process.env.NODE_ENV == "development") {
    basicUrl = "http://test.demovip.com:8001"

    uploadUrl = basicUrl + '/commonManager/filesUpload';
} else {
    basicUrl = "http://test.demovip.com:8001"
    uploadUrl = basicUrl + '/commonManager/filesUpload';
}

export { basicUrl, basicImgUrl, uploadUrl } 