import bcrypt from "bcryptjs";

const storedHash = "$2b$10$BVfb4fQ9VL32lfVOWR7I.enpl47f69c0PGzXlbkOVmVcfhaZzsaCG";
const password = "ChangeMe123!";

async function test() {
  try {
    const result = await bcrypt.compare(password, storedHash);
    console.log("Result:", result);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
