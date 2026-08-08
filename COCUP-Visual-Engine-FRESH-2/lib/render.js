import path from "path";
import sharp from "sharp";

const asset = (...parts) => path.join(process.cwd(), "public", "assets", ...parts);

export async function renderMatchResult(team1, score1, team2, score2) {
  const scoreKey = `${score1}_${score2}.png`;

  return sharp(asset("match-result-template.png"))
    .composite([
      { input: asset("badges", `${team1}.png`), left: 132, top: 634 },
      { input: asset("badges", `${team2}.png`), left: 832, top: 634 },
      { input: asset("labels", `${team1}.png`), left: 81, top: 838 },
      { input: asset("labels", `${team2}.png`), left: 776, top: 838 },
      { input: asset("scores", scoreKey), left: 386, top: 648 }
    ])
    // adaptiveFiltering KAPALI: sabit şablon için kalite farkı yaratmıyor,
    // ama PNG encode süresini ciddi şekilde uzatıyordu — yavaşlamanın kaynağı buydu.
    .png({ compressionLevel: 4, adaptiveFiltering: false })
    .toBuffer();
}
