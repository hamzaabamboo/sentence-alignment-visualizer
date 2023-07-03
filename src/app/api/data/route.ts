import { readdir } from "fs/promises";
import { join } from "path";

export async function GET(request: Request) {
    const files = await readdir(join("../../../data"))
    return files
}