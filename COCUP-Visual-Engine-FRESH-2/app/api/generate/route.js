import { normalizeTeam } from "../../../lib/teams";

export const runtime = "nodejs";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  let team1 = normalizeTeam(body.team1);
  let team2 = normalizeTeam(body.team2);
  let score1 = Number(body.score1);
  let score2 = Number(body.score2);
  const winnerFirst = body.winnerFirst !== false;

  if (!team1 || !team2 || !Number.isInteger(score1) || !Number.isInteger(score2) || score1 < 0 || score1 > 4 || score2 < 0 || score2 > 4) {
    return Response.json({ ok: false, error: "Geçersiz takım veya skor." }, { status: 400 });
  }
  if (team1 === team2) {
    return Response.json({ ok: false, error: "Takımlar aynı olamaz." }, { status: 400 });
  }

  if (winnerFirst && score2 > score1) {
    [team1, team2] = [team2, team1];
    [score1, score2] = [score2, score1];
  }

  const imageUrl = new URL("/api/render", req.url);
  imageUrl.searchParams.set("team1", team1);
  imageUrl.searchParams.set("score1", String(score1));
  imageUrl.searchParams.set("team2", team2);
  imageUrl.searchParams.set("score2", String(score2));
  imageUrl.searchParams.set("winnerFirst", "0");

  return Response.json({
    ok: true,
    team1,
    score1,
    team2,
    score2,
    image_url: imageUrl.toString()
  });
}
