import axios from "axios";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { Backend_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const usernameRef = useRef<any>();
        const passwordRef = useRef<any>();
        const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${Backend_URL}/api/v1/signup`,{
            
                username,
                password
        })
        navigate("/signin")
        alert("You have signed up")
    }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className=" bg-white rounded-xl border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password"/>
        <div className="flex justify-center pt-4">
        <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} loading={false}/>
        </div>
        

        </div>
        
        


    </div>
  )
}
