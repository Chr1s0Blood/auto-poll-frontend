import {useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  TQuestionWithOptions,
} from "@/shared/services/interfaces";
import { cn } from "@/lib/utils";
import { DateFormat } from "@/shared/utils/date";
import { Skeleton } from "../ui/skeleton";

type Props = {
  poll: TQuestionWithOptions;
  onVote: (optionId: string) => void;
};

export default function VotingCard({ poll, onVote }: Props) {


  const [selectedOption, setSelectedOption] = useState<string | null>(poll?.chosenOptionId || null);

  const totalVotes = poll?.options.reduce(
    (pv, curr) => pv + curr._count.vote,
    0
  );

  const handleVote = (id: string) => {
    setSelectedOption(id);
    onVote(id);
  };

  return (
    <Card className="w-full max-w-lg mx-auto min-h-fit h-[38rem] sm:h-[32rem]">
      {poll ? (
        <>
          <CardHeader>
            <span className="text-muted-foreground text-center">Categoria: {poll.category.name}</span>
            <CardTitle className="text-xl font-bold text-center">
              {poll.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {poll.options.map((option) => {
              const votes = option._count.vote;

              const result = (votes && totalVotes)
                ? ((votes / totalVotes) * 100).toFixed(2)
                : 0;

              return (
                <motion.div
                  key={option.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className={cn(
                      `w-full h-auto flex-col justify-between p-3`,
                      {
                        "border-primary": selectedOption === option.id,
                      }
                    )}
                    onClick={() => handleVote(option.id)}
                  >
                    <span>{option.name}</span>
                    {selectedOption && (
                      <span className="text-sm text-muted-foreground">
                        {votes} votos ({result}%)
                      </span>
                    )}
                  </Button>
                  {selectedOption && (
                    <div className="mt-2 bg-secondary rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-primary h-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${result}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
            {selectedOption && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                Total de votos: {totalVotes}
              </p>
            )}
            <p className="text-muted-foreground text-center text-sm">
              Data de criação:{" "}
              {DateFormat.formatDateToBrazilianFormat(poll.createdAt, true)}
            </p>
          </CardContent>
        </>
      ) : (
        <Skeleton className="w-full h-full"/>
      )}
    </Card>
  );
}
