'use client'

import Link from "next/link"

const EditButton = ({slug}: {slug: string}) => {

    
    return(
            <Link className="bg-black border text-center w-25 p-2 text-white font-bold rounded-2xl" href={`/${slug}/edit`}>Edit post</Link>
    )
}

export default EditButton