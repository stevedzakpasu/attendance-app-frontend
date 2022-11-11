queue = ["ok", "yes", "maybe"];

console.log(typeof queue);
console.log(JSON.stringify(queue));
console.log(typeof JSON.stringify(queue));
console.log(JSON.parse(JSON.stringify(queue)));
console.log(typeof JSON.parse(JSON.stringify(queue)));
