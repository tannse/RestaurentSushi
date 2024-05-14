"use client";
import { useState, useEffect, createContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth, database } from "@/app/firebase/config";
import { Spin } from "antd";
import { ref, get } from "firebase/database";

export const AuthContext = createContext<{
    user: any;
    isAdmin: boolean;
} | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router: any = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setIsLoading(true);
            if (user) {
                const { displayName, email, uid, photoURL } = user;
                const userData = {
                    displayName,
                    email,
                    uid,
                    photoURL,
                };
                setUser(userData);
                localStorage.setItem("uid", uid);

                try {
                    const userRef = ref(database, `Profiles/${uid}`);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const additionalUserData = snapshot.val();
                        setUser((prevUser) => ({
                            ...prevUser,
                            ...additionalUserData,
                        }));

                        if (additionalUserData.profileUser.admin) {
                            setIsAdmin(true);
                        } else {
                            setIsAdmin(false);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }

                setIsLoading(false);

                if (redirectUrl) {
                    router.push(redirectUrl);
                    setRedirectUrl(null);
                }
            } else {
                setUser({});
                setIsAdmin(false);
                localStorage.removeItem("uid");

                // if (router.pathname !== "/login") {
                //     setRedirectUrl(router.pathname);
                //     router.push("/login");
                // }

                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router, redirectUrl]);

    return (
        <AuthContext.Provider value={{ user, isAdmin }}>
            {isLoading ? (
                <Spin
                    style={{
                        position: "fixed",
                        inset: 0,
                        color: "white",
                    }}
                />
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
