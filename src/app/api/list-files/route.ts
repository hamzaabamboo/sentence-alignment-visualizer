import { readdir } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET(request: Request) {
    const files = await readdir(join(__dirname,"../../../../../data"))
    return NextResponse.json({ files})
}