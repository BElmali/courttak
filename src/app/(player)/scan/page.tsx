import { QrCode } from "lucide-react";
import Link from "next/link";
import { colors } from "@/styles/tokens";

/** Placeholder QR screen — camera integration comes in a later sprint. */
export default function ScanPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <QrCode size={48} color={colors.lime} />
      <div className="text-lg font-extrabold">QR tarama</div>
      <p className="text-sm" style={{ color: colors.textMuted }}>
        Kamera entegrasyonu henüz bağlanmadı. Ana sayfadaki buton MVP demo akışını
        simüle eder.
      </p>
      <Link
        href="/"
        className="rounded-xl px-4 py-2 text-sm font-bold"
        style={{ background: colors.lime, color: "#1A2200" }}
      >
        Ana sayfaya dön
      </Link>
    </div>
  );
}
