import Link from "next/link";

export default function HomeNavbar() {
  return (
    <nav className="flex flex-row justify-between p-4 shadow-md">
   
      <span className="material-symbols-outlined cursor-pointer">
        menu
      </span>

      <div className="flex flex-row gap-3 items-center">
        <ul className="flex flex-row gap-2 ">
          <Link href='/login' ><li className="cursor-pointer hover:text-[#683bab]">Login</li></Link>
          <span>/</span>
          <Link href='/cadastro' ><li className="cursor-pointer hover:text-[#683bab]">Cadastro</li></Link>
        </ul>
        <span className="material-symbols-outlined cursor-pointer ">
          account_circle
        </span>
      </div>
    </nav>
  );
}
