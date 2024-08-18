#!/usr/bin/env node

import inquirer from "inquirer";

class Student {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class Person {
  students: Student[] = [];

  addStudent(student: Student) {
    this.students.push(student);
  }

  getStudent(name: string): Student | undefined {
    return this.students.find((student) => student.name === name);
  }
}

const person = new Person();

const programStart = async () => {
  do {
    console.log("Welcome!");
    const answer = await inquirer.prompt({
      name: "select",
      type: "list",
      message: "Whom would you like to talk with?",
      choices: ["Staff", "Student", "Exit"],
    });

    switch (answer.select) {
      case "Staff":
        console.log("You approach the staff room. Please feel free to ask any question");
        break;
      case "Student":
        const studentName = await inquirer.prompt({
          name: "name",
          type: "input",
          message: "Please enter the student's name",
        });

        const existingStudent = person.getStudent(studentName.name);
        if (!existingStudent) {
          const newStudent = new Student(studentName.name);
          person.addStudent(newStudent);
          console.log(`Hello I am ${newStudent.name}. Nice to meet you!`);
          console.log("New Student added");
          console.log("Current student list:");
          console.log(person.students);
        } else {
          console.log(`Hello I am ${existingStudent.name}. Nice to see you again!`);
          console.log("Existing student list:");
          console.log(person.students);
        }
        break;
      case "Exit":
        console.log("Exiting the program...");
        process.exit(0);
      default:
        console.log("Invalid choice. Please try again.");
    }
  } while (true);
};

programStart();