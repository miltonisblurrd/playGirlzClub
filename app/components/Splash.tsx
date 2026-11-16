import { useEffect, useState } from "react";

const SEEN = "pgc-splash";

export function Splash() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    if (sessionStorage.getItem(SEEN) === "1") {
      setPhase("gone");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? 400 : 2200;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(SEEN, "1");
      setPhase("out");
    }, hold);

    return () => window.clearTimeout(timer);
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`pgc-splash${phase === "out" ? " pgc-splash-out" : ""}`}
      role="status"
      aria-label="Play Girlz Club"
      onTransitionEnd={() => {
        if (phase === "out") setPhase("gone");
      }}
    >
      <img src="/brand/mark.png" alt="Play Girlz Club" className="pgc-splash-logo" />
    </div>
  );
}
