const { schema, validaNome } = require("./assets/joi");

try {
  const valid1 = schema.validate({ username: "abc", birth_year: 1994 });
  const { value, error } = schema.validate({ username: "abc", birth_year: 1994 });
  const valid2 = validaNome.validate("Diogo");
  
  // console.log(valid1);
  console.log("Valor de value:\n", value, "\n\n\n", "Valor do error:\n", error.message);
  console.log(valid2.error.message);
} catch (error) {
  console.log(error);
}