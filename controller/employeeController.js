const  data={
    employees : require('../model/employee.json'),
    setEmployee:function (data){ this.employees = data}
};

const getAllEmployee = (req,res)=>{
    res.json(data.employees);
}
const createNewEmployee =(req,res)=>{
    const newEmployee ={
        id : data.employees[data.employees.length -1].id + 1|| 1,
        firstname: req.body.firstname,
        lastname : req.body.lastname
    }
    if(!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({ 'message' : 'First and last name are requesed '});
    }
    data.setEmployee([...data.employees,newEmployee])
    // console.log(
    //     "emp", data.employees
    // );
    res.status(201).json(data.employees)
}
const updateEmpolyee =(res,req)=>{
    console.log("id", data.employees);
    const emid =parseInt(req.body);
    const employee= data.employees.find(emp=> emp.id === emid); 
    if(!employee){
        return res.status(400).json({ 'message' : `Employee ID ${ req.body.id} not found`});
    }
    if(req.body.firstname) employee.firstname =req.body.firstname;
    if(req.body.lastname) employee.lastname =req.body.lastname;
    const filterArray =data.employees.filter(emp=> emp.id !== parseInt(req.body.id));
    const unsortedArray =[...filterArray,employee];erAr
    data.setEmployee(unsortedArray.sort((a,b)=> a.id >b.id ? 1 : a.id< b.id ?-1 :0));
    res.json(data.employees)
    
}
const deleteEmpolyee = (req,res)=>{
    const employee= data.employees.find(emp=> emp.id !== parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({ 'message' : `Employee ID ${ req.body.id} not found`});
    }
    const filterArray =data.employees.filter(emp=> emp.id !== parseInt(req.body.id));
    data.setEmployee([...filterArray]);
    res.json(data.employees);

}
const getEmployee = (res,req)=>{
    const employee= data.employees.find(emp=> emp.id !== parseInt(req.body.id));
    if(!employee){
        return res.status(400).json({ 'message' : `Employee ID ${ req.body.id} not found`});
    }
    res.json(employee);
}
module.exports ={
    getAllEmployee,
    createNewEmployee,
    updateEmpolyee,
    deleteEmpolyee,
    getEmployee
}