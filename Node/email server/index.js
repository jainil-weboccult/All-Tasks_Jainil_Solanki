var http = require('http');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jainilsolanki0704@gmail.com',
    pass: 'qjokzmmejwnerbca'
  }
});

var mailOptions = {
  from: 'jainilsolanki0704@gmail.com',
  to: 'jainil.solanki@weboccult.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Email Server Using Node!');
}).listen(8080);