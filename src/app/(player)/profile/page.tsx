import { InitialsAvatar } from "@/components/ui/InitialsAvatar";
import { colors } from "@/styles/tokens";

export default function ProfilePage() {
  return (
    <div className="flex-1 px-[18px] pt-2.5">
      <div className="mb-4 text-xl font-extrabold">Profil</div>
      <div
        className="flex items-center gap-3 rounded-2xl border p-4"
        style={{ background: colors.surface2, borderColor: colors.line }}
      >
        <InitialsAvatar name="Burak" size={44} />
        <div>
          <div className="font-bold">Burak</div>
          <div className="text-xs" style={{ color: colors.textMuted }}>
            8 maç oynandı
          </div>
        </div>
      </div>
    </div>
  );
}
