"use client"

import { useContext, useEffect } from "react"
import { Access, Logo, NavLink } from "./navbarPC";
import { IsMobileAccess, IsMobileLogo, IsMobileNavLink } from "./navbarMobile"
import { GlobalContext } from "@/contexts";
import SearchBar from "./SearchBar";
import { AxiosClient } from "@/services";
import useSWR from "swr";
import { Notify } from "@/types";

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const Navbar = () => {
  const { setShowMenu, showMenu, user, setIsLoadingNotify, setListNotify } = useContext(GlobalContext) || {}

  const handleShowMenu = () => {
    if (setShowMenu)
      setShowMenu(!showMenu);
  }

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showMenu])

  const { data: listPostForUser, isLoading, mutate } = useSWR<Notify>(user && user.id ? `/api/users/${user.id}/notification` : null, fetcher, { refreshInterval: 1000 })

  useEffect(() => {
    if (setIsLoadingNotify) setIsLoadingNotify(isLoading)

    if (listPostForUser) {
      if (setListNotify) setListNotify(listPostForUser.data)
    }
  })

  return (
    <div className="
          relative
          z-[999]
          lg:mb-16
          w-full
        "
    >
      <div className="lg:block hidden">
        <nav className="
            grid
            grid-cols-auto-auto
            grid-rows-cus
            bg-white
            items-center
            lg:px-24
            md:px-10
            px-4
            top-0
            py-2
            gap-x-4
            w-full
            fixed
            border-b-2
            border-solid
          "
        >
          <div className="flex">
            <Logo />
            <NavLink />
          </div>
          <div className="justify-self-end">
            <Access />
          </div>
        </nav>
      </div>
      <div className="block lg:hidden">
        <nav className="
            grid
            grid-cols-auto-auto
            grid-rows-cus
            bg-white
            border-b-2
            border-solid
            w-full
            items-center
            px-4
            md:px-10
            py-2
            top-0
          "
        >
          <div className="flex">
            <IsMobileLogo />
          </div>
          <div className="justify-self-end">
            <IsMobileAccess onclick={handleShowMenu} />
          </div>
          <div className="grid-row-start-2 grid-col-full">
            <SearchBar />
          </div>
        </nav>
        {showMenu &&
          <IsMobileNavLink />
        }
      </div>
    </div>
  )
}

export default Navbar