import Image from "next/image"
import SignUpForm from "../_components/SignUpForm"

function page() {
    return (
        <div className="flex w-screen justify-between bg-[#ffe6cd]">
            <div className="hidden md:flex w-[60%]">
                <div className="flex flex-col justify-between w-full pb-10 mb-20">
                    <div className="flex p-14 gap-4">
                        <div>
                            <Image
                                className="rounded-sm"
                                src="/icons/HealthHandshakeSquare.svg"
                                alt="Icon"
                                width={70}
                                height={70}
                            />
                        </div>
                        <div className="font-mono flex flex-col font-extrabold text-2xl justify-end">
                            <h1>Health</h1>
                            <h1>Handshake</h1>
                        </div>
                    </div>
                    <div className="w-[100%] flex flex-col items-center">
                        <div className="flex items-center">
                            <span className="text-4xl font-bold">
                                Health
                            </span>
                            <Image
                                src="/icons/handshake.png"
                                alt="handshake"
                                width={200}
                                height={200}
                            />
                            <span className="text-4xl font-bold">
                                Organizations
                            </span>
                        </div>
                        <span className="font text-2xl w-[30ch]">
                            Over{" "}
                            <span className="font-extrabold">
                                230
                            </span>{" "}
                            organizations have already
                            joined health handshake.
                        </span>
                    </div>
                    <div className="flex justify-end items-center mr-10">
                        <div className="font-semibold">
                            Join{" "}
                            <span className="font-bold underline underline-offset-1">
                                Health Handshake
                            </span>{" "}
                            today{" "}
                        </div>
                        <Image
                            src={"/icons/arrow.svg"}
                            width={150}
                            height={150}
                            alt="arrow"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center h-screen w-[40%] border-l-2 border-black">
                <SignUpForm />
            </div>
        </div>
    )
}

export default page
