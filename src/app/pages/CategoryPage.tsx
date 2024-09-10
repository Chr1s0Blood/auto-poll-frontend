import {
  ResponseJsonApi,
  TCategoryWithQuestionsCount,
} from "@/shared/services/interfaces";
import apiFetcher from "@/shared/utils/apiFetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { ONE_MINUTE_MILLIS } from "@/shared/constants/time";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const { data: responseCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      apiFetcher<ResponseJsonApi<TCategoryWithQuestionsCount[]>>(
        "/categories",
        undefined,
        true
      ),
    staleTime: ONE_MINUTE_MILLIS,
  });

  useEffect(() => {
    if (responseCategories?.status === "error") {
      toast.error(responseCategories.message || "Erro ao buscar categorias!");
    }
  }, [responseCategories]);

  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-10 mt-20 sm:mt-8 p-4 md:p-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Categorias</h1>
        <p className="text-muted-foreground">
          Explore a variedade de categorias e encontre enquetes interessantes
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {responseCategories?.data
          ? responseCategories?.data.map((category) => (
              <Link key={category.id} to={`/p?category=${category.code}`}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Button
                    variant="outline"
                    className="h-auto py-3 px-4 relative text-left w-full"
                  >
                    {category.name}
                    <Badge className="absolute top-0 right-0 -mt-2 -mr-2">
                      {category._count.question}
                    </Badge>
                  </Button>
                </motion.div>
              </Link>
            ))
          : null}
      </div>
    </main>
  );
}
