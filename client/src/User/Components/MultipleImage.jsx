import React, { useState } from 'react'

export default function MultipleImage({ images }) {
    const [img, setImg] = useState(images[0] ? images[0] : null)




    const changeImage = (index) => {
        setImg(images[index])
    }

    return (
        <>

            <div className="container p-5" style={{width:"70%"}}>
                <img src={img} alt="" className="img-fluid mb-5" />


                <div className='d-flex align-items-center gap-2 bg-light border border-dark p-3 mb-1'>
                {
                    images?.map((val, key) =>
                        <div className={img == images[key] ? ('border border-dark p-2') : (null)} onClick={() => changeImage(key)} key={key}><img className=' img-fluid ' src={val} alt={`img-${key}`} />
                        </div>
                    )
                }
            </div>

            </div>


        </>
    )
}