"use client";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleFormSubmit = async (ev: { preventDefault: () => void }) => {
        ev.preventDefault();
        setCreatingUser(true);
        setUserCreated(false);
        setError(false);
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setEmail(""), setPassword(""), setUserCreated(true);
            setTimeout(() => {
                router.push("/profile");
            }, 1000);
        } catch (error: any) {
            if (error.code === "auth/email-already-in-use") {
                setError(true);
            }
        } finally {
            setCreatingUser(false);
        }
    };

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            {userCreated && (
                <p className="text-white text-2xl text-center">
                    Congratulations! You have successfully created an account.
                </p>
            )}
            {error && (
                <p className="text-white text-2xl text-center">
                    Account already exists, please choose another name
                </p>
            )}
            <form
                className="block max-w-xs mx-auto"
                onSubmit={handleFormSubmit}
            >
                <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
            </form>
        </section>
    );
}
