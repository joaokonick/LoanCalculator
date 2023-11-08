import  {useState, useEffect} from "react";

export default function useData() {
    const [data, setData] = useState(null)
    
    useEffect(()=> {
        async function fetchData() {       
            try {
                const req = await fetch("https://api.kanye.rest");

                if (req.ok) {
                    const res = await req.json()
                    setData(res.quote)
                } else {
                    console.log("Erro");
                }

            } catch (error) {
                console.log(error);
            }
        }

        fetchData()

    },[])

    return data

} 
