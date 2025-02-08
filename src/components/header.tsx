import { LanguageSwitcher } from "./language-switch";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 m-4 shadow-md flex items-center justify-end rounded-2xl">
      <LanguageSwitcher />
    </div>
  );
};

export default Navbar;
