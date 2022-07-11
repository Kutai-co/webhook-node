const axios = require('axios')
var FormData = require('form-data');
var fs = require('fs');

const token = process.env.TOKEN


const dataImg = new FormData()
dataImg.append('messaging_product', 'whatsapp');
dataImg.append('to', '573136104884');
dataImg.append('file', fs.createReadStream('./public/img1.jpg'));

var data = JSON.stringify({
  messaging_product: 'whatsapp',
  to: '573136104884',
  text: {
    body: 'hello world!',
  },
})

var config = {
  method: 'post',
  url: `https://graph.facebook.com/v13.0/109000051872634/media`,
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'multipart/form-data',
  },
  data: dataImg,
}

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data))
  })
  .catch(function (error) {
    console.log(error)
  })
