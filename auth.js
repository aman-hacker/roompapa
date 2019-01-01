const express= require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const bodyParser=require('body-parser');
const expressSession=require('express-session');
const user=require('./db');
const strategy=require('passport-local');
const nodemailer=require('nodemailer');


const app=express();
app.set('view engine','ejs');
// setting for passport
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSession({
  secret:"roompapa",
 resave:false,
 saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
passport.use(new strategy(user.authenticate()));


// routes here
app.get('/',(req,res)=>{
  res.render("home.ejs");
});

app.get('/secret',isLogged,(req,res)=>{
  res.render("secret.ejs");
});

// register routes ===========================================================
app.get('/register',(req,res)=>{
  res.render('register.ejs');
});

app.post('/register',(req,res)=>{
  user.register(new user({username:req.body.username}),req.body.password,(err,user)=>{
    if(err){
      console.log(err);
    return  res.render('register');
    }
     console.log(user);
    passport.authenticate('local')(req,res,()=>{
      res.redirect('/secret');
    });
  })
})


// login routes================================================================
app.get('/login',(req,res)=>{
  res.render('login.ejs');
});

app.post('/login',passport.authenticate('local',{
  successRedirect:"/secret",
  failureRedirect:"/login"
}),(req,res)=>{
  res.send('login');
});

// logout=========================================================
app.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
});

// middleware ==========================================================
 // user logged in
function isLogged(req,res,next){
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/login');
  }
};

// random string genrator
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXY&Zabcdef$ghijklmno#pqrstuvwxyz0123456789@";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// passport change =============================================================
app.get('/change',isLogged,(req,res)=>{
  res.render('change.ejs');
});

// post
app.post('/change',(req,res)=>{
  // plzz first confirm both the Password ******
  user.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err);
      res.redirect('/change');
    }else{
           user.changePassword(req.body.oldPassword,req.body.newPassword,(err)=>{
             if(err){
               console.log(err);
               res.redirect('/change');
             }else{
               res.redirect('/secret');
             }
           });
    }

  });

});

// forget Password =============================================================
app.get('/forget',(req,res)=>{
  res.render("forget");
});

app.post('/forget',(req,res)=>{
  user.findOne({username:req.body.username},(err,user)=>{
    if(err){
      console.log(err);
      console.log("user doesnt exit");
      res.redirect('/change');
    }else{
           var newPassword=makeid();
           user.setPassword(newPassword,(err)=>{
             if(err){
               console.log(err);
               res.redirect('/change');
             }else{
               user.save((err)=>{
                 if(err){
                   console.log('something went wrong with saving');
                   res.redirect('/change');
                 }else{
                   console.log(' password has been save :',newPassword);
                   console.log(user);
      // start of node mailer moduler.. =================================
               nodemailer.createTestAccount((err, account) => {

                 let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email', // we have to use our email here********
                 port: 587,
                 secure: false, // true for 465, false for other ports
                 auth: {
                 user: account.user, // generated ethereal user
                 pass: account.pass // generated ethereal password
            }
           });

          // setup email data with unicode symbols
         let mailOptions = {
         from: '"Fred Foo 👻" <foo@example.com>', // sender address
         to: req.body.username, // list of receivers
         subject: 'password changed', // Subject line
         text: newPassword, // plain text body
         html: '<b>Hello world?</b>' // html body
         };

        // send mail with defined transport object
         transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
                   return console.log(error);
         }
         console.log('Message sent: %s', info.messageId);
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

             });
        });

// end of nodemaailer module==============================
    res.render('send');
                 }
               })
             }
           })
        }
    })
});




app.listen('3000',()=>{
  console.log('server hase been started at 3000');
})
