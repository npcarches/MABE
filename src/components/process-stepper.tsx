"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { useI18n } from "@/i18n/i18n-provider";
import { FLOW_IMAGES, type Service } from "@/data/flow";
import { Img } from "./img";
import { Segmented, serviceOptions } from "./segmented";

/** Time each step stays on screen before auto-advancing. */
const STEP_MS = 6000;
/** Length of the fade-out before the stage content switches (matches the .stage.swap CSS transition). */
const SWAP_MS = 280;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const prefersReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

/**
 * Five-step process walkthrough. Auto-advances every 6s with a progress bar, pauses while the
 * pointer or focus is inside the stage, and stays still when the user prefers reduced motion.
 */
export function ProcessStepper() {
  const { m } = useI18n();
  const [svc, setSvc] = useState<Service>("look");
  const [idx, setIdx] = useState(0);
  // Step whose text/image is on screen; trails `idx` by the fade-out when animating.
  const [shown, setShown] = useState(0);
  const [swapping, setSwapping] = useState(false);
  const [paused, setPaused] = useState(false);
  // Bumped to restart the countdown on the same step (e.g. timer fired while paused).
  const [cycle, setCycle] = useState(0);
  // Static HTML assumes motion is allowed; the real preference applies after hydration.
  const reduce = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);
  const pausedRef = useRef(false);

  const steps = m.flow[svc].steps;
  const st = steps[shown];
  const stepCount = FLOW_IMAGES[svc].length;

  const go = (i: number, animate: boolean) => {
    setIdx(i);
    if (animate && !reduce) setSwapping(true);
    else setShown(i);
  };

  // Fade out, then show the new step.
  useEffect(() => {
    if (!swapping) return;
    const id = setTimeout(() => {
      setShown(idx);
      setSwapping(false);
    }, SWAP_MS);
    return () => clearTimeout(id);
  }, [swapping, idx]);

  // Auto-advance countdown.
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => {
      if (pausedRef.current) setCycle((c) => c + 1);
      else go((idx + 1) % stepCount, true);
    }, STEP_MS);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `go` only reads state that is already a dependency
  }, [svc, idx, cycle, reduce, stepCount]);

  const chooseService = (s: Service) => {
    setSvc(s);
    setIdx(0);
    setShown(0);
    setSwapping(false);
  };

  const setPause = (p: boolean) => {
    pausedRef.current = p;
    setPaused(p);
  };

  const fillWidth = `${(idx / (stepCount - 1)) * 100}%`;

  return (
    <>
      <Segmented
        className="seg seg-wrap"
        label={m.common.chooseService}
        options={serviceOptions(m)}
        value={svc}
        onChange={chooseService}
      />
      <p className="muted">{m.flow[svc].note}</p>

      <div className="stepper">
        <div className="track">
          <div className="track-line">
            <div className="fill" style={{ width: fillWidth }}></div>
          </div>
          {steps.map((s, i) => (
            <button
              key={`${svc}-${i}`}
              type="button"
              className={i < idx ? "node done" : i === idx ? "node on" : "node"}
              aria-label={`${m.common.step} ${i + 1}: ${s.label}`}
              aria-current={i === idx ? "step" : undefined}
              onClick={() => go(i, true)}
            >
              <span className="dot">{i + 1}</span>
              <span className="lbl">{s.label}</span>
            </button>
          ))}
        </div>
        <div
          className={swapping ? "stage swap" : "stage"}
          onMouseEnter={() => setPause(true)}
          onMouseLeave={() => setPause(false)}
          onFocus={() => setPause(true)}
          onBlur={() => setPause(false)}
        >
          <div className="stage-text">
            <h3>{`${m.common.step} ${shown + 1}: ${st.title}`}</h3>
            <ul>
              {st.bullets.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="chips">
              {st.chips.map((x) => (
                <span className="chip" key={x}>
                  {x}
                </span>
              ))}
            </div>
            <div className={paused ? "timer paused" : "timer"}>
              <i key={`${svc}-${idx}-${cycle}`} className="run" style={{ "--dur": `${STEP_MS}ms` } as CSSProperties}></i>
            </div>
            <div className="ctrls">
              <span className="count">{`${shown + 1} / ${stepCount}`}</span>
            </div>
          </div>
          <div className="stage-img">
            <Img k={FLOW_IMAGES[svc][shown]} alt={st.title} sizes="(max-width: 960px) 100vw, 560px" />
          </div>
        </div>
      </div>
    </>
  );
}
