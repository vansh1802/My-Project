import React from "react";

// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }
  displayInfo() {
    return `Student: ${this.name}, Age: ${this.age}, Course: ${this.course}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
  displayInfo() {
    return `Teacher: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`;
  }
}

// React Component
export default function App() {
  const student1 = new Student("Alice", 20, "Computer Science");
  const teacher1 = new Teacher("Mr. Sharma", 40, "Mathematics");

  return (
    <div>
      <h2>Class Inheritance Example</h2>
      <p>{student1.displayInfo()}</p>
      <p>{teacher1.displayInfo()}</p>
    </div>
  );
}
