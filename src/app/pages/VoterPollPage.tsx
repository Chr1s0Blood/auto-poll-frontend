import {
  ResponseJsonApi,
  TQuestionWithOptions,
} from "@/shared/services/interfaces";
import apiFetcher from "@/shared/utils/apiFetcher";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import VotingCard from "../components/VotingCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const defaultPageSize = 14;

export default function VoterPollPage() {
  const [polls, setPolls] = useState<TQuestionWithOptions[]>();

  const [hasMorePolls, setHasMorePolls] = useState(true);

  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  const inpurSearchRef = useRef<HTMLInputElement | null>(null);

  const {
    data: responsePoll,
    isLoading,
  } = useQuery({
    queryKey: ["voted-questions", page, searchQuery],
    queryFn: () =>
      apiFetcher<
        ResponseJsonApi<{
          totalQuestionsVotedByVoter: number;
          questions: TQuestionWithOptions[];
        }>
      >(
        `/questions/me?page=${page}&title=${searchQuery}`,
        {
          credentials: "include",
        },
        true
      ),
    staleTime: 10000,
  });

  const loadMore = useCallback(() => {
    if (isLoading) return;
    setPage((prev) => prev + 1);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("Carregando...", {
        duration: Infinity,
        id: "loading-poll",
        position: "top-center",
      });
    } else {
      toast.dismiss("loading-poll");
    }
  }, [isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  useEffect(() => {

    if (isLoading) return

    if (responsePoll?.data) {
      setPolls((prev) => [...(prev || []), ...responsePoll.data!.questions]);
      if (responsePoll.data.questions.length < defaultPageSize) {
        setHasMorePolls(false);
      } else {
        setHasMorePolls(true);
      }
        
    }

    if (!responsePoll?.data?.questions.length) {
      setPolls(undefined);
      setHasMorePolls(false);
    }
  }, [responsePoll?.data, isLoading]);

  const handleVote = async () => {
    toast.error("Votação não disponível");
    return false;
  };

  return (
    <main className="w-full h-full flex flex-col gap-2 mt-[48rem] sm:mt-20">
      <motion.section
        initial={{ opacity: 0, marginTop: 100 }}
        animate={{ opacity: 1, marginTop: 0 }}
        className="flex flex-col h-full gap-3 divide-y"
      >
        <header className="text-center space-y-2">
          <div>
            <h2 className="text-3xl font-semibold">Enquetes</h2>
            <p className="text-muted-foreground">
              Veja as enquetes que você já votou
            </p>
          </div>
          <p className="">
            Total: {polls?.length ? responsePoll?.data?.totalQuestionsVotedByVoter : 0}
          </p>
        </header>

        <section className="space-y-4 p-2 w-full">
          <div className="flex flex-wrap items-center mx-auto w-full sm:w-96 md:w-[45rem] py-2 px-2 sm:px-6 gap-2">
            <Input
              ref={inpurSearchRef}
              placeholder="Digite o título de uma enquete..."
              className="w-full flex-1"
            />
            <Button
              onClick={() =>
                setSearchQuery(inpurSearchRef.current?.value || "")
              }
            >
              Buscar
            </Button>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 p-8">
            {polls?.length
              ? polls.map((question) => {
                  return (
                    <VotingCard
                      key={question.id}
                      poll={question}
                      onVote={handleVote}
                    />
                  );
                })
              : (
                <p className="text-center text-lg font-semibold w-full sm:col-span-2">
                  Nenhuma enquete encontrada
                </p>
              )}
          </section>
        </section>

        {hasMorePolls && (
          <div className="flex w-full justify-center items-center p-2">
            <Button onClick={loadMore} disabled={isLoading} className="">
              {isLoading ? "Carregando..." : "Carregar mais"}
            </Button>
          </div>
        )}
      </motion.section>
    </main>
  );
}
