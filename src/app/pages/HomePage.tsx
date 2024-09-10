import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function HomePage() {
  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-10">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-semibold uppercase">
          Enquetes aleátorias geradas por IA 🫡
        </h1>
        <h2 className="text-xl font-semibold">Bem-vindo ao AutoPoll</h2>
      </header>

      <div className="flex items-center gap-2 justify-center">
        <Link to={"/p"}>
          <Button size={'lg'}>Enquete aleatória</Button>
        </Link>
        <Link to={"/categories"}>
          <Button variant={'secondary'} size={'lg'}>Ver categorias</Button>
        </Link>
      </div>
    </main>
  );
}
