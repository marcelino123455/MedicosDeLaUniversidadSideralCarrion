
export const fetchPictures = async () =>{
    const response = await fetch('https://picsum.photos/v2/list')
    console.log("response: ", response)
    return response.json()
}