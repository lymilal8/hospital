const express = require('express');
const fs = require('fs');
const router=express.Router();
const dataPath = './hospital.json';
router.use(express.json());
router.use(express.urlencoded({extended: true}));

//Get operation
router.get('/',(req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read data file.' });
        }
        
        const hospitals = JSON.parse(data);
        res.json(hospitals);
      });
  
})

//post operation
router.post('/add',(req, res) => {

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read data file.' });
        }
        
        const hospitals = JSON.parse(data);
        const newHospital = req.body;
        
        // if(Array.isArray(hospitals)){
        //     hospitals.push(newHospital);
        // }else{
        //     console.log("Given data is not an array")
        // }
        hospitals.push(newHospital);
        fs.writeFile(dataPath, JSON.stringify(hospitals, null, 2), 'utf8', (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to write data file.' });
          }
          
          res.status(201).json({ message: 'Hospital added successfully.' });
        });
      });
})

//update
router.put('/update/:id', (req, res) =>{
    const hospitalId = req.params.id;
    const updatedHospital = req.body;
    // console.log(hospitalId);
    // console.log(updatedHospital);

    fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read data file.' });
    }

    let hospitals = JSON.parse(data);
    const hospitalIndex = hospitals.findIndex(hospital => hospital.id === hospitalId);
    
    if (hospitalIndex === -1) {
      return res.status(404).json({ error: 'Hospital not found.' });
    }
    
    hospitals[hospitalIndex] = updatedHospital;
    
    fs.writeFile(dataPath, JSON.stringify(hospitals, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to write data file.' });
      }
      
      res.json({ message: 'Hospital updated successfully.' });
    });
  });
   
})

//delete
router.delete('/delete/:id', (req, res) =>{
    const hospitalId = req.params.id;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read data file.' });
    }

    let hospitals = JSON.parse(data);
    const hospitalIndex = hospitals.findIndex(hospital => hospital.id === hospitalId);

    if (hospitalIndex === -1) {
      return res.status(404).json({ error: 'Hospital not found.' });
    }

    hospitals.splice(hospitalIndex, 1);

    fs.writeFile(dataPath, JSON.stringify(hospitals, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to write data file.' });
      }

      res.json({ message: 'Hospital deleted successfully.' });
    });
  });
})
module.exports = router;