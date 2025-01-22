// number
let age: number = 25;
let largeNumber: bigint = 9007199254740991n;

// string
const username: string = "John Doe";

//boolean
const isStudent: boolean = true;

//arrays
const scores: number[] = [80, 90, 95];
const colors: string[] = ["red", "blue", "green"];
const answers: boolean[] = [true, false, false];

//tuple
const person: [string, number] = ["Alice", 30];

//enum
enum Direction {
  East,
  West,
  North,
  South,
}
const currentDirection: Direction = Direction.North;

//void
const logMessage = (message: string): void => {
  console.log(message);
};
logMessage("Welcome to TypeScript");

// null and undefined
const emptyValue: null = null;
const notAssigned: undefined = undefined;

// type and interface
interface Person {
  username: string;
  age: number;
  id: number;
  phone: number;
  address: string;
  isResdental: boolean;
}

type User = {
  name: string;
  age: number;
  id: number;
  isAdmin: boolean;
};
