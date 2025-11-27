"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Add console log for register button click
  const handleRegisterClick = () => {
    console.log("Register button clicked");
    signIn("google");
  };

  const handleSignInClick = () => {
    signIn("google");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm m-3 max-w-7xl mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li><Link href="/addproduct">Product</Link></li>
            <li><Link  href="/aboutus">About us</Link></li>
          </ul>
        </div>
        <Link href="https://my-nextjs-server-sigma.vercel.app/" className="btn btn-ghost text-xl">
        <img src="https://99grid.com/cdn/shop/files/saffasfasf_100x@2x.png?v=1652710673" alt="" className="h-[60px] w-[60px]"/>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link  href="/allproduct">Product</Link></li>
          <li><Link  href="/aboutus">About us</Link></li>
        </ul>
      </div>
      
      <div className="navbar-end">
        {loading ? (
          <div className="skeleton h-8 w-20"></div>
        ) : session ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <div className="flex items-center space-x-2">
                {session.user?.image ? (
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={session.user.image} alt={session.user.name} />
                    </div>
                  </div>
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span className="text-xs">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
                <span className="hidden sm:inline">{session.user?.name || session.user?.email}</span>
              </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow">
              <li><Link  href="/myprofile">Profile</Link></li>
              <li><Link  href="/addproduct">Add Product</Link></li>
              <li><Link href="/manageproduct">Manage Product</Link></li>
              <li><button onClick={() => signOut()}>Sign Out</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <button 
              className="btn btn-outline"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <button 
              className="btn btn-primary bg-gray-700"
              onClick={handleRegisterClick}
            >
              Register with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}