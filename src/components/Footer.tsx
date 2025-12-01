import { CAMPANY_NAME } from "@/config";

export default function Footer() {
  return (
    <footer className="shadow-top">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-copyright">
          © {new Date().getFullYear()} {CAMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}