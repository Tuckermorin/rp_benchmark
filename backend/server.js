const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');

mongoose.connect('mongodb+srv://Sportsmorebetter:I19O4xTwQWlLdO6A@cluster0.wsttk.mongodb.net/rp_benchmark?retryWrites=true&w=majority&appName=Cluster0', {
    dbName: "rp_benchmark"
});

//Project schema
const RecordKeeper = mongoose.model('RecordKeeper', {
    name: {
    type: String,
    required: true
    },
    num_participants: {
    type: Number,
    required: true
    },
    one_time_cost: {
    type: Number,
    required: true
    },
    base_fee: {
    type: Number,
    required: true
    },
    asset_fee: {
    type: Number,
    required: true
    },
    participant_fee: {
    type: Number,
    required: true
    },
    advisor_base_fee: {
    type: Number,
    required: true
    },
    advisor_fee: {
    type: Number,
    required: true
    },
    other_fees: {
    type: Number,
    default: 0
    },
    total_cost: {
    type: Number
    }
});

const app = express ();
app.use(express.json()); 
app.use(multer().none());
app.use(cors()); //Enables cors

app.get('/', function (request, response){
    response.send('Benchmark is running...');
});

//Get all record keepers
app.get('/recordkeepers', function(request, response) {
    console.log('Client is requesting all record keepers.');

    RecordKeeper.find().then(function(recordKeepers) {
        response.json(recordKeepers);
    }).catch(function (error) {
        console.error('Error fetching record keepers:', error);
        response.sendStatus(500);
    });
});

// Get a single record keeper
app.get('/recordkeepers/:id', function(request, response) {
    console.log('Client is requesting record keeper with ID:', request.params.id);

    RecordKeeper.findById(request.params.id).then(function(recordkeeper) {
        if (!recordkeeper) {
            console.error('Record Keeper not found');
            response.sendStatus(404);
        }else {
            response.json(recordkeeper);
        }
    }).catch(function (error){
        console.error('Error fetching record keeper:', error);
        response.sendStatus(500);
    });
});

// Post a new record keeper
app.post('/recordkeepers', function(request, response) {
    console.log('Client is adding a new record keeper:', request.body);
    console.log("Received form-data:", request.body);
  
    const newRecordKeeper = new RecordKeeper({
      name: request.body.name,
      num_participants: request.body.num_participants,
      one_time_cost: request.body.one_time_cost,
      base_fee: request.body.base_fee,
      asset_fee: request.body.asset_fee,
      participant_fee: request.body.participant_fee,
      advisor_base_fee: request.body.advisor_base_fee,
      advisor_fee: request.body.advisor_fee,
      other_fees: request.body.other_fees || 0,
      total_cost: request.body.total_cost
    });
  
    newRecordKeeper.save()
      .then(function(savedKeeper) {
        // 1) If it saves successfully, return 201 + the keeper as JSON
        console.log("Successfully saved record keeper:", savedKeeper);
        response.status(201).json(savedKeeper);
      })
      .catch(function(error) {
        // 2) If there's a validation error or unknown error
        if (error.errors) {
          let errorMessages = {};
          for (let field in error.errors) {
            console.log('Error in field:', field);
            errorMessages[field] = error.errors[field].message;
          }
          // Send a 422 (Unprocessable Entity) with details
          response.status(422).json(errorMessages);
        } else {
          console.error('Unknown error saving record keeper:', error);
          response.sendStatus(500);
        }
      });
  });
  

// Put or edit a new record keeper
app.put('/recordkeepers/:id', function(request, response) {
    console.log('Client is updating record keeper with ID:', request.params.id);

    RecordKeeper.findByIdAndUpdate(request.params.id, request.body, {new: true})
    .then(function (updatedRecordKeeper) {
        if (!updatedRecordKeeper) {
            console.error('Record Keeper not found for update');
            response.sendStatus(404);
        } else {
            response.json(updatedRecordKeeper);
        }
    }).catch(function (error) {
        console.error('Error updating record keeper:', error);
        response.sendStatus(500);
    });
});

// Delete a record keeper
app.delete('/recordkeepers/:id', function(request, response){
    console.log('Client is deleting record keeper with ID:', request.params.id);

    RecordKeeper.findByIdAndDelete(request.params.id)
    .then(function (deletedRecordKeeper) {
        if(!deletedRecordKeeper) {
            console.error('Cannot delete record keeper that does not exist');
            response.sendStatus(404);
        } else {
            console.log('Record Keeper successfully deleted');
            response.status(200).json({ message: "Deleted successfully" });
        }
    }).catch(function (error){
        console.error('Error deleting record keeper:', error);
        response.sendStatus(500);
    });
});

app.listen(5000, function(){
    console.log('Server is running on port 5000...');
});


// The important thing is to learn what needs to be connected and where the documentation is
// use mozilla developer more
// MOST IMPORTANT: functions, variables, etc.
// Get familiar with the backend before moving one to external training programs

// steps to commit
// git add -A, adds all the items that I've changed.
// git commit -m "add message here"
// git push

//The backend webapp allows us to communicate with other servers

//TO RUN SERVER
// npm run dev