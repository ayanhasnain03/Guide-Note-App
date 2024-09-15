import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 md:px-4 py-2 z-10 text-white w-[95vw]">
      <div>
        <Image src="/navlogo.png" alt="logo" height={60} width={100} />
      </div>
      <div className="flex items-center justify-center gap-4">
        <Link href={'/'}>Home</Link>
        <Link href={'/'}>Request</Link>
        <Link href={'/'}>Contacts</Link>
      </div>
    </div>
  );
}
export default Navbar;
