
import CrossIcon from "../icons/CrossIcon";
import Input from "./Input";
import { Button } from "./Button";
import { useRef, useState } from "react";
import { Backend_URL } from "../config";
import axios from "axios";
enum ContentType {
    Youtube = "Youtube",
    Twitter = "Twitter",  
  }
  
export default function CreateContentModel({ open, onClose }) {

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    
    const [type, setType] = useState(ContentType.Youtube);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${Backend_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }

        })
        onClose();

    }
    // 
    return (
        <div>
            {open && (<div>
                <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">

                </div>

                <div className="w-screen h-screen  fixed top-0 left-0  flex justify-center ">
                    <div className="flex flex-col justify-center">
                        <span className="bg-white opacity-100 p-4 rounded fixed ">
                            <div className="flex justify-end">
                                <div onClick={onClose}>
                                    <CrossIcon />
                                </div>
                            </div>
                            <div>
                                <Input ref={titleRef} placeholder={"Title"} />
                                <Input ref={linkRef} placeholder={"Link"} />
                            </div>
                            <h1>Type</h1>
                            <div className="flex gap-4 justify-center pb-2 items-center">
                                <Button
                                    text="Youtube"
                                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Youtube)}
                                />
                                <Button
                                    text="twitter"
                                    variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Twitter)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={addContent} variant="primary" text="Submit">
                                </Button></div>

                        </span>
                    </div>
                </div>
                {/* <div className="flex flex-col justify-center">
                        <span className="bg-white opacity-100 p-4 rounded fixed top-0">
                            <div className="flex justify-end">
                                <div onClick={onClose}>
                                    <CrossIcon />
                                </div>
                            </div>
                            <div>
                                <Input ref={titleRef} placeholder={"Title"} />
                                <Input ref={linkRef} placeholder={"Link"} />
                            </div>
                            <h1>Type</h1>
                            <div className="flex gap-4 justify-center pb-2 items-center">
                                <Button
                                    text="Youtube"
                                    variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.Youtube)}
                                />
                                <Button
                                    text="X"
                                    variant={type === ContentType.X ? "primary" : "secondary"}
                                    onClick={() => setType(ContentType.X)}
                                />
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={addContent} variant="primary" text="Submit">
                                </Button></div>

                        </span>
                    </div> */}
            </div>)}
        </div>
    );
}
