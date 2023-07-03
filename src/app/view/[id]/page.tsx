import { FileViewer } from "@/components/FileViewer";
import { readFile } from "fs/promises";
import { join } from "path";

const getData = async (id: string) => {
const path = join(__dirname,"../../../../../data")
const files = id === "000" ? ["english.txt", "japanese.txt", "align.txt"] : ["english-" + id +'.txt', "japanese-" + id +'.txt', "align-" + id + ".txt"]
  const data = files.map(f => readFile(join(path,f)).then(f => f.toString()))
  return await Promise.all(data)
}
export default async function ViewData({ params }: { params: { id: string } }) {
    const id = params.id;
    const [english, japanese, align] = (await getData(id)).map((d: string) => d.split("\n"))    

  return (
   <FileViewer english={english} japanese={japanese} align={align} />
  )
}
