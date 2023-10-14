#! /usr/bin/env node
import inquirer from 'inquirer';
class Student {
    constructor(name, courses) {
        this.name = name;
        this.studentId = this.generateStudentId();
        this.courses = courses;
        this.balance = 0;
    }
    generateStudentId() {
        return Math.floor(10000 + Math.random() * 90000);
    }
}
function enrollStudent(student, courses) {
    student.courses.push(...courses);
}
function showStatus(student) {
    console.log('Student Name:', student.name);
    console.log('Student ID:', student.studentId);
    console.log('Courses Enrolled:', student.courses.join(', '));
    console.log('Balance: $', student.balance);
}
async function promptStudentInfo() {
    return inquirer.prompt([
        {
            name: 'name',
            message: 'Enter student name:',
        },
    ]);
}
async function promptCourseEnrollment() {
    const answers = await inquirer.prompt([
        {
            name: 'courses',
            message: 'Enter courses to enroll (comma-separated):',
        },
    ]);
    return answers.courses.split(',').map((course) => course.trim());
}
async function promptPayment() {
    const answers = await inquirer.prompt([
        {
            name: 'amount',
            message: 'Enter amount to pay:',
        },
    ]);
    return parseFloat(answers.amount);
}
async function main() {
    try {
        const studentInfo = await promptStudentInfo();
        const student = new Student(studentInfo.name, []);
        console.log('New student added:');
        showStatus(student);
        const courses = await promptCourseEnrollment();
        enrollStudent(student, courses);
        console.log('Student enrolled in courses:');
        showStatus(student);
        const payment = await promptPayment();
        student.balance -= payment;
        console.log('Payment processed. Updated student status:');
        showStatus(student);
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}
main();
