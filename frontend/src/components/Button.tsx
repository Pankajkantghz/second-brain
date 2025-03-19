import { ReactElement } from "react";

interface ButtonsProps{
    variant:"primary"| "secondary";
    text:string,
    startIcon: ReactElement,
    onClick?:()=>void,
    fullWidth?:boolean,
    loading?:boolean
}
const variantClasses = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-200 text-purple-400"
}
const deafaultStyles = "px-4 py-4 rounded-md font-light flex items-center"
export function Button({variant, text, startIcon, onClick, fullWidth, loading} :ButtonsProps){
    return <button onClick={onClick} className={variantClasses[variant]+" "+deafaultStyles+ `${fullWidth?" w-full justify-center items-center" : ""} ${loading?"opacity-50":""}`} disabled={loading}>
        <div className="pr-2">{startIcon}</div>{text}</button>

}