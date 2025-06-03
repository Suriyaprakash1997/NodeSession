const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.create = async (req, res) => {
    try {
        const { employeeName, email, salary } = req.body;
        const result = await prisma.employee.create({
            data: {
                EmployeeName:employeeName,
                Email:email,
                Salary:salary,
                CreatedBy:1
            },
        });

        if (result) {
            res.status(200).json({status:1, message:"Employee saved"});
        }
        else {
            res.status(400).json({status:-1, message:"Employee not saved"});
        }
       
    } 
    catch (error) {
        throw new Error(error.message);
    }
};

exports.getAll = async(req, res)=>{
 try {
        const employees = await prisma.employee.findMany();

        if( employees && employees.length > 0 ){
              const employeeResponse = employees.map(employee => ({
            employeeId: Number(employee.EmployeeId),
            employeeName: employee.EmployeeName.toString().trim(),
            email: employee.Email.toString().trim(),
            salary:Number( employee.Salary)
        }));
             res.status(200).json({total:employeeResponse.length, rows: employeeResponse});
        }
        else{
            res.status(404).json({ message:"No records found" });
        }
       
    }
     catch (error) {
        throw new Error(error.message);
    }
}