import ShareIcon from "../icons/ShareIcon";

interface CardProps {
    title: string;
    link: string;
    type: "Twitter" | "Youtube"
}

export default function Card({ title, link, type }: CardProps) {
    return (<div>
        <div className='p-4 bg-white rounded-md border-grey-200 max-w-72  border'>
            <div className="flex justify-between">
                <div className="flex items-center text-md" >
                    <div className="text-grey-500 pr-2">
                        <ShareIcon />
                    </div>
                    {title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-grey-500">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>

                    </div>
                    <div className="text-grey-500">
                        <ShareIcon />
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {type === "Youtube" && (<iframe
                    className="w-full"
                    height="200"
                    src={link.replace("watch", "embed").replace("?v=", "/")}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>


                )}

                {type == "Twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}


            </div>

        </div>
    </div>

    )
}
