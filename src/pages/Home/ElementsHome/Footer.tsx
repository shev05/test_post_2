import logo from '../../../../pictures/logo.png'

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-50 flex h-12 w-full items-center justify-center gap-2 bg-black px-5 text-white">
      <img
        src={logo}
        alt="Company Logo"
        className="h-8"
      />
    </footer>
  )
}
