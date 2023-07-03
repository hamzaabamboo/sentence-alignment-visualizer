"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const FilesList = () => {
    const {data} = useQuery(['fetch-files'], async () => {
        const res = await axios.get("/api/list-files");
        return res.data as { files: string[] };
      })
      
    return <>
      <ul>
        {data?.files?.filter(file => file.includes("english")).map((data) => <li key={data}><a href={'/view/' + (data.split("-")[1]?.split(".")[0] ?? '000')}>{data}</a></li>)}
        </ul>
    </>
}
