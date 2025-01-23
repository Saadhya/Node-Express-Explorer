var userName = process.argv[2];
var age = parseInt(process.argv[3]);
var basicSalary = parseFloat(process.argv[4]);

if (age <= 0) {
  console.log("invalid age, enter a valid age");
} else if (basicSalary <= 0) {
  console.log("invalid salary, enter a valid salary");
} else {
  const hra = (50 * basicSalary) / 100;
  const specialAllow = (30 * basicSalary) / 100;
  const pf = (12 * basicSalary) / 100;

  let grossSalary = basicSalary + hra + specialAllow - pf;
  let annualGrossSalary = 12 * grossSalary;

//   console.log("gross income of " + name + " is " + annualGrossSalary);
  console.log(`Annual gross income of ${userName} is ${annualGrossSalary}`);
}
