import axios from "axios";
import { Button } from "../components/Button";
import Input from "../components/Input";
import { useRef } from "react";
import { Backend_URL } from "../config";
import { useNavigate } from "react-router-dom";


export default function Signin() {
    const usernameRef = useRef<any>();
        const passwordRef = useRef<any>();
        const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${Backend_URL}/api/v1/signin`,{
            
                username,
                password
        })
        alert("You have signed in");
        navigate("/dashboard");
        const jwt = response.data.token;
        localStorage.setItem("token",jwt);

    }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className=" bg-white rounded-xl border min-w-48 p-8">
        <Input ref = {usernameRef} placeholder="Username" />
        <Input ref = {passwordRef} placeholder="Password"/>
        <div className="flex justify-center pt-4">
        <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} loading={false}/>
        </div>
        

        </div>
        
        


    </div>
  )
}
