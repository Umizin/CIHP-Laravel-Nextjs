export default function HomeNavbar() {
  return (
    <nav className="flex flex-row justify-between p-4 shadow-md">
   
      <span className="material-symbols-outlined cursor-pointer">
        menu
      </span>

      <div className="flex flex-row gap-3 items-center">
        <ul className="flex flex-row gap-2 ">
          <li className="cursor-pointer hover:text-[#683bab]">Login</li>
          <span>/</span>
          <li className="cursor-pointer hover:text-[#683bab]">Cadastro</li>
        </ul>

       
        <span className="material-symbols-outlined cursor-pointer ">
          account_circle
        </span>
      </div>
    </nav>
  );
}
