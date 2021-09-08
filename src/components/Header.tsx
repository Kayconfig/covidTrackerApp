import React,{FC} from 'react'

interface Props{
    title:string,
}
const Header: FC<Props> = (props) =>{
    return (
        <div>
            <h1>{props.title}</h1>       
        </div>
    )
}

export default Header
