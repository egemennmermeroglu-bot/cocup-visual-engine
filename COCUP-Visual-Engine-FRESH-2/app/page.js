"use client";

import { useMemo, useState } from "react";

const teams = [
  ["roketsan1", "ROKETSAN 1"],
  ["roketsan2", "ROKETSAN 2"],
  ["aselsan", "ASELSAN"],
  ["havelsan", "HAVELSAN"],
  ["koluman", "KOLUMAN"],
  ["tubitak_sage", "TÜBİTAK SAGE"],
  ["hukukcular", "HUKUKÇULAR"],
  ["doktorlar", "DOKTORLAR"]
];

function ordered(team1, score1, team2, score2, winnerFirst) {
  if (winnerFirst && score2 > score1) return [team2, score2, team1, score1];
  return [team1, score1, team2, score2];
}

export default function Home() {
  const [team1, setTeam1] = useState("aselsan");
  const [score1, setScore1] = useState(2);
  const [team2, setTeam2] = useState("havelsan");
  const [score2, setScore2] = useState(1);
  const [winnerFirst, setWinnerFirst] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const [leftTeam, leftScore, rightTeam, rightScore] = ordered(team1, score1, team2, score2, winnerFirst);

  const downloadUrl = useMemo(() => {
    const p = new URLSearchParams({
      team1,
      score1: String(score1),
      team2,
      score2: String(score2),
      winnerFirst: winnerFirst ? "1" : "0",
      download: "1"
    });
    return `/api/render?${p.toString()}`;
  }, [team1, score1, team2, score2, winnerFirst]);

  async function downloadPng() {
    if (downloading) return;
    setDownloading(true);
    try {
      const response = await fetch(downloadUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("Görsel oluşturulamadı.");
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `cocup-${leftTeam}-${leftScore}-${rightTeam}-${rightScore}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (error) {
      alert("PNG indirilemedi. Lütfen tekrar deneyin.");
    } finally {
      setDownloading(false);
    }
  }

  return <main className="wrap">
    <section className="panel">
      <div className="eyebrow">COCUP VISUAL ENGINE</div>
      <h1>Maç sonucu görseli</h1>
      <p>Şablon kilitlidir. Yalnızca takım, logo ve skor değişir.</p>

      <div className="grid">
        <label>1. takım<select value={team1} onChange={e => setTeam1(e.target.value)}>{teams.map(([k,l]) => <option key={k} value={k}>{l}</option>)}</select></label>
        <label>Skor<input type="number" min="0" max="4" value={score1} onChange={e => setScore1(Math.max(0, Math.min(4, Number(e.target.value))))}/></label>
        <label>2. takım<select value={team2} onChange={e => setTeam2(e.target.value)}>{teams.map(([k,l]) => <option key={k} value={k}>{l}</option>)}</select></label>
        <label>Skor<input type="number" min="0" max="4" value={score2} onChange={e => setScore2(Math.max(0, Math.min(4, Number(e.target.value))))}/></label>
      </div>
      <label className="check"><input type="checkbox" checked={winnerFirst} onChange={e => setWinnerFirst(e.target.checked)}/> Kazanan takımı otomatik olarak sola al</label>
      <button className="download" type="button" onClick={downloadPng} disabled={downloading}>
        {downloading ? "PNG hazırlanıyor…" : "PNG olarak indir"}
      </button>
    </section>

    <section className="previewShell">
      <div className="canvas">
        <img className="layer template" src="/assets/match-result-template.png" alt="COCUP maç sonucu önizleme" />
        <img className="layer badge leftBadge" src={`/assets/badges/${leftTeam}.png`} alt="" />
        <img className="layer badge rightBadge" src={`/assets/badges/${rightTeam}.png`} alt="" />
        <img className="layer label leftLabel" src={`/assets/labels/${leftTeam}.png`} alt="" />
        <img className="layer label rightLabel" src={`/assets/labels/${rightTeam}.png`} alt="" />
        <img className="layer score" src={`/assets/scores/${leftScore}_${rightScore}.png`} alt={`${leftScore}-${rightScore}`} />
      </div>
    </section>
  </main>;
}
