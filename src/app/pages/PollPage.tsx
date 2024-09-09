import type {
  TQuestionWithOptions,
  ResponseJsonApi,
  TVoteCreatePayload,
  TVote,
} from "@/shared/services/interfaces";
import apiFetcher from "@/shared/utils/apiFetcher";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import VotingCard from "../components/VotingCard";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import useFullscreen from "../hooks/useFullscreen";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

export default function PollPage() {
  const { id: pollId } = useParams();

  const { handleFullscreen, isFullscrenActive } = useFullscreen();

  const { userCode } = useAuthStore();

  const {
    data: responsePoll,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["question", pollId],
    queryFn: () =>
      apiFetcher<ResponseJsonApi<TQuestionWithOptions>>(
        `/questions/${pollId}`,
        {
          credentials: "include",
        },
        true
      ),
    staleTime: 10000,
  });

  const hanldeVote = useCallback(
    async (optionId: string) => {
      const poll = responsePoll?.data;

      if (!poll) return;

      const data = {
        questionId: poll.id,
        optionId,
        voterCode: userCode,
      } as TVoteCreatePayload;

      const response = await apiFetcher<ResponseJsonApi<TVote>>(
        "/votes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
        true
      );

      if (response?.status == "success") {
        toast.success("Voto computado!", { duration: 3000 });
        refetch();
      }

      if (response?.status != "success") {
        toast.error(response?.message || "Erro no servidor!", {
          duration: 3000,
        });
      }
    },
    [refetch, responsePoll?.data, userCode]
  );

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

  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-2">
      <motion.section
        initial={{ opacity: 0, marginTop: 100 }}
        animate={{ opacity: 1, marginTop: 0 }}
        className="flex justify-center items-center flex-col h-full gap-3"
      >
        <h2 className="text-2xl font-semibold">Enquetes</h2>

        {responsePoll?.data ? (
          <VotingCard
            key={responsePoll.data.id}
            poll={responsePoll.data}
            onVote={hanldeVote}
          />
        ) : null}

        <div className="flex items-center gap-2 justify-center">
          <Switch
            id="fullscreen-mode"
            onClick={handleFullscreen}
            checked={isFullscrenActive}
          />
          <Label htmlFor="fullscreen-mode" className="cursor-pointer">
            Tela cheia
          </Label>
        </div>
      </motion.section>
      <div className="fixed bottom-2 right-2">
        <Link to={"/p"}>
          <Button>Outra enquete</Button>
        </Link>
      </div>
    </main>
  );
}
