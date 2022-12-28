import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { toast, Flip } from "react-toastify"

const Account = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const router = useRouter()

    const [user, setUser] = useState(null)
    useEffect(() => {
        if (!isLoggedIn) {
            router.push("/login")
        } else {
            const getUser = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/getUser`, {
                        method: 'GET',
                        headers: {
                            "Content-type": "application/json",
                            "auth-token": localStorage.getItem("authToken")
                        },
                    })
                    const json = await response.json()
                    setUser(json.user)
                } catch (error) {
                    toast.error("Cannot get user details", {
                        position: toast.POSITION.BOTTOM_CENTER,
                        transition: Flip,
                        autoClose: 2000
                    });
                }
            }

            getUser()
        }
    }, [])

    const handleEmailChange = (e) => {
        setUser({ ...user, email: e.currentTarget.value })
    }

    const handleSaveProfile = async (e) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_URI}/updateUser`, {
                method: "PUT", 
                headers: {
                    "Content-type": "application/json",
                    "auth-token": localStorage.getItem("authToken")
                },
                body: JSON.stringify(user)
            })
            if(response.status === 200) {
                toast.success("Profile Saved", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    transition: Flip,
                    autoClose: 2000
                });
            } else {
                toast.error("Could not save profile", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    transition: Flip,
                    autoClose: 2000
                });
            }
        } catch (error) {
            toast.error("Could not save profile", {
                position: toast.POSITION.BOTTOM_CENTER,
                transition: Flip,
                autoClose: 2000
            });
        }
    }

    return (
        <>{
            isLoggedIn && user &&
            <div class="container mx-auto mt-8">

                <h1 class="text-2xl font-bold text-gray-700 px-6 md:px-0">Account Settings</h1>
                <ul class="flex border-b border-gray-300 text-sm font-medium text-gray-600 mt-3 px-6 md:px-0">
                    <li class="mr-8 text-gray-900 border-b-2 border-gray-800"><a href="#" class="py-4 inline-block">Profile Info</a></li>
                </ul>
                <form action="{{ route('profile.save') }}" method="POST" enctype="multipart/form-data">

                    <div class="w-full bg-white rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
                        <div class="w-1/3 bg-gray-100 p-8 hidden md:inline-block">
                            <h2 class="font-medium text-md text-gray-700 mb-4 tracking-wide">Customer Profile</h2>
                            <p class="text-xs text-gray-500">Update your basic profile information such as Email Address, Name, and Image.</p>
                        </div>
                        <div class="md:w-2/3 w-full">
                            <div class="py-8 px-16">
                                <label for="name" class="text-sm text-gray-600">Name</label>
                                <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text" value={user.name} name="name" readonly />
                            </div>
                            <hr class="border-gray-200" />
                            <div class="py-8 px-16">
                                <label for="email" class="text-sm text-gray-600">Email Address</label>
                                <input class="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="email" name="email" value={user.email} onChange={handleEmailChange} />
                            </div>
                            <hr class="border-gray-200" />
                        </div>

                    </div>
                    <div class="p-16 py-8 bg-gray-300 rounded-b-lg border-t border-gray-200 flex justify-end">
                        <button type="button" class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800" onClick={handleSaveProfile}>Save Profile</button>
                    </div>
                </form>
            </div>
        }
        </>
    )
}

export default Account