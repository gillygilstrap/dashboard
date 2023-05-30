

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

export default function Header() {
  return (
    <div className="header flex flex-row justify-between w-full h-20 bg-slate-300 px-20 shadow-md fixed">
      <div className="logo bg-slate-300 my-auto text-2xl tracking-wider font-bold">
        Dashboard
      </div>
      {/* <div className="nav my-auto flex">
            {navItems.map(item => {
                return <a href={item.link} className="nav-item mx-4 tracking-wide">{item.label}</a>
            })}
        </div> */}
    </div>
  );
}
