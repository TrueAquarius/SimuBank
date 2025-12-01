import Image from "next/image";
import Logo from "../components/Logo/Logo"

export default function Home() {
  return (
    <div className="flex">
      <div className="w-1/2 pr-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mt-8">
          Welcome to
        </h1>
        <div className="mt-2 text-lg text-gray-700">
          <Logo fontSize="6rem" />
        </div>
        <div className="w-[33rem]">
          <p className="mt-4 text-lg text-gray-700">
            "SimuBank" is a ficticious Bank.
            This application, the "SimuBank Application" is a sample application which is used to demonstrate and explore the capabilities of AI-powered software development and testing tools.
            While it doesn't serve a real-world business function, it provides a practical environment for experimenting with and understanding how artificial intelligence can enhance the software testing process.
            It is not a real banking application.
          </p>
        </div>
      </div>
      <div className="w-1/2 pl-2">
        {/* Right side content goes here */}
      </div>
    </div>
  );
}
