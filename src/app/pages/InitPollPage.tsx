import {
  ResponseJsonApi,
  TQuestionWithOptions,
} from "@/shared/services/interfaces";
import apiFetcher from "@/shared/utils/apiFetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function InitPollPage() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const categoryCode = searchParams.get("category");

  const { data: responsePoll } = useQuery({
    queryKey: ["question-random", categoryCode],
    queryFn: () =>
      apiFetcher<ResponseJsonApi<TQuestionWithOptions>>(
        `/questions/random?category=${categoryCode}`,
        {
          credentials: "include",
        },
        true
      ),
    staleTime: 50,
  });

  useEffect(() => {
    if (responsePoll?.status === "error") {
      toast.error(
        responsePoll?.message || "Ocorreu um erro ao buscar a enquete"
      );
    }
  }, [responsePoll]);

  useEffect(() => {
    if (responsePoll?.data) {
      navigate(
        `/p/${responsePoll.data.id}${
          categoryCode ? `?category=${categoryCode}` : ""
        }`
      );
    }
  }, [responsePoll, navigate, categoryCode]);

  useEffect(() => {
    if (!responsePoll?.data && responsePoll?.status == "success") {
      toast("Nenhuma enquete encontrada. Você já passou por todas.");
    }
  }, [responsePoll, navigate]);

  return <></>;
}
