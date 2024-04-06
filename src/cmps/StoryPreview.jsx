// import { Link } from "react-router-dom";
// import { uploadImg } from "../services/cloudinary-service.js"
// import { useEffect } from 'react'

// export function StoryPreview({ story }) {
//     useEffect(() => {
//         stuff()
//         console.log('stam mashu')
//     }, [])
//     async function stuff() {
//         const img = await uploadImg()
//         console.log(img)
//     }


//     const { name, inStock, price } = story
//     return (
//         <section className="story-detail-preview">
//             <img src={uploadImg} alt="story"></img>
//             <h1>{name}</h1>
//             <h3>{price}$</h3>
//             <h3>{(inStock) ? 'In stock' : 'Not in stock'}</h3>
//         </section>
//     )
// }


import { Link } from "react-router-dom";
import { uploadImg } from "../services/cloudinary-service.js"
import { useEffect } from 'react'

export function StoryPreview({ story }) {
    useEffect(() => {
        stuff()
        console.log('stam mashu')
    }, [])
    async function stuff() {
        const img = await uploadImg()
        console.log(img)
    }


    const { name, inStock, price } = story
    return (
        <section className="story-detail-preview">
            <img src={uploadImg} alt="story"></img>
            <h1>{name}</h1>
            <h3>{price}$</h3>
            <h3>{(inStock) ? 'In stock' : 'Not in stock'}</h3>
        </section>
    )
}