import { fetchPictures } from '@/utils/data'

//Server component geteamos la info desde el servidor para luego hidratar 

export default async function Galería() {
    const pictures = await fetchPictures()
    console.log("pictures: r")
    console.log(pictures)
  return (
    <div>
      {pictures.map((picture, index) => (
        <div key={index}>{picture.id}</div>
      ))}
    </div>
  )
}
