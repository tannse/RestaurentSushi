"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { database, auth } from "../firebase/config";
import { collection } from "firebase/firestore";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stateLogin, setStateLogin] = useState(false);
    const [userLogin, setUserLogin] = useState("wellcome");
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const HandleSignInSubmit = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault();
        setStateLogin(false);
        try {
            const res = await signInWithEmailAndPassword(email, password);

            if (res) {
                setUserLogin("success");
                setTimeout(() => {
                    router.push("/");
                }, 1000);
                setStateLogin(true);
            } else {
                setUserLogin("failed");
                setStateLogin(false);
            }
        } catch (error) {
            setUserLogin("failed");
            setStateLogin(false);
        }
    };

    return (
        <section className="mt-8 pb-4 ">
            <h1 className="text-center text-white">Login</h1>

            {userLogin === "wellcome" && (
                <>
                    <p className="text-center my-4 text-white">
                        Wellcome to Kiyora , please login your account under.
                    </p>
                </>
            )}
            {userLogin === "success" && (
                <>
                    <p className="text-center my-4 text-white">
                        Login Success please wait few second will move to next
                        page{" "}
                    </p>
                </>
            )}
            {userLogin === "failed" && (
                <>
                    <p className="text-center my-4 text-white">
                        Oops something went wrong please check again ^^
                    </p>
                </>
            )}
            <form
                onSubmit={HandleSignInSubmit}
                className=" w-full  flex flex-col items-center"
            >
                <input
                    className="w-[20rem]"
                    onKeyDown={() => {
                        setUserLogin("wellcome");
                    }}
                    type="email"
                    placeholder="email"
                    name="email"
                    disabled={stateLogin}
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input
                    className="w-[20rem]"
                    onKeyDown={() => {
                        setUserLogin("wellcome");
                    }}
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    disabled={stateLogin}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </section>
    );
}
