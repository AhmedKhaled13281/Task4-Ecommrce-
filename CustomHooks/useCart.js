import useSWR from "swr" 

export function useAddToCart (product) {
    const {mutate} = useSWR("/api/cartHandler")

    const addToCart = async () => {
        try{
            const result = await fetch("/api/cartHandler" , {
                method : "POST",
                body : JSON.stringify({action : "add" , product}),
                headers : {
                    "Content-Type": "application/json"
                }
            })
            const ff = await result.json()
            console.log(ff)
            mutate()
        }catch (err) {
            console.log(err)
        }
    }
    return addToCart
}


export function useRemoveFromCart (product) {
    const {mutate} = useSWR("/api/cartHandler")

    const addRemoveFromCart = async () => {
        try{
            const result = await fetch("/api/cartHandler" , {
                method : "POST",
                body : JSON.stringify({action : "remove" , product}),
                headers : {
                    "Content-Type": "application/json"
                }
            })

            mutate()
        }catch (err) {
            console.log(err)
        }
    }
    return addRemoveFromCart
}

export function useGetCart() {
    const { data } = useSWR("/api/cartHandler", fetcher);
  
    return data 
}