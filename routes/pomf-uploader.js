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
    return res.status(400).json({ error: 'Parameter "urls" tidak ditemukan' });
  }

  const urlArray = urls.split(',').slice(0, 10); // Batasi maksimal 10 URL

  try {
    const results = [];

    for (const url of urlArray) {
      // Mengunduh file dari URL
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });

      // Menentukan nama dan format file
      const fileName = path.basename(url);
      const fileExtension = path.extname(url);
      const tempFilePath = `./tmp/${fileName}-${fileExtension}`;
      console.log(tempFilePath);

      // Menyimpan file sementara
      fs.writeFileSync(tempFilePath, Buffer.from(response.data, 'binary'));

      // Membuat objek FormData
      const formData = new FormData();
      formData.append('files[]', fs.createReadStream(tempFilePath));

      // Mengirim permintaan POST ke pomf.lain.la
      const uploadResponse = await axios.post('https://pomf.lain.la/upload.php', formData, {
        headers: formData.getHeaders(),
      });

      // Menghapus file sementara
      fs.unlinkSync(tempFilePath);

      // Ambil URL file yang diunggah
      const fileUrl = uploadResponse.data.files[0].url;
      results.push(fileUrl);
    }

    let rslt = JSON.stringify(results, null, 2);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(rslt);
    console.log("[/up]", ` Success upload: \n${rslt}`);
  } catch (error) {
    console.error('[/up] Terjadi kesalahan saat mengunggah file:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengunggah file' });
  }
}
}