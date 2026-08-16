import { notFound } from "next/navigation";
import { MatchDetail } from "@/components/match/MatchDetail";
import { getDemoMatch } from "@/lib/mock-data";

type Props = {
  params: Promise<{ matchId: string }>;
};

export default async function MatchDetailPage({ params }: Props) {
  const { matchId } = await params;
  const match = getDemoMatch(matchId);
  if (!match) notFound();

  return <MatchDetail match={match} />;
}
