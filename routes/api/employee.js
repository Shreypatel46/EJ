const express =require('express');
const routes =express.Router();
const path =require('path');
const employeeController =require('../../controller/employeeController');



routes.route('/')
    .get(employeeController.getAllEmployee)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmpolyee)
    .delete(employeeController.deleteEmpolyee);
routes.route('/:id')
    .get(employeeController.getEmployee)

module.exports= routes;