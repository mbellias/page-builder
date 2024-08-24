import Link from 'next/link';

function Logo() {
  return (
    <Link
      href='/'
      className='uppercase font-bold text-2xl bg-gradient-to-r from-amber-700 to-rose-300 text-transparent bg-clip-text hover:cursor-pointer'
    >
      Spidersites.net
    </Link>
  );
}

export default Logo;
