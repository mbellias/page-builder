import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/theme/ModeToggle';
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
      <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
        <Logo />
        <div className='flex gap-4 items-center'>
          <ModeToggle />
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      <div className='flex w-full h-full flex-grow items-center justify-center'>
        <SignIn />
      </div>
    </div>
  );
}
