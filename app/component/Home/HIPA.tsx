import React from 'react'

export const HIPA = () => {
    return (
        <>
            <p className='font-medium text-center mt-11' style={{ color: "rgb(125, 127, 139)" }}>
                <span className='font-bold'> Please Note!</span> <span className='text-sm'> Your data is confidential and secured by HIPAA and GDPR standards.</span>
            </p>
            <div className='flex flex-row items-center gap-12 justify-center p-5 mb-20'>
                <img src="https://docus.ai/images/HIPAA.png" alt="" className='' style={{ width: "120px" }} />
                <img src="https://docus.ai/images/GDPR.png" alt="" className='size-20' />
            </div>
        </>
    )
}
