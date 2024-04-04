"use client";
import Link from "next/link";
import Image from "next/image";
import HamburgerMenu from "@/components/layout/Header/Humburger";
import Cart from "@/components/icon/cart";

export default function Header() {
    return (
        <>
            <header className="hidden justify-between lg:flex items-center">
                <nav className=" w-[262px] flex ">
                    <Link className="text-[1rem]  text-orange-400" href={"./"}>
                        HEM
                    </Link>
                    <Link
                        className="text-[1rem] text-white ml-[34px]"
                        href={"./"}
                    >
                        MENY
                    </Link>
                    <Link
                        className="text-[1rem] text-white ml-[34px]"
                        href={"./"}
                    >
                        BLOG
                    </Link>
                    <Link
                        className="text-[1rem] text-white ml-[34px]"
                        href={"./"}
                    >
                        PAGE
                    </Link>
                    <Link
                        className="text-[1rem] text-white ml-[34px]"
                        href={"./"}
                    >
                        KONTACKT
                    </Link>
                </nav>
                <div className="w-[183px] ml-[7rem]">
                    <Image
                        objectFit="cover"
                        width={"180"}
                        height={"180"}
                        src={"/LogoKiyora.png"}
                        alt={"KIYORA"}
                    />
                </div>
                <div className=" items-center flex justify-between">
                    <Link
                        href={"/register"}
                        className="text-[1rem] font-semibold mr-4 text-white h-7 px-2 border-[2px] rounded-xl hover:shadow-2xl hover:scale-105 duration-300 transition-all hover:bg-orange-400 "
                    >
                        Booking table
                    </Link>

                    <Link
                        href={"/login"}
                        className="text-[1rem] font-semibold mr-4 text-white h-7 px-2 border-[2px] rounded-xl hover:shadow-2xl hover:scale-105 duration-300 transition-all hover:bg-orange-400 "
                    >
                        Login
                    </Link>
                    <Link
                        href={"/register"}
                        className="text-[1rem] font-semibold mr-4 text-white h-7 px-2 border-[2px] rounded-xl hover:shadow-2xl hover:scale-105 duration-300 transition-all hover:bg-orange-400 "
                    >
                        Register
                    </Link>
                    <Cart />
                </div>
            </header>
            <HamburgerMenu />
        </>
    );
}
