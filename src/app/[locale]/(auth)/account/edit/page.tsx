import { getTranslations } from "next-intl/server";
import { SkewUnderline } from "@/components/skew-underline";
import { EditProfileForm } from "@/components/account/edit-profile-form";

export default async function EditProfilePage() {
  const t = await getTranslations("account.edit");

  return (
    <div className="mx-auto max-w-[480px]">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-display text-[28px] font-black leading-tight tracking-tight text-[#0D1801] dark:text-white sm:text-[32px]">
          <SkewUnderline color="#BFFF00" height="40%">
            {t("title")}
          </SkewUnderline>
        </h1>
      </div>

      <div className="rounded-2xl border border-black/[0.07] bg-white p-6 dark:border-white/[0.08] dark:bg-white/[0.04]">
        <EditProfileForm />
      </div>
    </div>
  );
}
