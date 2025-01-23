var appName = process.argv[2];

switch (appName) {
  case "square":
    var qty = parseFloat(process.argv[3]);
    const squareArea = qty * qty;
    break;
  case "rectangle":
    var length = parseFloat(process.argv[4]);
    var breadth = parseFloat(process.argv[5]);
    const rectArea = length * breadth;
    break;
  case "circle":
    var radius = parseFloat(process.argv[6]);
    const circle = 3.14 * radius * radius;
    break;

  default:
    break;
}
