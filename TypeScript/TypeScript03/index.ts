class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  displayDetails(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}`);
  }
}

class Student extends Person {
  studentId: number;
  course: string;
  semester: number;

  constructor(
    name: string,
    age: number,
    studentId: number,
    course: string,
    semester: number
  ) {
    super(name, age);
    this.studentId = studentId;
    this.course = course;
    this.semester = semester;
  }

  displayDetails(): void {
    super.displayDetails();
    console.log(
      `Student ID: ${this.studentId}, Course: ${this.course}, Semester: ${this.semester}`
    );
  }
}

class Staff extends Person {
  staffId: number;
  department: string;
  position: string;

  constructor(
    name: string,
    age: number,
    staffId: number,
    department: string,
    position: string
  ) {
    super(name, age);
    this.staffId = staffId;
    this.department = department;
    this.position = position;
  }

  displayDetails(): void {
    super.displayDetails();
    console.log(
      `Staff ID: ${this.staffId}, Department: ${this.department}, Position: ${this.position}`
    );
  }
}

const student1 = new Student("Alice", 20, 101, "Computer Science", 4);
const student2 = new Student("Bob", 22, 102, "Mathematics", 6);

const staff1 = new Staff("Dr. Smith", 45, 201, "Physics", "Professor");
const staff2 = new Staff("Ms. Johnson", 38, 202, "Administration", "Manager");

console.log("Student Details:");
student1.displayDetails();
student2.displayDetails();

console.log("\nStaff Details:");
staff1.displayDetails();
staff2.displayDetails();
