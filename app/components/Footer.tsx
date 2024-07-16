import { IoLogoGooglePlaystore } from "react-icons/io5"
import { BsApple } from "react-icons/bs"
import { AiFillYoutube } from "react-icons/ai"
import { BiLogoFacebook } from "react-icons/bi"
import { Container } from "./providers"
import { listContentFooter, listOverviewFooter, listTitleFooter } from "@/utils"
import React from "react"

const Footer = () => {
  return (
    <div className="
        bg-secondary-blue-cus 
        w-full 
        text-white
      "
    >
      <Container>
        <div className="
            grid
            grid-cols-12
            py-10 
            gap-5
            justify-between
            transition-all
            duration-500
          "
        >
          {listTitleFooter.map((item, index) => (
            <React.Fragment key={index}>
              <div className="
                  lg:col-span-4
                  md:col-span-6
                  col-span-12
                  flex 
                  flex-col 
                  gap-5
                  text-base
                  transition-all 
                  duration-500
                "
              >
                <h1 className="
                    uppercase 
                    text-xl 
                    font-bold
                  "
                >
                  {item.title}
                </h1>
                {index === 0 ? (
                  listOverviewFooter.map((overview, odx) => (
                    <div className="space-x-1" key={odx}>
                      <span className="font-bold">{overview.label}</span>
                      <span>{overview.content}</span>
                    </div>
                  ))
                ) : (
                  listContentFooter.map((overview, idx) => (
                    <div className="space-x-1" key={idx}>
                      <span className="font-bold">{overview.label}</span>
                      <span>{overview.content}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="lg:flex-grow lg:block hidden" />
            </React.Fragment>
          ))}
          <div className="
              lg:col-span-2
              md:col-span-6
              col-span-12
              flex 
              mt-5
              transition-all 
              duration-500
            "
          >
            <div className="
                relative 
                flex 
                flex-col 
                gap-5
              "
            >
              <h1 className="font-semibold text-xl text-gray-300">
                Tải ứng dụng
              </h1>
              <button className="
                  relative 
                  flex 
                  flex-row 
                  flex-shrink-0
                  bg-white 
                  text-secondary-blue-cus
                  rounded-md 
                  gap-2 
                  items-center 
                  px-4 
                  py-2
                  whitespace-nowrap
                "
              >
                <div className="flex">
                  <IoLogoGooglePlaystore size={30} />
                </div>
                <div className="
                    flex 
                    flex-col 
                    text-left
                  "
                >
                  <h2 className="uppercase text-xs">
                    get it on
                  </h2>
                  <h1 className="text-lg font-semibold">
                    Google Play
                  </h1>
                </div>
              </button>
              <button className="
                  relative 
                  flex 
                  flex-row 
                  flex-shrink-0
                  bg-white
                  text-secondary-blue-cus
                  rounded-md 
                  gap-2 
                  items-center 
                  px-4 
                  py-2
                  whitespace-nowrap
                "
              >
                <div className="flex">
                  <BsApple size={30} />
                </div>
                <div className="
                    flex 
                    flex-col 
                    text-left
                  "
                >
                  <h2 className="uppercase text-xs">
                    download on the
                  </h2>
                  <h1 className="text-lg font-semibold">
                    App Store
                  </h1>
                </div>
              </button>
              <div className="
                  flex 
                  flex-row 
                  mt-5 
                  gap-5
                "
              >
                <div className="
                    rounded-full 
                    bg-transparent 
                    border-2 
                    border-white 
                    p-2 
                    cursor-pointer
                  "
                >
                  <BiLogoFacebook size={34} />
                </div>
                <div className="
                    rounded-full 
                    bg-transparent
                    border-2 
                    border-white 
                    p-2 
                    cursor-pointer
                  "
                >
                  <AiFillYoutube size={34} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container >
    </div >
  )
}

export default Footer