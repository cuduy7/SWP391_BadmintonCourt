import { Footer, ModalFeaturing, ModalPolicy, ModalUnauthorize } from './components'
import Navbar from './components/navbar/Navbar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ModalUnauthorize />
      <ModalFeaturing />
      <ModalPolicy />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
