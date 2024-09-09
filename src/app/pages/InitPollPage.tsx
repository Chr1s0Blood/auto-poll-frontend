import {
  ResponseJsonApi,
  TQuestionWithOptions,
} from "@/shared/services/interfaces";
import apiFetcher from "@/shared/utils/apiFetcher";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function InitPollPage() {
  //   const [searchParams] = useSearchParams(); FUTURE

  const navigate = useNavigate();

  //   const themeCode = searchParams.get("theme"); FUTURE

  const { data: responsePoll } = useQuery({
    queryKey: ["question-random"],
    queryFn: () =>
      apiFetcher<ResponseJsonApi<TQuestionWithOptions>>(
        `/questions/random`,
        {
            credentials: 'include'
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
      navigate(`/p/${responsePoll.data.id}`);
    }
  }, [responsePoll, navigate]);

  useEffect(() => {
    if (!responsePoll?.data && responsePoll?.status == 'success') {
        toast(
            "Nenhuma enquete encontrada. Você já passou por todas."
        );
    }
  }, [responsePoll, navigate])

  return <></>;
}
