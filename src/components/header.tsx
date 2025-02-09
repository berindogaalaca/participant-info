import { LanguageSwitcher } from "./language-switch";
import { ThemeSwitch } from "./mode-switch";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 m-4 gap-6 shadow-md dark:shadow-gray-300 flex items-center justify-end rounded-2xl">
      <LanguageSwitcher />
      <ThemeSwitch />
    </div>
  );
};

export default Navbar;
