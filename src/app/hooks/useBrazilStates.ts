
import { IEstadoIBGE } from "@/shared/services/brasilapi";
import { useQuery } from "@tanstack/react-query";

export default function useBrazilStates() {
  const { isLoading, error, data } = useQuery<IEstadoIBGE[]>({
    queryKey: ["ESTADOS_BRAZIL"],
    queryFn: () =>
      fetch("https://brasilapi.com.br/api/ibge/uf/v1").then((res) =>
        res.json(),
      ),
    staleTime: Infinity,
  });

  return {
    isBrazilStatesLoading: isLoading,
    brazilStates: data,
    brazilStatesError: error,
  };
}
