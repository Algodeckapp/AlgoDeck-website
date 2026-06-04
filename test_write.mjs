import fs from 'fs-extra';
import path from 'path';

try {
  const filePath = path.join(process.cwd(), 'data', 'test.json');
  await fs.writeFile(filePath, JSON.stringify({ test: 'data' }, null, 2), 'utf-8');
  console.log("Write success");
} catch (error) {
  console.error("Write failed:", error);
}
