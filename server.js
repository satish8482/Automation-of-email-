'use strict'
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var express = require('express');
var app = express();
var http = require('http');
var replace = require('stream-replace');
var htmlConvert = require('html-convert');
var htmlToText = require('html-to-text');
var convert = htmlConvert();
var destin=fs.createWriteStream('./standup.text');
var path=require('path');
var credentials = require('./credentials.json');
var dateFormat = require('dateformat');
var now = new Date();
var request = require('request');
 var schedule = require('node-schedule');
var strings = require('node-strings');
var username = "Mithra",
password = "12345";

var url = "https://" + username + ":" + password + "@agile-standup-bot.herokuapp.com/channels/2/standups";
request(url)
  .pipe(replace(/\/assets\//g ,  ''))
  .pipe(destin);
request(
  {
        url : url
  },
  
function (error,response, body) {
    if (!error) {
      var $ = cheerio.load(body)
      var content =$('.wrapper').text();
      var title = $('title').text();
      content = $('body').text();
      console.log('URL: ' + url);
      console.log('Title: ' + title);
      console.log('Content:' + content);
      var text = htmlToText.fromString(content, {
        wordwrap: 130
      });
  console.log("Converted text from HTML",text);
  var text1=text.replace('Manage Users Settings #meetings','');
  var text2=text1.replace('Made by So Fetch','');
  var text3=text2.replace('Previous Day','');
  var text4=text3.replace('Divya Pothu','\nDIVYA POTHU\n');
  var text5=text4.replace('BangaruBabu Pureti','\nBANGARUBABU PURETI\n');
  var text6=text5.replace('Satish Matapati','\nSATISH MATAPATI\n');
  var text7=text6.replace('Mithra k ','\nMITHRA K \n');
  var text8=text7.replace(/What I worked on yesterday:/g,'\nWhat I worked on yesterday:\n');
  var text9=text8.replace(/Anything in my way:/g,'\nAnything in my way: \n');
  var text10=text9.replace(/What I am working on today:/g,'\nWhat I am working on today:\n');
     
var j = schedule.scheduleJob( '*/1 * * * *', function(){
var send = require('gmail-send')({
  user: credentials.user,
  pass: credentials.pass,                 
  to:   credentials.to,       
  text:    'Hi all'+ "\n"+'Please find the below minutes of meeting.'+"\n"+"\n"+text10+"\n"+"\n"+"Regards,"+"\n"+"Satish Matapati,"+"\n"+"Tata Consultancy Services"+"\n"+"Mailto: satish.8@tcs.com"+"\n"+"Cell:- +91 9036276500",
  body:'divya',
});
console.log('* [example 1.1] sending test email');

send({ // Overriding default parameters
  subject: 'Minutes of Meeting '+'('+dateFormat(now)+')',         // Override value set as default
  // files: [ filepath ],
}, function (err, res) {
  console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
});
});
}
    else{
      console.log("We’ve encountered an error: " + error);
    }
});