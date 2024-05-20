var appointment = require("../models/Appointment");
var mongoose = require("mongoose");
var AppointmentFactory = require('../factories/AppointmentFactory');

const Appo = mongoose.model("Appointment",appointment);

class AppointmentService {

    async Create(name, email, cpf, description, date, time){
        
        var newAppo = new Appo({
            name,
            email,
            cpf,
            description,
            date,
            time,
            finished:false
        });

        try{
            await newAppo.save();
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }



    async GetAll(showFinished){

        if(showFinished){

            return await Appo.find();

        }else{


            var appos = await Appo.find({'finished': false});

            var appointments = [];

            appos.forEach(appointment=>{

                    appointments.push(AppointmentFactory.Build(appointment));

            });

            return appointments;
        }
    }

    async GetById(id){
        try {

            var event = await Appo.findOne({'_id':id});
            return event;
            
        } catch (error) {
            console.log(err);
            
        }
    }

    async Finish(id){
        try {
            await  Appo.findByIdAndUpdate(id,{finished:true});
            return true;
        } catch (error) {
            return false;
            console.log(error);
        }
    }


    async Search(query){
   
      try{
        
          var appos = await Appo.find().or([{email: query},{cpf: query}]);
          return appos;

      } catch(error){

         console.log(error);
         return [];
      }
    
      




    }








}

module.exports = new AppointmentService();