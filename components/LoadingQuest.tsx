import Image from "next/image";

export default function LoadingQuest() {
  return (
    <div className="max-w-xl mx-auto text-center py-16">
      <Image
        src="/icons/quest-logo.png"
        alt=""
        width={64}
        height={64}
        className="mx-auto mb-4 animate-bounce"
      />
      <p className="text-slate-500 font-medium">Conjuring a new quest...</p>
    </div>
  );
}
