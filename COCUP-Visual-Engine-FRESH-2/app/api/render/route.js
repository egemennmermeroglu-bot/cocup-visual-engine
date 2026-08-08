import { normalizeTeam } from "../../../lib/teams";
import { renderMatchResult } from "../../../lib/render";

export const runtime = "nodejs";

function parseScore(value) {
  if (value === null || !/^[0-4]$/.test(value)) return null;
  return Number(value);
}

export async function GET(req) {
  const url = new URL(req.url);
  let team1 = normalizeTeam(url.searchParams.get("team1"));
  let team2 = normalizeTeam(url.searchParams.get("team2"));
  let score1 = parseScore(url.searchParams.get("score1"));
  let score2 = parseScore(url.searchParams.get("score2"));
  const winnerFirst = url.searchParams.get("winnerFirst") !== "0";
  const download = url.searchParams.get("download") === "1";

  if (!team1 || !team2 || score1 === null || score2 === null) {
    return Response.json({ error: "Geçersiz takım veya skor." }, { status: 400 });
  }
  if (team1 === team2) {
    return Response.json({ error: "Takımlar aynı olamaz." }, { status: 400 });
  }

  if (winnerFirst && score2 > score1) {
    [team1, team2] = [team2, team1];
    [score1, score2] = [score2, score1];
  }

  const image = await renderMatchResult(team1, score1, team2, score2);
  const filename = `cocup-${team1}-${score1}-${team2}-${score2}.png`;

  return new Response(new Uint8Array(image), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": download
        ? "no-store"
        : "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800"
    }
  });
}
