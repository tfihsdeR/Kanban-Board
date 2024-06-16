import React from 'react'
import { SyncLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className="h-screen w-full mt-[-75px] flex justify-center items-center">
            <SyncLoader color='#fff' />
        </div>
    )
}

export default Loader
