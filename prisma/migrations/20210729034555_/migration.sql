-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachersToStudents" (
    "studentId" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    PRIMARY KEY ("studentId","teacherId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student.studentId_unique" ON "Student"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher.teacherId_unique" ON "Teacher"("teacherId");

-- AddForeignKey
ALTER TABLE "Student" ADD FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachersToStudents" ADD FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeachersToStudents" ADD FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
