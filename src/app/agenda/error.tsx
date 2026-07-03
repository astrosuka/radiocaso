"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <p>No pudimos cargar la agenda. Intentá de nuevo.</p>
      <button onClick={() => reset()}>Reintentar</button>
    </div>
  );
}
