import Link from 'next/link';
import { List } from 'phosphor-react'; 
interface HeaderAuthProps {
  buttonLabel: string;
  buttonLink: string;
}

export function HeaderAuth({ buttonLabel, buttonLink }: HeaderAuthProps) {
  return (
    <header className="w-full h-20 bg-[#f3f4f6] flex items-center justify-between px-8 border-b border-gray-200/50">
     
      <div className="flex items-center gap-2">
         <List size={32} weight="bold" className="text-black transform -rotate-45" />
      </div>
      
      <Link 
        href={buttonLink}
        className="bg-black text-white px-6 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        {buttonLabel}
      </Link>
    </header>
  );
}