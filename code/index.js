const joiTest = require("./assets/joi");

try {
  const  valid1 = joiTest.validate({ username: "abc", birth_year: 1994 });
  
  console.log(valid1);
} catch (error) {
  console.log(error);
}