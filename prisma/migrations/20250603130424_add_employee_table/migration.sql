-- CreateTable
CREATE TABLE "Employee" (
    "EmployeeId" BIGSERIAL NOT NULL,
    "EmployeeName" CHAR(200) NOT NULL,
    "Email" CHAR(200) NOT NULL,
    "Salary" DECIMAL(10,2) NOT NULL,
    "CreatedBy" BIGINT NOT NULL,
    "CreatedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedBy" BIGINT,
    "ModifiedOn" TIMESTAMP(3),
    "IsDelete" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("EmployeeId")
);
