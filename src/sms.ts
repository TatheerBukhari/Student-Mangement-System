#! /usr/bin/env node
import inquirer from 'inquirer';

class Student {
    name: string;
    studentId: number;
    courses: string[];
    balance: number;

    constructor(name: string, courses: string[]) {
        this.name = name;
        this.studentId = this.generateStudentId();
        this.courses = courses;
        this.balance = 0;
    }

    private generateStudentId(): number {
        return Math.floor(10000 + Math.random() * 90000);
    }
}

function enrollStudent(student: Student, courses: string[]): void {
    student.courses.push(...courses);
}

function showStatus(student: Student): void {
    console.log('Student Name:', student.name);
    console.log('Student ID:', student.studentId);
    console.log('Courses Enrolled:', student.courses.join(', '));
    console.log('Balance: $', student.balance);
}

async function promptStudentInfo(): Promise<{ name: string }> {
    return inquirer.prompt([
        {
            name: 'name',
            message: 'Enter student name:',
        },
    ]);
}

async function promptCourseEnrollment(): Promise<string[]> {
    const answers = await inquirer.prompt([
        {
            name: 'courses',
            message: 'Enter courses to enroll (comma-separated):',
        },
    ]);
    return answers.courses.split(',').map((course: string) => course.trim());
}

async function promptPayment(): Promise<number> {
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
        const studentInfo: { name: string } = await promptStudentInfo();
        const student = new Student(studentInfo.name, []);

        console.log('New student added:');
        showStatus(student);

        const courses: string[] = await promptCourseEnrollment();
        enrollStudent(student, courses);

        console.log('Student enrolled in courses:');
        showStatus(student);

        const payment: number = await promptPayment();
        student.balance -= payment;

        console.log('Payment processed. Updated student status:');
        showStatus(student);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();