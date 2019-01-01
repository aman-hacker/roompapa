const mongoose= require("mongoose");
mongoose.connect("mongodb://localhost/roompapa",{useNewUrlParser:true});

// schema here
// user schema
var userSchema= new mongoose.Schema({
  username:String,
  email:String,
  password:String,
  property:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'property'
  }]

})
// property schema
var propertySchema= new mongoose.Schema({
  propertyName:String,
  rating:Number,
  contactName:String,
  PhoneNumber1:String,
  PhoneNumber2:String,
  landline:String,
  StreetAddress:String,
  AddressLine:String,
  country:String,
  city:String,
  pincode:String,
  status:Boolean,
  created:{type:Date ,'default':Date.now,index:true},
  layoutSchema:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'layout'
               }],
  amenity:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'amenity'
           },
  photos:[ {type:mongoose.Schema.Types.ObjectId,
          ref:'photo'} ],
  policy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'policy'
         },

  payment:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'payment'
          }

});

var property=mongoose.model('property',propertySchema);


// amenities schema
var amenitySchema= new mongoose.Schema({
   internet:Boolean,
   parking:Boolean,
   requested:{
     ac:Boolean,
     bath:Boolean,
     private_bathroom:Boolean,
     spa:Boolean,
     tv:Boolean,
     kettle:Boolean,
     balcony:Boolean,
     view:Boolean,
     terrace:Boolean,
   },
   bathroom:{
     toiletPaper:Boolean,
     hairdryer:Boolean,
     slippers:Boolean,
   },
   media:{
     computer:Boolean,
     game_console:Boolean,
     cable_channel:Boolean,
     cd_player:Boolean,
     dvd_player:Boolean,
     fax:Boolean,
     telephone:Boolean,
     blu_ray_player:Boolean,
     video:Boolean,
   },
   services:{
     lounge:Boolean,
     alarm_clock:Boolean,
     wake_up_service:Boolean,
     towel:Boolean,
     sheets:Boolean,

   },
   entertainment:{
     baby_safety_gates:Boolean,
     Board_game:Boolean,
     Books:Boolean,
     socket_cover:Boolean
   },
   views:{
     balcony:Boolean,
     Patio:Boolean,
     view:Boolean,
     terrace:Boolean,
     city_view:Boolean,
     garden_view:Boolean,
     lake_view:Boolean,
     landmark_view:Boolean,
     mountain_view:Boolean,
     pool_view:Boolean,
     river_view:Boolean,
     sea_view:Boolean,
   },
   foods:{
     dinning_area:Boolean,
     dinning_table:Boolean,
     Barbecue:Boolean,
     Stovetop:Boolean,
     toaster:Boolean,
     microwave:Boolean,
     refrigrator:Boolean,
     coffee_Maker:Boolean
   },
   room:{
     clothes_rack:Boolean,
     drying_rack:Boolean,
     fold_up_bed:Boolean,
     sofa_bed:Boolean,
     ac:Boolean,
     wardrobe:Boolean,
     carpeted:Boolean,
     Dressing_room:Boolean,
     fan:Boolean,
     fireplace:Boolean,
     heating:Boolean,
     connected_room:Boolean,
     iron:Boolean,
     ironing_facility:Boolean,
     mosquito_net:Boolean,
     private_entrance:Boolean,
     sofa:Boolean,
     sounfproofing:Boolean,
     seating_area:Boolean,
     trouser_press:Boolean,
     desk:Boolean,
     hypoallergenic:Boolean,
     cleaning_products:Boolean,
     electric_blankets:Boolean

   }
});

var amenity=mongoose.model('amenity',amenitySchema);

//photo schema
var photoSchema= new mongoose.Schema({
   photodata:String,
});

var photo=mongoose.model('photo',photoSchema);


//layout and pricing schema
var layoutSchema= new mongoose.Schema({
 roomType:String,
 room_name:String,
 custom_name:String,
 quantity:Number,
 guest:Number,
 basePrice:String
});

var layout=mongoose.model('layout',layoutSchema);


//policies schema
var policySchema= new mongoose.Schema({
  canCancel:String,
  cancelFee:String,
  check_in_from:Number,
  check_in_to:Number,
  check_out_from:Number,
  check_out_to:Number,
  accomodateChild:Boolean,
  pets:Boolean

});

var policy=mongoose.model('policy',policySchema);

//payments schema
var paymentSchema= new mongoose.Schema({
 cashPayment:Boolean,
 gst:Boolean,
 TradeName:String,
 gst_in:String,
 pan:String,
 state:String,
 invoice_name:String,
 certification:Boolean,
 agreement:Boolean
});

var payment=mongoose.model('payment',paymentSchema);
