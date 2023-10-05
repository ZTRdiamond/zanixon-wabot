const path = require("path");
const fs = require("fs");
const FormData = require('form-data');

module.exports = {
    name: "pomf uploader",
    path: "/up",
    type: "get",
    code: async(req, res, { axios }) => {
  const urls = req.query.urls;

  if (!urls) {
    return res.status(400).json({ error: 'Parameter "urls" is not found' });
  }

  const urlArray = urls.split(',').slice(0, 10);

  try {
    const results = [];

    for (const url of urlArray) {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });

      const fileName = path.basename(url);
      const fileExtension = path.extname(url);
      const tempFilePath = `./tmp/${fileName}-${fileExtension}`;
      console.log(tempFilePath);

      fs.writeFileSync(tempFilePath, Buffer.from(response.data, 'binary'));

      const formData = new FormData();
      formData.append('files[]', fs.createReadStream(tempFilePath));

      const uploadResponse = await axios.post('https://pomf.lain.la/upload.php', formData, {
        headers: formData.getHeaders(),
      });

      fs.unlinkSync(tempFilePath);

      const fileUrl = uploadResponse.data.files[0].url;
      results.push(fileUrl);
    }

    let rslt = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(rslt);
    console.log("[/up]", ` Success upload: \n${rslt}`);
  } catch (error) {
    console.error('[/up] An error occurred while uploading the file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
}
}