// ***** Example navigation items. For commented out code block inside of Header function

// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];

// interface navItem {
//   label: string;
//   link: string;
// }

// const navItems: navItem[] = [
//   {
//     label: "About",
//     link: "#",
//   },
//   {
//     label: "Contact",
//     link: "#",
//   },
//   {
//     label: "Recent Projects",
//     link: "#",
//   },
// ];

const handleLogOutclick = () => {
  alert(`...you can't log out if you never logged in.`);
};

export default function Header() {
  return (
    <div className="header flex flex-row justify-between w-full h-20 bg-slate-300 pl-6 md:pl-12 shadow-sm fixed z-10">
      <div className="logo bg-slate-300 my-auto text-2xl tracking-wider font-bold text-slate-800 rounded-lg hover:cursor-pointer p-4">
        Sales Dashboard
      </div>
      {/* <div className="nav my-auto flex">
            {navItems.map(item => {
                return <a href={item.link} className="nav-item mx-4 tracking-wide">{item.label}</a>
            })}
        </div> */}

      <div
        className="text-slate-700 font-normal tracking-wider my-auto mr-2 md:mr-6 p-4 hover:cursor-pointer hover:scale-105 hover:text-slate-800"
        onClick={() => handleLogOutclick()}
      >
        Log Out
      </div>
    </div>
  );
}
