
export const fetchPictures = async () =>{
    const response = await fetch('https://pruebita')
    console.log("response: ", response)
    return response.json()
}
