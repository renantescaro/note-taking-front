import Link from 'next/link';
import { Button } from '@mui/material';
import { StickyNote } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <StickyNote className="text-blue-600" size={32} />
        <span className="text-xl font-bold tracking-tight text-gray-800">
          NoteApp
        </span>
      </div>
      <div className="flex gap-4">
        <Link href="/login" passHref>
          <Button variant="text" color="inherit">
            Entrar
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 normal-case shadow-none"
          >
            Criar Conta
          </Button>
        </Link>
      </div>
    </nav>
  );
}
