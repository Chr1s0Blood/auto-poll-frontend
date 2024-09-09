import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import useBrazilStates from "../hooks/useBrazilStates";
import apiFetcher from "@/shared/utils/apiFetcher";
import { TVoter, ResponseJsonApi } from "@/shared/services/interfaces";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  country: z.string({
    required_error: "Por favor, selecione um país.",
  }),
  state: z.string({
    required_error: "Por favor, selecione um estado.",
  }),
});

export default function LoginPage() {
  const navigate = useNavigate();

  const { setUserCode, userCode } = useAuthStore();

  const { brazilStates, isBrazilStatesLoading } = useBrazilStates();

  const [countries] = useState([{ value: "BR", label: "Brasil" }]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "BR",
      state: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (userCode) {
      toast.success("Você já pode votar!");
      navigate("/");
      return;
    }

    const response = await apiFetcher<ResponseJsonApi<TVoter>>(
      "/voters",
      {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      },
      true
    );

    const message = response?.message;

    if (response?.status != "success" || !response.data?.code) {
      toast.error(message || "Erro no servidor!");
      return;
    }

    toast.success("Registro feito! Obrigado.");
    setUserCode(response.data?.code);
    navigate("/");
  }

  function handleCountryChange(value: string) {
    form.setValue("state", value);
  }

  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-2">
      <header className="max-w-sm md:max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Antes de votar... :D</h1>
        <h2 className="">
          Não é exatamente um login, é apenas uma informação que usaremos para
          montar nossos gráficos.
        </h2>
      </header>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full max-w-sm md:max-w-md"
        >
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <Select
                  onValueChange={handleCountryChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um país" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  disabled={isBrazilStatesLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {brazilStates?.map((state) => (
                      <SelectItem key={state.id} value={state.nome}>
                        {state.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Entrar
          </Button>
        </form>
      </Form>
    </main>
  );
}
