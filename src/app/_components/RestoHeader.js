"use client"
import Link from "next/link"
import { useRouter,usePathname } from "next/navigation";
import { useEffect, useState } from "react"

const RestoHeader = () => {

  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant")
  }
  useEffect(() => {
    let data = localStorage.getItem("restaurantUser")
    if (!data && pathName == '/restaurant/dashboard') {
      router.push("/restaurant")
      
    }
    else if (data && pathName == '/restaurant') {
      router.push("/restaurant/dashboard")
    }
    else {
      setDetails(JSON.parse(data))
    }
  }, [])
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: 100 }} src="/food-delivery.jpg"></img>
      </div>
      <div>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>

          
          {
            details && details.email ?
            <>
            <li><button onClick={handleLogout}>Logout</button></li>
            <li><Link href="/">Profile</Link></li> 
            </>
            : <li>
              <Link href="/">Login / SignUp</Link>
            </li>
          }
        </ul>
      </div>
    </div>
  )
}

export default RestoHeader