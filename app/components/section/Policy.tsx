"use client"

import { listContentPolicy, listOverviewPolicy, listTitlePolicy } from "@/utils"
import { Container } from "../providers"
import { useEffect, useRef, useState } from "react"

const Policy = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(listTitlePolicy[0].label)
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null)
  const policyRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.id);
            setActiveSectionIndex(index);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    policyRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeSectionIndex !== null) {
      setSelectedPolicy(listTitlePolicy[activeSectionIndex].label);
    }
  }, [activeSectionIndex]);

  const handlePolicyChange = (policyName: string) => {
    setSelectedPolicy(policyName);
    scrollToPolicy(policyName);
  };

  const scrollToPolicy = (policyName: string) => {
    const policyIndex = listTitlePolicy.findIndex((policy) => policy.label === policyName);
    if (policyIndex !== -1 && policyRefs.current[policyIndex]) {
      const navbarHeight = 10;
      const offsetTop = policyRefs.current[policyIndex]?.offsetTop! - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  }

  return (
    <Container>
      <div className="relative py-10 flex flex-col gap-5">
        <div className="md:text-4xl text-3xl font-semibold text-gray-600 text-center py-5">Điều khoản dịch vụ</div>
        <div className="grid grid-cols-7 gap-5">
          <div className="col-span-2 relative">
            <div className="flex flex-col gap-3 text-left fixed -translate-y-10">
              {listTitlePolicy.map((title, tdx) => (
                <button
                  className={`${selectedPolicy === title.label ? "text-primary-blue-cus" : ""} font-semibold text-xl text-left`}
                  onClick={() => handlePolicyChange(title.label)}
                  key={tdx}
                >
                  {title.label}
                </button>
              ))}
            </div>
          </div>
          <div className="col-span-5 min-h-screen flex flex-col gap-3">
            <div className="flex flex-col gap-3 text-xl text-gray-500 font-medium" ref={(ref) => (policyRefs.current[0] = ref)} id="0">
              <div className="text-gray-600 font-semibold text-2xl">
                Tổng quan
              </div>
              {listOverviewPolicy.map((item, index) => (
                <div key={index} className="pl-4">
                  - {item.content}
                </div>
              ))}
            </div>
            {listContentPolicy.map((item, index) => (
              <div className="flex flex-col gap-3 py-3" key={index} ref={(ref) => (policyRefs.current[index + 1] = ref)} id={`${index + 1}`}>
                <div className="text-gray-600 font-semibold text-2xl">
                  {item.id}. {item.label}
                </div>
                <div className="text-gray-600 font-medium text-xl">
                  {item.header}
                </div>
                {Array.isArray(item.body) ? (
                  item.body.map((sub, idx) => (
                    <div className="text-gray-500 font-medium text-xl pl-4" key={idx}>
                      - {sub.subContent}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600 font-medium text-xl">
                    {item.body}
                  </div>
                )}
                <div className="text-gray-600 font-medium text-xl">
                  {item.subFinal}
                </div>
                <div className="text-gray-600 font-medium text-xl">
                  {item.final} {item.email}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div >
    </Container >
  )
}

export default Policy