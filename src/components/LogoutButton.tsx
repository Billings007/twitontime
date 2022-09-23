import React from "react";
import {signOut} from 'next-auth/react'

interface SignOutProps{
    userToken: string | undefined | unknown;
}

export default function LogoutButton(userToken: SignOutProps) {
    //onSubmit here to logout using userToken?

    return (
        <div>
            <button
                onClick={() => signOut()}
                className="px-2 py-3 text-white border-2 border-white rounded-md"
            >
                Logout
            </button>
        </div>
    );
}